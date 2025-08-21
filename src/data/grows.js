export async function getGrowByRoute(growUrl) {
  const url = import.meta.env.VITE_API_URL + '/grow/' + growUrl;
  const response = await fetch(url)
  const result = await response.json()
  return result;
}

export async function getGrowById(growId) {
  const url = import.meta.env.VITE_API_URL + '/grow.id/' + growId;
  const response = await fetch(url)
  const result = await response.json()
  return result;
}

export async function getGrowByCod(growCod) {
  const url = import.meta.env.VITE_API_URL + '/grow/' + growCod;
  const response = await fetch(url)
  const result = await response.json()
  return result;
}

export async function getGrowByEmail(email) {
  const url = import.meta.env.VITE_API_URL + '/grow.email/' + email;
  const response = await fetch(url)
  const result = await response.json()
  return result;
}

export async function getGrowPacientes(id) {
  const url = import.meta.env.VITE_API_URL + '/grow.pacientes/' + id;
  const response = await fetch(url)
  const result = await response.json()
  return result;
}



export async function addGrow(grow) {
  const url = import.meta.env.VITE_API_URL + '/add-grow';
  try {
    const respuesta = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(grow),
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

async function agregarPacienteONG(growId, paciente) {
  const url = import.meta.env.VITE_API_URL + '/grow.agregar-paciente-ong/' + growId;

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
    return resp;

  } catch (error) {
      console.error(error)
  }
}

async function obtenerPacientesONG(growId) {
  const url = import.meta.env.VITE_API_URL + '/pacientes-ong/' + growId;

  try {
    const respuesta = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const resp = await respuesta.json();
    console.log(resp);
    return resp;

  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    return null;
  }
}


export class ONGService{
  static async getPacientesONG(growId) {
    return obtenerPacientesONG(growId);
  }

  static async agregarPacienteONG(growId, paciente) {
    return agregarPacienteONG(growId, paciente);
  }
}
