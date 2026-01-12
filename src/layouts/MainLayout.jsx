import { Outlet, Navigate } from "react-router-dom"
import useAuth from '../hooks/useAuth'
import Spinner from "../components/Spinner"


function MainLayout() {

    const { user, cargando } = useAuth()
    if(cargando){
        return(
            <div className="min-h-screen bg-gradient-to-bl from-grad-blue to-grad-green">
                <div className="flex h-screen items-center justify-center">
                    <div className="max-w-sm p-16 bg-white rounded-md overflow-hidden shadow-lg w-80">
                        
                    <Spinner/>
                    </div>
                </div>
            
            </div>
        )
        
    }
    if(!user.userId){
        return(<Navigate to="/login" />)
    }

    return (
        <div className="min-h-screen bg-gradient-to-bl from-grad-blue to-grad-green overflow-y-auto flex items-center justify-center">
            <div className="p-6 flex items-center justify-center">
                <div className="max-w-sm p-6 bg-white rounded-md shadow-lg w-80">
                <Outlet context={user}/>
                </div>
            </div>
        </div>
    )
}

export default MainLayout