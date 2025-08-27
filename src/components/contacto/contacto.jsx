import './contacto.css';
import { AiOutlineWhatsApp } from "react-icons/ai";

function Contacto(){
  const wspLink = "https://api.whatsapp.com/send/?phone=5493425319488&text&type=phone_number&app_absent=0";

  return(
    <button onClick={() => {window.open(wspLink)}} className="contacto-button">
      <AiOutlineWhatsApp className="contacto-icon"/> Contactanos
    </button>
  )
}

export default Contacto;