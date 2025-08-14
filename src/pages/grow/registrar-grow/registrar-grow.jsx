import { ActionButton, LinkButton } from '../../../components/Buttons';
import { InputState, SelectState } from '../../../components/FormInput';
import Card from '../../../components/card/card';
import Title from '../../../components/title/title';
import './registrar-grow.css';
import { getProvincias } from '../../../data/pacientes';
import { useState, useEffect } from 'react';
import Error, { ErrorForm } from '../../../components/Error';
import { addGrow } from '../../../data/grows';
import Spinner from '../../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import NotificacionEmergente from '../../../components/notificacion-emergente/notificacion-emergente';

export default function RegistrarGrow(){
  const email = sessionStorage.getItem('email');
  const titular = sessionStorage.getItem('nombre');
  const celular = sessionStorage.getItem('telefono');

  const navigate = useNavigate();

  const [ provincias, setProvincias ] = useState();
  const [ requiredError, setRequiredError ] = useState(false);
  const [ provinceError, setProvinceError ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ inSubmit, setInSubmit ] = useState(false);

  const [tipo, setTipo ] = useState();
  const [provincia, setProvincia ] = useState();
  const [nombreGrow, setNombreGrow ] = useState();
  const [cbu, setCbu ] = useState();
  const [alias, setAlias ] = useState();
  const [localidad, setLocalidad ] = useState();
  const [cp, setCp] = useState();
  const [direccion, setDireccion ] = useState();

  const validar = () => {
    if(!provincia || !nombreGrow || !cbu || !alias || !localidad || !cp || !direccion || tipo == 0){
      setRequiredError(true);
      setProvinceError(false);
      return false;
    };

    if(provincia === 0){
      setProvinceError(true);
      setProvinceError(false);
      return false;
    }

    setProvinceError(false);
    setRequiredError(false);
    return true;
  }

  const submit = () => {
    setInSubmit(true);
    const formularioValido = validar();

    const grow = {
      nombre: nombreGrow,
      tipo: tipo,
      cbu: cbu,
      alias: alias,
      titular: titular,
      mail: email,
      instagram: "",
      celular: celular,
      idprovincia: provincia,
      localidad: localidad,
      direccion: direccion,
      cp: cp,
      descuento: 18
    }    
    

    if(formularioValido === true){
      addGrow(grow).then((resp)=>{
        if(resp.idgrow){
          sessionStorage.setItem('grow-success', resp.id);
          sessionStorage.setItem('growId',resp.id)
          sessionStorage.setItem('user-grow',JSON.stringify(resp));
          sessionStorage.setItem('user-grow-id',JSON.stringify(resp));

          window.location.href="/turnero/panel";
        }else{
          setInSubmit(false);
        }
      });
    }else{
      setInSubmit(false);
    }
  }

  useEffect(()=>{
    getProvincias().then((response)=>{
      setProvincias(response);
    });
  },[]);

  return(
    <div className="registrar-grow-container page">
     { inSubmit? <Spinner/> :
      <div className="registrar-grow-content">
        <Title>Registrar Grow / ONG</Title>
        
        <Card>
          <InputState label='Nombre de la Entidad' setState={setNombreGrow}/>
          <SelectState
              id='tipoEntidad'
              label='Tipo de Entidad'
              placeholder='Seleccione un tipo de entidad'
              keyName='id'
              valueName='descripcion'
              setState={setTipo}
              values={[{id:2,descripcion:"ONG"}, {id:1,descripcion:"Grow"}]}
          />
          <InputState label='CBU' setState={setCbu} />
          <InputState label='Alias'  setState={setAlias}/>
          <SelectState label='Provincia' values={provincias} keyName='id' valueName='nombre' setState={setProvincia}/>
          <Error show={provinceError}>Debes seleccionar una provincia.</Error>
          <InputState label='Localidad' setState={setLocalidad} />
          <InputState label='Codigo Postal' setState={setCp} />
          <InputState label='Dirección' setState={setDireccion} />
          <ErrorForm show={requiredError}>Todos los campos son requeridos</ErrorForm>
        </Card>

        <ActionButton onClick={()=>submit()} value="Registrar Grow" />
        <button className="registrar-grow-volver" onClick={()=>navigate('/panel')}>Volver</button>
        </div>
      }
      <NotificacionEmergente show={error} setShow={setError} text="Ha ocurrido un error" />
    </div>
  );
};