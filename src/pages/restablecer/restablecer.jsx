import './restablecer.css';
import { useState } from 'react';
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
      restablecerSendMail(dni).then(resp => {
        setEmailCensurado(resp.email);
        setEnviado(true);
        setEnviando(false);
      });
    }
  };

  return(
    <>

    { enviando ?         
       <div className="restablecer-container">
          <Spinner/>  
        </div> : 
      <div className="restablecer-container">
        <div className='restablecer-content'>
        { !enviado ? 
          <form onSubmit={handleSubmit}>
            <div className="restablecer-card-container">
              <Card title="Restablecer contraseña">
                <div>
                  <Input placeholder='DNI' type="number" label="Ingresá tu DNI" maxLength={50} onChange={(e)=>handleChange(e)}/>
                  <CustomError mostrar={mostrarError}>Este campo es obligatorio</CustomError>
                </div>
    
                <p className='restablecer-card-msg'>Enviaremos una URL a tu email para reestablecer tu contraseña.</p>    
                
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
                  Enviamos un email a <b>{emailCensurado}</b> con una URL para restablecer tu contraseña.
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

export default Restablecer;