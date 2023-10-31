import {/* useState,*/ useEffect } from 'react';
import { Form, useActionData, useNavigate } from 'react-router-dom';
import {FormInput} from '../../components/FormInput';
import { SubmitButton } from '../../components/Buttons';
import Error from '../../components/Error';
import { esFechaValida, esEmailValido } from '../../utils/validation';
import { registrar} from '../../data/pacientes';
import useAuth from '../../hooks/useAuth';
import './register.css';


export async function action({request}) { //eslint-disable-line
    const formData = await request.formData();
    const datos = Object.fromEntries(formData);
    const errores = validate(datos);
    
    if(Object.keys(errores).length) {
        return {errores: errores}
    }

    const resp = await registrar(datos)
    if(resp.error.code == 0){
        return {userId: resp.user.id, userName: resp.user.name }
    } else {
        errores.push(resp.error?.message)
        return {errores: errores}
    }
}

function validate(datos){
    const errores = []
    if(Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios')
        return errores
    }
    if(!esFechaValida(datos.fecha_nac)){
        errores.push('La fecha de nacimiento no es válida')
    }
    if(!esEmailValido(datos.email)) {
        errores.push('El E-mail no es válido')
    }
    if(datos.email != datos.email_conf){
        errores.push('Los E-Mail no coinciden')
    }
    if(datos.telefono != datos.telefono_conf){
        errores.push('Los teléfonos no coinciden')
    }
    if(datos.password != datos.password_conf){
        errores.push('Las contraseñas no coinciden')
    }
    return errores
}

function Register() {
    const { setUser } = useAuth()
    const navigate = useNavigate()
    const actionResult = useActionData()
    const errores = actionResult?.errores
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
        <div className="register-container">
            {errores?.length && errores.map( ( error, i ) => <Error key={i}>{error}</Error> )}

            <Form method='post' noValidate>
                <FormInput  type={"text"} label="Nombre y Apellido*" id="nombre" maxlenght="150" placeholder="Nombre y Apellido" />
                <div className='flex flex-row'>
                    <div className='basis-1/2 pe-1'>
                        <FormInput  type={"text"} label="Fecha de Nacimiento*" id="fecha_nac" placeholder="dd/mm/aaaa" />
                    </div>
                    <div className='basis-1/2 ps-1'>
                        <FormInput type={"number"} label="DNI*" id="dni" maxlenght="10" placeholder="12345676" />
                    </div>
                </div>
                <FormInput type={"text"} label="Domicilio*" id="direccion" placeholder="Calle y Número" />
                <div className='flex flex-row'>
                    <div className='basis-1/2 pe-1'>
                        <FormInput type={"number"} label="Teléfono*" id="telefono" placeholder="342 4392819" />
                    </div>
                    <div className='basis-1/2 ps-1'>
                        <FormInput type={"number"} label="Confirmar Teléfono*" id="telefono_conf" placeholder="342 4392819" />
                    </div>
                </div>

                <FormInput type={"text"} label="E-Mail*" id="email" placeholder="usuario@mail.com" />
                <FormInput  type={"text"} label="Confirmar E-Mail*" id="email_conf" placeholder="usuario@mail.com" />
                <FormInput type="text" label="Nombre de Usuario*" id="username" placeholder="ingrese un nombre de usuario" />
     

                <div className='flex flex-row'>
                    <div className='basis-1/2 pe-1'>
                        <FormInput type={"password"} label="Contraseña*" id="password"/>
                    </div>
                    <div className='basis-1/2 ps-1'>
                        <FormInput type={"password"} label="Repetir Contraseña*" id="password_conf"/>

                    </div>
                </div>

                <div style={{display:'none'}} >
                    <input type="number" id="grow" name="grow" value={grow}/>
                </div>

                <div className='pt-4'><SubmitButton defaultValue="Registrarme"/></div>
                
            </Form>

            <div className='mb-0 mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/login')} >Volver</button>
            </div>
        </div>
    )
}

export default Register;