import icon from '../../assets/icon-error.png';
import { LinkButton } from '../../components/Buttons';
import Contacto from '../../components/contacto/contacto';
import './formReprocann.css';

function FormError() {
    return (
        <div className="form-rep-container">
            <h1 className='text-xl font-extrabold text-center text-red-500'>OCURRIÓ UN ERROR AL ENVIAR EL FORMULARIO</h1>
            <img className="mx-auto w-14 py-10" src={icon}></img>
            <div className='pb-2'><LinkButton to="/panel" value="Volver al Perfil" /></div>

            
            <div className="form-rep-contacto">
                <Contacto />
            </div>
        </div>
    )
}

export default FormError;