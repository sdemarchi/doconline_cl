import { LinkButton, MiniActionButtonRed } from '../../components/Buttons';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { perfil, descargarFormulario, getTurnoPaciente } from '../../data/pacientes';
import { cancelarTurno } from '../../data/turnero';
import { useEffect, useState } from 'react';
import useForm from '../../hooks/useForm';
import Spinner from '../../components/Spinner';
import './panel.css';
import InfoCard from '../../components/info-card/info-card';
import { BsCalendarWeek } from "react-icons/bs";
import { FaWpforms } from "react-icons/fa";
import Contacto from '../../components/contacto/contacto';
import Nav from '../../components/nav/nav';
import {GrFormNext } from "react-icons/gr";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Card from '../../components/card/card';

function Panel() {
    const user = useOutletContext();
    const navigate = useNavigate();

    const [paciente, setPaciente] = useState({});
    const [cargando] = useState(0);
    const [DatosCargados, setDatosCargados] = useState(false);
    const [turnoPaciente, setTurnoPaciente] = useState({});

    const {/* setFormCargado,*/ llenarFormulario } = useForm();

    const formSuccess = JSON.parse(sessionStorage.getItem('form-success')) || false;

    async function cargarTurnoPaciente() {
        const response = await getTurnoPaciente(user.userId);
        setTurnoPaciente(response);
        const fromLogin = sessionStorage.getItem('fromLogin');

        if(response.id  == 0 && fromLogin=='true'){
            return navigate('/turno');
        }

        setDatosCargados(true);
    }

    async function cancelarMiTurno() {
        const response = await cancelarTurno(user.userId)
        setTurnoPaciente(response)
    }

    const subirScroll = () =>{
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        subirScroll();
        async function getPaciente() {
            const response = await perfil(user.userId);
            setPaciente(response);
            
            const response2 = await descargarFormulario(response.dni);
            if(response2.error.code == 0){
                llenarFormulario(response2.data, response2.patologias);
            }
        }
        getPaciente();
        cargarTurnoPaciente();
    }, [cargando]) //eslint-disable-line

    function logout() {
        localStorage.removeItem('dc_userId')
        localStorage.removeItem('dc_userName')
        return navigate('/login')
    }

    return (

        <>
        {!DatosCargados &&
             <div className='panel-container'> <Spinner /></div>
        }

        {DatosCargados &&
        <div className='panel-container'>

            <Card>
                <h2 className="panel-titulo">Hola, {paciente.nombre}<span className='panel-titulo-icon'><GrFormNext style={{display:"inline",opacity:"70%"}}/></span></h2>

                <div className="panel-description">
                    <h3 className="panel-description-subtitle">Tramitá tu Reprocann</h3>
                    <p className="panel-description-text">Fácil, seguro y sin moverte de tu casa.</p>
                </div>
            </Card>

            {/*<p className="panel-doctor">Dr. Joaquin Joazmi</p>
            <hr className='panel-separador solid border-input border-1 my-3'></hr>
            */}
             
            <div className="turnos-container">
                
            {turnoPaciente.id > 0 ?
                <>
                    <Card>
                        <h3 className="panel-turno-titulo">
                            <span className='panel-turno-icon'><IoIosCheckmarkCircle/></span> 
                            Turno confirmado
                        </h3> 
                        <p className="panel-turno-texto">{turnoPaciente.detalle}</p>
                        <div className='flex flex-row-reverse pt-1'>
                            <MiniActionButtonRed onClick={() => cancelarMiTurno()} value="Cancelar" />
                        </div>
                    </Card>
                </>
                :
                <>
                   {/*} <div className="panel-info">
                        <InfoCard text={"Solicita un turno con nosotros y completa el formulario de Reprocann."}/>
                    </div>*/}

                    <Card title="Solicitar turno">
                        <p className='pb-3'>Solicita turno con nosotros para tramitar el Reprocann</p>
                        <LinkButton icon={<BsCalendarWeek/>} to="/turno" value="Solicitar Turno" />
                    </Card>
                </>
            } 

            </div>

            {(turnoPaciente.id > 0 && formSuccess == false && false) && 

            <div className="panel-info">
                <InfoCard text={"Completa el formulario de Reprocann para iniciar o renovar el tramite."} />
            </div>

            }


            <Card title={formSuccess ? 'Edita tus datos' : 'Completa tus datos'}>
                <p className='pb-3'>{formSuccess ? 'Modifica o actualiza tus datos en caso de que sea necesario' : 'Completa los datos necesarios para realizar tu tramite'}</p>
                <LinkButton icon={<FaWpforms/>}  disabled={turnoPaciente.id == 0} to="/formulario-1" value={"Formulario REPROCANN"} />
            </Card>
     
            {(turnoPaciente.id > 0 && formSuccess) && 
                <div className="panel-info">
                    <InfoCard text={"El dia del turno nos pondremos en contacto mediante whatsapp."}/>
                </div>
            }

            <div style={{display:"none"}} className="panel-contactanos-container">
                <Contacto/>
            </div>

           <div className='panel-button mx-auto p-3 text-center'>
                <button className="panel-cerrar-sesion" onClick={() => logout()} >Cerrar Sesión</button>
            </div>


            <div className="main-contacto">
                <Contacto bottom='90px'/>
            </div>

            <Nav/>
            
        </div>}
        </>
    )
}

export default Panel;