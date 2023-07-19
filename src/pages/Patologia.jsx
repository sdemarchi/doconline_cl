import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo-doconline-reprocann-500.png'
import { FormInputHook } from '../components/FormInput'
import { SubmitButton } from '../components/Buttons'
import { useForm as useFormHook } from "react-hook-form"
import Error, { ErrorMax, ErrorReq } from '../components/Error'
import useForm from '../hooks/useForm'
import { getDolencias } from '../data/pacientes'
import TextArea from '../components/TextArea'
import { SelectHook } from '../components/Select'
import { numberValidator, selectValidator } from '../data/validators'
import RadioSiNo from '../components/Radio'

function Patologia() {

    const { register, formState: { errors }, handleSubmit } = useFormHook()

    const { patolog, setPatolog } = useForm()

    const navigate = useNavigate()

    const [dolencias, setDolencias] = useState([])
    const [cargando] = useState(0)

    useEffect(() => {
        async function cargarDolencias() {
            const response = await getDolencias()
            setDolencias(response)
        }
        cargarDolencias()
    }, [cargando])


    const onSubmit = (data) => {
        console.log(data)
        let listaDolencias = patolog
        listaDolencias.push(data)
        setPatolog(listaDolencias)
        return navigate('/formulario-4')
    }

    return (
        <>
            <img className="mx-auto w-52 pb-2" src={logo}></img>
            <h3 className='text-gray-500 text-s font-semibold'>AGREGAR PATOLOGIA</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <SelectHook
                    placeholder="Seleccione Patología"
                    label="Patología*"
                    id="patolog_id"
                    datos={dolencias}
                    register={register('patolog_id', { validate: selectValidator })}
                />
                {errors.patolog_id && <Error>Seleccione una Patología</Error>}

                <FormInputHook label="Año de Aparición" id="anio_aprox"
                    maxLength={4}
                    register={register('anio_aprox', { required:true, max: 2050, validate: numberValidator })}
                />
                { errors.anio_aprox?.type == 'required' && <ErrorReq>Año</ErrorReq> }
                {errors.anio_aprox?.type == 'max' && <ErrorVal>2050</ErrorVal>}
                {errors.anio_aprox && <Error>Año no válido</Error>}
                <TextArea
                    label="¿Qué medicación toma para esto?"
                    id="medicacion"
                    register={register('medicacion', { maxLength: 100 })}
                />
                {errors.medicacion?.type == 'maxLength' && <ErrorMax>100</ErrorMax>}

                <RadioSiNo
                    label="Vinculado al trabajo"
                    id="prob_trabajo"
                    register={register('prob_trabajo')}
                    checked={false}
                />

                <h3 className='text-gray-500 text-s font-semibold'>Si le causa dolor, indique:</h3>

                <RadioSiNo
                    label="¿Atenúa el dolor la medicación que usa?"
                    id="atenua_dolor"
                    register={register('atenua_dolor')}
                    checked={false}
                />

                <FormInputHook label="¿Del 1 al 10 cuánto le duele?*" id="dolor_intensidad" number={true}
                    register={register('dolor_intensidad', { max: 10 })}
                />
                {errors.medicacion?.type == 'max' && <ErrorVal>10</ErrorVal>}

                <FormInputHook label="Partes del cuerpo donde le duele" id="partes_cuerpo"
                    register={register('partes_cuerpo', { maxLength: 100 })}
                />
                {errors.partes_cuerpo?.type == 'maxLength' && <ErrorMax>100</ErrorMax>}

                <div className='pt-4'>
                    <SubmitButton value="Agregar" />
                </div>

            </form>

            <div className='mb-6 mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/formulario-4')} >Atrás</button>
            </div>
        </>
    )
}

export default Patologia