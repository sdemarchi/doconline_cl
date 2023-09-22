import './ayuda.css';
import Nav from '../../components/nav/nav';
import Contacto from '../../components/contacto/contacto';

function Ayuda(){
  return(
    <div className="ayuda-container">
      <h1 className="ayuda-titulo">¿En que podemos ayudarte?</h1>


      <div className="main-contacto">
          <Contacto/>
      </div>

      <Nav/>
    </div>
  );
}

export default Ayuda;