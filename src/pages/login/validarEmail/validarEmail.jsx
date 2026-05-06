import Card from "../../../components/card/card.jsx";
import { Input } from "../../../components/FormInput.jsx";
import { useLocation } from 'react-router-dom';
import './validarEmail.css';
import { ActionButton } from "../../../components/Buttons.jsx";

export default function ValidarEmail() {
   const location = useLocation();
    const email = location.state?.email;
  
  return (
         <div className="page-container">
            <div className="page" >
              <div className="validar-email-container">

                <Card style={{ width: '700px'}}> 
                  <h2>Validá tu Email</h2>
                    <p>
                      Enviamos un correo de verificación a <strong>{email}</strong>.
                      Revisá tu bandeja de entrada y seguí las instrucciones. <br></br>
                    </p>

                    <ActionButton value="Reenviar correo"/>                    
                    
                </Card>
              </div>
            </div>
         </div>
  );
}