import { useState, useEffect } from 'react'
import {/* Form,*/ Link/*, redirect*/, useNavigate } from 'react-router-dom'
import logo from '../assets/logo-doconline-vert.png'
import { FormInputState } from '../components/FormInput'
import { ActionButton } from '../components/Buttons'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'
import {/* GoogleLogin, googleLogout,*/ useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Spinner from '../components/Spinner'


function Login() {
    const { setUser, /*googleProfile,*/ setGoogleProfile } = useAuth();
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [contenidoCargado, setContenidoCargado] = useState('true');
    const [alerta, setAlerta] = useState({});
    const [ googleUser, setGoogleUser ] = useState();
    const navigate = useNavigate();
    const regex_mail = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    const gLogin = useGoogleLogin({
        onSuccess: (codeResponse) => setGoogleUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            login;
        }
    });


    useEffect(
        () => {
            if (googleUser) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${googleUser.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        console.log(res.data)
                        setGoogleProfile(res.data)
                        loginConGoogle(res.data.email);
                    })
                    .catch((err) => console.log(err));
                
            }
        },
        [ googleUser ]
    );


    async function login() {

        if([userid, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return
        }

        setContenidoCargado(false);
        
        let url = import.meta.env.VITE_API_URL + '/turnero.loginUser'
        if(regex_mail.test(userid)) { //Verifica si es un e-mail
            url = import.meta.env.VITE_API_URL + '/turnero.loginEmail'
        }

        try {
            const respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({userid:userid, password:password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const resp = await respuesta.json()
            if(resp.error.code == 0){
                localStorage.setItem('dc_userId',resp.user.id)
                localStorage.setItem('dc_userName',resp.user.userName)
                setUser({
                    userId:resp.user.id,
                    userName: resp.user.userName
                })
                return navigate('/panel')
            } else {
                setContenidoCargado(true);
                setAlerta({
                    msg: resp.error.message,
                    error: true
                })
            }
            //console.log(resp)
        } catch (error) {
           // console.log(error)
        }
    }

    async function loginConGoogle(email) {

        let url = import.meta.env.VITE_API_URL + '/turnero.loginGoogle'
        
        try {
            const respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({email:email}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const resp = await respuesta.json()
            if(resp.error.code == 0){
                localStorage.setItem('dc_userId',resp.user.id)
                localStorage.setItem('dc_userName',resp.user.userName)
                setUser({
                    userId:resp.user.id,
                    userName: resp.user.userName
                })
                return navigate('/panel')
            } else {
                return navigate('/g-perfil')
            }
            //console.log(resp)
        } catch (error) {
            console.log(error)
        }
    }

    const { msg } = alerta

    return (
        <> { !contenidoCargado && <Spinner />}{ contenidoCargado && 

        <div>
            <img className="mb-6 mx-auto w-20 pb-4" src={ logo }></img>

            {msg && <Alerta alerta={ alerta } />}
            
            <FormInputState 
                id="userId"
                label="Nombre de Usuario o E-Mail" 
                value={userid}
                onChange={ e => setUserid(e.target.value)}
                placeholder="Nombre de Usuario o E-Mail"
            />

            <FormInputState 
                id="password"
                label="Contraseña" 
                value={password}
                onChange={ e => setPassword(e.target.value)}
                placeholder="Contraseña"
                password={true}
            />
            
            <div className='mb-4'>
                <Link to='#' className='mb-6 text-gray-500 text-sm'>¿Olvidaste tu Contraseña?</Link>
            </div>
            <ActionButton value="Iniciar Sesión" onClick={login} />
            <div className='mx-auto pt-3 text-center'>
                <Link to='/registrarme' className='text-gray-500'>Registrarme</Link>
            </div>
            <div className='mx-auto p-3 text-gray-500 text-center'>
                <span>o</span>
            </div>
            
            <div className='flex flex-col items-center'>
                <button onClick={() => gLogin()}
                    className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                    <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
                    <span>Iniciar sesión con Google</span>
                </button>

            </div>
        </div>
        
        }</>
    )
}

export default Login