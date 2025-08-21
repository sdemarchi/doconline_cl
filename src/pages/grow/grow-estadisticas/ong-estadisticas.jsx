import './grow-estadisticas.css';
import Card from '../../../components/card/card';
import { LinkButtonCenter } from '../../../components/Buttons';
import Spinner from '../../../components/Spinner';
import { useState,useEffect } from 'react';
import { getGrowPacientes } from '../../../data/grows';
import Nav from '../../../components/nav/nav';
import Title from '../../../components/title/title';
import TableCard from '../../../components/table-card/table-card';

function EstadisticasONG(){
  const [ mesActual, setMesActual ] = useState(new Date().getMonth() + 1); 
  const [ growPacientes , setGrowPacientes ] = useState({}); //eslint-disablse-line
  const [ datosCargados , setDatosCargados ] = useState(true);

  const datosEjemplo =[
  ["Nombre", "Edad", "Ciudad", "Ocupación", "Email", "Teléfono", "País", "Estado", "Código Postal", "Comentarios"], // encabezado
  ["Agu", 28, "Santa Fe", "Programador", "agu@mail.com", "342-5419964", "Argentina", "Santa Fe", "3000", "Sin comentarios"],
  ["Juan", 35, "Rosario", "Diseñador", "juan@mail.com", "341-1234567", "Argentina", "Santa Fe", "2000", "Prueba"],
  ["María", 22, "Buenos Aires", "Estudiante", "maria@mail.com", "11-7654321", "Argentina", "Buenos Aires", "1000", "Ninguno"],
  ["Lucía", 40, "Córdoba", "Abogada", "lucia@mail.com", "351-9876543", "Argentina", "Córdoba", "5000", "Observación"],
  ["Pedro", 30, "Mendoza", "Ingeniero", "pedro@mail.com", "261-1234567", "Argentina", "Mendoza", "5500", "Test de scroll"]
];

  const grow = JSON.parse(sessionStorage.getItem('user-grow'));

  const getPacientes = () => {
    if(grow.idgrow){
      getGrowPacientes(grow.idgrow).then((response)=>{
        setGrowPacientes(response.pacientes);
        filtrarPacientes(response.pacientes,mesActual);
        setDatosCargados(true);
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
              data={datosEjemplo}
              responsive={true}
              animate={true}
            />
      <Card title="">

      </Card>
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