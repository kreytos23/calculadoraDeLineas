import {create, all} from 'mathjs'; 
import {useState} from 'react';

function CoaxialAltaFrec() {
  const math = create(all)
  const [radioCond1, setRadioCond1] = useState(null);
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

  let inductancia = (permeabilidad, radioCond1, radioDiel) =>{
    let resultado = (permeabilidad / (2*Math.PI))*(math.log(radioDiel/radioCond1));
    return resultado;
};

let resistividad = (conductividadCond1, radioCond1, radioDiel) => {
    let resultado = (1/(2 * conductividadCond1 * Math.PI * profundidadPenetracion))*((1/radioCond1) + (1/radioDiel));
    return resultado;
};

let capacitancia = (permitividad, radioDiel, radioCond1) => {
    let resultado = (2 * Math.PI * permitividad) / (math.log(radioDiel / radioCond1));
    return resultado;
};

let conductancia = (conductividadDiel, radioDiel, radioCond1) => {
    let resultado = (2 * Math.PI * conductividadDiel) / (math.log(radioDiel / radioCond1));
    return resultado;
};

function impedancia(){
    let inductanciaRes = inductancia(permeabilidad, radioCond1, radioDiele);
    let resistividadRes = resistividad(conductividadCond, radioCond1, radioDiele);
    let capacitanciaRes = capacitancia(permitividad, radioDiele, radioCond1);
    let conductanciaRes = conductancia(conductividadDielectrico, radioDiele, radioCond1);

    let imwL = math.complex(resistividadRes, inductanciaRes*frecuenciaOnda);
    let imwC = math.complex(conductanciaRes, capacitanciaRes*frecuenciaOnda);

    let result = math.sqrt(math.divide(imwL,imwC));
    setResImpCabCoax(result);
  }

  return (
    <div className="App">
    <h5 className="text-center">Cable Coaxial Para Altas Frecuencias</h5>
    <main>
        <div className="container-fluid d-flex flex-row justify-content-md-evenly">
            <div className="row">
                <div className="col-12">
                    <div className="bifilarImp ms-3 px-5">
                      <form action="" className="bifilarImpForm d-flex justify-content-center">
                        <span>Ingrese el radio del conductor 1</span> <input type="text" id="CBBradioCable"
                            onChange={valorRadioCond1} />
                        <span className="mt-3">Ingrese el radio del dieléctrico</span> <input type="text"
                            id="CBBdistanciaCables" onChange={valorRadioDiele} />
                        <span className="mt-3">Ingrese la conductividad del conductor</span> <input type="text"
                            id="CBBconductividadCable" onChange={valorConductividadCond} />
                        <span className="mt-3">Ingrese la conductividad del dielectrico</span> <input type="text"
                            id="CBBconductividadDiele" onChange={valorConductividadDielectrico} />
                        <span className="mt-3">Ingrese la permitividad</span> <input type="text" id="CBBpermitividad"
                            onChange={valorPermitividad} />
                        <span className="mt-3">Ingrese la permeabilidad</span> <input type="text" id="CBBpermeabilidad"
                            onChange={valorPermeabilidad} />
                        <span className="mt-3">Ingrese frecuencia</span> <input type="text" id="CBBfrecuencia"
                            onChange={valorFrecuencia} />
                      </form>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="container-fluid">
                        <div className="row d-flex flex-column justify-content-center">
                            <div className="col-12 d-flex flex-row justify-content-between">
                                <select className="form-select me-4" aria-label="Default select example">
                                    <option selected>Selecciona Conductor</option>
                                    <option value="1">Hierro</option>
                                    <option value="2">Níquel</option>
                                    <option value="3">Latón</option>
                                    <option value="3">Cobre</option>
                                    <option value="3">Plata</option>
                                    <option value="3">Aluminio</option>
                                    <option value="3">Oro</option>
                                    <option value="3">Zinc</option>
                                </select>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Selecciona Dieléctrico</option>
                                    <option value="1">Aire</option>
                                    <option value="2">Baquelita</option>
                                    <option value="3">Vidrio</option>
                                    <option value="3">Nylon</option>
                                    <option value="3">Polietileno</option>
                                    <option value="3">Polipropileno</option>
                                    <option value="3">Poliestireno</option>
                                    <option value="3">Hule</option>
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
    <footer className="mt-4">Todos los derechos reservados S.A. de C.V. R</footer>
</div>  
  );
}

                  export default CoaxialAltaFrec;