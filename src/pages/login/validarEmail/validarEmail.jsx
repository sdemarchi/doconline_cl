import Card from "../../../components/card/card.jsx";
import { useLocation, useNavigate } from 'react-router-dom';
import './validarEmail.css';
import { ActionButton } from "../../../components/Buttons.jsx";
import Spinner from '../../../components/Spinner';
import { useEffect, useRef, useState } from "react";
import { AuthService } from "../../../data/auth.js";

export default function ValidarEmail() {

    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const [loading, setLoading] = useState(false);
    const [segundosRestantes, setSegundosRestantes] = useState(0);
    const [correoReenviado, setCorreoReenviado] = useState(false);
    const envioInicialEjecutado = useRef(false);


    const enviarVerificacionEmail = async () => {

    setLoading(true);

    try {
        const response = await AuthService.enviarVerificacionEmail(email);
        const data = await response.json();

        if (!response.ok || !data.ok) {

            if(data.message === 'El email ya fue verificado'){
                navigate('/login');
                return false;
            }

            throw new Error(data.message || 'Error al enviar el correo');
        }

        return true;

        } catch (error) {

            console.error('Error:', error);
            return false;

        } finally {
            setLoading(false);
        }
    };

   const reenviarCorreo = async () => {
    
    const enviado = await enviarVerificacionEmail();

        if(!enviado) return;

        setCorreoReenviado(true);
        setSegundosRestantes(60);
            
        setTimeout(() => {
            setCorreoReenviado(false);
        }, 5000);
    };


    useEffect(() => {

        if(envioInicialEjecutado.current){ //Evito enviar el mail dos veces al cargar el componente
            return;
        }

        envioInicialEjecutado.current = true;

        enviarVerificacionEmail();

    }, []);

    useEffect(() => {
        if (segundosRestantes <= 0) return;

        const timeout = setTimeout(() => {
            setSegundosRestantes(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timeout);

    }, [segundosRestantes]);

    return (
        <div className="page-container">
            <div className="page">

                <div className="validar-email-container">

                    { loading ? <Spinner /> :

                    <Card style={{ width: '600px' }}>
                        {
                            correoReenviado ?
                            <div className="correo-reenviado-alert">
                                Correo reenviado
                            </div> 
                            :
                            <h2>Verificá tu Email</h2>
                        }       

                        <p>
                            Enviamos un correo de verificación a <strong>{email}</strong>.
                            Revisá tu bandeja de entrada y seguí las instrucciones.
                        </p>

                    
                        {segundosRestantes > 0 ? 
                            <div className="reenviar">  
                                <p>Podras reenviar el correo en:</p>
                                <h2>{segundosRestantes}s</h2>   
                            </div>
                       :
                            <ActionButton
                                onClick={reenviarCorreo}
                                disabled={segundosRestantes > 0}
                                value={'Reenviar correo'}
                            />
                        }

                        <div className=' mx-auto p-3 text-center'>
                            <button className='text-gray-500' onClick={() => navigate('/login')}>Volver</button>
                        </div>
                    </Card>
                    }
                </div>
            </div>
        </div>
    );
}