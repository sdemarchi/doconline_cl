import Nav from '../../../components/nav/nav';
import LinkCard from '../../../components/link-card/link-card';
import ColorCard from '../../../components/color-card/color-card';
import './tu-grow.css';
import { useEffect } from 'react';
import { useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineQrcode } from "react-icons/ai";
import { QRCode as QRCodeLogo } from 'react-qrcode-logo';
import { QuickActionButton } from '../../../components/buttons/quickActionButton/quickActionButton';
import NotificacionEmergente from '../../../components/notificacion-emergente/notificacion-emergente';
import { copyToClipboard } from '../../../utils/utilFunctions';
import { IoMdLink } from "react-icons/io";
import { IoTicketOutline } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import CifradoHelper from '../../../utils/CifradoHelper';
import Session from '../../../utils/Storage/Session';
import RolUsuario from '../../../enum/RolUsuario';

export default function TuGrow(){
  const [ mostrarNotificacion , setMostrarNotificacion ] = useState(false);
  const [ textoNotificacion , setTextoNotificacion ] = useState('');
  const [ grow , setGrow ] = useState();
  const navigate = useNavigate();
  const [ growDetails , setGrowDetails ] = useState(); // eslint-disable-line
  const rolUsuario = Session.getRol()


  const handleNotificacion = (mostrar,texto)=> {
    setMostrarNotificacion(mostrar);
    setTextoNotificacion(texto + ' copiado al portapapeles.');
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

      downloadLink.href = pngUrl;
      downloadLink.download = `qr-descuento.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
  }


  const copiarAlPortapapeles = (recurso,nombreDelRecurso) => {
    handleNotificacion(true,nombreDelRecurso );
    copyToClipboard(recurso);
  }


  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    return navigate('/login');
  }


  useEffect(()=>{
    const grow_ = JSON.parse(sessionStorage.getItem('user-grow'));

    () => {
      if(id){
        getGrowById(id).then((response)=>{
          setGrowDetails(response);
          setDatosCargados(true);
        });
      }
    }

    setGrow(grow_);
  },[]);

  return(
  <>
  <div className="tg-container page"> 

      <div className="tg-content">

        <ColorCard color1="#009FD2" color2="#CE9CEE">
          <h2 className="tg-grow-name">{grow?.nombre}</h2>
          <p className="tg-grow-description">Puedes ver los datos y beneficiarios de tu {rolUsuario == RolUsuario.ONG ? "ONG": "Grow"} </p>
        </ColorCard>


        <div className="flex my-6 mb-8 space-around bg-blue display-cel">
          <QuickActionButton width='25%' paddingText="5px" onClick={()=>descargarQR()} icon={<LuDownload />} text={"Descargar QR"}/>
          <QuickActionButton width='25%' paddingText="5px" onClick={()=>copiarQR()} icon={<AiOutlineQrcode />} text={"Copiar QR"}/>
          <QuickActionButton width='25%' paddingText="5px" onClick={()=>copiarAlPortapapeles('www.doconlineargentina.com/turnero/login/'+grow?.cod_desc,'Link')} icon={<IoMdLink />} text={"Link de descuento"}/>
          <QuickActionButton width='25%' paddingText="5px" onClick={()=>copiarAlPortapapeles(grow?.cod_desc,'Cupón')} icon={<IoTicketOutline />} text={"Copiar Cupón"}/>
        </div>


        <LinkCard show={rolUsuario == RolUsuario.Grow} title="Ver pacientes" to={'/estadisticas/'+CifradoHelper.cifrar(grow?.idgrow)}>
          <p>Ver estadisticas de los pacientes registrados con tu URL.</p>
        </LinkCard>

        <LinkCard show={rolUsuario == RolUsuario.ONG} title="Ver pacientes" to={'/estadisticas-ong'}>
          <p>Ver detalles del tramite de los pacientes vinculados a la ONG.</p>
        </LinkCard>

      
        <LinkCard show={(grow !== undefined)} title={rolUsuario == RolUsuario.ONG ? "Detalles de la ONG": "Detalles del Grow"} to={'/detallesGrow/'+CifradoHelper.cifrar(grow?.idgrow)}>
          <p>Consulta los detalles de tu {grow?.tipo_id == 2 ? "ONG":"Grow"}.</p>
        </LinkCard>
        

        <LinkCard show={false} title="Tramita tu Reprocann" to={'/turno'}>
          <p>Saca turno e inicia tu tramite.</p>
        </LinkCard>


        <LinkCard title="Contenido para tus redes" show={grow?.meta_inf?.link_contenido} link={grow?.meta_inf?.link_contenido}>
          <p>Comparte contenido junto a tu Link</p>
        </LinkCard>

        { rolUsuario == RolUsuario.ONG &&
          <LinkCard title="Registra un paciente"  to="/registrar-paciente-ong">
            <p>Registra un paciente para que pueda acceder al trámite.</p>
          </LinkCard>
        }

        {
        /**
         * Se mantiene oculto por ahora, en el futuro se modificará para editar los datos del grow.
         */
        (rolUsuario == RolUsuario.ONG && false) &&
          <LinkCard title="Modificar datos del titular"  to="/editar-datos-ong">
            <p>Modifica los datos del titular de la ONG.</p>
          </LinkCard>
        }

      </div>     


      <div className='panel-button mx-auto p-3 text-center'>
          <button className="button-cerrar-sesion display-cel" onClick={() => logout()}>Cerrar Sesión</button>
      </div>
      
      <NotificacionEmergente show={mostrarNotificacion} setShow={setMostrarNotificacion} text={textoNotificacion}/>
  
  </div>

  <div style={{minHeight:'50px'}}>
      <Nav idgrow={grow?.idgrow} />
  </div>


  {/* QR OCULTO PARA COPIAR Y DESCARGAR */}
  <div style={{display:'none'}}>

    <QRCodeLogo
      value={'www.doconlineargentina.com/turnero/login/' + growDetails?.cod_desc}          
      size={500}
      enableCORS={true}     
      id={"qr-code-logo"}
    />

  </div>

  </>);
}