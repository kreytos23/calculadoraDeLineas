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
        setResImpMicroCinta(result.toFixed(3));
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
                            <span>Ingrese el ancho de la cinta [m]</span> <input type="number" id="CBBradioCable"
                                onChange={valorAncho} />
                            <span className="mt-3">Ingrese el largo de la cinta [m]</span> <input type="number"
                                id="CBBdistanciaCables" onChange={valorLargo} />
                            <span className="mt-3">Ingrese la permitividad relativa efectiva de la cinta</span> <input type="number"
                                id="CBBdistanciaCables" onChange={valorPermitividad} />
                        </form>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="container-fluid">
                            <div className="row d-flex flex-column justify-content-center">
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
    </div>  
    );
}

                  export default MicroCinta;