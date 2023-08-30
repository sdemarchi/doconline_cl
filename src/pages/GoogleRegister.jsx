import {/* useState,*/ useEffect } from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import { FormInput , FormInputDate } /*,{ FormInputReadonly }*/ from '../components/FormInput'
import { SubmitButton } from '../components/Buttons'
import Error from '../components/Error'
import { esFechaValida } from '../utils/validation'
import { registrarGoogle } from '../data/pacientes'
import useAuth from '../hooks/useAuth'

export async function action({request}) {
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

function validate(datos){
    const errores = []
    if(Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios')
        return errores
    }
    if(!esFechaValida(datos.fecha_nac)){
        errores.push('La fecha de nacimiento no es válida')
    }
    if(datos.telefono != datos.telefono_conf){
        errores.push('Los teléfonos no coinciden')
    }
    return errores
}

function GoogleRegister() {
    const { setUser, googleProfile/*, setGoogleProfile*/ } = useAuth()

    const navigate = useNavigate()
    const actionResult = useActionData()
    const errores = actionResult?.errores
    
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
            {errores?.length && errores.map( ( error, i ) => <Error key={i}>{error}</Error> )}

            <h3 className='text-gray-500 text-s font-semibold'>COMPLETA TU PERFIL</h3>
            
            <Form method='post' noValidate>
                <FormInput label="Nombre y Apellido*" id="nombre"  maxlenght="150" defaultValue={ googleProfile.name } />
                <div className='flex flex-row'>
                    <div className='basis-1/2 pe-1'>
                        <FormInputDate label="Fecha de Nacimiento*" id="fecha_nac" placeholder="dd/mm/aaaa" maxLength={10} />
                    </div>
                    <div className='basis-1/2 ps-1'>
                        <FormInput label="DNI*" id="dni" maxlenght="10" placeholder="12345676" />
                    </div>
                </div>
                <FormInput label="Domicilio*" id="domicilio" placeholder="Calle y Número" />
                <div className='flex flex-row'>
                    <div className='basis-1/2 pe-1'>
                        <FormInput label="Teléfono*" id="telefono" placeholder="342 4392819" />
                    </div>
                    <div className='basis-1/2 ps-1'>
                        <FormInput label="Confirmar Teléfono*" id="telefono_conf" placeholder="342 4392819" />
                    </div>
                </div>
                <FormInput label="E-Mail*" id="email" defaultValue={ googleProfile.email }/>
                
                <div className='pt-4'><SubmitButton value="Enviar" /></div>
                
            </Form>
            <div className='mb-0 mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/login')} >Volver</button>
            </div>
        </>
    )
}

export default GoogleRegister