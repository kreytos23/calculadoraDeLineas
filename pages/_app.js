import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.css';
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <header >
        <div className="container-fluid py-2 bg-dark text-white mb-4">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <h2>Calculadora de Lineas de Transmisión</h2>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-12 d-flex justify-content-evenly">
              <Link href="/"><button type="button" className="btn btn-primary">Cab. Bifilar Bajas Frec.</button></Link>
              <Link href="/BifilarAltaFrec"><button type="button" className="btn btn-primary">Cab. Bifilar Altas Frec.</button></Link>
              <Link href="/CoaxialBajaFrec"><button type="button" className="btn btn-primary">Coaxial Bajas Frec.</button></Link>
              <Link href="/CoaxialAltaFrec"><button type="button" className="btn btn-primary">Coaxial Altas Frec.</button></Link>
              <Link href="/MicroCinta"><button type="button" className="btn btn-primary">Microcinta</button></Link>
              <Link href="/MedidasBifilar"><button type="button" className="btn btn-primary">Medidas Cab. Bifilar</button></Link>
              <Link href="/MedidasCoaxial"><button type="button" className="btn btn-primary">Medidas Coaxial</button></Link>
              <Link href="/MedidaCinta"><button type="button" className="btn btn-primary">Medidas Microcinta</button></Link>
            </div>
            <span className="mt-3 fst-italic fw-light text-white fs-6 text text-center">Dejar vacio los cuadros para conductividades, permitividades y permeabilidades en caso de seleccionar material</span>
          </div>
        </div>
      </header>
      <Component {...pageProps} />
      <footer className="mt-4 mb-2 fst-italic px-3 fw-light">Cesar Sadrak Martin Moreno, Lineas de Transmisión y Antenas, 3TV2</footer>
    </div>
  )
}

export default MyApp
