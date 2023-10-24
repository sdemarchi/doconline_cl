import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import logo from '../../assets/logo-doconline-reprocann-500.png'
import { FormInputHook } from '../../components/FormInput';
import { SubmitButton } from '../../components/Buttons';
import useForm from '../../hooks/useForm';
import TextArea from '../../components/TextArea';
import /*RadioSiNo,*/ {RadioSiNoAlt}  from '../../components/Radio';
import { useForm as useFormHook } from "react-hook-form";
import Error, { ErrorMax } from '../../components/Error';
import { getContactos } from '../../data/pacientes';
import Select from '../../components/Select';
import './formReprocann.css';
import Contacto from '../../components/contacto/contacto';


function FormRep3b() {

    const { register, formState: { errors }, handleSubmit } = useFormHook()

    const { form3b, setForm3b, contactoActual, setContactoActual }  = useForm()
    const [contactos, setContactos] = useState([])
    const [esMenor, setEsMenor] = useState(false)
    const [cargando] = useState(0)
    
    const [errorContacto, setErrorContacto] = useState(0)
    const navigate = useNavigate()
    
    const subirScroll = () =>{
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        subirScroll();
        async function cargaContactos(){
            const response = await getContactos()
            setContactos(response)
            setEsMenor(form3b.es_menor)
            console.log(form3b)
        }
        cargaContactos()
    }, [cargando]) //eslint-disable-line
    

    const onSubmit = (data) => {
        if(!contactoActual){
            setErrorContacto(1)
            return
        }
        data.idcontacto = contactoActual
        data.es_menor = esMenor ? 1 : 0
        setForm3b(data)
        console.log(form3b)
        return data.es_menor ? navigate('/tutor-1') : navigate('/formulario-4')
    }
    
    function changeContacto(event){
        setContactoActual(event.target.value);
    }

    function buscarContactoPorId(id){
        const resultado = contactos.find(item => item.id == id);
        return resultado ? resultado.nombre : null;   
    }

    return (
        <div className="form-rep-container">
           {/* <img className="mx-auto mb-8 w-52 pb-2" src={logo}></img>*/}
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


                { buscarContactoPorId(contactoActual) == 'Otro' &&
                <FormInputHook label="Contacto Otro" id="contacto_otro" placeholder="Otra forma de contacto" 
                    defaultValue={form3b?.contacto_otro}
                    maxLength={255}
                    register={ register('contacto_otro', {maxLength:255}) }
                />}

                { errors.domicilio?.type == 'maxLength' && <ErrorMax>100</ErrorMax> }

                <TextArea 
                    label="Comente con sus palabras enfermedad y/o dolencias que padece que justifiquen el uso de cannabis medicinal"
                    id="patologia"
                    defaultValue={form3b.patologia}
                    register={ register('patologia', {maxLength:500}) }
                />
                { errors.patologia?.type == 'maxLength' && <ErrorMax>500</ErrorMax> }
                
                <RadioSiNoAlt 
                    label="¿Otra persona cultivará para tí?"
                    id="es_menor"
                    checked={ esMenor }
                    onChange={ () => setEsMenor(!esMenor) }
                />
                
                
                <h6 className="text-gray-500 text-xs leading-3 pb-1 pt-2">Si la respuesta es Sí, ingrese a continuación los datos del tutor</h6>
                
                <div className='pt-4'>
                    <SubmitButton value="Continuar" />
                </div>
                
            </form>
            <div className="form-rep-contacto">
                <Contacto />
            </div>
        </div>
    )
}

export default FormRep3b