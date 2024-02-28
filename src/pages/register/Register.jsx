import { useState, useEffect } from 'react';
import { useActionData, useNavigate } from 'react-router-dom';
import {FormInput, FormInputDate} from '../../components/FormInput';
import { SubmitButton } from '../../components/Buttons';
import Error from '../../components/Error';
import { esFechaValida, esEmailValido } from '../../utils/validation';
import { registrar} from '../../data/pacientes';
import useAuth from '../../hooks/useAuth';
import './register.css';
import Spinner from '../../components/Spinner';

function Register() {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const actionResult = useActionData();

    // ------------ MODEL ------------ //
    const [ nombre, setNombre ] = useState("");
    const [ username, setUsername] = useState("");
    const [ email, setEmail ] = useState("");
    const [ telefono, setTelefono ] = useState("");
    const [ fechaNac, setFechaNac ] = useState("");
    const [ dni, setDni ] = useState("");
    const [ domicilio, setDomicilio ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ grow, setGrow ] = useState("");
    //----------------------------------//

    const [ confirmarTelefono, setConfirmarTelefono ] = useState("");
    const [ confirmarEmail, setConfirmarEmail ] = useState("");
    const [ confirmarPassword, setConfirmarPassword ] = useState("");

    const [ errores, setErrores ] = useState();
    const [ inSubmit, setInSubmit ] = useState();

    const getGrow = () =>{
        if (sessionStorage.getItem('growId')) {
            const growId_ = sessionStorage.getItem('growId');
            setGrow(growId_);
        }else{
            setGrow(null);
        }
    };

    const setUserSession = (user) => {
        localStorage.setItem('dc_userId',user.userId);
        localStorage.setItem('dc_userName',user.userName);
        setUser({ userId: user.userId, userName: user.userName });
    }
        
    const validate = (datos) => {
        const errores_ = [];
        
        if (!datos.nombre || !datos.telefono || !datos.fecha_nac || !datos.dni 
            || !datos.domicilio || !datos.email || !datos.password || !datos.username 
            || !confirmarPassword || !confirmarEmail || !confirmarTelefono){

            errores_.push('Todos los campos son obligatorios');
        }

        if(!esFechaValida(datos.fecha_nac)){
            errores_.push('La fecha de nacimiento no es válida');
        }

        if(confirmarTelefono && (datos.telefono != confirmarTelefono)){
            errores_.push('Los teléfonos no coinciden');
        }

        if(confirmarPassword && (datos.password != confirmarPassword)){
            errores_.push('Las contraseñas no coinciden');
        }

        if(confirmarEmail && (datos.email != confirmarEmail)){
            errores_.push('Los emails no coinciden');
        }

        if(errores_.length){
            setErrores(errores_);
            return false;
        }

        return true;
    }

    const submit = async (e) => {
        e.preventDefault();

        if(inSubmit) return;
        
        setInSubmit(true);

        const datos = {
            nombre:nombre,
            username:username,
            password:password,
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
            const resp = await registrar(datos);
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

    useEffect(() => {
        getGrow();
    },[])
    
    return (
        <div className="register-container">
           { inSubmit? <Spinner/> : <>
            <div className='mb-2' style={{textAlign:'center',paddingBottom:'15px'}}>
              <h2 className="black-title">Registrar usuario</h2>
            </div>

            <form onSubmit={submit}>
                <FormInput setState={setNombre} type={"text"} label="Nombre y Apellido*" id="nombre" maxlenght="150" placeholder="Nombre y Apellido" />

                <div className='flex flex-row space-x-2'>
                    <FormInputDate setState={setFechaNac} label="Fecha de Nacimiento*" maxLength={10} id="fecha_nac"/>
                    <FormInput setState={setDni} type={"number"} label="DNI*" id="dni" maxlenght="10" placeholder="12345676" />
                </div>

                <FormInput setState={setDomicilio} type={"text"} label="Domicilio*" id="direccion" placeholder="Calle y Número" />

                <div className='flex flex-row space-x-2'>
                    <FormInput setState={setTelefono} type={"number"} label="Teléfono*" id="telefono" placeholder="342 4392819" />
                    <FormInput setState={setConfirmarTelefono} type={"number"} label="Confirmar Teléfono*" id="telefono_conf" placeholder="342 4392819" />
                </div>

                <FormInput setState={setEmail} type={"text"} label="E-Mail*" id="email" placeholder="usuario@mail.com" />
                <FormInput setState={setConfirmarEmail} type={"text"} label="Confirmar E-Mail*" id="email_conf" placeholder="usuario@mail.com" />
                <FormInput setState={setUsername}type="text" label="Nombre de Usuario*" id="username" placeholder="ingrese un nombre de usuario" />

                <div className='flex flex-row space-x-2'>
                    <FormInput setState={setPassword} type={"password"} label="Contraseña*" id="password"/>
                    <FormInput setState={setConfirmarPassword} type={"password"} label="Repetir Contraseña*" id="password_conf"/>
                </div>

                {errores?.length && errores.map(( error, i ) => <Error key={i}>{error}</Error> )}

                <div className='pt-4'><SubmitButton defaultValue="Registrarme"/></div>
            </form>

            <div className='mb-0 mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/login')}>Volver</button>
            </div>
            </>}
        </div>
    )
}

export default Register;