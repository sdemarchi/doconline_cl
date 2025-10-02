import React from "react";
import "./mensajeConfirmacion.css"; // vamos a definir los estilos aparte

export default function MensajeConfirmacion({
  mensaje = "¿Estás seguro?",
  onAceptar = () => {},
  onCancelar = () => {},
  mostrarSi = false,
  mostrarCancelar = true
}) {
  return (
    mostrarSi &&
    <div className="mensaje-confirmacion-overlay">
      <div className="mensaje-confirmacion-card card-container animation-card">
        <p className="card-title card-title-center">{mensaje}</p>
        <div className="mensaje-confirmacion-botones">
          <button
            onClick={onAceptar}>
            Aceptar
          </button>
            {mostrarCancelar && <button
                className="mensaje-confirmacion-cancelar"
                onClick={onCancelar}>
            Cancelar
          </button>}
        </div>
      </div>
    </div>
  );
}
