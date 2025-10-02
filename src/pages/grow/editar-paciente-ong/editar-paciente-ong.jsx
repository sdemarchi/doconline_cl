import { ActionButton, LinkButton } from '../../../components/Buttons';
import { InputState, SelectState } from '../../../components/FormInput';
import Card from '../../../components/card/card';
import Title from '../../../components/title/title';
import './editar-paciente-ong.css';
import { useEffect, useState } from 'react';
import { ErrorForm } from '../../../components/Error';
import Spinner from '../../../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import NotificacionEmergente from '../../../components/notificacion-emergente/notificacion-emergente';
import Info from '../../../components/info/info';
import { ONGService } from '../../../data/grows';
import CifradoHelper from '../../../utils/CifradoHelper';

export default function EditarPacienteOng(){
  const { idPaciente } = useParams();
  const idPacienteDescifrado = CifradoHelper.descifrar(idPaciente);
  const navigate = useNavigate();
  const grow = JSON.parse(sessionStorage.getItem('user-grow'));
  const [ requiredError, setRequiredError ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ cargando , setCargando ] = useState(true);
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
    setCargando(true);
    const formularioValido = validar();

    if(formularioValido === true){
      ONGService.editarPacienteONG(idPacienteDescifrado, {nombre, apellido, dni })
      .then(() => {
        setCargando(false);
        navigate("/estadisticas-ong/");

    }).catch(() => {
      setCargando(false);
    });

    }else{
      setCargando(false);
    }
  }

  useEffect(()=>{
    ONGService.getPacienteONG(idPacienteDescifrado).then( pacienteResp =>{
      setNombre(pacienteResp.nombre);
      setApellido(pacienteResp.apellido);
      setDni(pacienteResp.dni);

      setCargando(false);
    });
  },[]);

  return(
    <div className="registrar-paciente-container page">
     { cargando ? <Spinner/> :
      <div className="registrar-paciente-content">
        <Title>Editar paciente</Title>
        
        <Card>
          <InputState defaultValue={nombre} label='Nombre del paciente' setState={setNombre}/>
          <InputState defaultValue={apellido} label='Apellido del paciente' setState={setApellido}/>
          <InputState defaultValue={dni} label='DNI del paciente' setState={setDni} />
          <ErrorForm show={requiredError}>Todos los campos son requeridos</ErrorForm>
          <ErrorForm show={dniError}>El DNI debe contener solo números</ErrorForm>
        </Card>

        <ActionButton onClick={()=>submit()} value="Guardar cambios" />
        <button className="registrar-paciente-volver" onClick={()=>navigate('/estadisticas-ong/')}>Volver</button>
        </div>
      }
      <NotificacionEmergente show={error} setShow={setError} text="Ha ocurrido un error" />
    </div>
  );
};