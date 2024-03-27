import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import Panel from './pages/panel/Panel.jsx';

import FormRep1 from './pages/formReprocann/FormRep1';
import FormRep2 from './pages/formReprocann/FormRep2';
import FormRep3 from './pages/formReprocann/FormRep3';
import FormRep4 from './pages/formReprocann/FormRep4';
import FormRep5 from './pages/formReprocann/FormRep5';
import Patologia from './pages/patologias/Patologia';
import FormTutor1 from './pages/tutor/FormTutor1';
import FormTutor2 from './pages/tutor/FormTutor2';
import FormSuccess from './pages/formReprocann/FormSuccess';

import Turnos from './pages/turno/Turnos';
import Pagos from './pages/pagos/Pagos';
import TurnoConf from './pages/turno/TurnoConf';
import TurnoSuccess from './pages/turno/TurnoSuccess';
import { AuthProvider } from './context/AuthProvider';
import GuestLayout from './layouts/GuestLayout';
import MainLayout from './layouts/MainLayout.jsx';

import { TurnoProvider } from './context/TurnoProvider';
import PagoTransf from './pages/pagos/PagoTransf';
import FinalizarPago from './pages/pagos/finalizarPago/finalizarPago';
import { FormProvider } from './context/FormProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import FormRep3b from './pages/formReprocann/FormRep3b';
import FormError from './pages/formReprocann/FormError';
import GoogleRegister from './pages/register/GoogleRegister';
import Ayuda from './pages/ayuda/ayuda';
import Restablecer from './pages/restablecer/restablecer.jsx';
import FormPassword from './pages/restablecer/formPassword.jsx';
import RePassLayout from './layouts/RePassLayout.jsx';

import Regalar from './pages/regalar-tramite/regalar.jsx';
import RegalarTransf from './pages/regalar-tramite/regalar-transf/regalar-transf.jsx';
import RegalarPago from './pages/regalar-tramite/regalar-pago/regalar-pago.jsx';
import RegalarFinalizar from './pages/regalar-tramite/regalar-finalizar/regalar-finalizar.jsx';

import RegistrarGrow from './pages/grow/registrar-grow/registrar-grow.jsx';
import TuGrow from './pages/grow/tu-grow/tu-grow.jsx';
import GrowDetalles from './pages/grow/grow-detalles/growDetalles.jsx';
import GrowEstadisticas from './pages/grow/grow-estadisticas/grow-estadisticas.jsx';

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
        path: '/login/:grow',
        element: <Login />
      },
      {
        path: '/registrarme',
       // action: registerAction,
        element: <Register />
      },
      {
        path: '/g-perfil',
      //  action: googleRegisterAction,
        element: <GoogleRegister />
      }  
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
        path: '/pagoTransf',
        element: <PagoTransf />
      },
      {
        path: '/turno-conf',
        element: <TurnoConf />
      },      {
        path: '/finalizar-pago',
        element: <FinalizarPago />
      },
      {
        path: '/turno-success',
        element: <TurnoSuccess />
      },
      {
        path: '/regalar-a-un-amigo',
        element: <Regalar/>
      },      
      {
        path: '/regalar-transf',
        element: <RegalarTransf/>
      },      
      {
        path: '/regalar-pago',
        element: <RegalarPago/>
      },
      {
        path: '/regalar-finalizar/:codigo',
        element: <RegalarFinalizar/>
      },
      {
        path: '/ayuda',
        element:<Ayuda/>
      },
      {
        path: '/estadisticas/:id',
        element:<GrowEstadisticas/>
      },
      {
        path: '/detallesGrow/:id',
        element:<GrowDetalles/>
      },      {
        path: '/detallesGrow',
        element:<GrowDetalles/>
      },
      {
        path: '/tu-grow/:id',
        element:<TuGrow/>
      },
      {
        path: '/registrar-grow',
        element:<RegistrarGrow/>
      }
    ]
  }
  ,  {
    path: '/',
    element: <RePassLayout />,
    children: [
    {
      path: '/restablecer',
      element:<Restablecer/>
    },
    {
      path: '/restablecer-password/:t',
      element:<FormPassword/>
    }
  ]
}
],  

{ basename: "/turnero" })

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
