import './growDetalles.css';
import Card from '../../components/card/card';
import { LinkButtonCenter } from '../../components/Buttons';
import Spinner from '../../components/Spinner';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGrowById } from '../../data/grows';
import { copyToClipboard } from '../../utils/utilFunctions';
import NotificacionEmergente from '../../components/notificacion-emergente/notificacion-emergente';

function GrowDetalles(){
  const { id } = useParams();
  const [ datosCargados , setDatosCargados ] = useState(false);
  const [ growDetails , setGrowDetails ] = useState(); // eslint-disable-line
  const [ mostrarNotificacion , setMostrarNotificacion ] = useState(false);
  const [ textoNotificacion , setTextoNotificacion ] = useState('');

  const handleNotificacion = (mostrar,texto)=> {
    setMostrarNotificacion(mostrar);
    setTextoNotificacion(texto);
  }
  
  const copiarAlPortapapeles = (recurso,nombreDelRecurso) => {
    handleNotificacion(true,nombreDelRecurso  + " copiado al portapapeles!");
    copyToClipboard(recurso);
  }

  useEffect(()=>{
    const getPacientes = () => {
      if(id){
        getGrowById(id).then((response)=>{
          setGrowDetails(response);
          setDatosCargados(true);
          console.log(JSON.stringify(response));
        });
      }
    }

    getPacientes();
  },[id]); //eslint-disable-line


  return (
    <>
    { datosCargados ? 
    <div className="grow-estadisticas-container">
      <div className='mt-2' style={{textAlign:'center',paddingBottom:'15px'}}>
        <h2 className="black-title">Detalles del grow</h2>
      </div>


      <Card title={'Detalles de contacto'}>
        <div className="gd-item">
          <span className="gd-item-title">Nombre</span>
          <span className="gd-item-text">{growDetails?.nombre}</span>
        </div>
        <div className="gd-item">
          <span className="gd-item-title">Titular</span>
          <span>{growDetails?.titular}</span>
        </div>
        <div className="gd-item">
          <span className="gd-item-title">Email</span>
          <span className="gd-item-text">{growDetails?.mail}</span>
        </div>
        <div className="gd-item">
          <span className="gd-item-title">Celular</span>
          <span className="gd-item-text">{growDetails?.celular}</span>
        </div>
        <div className="gd-item">
          <span className="gd-item-title">Dirección</span>
          <span className="gd-item-text">{growDetails?.direccion}</span>
        </div>  
      </Card>

      <Card title="URL y cupon">
        <div className="gd-item">
          <span className="gd-item-title mt-1">Cupón</span>
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
            <div className="gd-descuento-porcent">50%</div>
            <div className="gd-descuento-descripcion">Con tu cupón o link de descuento</div>
          </div>
          <div className="gd-descuento-box gd-descuento-precio">
            <p className="gd-precio-original">$14.000</p>
            <p className="gd-precio-descuento">$7.000</p>
            <p></p>
          </div>
        </div>

      </Card>

      <div style={{marginTop:'25px'}}>
        <LinkButtonCenter value="Volver" to="/panel"></LinkButtonCenter>
      </div>
      <NotificacionEmergente show={mostrarNotificacion} setShow={setMostrarNotificacion} text={textoNotificacion}/>
    </div>:
    <div className="grow-estadisticas-container" style={{minHeight:'700px'}}><Spinner/></div>
   

    }
    </>
  );
}

export default GrowDetalles;