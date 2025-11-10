import icon from '../../assets/icon-success.png';
//import { useState } from 'react';
import {/* SubmitButton,*/ ActionButton, LinkButtonCenter } from '../../components/Buttons';
import useTurno from '../../hooks/useTurno';
import Contacto from '../../components/contacto/contacto';
import './turno.css';
import Card from '../../components/card/card';
import { useNavigate } from 'react-router-dom';

function TurnoSuccess() {
   // const [ formularioCompletado, setFormularioCompletado ] = useState(false);
    const { turno } = useTurno()
    const turnoSession = JSON.parse(localStorage.getItem("turno"));
    const comprobanteEnviado = JSON.parse(sessionStorage.getItem("comprobante-enviado"));
    const formularioCompletado = JSON.parse(localStorage.getItem("form-success"));
    const pago = JSON.parse(sessionStorage.getItem("pago")|| {});
    const navigate = useNavigate();


    return (
        <div className="turno-container page">
            <div className="turno-success-content">
                <Card disabledBorder>
                {comprobanteEnviado || (pago.id && (pago.id_paciente !== pago.id_pagador)) ? 
                <>
                    <h1 className='font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-grad-green to-grad-blue' style={{fontSize:'30px'}}>FELICITACIONES<br />TURNO CONFIRMADO</h1>
                    <img className="mx-auto w-14 pt-8" src={icon}></img>
                </> :
                <>
                <h1 className='font-extrabold mb-5 text-center text-transparent bg-clip-text bg-gradient-to-r from-grad-green to-grad-blue' style={{fontSize:'30px'}}>FELICITACIONES</h1>
                <h3 className='text-lg font-semibold text-center bg-clip-text' style={{color:"#343434"}}>Envianos el comprobante de pago por Whatsapp para evitar la cancelacion del turno.</h3>
                <img className="mx-auto w-14 pt-8 opacity-90" src={icon}></img>
                </> 
                }
                <div className="turno-success-mensaje">
                    <h4 className="text-sm font-bold pt-1 text-center">{turno.detalle || turnoSession.detalle}</h4>
                </div>
                
                { formularioCompletado === true ?
                <div className='pb-2'><ActionButton onClick={()=>navigate("/panel")} value="Volver al Perfil"/></div>:
                <div className='pb-2'><ActionButton onClick={()=>navigate('/formulario-1')} value="Continuar"/></div>
                }

                <div className="turno-contacto">
                    <Contacto/>
                </div>

                </Card>
            </div>

        </div>
    )
}

export default TurnoSuccess