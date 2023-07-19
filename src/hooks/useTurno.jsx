import { useContext } from 'react'
import TurnoContext from '../context/TurnoProvider'

const useTurno = () => {
    return useContext(TurnoContext)
}

export default useTurno