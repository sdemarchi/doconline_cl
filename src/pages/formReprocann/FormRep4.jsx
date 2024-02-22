import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
//import logo from '../assets/logo-doconline-reprocann-500.png'
import { LinkButton } from '../../components/Buttons';
import useForm from '../../hooks/useForm';
import { getDolencias } from '../../data/pacientes';
import Chip from '../../components/Chip';
import './formReprocann.css';
import Contacto from '../../components/contacto/contacto';
import Spinner from '../../components/Spinner';

function FormRep4() {
    const navigate = useNavigate()
    const { patolog, setPatolog }  = useForm()
    
    const [dolencias, setDolencias] = useState([])
    const [cargando, setCargando] = useState(true)
    
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const subirScroll = () =>{
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        subirScroll();
        async function cargarDolencias(){
            const response = await getDolencias();
            setDolencias(response);
            setCargando(false);
        }
        cargarDolencias();
    }, [cargando])
    
    function getNombre(id){
        let obj = dolencias.find(o => o.id == id);
        return obj?.nombre;
    }

    function quitarPatologia(index){
        let listaPatolog = patolog;
        listaPatolog.splice(index.index,1);
        setPatolog(listaPatolog);
        forceUpdate();
    }
    
    return (
        <div className="form-rep-container page">
            { cargando ? <Spinner/> : 
            <>
            <h3 className='text-gray-500 text-s font-semibold'>Patologías</h3>
            { patolog.map( (p, index) => (
                <Chip 
                    key={index}
                    value={getNombre(p.patolog_id)}
                    onClick={() => quitarPatologia({index})}
                />
            ))}


            <div className='mb-1 mx-auto pt-2 py-3 text-center'>
                <LinkButton to="/patologia" value="Agregar Patología" /> 
            </div>
            <div className='pt-2'>
                <LinkButton to="/formulario-5" value="Continuar" /> 
            </div>  
            <div className='mb-0 mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/formulario-3b')} >Atrás</button>
            </div>
            <div className="form-rep-contacto">
                <Contacto />
            </div>
            </>
            }
        </div>
    )
}

export default FormRep4