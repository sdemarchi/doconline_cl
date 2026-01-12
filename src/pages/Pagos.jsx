import { ActionButton } from '../components/Buttons'
import PagoCard from '../components/PagoCard'
import { FormInputState } from '../components/FormInput'
import { useNavigate  } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useTurno from '../hooks/useTurno'
import useAuth from '../hooks/useAuth'
import { getPrecios } from '../data/turnero'
import Alerta from '../components/Alerta'
import { aplicarCupon } from '../data/turnero'
import Chip from '../components/Chip'

function Pagos() {

    const { /*turno,*/ cuponValidado, setCuponValidado } = useTurno()
    const { setImporte } = useAuth()

    const navigate = useNavigate()

    const [ precioTrans, setPrecioTrans] = useState(0)
    const [ precioMP, setPrecioMP] = useState(0)
    const [ cupon, setCupon ] = useState('')
    const [ importeCupon, setImporteCupon ] = useState(0)
    const [ cargando ] = useState(0)
    const [alerta, setAlerta] = useState({})

    async function cargarPrecios(){
        const response = await getPrecios()
        setPrecioTrans(response.precioTransf)
        setPrecioMP(response.precioMP)
    }

    async function validarCupon(){
        const response = await aplicarCupon(cupon)
        if(response.valido){
            setImporteCupon(response.descuento)
            setPrecioMP(precioMP - response.descuento)
            setPrecioTrans(precioTrans - response.descuento)
            setCuponValidado({cupon: cupon, importe:response.descuento  })
        } else {
            setAlerta({
                msg: 'El cupón ingresado no es válido',
                error: true
            })
        }
    }

    async function quitarCupon(){
        setImporteCupon(0)
        setCuponValidado({cupon: '', importe:0})
        cargarPrecios()
    }

    useEffect(() => {
        cargarPrecios()
        console.log(cuponValidado)
        setCupon(cuponValidado.cupon)
        setImporteCupon(cuponValidado.importe)
        setPrecioMP(precioMP - cuponValidado.importe)
        setPrecioTrans(precioTrans - cuponValidado.importe)
            
    }, [cargando])

    const { msg } = alerta
    
    function pagar(){
        setImporte(precioTrans)
        return navigate('/pagoTransf')
    }
        
    return (
        <>
            {msg && <Alerta alerta={ alerta } />}
            
            
            <div className='mb-3 mx-auto text-center'>
                <span className='font-semibold text-gray-500'>SELECCIONAR FORMA DE PAGO</span>
            </div>
            { cuponValidado.cupon ?
                <>
                    <h6 className="text-gray-500 text-xs mb-2 font-semibold leading-3">Cupón Aplicado:</h6>
                    <Chip value={cupon} onClick={ () => quitarCupon() } />
                </>
            :
            <>
                <FormInputState 
                    id="turno"
                    label="Cupón Descuento" 
                    value={cupon}
                    onChange={ e => setCupon(e.target.value)}
                    placeholder="A-123456"
                /> 
                <div className='py-2'>
                    <ActionButton onClick={() => cupon && validarCupon()} value="Aplicar Cupón" />
                </div>
            </>
            }

            <PagoCard medio="TRANSFERENCIA" 
                importe={precioTrans} 
                descuento={importeCupon}
                mensaje="Desde cualquier banco físico o virtual" 
                onClick={ () => pagar() } />
            
            <div className='mb-0 mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/turno')} >Atrás</button>
            </div>
            
        </>
    )
}

export default Pagos