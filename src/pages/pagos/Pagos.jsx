import PagoCard from '../../components/PagoCard';
import { FormInputState } from '../../components/FormInput';
import { InputState } from '../../components/FormInput';
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
import LinkCard from '../../components/link-card/link-card';
import PagosService from '../../data/pagos';
import { ActionButton } from '../../components/Buttons';
import Error from '../../components/Error';

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
    const [ pagoRegistrado, setPagoRegistrado ] = useState();
    const [ ingresarCodigo, setIngresarCodigo ] = useState(false);
    const [ codigo, setCodigo ] = useState();
    const [ codigoNoEncontrado, setCodigoNoEncontrado ] = useState(false);
    const [ errorMsj, setErrorMsj ] = useState();

    var cuponSession = {cupon: '', importe:0};

    async function cargarPrecios(){
        const response = await getPrecios();

        if(localStorage.getItem("cupon_validado")){
            cuponSession = JSON.parse(localStorage.getItem("cupon_validado"));
        }
        
        if(cuponSession.importe == 0){
            //alert('no cupon')
            setPrecioTrans(response.precioTransf);
            setCuponValidado(cuponSession);
            setPrecioMP(response.precioMP);

            localStorage.setItem("precio_mp", response.precioTransf);
            localStorage.setItem("precio_transf", response.precioTransf);
            
        }else{
            setPrecioTrans(response.precioTransf - cuponValidado.importe);
            setPrecioMP(response.precioMP - cuponValidado.importe);

            localStorage.setItem("precio_transf", response.precioTransf - cuponValidado.importe);
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
                setPrecioTrans(precioTrans - response.descuento);
                setCuponValidado({cupon: cupon, importe:response.descuento});

                localStorage.setItem("precio_transf", precioTrans - response.descuento);
                localStorage.setItem("precio_mp",precioMP - response.descuento);
                localStorage.setItem("cupon_validado",JSON.stringify({cupon: cupon, importe:response.descuento}));
                setShowMsg(false);
    
            }else{
                setShowMsg(true);
            }
        }
    }

    const comprobarCodigo = () =>{
        PagosService.buscarPorCodigo(codigo).then((resp)=>{
            if(resp.id){
                if(resp.utilizado === 0){
                    sessionStorage.setItem('pago',JSON.stringify(resp));
                    navigate('/turno-conf');
                }else{
                    setErrorMsj('El codigo ya se ha utilizado');
                    setCodigoNoEncontrado(true);
                }

            }else{
                setErrorMsj('El codigo no es valido');
                setCodigoNoEncontrado(true);
            }
        });
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
    }, [])//eslint-disable-line
    
    function pagar(precioFinal){
        const pago = {
            precioFinal:precioFinal,
            precio:precioTrans,
            descuento: precioTrans - precioFinal,
            cupon:cupon,
            grow:grow
        }

        sessionStorage.setItem('pago',JSON.stringify(pago));
        localStorage.setItem('precio_transf',precioFinal);
        setImporte(precioTrans);
        return navigate('/pagoTransf');
    }
        
    return (
        <div className="pagos-container">
        {!datosCargados ? <Spinner/>:

        <div>
            {(grow?.descuento !== undefined && grow?.descuento !== 0 && !ingresarCodigo) &&
                <div className="pagos-descuento">
                    <h1>Tenés un descuento del {grow?.descuento}% por {grow?.nombre}.</h1>
                </div>
            }
            
            <div className='mt-2 mb-2' style={{textAlign:'center',paddingBottom:'15px'}}>
              <h2 className="black-title">{ingresarCodigo ? "Registrar pago" : "Ir a pagar"}</h2>
            </div>
       
            {(!grow?.descuento && !ingresarCodigo) &&
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
        
            <Card show={!ingresarCodigo}>
                <PagoCard medio="Transferencia" 
                    importe={sessionStorage.getItem("precio_transf") || precioTrans} 
                    descuento={importeCupon}
                    descuentoPorc={grow?.descuento}
                    mensaje="Desde cualquier banco físico o virtual" 
                    onClick={ (precioFinal) => pagar(precioFinal) } />
            </Card>

            <LinkCard show={!ingresarCodigo} onClick={()=>setIngresarCodigo(true)} title="Ya han pagado por mi">Ingresar el codigo de pago.</LinkCard>
            <Card show={ingresarCodigo} onClick={()=>setIngresarCodigo(true)} title="Ingresar codigo">
                Solicita el codigo a quien realizo el pago.
                <InputState 
                    id="turno"
                    state={codigo}
                    setState={setCodigo}
                    placeholder="A5BC56"
                /> 
                {codigoNoEncontrado && <div className="mt-8"><Error>{errorMsj}</Error></div>}

                <ActionButton onClick={()=>comprobarCodigo()} value="Usar codigo"/>
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

export default Pagos;