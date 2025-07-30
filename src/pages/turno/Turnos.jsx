import { useNavigate, useOutletContext } from 'react-router-dom';
import { ActionButton } from '../../components/Buttons';
import Calendario from '../../components/calendario/Calendario';
import { getPrestadores, getCalendario, /*getTurno,*/ getTurnos, excedeMargen } from '../../data/turnero';
import { useEffect,  useRef, useState } from 'react';
import {CustomSelect} from '../../components/select/Select';
import useTurno from '../../hooks/useTurno';
import Title from '../../components/title/title';
import Spinner from '../../components/Spinner';
import Contacto from '../../components/contacto/contacto';
import Card from '../../components/card/card';
import PagosService from '../../data/pagos';
import './turno.css';
import { set } from 'react-hook-form';

function Turnos() {
    const navigate = useNavigate();
    const { setTurno } = useTurno();
    const now = new Date();
    const botones = document.querySelectorAll("button");
    const [calendarioCargado,setCalendarioCargado] = useState(false);
    const [prestador, setPrestador] = useState(1);
    const [prestadores, setPrestadores] = useState([]);
    const [mes, SetMes] = useState(now.getMonth() + 1);
    const [anio, setAnio] = useState(now.getFullYear());
    const [turnoFecha, setTurnoFecha] = useState('');
    const [turnoHora, setTurnoHora] = useState('');
    const [datosCargados, setDatosCargados] = useState(false);
    const [turnoDesc, setTurnoDesc] = useState('');
    const [calendario, setCalendario] = useState([]);
    const [cargando, setCargando] = useState(0);
    const [cargandoTurno, setCargandoTurno] = useState(false);  //eslint-disable-line
    const [buttonSelected , setButtonSelected] = useState();
    const [turnos , setTurnos] = useState([]);
    const [diaSeleccionado, setDiaSeleccionado] = useState();
    const elementRef = useRef(null);
    const [ pagado, setPagado] = useState(false);
    const [pagoRegistrado, setPagoRegistrado] = useState();
    const [margenActualizado, setMargenActualizado] = useState(false);
    
    
    async function cargarPrestadores(){
        const response = await getPrestadores();
        setPrestadores(response);
        setPrestador(response[0].id);
        return response;
    }

    async function cargarCalendario(mes, anio, prestador){
        setCalendarioCargado(false);
        var mesCal = mes
        const resp = await excedeMargen(prestador);

        console.log(resp);
        if(resp.excede == 1 && !margenActualizado){
            SetMes(mes + 1);
            mesCal++;
            setMargenActualizado(true);
        } 
        const response = await getCalendario(mesCal, anio, prestador);
        setCalendario(response);
        setCalendarioCargado(true);
        setDatosCargados(true);
    }
    
    function prestadorSeleccionado(id){
        setPrestador(id);
        setCargando(cargando + 1);
    }

    function sumarMes(){
        if(mes == 12) setAnio(anio + 1);
        SetMes(mes == 12 ? 1 : mes + 1);
        setCargando(cargando + 1);
    }

    function restarMes(){
        if(mes == 1) setAnio(anio - 1);
        SetMes(mes == 1 ? 12: mes-1);
        setCargando(cargando + 1);
    }

    function cambiarCursor(estado){
       if(estado =="cargando"){
            document.body.style.cursor = "progres";
            botones.forEach((boton) => {
            boton.style.cursor = "progress";});
       }else{
            document.body.style.cursor = "default";
            botones.forEach((boton) => {
            boton.style.cursor = "pointer";});
       }
    }

    async function selectDia(dia){
        cambiarCursor("cargando");
        setCargandoTurno(true);
        const turnos_ = await getTurnos(dia,prestador);

        setTurnoDesc('');
        setTurnoHora('');
        setButtonSelected();

        setDiaSeleccionado(dia);
        setTurnos(turnos_);
        cambiarCursor("cargado");
        setCargandoTurno(false);

        setTimeout(() => {
            window.scroll({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        }, 3000);

    }

    function confirmarTurno(){
        let turnoObject = {
            prestador: prestador,
            fecha: turnoFecha,
            hora: turnoHora,
            detalle: turnoDesc
        }

        setTurno(turnoObject);
        localStorage.setItem('turno', JSON.stringify(turnoObject));

        if(pagado){
            navigate('/turno-conf');
        }else{
            navigate('/pagos');
        }
    }

    const seleccionarTurno = (button,turno) => {
        setButtonSelected(button);
        setTurnoFecha(turno.fecha);
        setTurnoHora(turno.hora);
        setTurnoDesc(turno.detalle);
            setTimeout(() => {
            window.scroll({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        }, 300);
    };

    const isSelectedClass = (button) => {
        if (buttonSelected == button){
            return 'turno-horario-selected';
        }else{
            return 'turno-horario';
        }
    }

    const subirScroll = () =>{
        window.scrollTo(0, 0);
    }

    
    const getPago = (email) => {
        PagosService.buscarPorEmail(email).then((resp)=>{
            setPagoRegistrado(resp);
            
            if(resp.utilizado === 0 && resp.verificado === 1){
                sessionStorage.setItem('pago',JSON.stringify(resp));
                setPagado(true);
            }
        });
    }

    useEffect(() => {
        if(sessionStorage.getItem('fromLogin') === 'true'){
            sessionStorage.removeItem('fromLogin');
        }

        getPago(sessionStorage.getItem('email'));
        subirScroll();
        cargarPrestadores().then((response)=>{
            if(prestador == 0){
                cargarCalendario(mes,anio,response[0].id)
            }else{
                cargarCalendario(mes,anio,prestador)
            }
          }
        );

    }, [])//eslint-disable-line

    useEffect(() => {
            if(prestador == 0){
                cargarCalendario(mes,anio,response[0].id)
            }else{
                cargarCalendario(mes,anio,prestador)
            }
    }, [mes])//eslint-disable-line

    return (
        <div className="turno-container page">

        { !datosCargados && <Spinner />}
        { datosCargados &&

        <div>
            <Title>Solicitar turno</Title>
            <div className="turno-content">
                <div className="turno-row">
                    <Card title='Seleccionar prestador' disabledBorder>
                        <div className="turno-selector">
                            <CustomSelect
                                id="prestador" 
                                datos={prestadores}
                                value={1}
                                placeholder='Seleccione un prestador' 
                                onChange={(event) => prestadorSeleccionado(event.target.value)}
                                responsive
                            />
                        </div>
                    </Card>

                    <Card title='Seleccionar día' disabledBorder>
                        {/*<h6 className="text-green-500 font-semibold text-xs ps-3">En color verde los días disponibles</h6>*/}
                        { !calendarioCargado && <div className="calendario-spinner-contenedor"> <Spinner/> </div>}
                        { calendarioCargado &&
                        
                        <Calendario 
                            calendario={ calendario } 
                            mes={ mes } 
                            anio={ anio } 
                            sumar={ () => sumarMes() } 
                            restar={ () => restarMes() }
                            select={ (fecha) => selectDia(fecha) } 
                            diaSeleccionado = { diaSeleccionado }
                        /> 
                        }

                    </Card>

                    </div>
                    <div className="turno-row">
                        <div className="turno-row-hours">

                            {turnos.length == 0 && <p className="turno-row-msj display-pc">No has seleccionado una fecha.</p>} 
                            <Card show={turnos.length > 0} title='Seleccionar horario' disabledBorder>
                                <div className="turno-horarios-container">
                                    {turnos?.map((turno, key) => (
                                        (turno?.hora && turno.hora !== '00:00') && (
                                        <button 
                                            key={key} 
                                            onClick={() => seleccionarTurno(key, turno)} 
                                            className={isSelectedClass(key)}
                                        >
                                            {turno.hora} hs
                                        </button>
                                        )
                                    ))}
                                </div>
                            </Card>
                            <Card show={turnoDesc !=''} ref={elementRef} title='Detalles del turno' disabledBorder animate>
                                <p className='turno-detalles-text'>{ turnoDesc }</p>
                            </Card>
                        </div>

                        <div className='pt-4' style={turnoDesc == '' ? {opacity:'20%'}:{}}>
                            <ActionButton onClick={() => turnoDesc != '' ? confirmarTurno() : {}} value="Continuar" />
                        </div>

                        <div className='mx-auto p-3 text-center'>
                            <button className='text-gray-500' onClick={() => navigate('/panel')}>Volver</button>
                        </div>

                    </div>
                </div>
            </div>
            }

            <div className="turno-contacto">
                <Contacto/>
            </div>
        </div>
    )
}

export default Turnos;