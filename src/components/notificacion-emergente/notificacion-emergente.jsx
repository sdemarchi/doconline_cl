import  { useEffect } from "react";
import "./notificacion-emergente.css";

const NotificacionEmergente = (props) => {

  useEffect(() => {
  if(props.show === true){
    const timer = setTimeout(() => {
      props.setShow(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }
  }, [props.show]); //eslint-disable-line

  return (
<>
{  props.show && <div className="ne-container"> 
      <div className="ne-window">
        <p className="ne-text">{props.text}</p>
        <button className="ne-button">Ok</button>
      </div>
    </div>}

</>
  );
};

export default NotificacionEmergente;