import { useNavigate, useOutletContext } from 'react-router-dom';
import logo from '../assets/logo-doconline-reprocann-500.png';
import { ActionButton } from '../components/Buttons';
import Calendario from '../components/Calendario';
import { getPrestadores, getCalendario, getTurno } from '../data/turnero';
import { useEffect, useState } from 'react';
import Select from '../components/Select';
import useTurno from '../hooks/useTurno';
import Spinner from '../components/Spinner';

function Turnos() {

    const navigate = useNavigate();
    
    const { setTurno } = useTurno();
    const user = useOutletContext();
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
    const [cargandoTurno, setCargandoTurno] = useState(false);

    
    
    async function cargarPrestadores(){
        const response = await getPrestadores();
        setPrestadores(response);
        setPrestador(response[0].id);
        return response;
    }

    
    async function cargarCalendario(mes, anio, prestador){
        setCalendarioCargado(false);
        const response = await getCalendario(mes, anio, prestador);
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

        const turno = await getTurno(dia, prestador);
        setTurnoFecha(turno.fecha);
        setTurnoHora(turno.hora);
        setTurnoDesc(turno.detalle);

        cambiarCursor("cargado");
        setCargandoTurno(false);
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

    useEffect(() => {
        cargarPrestadores().then((response)=>{
            if(prestador == 0){
                cargarCalendario(mes,anio,response[0].id)
            }else{
                cargarCalendario(mes,anio,prestador)
            }
         }
        );
    }, [cargando])

    return (
        <>
        { !datosCargados && <Spinner />}
        { datosCargados &&
        <div className="turnos-container">
            <img className="mx-auto mb-8 w-52 pb-2" src={logo}></img>
            
            <Select 
                label="Seleccionar Prestador" 
                id="prestador" 
                datos={prestadores}
                value={1}
                placeholder='Seleccione un prestador' 
                onChange={(event) => prestadorSeleccionado(event.target.value)}
            />
            <h6 className="text-gray-500 text-xs font-semibold pt-2">Seleccionar el Día</h6>
            <h6 className="text-green-500 font-semibold text-xs ps-3">En color verde los días disponibles</h6>
            { !calendarioCargado && <div className="calendario-spinner-contenedor"> <Spinner/> </div>}
            { calendarioCargado &&
            <Calendario 
                calendario={ calendario } 
                mes={ mes } 
                anio={ anio } 
                sumar={ () => sumarMes() } 
                restar={ () => restarMes() }
                select={ (fecha) => selectDia(fecha) } 
            /> 
            }
            <h6 className="text-gray-500 text-xs font-semibold pt-2">Confirmar Turno</h6>
            {!cargandoTurno ? 
            <>
            <textarea disabled
            className="block w-full p-1 my-1 border-input focus:border-input border-2 text-xs text-gray-500"
            value={ turnoDesc }
            ></textarea> 
            </>
            : <div style={{height:"52px",width:"100%",display:"flex",color:"#4E4E4E",alignItems:"center",justifyContent:"center"}}>Cargando...</div>
            }
            <div className='pt-4'>
                <ActionButton 
                    onClick={() => turnoDesc != '' ? confirmarTurno() : {}} 
                    value="Confirmar" 
                />
            </div>
            <div className='mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/panel')} >Volver</button>
            </div>

            </div>
            }
        </>
    )
}

export default Turnos;