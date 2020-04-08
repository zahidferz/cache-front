// https://date-fns.org/docs/parse
import parseDate from 'date-fns/parse'
// https://date-fns.org/docs/format
import {
  format,
  differenceInCalendarDays,
  differenceInMonths,
  differenceInYears,
  differenceInHours,
  differenceInMinutes,
  differenceInWeeks,
  differenceInDays,
} from 'date-fns'
import get from 'lodash/get'
import Big from 'big.js'
const es = require('date-fns/locale/es')
const _ = {
  get,
}

const userFriendlyMessages = {
  'User not found!': 'No tenemos usuario con este correo.',
  'Wrong email or password.': 'Usuario o contraseña inválida',
  invalid_grant: 'Contraseña incorrecta.',
  'an error ocurred while executing transactional operation: User is already a member of the Company.':
    'Algún miembro en el formulario ya pertenece a la compañía.',
  'an error ocurred while executing transactional operation: User has already been invited to the Company.':
    'Algún miembro en el formulario ya fue invitado a la compañía',
  'GraphQL error: an error ocurred while executing transactional operation: User is already a member of the Company.':
    'Algún miembro en el formulario ya pertenece a la compañía.',
  'GraphQL error: an error ocurred while executing transactional operation: User has already been invited to the Company.':
    'Algún miembro ya fue invitado a la compañía.',
  'Network error: Response not successful: Received status code 400':
    'Oops, algo salió mal. Inténtalo de nuevo.',
  'Network error: Failed to fetch': 'Oops, algo salió mal. Inténtalo de nuevo.',
  'Network error: The network connection was lost':
    'Oops, algo salió mal. Inténtalo de nuevo.',
  'Network error: Preflight response is not successful':
    'Oops, algo salió mal. Inténtalo de nuevo.',
  'Network Error': 'Oops, algo salió mal. Inténtalo de nuevo.',
  'Network error: NetworkError when attempting to fetch resource.':
    'Oops, algo salió mal. Inténtalo de nuevo.',
  '"commercialName" is not allowed to be empty: 400: Bad Request':
    'El Nombre Comercial es obligatorio.',
  '"commercialName" is not allowed to be empty':
    'El Nombre Comercial es obligatorio.',
  'GraphQL error: Client already exists!. The Commercial Name has been registered yet: 409: Conflict':
    'Ya existe un cliente con ese Nombre Comercial.',
  'GraphQL error: Client already exists!. The Commercial Name has been registered yet':
    'Ya existe un cliente con ese Nombre Comercial.',
  'GraphQL error: Client already exists!. The TaxId has been registered yet':
    'Ya existe un cliente con ese RFC.',
  'GraphQL error: The client does not exist: 404: Not Found':
    'Este cliente no existe.',
  'GraphQL error: Client is already active':
    '¡Ups! Este cliente aun está activo',
  'GraphQL error: "clabe" length must be at least 18 characters long: 400: Bad Request':
    'La CLABE debe tener 18 caracteres.',
  'GraphQL error: "taxId" fails to match the required pattern: 400: Bad Request':
    'El RFC tiene un formato incorrecto.',
  'GraphQL error: An error ocurred while trying to get received payments info: 401: Unauthorized':
    'El cliente que seleccionaste aún tiene procesos activos, sólo podrás cambiarlo a inactivo cuando estos hayan finalizado.',
  'GraphQL error: The category name already exists': '¡Ese nombre ya existe!',
  'GraphQL error: This Client has open processes':
    'Este cliente tiene procesos activos',
  'GraphQL error: An error ocurred while trying to create the sale invoice.':
    'Ocurrió un error al intentar generar la factura de la venta.',
  'GraphQL error: An error ocurred when triyn to create a sale':
    'Ocurrió un error al intentar generar tu venta.',
  'GraphQL error: An error response was received from external service call.':
    'Ocurrió un error, por favor intenta de nuevo.',
  'GraphQL error: Cannot return null for non-nullable field Query.myAccount.':
    'Ocurrió un error, por favor intenta de nuevo.',
  'GraphQL error: Company already has a taxId defined & is different from the taxId given.':
    'La compañía ya tiene un RFC distinto al proporcionado.',
  'Error trying to update account':
    'Oops, Algo salió mal. Verifica haber completado los campos obligatorios',
  'GraphQL error: Cannot return null for non-nullable field Notification.resourceReferences.':
    'Hubo un error con tus notificaciones. Por favor intenta más tarde.',
  'Network error: The network connection was lost.':
    'Por favor verifica tu conexión y vuelve a intentar.',
  'GraphQL error: A user already exists with the specified email address':
    'Ya existe un usuario con el email indicado',
  'GraphQL error: "name" length must be less than or equal to 200 characters long: 400: Bad Request':
    'El nombre de la categoría debe tener máximo 200 caracteres.',
  'GraphQL error: The frequent item already exists': '¡Esa clave ya existe!',
  'GraphQL error: The frequent item key already exists: 409: Conflict':
    '!Esa clave ya existe!',
  'GraphQL error: "key" length must be less than or equal to 100 characters long: 400: Bad Request':
    'La clave del concepto debe tener máximo 100 carateres',
  'Error trying to create an account':
    'Hubo un error al intentar crear tu cuenta.',
  '401: Unauthorized': 'No tienes permisos para realizar esta acción.',
  'GraphQL error: Permission not granted for user to perform the action!':
    'No tienes permisos para realizar esta acción.',
  'GraphQL error: el campo ciec es obligatiorio':
    'Si no recuerdas tu contraseña del SAT puedes capturar tus datos manualmente',
  '"email" is required':
    'El vínculo recibido por correo electrónico ha caducado, o bien ya lo has utilizado. Por favor inténtalo de nuevo.',
  'Reset password token is expired!':
    'El vínculo recibido por correo electrónico ha caducado, o bien ya lo has utilizado. Por favor inténtalo de nuevo.',
  'Reset password token not found!':
    'El vínculo recibido por correo electrónico ha caducado, o bien ya lo has utilizado. Por favor inténtalo de nuevo.',
  'The mail does not correspond with the requested!':
    'El vínculo recibido por correo electrónico ha caducado, o bien ya lo has utilizado. Por favor inténtalo de nuevo.',
  'GraphQL error: postalCode length must be less than or equal to 9 characters long':
    'El código postal debe ser menor o igual a 9 dígitos',
  'GraphQL error: La cuenta se encuentra cancelada, puedes contactarnos para mayor información!':
    'Tu cuenta está cancelada',
  'GraphQL error: La compañía no existe': 'La compañía no existe',
  too_many_attempts: 'Demasiados intentos',
}

