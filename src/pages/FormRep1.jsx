import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import logo from '../assets/logo-doconline-reprocann-500.png'
import { FormInputDate, FormInputHook } from '../components/FormInput'
import { SubmitButton } from '../components/Buttons'
import useForm from '../hooks/useForm'
import Error, { ErrorReq, ErrorMax, ErrorVal } from '../components/Error'
import { perfil } from '../data/pacientes'
import { useForm as useFormHook } from "react-hook-form"
import { dateValidator, emailValidator, numberValidator } from '../data/validators'

function FormRep1() {
    const user = useOutletContext()

    const { register, formState: { errors }, handleSubmit } = useFormHook()

    const { form1, setForm1 } = useForm()
    const navigate = useNavigate()

    const [paciente, setPaciente] = useState({})
    const [fechaNac, setFechaNac] = useState('')
    const [errorFechaNac, setErrorFechaNac] = useState('')

    const [cargando] = useState(0)

    useEffect(() => {
        async function getPaciente() {
            const response = await perfil(user.userId)
            setPaciente(response)
            console.log(fechaNac)
        }
        getPaciente()
        setFechaNac(form1.fe_nacim)
            
    }, [cargando])

    const onSubmit = (data) => {
        if(dateValidator(fechaNac)){
            setErrorFechaNac('')
        } else {
            setErrorFechaNac('Fecha no válida')
            return
        }
        setForm1(data)
        setForm1(data => ({
            ...data,
            ...{fe_nacim:fechaNac}
          }))
        return navigate('/formulario-2')
    }

    return (
        <>
            <img className="mx-auto w-52 pb-2" src={logo}></img>

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInputHook label="Nombre y Apellido*" id="nom_ape"
                    defaultValue={form1?.nom_ape}
                    maxLength={255}
                    register={register('nom_ape', { required: true, maxLength: 255 })}
                />
                {errors.nom_ape?.type == 'required' && <ErrorReq>Nombre y Apellido</ErrorReq>}
                {errors.nom_ape?.type == 'maxLength' && <ErrorMax>255</ErrorMax>}

                <FormInputDate label="Fecha de Nacimiento*" id=""
                    value={fechaNac}
                    maxLength={10}
                    onChange={(e) => setFechaNac(e)}
                />
                {errorFechaNac && <Error>{errorFechaNac}</Error>}
                        
                <div className='flex flex-row'>
                    <div className='basis-1/2 pe-1'>
                        <FormInputHook label="DNI*" id="dni"
                            defaultValue={form1?.dni}
                            maxLength={8}
                            register={register('dni', {
                                required: true, maxLength: 8, validate: numberValidator})}
                        />
                        {errors.dni?.type == 'required' && <ErrorReq>DNI</ErrorReq>}
                        {errors.dni?.type == 'maxLength' && <ErrorMax>10</ErrorMax>}
                        {errors.dni && <Error>DNI no válido</Error>}            
                    </div>
                    <div className='basis-1/2 ps-1'>
                        <FormInputHook label="Edad*" id="edad"
                            defaultValue={form1?.edad}
                            maxLength={3}
                            register={register('edad', { required: true, max: 100, validate: numberValidator })}
                        />
                        {errors.edad?.type == 'required' && <ErrorReq>Edad</ErrorReq>}
                        {errors.edad && <Error>DNI no válido</Error>} 
                        {errors.edad?.type == 'max' && <ErrorVal>100</ErrorVal>}

                    </div>
                </div>
                <FormInputHook label="E-Mail*" id="email"
                    defaultValue={form1?.email}
                    maxLength={150}
                    register={register('email', { required: true, maxLength: 150, validate: emailValidator })}
                />
                {errors.email?.type == 'required' && <ErrorReq>E-Mail</ErrorReq>}
                {errors.email?.type == 'maxLength' && <ErrorMax>150</ErrorMax>}
                {errors.email && <Error>E-Mail no válido</Error>}

                <FormInputHook label="Teléfono Celular*" id="celular"
                    defaultValue={form1?.celular}
                    maxLength={20}
                    register={register('celular', { required: true, maxLength: 20 })}
                />
                {errors.celular?.type == 'required' && <ErrorReq>Celular</ErrorReq>}
                {errors.celular?.type == 'maxLength' && <ErrorMax>20</ErrorMax>}

                <FormInputHook label="Código de Vinculación de REPROCANN" id="cod_vincu"
                    defaultValue={form1?.cod_vincu}
                    maxLength={50}
                    register={register('cod_vincu', { maxLength: 50 })}
                />
                {errors.cod_vincu?.type == 'maxLength' && <ErrorMax>50</ErrorMax>}

                <div className='pt-4'>
                    <SubmitButton value="Continuar" />
                </div>

            </form>
            <div className='mb-6 mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/panel')} >Volver</button>
            </div>

        </>
    )
}

export default FormRep1