import { Outlet } from "react-router-dom";
import Header from "../components/header/header";


function RePassLayout() {

    return (
        <div className="background-image min-h-screen from-grad-blue bg-gradient-to-bl to-grad-blue overflow-y-auto flex items-center justify-center">
                <div className="layout-main-container">
                    <Header/>
                    <div className="layout-content">
                    <Outlet/>
                    </div>
                    {/*<WspBoton/>*/}
                </div>
        </div>
    )
}

export default RePassLayout