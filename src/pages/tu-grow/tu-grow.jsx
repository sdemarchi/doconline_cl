import Card from '../../components/card/card';
import Title from '../../components/title/Title';
import Nav from '../../components/nav/nav';
import LinkCard from '../../components/link-card/link-card';
import { useParams } from 'react-router-dom';
import ColorCard from '../../components/color-card/color-card';
import './tu-grow.css';
import { useEffect } from 'react';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function TuGrow(){
  const idgrow = useParams('id');
  const [ grow , setGrow ] = useState();
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    sessionStorage.clear();
    return navigate('/login');
}

  useEffect(()=>{
    const grow_ = JSON.parse(sessionStorage.getItem('user-grow'));
    setGrow(grow_);
  },[]);

  return(
  <>
  <div className="tg-container"> 
    <ColorCard color1="#009FD2" color2="#CE9CEE">
      <h2 className="tg-grow-name">{grow?.nombre}</h2>
      <p className="tg-grow-description">Puedes ver los datos y estadisticas de tu grow</p>
    </ColorCard>

    {(grow !== undefined) && 
      <LinkCard title="Ver pacientes" href={'/estadisticas/'+grow?.idgrow}>
        <p>Ver pacientes registrados con tu URL.</p>
      </LinkCard>
    }

    {(grow !== undefined) && 
      <LinkCard title="Detalles del Grow" href={'/detallesGrow/'+grow?.idgrow}>
        <p>Consulta o edita los detalles de tu Grow.</p>
      </LinkCard>
    }

      <LinkCard title="Tramita tu Reprocann" href={'/turno'}>
        <p>Saca turno e inicia tu tramite.</p>
      </LinkCard>
             


  </div>
  
  <div style={{minHeight:'50px'}}>
      <Nav idgrow={grow?.idgrow} />
  </div>
  </>);
}