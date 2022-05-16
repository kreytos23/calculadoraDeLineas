import {create, all} from 'mathjs'; 
import {useState} from 'react';
import {conductores} from './materiales/conductores'
import {dielectricos} from './materiales/dielectricos'

function CoaxialBajaFrec() {
    const math = create(all)
    const permeabilidadVacio = 1.256637*Math.pow(10,-6);
    const permitividadDelVacio = 8.8541*Math.pow(10,-12);

    const [radioCond1, setRadioCond1] = useState(null);
    const [radioCond2, setRadioCond2] = useState(null);
    const [radioDiele, setRadioDiele] = useState(null);
    const [conductividadCond, setConductividadCond] = useState(null);
    const [conductividadDielectrico, setConductividadDielectrico] = useState(null);
    const [permitividad, setPermitividad] = useState(null);
    const [permeabilidad, setPermeabilidad] = useState(null);
    const [frecuenciaOnda, setFrecuenciaOnda] = useState(null);

    const [resImpCabCoax, setResImpCabCoax] = useState(null);

    const valorRadioCond1 = (e) => {
        setRadioCond1(e.target.value);
    }

    const valorRadioCond2 = (e) => {
        setRadioCond2(e.target.value);
    }

    const valorRadioDiele = (e) => {
        setRadioDiele(e.target.value);
    }

    const valorConductividadCond = (e) => {
        setConductividadCond(e.target.value);
    }

    const valorConductividadDielectrico = (e) => {
        setConductividadDielectrico(e.target.value);
    }

    const valorPermitividad = (e) => {
        setPermitividad(e.target.value);
    }

    const valorPermeabilidad = (e) => {
        setPermeabilidad(e.target.value);
    }

    const valorFrecuencia = (e) => {
        setFrecuenciaOnda(e.target.value);
    }

    const setConductor = (e) => {
        let arrayValores = e.target.value.split(",");
        setConductividadCond(arrayValores[0]);
    }

    const setDielectrico = (e) => {
        let arrayValores = e.target.value.split(",");
        setConductividadDielectrico(arrayValores[0]);
        setPermitividad(arrayValores[1] * permitividadDelVacio);
        setPermeabilidad(arrayValores[2] * permeabilidadVacio);
    }

let inductancia = (permeabilidad, radioCond1, radioCond2, radioDiel) =>{
    let resultado = (permeabilidad / (2*Math.PI))*((math.log(radioDiel/radioCond1)) + (1/4) + ((1/(4*(radioCond2**2 - radioDiel**2)))*((radioDiel**2) - (3*(radioCond2**2)) + ((4*(radioCond2**4))*(math.log(radioCond2/radioDiel))/((radioCond2**2) - (radioDiel**2))))));
    return resultado;
};

let resistividad = (conductividadCond1, radioCond1, radioCond2, radioDiel) => {
    let resultado = (1/(conductividadCond1*Math.PI))*((1/radioCond1**2) + (1/((radioCond2**2) - (radioDiel**2))));
    return resultado;
};

let capacitancia = (permitividad, radioDiel, radioCond1) => {
    let resultado = (2*Math.PI * permitividad) / (math.log(radioDiel / radioCond1));
    return resultado;
};

let conductancia = (conductividadDiel, radioDiel, radioCond1) => {
    let resultado = (2*Math.PI * conductividadDiel) / (math.log(radioDiel / radioCond1));
    return resultado;
};


function impedancia(){
    let inductanciaRes = inductancia(permeabilidad, radioCond1, radioCond2, radioDiele);
    let resistividadRes = resistividad(conductividadCond, radioCond1, radioCond2, radioDiele);
    let capacitanciaRes = capacitancia(permitividad, radioDiele, radioCond1);
    let conductanciaRes = conductancia(conductividadDielectrico, radioDiele, radioCond1);

    let imwL = math.complex(resistividadRes, inductanciaRes*frecuenciaOnda*2*Math.PI);
    let imwC = math.complex(conductanciaRes, capacitanciaRes*frecuenciaOnda*2*Math.PI);

    let result = math.sqrt(math.divide(imwL,imwC));
    
    setResImpCabCoax(`${(result.re).toFixed(3)} ${(result.im).toFixed(3)}i`);
  }

  return (
    <div className="App">
    <h5 className="text-center">Cable Coaxial Para Bajas Frecuencias</h5>
    <main>
        <div className="container-fluid d-flex flex-row justify-content-md-evenly">
            <div className="row">
                <div className="col-12">
                    <div className="bifilarImp ms-3 px-5">
                      <form action="" className="bifilarImpForm d-flex justify-content-center">
                        <span>Ingrese el radio del conductor 1 [m]</span> <input type="text" id="CBBradioCable"
                            onChange={valorRadioCond1} placeholder="122.2e-5"/>
                        <span className="mt-3">Ingrese el radio del conductor 2 [m]</span> <input type="text"
                            id="CBBdistanciaCables" onChange={valorRadioCond2} placeholder="122.2e-5"/>
                        <span className="mt-3">Ingrese el radio del Dieléctrico [m]</span> <input type="text"
                            id="CBBdistanciaCables" onChange={valorRadioDiele} placeholder="122.2e-5"/>
                        <span className="mt-3">Ingrese la conductividad del conductor [S/m]</span> <input type="text"
                            id="CBBconductividadCable" onChange={valorConductividadCond} placeholder="122.2e-5"/>
                        <span className="mt-3">Ingrese la conductividad del dielectrico [S/m]</span> <input type="text"
                            id="CBBconductividadDiele" onChange={valorConductividadDielectrico} placeholder="122.2e-5"/>
                        <span className="mt-3">Ingrese la permitividad relativa</span> <input type="text" id="CBBpermitividad"
                            onChange={valorPermitividad} placeholder="122.2e-5"/>
                        <span className="mt-3">Ingrese la permeabilidad relativa</span> <input type="text" id="CBBpermeabilidad"
                            onChange={valorPermeabilidad} placeholder="122.2e-5"/>
                        <span className="mt-3">Ingrese frecuencia [Hz]</span> <input type="text" id="CBBfrecuencia"
                            onChange={valorFrecuencia} placeholder="122.2e-5"/>
                      </form>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="container-fluid">
                        <div className="row d-flex flex-column justify-content-center">
                            <span className="my-3 text-center">Seleccione Materiales</span>
                            <div className="col-12 d-flex flex-row justify-content-between">
                                <select className="form-select me-4" aria-label="Default select example" onChange={setConductor}>
                                    <option selected>Selecciona Conductor</option>
                                    <option value={conductores[0].valores}>{conductores[0].nombre}</option>
                                    <option value={conductores[1].valores}>{conductores[1].nombre}</option>
                                    <option value={conductores[2].valores}>{conductores[2].nombre}</option>
                                    <option value={conductores[3].valores}>{conductores[3].nombre}</option>
                                    <option value={conductores[4].valores}>{conductores[4].nombre}</option>
                                    <option value={conductores[5].valores}>{conductores[5].nombre}</option>
                                    <option value={conductores[6].valores}>{conductores[6].nombre}</option>
                                    <option value={conductores[7].valores}>{conductores[7].nombre}</option>
                                </select>
                                <select className="form-select" aria-label="Default select example" onChange={setDielectrico}>
                                <option selected>Selecciona Dieléctrico</option>
                                    <option value={dielectricos[0].valores}>{dielectricos[0].nombre}</option>
                                    <option value={dielectricos[1].valores}>{dielectricos[1].nombre}</option>
                                    <option value={dielectricos[2].valores}>{dielectricos[2].nombre}</option>
                                    <option value={dielectricos[3].valores}>{dielectricos[3].nombre}</option>
                                    <option value={dielectricos[0].valores}>{dielectricos[4].nombre}</option>
                                    <option value={dielectricos[0].valores}>{dielectricos[5].nombre}</option>
                                    <option value={dielectricos[0].valores}>{dielectricos[6].nombre}</option>
                                    <option value={dielectricos[0].valores}>{dielectricos[7].nombre}</option>
                                </select>
                            </div>
                            <div className="col-12 d-flex justify-content-center my-3">
                                <button type="button" className="btn btn-primary" onClick={impedancia}>Aceptar</button>
                            </div>
                            <div className="col-12">
                                <label htmlFor="resultadosImpedanciaBifiBajas" className="form-label">Impedancia:</label>
                                <textarea readOnly className="form-control text-center fw-bold" id="resultadosImpedanciaBifiBajas" value={resImpCabCoax}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>  
  );
}

                  export default CoaxialBajaFrec;