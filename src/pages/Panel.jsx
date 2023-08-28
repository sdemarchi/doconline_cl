import logo from '../assets/logo-doconline-500.png';
import DataBox from '../components/DataBox';
import { LinkButton, MiniActionButtonRed } from '../components/Buttons';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { perfil, descargarFormulario, getTurnoPaciente } from '../data/pacientes';
import { cancelarTurno } from '../data/turnero';
import { useEffect, useState } from 'react';
import useForm from '../hooks/useForm';
import '../global-styles/panel-styles.css';
import Spinner from '../components/Spinner';

function Panel() {

    const user = useOutletContext();

    const navigate = useNavigate();

    const [paciente, setPaciente] = useState({});
    const [cargando] = useState(0);
    const [DatosCargados, setDatosCargados] = useState(false);
    const [turnoPaciente, setTurnoPaciente] = useState({});

    const {/* setFormCargado,*/ llenarFormulario } = useForm();

    async function cargarTurnoPaciente() {
        const response = await getTurnoPaciente(user.userId);
        setTurnoPaciente(response);
    }

    async function cancelarMiTurno() {
        const response = await cancelarTurno(user.userId)
        setTurnoPaciente(response)
    }

    useEffect(() => {
        async function getPaciente() {
            const response = await perfil(user.userId);
            setPaciente(response);
            setDatosCargados(true);
            const response2 = await descargarFormulario(response.dni);
            if(response2.error.code == 0){
                //setFormCargado(response2.data)
                setDatosCargados(true);
                llenarFormulario(response2.data, response2.patologias);

            }
        }
        getPaciente();
        cargarTurnoPaciente()
    }, [])

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
            <img className="panel-logo mx-auto w-50" src={logo}></img>
            <div className='mb-3 mx-auto text-center'>
                <span className='font-semibold text-gray-500'>Perfil / Paciente</span>
            </div>
            <div className='flex flex-row'>
                <div className='basis-1/2 pe-1'>
                    <DataBox label="Nombre y Apellido" value={paciente.nombre} />
                </div>
                <div className='basis-1/2 ps-1'>
                    <DataBox label="DNI" value={paciente.dni} />
                </div>
            </div>
            <div className='flex flex-row'>
                <div className='basis-1/2 pe-1'>
                    <DataBox label="Fecha de Nacimiento" value={paciente.fecha_nac} />
                </div>
                <div className='basis-1/2 ps-1'>
                    <DataBox label="Teléfono" value={paciente.telefono} />
                </div>
            </div>

     
            <DataBox label="E-Mail" value={paciente.email} />

            <hr className='panel-separador solid border-input border-1 my-4'></hr>
{/*  */}
            <div className="turnos-container">
            <h6 className="text-gray-500 text-sm font-semibold leading-3">Mis Turnos</h6>
            {turnoPaciente.id > 0 ?
                <>
                    <div className="block w-full mt-3 p-1 border-input focus:border-input border-2 text-center rounded-md">
                        <h4 className="text-gray-500 text-sm font-bold pt-1">{turnoPaciente.detalle}</h4>
                        <div className='flex flex-row-reverse pt-1'>
                            <MiniActionButtonRed onClick={() => cancelarMiTurno()} value="Cancelar" />
                        </div>
                    </div>
                </>
                :
                <>
                    <h6 className='text-gray-500 text-xs font-semibold px-10 py-3'>No tienes turnos pendientes</h6>
                    <div className='panel-button pt-4'><LinkButton to="/turno" value="Solicitar Turno" /></div>
                    
                </>


            }
            </div>
   
            <div className='pt-4'><LinkButton to="/formulario-1" value="Formulario REPROCANN" /></div>
            <div className='panel-button mx-auto p-3 text-center'>
                <button className='text-red-700' onClick={() => logout()} >Cerrar Sesión</button>
            </div>
        </div>}
        </>
    )
}

export default Panel