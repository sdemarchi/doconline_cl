import { Form, Link } from 'react-router-dom'
import logo from '../assets/logo-doconline-500.png'
import DataBox from '../components/DataBox'
import { LinkButton } from '../components/Buttons'
import FormInput from '../components/FormInput'
function TurnoConf() {
    return (
        <>
            <img className="mx-auto w-50 pb-2" src={logo}></img>
            <h6 className="text-gray-500 text-xs font-semibold pt-10">Confirmación de Turno</h6>
            <div className="block w-full p-2 my-1 border-input focus:border-input border-2 text-xs">
                <strong>Lugar:</strong>Whatsapp<br/>
                <strong>Turno:</strong>10:00<br/>
                Miércoles 10 de Mayo - 2023
                <strong>Dr. Joaquín Jozami</strong>
            </div>    
            <h6 className="text-gray-500 text-xs font-semibold">Recibirás un e-mail con los
            datos de tu formulario. Revisalos que estén en orden. Cualquier modificación se podrá realizar
            durante la consulta médica</h6>
            <div className='my-10'><FormInput label="Adjuntá tu comprobante de pago" placeholder="Seleccionar archivo" /></div>
            <div className='pt-2'><LinkButton to="/turno-success" value="Enviar" /></div>
            
        </>
    )
}

export default TurnoConf