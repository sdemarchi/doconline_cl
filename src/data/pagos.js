class PagosService {
  apiUrl = import.meta.env.VITE_API_URL;

  async listarPagos() {
    const response = await fetch(this.apiUrl);
    const data = await response.json();
    return data;
  }

  async obtenerDetallesPago(id) {
    const response = await fetch(`${this.apiUrl}/${id}`);
    const data = await response.json();
    return data;
  }

  async buscarPorEmail(email) {
    const response = await fetch(`${this.apiUrl}/pagos/buscar-por-email/${email}`);
    const data = await response.json();
    return data;
  }

  async ultimoRegalado(id) {
    const response = await fetch(`${this.apiUrl}/pagos/ultimo-regalado/${id}`);
    const data = await response.json();
    return data;
  }

  async buscarPorCodigo(codigo) {
    const response = await fetch(`${this.apiUrl}/pagos/buscar-por-codigo/${codigo}`);
    const data = await response.json();
    return data;
  }

  async crear(nuevoPago) {
    const response = await fetch(`${this.apiUrl}/pagos/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoPago),
    });

    const data = await response.json();
    return data;
  }

  async editar(nuevoPago,id) {
    const response = await fetch(`${this.apiUrl}/pagos/editar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoPago),
    });

    const data = await response.json();
    return data;
  }

  async setUtilizado(id,estado) {
    const nuevoEstado = {id:id,utilizado:estado === true ? 1 : 0};

    const response = await fetch(`${this.apiUrl}/pagos/utilizado`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoEstado),
    });

    const data = await response.json();
    return data;
  }
}


export default new PagosService();
