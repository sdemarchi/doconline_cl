import Title from '../../../components/title/Title';
import Info from '../../../components/info/Info';
import Card from '../../../components/card/card';
import { ActionButton } from '../../../components/Buttons';
import NotificacionEmergente from '../../../components/notificacion-emergente/notificacion-emergente.jsx';
import { InputState } from '../../../components/FormInput';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './regalar-finalizar.css';
import { copyToClipboard } from '../../../utils/utilFunctions';
import { FaRegCopy } from "react-icons/fa6";


export default function RegalarSuccess(){
  const navigate = useNavigate();
  const { codigo } = useParams();
  const [ notificacion, setNotificacion ] = useState(false);

  const copiarCodigo = () =>{
    copyToClipboard(codigo);
    setNotificacion(true);
  }


  return (
    <div className="rf-container">
      <Title>Finalizar</Title>
      <Info text="El beneficiario debera registrarse con el email proporcionado o utilizar el siguiente codigo."/>
      
      <div onClick={()=>copiarCodigo()} className="mt-6 mb-10">
        <Card title="Comparte este código con el beneficiario.">
          <div className="rf-codigo">
            <span>{codigo}</span><span className="ml-3" style={{opacity:"70%"}}><FaRegCopy /></span>
          </div>
        </Card>
      </div>
      <NotificacionEmergente text="Codigo copiado al portapapeles" show={notificacion} setShow={setNotificacion}/>
      <ActionButton onClick={() => navigate('/panel')} value="Finalizar"/>
 
    </div>
  )
}