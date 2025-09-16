import './nav.css';
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { IoStorefront } from "react-icons/io5";
import { HiUsers } from "react-icons/hi";
import { useState } from 'react';
import { useEffect } from 'react';
import CifradoHelper from '../../utils/CifradoHelper';

function Nav(props){
    const [ grow , setGrow ] = useState();

    useEffect(()=>{
      const grow_ = JSON.parse(sessionStorage.getItem('user-grow')); 
      setGrow(grow_);
    },[props.user]);

  return(
    <div className="nav-container">
      <Link to="/panel" className="nav-button selected"><AiFillHome className="nav-icon"/>Home</Link>

      <Link to={'/tu-grow'} className="nav-button-center">
        <IoStorefront className="nav-icon-center"/>{grow?.tipo_id == 2 ? "Tu ONG":"Tu grow"}
      </Link>

      <Link to={grow?.tipo_id == 1 ? '/estadisticas/'+CifradoHelper.cifrar(props.idgrow): '/estadisticas-ong'} className="nav-button"><HiUsers className="nav-icon"/>Pacien</Link>
    </div>
  );
}

export default Nav;