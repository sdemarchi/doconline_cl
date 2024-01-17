import PagoCard from '../../components/PagoCard';
import { FormInputState } from '../../components/FormInput';
import { useNavigate  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useTurno from '../../hooks/useTurno';
import useAuth from '../../hooks/useAuth';
import { getPrecios } from '../../data/turnero';
import { aplicarCupon } from '../../data/turnero';
import Chip from '../../components/Chip';
import Spinner from '../../components/Spinner';
import Contacto from '../../components/contacto/contacto';
import { getGrowById , getGrowByCod } from '../../data/grows';
import './pagos.css';
import Card from '../../components/card/card';

function Pagos() {
    const {/* turno,*/ cuponValidado, setCuponValidado } = useTurno();
    const { setImporte } = useAuth();

    const navigate = useNavigate();

    const [ precioTrans, setPrecioTrans ] = useState(0);
    const [ precioMP, setPrecioMP ] = useState(0);
    const [ cupon, setCupon ] = useState('');
    const [ importeCupon, setImporteCupon ] = useState(0);
    const [ cargando ] = useState(0);
    const [ datosCargados, setDatosCargados ] = useState(false);
    const [ showMsg , setShowMsg ] = useState(false);
    const [ grow , setGrow ] = useState();

    var cuponSession = {cupon: '', importe:0};

    async function cargarPrecios(){
        const response = await getPrecios();

        if(localStorage.getItem("cupon_validado")){
            cuponSession = JSON.parse(localStorage.getItem("cupon_validado"));
        }
        
        if(cuponSession.importe == 0){
            //alert('no cupon')
            setPrecioTrans(response.precioTransf);
            localStorage.setItem("precio_transf", response.precioTransf);
            setCuponValidado(cuponSession);

            setPrecioMP(response.precioMP);
            localStorage.setItem("precio_mp", response.precioTransf);
            
        }else{
            setPrecioTrans(response.precioTransf - cuponValidado.importe);
            localStorage.setItem("precio_transf", response.precioTransf - cuponValidado.importe);

            setPrecioMP(response.precioMP - cuponValidado.importe);
            localStorage.setItem("precio_mp", response.precioTransf - cuponValidado.importe);
        }

        setDatosCargados(true);
    }

    async function validarCupon(){
        const grow_ = await getGrowByCod(cupon);
        if(grow_?.idgrow){
            setGrow(grow_);
            sessionStorage.setItem('growId',grow_.idgrow);
        }else{
            const response = await aplicarCupon(cupon);

            if(response.valido){
                setImporteCupon(response.descuento);
    
                setPrecioMP(precioMP - response.descuento);
                localStorage.setItem("precio_mp",precioMP - response.descuento); //modifica el precio de mercadopago en session storage también
                
                setPrecioTrans(precioTrans - response.descuento);
                localStorage.setItem("precio_transf", precioTrans - response.descuento); //modifica el precio de transferencia ...
    
                let cuponValidadoObject = {cupon: cupon, importe:response.descuento}; // guarda cupon en variable para usarse en las dos siguientes lineas
                
                setCuponValidado(cuponValidadoObject);
                localStorage.setItem("cupon_validado",JSON.stringify(cuponValidadoObject)); //convierto el objeto en string para enviarlo al session storage sin modificar sus propiedades, pudiendo luego volverlo a convertir en el mismo objeto 
                
                setShowMsg(false);
    
            }else{
                setShowMsg(true);
            }
        }
    }

    
    async function getGrow(){
        if(sessionStorage.getItem('growId')){
            let id = sessionStorage.getItem('growId');
            let grow_ =  await getGrowById(id);
            setGrow(grow_);
        }        
    }

    async function quitarCupon(){
        setDatosCargados(false);
        setImporteCupon(0)
        setCuponValidado({cupon: '', importe:0});
        localStorage.setItem("cupon_validado",JSON.stringify({cupon: '', importe:0}));
        cargarPrecios();
    }

    useEffect(() => {
        getGrow();
        cargarPrecios();
        setCupon(cuponValidado.cupon);
        setImporteCupon(cuponValidado.importe);
        setPrecioMP(precioMP - cuponValidado.importe);
        setPrecioTrans(precioTrans - cuponValidado.importe);
        localStorage.setItem("precio_transf", precioTrans - cuponValidado.importe);
        if(sessionStorage.getItem('growid') !== undefined && sessionStorage.getItem('growid') !== null){
            const idgrow = sessionStorage.getItem('growid');
            getGrow(idgrow);
        }
    }, [cargando])//eslint-disable-line
    

    function pagar(precioFinal){
        localStorage.setItem('precio_transf',precioFinal);
        setImporte(precioTrans);
        return navigate('/pagoTransf');
    }
        
    return (
        <div className="pagos-container">

        {!datosCargados ? <Spinner/>:

        <div>
            {grow?.descuento !== undefined && grow?.descuento !== 0 &&
                <div className="pagos-descuento">
                    <h1>Tenés un descuento del {grow?.descuento}% por {grow?.nombre}.</h1>
                </div>
            }
            
            <div className='mt-2 mb-2' style={{textAlign:'center',paddingBottom:'15px'}}>
              <h2 className="black-title">Ir a pagar</h2>
            </div>
       
            {(!grow?.descuento) &&
                 <Card title="Cupón">
                <>
                    { cuponValidado.cupon ?
                        <>
                            <h6 className="text-gray-500 text-xs my-4 font-semibold leading-3">Cupón Aplicado:</h6>
                            <Chip value={cupon} onClick={ () => quitarCupon() } />
                        </>
                        :
                        <>
                        <FormInputState 
                            id="turno"
                            value={cupon}
                            onChange={ e => setCupon(e.target.value)}
                            placeholder="A-123456"
                            rounded
                        /> 

                        {showMsg && <p className="pagos-error-msg">El cupón ingresado no es válido</p>}
                        <button onClick={() => cupon && validarCupon()} className='pagos-aplicar-button'>Aplicar Cupón</button>
                    </>
                    }
                </>
                </Card>
            }
        
            <Card>
                <PagoCard medio="Transferencia" 
                    importe={sessionStorage.getItem("precio_transf") || precioTrans} 
                    descuento={importeCupon}
                    descuentoPorc={grow?.descuento}
                    mensaje="Desde cualquier banco físico o virtual" 
                    onClick={ (precioFinal) => pagar(precioFinal) } />
            </Card>

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