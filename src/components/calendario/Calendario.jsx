import {IoMdArrowDropright,IoMdArrowDropleft} from 'react-icons/io';
import './calendario.css';

function Calendario(props) {

    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

    return (
        <>
            <div className='calendario-header'>
                <button 
                    className="text-gray-600 font-bold text-md"
                    onClick={ props.restar }
                ><span><IoMdArrowDropleft/></span></button>
                <button className="text-gray-600 font-semibold">
                    { meses[props.mes - 1] } { props.anio }
                </button>
                <button 
                    className=" text-gray-600 font-bold text-md"
                    onClick={ props.sumar }
                ><span><IoMdArrowDropright/></span></button>
            </div>
            
            <div className='flex flex-row gap-1'>
                <Titulo dia="dom."/>
                <Titulo dia="lun."/>
                <Titulo dia="mar."/>
                <Titulo dia="mie."/>
                <Titulo dia="jue."/>
                <Titulo dia="vie."/>
                <Titulo dia="sab."/>
            </div>

            {props.calendario?.map(linea => (
                <span key={linea.key} className='flex flex-row gap-1 mb-2'>
                    {linea.linea?.map((dia,key)=> (
                        <FechaCalendario
                        id={key} 
                        select={dia.turnos ? props.select : ''} 
                        fecha={dia.fecha}
                        key={dia.key} 
                        dia={dia.dia} 
                        otroMes={!dia.enmes} 
                        disabled={!dia.activo } 
                        turnos={dia.turnos}
                        seleccionado={props.diaSeleccionado == dia.fecha}/>
                    ))}
                </span>
            ))}
        </>
    )
}

function FechaCalendario(props) {
    return (
        <>
            <div className='basis-2/12'>
                <button 
                    className={`${props.otroMes ? 'bg-gray-200' : ''}
                                ${props.disabled == true ? 'text-gray-400' : ' text-gray-500 '}  
                                ${props.turnos ? 'calendario-dia-disponible' : ''} 
                                ${props.seleccionado && 'calendario-dia-seleccionado'} 
                                font-semibold text-sm p-1 leading-6 calendario-dia w-9`}
                    onClick={() =>(props.select && props.turnos) && props.select(props.fecha)}
                >{props.dia}</button>
            </div>
        </>)
}

function Titulo(props) {
    return (
        <div className='basis-2/12 py-1'>
            <h4 className="text-center text-xs font-bold">{props.dia}</h4>
        </div>
    )
}

export default Calendario;