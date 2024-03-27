import './growDetalles.css';
import React, { useRef } from 'react';
import Card from '../../../components/card/card';
import { LinkButtonCenter } from '../../../components/Buttons';
import Spinner from '../../../components/Spinner';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGrowById } from '../../../data/grows';
import { copyToClipboard } from '../../../utils/utilFunctions';
import { getPrecios } from '../../../data/turnero';
import NotificacionEmergente from '../../../components/notificacion-emergente/notificacion-emergente';
import { QuickActionButton } from '../../../components/buttons/quickActionButton/quickActionButton';
import Title from '../../../components/title/title';
import QRCode from 'react-qr-code';
import { FaRegCopy } from "react-icons/fa6";
import { LuDownload } from "react-icons/lu";
import { QRCode as QRCodeLogo } from 'react-qrcode-logo';

function GrowDetalles(){
  const { id } = useParams();
  const [ datosCargados , setDatosCargados ] = useState(false);
  const [ growDetails , setGrowDetails ] = useState(); // eslint-disable-line
  const [ mostrarNotificacion , setMostrarNotificacion ] = useState(false);
  const [ textoNotificacion , setTextoNotificacion ] = useState('');
  const [ precioTransf, setPrecioTransf ] = useState(0);
  

  const handleNotificacion = (mostrar,texto)=> {
    setMostrarNotificacion(mostrar);
    setTextoNotificacion(texto + ' copiado al portapapeles.');
  }
  
  const copiarAlPortapapeles = (recurso,nombreDelRecurso) => {
    handleNotificacion(true,nombreDelRecurso );
    copyToClipboard(recurso);
  }

  const copiarQR = () => {
    const canvas = document.getElementById("qr-code-logo");
    if (canvas) {
      canvas.toBlob((blob) => {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item])
          .then(() => {
            handleNotificacion(true,'QR');
          })
          .catch((error) => console.error("Error al copiar el código QR:", error));
      });


    }
  };

  const descargarQR = () => {
    const canvas = document.getElementById("qr-code-logo");
    if(canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl
      downloadLink.download = `qr-descuento.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
  }
  
  useEffect(()=>{
    const getGrow = () => {
      if(id){
        getGrowById(id).then((response)=>{
          setGrowDetails(response);
          setDatosCargados(true);
        }).catch(()=>{
          console.log('grow - Reintentando la solicitud');
            getGrowById(id).then((response)=>{
              setGrowDetails(response);
              setDatosCargados(true);
          }).catch(()=>{
            if(sessionStorage.getItem('user-grow')){
              const grow_ = JSON.parse(sessionStorage.getItem('user-grow'));
              setGrowDetails(grow_);
              setDatosCargados(true);
            }
          });
        });
      }else{
        if(sessionStorage.getItem('user-grow')){
          const grow_ = JSON.parse(sessionStorage.getItem('user-grow'));
          setGrowDetails(grow_);
          setDatosCargados(true);
        }
      }
    }

    const cargarPrecio = () => {
      getPrecios().then((response)=>{
        setPrecioTransf(response.precioTransf)
      }).catch(()=>{
        console.log('precios - Reintentando la solicitud.');
        getPrecios().then((response)=>{
          setPrecioTransf(response.precioTransf)
        }).catch(()=>{
          getPrecios().then((response)=>{
            setPrecioTransf(response.precioTransf)
          })
        });
      });
    }
    cargarPrecio();
    getGrow();
  },[id]); //eslint-disable-line


  return (
    <>
    { datosCargados ? 
    <div className="grow-estadisticas-container page">

        {/* ELEMENTO DE QR OCULTO PARA COPIAR Y DESCARGAR */}
          <div style={{display:'none'}}>
            <QRCodeLogo
              value={'www.doconlineargentina.com/turnero/login/'+growDetails?.cod_desc}          
              size={500}
  
              enableCORS={true}     
              id={"qr-code-logo"}
            />
          </div>

      <Title>Detalles del grow</Title>

      <Card title={'Detalles de contacto'}>
        <div className="grow-estadisticas-items">

            {growDetails?.nombre && <div className="gd-item">
              <span className="gd-item-title">Nombre</span>
              <span className="gd-item-text">{growDetails?.nombre}</span>
            </div>}

            {growDetails?.titular && <div className="gd-item">
              <span className="gd-item-title">Titular</span>
              <span>{growDetails?.titular}</span>
            </div>}

          </div>
          <div className="grow-estadisticas-items">

            {growDetails?.mail &&<div className="gd-item">
              <span className="gd-item-title">Email</span>
              <span className="gd-item-text">{growDetails?.mail}</span>
            </div>}

            {growDetails?.celular && <div className="gd-item">
              <span className="gd-item-title">Celular</span>
              <span className="gd-item-text">{growDetails?.celular}</span>
            </div>}

          </div>
          <div className="grow-estadisticas-items">

            {growDetails?.direccion &&<div className="gd-item">
              <span className="gd-item-title">Dirección</span>
              <span className="gd-item-text">{growDetails?.direccion}</span>
            </div>}
        </div>
      </Card>

      <Card title="cupon">
        <div className="gd-item">
          <span  onClick={()=>copyToClipboard(growDetails?.cod_desc)} className="gd-item-text" >{growDetails?.cod_desc}</span>
          <span className="gd-item-title mt-1">Link personalizado</span>
          <button className="gd-copiar-link-boton" onClick={()=>copiarAlPortapapeles('www.doconlineargentina.com/turnero/login/'+growDetails?.cod_desc,'Link')}>Copiar Link</button>
        </div>
      </Card>

      <Card title="Link QR">
        <div style={{display:'flex',justifyContent:"space-around",alignItems:'center',padding:'10px 0'}}>
          <QuickActionButton onClick={()=>descargarQR()} icon={<LuDownload />} text={"Descargar QR"}/>
          <QuickActionButton onClick={()=>copiarQR()} icon={<FaRegCopy />} text={"Copiar QR"}/>
          <QRCode style={{width:'130px'}} className='gd-qr' value={'www.doconlineargentina.com/turnero/login/'+growDetails?.cod_desc} />
        </div>
      </Card>
      
      <Card title="Tu descuento">
        <div className="gd-descuento">

          <div className="gd-descuento-box">
            <div className="gd-descuento-porcent">{growDetails.descuento}%</div>
            <div className="gd-descuento-descripcion">Con tu cupón o link de descuento</div>
          </div>

          <div className="gd-descuento-box gd-descuento-precio">
            {growDetails?.descuento !== 0 && <p className="gd-precio-original">${precioTransf}</p>}
            <p className="gd-precio-descuento">${Math.round(precioTransf * (1 - growDetails.descuento/100))}</p>
            <p></p>
          </div>

        </div>
      </Card>

      <div className="gd-button">
        <LinkButtonCenter value="Volver" to={"/tu-grow/"+id}></LinkButtonCenter>
      </div>

      <NotificacionEmergente show={mostrarNotificacion} setShow={setMostrarNotificacion} text={textoNotificacion}/>
    </div>:
    <div className="grow-estadisticas-container page" style={{minHeight:'700px'}}><Spinner/></div>

    }
    </>
  );
}

export default GrowDetalles;