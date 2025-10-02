import './grow-estadisticas.css';
import { LinkButtonCenter } from '../../../components/Buttons';
import Spinner from '../../../components/Spinner';
import { useState, useEffect } from 'react';
import { ONGService } from '../../../data/grows';
import Nav from '../../../components/nav/nav';
import Title from '../../../components/title/title';
import TableCard from '../../../components/table-card/table-card';
import { FiFileText } from "react-icons/fi";
import CifradoHelper from '../../../utils/CifradoHelper';
import LinkCard from '../../../components/link-card/link-card';
import MensajeConfirmacion from '../../../components/mensajeConfirmacion/mensajeConfirmacion';
import { eliminarPacienteONG } from '../../../data/pacientes';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function EstadisticasONG(){
  const [ pacientesONG , setPacientesONG ] = useState([]); // eslint-disablse-line
  const [ datosCargados , setDatosCargados ] = useState(false);
  const [ modoEdicion , setModoEdicion ] = useState(false);
  const [ mostrarConfirmacionDesvincular , setMostrarConfirmacionDesvincular ] = useState(false);
  const [ pacienteSeleccionado , setPacienteSeleccionado ] = useState(null);
  const navigate = useNavigate();

  const grow = JSON.parse(sessionStorage.getItem('user-grow'));
  const urlApi = import.meta.env.VITE_API_URL; 

  const abrirConsentimiento = paciente => {
    window.open(urlApi + "/paciente/consentimiento/" + CifradoHelper.cifrar(paciente.id) , "_blank");
  }

  const abrirDeclaracionJurada = paciente => {
    window.open(urlApi + "/paciente/declaracion/" + CifradoHelper.cifrar(paciente.id) , "_blank");
  }

  const confirmarDesvincularPaciente = paciente => {
    setPacienteSeleccionado(paciente);
    setMostrarConfirmacionDesvincular(true);
  }

  const desvincularPaciente = () => {
    const idPaciente = pacienteSeleccionado?.id;

    if(idPaciente){
      eliminarPacienteONG(idPaciente).then(() => {
        getPacientes();
      });
    }else{
      console.error("No se pudo desvincular el paciente: ID no encontrado.");
    }
  }

  const handleEditarPaciente = paciente => {
    setPacienteSeleccionado(paciente);
    navigate("/editar-paciente-ong/"+CifradoHelper.cifrar(paciente.id))
  }

  const mostrarAccionSi = paciente => {
    return paciente.id != null;
  }
  
  let accionesTablaDefault = [
    { titulo: "DDJJ", icono: <FiFileText />, accion: abrirDeclaracionJurada, posicion: 5, mostrar: mostrarAccionSi },
    { titulo: "CIB", icono: <FiFileText />, accion: abrirConsentimiento, posicion: 6, mostrar : mostrarAccionSi }
  ];

  const [ accionesTabla , setAccionesTabla ] = useState(accionesTablaDefault); //eslint-disablse-line

  const toggleModoEdicion = () => {
    setModoEdicion(prevModo => {
      const nuevoModo = !prevModo;

      // Creamos un array nuevo para no mutar el original
      let accionesModoEdicion = [
        {
          titulo: "", icono: <FaEdit size={17} style={{margin:"0", color: "#1D1D1D" }} />,
          accion: handleEditarPaciente, posicion: 1, mostrar: () => true, padding: "8px"
        },
        {
          titulo: "", icono: <MdDeleteOutline size={20} style={{ margin:"0", color: "#1D1D1D" }} />,
          accion:  confirmarDesvincularPaciente , posicion: 2, mostrar: () => true, padding: "8px"
        }
      ];

      if (nuevoModo) {
        setAccionesTabla(accionesModoEdicion);

      }else{
        setAccionesTabla(accionesTablaDefault);
      }

      return nuevoModo;
    });
  };


  const prepararDatosParaTabla = (json) => {
    if (!json || json.length === 0) return [[]]; // vacío pero no rompe
    const headers = Object.keys(json[0]);
    const rows = json.map(item => headers.map(h => item[h]));
    return [headers, ...rows];
  };


  const getPacientes = () => {
    setDatosCargados(false);

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
      <MensajeConfirmacion
        mensaje="¿Está seguro que desea eliminar este paciente?"
        mostrarSi={mostrarConfirmacionDesvincular}
        onAceptar={() => {
          desvincularPaciente();
          setMostrarConfirmacionDesvincular(false); 
        }}

        onCancelar={() => setMostrarConfirmacionDesvincular(false)}
      />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "5px",}}>
        <Title>Tus pacientes</Title>
        <button onClick={toggleModoEdicion} className="ong-estadisticas-editar">{modoEdicion ? "Listo" : "Editar"}</button>
      </div>

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