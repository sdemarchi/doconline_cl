import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionButton } from '../../components/Buttons';
import useForm from '../../hooks/useForm';
import './formReprocann.css';
import Contacto from '../../components/contacto/contacto';
import Spinner from '../../components/Spinner';
import Info from '../../components/info/info';

function FormRep5() {

    const navigate = useNavigate();
    const { enviarFormulario } = useForm();
    const [ error, setError ] = useState('');
    const [ cargando, setCargando ] = useState(false);

    async function finalizar() {
       setCargando(true);
       const resp = await enviarFormulario();

        if (resp == 'error 500') {
            return navigate('/form-error');
        }
        if (resp == '') {
            return navigate('/form-success');
        } else {
            setCargando(false);
            setError(resp);
        }
    }

    return (
        <div className="form-rep-container page">
           <h3 className='text-gray-500 mb-3 text-xl font-semibold'>Finalizar</h3>
           { cargando ? <Spinner/> :
            <div className="form-rep-content form-rep-form">
                <Info text="Estás por enviar tus datos. Podrás modificarlos más adelante desde el botón “Editá tus datos”." fontSize="14px" style={{marginBottom:'20px'}}/>

                <div className='pt-6'>
                    <ActionButton onClick={() => finalizar()} value="Finalizar y Enviar" />
                </div>

                <div className='mb-0 mx-auto p-3 text-center'>
                    <button className='text-gray-500' onClick={() => navigate('/formulario-4')}>Atrás</button>
                </div>

                <div className="form-rep-contacto">
                    <Contacto />
                </div>
            </div>}
        </div>
    )
}

export default FormRep5