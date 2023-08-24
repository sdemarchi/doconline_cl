import { Outlet } from "react-router-dom"

function GuestLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-bl from-grad-blue to-grad-green overflow-y-auto flex items-center justify-center">
            <div className="p-6 flex items-center justify-center">
                <div className="max-w-sm p-6 bg-white rounded-md shadow-lg w-80">
                <Outlet />
                </div>
            </div>
        </div>
    )
}

export default GuestLayout