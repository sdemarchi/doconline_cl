import { Outlet, Navigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import Spinner from "../components/Spinner";
import Header from "../components/header/header";
import { useEffect } from "react";


function MainLayout() {
    const { user, cargando } = useAuth();
    
    useEffect(()=>{
        console.log(JSON.stringify(user));
    },[]);


    if(cargando){
        return(
            <div className="layout-main-container page" style={{backgroundColor:'white'}}>
               <Spinner/>
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