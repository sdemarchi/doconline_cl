import { createContext, useState } from 'react'

const TurnoContext = createContext()

const TurnoProvider = ({children}) => {

    const [ turno, setTurno ] = useState({})
    const [ cuponValidado, setCuponValidado ] = useState({cupon: '', importe:0})  
    const [ comprobante, setComprobante ] = useState('') 
    
    
    
    return(
        <TurnoContext.Provider value={{ turno, setTurno, cuponValidado, setCuponValidado, comprobante, setComprobante }}>
            {children}
        </TurnoContext.Provider>
    )
}

export { TurnoProvider }
export default TurnoContext