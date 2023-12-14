import './restablecer.css';
import { useState } from 'react';
import Title from '../../components/title/Title';
import Card from '../../components/card/card';
import { SubmitButton, ActionButton } from '../../components/Buttons';
import { Input } from '../../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { restablecerSendMail } from '../../data/auth';
import { CustomError } from '../../components/Error';
import Spinner from '../../components/Spinner';

function Restablecer(){
  const navigate = useNavigate();
  const [ enviado,setEnviado] = useState(false);
  const [ mostrarError, setMostrarError ] = useState(false);
  const [ enviando, setEnviando ] = useState(false);
  const [ email, setEmail ] = useState();

  const handleChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if( email === '' || !email){
      setMostrarError(true);
    }else{
      setEnviando(true);
      restablecerSendMail(email).then((response) => {
        console.log(JSON.stringify(response));
        setEnviado(true);
        setEnviando(false);
      });
    }
  };

  return(
    <>

    { enviando?         
       <div className="restablecer-container">
          <Spinner/>  
        </div> : 
      <div className="restablecer-container">
        
      <Title>Restablecer contraseña</Title>


    { !enviado ? 
      <form onSubmit={handleSubmit}>
        <div className="restablecer-card-container">
          <Card title="Ingresa tu email">
            <Input placeholder='Email' type="email" maxLength={50} onChange={(e)=>handleChange(e)}/>
            <CustomError mostrar={mostrarError}>Debes ingresar tu email</CustomError>
            <p className='restablecer-card-msg'>Enviaremos una URL a tu email para reestablecer tu contraseña.</p>    
          </Card>
        </div>

          <div style={{marginTop:'25px'}}>
            <SubmitButton value="Enviar Correo"></SubmitButton>
          </div>

        </form>:
        <>
          <Card title="Email enviado">
            <p style={{color:'rgb(58, 58, 58)',fontWeight:'500',marginTop:'0'}}>Si no recibiste el email, revisa que la direccion de correo sea correcta y vuelve a intentarlo.</p>    
          </Card>
          <div style={{marginTop:'35px'}}>
            <ActionButton onClick={()=>{setEnviado(false);setMostrarError(false);setEmail('')}} value="Volver a enviar"></ActionButton>
          </div>

        </> 
        }

        <div className=' mx-auto p-3 text-center'>
            <button className='text-gray-500' onClick={() => navigate('/login')}>Volver</button>
        </div>

    </div>}
    </> 

    );
}

export default Restablecer;