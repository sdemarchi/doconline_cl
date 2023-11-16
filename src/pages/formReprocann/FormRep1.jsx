import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
//import logo from '../assets/logo-doconline-reprocann-500.png'
import { FormInputDate, FormInputHook } from '../../components/FormInput';
import { SubmitButton } from '../../components/Buttons';
import useForm from '../../hooks/useForm';
import Error, { ErrorReq, ErrorMax,/* ErrorVal*/ } from '../../components/Error';
import { perfil } from '../../data/pacientes';
import { useForm as useFormHook } from "react-hook-form";
import { dateValidator, emailValidator, numberValidator } from '../../data/validators';
import './formReprocann.css';
import WspBoton from '../../components/wsp-boton/wsp-boton';


function FormRep1() {
    const user = useOutletContext();
    const { register, formState: { errors }, handleSubmit, getValues } = useFormHook();
    const { form1, setForm1 } = useForm();
    const navigate = useNavigate();
    const [/*paciente*/, setPaciente] = useState({});
    var [fechaNac, setFechaNac] = useState('');
    const [errorFechaNac, setErrorFechaNac] = useState('');
    fechaNac = sessionStorage.getItem('fecha_nac');
    const [cargando] = useState(0);
    const [confimCelError , setConfimCelError] = useState('');
    var celValue;
    var [confirmarCelular, setConfirmarCelular] = useState(form1?.celular || sessionStorage.getItem('telefono') );

    const handleConfirmarCelularChange = (event) => {
        setConfirmarCelular(event.target.value);
    };

    const subirScroll = () =>{
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        async function getPaciente() {
            const response = await perfil(user.userId);
            setPaciente(response);
        }

        subirScroll();
        getPaciente();
        setFechaNac(form1.fe_nacim);
       
    }, [cargando]) //eslint-disable-line
    
    const onSubmit = (data) => {
        celValue = getValues('celular');
        var validForm = false;
        var validFecha = false;
        var validCel = false;

        if(dateValidator(fechaNac)){
            setErrorFechaNac('');
            validFecha = true;
        }else{
            setErrorFechaNac('Fecha no válida');
        }

        if(celValue === confirmarCelular){
           validCel = true;
        }else{
            setConfimCelError('Los telefonos no coinciden.');
        }
        

        validForm = validFecha && validCel;
        
        if(validForm){
            setForm1(data)
            setForm1(data => ({
                ...data,
                ...{fe_nacim:fechaNac}
              }))
            return navigate('/formulario-2')
        }
        return
    }

    return (
        <div className="form-rep-container">
           {/* <img className="mx-auto w-52 mb-8 pb-2" src={logo}></img> <h1>Formulario Reprocann</h1>*/}
            

            <form onSubmit={handleSubmit(onSubmit)}>

                <FormInputHook label="Nombre y Apellido*" id="nom_ape"
                    defaultValue={form1?.nom_ape?.length && form1?.nom_ape || sessionStorage.getItem('nombre')}
                    maxLength={255}
                    register={register('nom_ape', { required: true, maxLength: 255 })}
                />

                {errors.nom_ape?.type == 'required' && <ErrorReq>Nombre y Apellido</ErrorReq>}
                {errors.nom_ape?.type == 'maxLength' && <ErrorMax>255</ErrorMax>}

                <div className="space"></div>

                <FormInputDate label="Fecha de Nacimiento*" id=""
                    value={/*fechaNac*/ sessionStorage.getItem('fecha_nac')}
                    maxLength={10}
                    onChange={(e) => setFechaNac(e)}
                />

                {errorFechaNac && <Error>{errorFechaNac}</Error>}

                <div className="space"></div>
                        
                <div className='flex flex-row'>

                    <div className='basis-1/2 pe-1'>

                        <FormInputHook label="DNI*" id="dni"
                            defaultValue={form1?.dni !== sessionStorage.getItem('dni') && sessionStorage.getItem('dni') || sessionStorage.getItem('dni')}
                            maxLength={8}
                            type={"number"} 
                            register={register('dni', {
                                required: true, maxLength: 8, validate: numberValidator})}
                        />

                        {errors.dni?.type == 'required' && <ErrorReq>DNI</ErrorReq>}
                        {errors.dni?.type == 'maxLength' && <ErrorMax>10</ErrorMax>}
                        {!(errors.dni?.type == 'required' || errors.dni?.type == 'maxLength') && errors.dni && <Error>DNI no válido</Error>}            
                    </div>

                    <div className='basis-1/2 ps-1'>

                        <FormInputHook  type={"number"}  label="Edad*" id="edad"
                            defaultValue={form1?.edad  !== sessionStorage.getItem('edad') && form1?.edad || '' }
                            maxLength={3}
                            register={register('edad', { required: true, max: 100, validate: numberValidator })}
                        />

                        {errors.edad?.type == 'required' && <ErrorReq>Edad</ErrorReq>}
                        {!(errors.edad?.type == 'required') && errors.edad && <Error>Edad no valida</Error>} 
                        { /*errors.edad?.type == 'max' && <ErrorVal>100</ErrorVal>*/}

                    </div>
                </div>

                <div className="space"></div>

                <FormInputHook label="E-Mail*" id="email"
                    defaultValue={form1?.email !== sessionStorage.getItem('email') && form1?.email || sessionStorage.getItem('email')}
                    maxLength={150}
                    register={register('email', { required: true, maxLength: 150, validate: emailValidator })}
                />
                {errors.email?.type == 'required' && <ErrorReq>E-Mail</ErrorReq>}
                {errors.email?.type == 'maxLength' && <ErrorMax>150</ErrorMax>}
                {!(errors.email?.type == 'maxLength' || errors.email?.type == 'required') && errors.email && <Error>E-Mail no válido</Error>}

                <div className="space"></div>

                <FormInputHook type={"number"} label="Teléfono Celular*" id="celular"
                    defaultValue={form1?.celular !== sessionStorage.getItem('telefono') && form1?.celular || sessionStorage.getItem('telefono')}
                    maxLength={20}
                    register={ register('celular', { required: true, maxLength: 15})}
                />
                
                {errors.celular?.type == 'required' && <ErrorReq>Celular</ErrorReq>}
                {errors.celular?.type == 'maxLength' && <ErrorMax>15</ErrorMax>}
                {errors.celular?.pattern == 'maxLength' && <ErrorMax>15</ErrorMax>}
                
                <div className="space"></div>

                <FormInputHook type={"number"} label="Repetir Teléfono Celular*"
                    defaultValue={form1?.celular !== sessionStorage.getItem('telefono') && form1?.celular || sessionStorage.getItem('telefono')}
                    maxLength={20}
                    onChange={handleConfirmarCelularChange} 
                />
                { confirmarCelular !== getValues("celular") && <Error>{confimCelError}</Error>}

                <FormInputHook label="Código de Vinculación de REPROCANN" id="cod_vincu"
                    defaultValue={form1?.cod_vincu}
                    maxLength={50}
                    register={register('cod_vincu', { maxLength: 50 })}
                    info={"Si no tenes este codigo dejalo en blanco y te guiaremos por WhatsApp para obtenerlo"}
                />
                {errors.cod_vincu?.type == 'maxLength' && <ErrorMax>50</ErrorMax>}

                <div className="space"></div>

                <div className='pt-4'>
                    <SubmitButton value="Continuar" />
                </div>

            </form>
            <div className=' mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/panel')} >Volver</button>
            </div>
            
            <div className="form-rep-contacto">
                <WspBoton/>
            </div>
        </div>
    )
}

export default FormRep1;