import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo-doconline-reprocann-500.png'
import { FormInputHook } from '../components/FormInput'
import { SubmitButton } from '../components/Buttons'
import TextArea from '../components/TextArea'
import useForm from '../hooks/useForm'
import Error, { ErrorMax, ErrorReq } from '../components/Error'
import Select, { SelectHook } from '../components/Select'
import { getOcupaciones, getProvincias } from '../data/pacientes'
import { useForm as useFormHook } from "react-hook-form"
import { selectValidator } from '../data/validators'

function FormRep2() {

    const { register, formState: { errors }, handleSubmit } = useFormHook()

    const { form2, setForm2, provActual, setProvActual, ocupacionActual, setOcupacionActual } = useForm()
    
    const [provincias, setProvincias] = useState([])
    const [ocupaciones, setOcupaciones] = useState([])
    const [cargando] = useState(0)

    const [errorProv, setErrorProv] = useState(0)
    const [errorOcup, setErrorOcup] = useState(0)
    
    const navigate = useNavigate()
    
    useEffect(() => {
        async function cargarCombos(){
            const response = await getProvincias()
            setProvincias(response)
            const response2 = await getOcupaciones()
            setOcupaciones(response2)
        }
        cargarCombos()
    }, [cargando])
    
    const onSubmit = (data) => {
        if(!provActual){
            setErrorProv(1)
            return
        }
        if(!ocupacionActual){
            setErrorOcup(1)
            return
        }
        data.idprovincia = provActual
        data.ocupacion_id = ocupacionActual
        setForm2(data)

        return navigate('/formulario-3')
    }
    
    function changeProvincia(event){
        setProvActual(event.target.value)
    }

    function changeOcupacion(event){
        setOcupacionActual(event.target.value)
    }

    console.log(form2)
    
    return (
        <>
            <img className="mx-auto w-52 pb-2" src={logo}></img>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <label
                    className="text-gray-500 text-xs font-semibold"
                    htmlFor="idprovincia"
                >Provincia</label>
                <Select 
                    label="Provincia*"
                    onChange={e => changeProvincia(e)}
                    value={provActual}
                    id="idprovincia"
                    placeholder="Seleccione una Provincia"
                    datos={provincias}
                />
                { errorProv > 0  && <Error>Seleccione una Provincia</Error> }
                
                <FormInputHook label="Localidad*" id="localidad"
                    defaultValue={form2?.localidad}
                    maxLength={255}
                    register={ register('localidad', {required:true, maxLength:255}) }
                />
                { errors.localidad?.type == 'required' && <ErrorReq>Localidad</ErrorReq> }
                { errors.localidad?.type == 'maxLength' && <ErrorMax>255</ErrorMax> }

                <FormInputHook label="Domicilio*" id="domicilio" 
                    defaultValue={form2?.domicilio}
                    maxLength={255}
                    register={ register('domicilio', {required:true, maxLength:255}) }
                />
                { errors.domicilio?.type == 'required' && <ErrorReq>Domicilio</ErrorReq> }
                { errors.domicilio?.type == 'maxLength' && <ErrorMax>255</ErrorMax> }

                <div className='flex flex-row'>
                    <div className='basis-1/2 pe-1'>
                        <FormInputHook label="Código Postal*" id="cp" 
                            defaultValue={form2?.cp}
                            maxLength={20}
                            register={ register('cp', {required:true, maxLength:20}) }
                        />
                        { errors.cp?.type == 'required' && <ErrorReq>Código Postal</ErrorReq> }
                        { errors.cp?.type == 'maxLength' && <ErrorMax>20</ErrorMax> }
                    </div>
                    <div className='basis-1/2 ps-1'>
                        <FormInputHook label="Obra Social" id="osocial"
                            defaultValue={form2?.osocial}
                            maxLength={255}
                            register={ register('osocial', {maxLength:255}) }
                        />
                        { errors.osocial?.type == 'maxLength' && <ErrorMax>255</ErrorMax> }
                    </div>
                </div>
                
                <Select 
                    label="Ocupación*"
                    onChange={e => changeOcupacion(e)}
                    value={ocupacionActual}
                    id="ocupacion_id"
                    placeholder="Seleccione una Ocupacion"
                    datos={ocupaciones}
                />
                { errorOcup > 0  && <Error>Seleccione una Ocupación</Error> }
                
                
                <FormInputHook label="Ocupación Otra" id="ocupacion"
                    defaultValue={form2?.ocupacion}
                    maxLength={100}
                    register={ register('ocupacion', {maxLength:100}) }
                />
                { errors.ocupacion?.type == 'maxLength' && <ErrorMax>100</ErrorMax> }
                
                <TextArea 
                    label="Comentarios sobre su estado de salud que quiera comentar o aclarar"
                    id="comentario"
                    defaultValue={form2?.comentario}
                    register={ register('comentario', {maxLength:500}) }
                />
                { errors.comentario?.type == 'maxLength' && <ErrorMax>500</ErrorMax> }
                
                <div className='pt-4'>
                    <SubmitButton value="Continuar" />
                </div>
                
            </form>
            <div className='mb-6 mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/formulario-1')} >Atrás</button>
            </div>
        </>
    )
}

export default FormRep2