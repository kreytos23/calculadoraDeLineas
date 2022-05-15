import {create, all} from 'mathjs'; 
import {useState} from 'react';

function MedidasCinta() {
 
    const math = create(all)
    const [impedancia, setImpedancia] = useState(null);
    const [permitividadRelativa, setPermitividadRelativa] = useState(null);
    const [dimensionRatio, setDimensionRatio] = useState(null);

    const [resMedidaCinta, setResMedidaCinta] = useState(null);

    const valorImpedancia = (e) => {
        setImpedancia(e.target.value);
    }

    const valorPermitividad = (e) => {
        setPermitividadRelativa(e.target.value);
    }

    const valorRatio = (e) => {
        setDimensionRatio(e.target.value);
    }

    function medidaCinta(){
        let parseImpedancia = math.evaluate(impedancia);
        let parsePermitividad = math.evaluate(permitividadRelativa);
        let resultado;

        if(dimensionRatio == 0){
            let Aop = ((parseImpedancia/60)*(math.sqrt((parsePermitividad + 1)/(2)))) + (((parsePermitividad  -1 )/(parsePermitividad +1))*(0.23 + (0.11/permitividadRelativa)));
            resultado =  (8*(Math.E**Aop))/(Math.pow(Math.E,(2*Aop)) - 2);
        }else{
            let Bop = (377 * Math.PI)/(2*parseImpedancia*math.sqrt(parsePermitividad));
            resultado = (2/Math.PI)*(Bop - 1 - math.log((2*Bop) - 1) + (((parsePermitividad  - 1)/(2*parsePermitividad))*(math.log(Bop - 1) + 0.39 - (0.61/parsePermitividad))));        
        }
        setResMedidaCinta(resultado);
    }

    return (
        <div className="App">
        <h5 className="text-center">Distancia Entre Cables para Cable Bifilar</h5>
        <main>
            <div className="container-fluid d-flex flex-row justify-content-md-evenly">
                <div className="row">
                    <div className="col-12">
                        <div className="bifilarImp ms-3 px-5">
                        <form action="" className="bifilarImpForm d-flex justify-content-center">
                            <span>Ingrese la impedancia de la cinta</span> <input type="text" id="CBBradioCable"
                                onChange={valorImpedancia} />
                            <span className="mt-3">Ingrese la permitividad</span> <input type="text"
                                id="CBBdistanciaCables" onChange={valorPermitividad} />
                            <span className="mt-3">Seleccione la aproximación de las dimensiones</span>
                            <select className="form-select me-4 mt-1" aria-label="Default select example" onChange={valorRatio}>
                                <option selected value="0">{"W/d < 2"}</option>
                                <option value="1">{"W/d > 2"}</option>
                            </select>
                        </form>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="container-fluid">
                            <div className="row d-flex flex-column justify-content-center">
                                <div className="col-12 d-flex justify-content-center my-3">
                                    <button type="button" className="btn btn-primary" onClick={medidaCinta}>Aceptar</button>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="resultadosImpedanciaBifiBajas" className="form-label">Distancia Entre Cables:</label>
                                    <textarea readOnly className="form-control text-center fw-bold" id="resultadosImpedanciaBifiBajas" value={resMedidaCinta}></textarea>
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

                  export default MedidasCinta;