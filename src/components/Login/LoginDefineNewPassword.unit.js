import LoginDefineNewPassword from './LoginDefineNewPassword'
import { axiosAuth } from '../../axiosConfig'
jest.mock('../../axiosConfig')
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/LoginDefineNewPassword', () => {
  it('exports a valid component', () => {
    expect(LoginDefineNewPassword).toBeAComponent()
  })
  // shows error 'Este campo es necesario.' when CAMBIAR CONTRASEÑA is clicked and inputs are empty
  xit(`shows error 'Este campo es necesario.' when CAMBIAR CONTRASEÑA is clicked and inputs are empty`, async () => {
    const $route = {
      query: {
        token: '',
        email: 'mail@mail.com',
      },
    }
    const { getByText, fireEvent, wait } = render(LoginDefineNewPassword, {
      mocks: {
        $route,
      },
    })
    const changePassBtn = getByText('cambiar contraseña')
    await fireEvent.submit(changePassBtn)
    await wait(() => {
      expect(getByText('Este campo es requerido')).toBeTruthy()
    })
  })
  // shows error 'La contraseña no es igual.' when CAMBIAR CONTRASEÑA is clicked and password and confirmation are different
  xit(`shows error 'La contraseña no es igual.' when CAMBIAR CONTRASEÑA is clicked and password and confirmation are different`, async () => {
    const $route = {
      query: {
        token: '',
        email: 'mail@mail.com',
      },
    }
    const { getByText, fireEvent, wait, getByLabelText } = render(
      LoginDefineNewPassword,
      {
        mocks: {
          $route,
        },
      }
    )
    getByLabelText('Nueva contraseña').value = 'Gestionix_1'
    await fireEvent.input(getByLabelText('Nueva contraseña'))
    getByLabelText('Confirmar contraseña').value = 'Gestionix'
    await fireEvent.input(getByLabelText('Confirmar contraseña'))
    const changePassBtn = getByText('cambiar contraseña')
    await fireEvent.submit(changePassBtn)
    await wait(() => {
      expect(getByText('La contraseña no es igual.')).toBeTruthy()
    })
  })
  // calls axiosAuth.post when inputs are valid
  xit(`calls axiosAuth.post when inputs are valid`, async () => {
    const $router = {
      push: jest.fn(),
    }
    const $route = {
      query: {
        token: '',
        email: 'mail@mail.com',
      },
    }
    const { getByText, fireEvent, wait, getByLabelText } = render(
      LoginDefineNewPassword,
      {
        mocks: {
          $route,
          $router,
        },
      }
    )
    getByLabelText('Nueva contraseña').value = 'Gestionix_1'
    await fireEvent.input(getByLabelText('Nueva contraseña'))
    getByLabelText('Confirmar contraseña').value = 'Gestionix_1'
    await fireEvent.input(getByLabelText('Confirmar contraseña'))
    const changePassBtn = getByText('cambiar contraseña')
    await fireEvent.submit(changePassBtn)
    axiosAuth.post.mockImplementationOnce((route, payload) => Promise.resolve())
    await wait(() => {
      expect(axiosAuth.post).toHaveBeenCalledTimes(1)
    })
  })
})
