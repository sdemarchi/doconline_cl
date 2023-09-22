import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import logo from '../assets/logo-doconline-reprocann-500.png'
import { FormInputDate, FormInputHook } from '../../components/FormInput';
import { SubmitButton } from '../../components/Buttons';
import { useForm as useFormHook } from "react-hook-form";
import Error, { ErrorMax, ErrorReq } from '../../components/Error';
import useForm from '../../hooks/useForm';
import { dateValidator, emailValidator } from '../../data/validators';
import Contacto from '../../components/contacto/contacto';
import './tutor.css';

function FormTutor1() {
    const { register, formState: { errors }, handleSubmit } = useFormHook()
    const { tut1, setTut1 }  = useForm()
    const navigate = useNavigate()
    const [fechaNac, setFechaNac] = useState('')
    const [errorFechaNac, setErrorFechaNac] = useState('')
    const [cargando] = useState(0)
    
    useEffect(() => {
        setFechaNac(tut1.tut_fe_nacim)
    }, [cargando]) //eslint-disable-line


    const onSubmit = (data) => {
        if(dateValidator(fechaNac)){
            setErrorFechaNac('')
        } else {
            setErrorFechaNac('Fecha no válida')
            return
        }
        setTut1(data)
        setTut1(data => ({
            ...data,
            ...{tut_fe_nacim:fechaNac}
          }))
        return navigate('/tutor-2')
    }
    
    return (
        <div className="tutor-container">
            {/*<img className="mx-auto mb-8 w-52 pb-2" src={logo}></img>*/}
            <h3 className='text-gray-500 text-s font-semibold'>DATOS DEL TUTOR</h3>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <FormInputHook label="Nombre y Apellido*" id="tut_apeynom" placeholder="Nombre y Apellido" 
                        defaultValue={tut1?.tut_apeynom}
                        maxLength={255}
                        register={ register('tut_apeynom', {required:true, maxLength:255}) }
                />
                { errors.tut_apeynom?.type == 'required' && <ErrorReq>Nombre y Apellido</ErrorReq> }
                { errors.tut_apeynom?.type == 'maxLength' && <ErrorMax>255</ErrorMax> }

                <FormInputDate label="Fecha de Nacimiento*" id=""
                    value={fechaNac}
                    maxLength={10}
                    onChange={(e) => setFechaNac(e)}
                />
                {errorFechaNac && <Error>{errorFechaNac}</Error>}
                
                <FormInputHook label="Tipo y Nro. Documento*" id="tut_tipo_nro_doc" placeholder="DNI 12345678" 
                        defaultValue={tut1?.tut_tipo_nro_doc}
                        maxLength={40}
                        register={ register('tut_tipo_nro_doc', {required:true, maxLength:40}) }
                />
                { errors.tut_tipo_nro_doc?.type == 'required' && <ErrorReq>Tipo y Nro. de Documento</ErrorReq> }
                { errors.tut_tipo_nro_doc?.type == 'maxLength' && <ErrorMax>40</ErrorMax> }
                
                <FormInputHook label="E-Mail*" id="tut_mail" placeholder="nombre@mail.com" 
                    defaultValue={tut1?.tut_mail}
                    maxLength={150}
                    register={ register('tut_mail', {required:true, maxLength:150, validate:emailValidator })}
                />
                { errors.tut_mail?.type == 'required' && <ErrorReq>E-Mail</ErrorReq> }
                { errors.tut_mail?.type == 'maxLength' && <ErrorMax>150</ErrorMax> }
                { errors.tut_mail  && <Error>E-Mail no válido</Error> }
                
                <FormInputHook label="Teléfono Particular" id="tut_tel_part" placeholder="0342 4205020" 
                        defaultValue={tut1?.tut_tel_part}
                        maxLength={20}
                        register={ register('tut_tel_part', {maxLength:20}) }
                />
                { errors.tut_tel_part?.type == 'maxLength' && <ErrorMax>20</ErrorMax> }
                
                <FormInputHook label="Teléfono Celular*" id="tut_tel_cel" placeholder="342 4392819" 
                        defaultValue={tut1?.tut_tel_cel}
                        maxLength={20}
                        register={ register('tut_tel_cel', {maxLength:20}) }
                />
                { errors.tut_tel_cel?.type == 'required' && <ErrorReq>Teléfono Celular</ErrorReq> }
                { errors.tut_tel_cel?.type == 'maxLength' && <ErrorMax>20</ErrorMax> }
                
                <div className='pt-4'>
                    <SubmitButton value="Continuar" />
                </div>
                
            </form>

            <div className='mb-0 mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/formulario-3b')} >Atrás</button>
            </div>

            <div className="tutor-contacto">
                <Contacto />
            </div>
        </div>
    )
}

export default FormTutor1