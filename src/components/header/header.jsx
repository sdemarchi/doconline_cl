import './header.css';
import { AiOutlineQuestionCircle } from "react-icons/ai";
import WhiteLogo from "../../assets/logo-blanco.png";
import { Link } from 'react-router-dom';
import logoAzul from '../../assets/logo-azul.webp';
import { useEffect } from 'react';
import { useState} from 'react';


function Header(props){
  const wspLink = "https://api.whatsapp.com/send/?phone=5493425319488&text&type=phone_number&app_absent=0";
  const [ grow , setGrow ] = useState();
  const [ textoGrow, setTextoGrow ] = useState("Tu Grow");


  useEffect(()=>{
    const grow_ = JSON.parse(sessionStorage.getItem('user-grow')); 
    setGrow(grow_);
    setTextoGrow(grow_?.tipo_id == 2 ? "Tu ONG": "Tu Grow" );
    console.log('grow',grow_);
  },[props.user]);


  return(
    <div className="header-container">
      <Link to="/panel" className="header-logo">
        <img className="header-logo-image display-cel" src={WhiteLogo}></img>

        <div className="header-logo-container display-pc">
          <img className="header-logo-image-pc"src={logoAzul}/>
          <div className='header-logo-text-pc'>
            <p className="doc">Doc.</p>
            <p className="online">Online</p>
          </div>
        </div>

      </Link>

      <div className="header-help display-cel">
        <button onClick={() => {window.open(wspLink)}} className="header-help-content"><AiOutlineQuestionCircle className="header-help-icon"/><span className="header-help-text">Ayuda</span></button>
      </div>
      
      <div className="header-nav">
        {grow?.idgrow && <Link to={'/tu-grow/'+ grow?.idgrow} className="header-nav-button">{textoGrow}</Link>}
        <Link to='/panel' className="header-nav-button">{grow?.idgrow ?"Turno" : "Inicio"}</Link>
        <button onClick={() => {window.open(wspLink)}} className="header-nav-button" style={{fontWeight:'500',fontSize:'15px'}}>Contactanos</button>
      </div>

      <Link to='/login' className="header-salir-button display-pc">Salir</Link>

    </div>
  );
}

export default Header;