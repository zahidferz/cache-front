import SignupName from './SignupName'
import { UPDATE_INVITATED_USER } from '@src/apollo//mutations'
import authService from '@src/auth/authService'
jest.mock('@src/auth/authService')

jest.mock('lodash/debounce', () => jest.fn((fn) => fn))
const postMock = jest.fn(() => Promise.resolve(true))
jest.spyOn(authService, 'login').mockImplementation(postMock)

describe('@components/SignupName', () => {
  it('exports a valid component', () => {
    expect(SignupName).toBeAComponent()
  })
  it('should display error if name has less than 2 characters', async () => {
    const mutate = jest.fn(() => Promise.resolve({}))
    const { fireEvent, getByLabelText, getByText, wait } = render(SignupName, {
      stubs: ['RouterLink', 'RouterView'],
      mocks: {
        $apollo: {
          mutate,
        },
        $router: jest.fn(),
        $route: {
          query: {
            invite: null,
          },
        },
      },
    })
    const inputName = getByLabelText('Nombre')
    inputName.value = 'J'
    fireEvent.input(inputName)
    fireEvent.click(getByLabelText('Guardar'))
    await wait(() => expect(getByText('Tu nombre es muy corto')).toBeTruthy())
  })

  it('should display error if user submits form with empty input value', () => {
    const mutate = jest.fn(() => Promise.resolve({}))
    const { fireEvent, getByLabelText, getByText } = render(SignupName, {
      stubs: ['RouterLink', 'RouterView'],
      mocks: {
        $apollo: {
          mutate,
        },
        $router: jest.fn(),
        $route: {
          query: {
            invite: null,
          },
        },
      },
    })
    const inputName = getByLabelText('Nombre')
    inputName.value = ''
    fireEvent.input(inputName)
    fireEvent.click(getByLabelText('Guardar'))
    expect(getByText('Este campo es necesario')).toBeTruthy()
  })
  it('Updates localState with query params data  in case of invitation signup', () => {
    const $route = {
      query: {
        i: 'perezjonathan130@gmail.com',
        r: 'contador',
        e: '123',
        cn: 'true',
        nu: '456',
      },
    }
    const $apollo = {
      mutate: jest.fn(),
    }
    render(SignupName, {
      mocks: {
        $route,
        $apollo,
      },
    })
    expect($apollo.mutate).toBeCalledWith({
      mutation: UPDATE_INVITATED_USER,
      variables: {
        email: $route.query.i,
        jobTitle: $route.query.r,
        companyNumber: $route.query.e,
        userNumber: $route.query.nu,
      },
    })
  })
  it('Redirects with "invitado" query params after submit in case of invitation signup', async () => {
    const $route = {
      query: {
        i: 'perezjonathan130@gmail.com',
        r: 'contador',
        e: '123',
        cn: 'true',
        nu: '456',
      },
    }
    const $router = {
      push: jest.fn(),
    }
    const $apollo = {
      mutate: jest.fn(() => Promise.resolve(true)),
    }
    const { fireEvent, getByLabelText, wait } = render(SignupName, {
      mocks: {
        $route,
        $apollo,
        $router,
      },
    })
    const input = getByLabelText('Nombre')
    input.value = 'calamardo'
    fireEvent.input(input)
    fireEvent.click(getByLabelText('Guardar'))

    await wait(() =>
      expect($router.push).toBeCalledWith({
        name: 'signupLastname',
        query: { invitado: true },
      })
    )
  })
  it('Calls the mutation when user submits form', async () => {
    const mutate = jest.fn(() => Promise.resolve({}))
    const { fireEvent, getByLabelText, wait } = render(SignupName, {
      stubs: ['RouterLink', 'RouterView'],
      mocks: {
        $apollo: {
          mutate,
        },
        $router: {
          push: jest.fn(),
        },
        $route: {
          query: {
            invite: null,
          },
        },
      },
    })
    const inputName = getByLabelText('Nombre')
    inputName.value = 'Test'
    fireEvent.input(inputName)
    fireEvent.click(getByLabelText('Guardar'))
    await wait(() => {
      expect(mutate).toHaveBeenCalled()
    })
  })
})

