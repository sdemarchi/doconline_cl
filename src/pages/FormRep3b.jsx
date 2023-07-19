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
import Select, { SelectHook } from '../components/Select'
import { selectValidator } from '../data/validators'


function FormRep3b() {

    const { register, formState: { errors }, handleSubmit } = useFormHook()

    const { form3b, setForm3b, contactoActual, setContactoActual }  = useForm()
    const [contactos, setContactos] = useState([])
    const [cargando] = useState(0)
    
    const [errorContacto, setErrorContacto] = useState(0)
    const navigate = useNavigate()
    
    useEffect(() => {
        async function cargaContactos(){
            const response = await getContactos()
            setContactos(response)
        }
        cargaContactos()
    }, [cargando])
    

    const onSubmit = (data) => {
        if(!contactoActual){
            setErrorContacto(1)
            return
        }
        data.idcontacto = contactoActual
        setForm3b(data)
        return data.es_menor == '1' ? navigate('/tutor-1') : navigate('/formulario-4')
    }
    
    function changeContacto(event){
        setContactoActual(event.target.value)
    }

    return (
        <>
            <img className="mx-auto w-52 pb-2" src={logo}></img>
            <form onSubmit={ handleSubmit(onSubmit) }>
                
                <Select 
                    label="¿Cómo nos contactó?*"
                    onChange={e => changeContacto(e)}
                    value={contactoActual}
                    id="idcontacto"
                    placeholder="Seleccione uno"
                    datos={contactos}
                />
                { errorContacto > 0  && <Error>Seleccione un Contacto</Error> }
                
                <FormInputHook label="Contacto Otro" id="contacto_otro" placeholder="Otra forma de contacto" 
                    defaultValue={form3b?.contacto_otro}
                    maxLength={255}
                    register={ register('contacto_otro', {maxLength:255}) }
                />
                { errors.domicilio?.type == 'maxLength' && <ErrorMax>100</ErrorMax> }

                <TextArea 
                    label="Comente con sus palabras enfermedad y/o dolencias que padece que justifiquen el uso de cannabis medicinal"
                    id="patologia"
                    defaultValue={form3b.patologia}
                    register={ register('patologia', {maxLength:500}) }
                />
                { errors.patologia?.type == 'maxLength' && <ErrorMax>500</ErrorMax> }
                
                <RadioSiNo 
                    label="¿Otra persona cultivará para tí?" 
                    id="es_menor" 
                    register={ register('es_menor')} 
                    checked={ form3b.es_menor == 1 ? true : false }
                />
                <h6 className="text-gray-500 text-xs leading-3 pb-1 pt-2">Si la respuesta es "Sí", ingrese a continuación los datos del tutor</h6>
                
                <div className='pt-4'>
                    <SubmitButton value="Continuar" />
                </div>
                
            </form>
            <div className='mb-6 mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/formulario-3')} >Atrás</button>
            </div>
        </>
    )
}

export default FormRep3b