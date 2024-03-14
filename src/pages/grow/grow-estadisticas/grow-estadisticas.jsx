import {CustomSelect} from '../../../components/select/Select';
import './grow-estadisticas.css';
import Card from '../../../components/card/card';
import { LinkButtonCenter } from '../../../components/Buttons';
import Spinner from '../../../components/Spinner';
import { useState,useEffect } from 'react';
import Bubble from '../../../components/bubble/bubble';
import { useParams } from 'react-router-dom';
import { getGrowPacientes } from '../../../data/grows';
import Nav from '../../../components/nav/nav';
import Title from '../../../components/title/title';

function GrowEstadisticas(){
  const [ mesActual, setMesActual ] = useState(new Date().getMonth() + 1); 
  const { id } = useParams();
  const [ growPacientes , setGrowPacientes ] = useState({}); //eslint-disable-line
  const [ datosCargados , setDatosCargados ] = useState(false);
  const [ pagaron , setPagaron ] = useState(0);
  const [ pacientesMes, setPacientesMes ] = useState([]);

  const obtenerNombresMeses = () => {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const mesActualIndex = new Date().getMonth();
    const nombresMeses = [];
  
    for (let i = 0; i < 3; i++) {
      const indice = (mesActualIndex - i + 12) % 12;
      const numeroMes = (mesActualIndex - i + 12) % 12 + 1;
      nombresMeses.push({ id: numeroMes, nombre: meses[indice] });
    }
  
    return nombresMeses;
  };

 const datos = obtenerNombresMeses();

 const seleccionarMes = (e) => {
    setMesActual(e.target.value);
    filtrarPacientes(growPacientes,e.target.value);
 };

  const filtrarPacientes = (pacientes,mes) => {
    var pagaronContador = 0;
    const pacientesMesSeleccionado = [];
    pacientes?.forEach((paciente) => {
      const fechaPaciente = new Date(paciente.fecha);
      const mesPaciente = fechaPaciente.getMonth() + 1;
      const añoPaciente = fechaPaciente.getFullYear();
      const añoActual = new Date().getFullYear();
      
      if((mesPaciente == mes && añoPaciente == añoActual) || (mesPaciente == mes && añoPaciente == añoActual -1)){
          pacientesMesSeleccionado.push(paciente);
          if(paciente.pago){
            pagaronContador +=1;
          }
      }

      });
     // alert(pagaronContador)
      setPagaron(pagaronContador);
      setPacientesMes(pacientesMesSeleccionado);

    return;
  };

  useEffect(()=>{
    const getPacientes = () => {
      if(id){
        getGrowPacientes(id).then((response)=>{
          setGrowPacientes(response.pacientes);
          filtrarPacientes(response.pacientes,mesActual);
          setDatosCargados(true);
        });
      }
    }

    getPacientes();
  },[id]); //eslint-disable-line


  return(
    <>
    { datosCargados ? 
    <div className="grow-estadisticas-container page">
      <Title>Tus estadisticas</Title>
      

      <Card title="Seleccionar mes">
        <CustomSelect value={mesActual} datos={datos} onChange={(e)=>seleccionarMes(e)}></CustomSelect>
      </Card>

      <Card title={pacientesMes?.length > 0 ? "Pacientes del mes ("+pacientesMes?.length+")" : "Pacientes del mes"}>

      {pacientesMes?.map((paciente,key) => (
        <div key={key} className="ge-paciente">
          <span className="ge-paciente-nombre">{paciente.nombre}</span>
          <span className="ge-paciente-pago">{paciente.pago && 'pago'}</span>
        </div>
      ))}

      {pacientesMes?.length === 0 && <p className="mt-2">No hay pacientes registrados para este mes</p>}
      </Card>

      <Card title="Estadisticas del mes">
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
          <Bubble content={pacientesMes.length} description='Clientes'></Bubble>
          <Bubble content={pagaron} description="Pagaron"></Bubble>
          <Bubble content={pacientesMes.length - pagaron} description="No pagaron"></Bubble>
        </div>
      </Card>
      {false && <div style={{marginTop:'25px'}}>
        <LinkButtonCenter value="Volver" to={"/tu-grow/"+id}></LinkButtonCenter>
      </div>}
    </div>:
    <div className="grow-estadisticas-container"> <Spinner/></div>
    }
    <div style={{minHeight:'50px'}}>
      <Nav idgrow={id}/>
    </div>
    </>
  );
}

export default GrowEstadisticas;