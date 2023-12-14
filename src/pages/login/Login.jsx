import { useState, useEffect } from 'react';
import {/* Form,*/ Link/*, redirect*/, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-doconline.jpg';
import { LoginInput } from '../../components/FormInput';
import {LoginButton } from '../../components/Buttons';
import useAuth from '../../hooks/useAuth';
import Alerta from '../../components/Alerta';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google'; //eslint-disable-line no-unused-vars
import axios from 'axios';
import Spinner from '../../components/Spinner';
import './login.css';
import minImage from '../../assets/min_salud.png';
import reproImage from '../../assets/reprocan.png';
import { useParams } from 'react-router-dom';
import { getGrowByRoute } from '../../data/grows';

function Login() {
    const { setUser, googleProfile, setGoogleProfile } = useAuth();//eslint-disable-line no-unused-vars
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [contenidoCargado, setContenidoCargado] = useState('true');
    const [alerta, setAlerta] = useState({});
    const [ googleUser, setGoogleUser ] = useState();
    const navigate = useNavigate();
    const loginButton = document.getElementById('login-button');
    const routeParams = useParams();
    // eslint-disable-next-line
    const regex_mail = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    const gLogin = useGoogleLogin({
        onSuccess: (codeResponse) => setGoogleUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            loginButton.click();
        }
    });

    const growRoute = routeParams.grow;
    const getGrow = () => {
        if(growRoute !== undefined){
            getGrowByRoute(growRoute).then((resp)=>{
                sessionStorage.setItem('growId',resp.idgrow);
            });
        }else{
            if (sessionStorage.getItem('growId')) {
                sessionStorage.removeItem('growId');
              }
        }
    }

    useEffect(() => {
        sessionStorage.setItem('fromLogin', 'true');
        getGrow();

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
    }, [ googleUser ] //eslint-disable-line
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

        let url = import.meta.env.VITE_API_URL + '/turnero.loginUser';
        if(regex_mail.test(userid)) { //Verifica si es un e-mail
            url = import.meta.env.VITE_API_URL + '/turnero.loginEmail';
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
        setContenidoCargado(false);
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

        <div className="login-container">
            <div className="login-form">

                <div className="login-logo-container">
                    {/*<span className="login-logo-text">Cuida tu salud estés donde estés</span>*/}
                    
                    <img className="login-logo mx-auto pb-4" src={ logo }></img>
                </div>
    
                <h3 className="login-bienvenido">Bienvenido/a</h3>


                <button onClick={() => gLogin()}
                    className="login-google-button px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                    <img className="login-google-button-icon" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
                    <span className="login-google-button-text">Iniciar sesión / registrarme con Google</span>
                </button>

                <span className="login-o">o</span>


                {msg && <Alerta alerta={ alerta } />}
                
                <LoginInput
                    className="login-input"
                    rounded={true}
                    id="userId"
                    value={userid}
                    onChange={ e => setUserid(e.target.value)}
                    placeholder="Nombre de Usuario o E-Mail"
                />

                <LoginInput
                    className="login-input"
                    rounded={true}
                    id="password"
                    value={password}
                    onChange={ e => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    password={true}
                />
                
                <div className='login-olvidaste mb-4'>
                    <Link to='/restablecer' className='mb-6 text-gray-500 text-sm'>¿Olvidaste tu Contraseña?</Link>
                </div>
                
                <div className="login-buttons">
                    <LoginButton id="login-button" value="Iniciar Sesión" onClick={login} />
                    <Link to='/registrarme' className='login-registrar'>Registrarme</Link>
                </div>


            </div>

            <div className="login-min-repro-container">
                <img src={minImage} className="login-image login-min-image"></img>
                <img src={reproImage} className="login-image login-repro-image"></img>
            </div>

        </div>
        
        }</>
    )
}

export default Login