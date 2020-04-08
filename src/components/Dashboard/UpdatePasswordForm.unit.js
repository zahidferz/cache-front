import UpdatePasswordForm from './UpdatePasswordForm'

describe('@components/UpdatePasswordForm', () => {
  it('exports a valid component', () => {
    expect(UpdatePasswordForm).toBeAComponent()
  })
  it('shows error Este campo es necesario if inputs are empty', async () => {
    const myAccount = {
      email: 'mail@mail.com',
    }
    const { fireEvent, getByText, queryByText, wait } = render(
      UpdatePasswordForm,
      {
        mocks: {
          myAccount,
        },
      }
    )
    await fireEvent.submit(getByText('Actualizar'))
    wait(() => {
      expect(queryByText('Este campo es necesario'))
    })
  })
  it('shows error Las contraseñas deben coincidir if new password and confirmation are different', async () => {
    const myAccount = {
      email: 'mail@mail.com',
    }
    const { fireEvent, getByText, queryByText, wait, getByLabelText } = render(
      UpdatePasswordForm,
      {
        mocks: {
          myAccount,
        },
      }
    )
    getByLabelText('Contraseña actual').value = 'Gestionix1'
    getByLabelText('Nueva contraseña').value = 'Gestionix2'
    getByLabelText('Confirmar contraseña').value = 'Gestionix3'

    await fireEvent.submit(getByText('Actualizar'))
    wait(() => {
      expect(queryByText('Las contraseñas deben coincidir'))
    })
  })
  it('shows error Las contraseñas deben coincidir if new password and confirmation are different', async () => {
    const myAccount = {
      email: 'mail@mail.com',
    }
    const mutate = jest.fn()
    const { fireEvent, getByText, wait, getByLabelText } = render(
      UpdatePasswordForm,
      {
        mocks: {
          myAccount,
          $apollo: {
            mutate,
          },
        },
      }
    )
    getByLabelText('Contraseña actual').value = 'Gestionix1'
    getByLabelText('Nueva contraseña').value = 'Gestionix2'
    getByLabelText('Confirmar contraseña').value = 'Gestionix2'
    await fireEvent.submit(getByText('Actualizar'))
    wait(() => {
      expect(mutate).toHaveBeenCalledTimes(1)
    })
  })
})
