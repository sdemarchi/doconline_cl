import validator from 'validator'

export function esFechaValida(valor){
    console.log(valor)
    if(validator.isDate(valor,{format:'DD/MM/YYYY'})){
        return true
    } else {
        return false
    }
}

export function esEmailValido(valor){
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(regex.test(valor)) {
        return true
    } else {
        return false
    }
}