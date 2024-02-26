import {/* useState,*/ useEffect } from 'react';
import { Form, useActionData, useNavigate } from 'react-router-dom';
import { FormInput , FormInputDate } /*,{ FormInputReadonly }*/ from '../../components/FormInput';
import { SubmitButton } from '../../components/Buttons';
import { esFechaValida } from '../../utils/validation';
import { registrarGoogle } from '../../data/pacientes';
import useAuth from '../../hooks/useAuth';
import './register.css';

export async function action({request}) { //eslint-disable-line
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    const errores = validate(datos)
    
    if(Object.keys(errores).length) {
        return {errores: errores}
    }

    const resp = await registrarGoogle(datos)
    if(resp.error.code == 0){
        return {userId: resp.user.id, userName: resp.user.name }
    } else {
        errores.push(resp.error.message)
        return {errores: errores}
    }
}
/*
function formatearFecha(cadenaFecha) {
    if (cadenaFecha !== null && cadenaFecha !== undefined) {
      const fechaISO = new Date(cadenaFecha);
      const dia = fechaISO.getDate().toString().padStart(2, '0');
      const mes = (fechaISO.getMonth() + 1).toString().padStart(2, '0');
      const anio = fechaISO.getFullYear();
  
      const fechaFormateada = `${dia}/${mes}/${anio}`;
      return fechaFormateada;
    } else {
      return cadenaFecha;
    }
  }*/


function validate(datos){
    const errores = [];
    //datos.fecha_nac = formatearFecha(datos.fecha_nac);
    
    if (Object.keys(datos).some(key => key !== 'grow' && datos[key] === '')) {
        errores.push('Todos los campos son obligatorios');
        return errores;
    }

    if(!esFechaValida(datos.fecha_nac)){
        errores.push('La fecha de nacimiento no es válida');
    }
    if(datos.telefono != datos.telefono_conf){
        errores.push('Los teléfonos no coinciden');
    }
    return errores;
}

function GoogleRegister() {
    const { setUser, googleProfile/*, setGoogleProfile*/ } = useAuth();

    const navigate = useNavigate();
    const actionResult = useActionData();
    const errores = actionResult?.errores;
    const getGrow = () =>{
        if (sessionStorage.getItem('growId')) {
            return sessionStorage.getItem('growId');
        }else{
            return null;
        }
    }
    const grow = getGrow();
    
    useEffect(() => {
        if(actionResult?.userId){
            localStorage.setItem('dc_userId',actionResult.userId)
            localStorage.setItem('dc_userName',actionResult.userName)
            setUser({
                userId: actionResult.userId,
                userName: actionResult.userName
            })
            return navigate('/panel')
        }
    })
    
    
    return (
        <>
            <div className='mb-2' style={{textAlign:'center',paddingBottom:'15px',paddingTop:'20px'}}>
              <h2 className="black-title">Registrar usuario</h2>
            </div>
            
            <Form method='post' noValidate>

                <FormInput  type={"text"} label="Nombre y Apellido*" id="nombre" placeholder='Nombre y apellido' maxlenght="150" defaultValue={ googleProfile.name } />

                <div className='flex flex-row'>
                    <div className='basis-1/2 pe-1'>
                       {/* <FormInput type={"text"} label="Fecha de Nacimiento*" id="fecha_nac" placeholder="dd/mm/aaaa" maxLength={10} />*/}
                        <FormInputDate label="Fecha de Nacimiento*" id="fecha_nac"/>
                    </div>
                    <div className='basis-1/2 ps-1'>
                        <FormInput  type={"number"}  label="DNI*" id="dni" maxlenght="10" placeholder="12345676" />
                    </div>
                </div>

                <FormInput type={"text"} label="Domicilio*" id="domicilio" placeholder="Calle y Número" />

                <div className='flex flex-row'>
                    <div className='basis-1/2 pe-1'>
                        <FormInput  type={"number"} label="Teléfono*" id="telefono" placeholder="342 4392819" />
                    </div>
                    <div className='basis-1/2 ps-1'>
                        <FormInput type={"number"}  label="Confirmar Teléfono*" id="telefono_conf" placeholder="342 4392819" />
                    </div>
                </div>

                <FormInput  type={"text"} label="E-Mail*" id="email" value={googleProfile.email} defaultValue={ googleProfile.email }/>

                {errores?.length && errores.map( ( error, i ) =>
                 <div className="error-message" style={{minHeight:"22px"}} key={i}>{error}</div>
                )}
                
                <div style={{display:'none'}} >
                    <input type="number" id="grow" name="grow" value={grow}/>
                </div>

                <div className='pt-4 mt-8 '><SubmitButton value="Enviar" /></div>
                
            </Form>
            
            <div className='mb-0mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/login')} >Volver</button>
            </div>

        </>
    )
}

export default GoogleRegister;