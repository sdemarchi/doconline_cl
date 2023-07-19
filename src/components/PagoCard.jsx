import { ActionButton } from "./Buttons"

function PagoCard(props) {
    return (
        <div className="block w-full my-3 p-2 border-input focus:border-input border-2 text-center ">
            <h4 className="text-gray-500 font-bold pt-1">{props.medio}</h4>
            <h1 className="text-gray-500 font-semibold text-5xl pt-2">${props.importe}</h1>
            {props.descuento ? 
                <h4 className="text-green-500 font-bold pt-2 text-xs leading-5">Descuento de ${props.descuento} aplicado</h4>
                :
            ''}
            <h4 className="text-gray-500 pt-2 leading-5">{props.mensaje}</h4>
            <div className="px-6 py-2"><ActionButton onClick={props.onClick} value="Ir a Pagar" /></div>
            
            
        </div>
    )
}

export default PagoCard