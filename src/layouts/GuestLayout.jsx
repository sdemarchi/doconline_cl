import { Outlet } from "react-router-dom";
import './Layouts.css';

function GuestLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-bl from-grad-blue to-grad-green overflow-y-auto flex items-center justify-center layout-container ">
            <div className="layout-content flex items-center justify-center">
                <div className="login-container bg-white rounded-md shadow-lg w-80">
                <Outlet />
                </div>
            </div>
        </div>
    )
}

export default GuestLayout