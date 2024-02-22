import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SubmitButton } from '../../components/Buttons';
import useForm from '../../hooks/useForm';
import TextArea from '../../components/TextArea';
import /*RadioSiNo, */{RadioSiNoAlt} from '../../components/Radio';
import { useForm as useFormHook } from "react-hook-form";
import { ErrorMax } from '../../components/Error';
import './formReprocann.css';
import Contacto from '../../components/contacto/contacto';
import Spinner from '../../components/Spinner';

function FormRep3() {

    const { register, formState: { errors }, handleSubmit } = useFormHook();
    const { form3, setForm3 }  = useForm();
    const [ arritmia, setArritmia ] = useState(false);
    const [ alergia, setAlergia ] = useState(false);
    const [ embarazada, setEmbarazada ] = useState(false);
    const [ salud_mental, setSalud_mental ] = useState(false);
    const [ maneja_maq, setManeja_maq ] = useState(false);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    const subirScroll = () =>{
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        async function cargarEstados(){
            setArritmia(form3.arritmia);
            setAlergia(form3.alergia);
            setEmbarazada(form3.embarazada);
            setSalud_mental(form3.salud_mental);
            setManeja_maq(form3.maneja_maq);
            subirScroll();
            setCargando(false);
            console.log(form3);
        }
        cargarEstados()
    }, []) //eslint-disable-line

    const onSubmit = (data) => {
        data.arritmia = arritmia ? 1 : 0
        data.alergia = alergia ? 1 : 0
        data.embarazada = embarazada ? 1 : 0
        data.salud_mental = salud_mental ? 1 : 0
        data.maneja_maq = maneja_maq ? 1 : 0
        setForm3(data);
        return navigate('/formulario-3b');
    }
    
    return (
        <div className="form-rep-container page">
        {cargando ? <Spinner />:
            <> <form onSubmit={ handleSubmit(onSubmit) }>
                {/*<RadioSiNo 
                    label="¿Tiene arritmias en actividad?" 
                    id="arritmia" 
                    register={ register('arritmia')} 
                    checked={ form3.arritmia == 1 ? true : false }
                />*/}
                <RadioSiNoAlt className="checks-input"
                    label="¿Tiene arritmias en actividad?"
                    id="arritmia"
                    checked={ arritmia }
                    onChange={ () => setArritmia(!arritmia) }
                />
                
                <RadioSiNoAlt className ="checks-input"
                    label="¿Tiene alergia a algún componente de la planta?"
                    id="alergia"
                    checked={ alergia }
                    onChange={ () => setAlergia(!alergia) }
                />

                <RadioSiNoAlt className ="checks-input"
                    label="¿Está embarazada o realizando lactancia?"
                    id="embarazada"
                    checked={ embarazada }
                    onChange={ () => setEmbarazada(!embarazada) }
                />

                <RadioSiNoAlt className ="checks-input"
                    label="¿Tiene antecedentes de algún padecimiento en salud mental?¿Se encuentra actualmente en tratamiento?"
                    id="salud_mental"
                    checked={ salud_mental }
                    onChange={ () => setSalud_mental(!salud_mental) }
                />

                <TextArea 
                    label="Completar con medicación si corresponde"
                    id="salud_ment_esp"
                    defaultValue={form3?.salud_ment_esp}
                    register={ register('salud_ment_esp', {maxLength:80}) }
                />
                { errors.salud_ment_esp?.type == 'maxLength' && <ErrorMax>80</ErrorMax> }
                
                <RadioSiNoAlt className ="checks-input"
                    label="¿Maneja maquinarias de alta precisión?"
                    id="maneja_maq"
                    checked={ maneja_maq }
                    onChange={ () => setManeja_maq(!maneja_maq) }
                />
                
                <div className='pt-4'>
                    <SubmitButton value="Continuar" />
                </div>
                
            </form>
            <div className='mb-0 mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/formulario-2')} >Atrás</button>
            </div>

            <div className="form-rep-contacto">
                <Contacto />
            </div></>}
        </div>
    )
}

export default FormRep3