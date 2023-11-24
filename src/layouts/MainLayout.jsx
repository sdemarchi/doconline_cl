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
        <div className="background-image min-h-screen from-grad-blue bg-gradient-to-bl to-grad-blue overflow-y-auto flex items-center justify-center">
                <div className="layout-main-container">
                    <Header/>
                    <div className="layout-content">
                    <Outlet context={user}/>
                    </div>
                    {/*<WspBoton/>*/}
                </div>
        </div>
    )
}

export default MainLayout