function Calendario(props) {

    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    return (
        <>
            <div className='flex flex-row py-2'>
                <div className='basis-2/12'>
                    <button 
                        className="border-gray-400 text-gray-600 font-bold text-md border w-full p-1 rounded-md"
                        onClick={ props.restar }
                    >&lt;</button>
                </div>
                <div className='flex-auto px-1'>
                    <button className="border-gray-400 text-gray-600 font-semibold text-md border w-full p-1 rounded-md">
                        { meses[props.mes - 1] } { props.anio }
                    </button>
                </div>
                <div className='basis-2/12'>
                    <button 
                        className="border-gray-400 text-gray-600 font-bold text-md border w-full p-1 rounded-md"
                        onClick={ props.sumar }
                    >&gt;</button>
                </div>
            </div>
            <div className='flex flex-row gap-1'>
                <Titulo dia="dom." />
                <Titulo dia="lun." />
                <Titulo dia="mar." />
                <Titulo dia="mie." />
                <Titulo dia="jue." />
                <Titulo dia="vie." />
                <Titulo dia="sab." />
            </div>

            {props.calendario.map(linea => (
                <div key={linea.key} className='flex flex-row gap-1 mb-1'>
                    {linea.linea.map(dia => (
                        <FechaCalendario 
                            select={dia.turnos ? props.select : ''} 
                            fecha={dia.fecha}
                            key={dia.key} 
                            dia={dia.dia} 
                            otroMes={!dia.enmes} 
                            disabled={!dia.activo} 
                            turnos={dia.turnos} />
                    ))}
                </div>

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
                                ${props.disabled ? 'text-gray-400' : ' text-gray-500 '}  
                                ${props.turnos ? 'bg-green-500 border-green-500 text-white' : ''} 
                                $border-gray-400 font-semibold text-sm border-2 p-1 leading-6 rounded-md w-9`}
                    onClick={() => props.select(props.fecha)}
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

export default Calendario