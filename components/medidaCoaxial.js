import {create, all} from 'mathjs'; 
import {useState} from 'react';

function MedidasCoaxial() {
    const permitividadDelVacio = 8.8541*Math.pow(10,-12);
    const math = create(all)
    
    const [radioCond, setRadioCond] = useState(null);
    const [resistividad, setResistividad] = useState(null);
    const [capacitancia, setCapacitancia] = useState(null);
    const [conductividadConductor, setConductividadConductor] = useState(null);
    const [permitividadRelativa, setPermitividadRelativa] = useState(null);

    const [resRadioDielectrico, setResRadioDielectrico] = useState(0);
    const [resRadioExterno, setResRadioExterno] = useState(0);


    const valorRadioCond = (e) => {
        setRadioCond(e.target.value);
    }

    const valorPermitividad = (e) => {
        setPermitividadRelativa(e.target.value);
    }

    const valorCapacitancia = (e) => {
        setCapacitancia(e.target.value);
    }

    const valorResistividad = (e) => {
        setResistividad(e.target.value);
    }

    const valorConductividad = (e) => {
        setConductividadConductor(e.target.value);
    }

    function radios(){
        let parseRadioCond = math.evaluate(radioCond);
        let parsePermitividad = math.evaluate(permitividadRelativa);
        let parseCapacitancia = math.evaluate(capacitancia);
        let parseConductividadConductor = math.evaluate(conductividadConductor);
        let parseResistividad = math.evaluate(resistividad);

        let radioDielectrico = (parseRadioCond)*(Math.pow(Math.E, (2*Math.PI*parsePermitividad*permitividadDelVacio)/parseCapacitancia));
        let radioExterno = math.sqrt((1/((parseResistividad*parseConductividadConductor*Math.PI) - (1/parseRadioCond**2))) + radioDielectrico**2);
        
        setResRadioDielectrico(radioDielectrico);
        setResRadioExterno(radioExterno)
    }

    return (
        <div className="App">
        <h5 className="text-center">Radios Para Cable Coaxial</h5>
        <main>
            <div className="container-fluid d-flex flex-row justify-content-md-evenly">
                <div className="row">
                    <div className="col-12">
                        <div className="bifilarImp ms-3 px-5">
                        <form action="" className="bifilarImpForm d-flex justify-content-center">
                            <span>Ingrese el radio del conductor interno</span> <input type="text" id="CBBradioCable"
                                onChange={valorRadioCond} />
                            <span className="mt-3">Ingrese la permitividad</span> <input type="text"
                                id="CBBdistanciaCables" onChange={valorPermitividad} />
                            <span className="mt-3">Ingrese la capacitancia de la linea</span> <input type="text"
                                id="CBBdistanciaCables" onChange={valorCapacitancia} />
                            <span className="mt-3">Ingrese la resistividad de la linea</span> <input type="text"
                                id="CBBdistanciaCables" onChange={valorResistividad} />
                            <span className="mt-3">Ingrese la conductividad del conductor</span> <input type="text"
                                id="CBBdistanciaCables" onChange={valorConductividad} />
                        </form>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="container-fluid">
                            <div className="row d-flex flex-column justify-content-center">
                                <div className="col-12 d-flex justify-content-center my-3">
                                    <button type="button" className="btn btn-primary" onClick={radios}>Aceptar</button>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="resultadosImpedanciaBifiBajas" className="form-label">Distancia Entre Cables:</label>
                                    <textarea readOnly className="form-control text-center fw-bold" id="resultadosImpedanciaBifiBajas" value={"Radio del Dielectrico: " + resRadioDielectrico + " Radio externo: " + resRadioExterno}></textarea>
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

                  export default MedidasCoaxial;