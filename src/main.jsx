import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Panel from './pages/Panel.jsx'
import FormRep1 from './pages/FormRep1'
import FormRep2 from './pages/FormRep2'
import FormRep3 from './pages/FormRep3'
import FormRep4 from './pages/FormRep4'
import FormRep5 from './pages/FormRep5'
import Patologia from './pages/Patologia'
import FormTutor1 from './pages/FormTutor1'
import FormTutor2 from './pages/FormTutor2'
import FormSuccess from './pages/FormSuccess'
import Turnos from './pages/Turnos'
import Pagos from './pages/Pagos'
import TurnoConf from './pages/TurnoConf'
import TurnoSuccess from './pages/TurnoSuccess'
import { AuthProvider } from './context/AuthProvider'
import GuestLayout from './layouts/GuestLayout'
import MainLayout from './layouts/MainLayout.jsx'
import { action as registerAction } from './pages/Register'
import { action as gRegisterAction } from './pages/GoogleRegister'
import { TurnoProvider } from './context/TurnoProvider'
import PagoMl from './pages/PagoMl'
import PagoTransf from './pages/PagoTransf'
import { FormProvider } from './context/FormProvider'
import { GoogleOAuthProvider } from '@react-oauth/google';
import FormRep3b from './pages/FormRep3b'
import FormError from './pages/FormError'
import GoogleRegister from './pages/GoogleRegister'

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/registrarme',
        action: registerAction,
        element: <Register />
      },
      {
        path: '/g-perfil',
        action: gRegisterAction,
        element: <GoogleRegister />
      },
    ],

  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
       {
        path: '/panel',
        element: <Panel />
      },
      {
        path: '/formulario-1',
        element: <FormRep1 />
      },
      {
        path: '/formulario-2',
        element: <FormRep2 />
      },
      {
        path: '/formulario-3',
        element: <FormRep3 />
      },
      {
        path: '/formulario-3b',
        element: <FormRep3b />
      },
      {
        path: '/formulario-4',
        element: <FormRep4 />
      },
      {
        path: '/formulario-5',
        element: <FormRep5 />
      },
      {
        path: '/patologia',
        element: <Patologia />
      },
      {
        path: '/tutor-1',
        element: <FormTutor1 />
      },
      {
        path: '/tutor-2',
        element: <FormTutor2 />
      },
      {
        path: '/form-success',
        element: <FormSuccess />
      },
      {
        path: '/form-error',
        element: <FormError />
      },
      
      {
        path: '/turno',
        element: <Turnos />
      },
      {
        path: '/pagos',
        element: <Pagos />
      },
      {
        path: '/pagoMl',
        element: <PagoMl />
      },
      {
        path: '/pagoTransf',
        element: <PagoTransf />
      },
      {
        path: '/turno-conf',
        element: <TurnoConf />
      },
      {
        path: '/turno-success',
        element: <TurnoSuccess />
      },
    ]
  }
],  { basename: "/turnero" })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="783828474316-nv3fllvcjp6elnc34fa1f1llr3rl0q3g.apps.googleusercontent.com">
      <AuthProvider>
        <TurnoProvider>
          <FormProvider>
            <RouterProvider router={router} />
          </FormProvider>
        </TurnoProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
