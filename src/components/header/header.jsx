import './header.css';
import { AiOutlineQuestionCircle } from "react-icons/ai";
import WhiteLogo from "../../assets/logo-blanco.png";
import { Link } from 'react-router-dom';


function Header(){
  const wspLink = "https://api.whatsapp.com/send/?phone=5493425319488&text&type=phone_number&app_absent=0";

  return(
    <div className="header-container">

      <Link to="/panel" className="header-logo">
        <img className="header-logo-image" src={WhiteLogo}></img>
      </Link>

      <div className="header-help">
        <button onClick={() => {window.open(wspLink)}} className="header-help-content"><AiOutlineQuestionCircle className="header-help-icon"/><span className="header-help-text">Ayuda</span></button>
      </div>
      
    </div>
  );
}

export default Header;