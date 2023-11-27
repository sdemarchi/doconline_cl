import { useNavigate, useOutletContext } from 'react-router-dom';
//import logo from '../assets/logo-doconline-reprocann-500.png';
import { ActionButton } from '../../components/Buttons';
import Calendario from '../../components/calendario/Calendario';
import { getPrestadores, getCalendario, /*getTurno,*/ getTurnos, excedeMargen } from '../../data/turnero';
import { useEffect,  useRef, useState } from 'react';
import Select from '../../components/Select';
import useTurno from '../../hooks/useTurno';
import Spinner from '../../components/Spinner';
import Contacto from '../../components/contacto/contacto';
import Card from '../../components/card/card';
import './turno.css';

function Turnos() {
    const navigate = useNavigate();
    const { setTurno } = useTurno();
    const user = useOutletContext(); //eslint-disable-line
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
    const [descuento , setDescuento] = useState(); //eslint-disable-line
    const elementRef = useRef(null);
    
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
        if(resp.excede == 1){
            SetMes(mes + 1);
            mesCal++;
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
            document.body.style.cursor = "progress";
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
        /*const turno = await getTurno(dia, prestador);*/
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
        sessionStorage.setItem('turno', JSON.stringify(turnoObject));
        navigate('/pagos');
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


    useEffect(() => {
        if(sessionStorage.getItem('fromLogin') == 'true'){
            sessionStorage.removeItem('fromLogin');
        }

        subirScroll();
        cargarPrestadores().then((response)=>{
            if(prestador == 0){
                cargarCalendario(mes,anio,response[0].id)
            }else{
                cargarCalendario(mes,anio,prestador)
            }
          }
        );
    }, [cargando])//eslint-disable-line

    return (
        <div className="turno-container">

        { !datosCargados && <Spinner />}
        { datosCargados &&

        <div className="turnos-container">
            <div className='text-center' style={{textAlign:'center', paddingBottom:'15px'}}>
              <h2 className="black-title">Solicitar turno</h2>
            </div>

            {/*<img className="mx-auto mb-8 w-52 pb-2" src={logo}></img>*/}

            <Card title='Seleccionar prestador'>
                <div className="turno-selector">
                    <Select
                        id="prestador" 
                        datos={prestadores}
                        value={1}
                        placeholder='Seleccione un prestador' 
                        onChange={(event) => prestadorSeleccionado(event.target.value)}
                    />
                </div>
            </Card>

            {/*<div className="turno-selector">
                <Select 
                    label="Seleccionar Prestador" 
                    id="prestador" 
                    datos={prestadores}
                    value={1}
                    placeholder='Seleccione un prestador' 
                    onChange={(event) => prestadorSeleccionado(event.target.value)}
                />
            </div>*/}

            <Card title='Seleccionar día'>
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

            {turnos.length > 0 &&
               <Card title='Seleccionar horario'>
                    <div className="turno-horarios-container">
                        {turnos.map( (turno,key) => (
                        turno.hora !== '00:00' && <button key={key} onClick={()=>seleccionarTurno(key,turno)} className={isSelectedClass(key)}>{turno.hora} hs</button>
                        ))}
                    </div>
                </Card>
            }


                { turnoDesc && <Card ref={elementRef} title='Detalles del turno' animate>
                    <p className='turno-detalles-text'>{ turnoDesc }</p>
                </Card>}

            {/*<h6 className="input-label mt-5">Confirmar Turno</h6>
            {!cargandoTurno ? 
            <>
            <textarea disabled
                className="block w-full p-1 my-1 border-input focus:border-input border-2 text-xs text-gray-500"
                value={ turnoDesc }
            ></textarea> 
            </>
            : <div style={{height:"52px",width:"100%",display:"flex",color:"#4E4E4E",alignItems:"center",justifyContent:"center"}}>Cargando...</div>
            }*/}

            <div className='pt-4'>

                <ActionButton 
                    onClick={() => turnoDesc != '' ? confirmarTurno() : {}} 
                    value="Continuar" 
                />

            </div>
            <div className='mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/panel')} >Volver</button>
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