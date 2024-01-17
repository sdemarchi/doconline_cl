import './regalar.css';
import Title from '../../components/title/Title';
import Info from '../../components/info/Info';
import Card from '../../components/card/card';
import { ActionButton } from '../../components/Buttons';
import { InputState } from '../../components/FormInput';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Regalar(){
  const navigate = useNavigate();

  const [ nombre, setNombre ] = useState();
  const [ email, setEmail ] = useState();

  const [ showError, setShowError ] = useState();

  const continuar = () => {
    if((nombre && nombre !== '') && (email && email !== '') ){
      navigate('/regalar-pago/' + nombre + '/' + email);
    }else{
      setShowError(true);
    }
  }


  return (
    <div className='regalar-container'>
        <Title>Paga el tramite a un amigo</Title>
        <Info fontSize='15.5px' text="Te daremos un código con el cual tu amigo podrá acceder a realizar el trámite." />
        <div className="mt-4 pb-3">
          <Card>
            <InputState setState={setNombre} label="Nombre del beneficiario"/>
            <InputState setState={setEmail} label="Email del beneficiario"/>

            {showError && <p style={{fontSize:'14px',color:'red'}}>Los campos son obligatorios.</p>}
          </Card>
        </div>
  
        <div className='pb-2 mt-4'>
          <ActionButton onClick={()=>continuar()} value="Continuar"/>
        </div>
        <div className='mx-auto p-2 text-center'>
            <button className='text-gray-500' onClick={() => navigate('/panel')}>Volver</button>
        </div>
    </div>
  )
}

