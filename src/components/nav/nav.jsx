import './nav.css';
import { AiFillHome } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

function Nav(){
  return(
    <div className="nav-container">
      <Link to="/panel" className="nav-button selected"><AiFillHome className="nav-icon"/>Home</Link>
      <Link className="nav-button"><HiMenu className="nav-icon"/>Mas</Link>
      <Link className="nav-button"><BsFillPersonFill className="nav-icon"/>Perfil</Link>
    </div>
  );
}

export default Nav;