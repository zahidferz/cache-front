import SignupPhone from './SignupPhone'

describe('@components/SignupPhone', () => {
  xit('exports a valid component', () => {
    expect(SignupPhone).toBeAComponent()
  })
  xit('should display error when input data is incorrect', async () => {
    const user = {
      name: 'Beta',
    }
    const { getByText, getByLabelText, fireEvent, wait } = render(SignupPhone, {
      mocks: {
        user,
      },
    })
    const inputPhone = getByLabelText('Teléfono')
    inputPhone.value = '1122'
    fireEvent.input(inputPhone)
    fireEvent.click(getByLabelText('Guardar'))
    await wait(() => getByText('Teléfono mínimo de 10 dígitos'))
  })
  xit('should not display error when input data is empty', async () => {
    const user = {
      name: 'Beta',
    }
    const { getByText, getByLabelText, fireEvent, wait } = render(SignupPhone, {
      mocks: {
        user,
      },
    })
    const inputPhone = getByLabelText('Teléfono')
    inputPhone.value = ''
    fireEvent.input(inputPhone)
    fireEvent.click(getByLabelText('Guardar'))
    await wait(() => getByText('Este campo es necesario'))
  })
  xit('should call apollo mutation when input data is valid', async () => {
    const user = {
      name: 'Beta',
    }
    const mutate = jest.fn()
    const { getByLabelText, fireEvent, wait } = render(SignupPhone, {
      mocks: {
        user,
        $apollo: {
          mutate,
        },
      },
    })
    const inputPhone = getByLabelText('Teléfono')
    inputPhone.value = '5546854218'
    fireEvent.input(inputPhone)
    fireEvent.click(getByLabelText('Guardar'))
    await wait(() => mutate)
  })
})
