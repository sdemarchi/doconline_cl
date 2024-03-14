import { useState, useEffect } from 'react';
import { useActionData, useNavigate } from 'react-router-dom';
import { FormInput , FormInputDate } /*,{ FormInputReadonly }*/ from '../../components/FormInput';
import { SubmitButton } from '../../components/Buttons';
import { esFechaValida } from '../../utils/validation';
import { registrarGoogle } from '../../data/pacientes';
import useAuth from '../../hooks/useAuth';
import './register.css';
import Spinner from '../../components/Spinner';


function GoogleRegister() {
    const { setUser, googleProfile } = useAuth();
    const navigate = useNavigate();
    const actionResult = useActionData();

    // ------------ MODEL ------------ //
    const [ nombre, setNombre ] = useState();
    const [ email, setEmail ] = useState();
    const [ telefono, setTelefono ] = useState();
    const [ fechaNac, setFechNac ] = useState();
    const [ dni, setDni ] = useState();
    const [ domicilio, setDomicilio ] = useState();
    const [ grow, setGrow ] = useState();
    //--------------------------------//

    const [ confirmarTelefono, setConfirmarTelefono ] = useState();
    const [ errores, setErrores ] = useState();
    const [ inSubmit, setInSubmit ] = useState();
    
    const setUserSession = (user) => { //ejecutar al recibir respuesta
        localStorage.setItem('dc_userId',user.userId);
        localStorage.setItem('dc_userName',user.userName);
        if(user.adminGrow){
            sessionStorage.setItem('user-grow',JSON.stringify({idgrow:user.adminGrow}));
        }
        JSON.stringify(user);
        setUser({ userId: user.userId, userName: user.userName });
    }

    const getGrow = () =>{
        if (sessionStorage.getItem('growId')) {
            const growId_ = sessionStorage.getItem('growId');
            setGrow(growId_);
        }else{
            setGrow(null);
        }
    };

    const submit = async (e) => {
        e.preventDefault();

        if(inSubmit) return;

        setInSubmit(true);

        const datos = {
            nombre:nombre,
            telefono:telefono,
            email:email,
            domicilio:domicilio,
            dni:dni,
            fecha_nac:fechaNac,
            grow:grow
        }

        const formIsValid = validate(datos);

        if(formIsValid){
            console.log('inSubmit');
            const resp = await registrarGoogle(datos);
            setInSubmit(false);

            if(resp.error.code == 0){
                setUserSession({userId: resp.user.id, userName: resp.user.name});
                return navigate('/panel');
            } else {
                setErrores([resp.error.message])
            }
        }else{
            setInSubmit(false);
        }
    }
    
    const validate = (datos) => {
        const errores_ = [];
        
        if (!datos.nombre || !datos.telefono || !datos.fecha_nac || !datos.dni || !datos.domicilio || !datos.email){
            errores_.push('Todos los campos son obligatorios');
        }
        if(!esFechaValida(datos.fecha_nac)){
            errores_.push('La fecha de nacimiento no es válida');
        }
        if(datos.telefono != confirmarTelefono){
            errores_.push('Los teléfonos no coinciden');
        }
        if(errores_.length){
            setErrores(errores_);
            return false;
        }

        return true;
    }

    useEffect(() => {
       getGrow();
       setEmail(googleProfile.email);
       setNombre(googleProfile.name);
    },[])
    
    
    return (
        <div className="register-container">
            { inSubmit ?
            <div class="page"> <Spinner /> </div>:
            <>
            <div className='mb-2' style={{textAlign:'center',paddingBottom:'15px',paddingTop:'20px'}}>
              <h2 className="black-title">Registrar usuario</h2>
            </div>
            
            <form onSubmit={submit}>
                <FormInput  type={"text"} label="Nombre y Apellido*" id="nombre" setState={setNombre} placeholder='Nombre y apellido' maxlenght="150" defaultValue={ googleProfile.name} />

                <div className='flex flex-row space-x-2'>
                    <FormInputDate setState={setFechNac} label="Fecha de Nacimiento*" id="fecha_nac"/>
                    <FormInput setState={setDni} type={"number"} label="DNI*" id="dni" maxlenght="10" placeholder="12345676" />
                </div>

                <FormInput setState={setDomicilio} type={"text"} label="Domicilio*" id="domicilio" placeholder="Calle y Número" />

                <div className='flex flex-row space-x-2'>
                    <FormInput setState={setTelefono} type={"number"} label="Teléfono*" id="telefono" placeholder="342 4392819" />
                    <FormInput setState={setConfirmarTelefono} type={"number"}  label="Confirmar Teléfono*" id="telefono_conf" placeholder="342 4392819" />
                </div>

                <FormInput type={"text"} label="E-Mail*" id="email" value={googleProfile.email} defaultValue={email}/>

                {errores?.length && errores.map( ( error, index ) =>
                 <div className="error-message" style={{minHeight:"22px"}} key={index}>{error}</div>
                )}

                <div className='pt-4 mt-8 '><SubmitButton value="Enviar"/></div>
            </form>
            
            <div className='mb-0mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/login')}>Volver</button>
            </div>

        </>
            }
        </div>
    )
}

export default GoogleRegister;