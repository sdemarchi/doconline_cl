import './editar-datos-ong.css';
import { ActionButton } from '../../../components/Buttons';
import { InputState } from '../../../components/FormInput';
import Card from '../../../components/card/card';
import Title from '../../../components/title/title';
import { ErrorForm } from '../../../components/Error';
import Spinner from '../../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import NotificacionEmergente from '../../../components/notificacion-emergente/notificacion-emergente';
import { ONGService } from '../../../data/grows';
import MensajeConfirmacion from '../../../components/mensajeConfirmacion/mensajeConfirmacion';
import { useState,useEffect } from 'react';

export default function EditarDatosONG() {
    const navigate = useNavigate();
    const grow = JSON.parse(sessionStorage.getItem('user-grow'));
    const userData = JSON.parse(sessionStorage.getItem('user_data'));
    const [ requiredError, setRequiredError ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ cargando, setCargando ] = useState(false);
    const [ nombreYApellido, setNombreYApellido ] = useState(grow?.titular);
    const [ dni, setDni ] = useState(userData?.dni); 
    const [ dniError, setDniError] = useState(false);
    const [mostrarMensajeFinalizado, setMostrarMensajeFinalizado] = useState(false);


    const validar = () => {
      if (!nombreYApellido || !dni) {
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
        ONGService.editarDatosONG(grow.idgrow, { nombreApellido: nombreYApellido, dni: dni })
        .then(() => {
          userData.dni = dni;
          grow.titular = titular;
          setCargando(false);
          setMostrarMensajeFinalizado(true)

        }).catch(() => {
          setCargando(false);

        });

      }else{
        setCargando(false);
      }
    }



    return(
      <div className="editar-ong-container page">
       <MensajeConfirmacion
         mensaje="Datos modificados correctamente"
         mostrarSi={true}
         mostrarCancelar={false}
         onAceptar={() => {
            setMostrarMensajeFinalizado(true);
            navigate("/tu-grow/");
         }}
 
         onCancelar={() => setMostrarConfirmacionDesvincular(false)}
       />
 
      { cargando ? <Spinner/> :
        <div className="editar-ong-content">
          <Title>Editar datos del titular</Title>
          
          <Card>
            <InputState defaultValue={nombreYApellido} label='Nombre y apellido' setState={setNombreYApellido}/>
            <InputState defaultValue={dni} label='DNI' setState={setDni} />
            <ErrorForm show={requiredError}>Todos los campos son requeridos</ErrorForm>
            <ErrorForm show={dniError}>El DNI debe contener solo números</ErrorForm>
          </Card>

          <ActionButton onClick={()=>submit()} value="Guardar Cambios"/>
          <button className="editar-ong-volver" onClick={()=>navigate('/tu-grow/')}>Volver</button>
          </div>
        }
        <NotificacionEmergente show={error} setShow={setError} text="Ha ocurrido un error" />
      </div>
    );
};