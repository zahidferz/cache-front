import SignupMail from './SignupMail'
import { axiosAccountProvisioning } from '../../../axiosConfig'
jest.mock('../../../axiosConfig')
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/SignupMail', () => {
  xit('exports a valid component', () => {
    expect(SignupMail).toBeAComponent()
  })
  xit('should display error if mail has incorrect pattern of mail', async () => {
    const mutate = jest.fn(() => Promise.resolve({}))
    const user = {
      name: 'Jonh',
    }
    const { fireEvent, getByLabelText, getByText, wait } = render(SignupMail, {
      stubs: ['RouterLink', 'RouterView'],
      mocks: {
        user,
        $apollo: {
          mutate,
        },
        $router: jest.fn(),
      },
    })
    const inputMail = getByLabelText('Correo Electrónico')
    inputMail.value = 'asa'
    fireEvent.input(inputMail)
    fireEvent.click(getByLabelText('Guardar'))
    await wait(() => expect(getByText('Escribe un correo válido')).toBeTruthy())
  })
  xit('should display error if user submits form with empty input value', async () => {
    const mutate = jest.fn(() => Promise.resolve({}))
    const user = {
      name: 'John',
    }
    const { fireEvent, getByLabelText, getByText, wait } = render(SignupMail, {
      stubs: ['RouterLink', 'RouterView'],
      mocks: {
        user,
        $apollo: {
          mutate,
        },
      },
    })

    fireEvent.click(getByLabelText('Guardar'))
    await wait(() => expect(getByText('Este campo es necesario')).toBeTruthy())
  })
  xit("displays the user's name", () => {
    const { getByText, wait } = render(SignupMail, {
      data: () => ({
        user: {
          name: 'John',
        },
      }),
    })
    wait(() => expect(getByText('John')).toBeTruthy())
  })
  xit('creates the account onSubmit', async () => {
    const mutate = jest.fn(() => Promise.resolve({}))
    const { fireEvent, getByLabelText, wait } = render(SignupMail, {
      data: () => ({
        user: {
          name: 'John',
        },
      }),
      mocks: {
        $apollo: {
          mutate,
        },
      },
    })

    const email = getByLabelText('Correo Electrónico')
    email.value = 'john@email.com'
    await fireEvent.input(email)

    axiosAccountProvisioning.post.mockImplementationOnce((route, payload) =>
      Promise.resolve()
    )
    fireEvent.click(getByLabelText('Guardar'))
    await wait(() => expect(axiosAccountProvisioning.post).toBeCalled())
  })
})
