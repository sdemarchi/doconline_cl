import "./wsp-boton.css";

function WspBoton(){
  const wspLink = "https://api.whatsapp.com/send/?phone=5493425319488&text&type=phone_number&app_absent=0";

  return (
    <div className="wsp-boton-contenedor">
      <img onClick={() => {window.open(wspLink)}} className="wsp-icon" src="https://i.postimg.cc/Dwr0RGPv/1490889687-whats-app-82529.png"/>
    </div>
  );
}

export default WspBoton;