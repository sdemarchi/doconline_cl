import { useState, useEffect } from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import logo from '../assets/logo-doconline-reprocann-500.png'
import FormInput, { FormInputHook } from '../components/FormInput'
import { SubmitButton, LinkButton } from '../components/Buttons'
import useForm from '../hooks/useForm'
import TextArea from '../components/TextArea'
import RadioSiNo from '../components/Radio'
import { useForm as useFormHook } from "react-hook-form"
import Error, { ErrorMax, ErrorReq } from '../components/Error'
import { getContactos } from '../data/pacientes'
import { SelectHook } from '../components/Select'
import { selectValidator } from '../data/validators'


function FormRep3() {

    const { register, formState: { errors }, handleSubmit } = useFormHook()

    const { form3, setForm3 }  = useForm()
    
    const navigate = useNavigate()
    
    console.log(form3)

    
    const onSubmit = (data) => {
        setForm3(data)
        return navigate('/formulario-3b')
    }
    
    return (
        <>
            <img className="mx-auto w-52 pb-2" src={logo}></img>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <RadioSiNo 
                    label="¿Tiene arritmias en actividad?" 
                    id="arritmia" 
                    register={ register('arritmia')} 
                    checked={ form3.arritmia == 1 ? true : false }
                />
                
                <RadioSiNo 
                    label="¿Tiene alergia a algún componente de la planta?" 
                    id="alergia" 
                    register={ register('alergia')} 
                    checked={ form3.alergia == 1 ? true : false }
                />
                
                <RadioSiNo 
                    label="¿Está embarazada o realizando lactancia?" 
                    id="embarazada" 
                    register={ register('embarazada')} 
                    checked={ form3.embarazada == 1 ? true : false }
                />

                <RadioSiNo 
                    label="¿Tiene antecedentes de algún padecimiento en salud mental?¿Se encuentra actualmente en tratamiento" 
                    id="salud_mental" 
                    register={ register('salud_mental')} 
                    checked={ form3.salud_mental == 1 ? true : false }
                />

                <TextArea 
                    label="Comentarios sobre su estado de salud que quiera comentar o aclarar"
                    id="salud_ment_esp"
                    defaultValue={form3?.salud_ment_esp}
                    register={ register('salud_ment_esp', {maxLength:80}) }
                />
                { errors.salud_ment_esp?.type == 'maxLength' && <ErrorMax>80</ErrorMax> }
                
                <RadioSiNo 
                    label="¿Maneja maquinarias de alta precisión?" 
                    id="maneja_maq" 
                    register={ register('maneja_maq')} 
                    checked={ form3.maneja_maq == 1 ? true : false }
                />
                
                <div className='pt-4'>
                    <SubmitButton value="Continuar" />
                </div>
                
            </form>
            <div className='mb-6 mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/formulario-2')} >Atrás</button>
            </div>
        </>
    )
}

export default FormRep3