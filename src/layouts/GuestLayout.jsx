import { Outlet } from "react-router-dom"

function GuestLayout() {
    return (
        <div className="md:min-h-screen bg-gradient-to-bl from-grad-blue to-grad-green">
            <div className="flex h-screen items-center justify-center">
                <div className="max-w-sm p-6 bg-white rounded-md overflow-hidden shadow-lg w-80">
                    
                <Outlet />
                </div>
            </div>
            
        </div>
    )
}

export default GuestLayout