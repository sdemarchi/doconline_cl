import { createContext, useState } from 'react'
import { guardarFormulario } from '../data/pacientes'

const FormContext = createContext()

const FormProvider = ({children}) => {

    const [ form1, setForm1 ] = useState({})  
    const [ form2, setForm2 ] = useState({})  
    const [ form3, setForm3 ] = useState({})  
    const [ form3b, setForm3b ] = useState({})  
    const [ patolog, setPatolog ] = useState([])
    
    const [ tut1, setTut1 ] = useState({})  
    const [ tut2, setTut2 ] = useState({})  
    
    const [ firma, setFirma] = useState()
    const [ aclaracion, setAclaracion ] = useState()

    const [ provActual, setProvActual ] = useState(0)
    const [ provTutActual, setProvTutActual ] = useState(0)
    const [ ocupacionActual, setOcupacionActual ] = useState(0)
    const [ contactoActual, setContactoActual ] = useState(0)

    async function enviarFormulario(strFirma,strAclaracion){
        const formulario = {part1: form1, part2: form2, part3: form3, 
                            part3b: form3b, tut1: tut1, tut2: tut2, 
                            patologias: patolog,
                            firma: strFirma, aclarac: strAclaracion}
        console.log(formulario)
        const resp = await guardarFormulario(formulario)
        return resp
    }
    
    return(
        <FormContext.Provider value={{ form1, setForm1, form2, setForm2, form3, setForm3, 
                                        form3b, setForm3b, tut1, setTut1, tut2, setTut2,
                                        patolog, setPatolog, provActual, setProvActual,
                                        provTutActual, setProvTutActual, 
                                        ocupacionActual, setOcupacionActual,
                                        contactoActual, setContactoActual,
                                        firma, setFirma, aclaracion, setAclaracion,
                                        enviarFormulario }}>
            {children}
        </FormContext.Provider>
    )
}

export { FormProvider }
export default FormContext