import { useState/*, useEffect, useCallback */} from 'react';
import { useNavigate } from 'react-router-dom';
//import logo from '../assets/logo-doconline-reprocann-500.png'
import { ActionButton, MiniActionButtonRed } from '../../components/Buttons';
import useForm from '../../hooks/useForm';
import SignatureCanvas from 'react-signature-canvas';
import { ErrorGral } from '../../components/Error';
import './formReprocann.css';
import Contacto from '../../components/contacto/contacto';

function FormRep5() {

    const navigate = useNavigate();
    const [signFirma, setSignFirma] = useState();
    const [signAclaracion, setSignAclaracion] = useState();
    const { firma, aclaracion, setFirma, setAclaracion, enviarFormulario } = useForm();
    const [error, setError] = useState('');


    async function finalizar() {
        let urlFirma = null;
        let urlAcl = null;

        if(firma == null){
            urlFirma = await signFirma.getTrimmedCanvas().toDataURL('image/png');
            setFirma(urlFirma);
        } 

        if(aclaracion == null){
            urlAcl = await signAclaracion.getTrimmedCanvas().toDataURL('image/png');
            setAclaracion(urlAcl);
        }

        const resp = await enviarFormulario(urlFirma, urlAcl);

        if (resp == 'error 500') {
            return navigate('/form-error');
        }
        if (resp == '') {
            return navigate('/form-success');
        } else {
            setError(resp);
        }
    }

    function handleClearFirma() {
        if(signFirma){
            signFirma.clear();
        }
        setFirma(null);
    }

    function handleClearAclaracion() {
        if(signAclaracion){
            signAclaracion.clear();
        }
        setAclaracion(null);
    }

    return (
        <div className="form-rep-container">
           {/* <img className="mb-8 mx-auto w-52 pb-2" src={logo}></img>*/}

            {error && <ErrorGral>{error}</ErrorGral>}

            <h3 className='text-gray-500 mb-3 text-xl font-semibold'>Firmas</h3>
            <h6 className="text-gray-500 text-xm font-semibold pt-2">Firma</h6>
            {firma != null ? <img src={firma} className='p-4' /> :
                <div style={{width:"fit-content", margin:"15px auto"}} className='border-gray-300 border border-solid mt-2'>
                    <SignatureCanvas
                        ref={data => setSignFirma(data)}
                        canvasProps={{ width: 270, height: 150, className: 'sigCanvas' }}
                        minWidth={0.7}
                        maxWidth={1.2}
                    />
                </div>}
            <div className='flex flex-row-reverse pt-1'>
                <MiniActionButtonRed onClick={() => handleClearFirma()} value="Limpiar" />
            </div>

            <h6 className="text-gray-500 text-xm font-semibold pt-2">Aclaración</h6>
            {aclaracion != null ? <img src={aclaracion} className='p-4' /> :
                <div style={{width:"fit-content",margin:"15px auto"}} className='border-gray-300 border border-solid mt-2'>
                    <SignatureCanvas
                        ref={data => setSignAclaracion(data)}
                        canvasProps={{ width: 270, height: 150, className: 'sigCanvas2' }}
                        minWidth={0.7}
                        maxWidth={1.2}
                />
                </div>}
           
            <div className='flex flex-row-reverse pt-1'>
                <MiniActionButtonRed onClick={() => handleClearAclaracion()} value="Limpiar" />
            </div>

            <div className='pt-6'>
                <ActionButton onClick={() => finalizar()} value="Finalizar y Enviar" />
            </div>

            <div className='mb-0 mx-auto p-3 text-center'>
                <button className='text-gray-500' onClick={() => navigate('/formulario-4')} >Atrás</button>
            </div>


            <div className="form-rep-contacto">
                <Contacto />
            </div>
        </div>
    )
}

export default FormRep5