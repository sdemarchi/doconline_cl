import { createContext, useEffect, useState } from 'react'

const AuhtContext = createContext()

const AuthProvider = ({children}) => {

    const [cargando, setCargando] = useState(true)
    const [ user, setUser] = useState({})  
    const [ googleProfile, setGoogleProfile ] = useState({})
    const [ importe, setImporte] = useState(0)
    
    useEffect(() => {
        setCargando(true)
        if(!user.userId){
            const userId = localStorage.getItem('dc_userId')
            if(userId){
                const userName = localStorage.getItem('dc_userName')
                setUser({userId:userId, userName: userName})
            }
        }
        setCargando(false)
    })
    
    return(
        <AuhtContext.Provider value={{ user, setUser, cargando, googleProfile, setGoogleProfile,
                                        importe, setImporte }}>
            {children}
        </AuhtContext.Provider>
    )
}

export { AuthProvider }
export default AuhtContext