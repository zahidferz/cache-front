import SignupPassword from './SignupPassword'
import { axiosAccountProvisioning } from '@src/axiosConfig'

jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

// Every time you mock a module as below, jest will look for
// a folder called __mocks__ at the same level of the mocked module
// which contains the "test version" of the mocked module e.g @src/__mocks__/axiosConfig
// and all the scripts that need the mocked module will use the test version instead. e.g @src/__mocks__/axiosConfig
jest.mock('@src/axiosConfig')
jest.mock('@src/auth/authService')
// jest.spyOn(object,NameMethod:String)
// spyOn allows us to change the implementation of a object method with a jest function
// in order to test how the method was called.
const postMock = jest.fn(() => Promise.resolve(true))
jest.spyOn(axiosAccountProvisioning, 'post').mockImplementation(postMock)

describe('@components/SignupPassword', () => {
  // Runs after each test
  afterEach(() => {
    // mockClear Resets all information stored in the mockFn.mock.calls and mockFn.mock.instances arrays.
    // Reset information of a jest function e.g: parameters, times called
    postMock.mockClear()
  })
  it('exports a valid component', () => {
    expect(SignupPassword).toBeAComponent()
  })
  it('should find the error text when password has less than 8 characters', async () => {
    const user = {
      name: 'Jonh',
    }
    const { getByText, getByLabelText, fireEvent, wait } = render(
      SignupPassword,
      {
        mocks: {
          user,
        },
      }
    )
    const inputPassword = getByLabelText('Contraseña')
    inputPassword.value = 'gestio'
    fireEvent.input(inputPassword)
    fireEvent.click(getByLabelText('Guardar'))
    await wait(() =>
      expect(getByText('Debes utilizar al menos 8 caracteres')).toBeTruthy()
    )
  })

  it('should display error when inputPassword is empty after submit', async () => {
    const post = jest.fn()

    const user = {
      name: 'Jonh',
      number: '1948',
      mobilePhone: '5546854218',
    }
    const company = {
      number: '198756',
    }
    const subscription = {
      number: '19846',
    }

    const { fireEvent, getByLabelText, wait } = render(SignupPassword, {
      mocks: {
        user,
        company,
        subscription,
        post,
      },
    })
    const inputPassword = getByLabelText('Contraseña')
    inputPassword.value = 'Gestionix_1'
    fireEvent.input(inputPassword)
    fireEvent.click(getByLabelText('Guardar'))
    await wait(() => post)
  })
  it('Should create a guest account in case "invitado" query param is present', async () => {
    const user = {
      name: 'Jonh',
      number: '1948',
      phone: '5546854218',
    }
    const company = {
      number: '198756',
    }
    const subscription = {
      number: '19846',
    }
    const $route = {
      query: {
        invitado: true,
      },
    }
    const $router = {
      push: jest.fn(),
    }
    const $apollo = {
      mutate: jest.fn(),
    }
    const { getByLabelText, fireEvent, wait } = render(SignupPassword, {
      data() {
        return {
          user,
          company,
          subscription,
        }
      },
      mocks: {
        $route,
        $router,
        $apollo,
      },
    })
    const inputPassword = getByLabelText('Contraseña')
    inputPassword.value = 'Gestionix_1'
    fireEvent.input(inputPassword)
    fireEvent.click(getByLabelText('Guardar'))
    const url = `/update_account/${user.number}/${company.number}`
    const body = {
      user: {
        mobilePhone: user.phone,
        password: 'Gestionix_1',
        firstName: user.name,
        lastName: user.lastName,
      },
    }
    const params = { params: { fromInvitation: true } }
    await wait(() => {
      expect(postMock).toBeCalledWith(url, body, params)
    })
  })
  xit('Should redirect to dashboard after a success submit of a guest with jobTitle "contador"', async () => {
    const user = {
      name: 'Jonh',
      number: '1948',
      phone: '5546854218',
      jobTitle: 'contador',
    }
    const company = {
      number: '198756',
    }
    const subscription = {
      number: '19846',
    }
    const $route = {
      query: {
        invitado: true,
      },
    }
    const $router = {
      push: jest.fn(),
    }
    const $apollo = {
      mutate: jest.fn(),
    }
    const { getByLabelText, fireEvent, wait } = render(SignupPassword, {
      data() {
        return {
          user,
          company,
          subscription,
        }
      },
      mocks: {
        $route,
        $router,
        $apollo,
      },
    })
    const inputPassword = getByLabelText('Contraseña')
    inputPassword.value = 'Gestionix_1'
    fireEvent.input(inputPassword)
    fireEvent.click(getByLabelText('Guardar'))
    const url = `/update_account/${user.number}/${company.number}`
    const body = {
      user: {
        mobilePhone: user.phone,
        password: 'Gestionix_1',
        firstName: user.name,
        lastName: user.lastName,
      },
    }
    const params = { params: { fromInvitation: true } }
    await wait(() => {
      expect(postMock).toBeCalledWith(url, body, params)
      expect($router.push).toBeCalledWith({ name: 'dashboard' })
    })
  })
  xit('Should redirect to companyrole after a success submit of a guest with  an empty jobTitle"', async () => {
    const user = {
      name: 'Jonh',
      number: '1948',
      phone: '5546854218',
      jobTitle: '',
    }
    const company = {
      number: '198756',
    }
    const subscription = {
      number: '19846',
    }
    const $route = {
      query: {
        invitado: true,
      },
    }
    const $router = {
      push: jest.fn(),
    }
    const $apollo = {
      mutate: jest.fn(),
    }
    const { getByLabelText, fireEvent, wait } = render(SignupPassword, {
      data() {
        return {
          user,
          company,
          subscription,
        }
      },
      mocks: {
        $route,
        $router,
        $apollo,
      },
    })
    const inputPassword = getByLabelText('Contraseña')
    inputPassword.value = 'Gestionix_1'
    fireEvent.input(inputPassword)
    fireEvent.click(getByLabelText('Guardar'))
    const url = `/update_account/${user.number}/${company.number}`
    const body = {
      user: {
        mobilePhone: user.phone,
        password: 'Gestionix_1',
        firstName: user.name,
        lastName: user.lastName,
      },
    }
    const params = { params: { fromInvitation: true } }
    await wait(() => {
      expect(postMock).toBeCalledWith(url, body, params)
      expect($router.push).toBeCalledWith({
        name: 'companyrole',
        query: { invitado: true },
      })
    })
  })
})
