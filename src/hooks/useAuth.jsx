import { useContext } from 'react'
import AuhtContext from '../context/AuthProvider'

const useAuth = () => {
    return useContext(AuhtContext)
}

export default useAuth