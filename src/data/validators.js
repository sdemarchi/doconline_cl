import validator from 'validator'

const dateValidator = (value) => {
    console.log(value)
    return validator.isDate(value,{format:'DD/MM/YYYY'})
}

const emailValidator = (value) => {
    return validator.isEmail(value)
}

const numberValidator = (value) => {
    return validator.isNumeric(value)
}

const selectValidator = (value) => {
    return value > 0
}

export {dateValidator, emailValidator, numberValidator, selectValidator}