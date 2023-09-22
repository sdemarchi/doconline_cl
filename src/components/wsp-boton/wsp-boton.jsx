import "./wsp-boton.css";

function WspBoton(props){
  const wspLink = "https://api.whatsapp.com/send/?phone=5493425319488&text&type=phone_number&app_absent=0";
  const wspStyle = props.bottom ? {bottom: props.bottom} : {}
  return (
    <div className="wsp-boton-contenedor" style={wspStyle}>
      <img onClick={() => {window.open(wspLink)}} className="wsp-icon" src="https://i.postimg.cc/Dwr0RGPv/1490889687-whats-app-82529.png"/>
    </div>
  );
}

export default WspBoton;