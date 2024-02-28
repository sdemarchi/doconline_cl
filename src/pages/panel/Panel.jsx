import { LinkButton, MiniActionButtonRed } from '../../components/Buttons';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { perfil, descargarFormulario, getTurnoPaciente } from '../../data/pacientes';
import { getGrowByEmail } from '../../data/grows';
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
import LinkCard from '../../components/link-card/link-card';
import ColorCard from '../../components/color-card/color-card';
import PagosService from '../../data/pagos';
import NotificacionEmergente from '../../components/notificacion-emergente/notificacion-emergente';

function Panel() {
    const user = useOutletContext();
    const navigate = useNavigate();
    const [paciente, setPaciente] = useState({});

    const [datosCargados, setDatosCargados] = useState(false);
    const [pacienteCargado, setPacienteCargado] = useState(false);
    const [growCargado, setGrowCargado] = useState(false); // eslint-disable-line
    const [pagoCargado, setPagoCargado] = useState(false);
    const [pagoRegaladoCargado, setPagoRegaladoCargado] = useState(false);

    const [turnoPaciente, setTurnoPaciente] = useState({});
    const [growAdmin, setGrowAdmin] = useState();
    const {setFormCargado, llenarFormulario } = useForm(); // eslint-disable-line
    const [ formSuccess, setFormSuccess ] = useState();
    const fromLogin = sessionStorage.getItem('fromLogin') || false;

    const [ pagoRegalado , setPagoRegalado] = useState();
    const [ pago , setPago ] = useState();

    const [ mostrarNotificacion, setMostrarNotificacion ] = useState();
    const [ notificacionGrow, setNotificacionGrow ] = useState();


    async function cargarTurnoPaciente() {
        const response = await getTurnoPaciente(user.userId);
        setTurnoPaciente(response);
        setPacienteCargado(true);
    }

    async function cancelarMiTurno() {
        const response = await cancelarTurno(user.userId);
        setMostrarNotificacion(true);
   
        PagosService.setUtilizado(pago.id,false).then((resp) => {
            console.log(resp);
      
            setPago({...pago, utilizado:0});
            console.log(pago);
        });
        setTurnoPaciente(response);
    }

    const subirScroll = () =>{
        window.scrollTo(0, 0);
    }

    const getGrow = async (email) => {
        getGrowByEmail(email).then((resp)=>{
            setGrowCargado(true);
            sessionStorage.setItem('user-grow',JSON.stringify(resp) || 0);
            sessionStorage.setItem('user-grow-id',JSON.stringify(resp));

            if(!sessionStorage.getItem('growId') && resp.idgrow){
                sessionStorage.setItem('growId',resp.idgrow);
            }

            cargarTurnoPaciente();

            setGrowAdmin(resp).then((response)=>{
                setPago(response);
            });

           });;
    }

    async function getPaciente() {
        perfil(user.userId).then((response)=>{
            setPaciente(response);
            sessionStorage.setItem('user_data', JSON.stringify(response));

            if(sessionStorage.getItem('user-grow-id') === null){
               getGrow(response.email);
            }else{
                setGrowAdmin(JSON.parse(sessionStorage.getItem('user-grow')));
                cargarTurnoPaciente();
                setGrowCargado(true);
            }

            descargarFormulario(response.dni).then((resp)=>{
    
                if(resp.error?.code == 0){
                    llenarFormulario(resp.data, resp.patologias);
                    if(resp.data){
                        setFormSuccess(true);
                      
                    }
                }
            });

            PagosService.buscarPorEmail(response.email).then((resp)=>{
                setPago(resp);
                setPagoCargado(true);
            });

            PagosService.ultimoRegalado(response.id).then((resp)=>{
                setPagoRegalado(resp);
                setPagoRegaladoCargado(true);
            });
        }); 
    }

    useEffect(() => {
        subirScroll();
        getPaciente();
        
       // setFormSuccess(JSON.parse(sessionStorage.getItem('form-success')) || false);
        
        if(sessionStorage.getItem('grow-success')){
            sessionStorage.removeItem('grow-success');
            setNotificacionGrow(true);
        }
    },[]) //eslint-disable-line

    useEffect(()=>{
        const cargado = pagoCargado && growCargado && pacienteCargado && pagoRegaladoCargado;
        setDatosCargados(cargado);

  },[pagoCargado,growCargado,pacienteCargado,pagoRegaladoCargado]);

    useEffect(() => {
        const datosCargados_ = growCargado === true && pacienteCargado === true;

        if(growAdmin?.idgrow && datosCargados_ === true && fromLogin == 'true'){
            sessionStorage.setItem('fromLogin',false);
            return navigate('/tu-grow/'+growAdmin?.idgrow );
        }else if(turnoPaciente?.id == 0 && fromLogin == 'true' && !growAdmin?.idgrow && datosCargados_ === true){
            return navigate('/turno');
        };
    },[growCargado,pacienteCargado]) //eslint-disable-line

    function logout() {
        localStorage.clear();
        sessionStorage.clear();
        return navigate('/login');
    }

    return (
        <>
        {datosCargados?

        <div className='panel-container page' >
            <div className="display-pc panel-bienvenido-container">
                <div className="panel-bienvenido-pc">
                    <div className="panel-description">
                        <h2>Hola, {paciente.nombre}!</h2>
                        <p>Tramitá tu Reprocann</p>
                        <p>facil, seguro y sin moverte</p>
                        <p>de tu casa.</p>
                        {!(turnoPaciente.id > 0) && <button onClick={()=>navigate('/turno')}>Solicitar Turno</button>}
                        {turnoPaciente.id > 0 && <button onClick={()=>navigate('/formulario-1')}>Completa tus datos</button>}
                    </div>
                </div>
            </div>

            <div className="panel-content">

                <Card onlyCel responsive>
                    <h2 className="panel-titulo">Hola, {paciente.nombre}<span className='panel-titulo-icon'>
                    <GrFormNext style={{display:"inline",opacity:"70%"}}/></span></h2>
                    <div className="panel-description">
                        <h3 className="panel-description-subtitle">Tramitá tu Reprocann</h3>
                        <p className="panel-description-text">Fácil, seguro y sin moverte de tu casa.</p>
                    </div>
                </Card>


                <ColorCard show={pago?.utilizado === 0 && pago?.verificado === 1} title="Tus pagos" color1="#009FD2" color2="#CE9CEE" color='white' animate onlyPc>
                    <p class="mt-1">Tenés un pago a tu favor. Podes usarlo en tu próximo turno.</p>
                </ColorCard> 

    

                <ColorCard show={turnoPaciente.id > 0} color1="#009FD2" color2="#34D29D">
                    <div className='panel-turno-head'>
                        <h3 className="panel-turno-titulo">Turno confirmado</h3> 
                        <button className="panel-cancelar" onClick={() => cancelarMiTurno()}>x</button>
                    </div>
                    <p className="panel-turno-texto">{turnoPaciente.detalle}</p>
                </ColorCard>

                {(turnoPaciente.id > 0 && formSuccess !== true && false) && 
                    <div className=" display-pc">
                        <InfoCard text={"No olvides completar el formulario con tus datos para poder realizar el tramite."}/>
                    </div>
                }

      
                <LinkCard to={'/turno'} show={!(turnoPaciente.id > 0 )} title="Solicitar turno" onlyPc responsive>
                    <p className='pb-3'>Solicita turno con nosotros para tramitar tu Reprocann</p>
                </LinkCard>

                <LinkCard to="/formulario-1" title={formSuccess ? 'Edita tus datos' : 'Completa tus datos'}  onlyPc responsive>
                    <p className='pb-3'>{formSuccess ? 'Modifica o actualiza tus datos en caso de que sea necesario' : 'Completa los datos necesarios para realizar tu tramite'}</p>
                </LinkCard>
        

                <LinkCard show={growAdmin?.idgrow !== undefined} title="Tu Grow" to={'/tu-grow/'+growAdmin?.idgrow} responsive>
                    <p>Tenés un Grow vinculado a tu correo electronico.</p>
                </LinkCard>

                <LinkCard title="Regalar a un amigo" to={'/regalar-a-un-amigo'}  responsive>
                    { pagoRegalado?.utilizado === 0 ?
                    <div>
                        <p>Pagaste a nombre de {pagoRegalado?.nombre_paciente}</p>
                        <div style={{marginTop:'10px',borderRadius:'8px',backgroundColor:'#E5E5E5',width:'fit-content',padding:'2px 8px',marginBottom:'0'}}>
                            {pagoRegalado?.codigo}
                        </div>
                    </div>
                    : <p>Paga el tramite a un amigo o conocido.</p>
                    }
                </LinkCard>


                <ColorCard show={pago?.utilizado === 0 && pago?.verificado === 1} title="Tus pagos" color1="#009FD2" color2="#CE9CEE" color='white' animate onlyCel responsive>
                    <p class="mt-1">Tenés un pago a tu favor. Podes usarlo en tu próximo turno.</p>
                </ColorCard>
                    
          
                <Card show={!(turnoPaciente.id > 0 )} title="Solicitar turno" onlyCel>
                    <p className='pb-3'>Solicita turno con nosotros para tramitar tu Reprocann</p>
                    <LinkButton icon={<BsCalendarWeek/>} to="/turno" value="Solicitar Turno" />
                </Card>

        
                {(turnoPaciente.id > 0 && formSuccess == false && false) && 
                    <div className="panel-info">
                        <InfoCard text={"Completa el formulario de Reprocann para iniciar o renovar el tramite."} />
                    </div>
                }


                <Card title={formSuccess ? 'Edita tus datos' : 'Completa tus datos'}  onlyCel>
                    <p className='pb-3'>{formSuccess ? 'Modifica o actualiza tus datos en caso de que sea necesario' : 'Completa los datos necesarios para realizar tu tramite'}</p>
                    <LinkButton icon={<FaWpforms/>} disabled={turnoPaciente.id == 0} to="/formulario-1" value={"Formulario REPROCANN"} />
                </Card>

        
                {(turnoPaciente.id > 0 && formSuccess) && 
                    <div className="panel-info display-cel">
                        <InfoCard text={"El dia del turno nos pondremos en contacto mediante WhatsApp."}/>
                    </div>
                }

                {(!growAdmin?.idgrow) && 
                    <LinkCard title='Registra tu Grow' to={'/registrar-grow'}  responsive>
                        <p>Recomienda el servicio a clientes que necesiten realizar el tramite.</p>
                    </LinkCard>
                }

                <div style={{display:"none"}} className="panel-contactanos-container">
                    <Contacto/>
                </div>

                <div className='panel-button mx-auto p-3 text-center'>
                    <button className="panel-cerrar-sesion display-cel" onClick={() => logout()} >Cerrar Sesión</button>
                </div>

                <NotificacionEmergente show={mostrarNotificacion} setShow={setMostrarNotificacion} text="Tu turno ha sido cancelado" />
                <NotificacionEmergente show={notificacionGrow} setShow={setNotificacionGrow} text="Grow registrado correctamente" />

            { !growAdmin?.idgrow &&  <div className="main-contacto display-cel">
                    <Contacto bottom='90px'/>
                </div>}    
            </div>    
        </div>:
        <div className=' page'> <Spinner /></div>
        }
        {growAdmin?.idgrow && 
            <div style={{minHeight:'50px'}}>
               <Nav idgrow={growAdmin?.idgrow}/>
            </div>}
        </>
    )
}

export default Panel;