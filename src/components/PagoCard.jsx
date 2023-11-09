import { ActionButton } from "./Buttons";
import { useEffect , useState } from 'react';

function PagoCard(props) {
    const [precioFinal , setPrecioFinal] = useState();

    const calcularPrecioFinal = () => {
        setPrecioFinal(props.importe);
        if(props.descuentoPorc){
            let precioFinal_ = props.importe - props.importe * (props.descuentoPorc / 100);
            setPrecioFinal(precioFinal_);
        }
    }

    useEffect(() => {
        calcularPrecioFinal();
    },[props.importe,props.descuentoPorc,props.descuento]); //eslint-disable-line

    return (
        <div className="block w-full my-3 p-2 border-input focus:border-input border-2 text-center ">


            <h4 className="text-gray-500 font-bold pt-1">{props.medio}</h4>

            {precioFinal !== props.importe && <h3 className="text-gray-400 font-semibold text-2xl pt-2" style={{textDecoration:'line-through'}}>${props.importe}</h3>}
            <h1 className="text-gray-500 font-semibold text-5xl pt-2">${precioFinal}</h1>



            {/* ------------ MENSAJE DESCUENTO ------------ */}

            {props.descuento ? 
                <h4 className="text-green-500 font-bold pt-2 text-xs leading-5">Descuento de ${props.descuento} aplicado</h4>
                :
            ''}
            {
                (props.descuentoPorc) ?
                <h4 className="text-green-500 font-bold pt-2 text-xs leading-5">Descuento del {props.descuentoPorc}% aplicado</h4>
                :
            ''
            }


            <h4 className="text-gray-500 pt-2 leading-5">{props.mensaje}</h4>
            <div className="px-6 py-2"><ActionButton onClick={() => props.onClick(precioFinal)} value="Ir a Pagar" /></div>
            
            
        </div>
    )
}

export default PagoCard;