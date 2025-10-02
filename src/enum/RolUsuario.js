const RolUsuario = {
    Paciente: 0,
    Grow: 1,
    ONG: 2,
    esGrow: e => e == 1,
    esOng: e => e == 2,
    esPaciente: e => e == 0,
}

export default RolUsuario;