import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo-doconline-reprocann-500.png'
import FormInput, { FormInputHook } from '../components/FormInput'
import { SubmitButton, LinkButton } from '../components/Buttons'
import RadioSiNo from '../components/Radio'
import { useForm as useFormHook } from "react-hook-form"
import Error, { ErrorMax, ErrorReq } from '../components/Error'
import useForm from '../hooks/useForm'
import { getProvincias } from '../data/pacientes'
import Select, { SelectHook } from '../components/Select'
import { selectValidator } from '../data/validators'

function FormTutor2() {

    const { register, formState: { errors }, handleSubmit } = useFormHook()

    const { tut2, setTut2, provTutActual, setProvTutActual  }  = useForm()
    
    const navigate = useNavigate()
    console.log(tut2)

    const [provincias, setProvincias] = useState([])
    const [cargando] = useState(0)
    const [errorProv, setErrorProv] = useState(0)
    
    
    useEffect(() => {
        async function cargarProvincias(){
            const response = await getProvincias()
            setProvincias(response)
        }
        cargarProvincias()
    }, [cargando])
    

    const onSubmit = (data) => {
        if(!provTutActual){
            setErrorProv(1)
            return
        }
        data.tut_idprovincia = provTutActual
        setTut2(data)
        return navigate('/formulario-4')
    }

    function changeProvincia(event){
        setProvTutActual(event.target.value)
    }
    
    return (
        <>
            <img className="mx-auto w-52 pb-2" src={logo}></img>
            <h3 className='text-gray-500 text-s font-semibold'>DATOS DEL TUTOR</h3>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Select 
                    label="Provincia*"
                    onChange={e => changeProvincia(e)}
                    value={provTutActual}
                    id="tut_idprovincia"
                    placeholder="Seleccione una Provincia"
                    datos={provincias}
                />
                { errorProv > 0  && <Error>Seleccione una Provincia</Error> }
                
                <FormInputHook label="Localidad*" id="tut_localidad"
                    defaultValue={tut2?.tut_localidad}
                    maxLength={255}
                    register={ register('tut_localidad', {required:true, maxLength:255}) }
                />
                { errors.tut_localidad?.type == 'required' && <ErrorReq>Localidad</ErrorReq> }
                { errors.tut_localidad?.type == 'maxLength' && <ErrorMax>255</ErrorMax> }
                
                <FormInputHook label="Domicilio*" id="tut_domicilio"
                    defaultValue={tut2?.tut_domicilio}
                    maxLength={255}
                    register={ register('tut_domicilio', {required:true, maxLength:255}) }
                />
                { errors.tut_domicilio?.type == 'required' && <ErrorReq>Domicilio</ErrorReq> }
                { errors.tut_domicilio?.type == 'maxLength' && <ErrorMax>255</ErrorMax> }
                
                <div className='flex flex-row'>
                    <div className='basis-1/2 pe-1'>
                        <FormInputHook label="Código Postal*" id="tut_cp"
                            defaultValue={tut2?.tut_cp}
                            maxLength={20}
                            register={ register('tut_cp', {required:true, maxLength:20}) }
                        />
                        { errors.tut_cp?.type == 'required' && <ErrorReq>Código Postal</ErrorReq> }
                        { errors.tut_cp?.type == 'maxLength' && <ErrorMax>20</ErrorMax> }

                    </div>
                    <div className='basis-1/2 ps-1'>
                        <FormInputHook label="Obra Social*" id="tut_osocial"
                            defaultValue={tut2?.tut_osocial}
                            maxLength={255}
                            register={ register('tut_osocial', {required:true, maxLength:255}) }
                        />
                        { errors.tut_osocial?.type == 'required' && <ErrorReq>Obra Social</ErrorReq> }
                        { errors.tut_osocial?.type == 'maxLength' && <ErrorMax>255</ErrorMax> }

                    </div>
                </div>
                
                <FormInputHook label="Vínculo con la persona que requiere la inscripción*" id="tut_vinculo"
                    defaultValue={tut2?.tut_vinculo}
                    maxLength={100}
                    register={ register('tut_vinculo', {required:true, maxLength:100}) }
                />
                { errors.tut_vinculo?.type == 'required' && <ErrorReq>Vínculo</ErrorReq> }
                { errors.tut_vinculo?.type == 'maxLength' && <ErrorMax>100</ErrorMax> }
                
                <RadioSiNo 
                    label="¿Registro de Familiares?" 
                    id="tut_reg_fam" 
                    register={ register('tut_reg_fam')} 
                    checked={ tut2.tut_reg_fam == 1 ? true : false }
                />

                <div className='pt-4'>
                    <SubmitButton value="Continuar" />
                </div>
                
            </form>

            <div className='mb-6 mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/tutor-1')} >Atrás</button>
            </div>
        </>
    )
}

export default FormTutor2