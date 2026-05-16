import './loginDni.css';
import { useState } from 'react';
import { SubmitButton, ActionButton } from '../../../components/Buttons';
import { Input } from '../../../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { CustomError } from '../../../components/Error';
import Spinner from '../../../components/Spinner';
import Card from '../../../components/card/card';
import { AuthService } from '../../../data/auth';

function LoginDni(){
  const navigate = useNavigate();
  const [ enviado,setEnviado] = useState(false);
  const [ mostrarError, setMostrarError ] = useState(false);
  const [ enviando, setEnviando ] = useState(false);
  const [ dni, setDni ] = useState();
  const [emailCensurado, setEmailCensurado] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setDni(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if( dni === '' || !dni){
      setMostrarError(true);
    }else{
      setEnviando(true);
      AuthService.loginConDni(dni).then(resp => {
        setEmailCensurado(resp.email);
        setEnviado(true);
        setEnviando(false);
      });
    }
  };

  return(
    <>
    { enviando ?         
       <div className="login-dni-container">
          <Spinner/>  
        </div> : 
      <div className="login-dni-container">
        <div className='login-dni-content'>
        { !enviado ? 
          <form onSubmit={handleSubmit}>
            <div className="login-dni-card-container">
              <Card title="Iniciar sesión con nro. de DNI">
                <div style={{marginTop:'15px'}}>
                  <Input placeholder='DNI' type="number" label="Ingresá tu DNI" maxLength={50} onChange={(e)=>handleChange(e)}/>
                  <CustomError mostrar={mostrarError}>Este campo es obligatorio</CustomError>
                </div>
    
                <p className='login-dni-card-msg'>Enviaremos una URL a tu email para iniciar sesión.</p>    
                
                <div style={{marginTop:'25px'}}>
                  <SubmitButton value="Enviar Correo"></SubmitButton>
                </div>

                
                <div className=' mx-auto p-3 text-center'>
                    <button className='text-gray-500' onClick={() => navigate('/login')}>Volver</button>
                </div>
              </Card>
            </div>

            </form>:
            <>
              <Card title="Email enviado">
                <p style={{color:'rgb(58, 58, 58)',fontWeight:'500',marginTop:'15px'}}>
                  Enviamos un email a <b>{emailCensurado}</b> con una URL para finalizar el inicio de sesión.
                </p>
                  <div style={{marginTop:'25px'}}>
                    <ActionButton onClick={()=>{setEnviado(false);setMostrarError(false);setDni('')}} value="Volver a enviar"></ActionButton>
                  </div>
              </Card>
            </> 
            }

        </div>
    </div>}
    </> 

    );  
}

export default LoginDni;