const alertImages = {
  Cry: require('@assets/images/Alerts/gifs/Cry.gif'),
  Dissapointed: require('@assets/images/Alerts/gifs/Dissapointed.gif'),
  Do: require('@assets/images/Alerts/gifs/Do.gif'),
  Done: require('@assets/images/Alerts/gifs/Done.gif'),
  Khaaa: require('@assets/images/Alerts/gifs/Khaaa.gif'),
  Oops: require('@assets/images/Alerts/gifs/Oops.gif'),
  Perfect: require('@assets/images/Alerts/gifs/Perfect.gif'),
  Question: require('@assets/images/Alerts/gifs/Question.gif'),
  Success: require('@assets/images/Alerts/gifs/Success.gif'),
  CheckEmail: require('@assets/images/Alerts/gifs/CheckEmail.gif'),
  NoResultsFound: require('@assets/images/Alerts/gifs/NoResultsFound.gif'),

  iva_mayor_a_16: require('@assets/images/Alerts/iva_mayor_a_16.svg'),
  busqueda_sin_resultados: require('@assets/images/Alerts/busqueda_sin_resultados.svg'),
  cancelar: require('@assets/images/Alerts/cancelar.svg'),
  categoria_creada: require('@assets/images/Alerts/categoria_creada.svg'),
  concepto_creado: require('@assets/images/Alerts/concepto_creado.svg'),
  conexion: require('@assets/images/Alerts/conexion.svg'),
  error_de_la_plataforma: require('@assets/images/Alerts/error_de_la_plataforma.svg'),
  error: require('@assets/images/Alerts/error.svg'),
  exito_cancelar: require('@assets/images/Alerts/exito_cancelar.svg'),
  exito: require('@assets/images/Alerts/exito.svg'),
  factura_creada: require('@assets/images/Alerts/factura_creada.svg'),
  fin_de_un_flujo: require('@assets/images/Alerts/fin_de_un_flujo.svg'),
  ieps_con_porcentaje_erroneo: require('@assets/images/Alerts/ieps_con_porcentaje_erroneo.svg'),
  ieps_incorrecto: require('@assets/images/Alerts/ieps_incorrecto.svg'),
  iva_fronterizo: require('@assets/images/Alerts/iva_fronterizo.svg'),
  mail_enviado: require('@assets/images/Alerts/mail_enviado.svg'),
  parece_que_algo_falta: require('@assets/images/Alerts/parece_que_algo_falta.svg'),
  retencion_de_usuario: require('@assets/images/Alerts/retencion_de_usuario.svg'),
  revisa_tu_correo: require('@assets/images/Alerts/revisa_tu_correo.svg'),
  seguro_que_quieres_salir: require('@assets/images/Alerts/seguro_que_quieres_salir.svg'),
  venta_creada: require('@assets/images/Alerts/venta_creada.svg'),
}

