export default class Storage {

    static clear = () =>{
        sessionStorage.clear();
        localStorage.clear();
        console.info('Storage: CLEAR');
    }


    static setRol = (rol) => {
        if (typeof rol !== "number") {
        throw new Error("El rol debe ser un número entero");
        }
        console.info('Setting role:', rol);

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

    // Métodos específicos para el growId, que se setea al registrarse mediante QR o Link (No es el id del usuario con grow, sino el id del grow mediante el cual se registro un paciente)
    static getUserGrowId = () => {
        return localStorage.getItem('growId');
    }

    static setUserGrowId = (grow) => {
        localStorage.setItem('growId', grow);
    }

    static setGrow = (grow) => {
        localStorage.setItem('grow', grow);
    }   


    // Los siguientes metodos se usan para controlar si el usuario viene del login o de Registrarse, 
    // lo cual es necesario para definir el comportamiento de la pantalla inicial.
    static fromLogin(){
        localStorage.setItem('fromLogin', 'true');
    }

    static isFromLogin(){
        return localStorage.getItem('fromLogin') && localStorage.getItem('fromLogin') === 'true';
    }

    static removeFromLogin(){
        localStorage.removeItem('fromLogin');
    }
}