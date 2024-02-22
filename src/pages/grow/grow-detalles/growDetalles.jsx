import './growDetalles.css';
import Card from '../../../components/card/card';
import { LinkButtonCenter } from '../../../components/Buttons';
import Spinner from '../../../components/Spinner';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGrowById } from '../../../data/grows';
import { copyToClipboard } from '../../../utils/utilFunctions';
import { getPrecios } from '../../../data/turnero';
import NotificacionEmergente from '../../../components/notificacion-emergente/notificacion-emergente';

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

  useEffect(()=>{
    const getGrow = () => {
      if(id){
        getGrowById(id).then((response)=>{
          setGrowDetails(response);
          setDatosCargados(true);
          console.log(JSON.stringify(response));
        });
      }
    }

    const cargarPrecio = () => {
      getPrecios().then((response)=>{
        setPrecioTransf(response.precioTransf)
      }
      );
    }
    cargarPrecio();
    getGrow();
  },[id]); //eslint-disable-line


  return (
    <>
    { datosCargados ? 
    <div className="grow-estadisticas-container page">
      <div className='mt-2' style={{textAlign:'center',paddingBottom:'15px'}}>
        <h2 className="black-title">Detalles del grow</h2>
      </div>


      <Card title={'Detalles de contacto'}>
       {growDetails?.nombre && <div className="gd-item">
          <span className="gd-item-title">Nombre</span>
          <span className="gd-item-text">{growDetails?.nombre}</span>
        </div>}
       {growDetails?.titular && <div className="gd-item">
          <span className="gd-item-title">Titular</span>
          <span>{growDetails?.titular}</span>
        </div>}
       {growDetails?.mail &&<div className="gd-item">
          <span className="gd-item-title">Email</span>
          <span className="gd-item-text">{growDetails?.mail}</span>
        </div>}
        {growDetails?.celular && <div className="gd-item">
          <span className="gd-item-title">Celular</span>
          <span className="gd-item-text">{growDetails?.celular}</span>
        </div>}
        {growDetails?.direccion &&<div className="gd-item">
          <span className="gd-item-title">Dirección</span>
          <span className="gd-item-text">{growDetails?.direccion}</span>
        </div>  }
      </Card>

      <Card title="cupon">
        <div className="gd-item">
          <span  onClick={()=>copyToClipboard(growDetails?.cod_desc)} className="gd-item-text" >{growDetails?.cod_desc}</span>
          <span className="gd-item-title mt-1">Link personalizado</span>

          {/*<span onClick={()=>copyToClipboard('www.doconlineargentina.com/turnero/'+growDetails?.cod_desc)} 
                className="gd-item-text">{'www.doconlineargentina.com/turnero/'+growDetails?.cod_desc}
          </span>*/}

      <button className="gd-copiar-link-boton" onClick={()=>copiarAlPortapapeles('www.doconlineargentina.com/turnero/login/'+growDetails?.cod_desc,'Link')}>Copiar Link</button>
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
            <p className="gd-precio-descuento">${precioTransf * (1 - growDetails.descuento/100)}</p>
            <p></p>
          </div>
        </div>

      </Card>

      <div style={{marginTop:'25px',marginBottom:'25px'}}>
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