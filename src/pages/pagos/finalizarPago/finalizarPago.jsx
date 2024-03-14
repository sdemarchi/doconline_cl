import Title from "../../../components/title/title";
import Card from "../../../components/card/card";
import copyIcon from '../../../assets/copy-icon.ico';
import { getDatosTransf } from '../../../data/turnero';
import { useState, useEffect } from 'react';
import PagosService from '../../../data/pagos';
import './finalizarPago.css';
import '../pagos.css';
import { ActionButton } from "../../../components/Buttons";
import Spinner from "../../../components/Spinner";
import axios from 'axios';
import toBase64 from '../../../utils/base64';

import { useNavigate } from 'react-router-dom';


export default function FinalizarPago(){
  const [ enviando, setEnviando ] = useState();
  const [ comprobante, setComprobante ] = useState();
  const [ cbu, setCbu ] = useState();
  const [ alias, setAlias ] = useState('');
  const [ pago, setPago ] = useState();
  const [ cargando, setCargando ] = useState(true);
  const [uploadResult, setUploadResult] = useState(0);
  const [ comprobanteImagen, setComprobanteImagen ] = useState();
  const navigate = useNavigate();

  const cargarDatosTransf = async() => {
    if(sessionStorage.getItem('datos-transf') === null){
        const response = await getDatosTransf();
        setCbu(response.cbu);
        setAlias(response.alias);
        sessionStorage.setItem('datos-transf',JSON.stringify(response));
    }else{
        const datosTransf_session = JSON.parse(sessionStorage.getItem('datos-transf'));
        setCbu(datosTransf_session.cbu);
        setAlias(datosTransf_session.alias);
    }
}

  const getPago = () =>{
    const userDataString = sessionStorage.getItem('user_data');
    const userDataObject = JSON.parse(userDataString);

    PagosService.buscarPorEmail(userDataObject?.email).then((resp)=>{
      setPago(resp);
      setCargando(false);
  });
  }

  const subirArchivo = async (e) => {
    setEnviando(true);
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
        PagosService.editar({...pago, comprobante:res.data.filename},pago.id).then(()=>{
          setEnviando(false);
          sessionStorage.setItem("comprobante-enviado",true);
        }
        );

    })
    .catch(err => {
        setUploadResult(2);
        console.log(err);
    })
}

  useEffect(()=>{
    cargarDatosTransf();
    getPago();
  },[])

  return(
    <div className="page">
     {cargando? <Spinner/> : <div>
      <Title>Finalizar pago</Title>
      <div className='pagos-content'>
 
        <Card center disabledBorder>
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

                <h4 className="text-green-600 mt-2 text-2xl font-bold pt-1">${Math.trunc(pago?.monto_final)}</h4>
            </div>
        </Card>

        <Card disabledBorder>
          <div className='my-2'>
            <div className='pt-2 pb-0'>
              {enviando &&
                <label className="flex flex-col items-center py-6 bg-white text-input rounded-lg tracking-wide border border-input cursor-pointer">
                  <span className="mt-2 text-base leading-normal">Enviando...</span>
                </label>
              }   

              { !enviando && !comprobante &&
                <label className="flex flex-col items-center py-6 bg-white text-input rounded-lg tracking-wide border border-input cursor-pointer hover:bg-gradient-to-r hover:from-grad-green hover:to-grad-blue hover:text-white">
                  <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 text-base leading-normal" style={{fontSize:'18px',fontWeight:'600'}}>Adjuntar Comprobante</span>
                  <input type='file' className="hidden" onChange={subirArchivo} />
                </label>}

                { !enviando && comprobante &&
                <>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}} >
                    <div style={{marginRight:'50px'}}>
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
                <div className='pt-4 mt-4' style={!comprobante ? {opacity:'40%'}:{}}>
                    <ActionButton onClick={() => navigate('/panel')} value="Listo" />
                </div>
                <div className='mb-0 mx-auto p-3 text-center'>
                    <button className='text-gray-500' onClick={() => navigate('/panel')}>Volver</button>
                </div>
            </div>
          </div>
      </Card> 
    </div>
    </div>}
  </div>
  );
}