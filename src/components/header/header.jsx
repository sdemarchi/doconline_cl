import './header.css';
import { AiOutlineQuestionCircle } from "react-icons/ai";
import WhiteLogo from "../../assets/logo-blanco.png";
import { Link } from 'react-router-dom';


function Header(){
  return(
    <div className="header-container">

      <Link to="/panel" className="header-logo">
        <img className="header-logo-image" src={WhiteLogo}></img>
      </Link>

      <div className="header-help">
        <Link to="/ayuda" className="header-help-content"><AiOutlineQuestionCircle className="header-help-icon"/><span className="header-help-text">Ayuda</span></Link>
      </div>
      
    </div>
  );
}

export default Header;