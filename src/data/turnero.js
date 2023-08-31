import axios from 'axios';

export async function getPrestadores() {
    const url = import.meta.env.VITE_API_URL + '/turnero.prestadores'
    const response = await fetch(url)
    const result = await response.json()
    return result
}

export async function getCalendario(mes, anio, prestador) {
    const url = `${import.meta.env.VITE_API_URL}/turnero.calendario/${mes}/${anio}/${prestador}`
    const response = await fetch(url)
    const result = await response.json()
    //console.log(result)
    return result
}

export async function getTurno(fecha, prestador) {
    const url = `${import.meta.env.VITE_API_URL}/turnero.turno/${fecha}/${prestador}`
    console.log(url)
    const response = await fetch(url)
    const result = await response.json()
    //console.log(result)
    return result
}

export async function getPrecios(){
    const url = `${import.meta.env.VITE_API_URL}/turnero.precios`;
    const response = await fetch(url);
    const result = await response.json();
    //console.log(result)
    return result
}

export async function getDatosTransf(){
    const url = `${import.meta.env.VITE_API_URL}/turnero.datosTransf`
    const response = await fetch(url)
    const result = await response.json()
    //console.log(result)
    return result
}

export async function aplicarCupon(cupon){
    const url = `${import.meta.env.VITE_API_URL}/turnero.cupon/${cupon}`
    const response = await fetch(url)
    const result = await response.json()
    //console.log(result)
    return result
}

export async function confirmarTurno(turno, cupon, comprobante, importe, usuarioId){
    const url = `${import.meta.env.VITE_API_URL}/turnero.confirmar`
    const data = {
        fecha:turno.fecha,
        hora:turno.hora,
        prestador:turno.prestador,
        usuario:usuarioId,
        cupon:cupon.cupon,
        importe:importe,
        descuento:cupon.importe,
        comprobante: comprobante
    }
    console.log(data)
    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resp = await respuesta.json()
        return resp
    } catch (error) {
        console.log(error)
    }
}

/*export async function guardarFormulario(form) {
    const url = import.meta.env.VITE_API_URL + '/formulario'
    
}*/

export async function cancelarTurno(pacienteId){
    const url = `${import.meta.env.VITE_API_URL}/turnero.cancelar/${pacienteId}`
    const response = await fetch(url)
    const result = await response.json()
    //console.log(result)
    return result
}

export async function uploadComprobante(file,turnoId){
    const url = `${import.meta.env.VITE_API_URL}/turnero.comprobante/${turnoId}`
    
    const response = await fetch(url, {
        method: 'POST',
        body: file,
        headers: {
            'content-type': file.type,
            'content-length': `${file.size}`,
        },
    })
    const result = await response.json()
    return result
}
