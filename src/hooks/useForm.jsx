import { useContext } from 'react'
import FormContext from '../context/FormProvider'

const useForm = () => {
    return useContext(FormContext)
}

export default useForm