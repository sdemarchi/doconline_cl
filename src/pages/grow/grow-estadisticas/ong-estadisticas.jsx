import './grow-estadisticas.css';
import Card from '../../../components/card/card';
import { LinkButtonCenter } from '../../../components/Buttons';
import Spinner from '../../../components/Spinner';
import { useState,useEffect } from 'react';
import { ONGService } from '../../../data/grows';
import Nav from '../../../components/nav/nav';
import Title from '../../../components/title/title';
import TableCard from '../../../components/table-card/table-card';

function EstadisticasONG(){
  const [ pacientesONG , setPacientesONG ] = useState([]); //eslint-disablse-line
  const [ datosCargados , setDatosCargados ] = useState(true);

  const grow = JSON.parse(sessionStorage.getItem('user-grow'));

const prepararDatosParaTabla = (json) => {
  if (!json || json.length === 0) return [[]]; // vacío pero no rompe
  const headers = Object.keys(json[0]);
  const rows = json.map(item => headers.map(h => item[h]));
  return [headers, ...rows];
};

  const getPacientes = () => {
    if(grow.idgrow){
      ONGService.getPacientesONG(149)
      .then((resp)=>{
        setPacientesONG(prepararDatosParaTabla(resp));
        console.log(JSON.stringify(resp));
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
              responsive={true}
              animate={true}
            />
      {false && <div style={{marginTop:'25px'}}>
        <LinkButtonCenter value="Volver" to={"/tu-grow/"+grow.idgrow}></LinkButtonCenter>
      </div>}
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