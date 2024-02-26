import './regalar.css';
import Title from '../../components/title/title';
import Info from '../../components/info/Info';
import Card from '../../components/card/card';
import { ActionButton } from '../../components/Buttons';
import { InputState } from '../../components/FormInput';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Regalar(){
  const navigate = useNavigate();

  const [ nombre, setNombre ] = useState();
  const [ email, setEmail ] = useState();

  const [ errorMensaje ,setErrorMensaje ] = useState();
  const [ showError, setShowError ] = useState();

  const continuar = () => {
    if((nombre && nombre !== '') && (email && email !== '') ){
      if(validarEmail(email)){
        sessionStorage.setItem('nombre_beneficiario',nombre);
        sessionStorage.setItem('email_beneficiario',email);

        navigate('/regalar-pago');
      }else{
        setErrorMensaje('Ingresa un email valido.');
        setShowError(true);
      }
    }else{
      setErrorMensaje('Los campos son obligatorios.');
      setShowError(true);
    }
  }

  const validarEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };

  return (
    <div className='regalar-container page'>
        <Title>Paga el tramite a un amigo</Title>
        <div className='regalar-content'>
        <Info fontSize='15.5px' text="Te daremos un código con el cual tu amigo podrá acceder a realizar el trámite." />
          <div className="mt-4 pb-3">
            <Card>
              <InputState setState={setNombre} label="Nombre del beneficiario"/>
              <InputState setState={setEmail} label="Email del beneficiario"/>

              {showError && <p style={{fontSize:'14px',color:'red'}}>{errorMensaje}</p>}
            </Card>
          </div>
    
          <div className='pb-2 mt-4'>
            <ActionButton onClick={()=>continuar()} value="Continuar"/>
          </div>
          <div className='mx-auto p-2 text-center'>
              <button className='text-gray-500' onClick={() => navigate('/panel')}>Volver</button>
          </div>
        </div>
    </div>
  )
}

