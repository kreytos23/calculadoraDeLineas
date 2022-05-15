import {create, all} from 'mathjs'; 
import {useState} from 'react';
import {conductores} from './materiales/conductores'
import {dielectricos} from './materiales/dielectricos'

function BifilarBajaFrec() {
    const math = create(all)
    const permeabilidadVacio = 1.256637*Math.pow(10,-6);
    const permitividadDelVacio = 8.8541*Math.pow(10,-12);

    const [radioCable, setRadioCable] = useState(null);
    const [distanciaEntreCables, setDistanciaEntreCables] = useState(null);
    const [conductividadCable, setConductividadCable] = useState(null);
    const [conductividadDielectrico, setConductividadDielectrico] = useState(null);
    const [permitividad, setPermitividad] = useState(null);
    const [permeabilidadMaterial, setPermeabilidadMaterial] = useState(null);
    const [frecuenciaOnda, setFrecuenciaOnda] = useState(null);

    const [resImpCabBifi, setResImpCabBifi] = useState(null);

    const valorRadioCable = (e) => {
        setRadioCable(e.target.value);
    }

    const valorDistanciaCables = (e) => {
        setDistanciaEntreCables(e.target.value);
    }

    const valorConductividadCable = (e) => {
        setConductividadCable(e.target.value);
    }

    const valorConductividadDiele = (e) => {
        setConductividadDielectrico(e.target.value);
    }

    const valorPermitividad = (e) => {
        setPermitividad(e.target.value * permitividadDelVacio);
    }

    const valorPermeabilidad = (e) => {
        setPermeabilidadMaterial(e.target.value * permeabilidadVacio);
    }

    const valorFrecuencia = (e) => {
        setFrecuenciaOnda(e.target.value);
    }

    const setConductor = (e) => {
        let arrayValores = e.target.value.split(",");
        setConductividadCable(arrayValores[0]);
        setPermitividad(arrayValores[1] * permitividadDelVacio);
        setPermeabilidadMaterial(arrayValores[2] * permeabilidadVacio);
    }

    const setDielectrico = (e) => {
        let arrayValores = e.target.value.split(",");
        setConductividadDielectrico(arrayValores[0]);
    }

  let inductancia = (permeabilidad, distanciaEntreCables, radioCable) =>{
    let resultado = (permeabilidad / Math.PI)*((1/4) + math.log(distanciaEntreCables / radioCable));
    return resultado;
  };

  let resistividad = (conductividad, radioCable) => {
      let resultado = 2 / (conductividad * Math.PI * (radioCable**2));
      return resultado;
  };

  let capacitancia = (permitividad, distanciaEntreCables, radioCable) => {
      let resultado = (Math.PI * permitividad) / (math.log(distanciaEntreCables / radioCable));
      return resultado;
  };

  let conductancia = (conductividad, distanciaEntreCables, radioCable) => {
      let resultado = (Math.PI * conductividad) / (math.log(distanciaEntreCables / radioCable));
      return resultado;
  };


  function impedancia(){
      let inductanciaRes = inductancia(permeabilidadMaterial, distanciaEntreCables, radioCable);
      let resistividadRes = resistividad(conductividadCable, radioCable);
      let capacitanciaRes = capacitancia(permitividad, distanciaEntreCables, radioCable);
      let conductanciaRes = conductancia(conductividadDielectrico, distanciaEntreCables, radioCable);

      let imwL = math.complex(resistividadRes, inductanciaRes*frecuenciaOnda*2*Math.PI);
      let imwC = math.complex(conductanciaRes, capacitanciaRes*frecuenciaOnda*2*Math.PI);

      let result = math.sqrt(math.divide(imwL,imwC));
      setResImpCabBifi(`${(result.re).toFixed(3)} ${(result.im).toFixed(3)}i`);
  }

  return (
    <div className="App">
    <h5 className="text-center">Cable Bifilar Para Bajas Frecuencias</h5>
    <main>
        <div className="container-fluid d-flex flex-row justify-content-md-evenly">
            <div className="row">
                <div className="col-12">
                    <div className="bifilarImp ms-3 px-5">
                      <form action="" className="bifilarImpForm d-flex justify-content-center">
                        <span>Ingrese el radio del cable [m]</span> <input type="number" id="CBBradioCable"
                            onChange={valorRadioCable} placeholder="122.2e-5"/>
                        <span className="mt-3">Ingrese la distancia entre cable [m]</span> <input type="number"
                            id="CBBdistanciaCables" onChange={valorDistanciaCables} placeholder="122.2e-5"/>
                        <span className="mt-3">Ingrese la conductividad del cable [S/m]</span> <input type="number"
                            id="CBBconductividadCable" onChange={valorConductividadCable} placeholder="122.2e-5"/>
                        <span className="mt-3">Ingrese la conductividad del dielectrico [S/m]</span> <input type="number"
                            id="CBBconductividadDiele" onChange={valorConductividadDiele} placeholder="122.2e-5"/>
                        <span className="mt-3">Ingrese la permitividad relativa</span> <input type="number" id="CBBpermitividad"
                            onChange={valorPermitividad} placeholder="122.2e-5"/>
                        <span className="mt-3">Ingrese la permeabilidad relativa</span> <input type="number" id="CBBpermeabilidad"
                            onChange={valorPermeabilidad} placeholder="122.2e-5"/>
                        <span className="mt-3">Ingrese frecuencia [Hz]</span> <input type="number" id="CBBfrecuencia"
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
                                <label htmlFor="resultadosImpedanciaBifiBajas" className="form-label fw-bold">Impedancia:</label>
                                <textarea readOnly className="form-control text-center fw-bold" id="resultadosImpedanciaBifiBajas" value={resImpCabBifi}></textarea>
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

                  export default BifilarBajaFrec;