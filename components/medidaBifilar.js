import {create, all} from 'mathjs'; 
import {useState} from 'react';

function MedidasBifilar() {
    const permitividadDelVacio = 8.8541*Math.pow(10,-12);
    const math = create(all)
    const [radioCable, setRadioCable] = useState(null);
    const [permitividadRelativa, setPermitividadRelativa] = useState(null);
    const [capacitancia, setCapacitancia] = useState(null);

    const [resMedidaBifilar, setResMedidaBifilar] = useState(null);

    const valorRadioCable = (e) => {
        setRadioCable(e.target.value);
    }

    const valorPermitividad = (e) => {
        setPermitividadRelativa(e.target.value);
    }

    const valorCapacitancia = (e) => {
        setCapacitancia(e.target.value);
    }

    function distanciaCables(){
        let parseRadioCable = math.evaluate(radioCable);
        let parsePermitividad = math.evaluate(permitividadRelativa);
        let parseCapacitancia = math.evaluate(capacitancia);
        
        let resultado =  parseRadioCable*(Math.pow(Math.E, (Math.PI*parsePermitividad*permitividadDelVacio)/parseCapacitancia));
        setResMedidaBifilar(resultado);
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
                            <span>Ingrese el radio del Cable [m]</span> <input type="number" id="CBBradioCable"
                                onChange={valorRadioCable} />
                            <span className="mt-3">Ingrese la permitividad relativa</span> <input type="number"
                                id="CBBdistanciaCables" onChange={valorPermitividad} />
                            <span className="mt-3">Ingrese la capacitancia de la linea</span> <input type="number"
                                id="CBBdistanciaCables" onChange={valorCapacitancia} />
                        </form>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="container-fluid">
                            <div className="row d-flex flex-column justify-content-center">
                                <div className="col-12 d-flex justify-content-center my-3">
                                    <button type="button" className="btn btn-primary" onClick={distanciaCables}>Aceptar</button>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="resultadosImpedanciaBifiBajas" className="form-label">Distancia Entre Cables:</label>
                                    <textarea readOnly className="form-control text-center fw-bold" id="resultadosImpedanciaBifiBajas" value={resMedidaBifilar}></textarea>
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

                  export default MedidasBifilar;