import {useState, useEffect } from 'react';
import { ActionButton } from '../../components/Buttons';
import { getDatosTransf/*, uploadComprobante*/ } from '../../data/turnero';
import useAuth from '../../hooks/useAuth';
import useTurno from '../../hooks/useTurno';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { confirmarTurno } from '../../data/turnero';
import { setGrowPaciente } from '../../data/pacientes';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import copyIcon from '../../assets/copy-icon.ico';
import '../../global-styles/form-styles.css';
import Notificacion from '../../components/notificacion/Notificacion';
import Contacto from '../../components/contacto/contacto';
import './pagos.css';
import Card from '../../components/card/card';
import toBase64 from '../../utils/base64';


function PagoTransf() {

    const {importe} = useAuth();//eslint-disable-line
    const { turno, cuponValidado, comprobante, setComprobante } = useTurno();//eslint-disable-line
 

    //-- VARIABLES DE SESION PARA EVITAR PERDER DATOS AL ACTUALIZAR ----------
        const importeSession = localStorage.getItem("precio_transf");
        const turnoSession = JSON.parse(localStorage.getItem("turno"));
        const cuponSession = JSON.parse(localStorage.getItem("cupon_validado"));
    //-----------------------------------------------------------------------


    const user = useOutletContext();

    const navigate = useNavigate();
    const [cbu, setCbu] = useState();
    const [alias, setAlias] = useState();
    const [cargando] = useState(0);
    const [enviando, setEnviando] = useState(false);
    const [uploadResult, setUploadResult] = useState(0);
    const [datosCargados, setDatosCargados] = useState(false);
    const [mostrarNotification, setMostrarNotification] = useState(false);
    const [file , setFile] = useState(); //eslint-disable-line
    const [comprobanteImagen, setComprobanteImagen] = useState();

    const subirArchivo = async (e) => {
        setEnviando(true);
        setFile(e.target.files[0])
        const url = `${import.meta.env.VITE_API_URL}/turnero.comprobante`;
        const data = new FormData();
        data.append("file", e.target.files[0]);
        setComprobante(e.target.files[0], data);

        toBase64(e.target.files[0],'jpg').then((image)=>{
            setComprobanteImagen(image);
        });

        axios
            .post(url, data)
            .then(res => {
                setUploadResult(1);
                console.log(res.data.filename);
                setComprobante(res.data.filename);
                setEnviando(false);
                sessionStorage.setItem("comprobante-enviado",true);
            })
            .catch(err => {
                setUploadResult(2);
                console.log(err);
            })
    }

    const handleMostrarNotification = () => {
        setMostrarNotification(true);
    
        // Ocultar la notificación después de 2 segundos
        setTimeout(() => {
          setMostrarNotification(false);
        }, 3000);
      };

    async function cargarDatosTransf() {
        const response = await getDatosTransf();
        setCbu(response.cbu);
        setAlias(response.alias);
        setDatosCargados(true);
    }

    async function guardarTurno() {
        setDatosCargados(false);

        if(sessionStorage.getItem('growId') !== undefined && sessionStorage.getItem('growId') !== null){
            const idgrow = sessionStorage.getItem('growId');
            setGrowPaciente(user.userId,idgrow)
        }
        // SOLICITUD ORIGINAL: 
        /* const response = await confirmarTurno(turno, cuponValidado, comprobante, importe, user.userId);*/

        // SOLICITUD MODIFICADA:  31/08/23 para corregir problema de perdida de datos al actualizar
        //alert(JSON.stringify(turnoSession) + JSON.stringify(cuponSession) || JSON.stringify(cuponValidado) + JSON.stringify(comprobante) + JSON.stringify(importeSession) + JSON.stringify(user.userId));
        const response = await confirmarTurno(turnoSession, cuponSession || cuponValidado, comprobante, importeSession, user.userId);
        console.log(response);
        if (response.error == 0) {
            return navigate('/turno-success');
        } 
    }

    async function copiarAlPortapapeles(texto){
        await navigator.clipboard.writeText(texto);
        handleMostrarNotification();
    }

    useEffect(() => {
        sessionStorage.setItem('comprobante-enviado',false);
        cargarDatosTransf();

    }, [cargando]) // eslint-disable-line

    return (
        <div className="pagos-container">
        {!datosCargados && <Spinner/>}{datosCargados && <div>
            {mostrarNotification && <Notificacion message="Texto copiado al portapapeles"/>}
  
            <div className='mb-6 mt-4 mx-auto text-center'>
                <span className='black-title'>Transferí a la siguiente cuenta</span>
            </div>

            <Card center>
                <div style={{textAlign:'center'}}>
                    <h4 className="text-gray-600 pagos-transf-info-title">
                        <strong>CBU:</strong> 
                        <span className="pagos-transf-info"> {cbu}</span>
                        <button className="icon-button" onClick={() => copiarAlPortapapeles(cbu)}><img title="Copiar CBU" className="icon" src={copyIcon}></img></button>
                    </h4>

                    <h4 className="text-gray-600 my-2 pt-1 pagos-transf-info-title">
                        <strong>Alias:</strong> 
                        <span className="pagos-transf-info-alias"> {alias}</span>
                        <button className="icon-button" onClick={() => copiarAlPortapapeles(alias)}><img title="Copiar Alias" className="icon" src={copyIcon}></img></button>
                    </h4>

                    <h4 className="text-green-600 mt-2 text-2xl font-bold pt-1">${importeSession}</h4>
                </div>
            </Card>

            <Card>
            <div className='my-2'>
                <div className='pt-2 pb-0'>
                    {enviando &&
                        <label className="flex flex-col items-center py-6 bg-white text-input rounded-lg tracking-wide border border-input cursor-pointer">
                            <span className="mt-2 text-base leading-normal">Enviando...</span>
                        </label>
                    }   
                    { !enviando && !comprobanteImagen &&
                        <label className="flex flex-col items-center py-6 bg-white text-input rounded-lg tracking-wide border border-input cursor-pointer hover:bg-gradient-to-r hover:from-grad-green hover:to-grad-blue hover:text-white">
                            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span className="mt-2 text-base leading-normal" style={{fontSize:'18px',fontWeight:'600'}}>Adjuntar Comprobante</span>
                            <input type='file' className="hidden" onChange={subirArchivo} />
                        </label>}
                        { !enviando && comprobanteImagen  &&
                        <>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}} >
                            <div>
                                <img src={comprobanteImagen} style={{height:'100px',maxWidth:'200px'}}></img>
                            </div>
                            <label className="flex flex-col items-center py-6 bg-white text-input rounded-lg tracking-wide border border-input cursor-pointer hover:bg-gradient-to-r hover:from-grad-green hover:to-grad-blue hover:text-white">
                                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                                <span className="mt-2 text-base leading-normal" style={{fontSize:'18px',fontWeight:'600',margin:'0 15px'}}>Volver a subir</span>
                                <input type='file' className="hidden" onChange={subirArchivo} />
                            </label>
                        </div>
                        </> 
                    }

                </div>
            </div>
           </Card> 

            {uploadResult == 0 ? '' :
                <div className='pb-4'>
                    {uploadResult != 1 &&
                        <h6 className="text-red-600 text-sm font-bold text-center pb-2">
                            Error al subir el comprobante
                        </h6>}
                </div>
            }

            <div className="mt-10">
                <ActionButton value="Continuar" onClick={() => guardarTurno()}/>
                <div className='mb-0 mx-auto p-3 text-center'>
                    <button className='text-gray-500' onClick={() => navigate('/pagos')} >Atrás</button>
                </div>
            </div>

            <div className="pagos-contacto">
                <Contacto/>
            </div>

        </div>}</div>

    )
}

export default PagoTransf;