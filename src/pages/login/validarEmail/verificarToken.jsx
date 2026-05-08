import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../../components/card/card.jsx";
import Spinner from "../../../components/Spinner";
import useAuth from '../../../hooks/useAuth';
import { AuthService } from "../../../data/auth.js";

import Storage from '../../../utils/Storage/Storage';
import RolUsuario from '../../../enum/RolUsuario';

export default function VerificarToken() {

    const navigate = useNavigate();
    const { setUser } = useAuth(); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [verificando, setVerificando] = useState(false);
    const { token } = useParams();
    const [success, setSuccess] = useState(false);


     const verificar = async () => {
        if(verificando){
            return;
        }

        setVerificando(true);

        if (!token) {
            setError("Token inválido");
            setLoading(false);
            return;
        }

        try {
            const response = await AuthService.validarEmail(token);
            const data = await response.json();

            if (!response.ok || !data.ok) {
                setError(data.message || "Token inválido o vencido");
                return;
            }

            const user = data.user;

            localStorage.setItem('dc_userId', user.id);
            localStorage.setItem('dc_userName', user.userName);
            
            setUser({
                userId:user.id,
                userName:user.userName
            })

            if(user.growAdmin > 0){

                const grow = JSON.stringify({
                    idgrow: user.growAdmin,
                    tipo_id: user.tipoGrow
                });

                if(user.tipoGrow == RolUsuario.Grow){
                    Storage.setRol(RolUsuario.Grow);

                }else if(user.tipoGrow == RolUsuario.ONG){
                    Storage.setRol(RolUsuario.ONG);
                }

                localStorage.setItem('user-grow', grow);

            }else{
                Storage.setRol(RolUsuario.Paciente);
            }

            setSuccess(true);

            setTimeout(() => {
                navigate('/panel');
            }, 2500);
            
        } catch (e) {
            console.error(e);
            setError("Ocurrió un error al validar el email");

        } finally {
            setLoading(false);
            setVerificando(false);
        }
    };


    useEffect(() => {
        verificar();

    }, [token]);

    return (
        <div className="page-container">
            <div className="page">
                <div className="validar-email-container">
                    <Card style={{ width: '700px' }}>

                       {
                        loading ?

                            <>
                                <h2>Verificando...</h2>

                                <p style={{ textAlign: 'center' }}>
                                    Serás redirigido en unos instantes...
                                </p>

                                <div style={{position:"relative", margin:"20px", height:"50px"}}>
                                    <Spinner />
                                </div>
                            </>

                        :

                        error ?

                            <>
                                <h2>Email no validado</h2>

                                <p style={{textAlign:"center"}}>
                                    {error}
                                </p>
                            </>

                        :

                        success &&

                            <>
                                <h2>Email validado</h2>

                                <p style={{textAlign: 'center'}}>
                                    Serás redirigido en unos instantes...
                                </p>

                                <div style={{position:"relative", margin:"20px", height:"50px"}}>
                                    <Spinner />
                                </div>
                            </>
                    }

                    </Card>
                </div>
            </div>
        </div>
    );
}