describe('@components/SignupName', () => {
  const $router = {
    push: jest.fn(),
  }
  const mqConfig = {
    breakpoints: {
      mo: 768,
      de: Infinity,
    },
    defaultBreakpoint: 'de',
  }

  it('shows register form for desk version', () => {
    const $route = {
      query: {
        i: false,
        r: 'contador',
        e: '123',
        cn: 'true',
        nu: '456',
      },
    }
    const { getByLabelText, getByText } = render(SignupName, {
      mqConfig,
      mocks: {
        $router,
        $route,
      },
    })
    expect(getByLabelText('Nombre')).toBeTruthy()
    expect(getByLabelText('Apellido')).toBeTruthy()
    expect(getByLabelText('Correo Electrónico')).toBeTruthy()
    expect(getByLabelText('Teléfono')).toBeTruthy()
    expect(getByLabelText('Contraseña')).toBeTruthy()
    expect(getByText('Crear cuenta')).toBeTruthy()
  })
  it('shows custom errors for each input when empty values', async () => {
    const $route = {
      query: {
        i: false,
        r: '',
        e: '123',
        cn: 'true',
        nu: '456',
      },
    }
    const { wait, fireEvent, getByText, getAllByText } = render(SignupName, {
      mqConfig,
      stubs: ['router-link'],
      mocks: {
        $router,
        $route,
      },
    })
    await wait(() => {
      fireEvent.submit(getByText('Crear cuenta'))
    })
    expect(getAllByText('Este campo es necesario')).toBeTruthy()
    expect(getAllByText('Este campo es necesario').length).toBe(5)
  })
  it('calls submitDesktop when Crear cuenta is clicked', async () => {
    const $route = {
      query: {
        i: false,
        r: '',
        e: '123',
        cn: 'true',
        nu: '456',
      },
    }
    const login = jest.fn()
    const { getByLabelText, fireEvent, getByText } = render(SignupName, {
      stubs: ['router-link'],
      mocks: {
        $router,
        $route,
        login,
      },
      mqConfig,
    })
    getByLabelText('Nombre').value = 'Nombre'
    getByLabelText('Apellido').value = 'Apellido'
    getByLabelText('Teléfono').value = 55555555555
    getByLabelText('Correo Electrónico').value = 'mail@mail.com'
    getByLabelText('Contraseña').value = 'Contrasena1'
    fireEvent.input(getByLabelText('Nombre'))
    fireEvent.input(getByLabelText('Apellido'))
    fireEvent.input(getByLabelText('Correo Electrónico'))
    fireEvent.input(getByLabelText('Contraseña'))
    fireEvent.input(getByLabelText('Teléfono'))
    fireEvent.submit(getByText('Crear cuenta'))
  })
  it('calls submitDesktop when Crear cuenta is clicked', async () => {
    const $route = {
      query: {
        i: false,
        r: '',
        e: '123',
        cn: 'true',
        nu: '456',
      },
    }
    const submitDesktop = jest.fn()
    const { getByLabelText, fireEvent, getByText, wait } = render(SignupName, {
      stubs: ['router-link'],
      mocks: {
        $router,
        $route,
      },
      methods: {
        submitDesktop,
      },
      mqConfig,
    })
    getByLabelText('Nombre').value = 'Nombre'
    getByLabelText('Apellido').value = 'Apellido'
    getByLabelText('Teléfono').value = 5546854218
    getByLabelText('Correo Electrónico').value = 'mail@mail.com'
    getByLabelText('Contraseña').value = 'Contrasena1'
    fireEvent.input(getByLabelText('Nombre'))
    fireEvent.input(getByLabelText('Apellido'))
    fireEvent.input(getByLabelText('Correo Electrónico'))
    fireEvent.input(getByLabelText('Contraseña'))
    fireEvent.input(getByLabelText('Teléfono'))
    fireEvent.submit(getByText('Crear cuenta'))
    await wait(() => {
      expect(submitDesktop).toHaveBeenCalledTimes(1)
    })
  })
  it('calls createGuest when Unirme ahora is clicked by guest', async () => {
    const $route = {
      query: {
        i: 'mail@mail.com',
        r: '',
        e: '123',
        cn: 'true',
        nu: '456',
      },
    }
    const mutate = jest.fn()
    const { getByLabelText, fireEvent, getByText, wait } = render(SignupName, {
      stubs: ['router-link'],
      mocks: {
        $router,
        $route,
        $apollo: {
          mutate,
        },
      },

      mqConfig,
    })
    getByLabelText('Nombre*').value = 'Nombre'
    getByLabelText('Apellido*').value = 'Apellido'
    getByLabelText('Teléfono*').value = 5546854218
    getByLabelText('Contraseña*').value = 'Contrasena1'
    fireEvent.input(getByLabelText('Nombre*'))
    fireEvent.input(getByLabelText('Apellido*'))
    fireEvent.input(getByLabelText('Correo Electrónico*'))
    fireEvent.input(getByLabelText('Contraseña*'))
    fireEvent.input(getByLabelText('Teléfono*'))
    fireEvent.submit(getByText('Unirme Ahora'))
    await wait(() => {
      expect(mutate).toHaveBeenCalledTimes(1)
    })
  })
  fit('calls createGuest and redirect to dashbooard when Unirme ahora is clicked by guest', async () => {
    const $route = {
      query: {
        i: 'mail@mail.com',
        r: 'Contador',
        e: '123',
        cn: 'true',
        nu: '456',
      },
    }
    const mutate = jest.fn()
    const { getByLabelText, fireEvent, getByText, wait } = render(SignupName, {
      stubs: ['router-link'],
      mocks: {
        $router,
        $route,
        $apollo: {
          mutate,
        },
      },

      mqConfig,
    })
    getByLabelText('Nombre*').value = 'Nombre'
    getByLabelText('Apellido*').value = 'Apellido'
    getByLabelText('Teléfono*').value = 5546854218
    getByLabelText('Contraseña*').value = 'Contrasena1'
    fireEvent.input(getByLabelText('Nombre*'))
    fireEvent.input(getByLabelText('Apellido*'))
    fireEvent.input(getByLabelText('Correo Electrónico*'))
    fireEvent.input(getByLabelText('Contraseña*'))
    fireEvent.input(getByLabelText('Teléfono*'))
    fireEvent.submit(getByText('Unirme Ahora'))
    await wait(() => {
      expect(mutate).toHaveBeenCalledTimes(2)
    })
  })
})
