import LoginMailRecovery from './LoginMailRecovery'
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/LoginMailRecovery', () => {
  it('exports a valid component', () => {
    expect(LoginMailRecovery).toBeAComponent()
  })
  // it calls resendMail when REENVIAR CORREO is clicked
  it('calls resendMail when REENVIAR CORREO is clicked', async () => {
    const user = {
      email: 'gjetzable@gmail.com',
    }
    const resendMail = jest.fn()
    const { getByText, fireEvent } = render(LoginMailRecovery, {
      mocks: {
        user,
      },
      methods: {
        resendMail,
      },
    })
    const resendBtn = getByText('REENVIAR CORREO')
    fireEvent.click(resendBtn)
    expect(resendMail).toHaveBeenCalledTimes(1)
  })
})
