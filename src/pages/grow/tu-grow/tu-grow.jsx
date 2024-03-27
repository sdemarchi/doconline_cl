import Nav from '../../../components/nav/nav';
import LinkCard from '../../../components/link-card/link-card';
import { useParams } from 'react-router-dom';
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

export default function TuGrow(){
  const [ mostrarNotificacion , setMostrarNotificacion ] = useState(false);
  const [ textoNotificacion , setTextoNotificacion ] = useState('');
  const idgrow = useParams('id');
  const [ grow , setGrow ] = useState();
  const qrRef = useRef(null); 
  const navigate = useNavigate();
  const [ growDetails , setGrowDetails ] = useState(); // eslint-disable-line


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

    const getGrow = () => {
      if(id){
        getGrowById(id).then((response)=>{
          setGrowDetails(response);
          setDatosCargados(true);
          console.log(JSON.stringify(response));
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
        <p className="tg-grow-description">Puedes ver los datos y estadisticas de tu grow</p>
      </ColorCard>

      <div className="flex my-6 space-around bg-blue display-cel">
        <QuickActionButton width='25%' paddingText="5px" onClick={()=>descargarQR()} icon={<LuDownload />} text={"Descargar QR"}/>
        <QuickActionButton width='25%' paddingText="5px" onClick={()=>copiarQR()} icon={<AiOutlineQrcode />} text={"Copiar QR"}/>
        <QuickActionButton width='25%' paddingText="5px" onClick={()=>copiarAlPortapapeles('www.doconlineargentina.com/turnero/login/'+grow?.cod_desc,'Link')} icon={<IoMdLink />} text={"Link de descuento"}/>
        <QuickActionButton width='25%' paddingText="5px" onClick={()=>copiarAlPortapapeles(grow?.cod_desc,'Cupón')} icon={<IoTicketOutline />} text={"Copiar Cupón"}/>
      </div>

      {(grow !== undefined) && 
        <LinkCard title="Ver pacientes" to={'/estadisticas/'+grow?.idgrow}>
          <p>Ver pacientes registrados con tu URL.</p>
        </LinkCard>
      }

      {(grow !== undefined) && 
        <LinkCard title="Detalles del Grow" to={'/detallesGrow/'+grow?.idgrow}>
          <p>Consulta los detalles de tu Grow.</p>
        </LinkCard>
      }

        <LinkCard show={false} title="Tramita tu Reprocann" to={'/turno'}>
          <p>Saca turno e inicia tu tramite.</p>
        </LinkCard>

        <LinkCard title="Contenido para tus redes" link='https://drive.google.com/drive/folders/1kphNCawnDHNiVBxg1FCY9xIPkzwciybd'>
          <p>Comparte contenido junto a tu Link</p>
        </LinkCard>
      </div>      

      <div className='panel-button mx-auto p-3 text-center'>
          <button className="panel-cerrar-sesion display-cel" onClick={() => logout()} >Cerrar Sesión</button>
      </div>
      
      <NotificacionEmergente show={mostrarNotificacion} setShow={setMostrarNotificacion} text={textoNotificacion}/>
  
  </div>

  <div style={{minHeight:'50px'}}>
      <Nav idgrow={grow?.idgrow} />
  </div>


          {/* ELEMENTO DE QR OCULTO PARA COPIAR Y DESCARGAR */}
          <div style={{display:'none'}}>
            <QRCodeLogo
              value={'www.doconlineargentina.com/turnero/login/'+growDetails?.cod_desc}          
              size={500}
  
              enableCORS={true}     
              id={"qr-code-logo"}
            />
          </div>
  </>);
}