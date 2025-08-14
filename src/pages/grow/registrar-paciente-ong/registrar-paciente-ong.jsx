import { ActionButton, LinkButton } from '../../../components/Buttons';
import { InputState, SelectState } from '../../../components/FormInput';
import Card from '../../../components/card/card';
import Title from '../../../components/title/title';
import './registrar-paciente-ong.css';
import { getProvincias } from '../../../data/pacientes';
import { useState, useEffect } from 'react';
import Error, { ErrorForm } from '../../../components/Error';
import { addGrow } from '../../../data/grows';
import Spinner from '../../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import NotificacionEmergente from '../../../components/notificacion-emergente/notificacion-emergente';

export default function RegistrarPacienteOng(){
  const navigate = useNavigate();

  const [ requiredError, setRequiredError ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ inSubmit, setInSubmit ] = useState(false);

  const [nombre, setNombre ] = useState();
  const [dni, setDni ] = useState();


  const validar = () => {
    if(!nombre || !dni){
      setRequiredError(true);
      return false;
    };
    
    setRequiredError(false);
    return true;
  }

  const submit = () => {
    setInSubmit(true);
    const formularioValido = validar();


    if(formularioValido === true){
     
    }else{
      setInSubmit(false);
    }
  }


  return(
    <div className="registrar-paciente-container page">
     { inSubmit? <Spinner/> :
      <div className="registrar-paciente-content">
        <Title>Registrar paciente</Title>
        
        <Card>
          <InputState label='Nombre del paciente' setState={setNombre}/>
          <InputState label='DNI del paciente' setState={setDni} />
          <ErrorForm show={requiredError}>Todos los campos son requeridos</ErrorForm>
        </Card>

        <ActionButton onClick={()=>submit()} value="Registrar Grow" />
        <button className="registrar-paciente-volver" onClick={()=>navigate('/panel')}>Volver</button>
        </div>
      }
      <NotificacionEmergente show={error} setShow={setError} text="Ha ocurrido un error" />
    </div>
  );
};