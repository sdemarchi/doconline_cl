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
import { getGrowById , getGrowByCod, ONGService } from '../../data/grows';
import './pagos.css';
import Card from '../../components/card/card';
import LinkCard from '../../components/link-card/link-card';
import PagosService from '../../data/pagos';
import { ActionButton } from '../../components/Buttons';
import Error from '../../components/Error';
import Title from '../../components/title/title';

function Pagos() {
    const { cuponValidado, setCuponValidado } = useTurno(); 
    const { setImporte } = useAuth();

    const navigate = useNavigate();

    const [ precioTrans, setPrecioTrans ] = useState(0);
    const [ precioMP, setPrecioMP ] = useState(0);
    const [ cupon, setCupon ] = useState('');
    const [ importeCupon, setImporteCupon ] = useState(0);
    const [ growCargado, setGrowCargado ] = useState(false);
    const [ precioCargado, setPrecioCargado ] = useState(false);
    const [ showMsg , setShowMsg ] = useState(false);
    const [ grow , setGrow ] = useState();
    const [ ingresarCodigo, setIngresarCodigo ] = useState(false);
    const [ codigo, setCodigo ] = useState();
    const [ codigoNoEncontrado, setCodigoNoEncontrado ] = useState(false);
    const [ errorMsj, setErrorMsj ] = useState();
    const [ bonificadoONG, setBonificadoONG ] = useState(false);
    const [ nombreONG, setNombreONG ] = useState('');

    var cuponSession = {cupon: '', importe:0};

    async function cargarPrecios(){
        setPrecioCargado(false);

        if(bonificadoONG){
            setPrecioTrans(0);
            setPrecioMP(0);

            localStorage.setItem("precio_mp", 0);
            localStorage.setItem("precio_transf", 0);

            setPrecioCargado(true);

            return;
        }

        const response = await getPrecios();


        if(localStorage.getItem("cupon_validado")){
            cuponSession = JSON.parse(localStorage.getItem("cupon_validado"));
            
        } else if(cuponSession.importe == 0){ 
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

        setPrecioCargado(true);
    }

    /**
     * Se valida que el cupón ingresado sea válido y pertenezca a un grow.
     * En caso de ser así, se aplica el descuento correspondiente y se guarda el grow en session storage
     * para ser enviado junto con la información del pago. El pago se vinculará al grow correspondiente.
     */
    async function validarCupon(){
        const grow_ = await getGrowByCod(cupon);

        if(grow_?.tipo_id == 2){
            setShowMsg(true);
        }else if(grow_?.idgrow){
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


    
    /**
     * Esta función está destinada a comprobar si el pago ya fue utilizado o no.
     * El codigo corresponde a un pago realizado por otra persona como regalo para el usuario actual.
     * El pago podrá utilizarse solo una vez.
     */
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

    /**
     * Los usuarios que esten renovando podrán acceder a un descuento especial.
     */
    const estoyRenovando = async () => {
        const grow_ = await getGrowByCod('renovacion');

        if(grow_?.idgrow){
            setGrow(grow_);
            sessionStorage.setItem('growId',grow_.idgrow);

        }
    }
        

    // Auxiliar: obtiene el grow de una ONG si existe para el paciente
    async function getGrowFromONG(dniPaciente) {
        const resp = await ONGService.getONGPorPaciente(dniPaciente);

        if (resp.tieneONG) {
            setBonificadoONG(true);
            setNombreONG(resp.nombreONG);

            return await getGrowById(resp.idgrow);
        }

        return null; // No pertenece a una ONG
    }


    /**
     * Obtiene el Grow actual para el paciente:
     * 1. Si hay un growId en sessionStorage, lo carga.
     * 2. Si el grow es de tipo 2, verifica si el paciente pertenece a una ONG y, de ser así, carga el grow asociado a la ONG.
     * 3. Si no hay growId, intenta obtener el grow a partir de la ONG del paciente.
     * Finalmente, actualiza el estado con el grow encontrado y los datos de la ONG si aplica.
     */
    async function getGrow() {
        const userData = JSON.parse(sessionStorage.getItem('user_data'));
        const dniPaciente = userData?.dni;
        const growId = sessionStorage.getItem('growId');

        let grow = null;

        if (growId) {  // Si hay un grow guardado en sessionStorage

            const grow_ = await getGrowById(growId);

            // Si es tipo 2, verificamos si está asociado a una ONG
            if (grow_?.tipo_id === 2 && dniPaciente) {
                const ongGrow = await getGrowFromONG(dniPaciente);

                if (ongGrow){
                    grow = ongGrow;
                } 
            }
            
        } else if (dniPaciente) {
            // Si no hay grow en sessionStorage, intentamos con ONG
            const ongGrow = await getGrowFromONG(dniPaciente);
            if (ongGrow) grow = ongGrow;
        }

        // Si encontramos un grow válido, lo seteamos
        if (grow) setGrow(grow);

        setGrowCargado(true);
    }


    

    async function quitarCupon(){
        setPrecioCargado(false);
        setImporteCupon(0)
        setCuponValidado({cupon: '', importe:0});

        localStorage.setItem("cupon_validado",JSON.stringify({cupon: '', importe:0}));

        cargarPrecios();
    }

    useEffect(() => {
        setCupon(cuponValidado.cupon);
        setImporteCupon(cuponValidado.importe);
        getGrow();
    }, [])//eslint-disable-line

    useEffect(() => {
        cargarPrecios(); 
    }, [grow,bonificadoONG])
    
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
        <div className="pagos-container page">
        {!growCargado || !precioCargado? <Spinner/>:

            <div>
                {
                ( bonificadoONG && grow?.descuento !== undefined && grow?.descuento !== 0 && !ingresarCodigo) &&
                    <div className="pagos-descuento display-cel">
                        <h1>Tenés un descuento del {grow?.descuento}% por {grow?.nombre}.</h1>
                    </div>
                }
                {
                bonificadoONG  &&
                    <div className="pagos-descuento display-cel">
                        <h1>{"Tu trámite se encuentra bonificado por " + nombreONG}.</h1>
                    </div>
                }

                <div>

                <Title>{ingresarCodigo ? "Registrar pago" : "Ir a pagar"}</Title>
                {!bonificadoONG && (grow?.descuento !== undefined && grow?.descuento !== 0 && !ingresarCodigo) &&
                    <div className="pagos-descuento display-pc">
                        <h1>Tenés un descuento del {grow?.descuento}% por {grow?.nombre}.</h1>
                    </div>
                }
                {
                bonificadoONG  &&
                    <div className="pagos-descuento display-pc">
                        <h1>{"Tu trámite se encuentra bonificado por " + nombreONG}.</h1>
                    </div>
                }
                <div className='pagos-content'>
                    {(!grow?.descuento && !ingresarCodigo) &&
                        <Card show={!bonificadoONG} title="Cupón" disabledBorder >
                        <>
                            { cuponValidado.cupon ?
                                <Chip value={cupon} onClick={ () => quitarCupon() } />
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
                
                    <Card show={!ingresarCodigo} disabledBorder >
                        
                        <PagoCard 
                            medio="Transferencia" 
                            importe={sessionStorage.getItem("precio_transf") || precioTrans} 
                            descuento={importeCupon}
                            descuentoPorc={grow?.descuento}
                            textoBoton={bonificadoONG ? "Continuar" : "Ir a Pagar"}
                            mensaje="Desde cualquier banco físico o virtual" 
                            onClick={ (precioFinal) => pagar(precioFinal) } />

                            <div className="pagos-pagado-container">
                                <button onClick={()=>setIngresarCodigo(true)} className="display-pc pagos-pagado-button"> Ya han pagado por tí?</button>
                            </div>
                            { !ingresarCodigo  && !grow?.descuento && <div className="pagos-pagado-container">
                                <button onClick={()=>estoyRenovando()}  className="display-pc pagos-pagado-button"> Click aqui si estás renovando el trámite</button>
                            </div>}
                    </Card>


                    <LinkCard show={!ingresarCodigo} onClick={()=>setIngresarCodigo(true)} title="Ya han pagado por mí" onlyCel>Ingresar el codigo de pago.</LinkCard>
                   
                    <Card show={ingresarCodigo} onClick={()=>setIngresarCodigo(true)} title="Ingresar código" disabledBorder>
                        <p className="pagos-codigo-label">{"(Solicita el código a quien realizó el pago)"}</p>
                        <InputState 
                            id="turno"
                            state={codigo}
                            setState={setCodigo}
                            placeholder="A5BC56"
                        /> 

                        {codigoNoEncontrado && <div className="mt-8"><Error>{errorMsj}</Error></div>}

                        <ActionButton onClick={()=>comprobarCodigo()} value="Usar codigo"/>
                    </Card>

                    <LinkCard onClick={()=>estoyRenovando()} show={!ingresarCodigo  && !grow?.descuento } onlyCel title='Estoy renovando'>
                        Click aquí si estás renovando el tramite.
                    </LinkCard>

                </div>

                <div className='mb-0 mx-auto p-3 text-center'>
                    <button className='text-gray-500' onClick={() => navigate('/turno')} >Atrás</button>
                </div>
            </div>
            
            </div>}

            <div className="pagos-contacto">
                <Contacto/>
            </div>

        </div>
    
    )
}

export default Pagos;