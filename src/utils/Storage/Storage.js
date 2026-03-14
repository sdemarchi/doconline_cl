

export default class Storage {

    static clear = () =>{
        sessionStorage.clear();
        localStorage.clear();
        console.log('Storage: CLEAR');
    }


    static setRol = (rol) => {
        if (typeof rol !== "number") {
        throw new Error("El rol debe ser un número entero");
        }
        console.log('Setting role:', rol);

        const encoded = btoa(rol.toString());
        localStorage.setItem("rol", encoded);
    }

    static getRol = () => {
        const encoded = localStorage.getItem("rol");
        if (!encoded) return null;

        try {
        // Decodificamos Base64 y devolvemos como número
        return parseInt(atob(encoded), 10);
        } catch (e) {
        console.error("Error al decodificar el rol", e);
        return null;
        }
    }

    static getItem = (key) => {
        const item = localStorage.getItem(key);
        if (!item) return null;
        return item;
    }

    static setItem = (key, value) => {
        localStorage.setItem(key, value);
    }
}