export async function restablecer(datos) {
    console.log('post: restablecer');
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
        console.log(resp)
        return resp;
  
    } catch (error) {
        console.log(error)
    }
  }

  export async function restablecerSendMail(email) {
    console.log('post: restablecer');
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
        console.log(resp)
        return resp;
  
    } catch (error) {
        console.log(error)
    }
  }
  
  