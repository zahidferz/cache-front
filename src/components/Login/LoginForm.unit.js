import LoginForm from './LoginForm'

describe('@components/LoginForm', () => {
  it('exports a valid component', () => {
    expect(LoginForm).toBeAComponent()
  })

  xit('Shows error "Este campo es necesario" two times, if both inputs are empty"', async () => {
    const {
      getAllByText,
      fireEvent,
      getByPlaceholderText,
      wait,
      getByText,
    } = render(LoginForm, {
      stubs: ['router-link'],
    })
    const inputMail = getByPlaceholderText('Correo Electrónico')
    inputMail.value = ''
    fireEvent.input(inputMail)
    const inputPassword = getByPlaceholderText('Contraseña')
    inputPassword.value = ''
    fireEvent.input(inputPassword)
    const enterBtn = getByText('Entrar')
    fireEvent.submit(enterBtn)
    await wait(() => {
      expect(getAllByText('Este campo es necesario')).toBeTruthy()
    })
  })
  xit('Shows error "Este campo es necesario" one time, if password input is empty', async () => {
    const { getByText, fireEvent, getByLabelText, wait } = render(LoginForm, {
      stubs: ['router-link'],
    })
    const inputMail = getByLabelText('Correo Electrónico')
    inputMail.value = 'test@test.com'
    fireEvent.input(inputMail)
    const inputPassword = getByLabelText('Contraseña')
    inputPassword.value = ''
    fireEvent.input(inputPassword)
    fireEvent.submit(getByText('Entrar'))
    await wait(() => {
      expect(getByText('Este campo es necesario')).toBeTruthy()
    })
  })
  xit('Shows error "Este campo es necesario" one time, if inputMail input is empty', async () => {
    const { getByText, fireEvent, getByLabelText, wait } = render(LoginForm, {
      stubs: ['router-link'],
    })
    const inputMail = getByLabelText('Correo Electrónico')
    inputMail.value = ''
    fireEvent.input(inputMail)
    const inputPassword = getByLabelText('Contraseña')
    inputPassword.value = 'Thisismy123'
    fireEvent.input(inputPassword)
    fireEvent.submit(getByText('Entrar'))
    await wait(() => {
      expect(getByText('Este campo es necesario')).toBeTruthy()
    })
  })
  xit('Shows error "Wrong email or password.", if one input is empty', async () => {
    const { getByText, fireEvent, getByLabelText, wait } = render(LoginForm)
    const inputMail = getByLabelText('Correo Electrónico')
    inputMail.value = 'test@test.com'
    fireEvent.input(inputMail)
    const inputPassword = getByLabelText('Contraseña')
    inputPassword.value = 'Thistest123'
    fireEvent.input(inputPassword)
    fireEvent.submit(getByText('Entrar'))
    await wait(() => {
      expect(getByText('Wrong email or password.')).toBeTruthy()
    })
  })
  xit('Goes to Register screen if user clicks on "Regístrate"', async () => {
    const $router = {
      push: jest.fn(),
    }
    const { getByText, fireEvent, wait } = render(LoginForm, {
      stubs: ['router-link', 'router-view'],
      mocks: {
        $router,
      },
    })
    const registerBtn = getByText('Regístrate')
    fireEvent.click(registerBtn)
    await wait(() =>
      expect($router.push).toHaveBeenCalledWith({ name: 'signup' })
    )
  })
  xit('Goes to password recovery screen if user clicks on "Recuperar contraseña"', async () => {
    const $router = {
      push: jest.fn(),
    }
    const { getByText, fireEvent, wait } = render(LoginForm, {
      stubs: ['router-link', 'router-view'],
      mocks: {
        $router,
      },
    })
    const recoverPasswordBtn = getByText('Recuperar contraseña')
    fireEvent.click(recoverPasswordBtn)
    await wait(() =>
      expect($router.push).toHaveBeenCalledWith({
        name: 'passwordrecovery',
      })
    )
  })
})
