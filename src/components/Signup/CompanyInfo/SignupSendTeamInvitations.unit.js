import SignupSendTeamInvitations from './SignupSendTeamInvitations'
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/SignupSendTeamInvitations', () => {
  it('exports a valid component', () => {
    expect(SignupSendTeamInvitations).toBeAComponent()
  })
  it(`shows error 'Escribe al menos un correo válido.' when input is empty`, () => {
    const { fireEvent, getByText, getByLabelText } = render(
      SignupSendTeamInvitations,
      {
        stubs: ['Portal'],
      }
    )
    const emailInput = getByLabelText('Correos electrónicos')
    fireEvent.input(emailInput)
    const sendInvitationsBtn = getByText('enviar invitaciones')
    fireEvent.click(sendInvitationsBtn)
    expect(getByText('Escribe al menos un correo válido.')).toBeTruthy()
  })
  it(`shows alert when 'omitir este paso' is clicked`, () => {
    const { fireEvent, getByText } = render(SignupSendTeamInvitations, {
      stubs: ['Portal'],
    })
    const skipStepBtn = getByText('Omitir este paso')
    fireEvent.click(skipStepBtn)
    expect(getByText('¿Seguro que quieres salir?')).toBeTruthy()
  })
  it(`Calls method 'doItLater' if 'SALIR' is clicked`, () => {
    const doItLater = jest.fn()
    const { fireEvent, getByText } = render(SignupSendTeamInvitations, {
      stubs: ['Portal'],
      methods: { doItLater },
      mocks: {
        push: jest.fn(),
      },
    })
    const skipStepBtn = getByText('Omitir este paso')
    fireEvent.click(skipStepBtn)
    const nextStepBtn = getByText('salir')
    fireEvent.click(nextStepBtn)
    expect(doItLater).toHaveBeenCalled()
  })
  it(`calls 'closeModal' when 'CONTINUAR' is clicked`, () => {
    const closeModal = jest.fn()
    const { fireEvent, getByText } = render(SignupSendTeamInvitations, {
      methods: { closeModal },
      stubs: ['Portal'],
    })
    const skipStepBtn = getByText('Omitir este paso')
    fireEvent.click(skipStepBtn)
    const backToForm = getByText('continuar')
    fireEvent.click(backToForm)
    expect(closeModal).toHaveBeenCalled()
  })
})
