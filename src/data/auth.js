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
  

  export async function restablecerSendMail(email) {
    const url = import.meta.env.VITE_API_URL + '/turnero.restablecerSendMail';
    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({email:email}),
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


export async function login(userid,password){
    return await fetch(url, {
            method: 'POST',
            body: JSON.stringify({userid:userid, password:password}),
            headers: {
                'Content-Type': 'application/json'
            }
    })
}

export class AuthService{
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
}

  