const Session = {
  clear: () => clear(),
  setRol: (rol) => setRol(rol),
  getRol: () => getRol()
}

const clear = () => {
  sessionStorage.clear();
}

const setRol = (rol) => {
  if (typeof rol !== "number") {
    throw new Error("El rol debe ser un número entero");
  }
  console.log('Setting role:', rol);

  const encoded = btoa(rol.toString());
  sessionStorage.setItem("rol", encoded);
}

const getRol = () => {
  const encoded = sessionStorage.getItem("rol");
  if (!encoded) return null;

  try {
    // Decodificamos Base64 y devolvemos como número
    return parseInt(atob(encoded), 10);
  } catch (e) {
    console.error("Error al decodificar el rol", e);
    return null;
  }
}

export default Session;