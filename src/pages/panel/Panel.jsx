//import logo from '../assets/logo-doconline-500.png';
//import DataBox from '../components/DataBox';
import { LinkButton, MiniActionButtonRed } from '../../components/Buttons';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { perfil, descargarFormulario, getTurnoPaciente } from '../../data/pacientes';
import { cancelarTurno } from '../../data/turnero';
import { useEffect, useState } from 'react';
import useForm from '../../hooks/useForm';
import Spinner from '../../components/Spinner';
import './panel.css';
import Info from '../../components/info/info';
import { BsCalendarWeek } from "react-icons/bs";
import { FaWpforms } from "react-icons/fa";
import Contacto from '../../components/contacto/contacto';
import Nav from '../../components/nav/nav';
import {GrFormNext } from "react-icons/gr";
import { IoIosCheckmarkCircle } from "react-icons/io";


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
        setDatosCargados(true);
        alert(user.userId)
    }

    async function cancelarMiTurno() {
        const response = await cancelarTurno(user.userId)
        setTurnoPaciente(response)
    }

    useEffect(() => {
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
        {!DatosCargados && <Spinner />}

        {DatosCargados &&
        <div className='panel-container'>


            <h2 className="panel-titulo">Hola, {paciente.nombre}<span className='panel-titulo-icon'><GrFormNext style={{display:"inline",opacity:"70%"}}/></span></h2>

            <div className="panel-description">
                <h3 className="panel-description-subtitle">Tramitá tu reprocann</h3>
                <p className="panel-description-text">Facil y seguro sin moverte de tu casa.</p>
            </div>

            <p className="panel-doctor">Dr. Joaquin Joazmi</p>
            <hr className='panel-separador solid border-input border-1 my-3'></hr>
{/*  */}
            <div className="turnos-container">
                
            {turnoPaciente.id > 0 ?
            
            <>

                    <div className="panel-turno-container">
                        <h3 className="panel-turno-titulo">
                            <span className='panel-turno-icon'><IoIosCheckmarkCircle/></span> 
                            Turno confirmado
                        </h3> 
                        <p className="panel-turno-texto">{turnoPaciente.detalle}</p>
                        <div className='flex flex-row-reverse pt-1'>
                            <MiniActionButtonRed onClick={() => cancelarMiTurno()} value="Cancelar" />
                        </div>
                    </div>

                </>
                :
                <> 

                    <div className="panel-info">
                        <Info text={"Solicita un turno con nosotros y a continuación completa el formulario de Reprocann."}/>
                    </div>

                    <div className='pt-4 pb-6'><LinkButton icon={<BsCalendarWeek/>} to="/turno" value="Solicitar Turno" /></div>
             
                </>
            } 

            </div>

            { turnoPaciente.id > 0 && 

            <div className="panel-info">
                <Info text={"Completa el formulario de Reprocann para iniciar o renovar el tramite."}/>
            </div>

            }

            <div className='pt-1 pb-0'><LinkButton icon={<FaWpforms/>} success={formSuccess} disabled={turnoPaciente.id == 0} to="/formulario-1" value={"Formulario REPROCANN"} /></div>

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