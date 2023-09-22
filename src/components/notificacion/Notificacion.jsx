import  { useState, useEffect } from "react";
import "./Notificacion.css";

const Notificacion = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`notification ${visible ? "visible" : ""}`}>
      {message}
    </div>
  );
};

export default Notificacion;
