import { Outlet, Navigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import Spinner from "../components/Spinner";
import Header from "../components/header/header";


function MainLayout() {

    const { user, cargando } = useAuth()
    if(cargando){
        return(
            <div className="min-h-screen bg-gradient-to-bl from-grad-blue to-grad-green">
                    <div className="layout-main-container">
                    <Spinner/>
                    </div>
            </div>
        )
        
    }
    if(!user.userId){
        return(<Navigate to="/login" />)
    }

    return (
        <div className="layout-main-container">
            <Header/>
            <Outlet context={user}/>
        </div>
    )
}

export default MainLayout