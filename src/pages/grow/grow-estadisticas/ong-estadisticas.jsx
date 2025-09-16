import './grow-estadisticas.css';
import { LinkButtonCenter } from '../../../components/Buttons';
import Spinner from '../../../components/Spinner';
import { useState,useEffect } from 'react';
import { ONGService } from '../../../data/grows';
import Nav from '../../../components/nav/nav';
import Title from '../../../components/title/title';
import TableCard from '../../../components/table-card/table-card';
import { FiFileText } from "react-icons/fi";
import CifradoHelper from '../../../utils/CifradoHelper';
import LinkCard from '../../../components/link-card/link-card';

function EstadisticasONG(){
  const [ pacientesONG , setPacientesONG ] = useState([]); //eslint-disablse-line
  const [ datosCargados , setDatosCargados ] = useState(false);
  const grow = JSON.parse(sessionStorage.getItem('user-grow'));
  const urlApi = import.meta.env.VITE_API_URL; 

  const abrirConsentimiento = paciente => {
    window.open(urlApi + "/paciente/consentimiento/" + CifradoHelper.cifrar(paciente.id) , "_blank");
  }

  const abrirDeclaracionJurada = paciente => {
     window.open(urlApi + "/paciente/declaracion/" + CifradoHelper.cifrar(paciente.id) , "_blank");
  }

  const mostrarAccionSi = paciente => {
    return paciente.id != null;
  }
  
  const accionesTabla = [
    { titulo: "DDJJ", icono: <FiFileText />, accion: abrirDeclaracionJurada, posicion: 4, mostrar: mostrarAccionSi },
    { titulo: "CIB", icono: <FiFileText />, accion: abrirConsentimiento, posicion: 5, mostrar : mostrarAccionSi }
  ];


  const prepararDatosParaTabla = (json) => {
    if (!json || json.length === 0) return [[]]; // vacío pero no rompe
    const headers = Object.keys(json[0]);
    const rows = json.map(item => headers.map(h => item[h]));
    return [headers, ...rows];
  };


  const getPacientes = () => {
    if(grow.idgrow){
      ONGService.getPacientesONG(grow.idgrow)
      .then((resp)=>{
        if(!resp || resp.length == 0){
          setDatosCargados(true);
          return;
        }
        setPacientesONG(prepararDatosParaTabla(resp));
        setDatosCargados(true);
      }).catch(()=>{
        setDatosCargados(false);
      });
    }
  }



  useEffect(()=>{
    getPacientes();
  },[]); //eslint-disable-line


  return(
    <>
    { datosCargados ? 
    <div className="grow-estadisticas-container page">
      <Title>Tus pacientes</Title>
      <TableCard
              data={pacientesONG}
              acciones={accionesTabla}
              responsive={true}
              animate={true}
              ocultarColumnas={["id"]}
              mensajeTablaVacia='Registra un paciente para verlo en el listado.'
            />
      {false && <div style={{marginTop:'25px'}}>
        <LinkButtonCenter value="Volver" to={"/tu-grow/"}></LinkButtonCenter>
      </div>}
  
      <LinkCard show={datosCargados} title="Registra un paciente" to="/registrar-paciente-ong">
        <p>Registra un paciente para que pueda acceder al trámite.</p>
      </LinkCard>
    </div>:
    <div className="grow-estadisticas-container"><Spinner/></div>
    }
    <div style={{minHeight:'50px'}}>
      <Nav idgrow={grow.idgrow}/>
    </div>
    </>
  );
}

export default EstadisticasONG;