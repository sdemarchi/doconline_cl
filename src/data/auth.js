export async function restablecer(datos) {
    const url = import.meta.env.VITE_API_URL + '/turnero.restablecer';
    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resp = await respuesta.json()
        return resp;
  
    } catch (error) {
        console.error(error)
    }
  }
  

  export async function restablecerSendMail(dni) {
    const url = import.meta.env.VITE_API_URL + '/turnero.restablecerSendMail';
    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({dni:dni}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resp = await respuesta.json()
        return resp;
  
    } catch (error) {
        console.error(error)
    }
}





export class AuthService{

    static CodigoRespuesta = {
        OK: 0,
        ERROR: 1,
        NO_VERIFICADO: 2 // No realizo la verificación por correo electrónico.
    }

    static urlBase(){
        return import.meta.env.VITE_API_URL;
    } 

    static async login(userid,password){
        const url = this.urlBase() + '/turnero.loginUser';

        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify({userid:userid, password:password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }


        static async loginEmail(userid,password){
        const url = this.urlBase() + '/turnero.loginEmail';

        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify({userid:userid, password:password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }


    static async enviarVerificacionEmail(email){
        const url = this.urlBase() + '/user/enviar-verificacion-email';

        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: email
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static async validarEmail(token){
        const url = this.urlBase() + '/user/validar-email';

        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                token: token
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


    static async loginConDni(dni) {
        const url = import.meta.env.VITE_API_URL + '/user/login-dni';
        try {
            const respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({dni:dni}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const resp = await respuesta.json()
            return resp;
    
        } catch (error) {
            console.error(error)
        }
    }


    static async loginConToken(token){
        const url = this.urlBase() + '/user/login-token';

        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                token: token
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

  