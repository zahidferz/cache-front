import SignupAccountConfirmation from './SignupAccountConfirmation'
jest.mock('lodash/debounce', () => jest.fn((cb) => cb))

describe('@components/SignupAccountConfirmation', () => {
  it('exports a valid component', () => {
    expect(SignupAccountConfirmation).toBeAComponent()
  })
  it('calls resendEmail when REENVIAR CORREO is clicked', async () => {
    const resendEmail = jest.fn()
    const user = {
      name: 'User',
      email: 'mail@mail.com',
    }
    const { getByText, fireEvent, wait } = render(SignupAccountConfirmation, {
      stubs: ['router-link'],
      methods: {
        resendEmail,
      },
      mocks: {
        user,
      },
    })
    const resendButton = getByText('REENVIAR CORREO')
    fireEvent.click(resendButton)
    await wait(() => {
      expect(resendEmail).toHaveBeenCalledTimes(1)
    })
  })
})
