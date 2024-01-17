import './info.css';
import { BsInfoCircle } from "react-icons/bs";


function Info (props){
  return (
    <div className="info-container">
      <p className="info-text" style={props.fontSize ? {fontSize:props.fontSize} : {fontSize:'16px'}}><BsInfoCircle className="info-icon"/>{props.text}</p>
    </div>
  );
}

export default Info;