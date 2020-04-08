import LoginPasswordRecovery from './LoginPasswordRecovery'
import { axiosAuth } from '../../axiosConfig'
jest.mock('../../axiosConfig')
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/LoginPasswordRecovery', () => {
  it('exports a valid component', () => {
    expect(LoginPasswordRecovery).toBeAComponent()
  })
  // it shows error message 'Este campo es necesario.' when input is empty
  xit(`shows error message 'Este campo es necesario.' when input is empty`, async () => {
    const { getByText, fireEvent } = render(LoginPasswordRecovery)
    const nextStepBtn = getByText('siguiente')
    await fireEvent.submit(nextStepBtn)
    expect(getByText('Este campo es necesario.')).toBeTruthy()
  })
  // it shows error 'Escribe un correo válido' when the input is invalid
  it(`shows error message 'Escribe un correo válido' when input is invalid`, async () => {
    const { getByText, fireEvent, getByLabelText, wait } = render(
      LoginPasswordRecovery
    )
    const emailInput = getByLabelText('Correo Electrónico')
    emailInput.value = 'mail'
    fireEvent.input(emailInput)
    await wait(() => {
      expect(getByText('Escribe un correo válido')).toBeTruthy()
    })
  })
  // it calls axiosAuth.post when input is valid.
  it(`shows error message 'Escribe un correo válido' when input is invalid`, async () => {
    const $router = {
      push: jest.fn(),
    }
    const $apollo = {
      mutate: jest.fn(() => Promise.resolve()),
    }
    const { getByText, fireEvent, getByLabelText, wait } = render(
      LoginPasswordRecovery,
      {
        mocks: {
          $router,
          $apollo,
        },
      }
    )
    const emailInput = getByLabelText('Correo Electrónico')
    emailInput.value = 'mail@mail.com'
    fireEvent.input(emailInput)
    const nextStepBtn = getByText('siguiente')
    await fireEvent.submit(nextStepBtn)
    axiosAuth.post.mockImplementationOnce((route, payload) => Promise.resolve())
    await wait(() => expect(axiosAuth.post).toBeCalledTimes(1))
  })
})
