import {create, all} from 'mathjs'; 
import {useState} from 'react';

function MicroCinta() {
    const math = create(all)
    const [ancho, setAncho] = useState(null);
    const [largo, setLargo] = useState(null);
    const [permitividad, setPermitividad] = useState(null);

    const [resImpMicroCinta, setResImpMicroCinta] = useState(null);

    const valorAncho = (e) => {
        setAncho(e.target.value);
    }

    const valorLargo = (e) => {
        setLargo(e.target.value);
    }

    const valorPermitividad = (e) => {
        setPermitividad(e.target.value);
    }

    function impedancia(){
        let parseLargo = math.evaluate(largo);
        let parseAncho = math.evaluate(ancho);
        let parsePermitividad = math.evaluate(permitividad);
        
        let result;
        if(parseLargo/parseAncho <= 1){
            result = (60/math.sqrt(permitividad))(((8*parseAncho)/parseLargo)+(parseLargo/(4*parseAncho)));
        }else{
            result = (120*Math.PI)/((math.sqrt(parsePermitividad))*((parseLargo/parseAncho) + 1.393 + (0.667)*(math.log((parseLargo/parseAncho)+(1.444)))));
        }
        setResImpMicroCinta(result);
    }

    return (
        <div className="App">
        <h5 className="text-center">Micro Cinta</h5>
        <main>
            <div className="container-fluid d-flex flex-row justify-content-md-evenly">
                <div className="row">
                    <div className="col-12">
                        <div className="bifilarImp ms-3 px-5">
                        <form action="" className="bifilarImpForm d-flex justify-content-center">
                            <span>Ingrese el ancho de la cinta</span> <input type="text" id="CBBradioCable"
                                onChange={valorAncho} />
                            <span className="mt-3">Ingrese el largo de la cinta</span> <input type="text"
                                id="CBBdistanciaCables" onChange={valorLargo} />
                            <span className="mt-3">Ingrese la permitividad de la cinta</span> <input type="text"
                                id="CBBdistanciaCables" onChange={valorPermitividad} />
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
                                    <textarea readOnly className="form-control text-center fw-bold" id="resultadosImpedanciaBifiBajas" value={resImpMicroCinta}></textarea>
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

                  export default MicroCinta;