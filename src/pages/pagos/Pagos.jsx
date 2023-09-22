import { ActionButton } from '../../components/Buttons';
import PagoCard from '../../components/PagoCard';
import { FormInputState } from '../../components/FormInput';
import { useNavigate  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useTurno from '../../hooks/useTurno';
import useAuth from '../../hooks/useAuth';
import { getPrecios } from '../../data/turnero';
import Alerta from '../../components/Alerta';
import { aplicarCupon } from '../../data/turnero';
import Chip from '../../components/Chip';
import Spinner from '../../components/Spinner';
import Contacto from '../../components/contacto/contacto';
import './pagos.css';

function Pagos() {

    const {/* turno,*/ cuponValidado, setCuponValidado } = useTurno();
    const { setImporte } = useAuth();

    const navigate = useNavigate();

    const [ precioTrans, setPrecioTrans ] = useState(0);
    const [ precioMP, setPrecioMP ] = useState(0);
    const [ cupon, setCupon ] = useState('');
    const [ importeCupon, setImporteCupon ] = useState(0);
    const [ cargando ] = useState(0);
    const [ alerta, setAlerta ] = useState({});
    const [ datosCargados, setDatosCargados ] = useState(false);
    var cuponSession = {cupon: '', importe:0};

    async function cargarPrecios(){
        const response = await getPrecios();

        if(sessionStorage.getItem("cupon_validado")){
            cuponSession = JSON.parse(sessionStorage.getItem("cupon_validado"));
        }
        
        if(cuponSession.importe == 0){
            //alert('no cupon')
            setPrecioTrans(response.precioTransf);
            sessionStorage.setItem("precio_transf", response.precioTransf);
            setCuponValidado(cuponSession);

            setPrecioMP(response.precioMP);
            sessionStorage.setItem("precio_mp", response.precioTransf);
            
        }else{
            setPrecioTrans(response.precioTransf - cuponValidado.importe);
            sessionStorage.setItem("precio_transf", response.precioTransf - cuponValidado.importe);

            setPrecioMP(response.precioMP - cuponValidado.importe);
            sessionStorage.setItem("precio_mp", response.precioTransf - cuponValidado.importe);
        }

        setDatosCargados(true);
    }

    async function validarCupon(){
        const response = await aplicarCupon(cupon);

        if(response.valido){
            setImporteCupon(response.descuento);

            setPrecioMP(precioMP - response.descuento);
            sessionStorage.setItem("precio_mp",precioMP - response.descuento); //modifica el precio de mercadopago en session storage también

            setPrecioTrans(precioTrans - response.descuento);
            sessionStorage.setItem("precio_transf", precioTrans - response.descuento); //modifica el precio de transferencia ...

            let cuponValidadoObject = {cupon: cupon, importe:response.descuento}; // guarda cupon en variable para usarse en las dos siguientes lineas
            
            setCuponValidado(cuponValidadoObject);
            sessionStorage.setItem("cupon_validado",JSON.stringify(cuponValidadoObject)); //convierto el objeto en string para enviarlo al session storage sin modificar sus propiedades, pudiendo luego volverlo a convertir en el mismo objeto 

        } else {
            setAlerta({
                msg: 'El cupón ingresado no es válido',
                error: true
            })
        }
    }

    async function quitarCupon(){
        setDatosCargados(false);
        setImporteCupon(0)
        setCuponValidado({cupon: '', importe:0});
        sessionStorage.setItem("cupon_validado",JSON.stringify({cupon: '', importe:0}));
        cargarPrecios();
    }

    useEffect(() => {
        cargarPrecios();
        setCupon(cuponValidado.cupon);
        setImporteCupon(cuponValidado.importe);
        setPrecioMP(precioMP - cuponValidado.importe);
        setPrecioTrans(precioTrans - cuponValidado.importe);
        sessionStorage.setItem("precio_transf", precioTrans - cuponValidado.importe)
            
    }, [cargando])//eslint-disable-line

    const { msg } = alerta
    
    function pagar(){
        setImporte(precioTrans)
        return navigate('/pagoTransf')
    }
        
    return (
        <div className="pagos-container">
        {!datosCargados && <Spinner/>}
        {datosCargados && <div>
            {msg && <Alerta alerta={ alerta } />}
            
            
            <div className='mb-8 mt-4 mx-auto text-center'>
                <span className='font-semibold text-gray-500'>SELECCIONAR FORMA DE PAGO</span>
            </div>
            { cuponValidado.cupon ?
                <>
                    <h6 className="text-gray-500 text-xs my-4 font-semibold leading-3">Cupón Aplicado:</h6>
                    <Chip value={cupon} onClick={ () => quitarCupon() } />
                </>
            :
            <>
                <FormInputState 
                    id="turno"
                    label="Cupón" 
                    value={cupon}
                    onChange={ e => setCupon(e.target.value)}
                    placeholder="A-123456"
                /> 
                <div className=' pb-8'>
                    <ActionButton onClick={() => cupon && validarCupon()} value="Aplicar Cupón" />
                </div>
            </>
            }

            <PagoCard medio="TRANSFERENCIA" 
                importe={sessionStorage.getItem("precio_transf") || precioTrans} 
                descuento={importeCupon}
                mensaje="Desde cualquier banco físico o virtual" 
                onClick={ () => pagar() } />
            
            <div className='mb-0 mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/turno')} >Atrás</button>
            </div>
            </div>}

            <div className="pagos-contacto">
                <Contacto/>
            </div>

        </div>
    
    )
}

export default Pagos