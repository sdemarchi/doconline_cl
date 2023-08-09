import { createContext, useState } from 'react'
import { guardarFormulario, actualizarFormulario} from '../data/pacientes'

const FormContext = createContext()

const FormProvider = ({children}) => {

    const [ form1, setForm1 ] = useState({})  
    const [ form2, setForm2 ] = useState({})  
    const [ form3, setForm3 ] = useState({})  
    const [ form3b, setForm3b ] = useState({})  
    const [ patolog, setPatolog ] = useState([])

    const [ pacienteId, setPacienteId ] = useState(0)
    
    const [ tut1, setTut1 ] = useState({})  
    const [ tut2, setTut2 ] = useState({})  
    
    const [ firma, setFirma] = useState()
    const [ aclaracion, setAclaracion ] = useState()

    const [ provActual, setProvActual ] = useState(0)
    const [ provTutActual, setProvTutActual ] = useState(0)
    const [ ocupacionActual, setOcupacionActual ] = useState(0)
    const [ contactoActual, setContactoActual ] = useState(0)

    const [ formCargado, setFormCargado] = useState({})

    async function enviarFormulario(strFirma,strAclaracion){
        const formulario = {part1: form1, part2: form2, part3: form3, 
                            part3b: form3b, tut1: tut1, tut2: tut2, 
                            patologias: patolog,
                            firma: strFirma ? strFirma : firma, aclarac: strAclaracion ? strAclaracion : aclaracion}
        console.log(formulario)
        if(pacienteId > 0){
            const resp = await actualizarFormulario(pacienteId, formulario)
            return resp
        } else {
            const resp = await guardarFormulario(formulario)
            return resp
        }
       
    }

    const formatDate = (date) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    function llenarFormulario(form, patologias){
        console.log(form)
        
        setPacienteId(form.idpaciente)
        setForm1({
            nom_ape: form.nom_ape,
            fe_nacim: formatDate(form.fe_nacim),
            dni: form.dni,
            edad: form.edad,
            email: form.email,
            celular: form.celular,
            cod_vincu: form.cod_vincu,
        })
        setProvActual(form.idprovincia)
        setOcupacionActual(form.ocupacion_id)
        setForm2({
            localidad: form.localidad,
            domicilio: form.domicilio,
            cp: form.cp,
            osocial: form.osocial,
        })
        setForm3({
            arritmia: form.arritmia,
            alergia: form.alergia,
            embarazada: form.embarazada,
            salud_mental: form.salud_mental,
            salud_ment_esp: form.salud_ment_esp,
            maneja_maq: form.maneja_maq
        })
        setContactoActual(form.idcontacto)
        setForm3b({
            contacto_otro: form.contacto_otro,
            patologia: form.patologia,
            es_menor: form.es_menor
        })
        let pat = []
        patologias.map(( (p) => (
            pat.push({
                patolog_id: p.item,
                anio_aprox: p.anio_aprox,
                medicacion: p.medicacion,
                prob_trabajo: p.prob_trabajo,
                dolor_intensidad: p.dolor_intensidad,
                partes_cuerpo: p.partes_cuerpo,
                atenua_dolor: p.atenua_dolor
            })
        )))
        setPatolog(pat)
        console.log(pat)
        setTut1({
            tut_apeynom: form.tut_apeynom,
            tut_fe_nacim: formatDate(form.tut_fe_nacim),
            tut_tipo_nro_doc: form.tut_tipo_nro_doc,
            tut_mail: form.tut_mail,
            tut_tel_part: form.tut_tel_part,
            tut_tel_cel: form.tut_tel_cel
        })
        setTut2({
            tut_idprovincia: form.tut_idprovincia,
            tut_localidad: form.tut_localidad,
            tut_domicilio: form.tut_domicilio,
            tut_cp: form.tut_cp,
            tut_osocial: form.tut_osocial,
            tut_vinculo: form.tut_vinculo,
            tut_reg_fam: form.tut_reg_fam
        })
        setFirma(form.firma_v2)
        setAclaracion(form.aclaracion_v2)
    }
    
    return(
        <FormContext.Provider value={{  form1, setForm1, form2, setForm2, form3, setForm3, 
                                        form3b, setForm3b, tut1, setTut1, tut2, setTut2,
                                        patolog, setPatolog, provActual, setProvActual,
                                        provTutActual, setProvTutActual, 
                                        ocupacionActual, setOcupacionActual,
                                        contactoActual, setContactoActual,
                                        firma, setFirma, aclaracion, setAclaracion,
                                        enviarFormulario, formCargado, setFormCargado, 
                                        llenarFormulario
                                        }}>
            {children}
        </FormContext.Provider>
    )
}

export { FormProvider }
export default FormContext