export default {
  dates: {
    formatDateLong(date) {
      date = parseDate(date)
      return format(date, 'D [de] MMMM', {
        locale: es,
      })
    },
    formatDateLongYear(date) {
      date = parseDate(date)
      return format(date, 'D MMMM [de] YYYY', {
        locale: es,
      })
    },
    formatDate(date) {
      date = parseDate(date)
      return format(date, 'MMM Do, YYYY')
    },
    getTimeLapse(dateString) {
      const now = new Date()
      const pendingDate = new Date(dateString)
      // hours
      if (
        differenceInHours(now, pendingDate) < 24 &&
        differenceInMinutes(now, pendingDate) > 60
      ) {
        if (differenceInHours(now, pendingDate) === 1) {
          return 'Hace una hora'
        }
        return `Hace ${differenceInHours(now, pendingDate)} horas`
      }
      // minutes
      if (
        differenceInMinutes(now, pendingDate) < 60 &&
        differenceInHours(now, pendingDate) < 1
      ) {
        if (differenceInMinutes(now, pendingDate) === 1) {
          return 'Hace un minuto'
        }
        return `Hace ${differenceInMinutes(now, pendingDate)} minutos`
      }

      //  days
      if (differenceInDays(now, pendingDate) < 30) {
        if (differenceInDays(now, pendingDate) === 1) {
          return 'Hace un día'
        }
        return `Hace ${differenceInCalendarDays(now, pendingDate)} días`
      }
      // weeks
      if (differenceInWeeks(now, pendingDate) < 4) {
        if (differenceInWeeks(now, pendingDate) === 1) {
          return 'Hace una semana'
        }
        return `Hace ${differenceInCalendarDays(now, pendingDate)} semanas`
      }
      //  months
      if (differenceInMonths(now, pendingDate) < 12) {
        if (differenceInMonths(now, pendingDate) === 1) {
          return 'Hace 1 mes'
        }
        return `Hace ${differenceInDays(now, pendingDate)} meses`
      }
      // Years
      if (differenceInYears(now, pendingDate) < 1) {
        if (differenceInYears(now, pendingDate) === 1) {
          return 'Hace 1 año'
        }
        return `Hace ${differenceInDays(now, pendingDate)} años`
      }
    },
    getRelativeDate(dateString) {
      const hourInSeconds = 60 * 60
      const now = new Date()
      const notitficationDate = new Date(dateString)
      const differenceInSeconds = (now - notitficationDate) / 1000
      if (differenceInSeconds < 60) {
        return 'Hace unos momentos'
      }
      if (differenceInSeconds < hourInSeconds) {
        return `Hace ${Math.round(differenceInSeconds / 60)} minutos`
      }
      // Less than 24 hours and same day
      if (
        differenceInCalendarDays(now, notitficationDate) < 1 &&
        differenceInHours(now, notitficationDate) < 24
      ) {
        return `Hoy a las ${format(notitficationDate, 'h:mm aa')}`
      }

      // Yesterday
      if (differenceInCalendarDays(now, notitficationDate) < 2) {
        return `Ayer a las ${format(notitficationDate, 'h:mm aa')}`
      }

      // Same year
      if (differenceInYears(now, notitficationDate) < 1) {
        return format(notitficationDate, 'D [de] MMMM [a las] h:mm aa', {
          locale: es,
        })
      }

      return format(
        notitficationDate,
        'D [de] MMMM [del] YYYY [a las] h:mm aa',
        { locale: es }
      )
    },
    getRelativeDateShort(dateString) {
      const hourInSeconds = 60 * 60
      const now = new Date()
      const notitficationDate = new Date(dateString)
      const differenceInSeconds = (now - notitficationDate) / 1000
      if (differenceInSeconds < 60) {
        return 'Hace unos momentos'
      }
      if (differenceInSeconds < hourInSeconds) {
        if (differenceInSeconds < 120) {
          return 'Hace un minuto'
        }
        return `Hace ${Math.round(differenceInSeconds / 60)} minutos`
      }
      // Less than 24 hours and same day
      if (
        differenceInCalendarDays(now, notitficationDate) < 1 &&
        differenceInHours(now, notitficationDate) < 24
      ) {
        return `Hoy ${format(notitficationDate, 'h:mm aa')}`
      }

      // Yesterday
      if (differenceInCalendarDays(now, notitficationDate) < 2) {
        return `Ayer ${format(notitficationDate, 'h:mm aa')}`
      }

      // Same year
      if (differenceInYears(now, notitficationDate) < 1) {
        return format(notitficationDate, 'DD [de] MMM[,] h:mm aa', {
          locale: es,
        })
      }

      return format(notitficationDate, 'DD/MM/YYYY[,] h:mm aa', {
        locale: es,
      })
    },
  },
  parseQueryError(errorMessage) {
    const defaultError = {
      headerError: errorMessage
        .replace(/GraphQL error:\s*/, '')
        .replace(/Network error:\s*/, ''),
      imageError: alertImages.Oops,
      modalButtons: false,
      bodyError: '',
    }
    const errors = {
      'GraphQL error: La cuenta se encuentra cancelada, puedes contactarnos para mayor información!': {
        headerError: 'Tu cuenta está cancelada',
        imageError: alertImages.Dissapointed,
        bodyError: 'Si necesitas ayuda contáctanos en el chat',
        modalButtons: true,
      },
      'GraphQL error: La compañía no existe': {
        headerError: 'La compañía no existe',
        imageError: alertImages.Dissapointed,
        bodyError: 'Si necesitas ayuda contáctanos en el chat',
        modalButtons: true,
      },
      'Network error: Failed to fetch': {
        headerError: 'Oops, algo salió mal. Inténtalo de nuevo.',
        imageError: alertImages.Oops,
        bodyError: 'Error 001',
        modalButtons: false,
      },
      'GraphQL error: No tienes permisos para consultar clientes': {
        headerError: 'No tienes permisos para consultar clientes.',
        imageError: alertImages.Dissapointed,
        modalButtons: false,
      },
    }
    return errors[errorMessage] ? errors[errorMessage] : defaultError
  },
  parseServerError(error) {
    let errorMessage
    if (
      _.get(error, 'graphQLErrors[0].extensions.detail.extServiceError', null)
    ) {
      errorMessage = _.get(
        error,
        'graphQLErrors[0].extensions.detail.extServiceError',
        null
      )
    } else if (
      _.get(error, 'response.data.detail.validationErrors.email[0]', null)
    ) {
      errorMessage = _.get(
        error,
        'response.data.detail.validationErrors.email[0]',
        null
      )
    } else if (_.get(error, 'response.data.errors.errorMessage', null)) {
      errorMessage = _.get(error, 'response.data.errors.errorMessage', null)
    } else if (_.get(error, 'response.data.errors[0]', null)) {
      errorMessage = _.get(error, 'response.data.errors[0].errorMessage', null)
    } else if (_.get(error, 'response.data.message', null)) {
      errorMessage = _.get(error, 'response.data.message', null)
    } else if (_.get(error, 'response.data.error', null)) {
      errorMessage = _.get(error, 'response.data.error', null)
    } else if (_.get(error, 'error_description', null)) {
      errorMessage = _.get(error, 'error_description', null)
    } else if (_.get(error, 'message', null)) {
      errorMessage = _.get(error, 'message', null)
    } else {
      errorMessage = 'Hubo un error'
    }

    const userFriendlyMessage =
      userFriendlyMessages[errorMessage] ||
      errorMessage
        .replace(/GraphQL error:\s*/, '')
        .replace(/Network error:\s*/, '')

    return userFriendlyMessage
  },
  taxesSum(taxesArray, taxesType) {
    // taxesType (selectedTransferredTaxes,selectedWithheldTaxes)
    const taxesNames = []
    taxesArray.forEach((item) => {
      if (taxesType in item) {
        item[taxesType].forEach((taxes) => {
          if (taxes) {
            if (!taxesNames.includes(taxes.name)) {
              taxesNames.push(taxes.name)
            }
          }
        })
      }
    })
    /* ratesByName
          {
            IVA:{
                  rate1:[amount1,amount2...]}...n],
                  rate2:[amount1,amount2...]}...n],
                },
            IEPS: {
                    rate1:[amount1,amount2...]}...n]
                    rate2:[amount1,amount2...]}...n]
                  },
            ....
          }
      */
    const ratesByName = {}
    taxesNames.forEach((name) => {
      // rate = {amount:12,name:IVA,percentage:16}
      const rates = []
      taxesArray.forEach((item) => {
        if (taxesType in item) {
          item[taxesType].forEach((rate) => {
            if (rate.name === name) {
              rates.push(rate)
            }
          })
        }
      })
      //  group rates
      const taxesNameRates = {}
      rates.forEach((rate) => {
        if (rate.percentage in taxesNameRates) {
          taxesNameRates[rate.percentage].push(rate)
        } else {
          taxesNameRates[rate.percentage] = [rate]
        }
      })
      ratesByName[name] = taxesNameRates
    })

    /* totalByTaxesRates
          {
            IVA:[
                  1525.25, // rate1
                  1525.25, // rate2
                ]
            IEPS: [
                    1525.25, // rate1
                    1525.25  // rate2
                  ]
          }
      */

    const totalByTaxesRates = {}
    Object.keys(ratesByName).forEach((taxesName) => {
      const rates = ratesByName[taxesName]
      const ratesKeys = Object.keys(rates)
      const totals = []
      ratesKeys.forEach((key) => {
        const result = rates[key].reduce((total, rate) => {
          return Big(total)
            .plus(rate.amount || '0')
            .valueOf()
        }, '0')
        totals.push(
          Big(result)
            .round(2)
            .valueOf()
        )
      })
      totalByTaxesRates[taxesName] = totals
    })
    /* totalByTaxes
          [
            125.23,  // IVA
            1253.55, // IEPS
          ]
      */

    const totalByTaxes = []
    Object.keys(totalByTaxesRates).forEach((taxesName) => {
      const result = totalByTaxesRates[taxesName].reduce(
        (total, taxesTotals) => {
          return Big(total)
            .plus(taxesTotals)
            .valueOf()
        },
        '0'
      )
      totalByTaxes.push(
        Big(result)
          .round(2)
          .valueOf()
      )
    })

    const total = totalByTaxes.reduce((total, amount) => {
      return Big(total).plus(amount)
    }, '0')

    return Big(total)
      .round(2)
      .valueOf()
  },
  alertImages,
  isIphone: navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform),
}
