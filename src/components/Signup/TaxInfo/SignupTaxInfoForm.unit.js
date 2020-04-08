import SignupTaxInfoForm from './SignupTaxInfoForm'

describe('@components/SignupTaxInfoForm', () => {
  it('exports a valid component', () => {
    expect(SignupTaxInfoForm).toBeAComponent()
  })
  xit('If user with sends ONLY the taxID, missing required fields should render errors', () => {
    const { getByText, getAllByText, getByLabelText, fireEvent } = render(
      SignupTaxInfoForm
    )
    const inputTaxID = getByLabelText('RFC*')
    inputTaxID.value = 'CAR123212111'
    fireEvent.input(inputTaxID)
    fireEvent.click(getByText('continuar'))
    expect(getByText('Razón Social es un campo necesario')).toBeTruthy()
    expect(getAllByText('Debes seleccionar tu régimen fiscal')).toBeTruthy()
  })
  xit('If user sends form without any data it should display errors from required fields (RFC, regime and company)', () => {
    const { getByText, fireEvent } = render(SignupTaxInfoForm)
    fireEvent.click(getByText('continuar'))
    expect(getByText('Debes completar los campos obligatorios')).toBeTruthy()
  })
  xit('If Razón Social has less than 2 letters it should display "Nombre o Razón Social deben contener más de dos caracteres"', () => {
    const { getByText, getByLabelText, fireEvent } = render(SignupTaxInfoForm)
    const inputTaxID = getByLabelText('RFC*')
    inputTaxID.value = 'CAR123212111'
    fireEvent.input(inputTaxID)
    const inputCompany = getByLabelText('Nombre o Razón Social*')
    inputCompany.value = 'R'
    fireEvent.input(inputCompany)
    expect(
      getByText('Nombre o Razón Social debe contener más de dos caracteres')
    ).toBeTruthy()
  })
  xit('If Nombre Comercial has less than 2 letters it should display "Nombre Comercial debe contener más de dos caracteres"', () => {
    const { getByText, getByLabelText, fireEvent } = render(SignupTaxInfoForm)
    const inputTaxID = getByLabelText('RFC*')
    inputTaxID.value = 'CAR123212111'
    fireEvent.input(inputTaxID)
    const inputCompany = getByLabelText('Nombre o Razón Social*')
    inputCompany.value = 'RT'
    fireEvent.input(inputCompany)
    const inputCommercial = getByLabelText('Nombre Comercial*')
    inputCommercial.value = 'R'
    fireEvent.input(inputCommercial)
    fireEvent.click(getByText('continuar'))
    expect(
      getByText('Nombre Comercial debe contener más de dos caracteres')
    ).toBeTruthy()
  })
  it('Does not goes to the next page if input values are incorrect "', async () => {
    const $router = {
      push: jest.fn(),
    }
    const { fireEvent, getByLabelText, getByText, wait } = render(
      SignupTaxInfoForm,
      {
        mocks: {
          $router,
        },
      }
    )
    const inputTaxId = getByLabelText('RFC')
    inputTaxId.value = 'CARD01664'
    fireEvent.input(inputTaxId)
    const inputCompany = getByLabelText('Nombre o Razón Social')
    inputCompany.value = 'P'
    fireEvent.input(inputCompany)
    fireEvent.click(getByText('continuar'))
    await wait(() => expect($router.push).toHaveBeenCalledTimes(0))
  })
  xit('goes to the next page if input values are correct', async () => {
    // axios.mockImplementation
    const axiosAccountProvisioning = {
      post: jest.fn(),
    }
    const { fireEvent, getByLabelText, getByText, wait } = render(
      SignupTaxInfoForm,
      {
        mocks: {
          axiosAccountProvisioning,
        },
      }
    )

    const inputTaxId = getByLabelText('RFC*')
    inputTaxId.value = 'CARD010395664'
    fireEvent.input(inputTaxId)
    const inputCompany = getByLabelText('Nombre o Razón Social*')
    inputCompany.value = 'Pp'
    fireEvent.input(inputCompany)
    await wait(() => {
      expect(getByText('Arrendamiento')).toBeTruthy()
    })
    getByText('Arrendamiento').selected = true
    await fireEvent.change(getByLabelText('Régimen Fiscal*'))
    await fireEvent.click(getByText('continuar'))
    expect(axiosAccountProvisioning.post).toHaveBeenCalledTimes(1)
  })
})
