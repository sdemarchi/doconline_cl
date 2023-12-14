import Title from '../../components/title/Title';
import { useState } from 'react';
import Card from '../../components/card/card';
import { LinkButtonCenter, SubmitButton } from '../../components/Buttons';
import { Input } from '../../components/FormInput';
import { restablecer } from '../../data/auth';
import { CustomError } from '../../components/Error';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

export default function FormPassword(){

  let { t  } = useParams(); //eslint-disable-line

  const [ errorPassword, setErrorPassword ] = useState({mostrar:false,error:''});
  const [ errorConfirmar, setErrorConfirmar ] = useState({mostrar:false,error:''});

  const [ password, setPassword ] = useState();
  const [ confirmar, setConfirmar ] = useState();

  const [ enviando, setEnviando ] = useState(false);
  const [ success, setSuccess ] = useState();

  const ChangePassword = (e) =>{
    const passwordValue = e.target.value;
    setPassword(passwordValue);
  }

  const ChangeConfirmar = (e) =>{
    const confirmarValue = e.target.value;
    setConfirmar(confirmarValue);
  }

  const Submit = (event) => {
    event.preventDefault();

    setErrorPassword({mostrar:false,error:''});
    setErrorConfirmar({mostrar:false,error:''});
    
    let passwordSuccess = false;
    let confirmarSuccess = false;
    
    if(!password){
      setErrorPassword({mostrar:true,error:'Debes ingresar una nueva contraseña.'});
    }else if(password.length === 0){
      setErrorPassword({mostrar:true,error:'Debes ingresar una nueva contraseña.'});
    }else if(password.length < 8){
      setErrorPassword({mostrar:true,error:'La contraseña debe tener almenos 8 caracteres.'});
    }else{
      passwordSuccess = true;
    }

    if(!confirmar){
      setErrorConfirmar({mostrar:true,error:'Debes confirmar la contraseña'});
    }else if(confirmar.length === 0){
      setErrorConfirmar({mostrar:true,error:'Debes confirmar la contraseña.'});

    }else if(password !== confirmar){
      setErrorConfirmar({mostrar:true,error:'Las contraseñas no coinciden.'});
    }else{
      confirmarSuccess = true;
    }

    if(passwordSuccess && confirmarSuccess){
      setEnviando(true);
      const datos = {
        token:t,
        password:password
      }

      restablecer(datos).then((response) => {
        console.log(JSON.stringify(response));

        if(response.success === true){
          setSuccess(true);
        }else if(response.success === false){
          setSuccess(false);
        }else{
          setSuccess(undefined);
        }
        
        setEnviando(false);
      });
    }
  }

  return(
    <>
     { enviando ? 
        <div className="restablecer-container">
          <Spinner/>  
        </div>:
      <div className="restablecer-container">
        <Title>Restablecer contraseña</Title>


      { success === undefined && <div className="restablecer-card-container">
          
        <form onSubmit={Submit}>
    
          <Card title="Nueva contraseña">
            <div style={{minHeight:'10px'}}></div>
            <Input type='password' label="Ingrese una nueva contraseña" maxLength={50} onChange={ChangePassword}/>
            <CustomError mostrar={errorPassword.mostrar}>{errorPassword.error}</CustomError>

            <Input type='password' label="Confirmar contraseña" maxLength={50} onChange={ChangeConfirmar}/>
            <CustomError mostrar={errorConfirmar.mostrar}>{errorConfirmar.error}</CustomError>

          </Card>

          <div style={{marginTop:'35px'}}>
            <SubmitButton value="Guardar"></SubmitButton>
          </div>

          </form>
        </div>
        }

        { success === true && <div className="restablecer-card-container">
          
            <Card title="Se ha restablecido su contraseña">
              <p>Ya puedes iniciar sesion con tu nueva contraseña.</p>
  
            </Card>
  
            <div style={{marginTop:'35px'}}>
              <LinkButtonCenter to='/login' value="Ir a iniciar sesión"></LinkButtonCenter>
            </div>
  
          </div>
          }

          { success === false && <div className="restablecer-card-container">
          
          <form onSubmit={Submit}>
      
            <Card title="Ha ocurrido un error">
              <p>Intentalo de nuevo mas tarde.</p>
            </Card>

            </form>
          </div>
          }


      </div>}
    </>
  );
}