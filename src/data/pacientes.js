
export async function perfil(id) {
    const url = import.meta.env.VITE_API_URL + '/profile/' + id
    const response = await fetch(url)
    const result = await response.json()
    //const jsonString = JSON.stringify(result);

    sessionStorage.setItem('dni',result.dni);
    sessionStorage.setItem('fecha_nac',result.fecha_nac);
    sessionStorage.setItem('dni',result.dni);
    sessionStorage.setItem('nombre',result.nombre);
    sessionStorage.setItem('telefono',result.telefono);
    sessionStorage.setItem('email',result.email);

    return result
}

export async function registrar(paciente) {
    console.log('post: perfil');
    const url = import.meta.env.VITE_API_URL + '/turnero.register'
    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(paciente),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resp = await respuesta.json()
        console.log(resp)
        return resp
        //console.log(resp)
    } catch (error) {
        console.log(error)
    }
}

export async function registrarGoogle(paciente) {
    const url = import.meta.env.VITE_API_URL + '/turnero.registerGoogle'
    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(paciente),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resp = await respuesta.json()
        console.log(resp)
        return resp
        //console.log(resp)
    } catch (error) {
        console.log(error)
    }
}

export async function descargarFormulario(dni){
    const url = import.meta.env.VITE_API_URL + '/formulario/' + dni
    console.log(url)
    try {
        const respuesta = await fetch(url)
        const resp = await respuesta.json()
        return resp
    } catch (error) {
        console.log(error)
    }
}

export async function guardarFormulario(form) {
    const url = import.meta.env.VITE_API_URL + '/formulario'
    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const status = respuesta.status
        if(status == 500) return 'error 500'
        const resp = await respuesta.json()
        if(resp.code == 0){
            return ''
        } else {
            return resp.message
        }
    } catch (error) {
        console.log(error)
    }
}

export async function actualizarFormulario(id, form) {
    const url = import.meta.env.VITE_API_URL + '/formulario/' + id
    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const status = respuesta.status
        if(status == 500) return 'error 500'
        const resp = await respuesta.json()
        if(resp.code == 0){
            return ''
        } else {
            return resp.message
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProvincias(){
    const url = import.meta.env.VITE_API_URL + '/provincias'
    try {
        const respuesta = await fetch(url)
        const resp = await respuesta.json()
        return resp
    } catch (error) {
        console.log(error)
    }
}

export async function getContactos(){
    const url = import.meta.env.VITE_API_URL + '/contactos'
    try {
        const respuesta = await fetch(url)
        const resp = await respuesta.json()
        return resp
    } catch (error) {
        console.log(error)
    }
}

export async function getOcupaciones(){
    const url = import.meta.env.VITE_API_URL + '/ocupaciones'
    try {
        const respuesta = await fetch(url)
        const resp = await respuesta.json()
        return resp
    } catch (error) {
        console.log(error)
    }
}

export async function getDolencias(){
    const url = import.meta.env.VITE_API_URL + '/dolencias'
    try {
        const respuesta = await fetch(url)
        const resp = await respuesta.json()
        return resp
    } catch (error) {
        console.log(error)
    }
}

export async function getTurnoPaciente(id){
    const url = `${import.meta.env.VITE_API_URL}/paciente.turno/${id}`
    try {
        const respuesta = await fetch(url)
        const resp = await respuesta.json()
        return resp
    } catch (error) {
        console.log(error)
    }  
}


export async function setGrowPaciente(idpaciente,idgrow){
    const url = `${import.meta.env.VITE_API_URL}/paciente/${idpaciente}/setGrow/${idgrow}`
    try {
        const respuesta = await fetch(url, { method: 'PUT'})
        const resp = await respuesta.json()
        return resp
    } catch (error) {
        console.log(error)
    }
}