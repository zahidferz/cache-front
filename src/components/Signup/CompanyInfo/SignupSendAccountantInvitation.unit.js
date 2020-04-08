import SignupSendAccountantInvitation from './SignupSendAccountantInvitation'
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/SignupSendAccountantInvitation', () => {
  it('exports a valid component', () => {
    expect(SignupSendAccountantInvitation).toBeAComponent()
  })
  xit(`shows error 'Campo obligatorio' if email is invalid`, async () => {
    const { getByLabelText, fireEvent, getByText, wait } = render(
      SignupSendAccountantInvitation,
      {
        stubs: ['Portal'],
      }
    )
    const validateBtn = getByLabelText('sendInvitation')
    fireEvent.submit(validateBtn)
    await wait(() => {
      expect(getByText('Campo obligatorio')).toBeTruthy()
    })
  })
  xit(`shows alert 'hacerlo después'`, () => {
    const { getByText, fireEvent } = render(SignupSendAccountantInvitation, {
      stubs: ['Portal'],
    })
    const doItLaterBtn = getByText('hacerlo después.')
    fireEvent.click(doItLaterBtn)
    expect(getByText('¿Seguro que quieres salir?')).toBeTruthy()
  })
  xit(`returns to accountantInvitation when 'CONTINUAR' is clicked`, () => {
    const { getByLabelText, fireEvent, getByText } = render(
      SignupSendAccountantInvitation,
      {
        stubs: ['Portal'],
      }
    )
    const doItLaterBtn = getByText('hacerlo después.')
    fireEvent.click(doItLaterBtn)
    const backToForm = getByText('continuar')
    fireEvent.click(backToForm)
    expect(getByLabelText('Correo Electrónico')).toBeTruthy()
  })
  xit(`calls 'doItLater' when 'SALIR' is clicked`, () => {
    const doItLater = jest.fn()
    const { fireEvent, getByText } = render(SignupSendAccountantInvitation, {
      methods: { doItLater },
      stubs: ['Portal'],
    })
    const doItLaterBtn = getByText('hacerlo después.')
    fireEvent.click(doItLaterBtn)
    const nextStepBtn = getByText('salir')
    fireEvent.click(nextStepBtn)
    expect(doItLater).toHaveBeenCalled()
  })
  xit('calls $router.push if email is valid', async () => {
    const $apollo = {
      mutate: Promise.resolve({
        res: {
          email: 'mail@gmail.com',
        },
      }),
    }
    const { fireEvent, getByLabelText, wait } = render(
      SignupSendAccountantInvitation,
      {
        mocks: {
          $apollo,
        },
        stubs: ['Portal'],
      }
    )
    const emailInput = getByLabelText('Correo Electrónico')
    emailInput.value = 'mail@gmail.com'
    fireEvent.input(emailInput)
    const onSubmitBtn = getByLabelText('sendInvitation')
    fireEvent.click(onSubmitBtn)
    await wait(() => {
      expect($apollo.mutate).toHaveBeenCalledTimes(1)
    })
  })
  it(`doesn't call $router.push if email is invalid`, async () => {
    const $router = {
      push: jest.fn(),
    }
    const { fireEvent, getByLabelText, wait } = render(
      SignupSendAccountantInvitation,
      {
        mocks: {
          $router,
        },
        stubs: ['Portal'],
      }
    )
    const emailInput = getByLabelText('Correo Electrónico')
    emailInput.value = 'mail@ma'
    fireEvent.input(emailInput)
    const onSubmitBtn = getByLabelText('sendInvitation')
    fireEvent.click(onSubmitBtn)
    await wait(() => {
      expect($router.push).toHaveBeenCalledTimes(0)
    })
  })
})
