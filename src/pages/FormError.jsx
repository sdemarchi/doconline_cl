import logo from '../assets/logo-doconline-vert.png'
import icon from '../assets/icon-error.png'
import { LinkButton } from '../components/Buttons'

function FormError() {
    return (
        <>
            <img className="mx-auto w-20 pb-10" src={logo}></img>
            <h1 className='text-xl font-extrabold text-center text-red-500'>OCURRIÓ UN ERROR AL ENVIAR EL FORMULARIO</h1>
            <img className="mx-auto w-14 py-10" src={icon}></img>
            <div className='pb-2'><LinkButton to="/panel" value="Volver al Perfil" /></div>


        </>
    )
}

export default FormError