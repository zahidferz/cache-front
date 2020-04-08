// Input validators return a corresponding error message when a validation fails,
// otherwise, null witll be returned.
export default {
  clientId: (input) => {
    if (
      /^[A-Z0-9]{8}(-)([A-Z0-9]{4}(-)){3}([A-Z0-9]{12})/i.test(input) === false
    ) {
      return `Ingresa un ID válido.`
    }
  },
  clabe: (input) => {
    if (input.length < 18 && input.length > 0) {
      return `La CLABE se compone de 18 dígitos.`
    }
  },
  bankAccount: (input) => {
    if (input.length > 20) {
      return `Debes ingresar máximo 20 dígitos.`
    }
  },
  'numeric-negative': (input) => {
    return /^[-]{1}\d+(?:\.\d+)?$/.test(input)
  },
  name: (input) => {
    if (!input) {
      return null
    }
    if (input.length < 2) {
      return 'Tu nombre es muy corto'
    }
  },
  lastname: (input) => {
    if (!input) {
      return null
    }
    if (input.length < 2) {
      return 'Tu apellido es muy corto'
    }
  },
  taxId: (input) => {
    const taxId = /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z]|[0-9]){2}([A]|[0-9]){1})?$/i
    if (taxId.test(input)) {
      return null
    }
    return 'Ups, RFC inválido'
  },
  email: (input) => {
    if (!input) {
      return null
    }
    if (
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        input
      )
    ) {
      return null
    }
    return 'Escribe un correo válido'
  },
  phone: (input, min = 10, max = 15) => {
    if (!input) {
      return null
    }
    const invalidPatterns = [
      /01234/,
      /12345/,
      /23456/,
      /34567/,
      /45678/,
      /56789/,
      /67890/,
      /11111/,
      /22222/,
      /33333/,
      /44444/,
      /55555/,
      /66666/,
      /77777/,
      /88888/,
      /99999/,
      /00000/,
    ]
    for (let i = 0; i < invalidPatterns.length; i++) {
      // Remove any special characters such as spaces and () before validating
      if (
        input.match(/\d/gi) &&
        invalidPatterns[i].test(input.match(/\d/gi).join(''))
      ) {
        return 'Ingresa un número válido'
      }
    }

    if (input.match(/\d/gi) && input.match(/\d/gi).length < min) {
      return `Teléfono mínimo de ${min} dígitos`
    }
    // Max validation is not required since the input does not allow for more that 15 digits
    // if (input.length > max) {
    //   return `Debes ingresar máximo ${max} dígitos.`
    // }
  },
  password: (input) => {
    if (input.length < 8) {
      return 'Debes utilizar al menos 8 caracteres'
    }
    if (!/[A-Z]/.test(input)) {
      return 'Debes utilizar al menos una letra mayúscula'
    }
    if (!/[a-z]/.test(input)) {
      return 'Debes utilizar al menos una letra minúscula'
    }
    if (!/\d/.test(input)) {
      return 'Debes utilizar al menos un número'
    }
  },
}
