import UpdateMyInfo from './UpdateMyInfo'

describe('@components/UpdateMyInfo', () => {
  it('exports a valid component', () => {
    expect(UpdateMyInfo).toBeAComponent()
  })
  it('Calls mutation when user updates this information', async () => {
    const myAccount = {
      firstName: 'User',
      lastName: 'Test',
      mobilePhone: '5236233634',
    }
    const mutate = jest.fn()
    const { getByLabelText, fireEvent, wait, getByText } = render(
      UpdateMyInfo,
      {
        mocks: {
          myAccount,
          $apollo: {
            mutate,
          },
        },
        stubs: ['Portal'],
      }
    )
    getByLabelText('Nombre').value = 'Lorem'
    await fireEvent.input(getByLabelText('Nombre'))
    getByLabelText('Apellido').value = 'Lorem'
    await fireEvent.input(getByLabelText('Apellido'))
    getByLabelText('Teléfono').value = '23653214563'
    await fireEvent.input(getByLabelText('Teléfono'))
    fireEvent.submit(getByText('Actualizar'))
    await wait(() => {
      expect(mutate).toHaveBeenCalledTimes(1)
    })
  })
})
