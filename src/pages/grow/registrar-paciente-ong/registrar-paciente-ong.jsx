import { ActionButton, LinkButton } from '../../../components/Buttons';
import { InputState, SelectState } from '../../../components/FormInput';
import Card from '../../../components/card/card';
import Title from '../../../components/title/title';
import './registrar-paciente-ong.css';
import { useState } from 'react';
import { ErrorForm } from '../../../components/Error';
import Spinner from '../../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import NotificacionEmergente from '../../../components/notificacion-emergente/notificacion-emergente';
import Info from '../../../components/info/info';
import { ONGService } from '../../../data/grows';

export default function RegistrarPacienteOng(){
  const navigate = useNavigate();
  const grow = JSON.parse(sessionStorage.getItem('user-grow'));
  const [ requiredError, setRequiredError ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ inSubmit, setInSubmit ] = useState(false);
  const [nombre, setNombre ] = useState();
  const [apellido, setApellido ] = useState(); 
  const [dni, setDni ] = useState(); 
  const [dniError, setDniError] = useState(false); 

  const validar = () => {
    if (!nombre || !apellido || !dni) {
      setRequiredError(true);
      return false;
    }

    const dniValido = /^\d+$/.test(dni);
    if(!dniValido){
      setDniError(true);
      return false;
    }

    setDniError(false);
    setRequiredError(false);
    return true;
  };
  
  const submit = () => {
    setInSubmit(true);
    const formularioValido = validar();

    if(formularioValido === true){
      ONGService.agregarPacienteONG(grow.idgrow, { nombre, apellido, dni })
      .then(() => {
        setInSubmit(false);
        navigate("/tu-grow/");

    }).catch(() => {
      setInSubmit(false);
    });

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
          <Info text="Registra a un paciente para que pueda acceder al beneficio de tu ONG. El mismo deberá registrarse con el mismo DNI y reservar un turno para acceder al beneficio." />
          <InputState label='Nombre del paciente' setState={setNombre}/>
          <InputState label='Apellido del paciente' setState={setApellido}/>
          <InputState label='DNI del paciente' setState={setDni} />
          <ErrorForm show={requiredError}>Todos los campos son requeridos</ErrorForm>
          <ErrorForm show={dniError}>El DNI debe contener solo números</ErrorForm>
        </Card>

        <ActionButton onClick={()=>submit()} value="Registrar Paciente" />
        <button className="registrar-paciente-volver" onClick={()=>navigate('/tu-grow/')}>Volver</button>
        </div>
      }
      <NotificacionEmergente show={error} setShow={setError} text="Ha ocurrido un error" />
    </div>
  );
};