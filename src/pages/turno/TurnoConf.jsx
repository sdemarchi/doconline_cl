import { ActionButton } from '../../components/Buttons';
import ColorCard  from '../../components/color-card/color-card';
import FormInput from '../../components/FormInput'
import Title from '../../components/title/title';
import { confirmarTurno } from '../../data/turnero';
import { setGrowPaciente } from '../../data/pacientes';
import PagosService from '../../data/pagos';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './turno.css';

function TurnoConf() {
    const turno = JSON.parse(sessionStorage.getItem('turno')) || JSON.parse(localStorage.getItem('turno'));
    const pago = JSON.parse(sessionStorage.getItem('pago') || '{}');
    const userData = JSON.parse(sessionStorage.getItem('user_data'));
    const navigate = useNavigate();

    const guardarTurno = () => {
        const cuponSession = sessionStorage.getItem('cupon') || '';
        const comprobante = sessionStorage.getItem('comprobante');

        if(pago?.id){
            
            PagosService.setUtilizado(pago.id,true).then((resp)=>{
                console.log(resp);
                if(pago?.id_grow){
                    setGrowPaciente(userData.id,pago.id_grow);
                }
            })
        }
    
        confirmarTurno(turno, cuponSession, comprobante, pago.monto_final, userData.id).then((response)=>{
            console.log(response);
            if (response.error == 0) {
                return navigate('/turno-success');
            } 
        });
    }

    useEffect(()=>{
        if(pago?.comprobante){
            sessionStorage.setItem('comprobante', pago.comprobante);
        }
    },[]);

    return (
        <div className="turno-conf-container">
            <Title>Confirmar turno</Title>
            <ColorCard color1='#6BDF5B' color2='#60E94D'>
                <div className="turno-conf-pago">       
                    <p>Este turno ya ha sido pagado.</p>
                </div>
            </ColorCard>
        
            <div className="turno-conf-info">
                <p><strong>Prestador:</strong>Dr. Joaquin Jozami</p>
                <p><strong>Fecha:</strong>{turno.fecha}</p>
                <p><strong>Hora:</strong>{turno.hora}</p>
            </div>    

            <h6 className="text-gray-500 text-xs font-semibold">
                
            </h6>
            
            <div className='pt-2'><ActionButton value="Confirmar Turno" onClick={()=>guardarTurno()} /></div>
        </div>
    )
}

export default TurnoConf;