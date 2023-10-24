import icon from '../../assets/icon-success.png';
//import { useState } from 'react';
import {/* SubmitButton,*/ LinkButton } from '../../components/Buttons';
import useTurno from '../../hooks/useTurno';
import Contacto from '../../components/contacto/contacto';
import './turno.css';

function TurnoSuccess() {
   // const [ formularioCompletado, setFormularioCompletado ] = useState(false);
    const { turno } = useTurno()
    const turnoSession = JSON.parse(sessionStorage.getItem("turno"));
    const comprobanteEnviado = JSON.parse(sessionStorage.getItem("comprobante-enviado"));
    const formularioCompletado = JSON.parse(sessionStorage.getItem("form-success"));

    return (
        <div className="turno-container">
            {comprobanteEnviado ? 
            <>
                        {/*<img className="mx-auto mb-8 w-52 pb-2" src={logo}></img>*/}

                <h1 className='text-xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-grad-green to-grad-blue'>FELICITACIONES<br />TURNO CONFIRMADO</h1>
                <img className="mx-auto w-14 pt-8" src={icon}></img>
            </> :
            <>
            {/*<img className="mx-auto mb-8 w-52 pb-2" src={logo}></img>*/}
            <h1 className='text-xl font-extrabold mb-5 text-center text-transparent bg-clip-text bg-gradient-to-r from-grad-green to-grad-blue'>FELICITACIONES</h1>
            <h3 className='text-lg font-semibold text-center bg-clip-text' style={{color:"#343434"}}>Envianos el comprobante de pago por Whatsapp para evitar la cancelacion del turno.</h3>
            <img className="mx-auto w-14 pt-8 opacity-90" src={icon}></img>
            </> 
            }
            <div className="block w-full my-8 p-1 border-input focus:border-input border-2 text-center rounded-md ">
                <h4 className="text-gray-500 text-sm font-bold pt-1">{turno.detalle || turnoSession.detalle}</h4>
            </div>
            
            { formularioCompletado === true ?
            <div className='pb-2'><LinkButton to="/panel" value="Volver al Perfil"/></div>:
            <div className='pb-2'><LinkButton to='/formulario-1' value="Continuar"/></div>
            }

            <div className="turno-contacto">
                <Contacto/>
            </div>

        </div>
    )
}

export default TurnoSuccess