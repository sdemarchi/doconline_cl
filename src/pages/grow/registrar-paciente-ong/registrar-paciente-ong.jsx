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
import { agregarPacienteONG } from '../../../data/grows';
import Info from '../../../components/info/info';

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

    // Expresión regular que verifica que solo haya dígitos del 0 al 9
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
      agregarPacienteONG(grow.idgrow, { nombre, apellido, dni })
      .then(() => {
        setInSubmit(false);
        navigate("/tu-grow/"+grow.idgrow);

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
          <Info text="Al registrar un paciente el mismo tendrá acceso al beneficio de tu ONG. El paciente aparecera en tus estadisticas una vez se registre y saque su turno." />
          <InputState label='Nombre del paciente' setState={setNombre}/>
          <InputState label='Apellido del paciente' setState={setApellido}/>
          <InputState label='DNI del paciente' setState={setDni} />
          <ErrorForm show={requiredError}>Todos los campos son requeridos</ErrorForm>
          <ErrorForm show={dniError}>El DNI debe contener solo números</ErrorForm>
        </Card>

        <ActionButton onClick={()=>submit()} value="Registrar Paciente" />
        <button className="registrar-paciente-volver" onClick={()=>navigate('/tu-grow/'+grow.idgrow)}>Volver</button>
        </div>
      }
      <NotificacionEmergente show={error} setShow={setError} text="Ha ocurrido un error" />
    </div>
  );
};