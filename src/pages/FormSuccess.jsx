//import { Link } from 'react-router-dom'
import logo from '../assets/logo-doconline-vert.png'
import icon from '../assets/icon-success.png'
//import FormInput from '../components/FormInput'
import {/* SubmitButton,*/ LinkButton } from '../components/Buttons'

function FormSuccess() {
    return (
        <>
            <img className="mx-auto mb-8 w-20 pb-10" src={logo}></img>
            <h1 className='text-xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-grad-green to-grad-blue'>DATOS INGRESADOS GUARDADOS CON EXITO</h1>
            <img className="mx-auto w-14 py-10" src={icon}></img>
            <div className='pb-2'><LinkButton to="/panel" value="Volver al Perfil" /></div>
            <LinkButton to="/turno" value="Sacar Turno Online" />


        </>
    )
}

export default FormSuccess