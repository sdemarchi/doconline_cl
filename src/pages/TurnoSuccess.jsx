import logo from '../assets/logo-doconline-vert.png'
import icon from '../assets/icon-success.png'
import { SubmitButton, LinkButton } from '../components/Buttons'
import useTurno from '../hooks/useTurno'

function TurnoSuccess() {

    const { turno } = useTurno()

    return (
        <>
            <img className="mx-auto w-20 pb-8" src={logo}></img>
            <h1 className='text-xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-grad-green to-grad-blue'>FELICITACIONES<br />TURNO CONFIRMADO</h1>
            <img className="mx-auto w-14 pt-8" src={icon}></img>
            <div className="block w-full my-8 p-1 border-input focus:border-input border-2 text-center rounded-md ">
                <h4 className="text-gray-500 text-sm font-bold pt-1">{turno.detalle}</h4>
            </div>

            <div className='pb-2'><LinkButton to="/panel" value="Volver al Perfil" /></div>


        </>
    )
}

export default TurnoSuccess