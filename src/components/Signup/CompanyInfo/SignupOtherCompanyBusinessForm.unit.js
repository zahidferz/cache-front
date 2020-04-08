import SignupOtherCompanyBusinessForm from './SignupOtherCompanyBusinessForm'

describe('@components/SignupOtherCompanyBusinessForm', () => {
  it('exports a valid component', () => {
    expect(SignupOtherCompanyBusinessForm).toBeAComponent()
  })
  it(`shows error 'Este campo es requerido' when input is empty`, async () => {
    const { fireEvent, getByText, wait } = render(
      SignupOtherCompanyBusinessForm
    )
    const nextStep = getByText('continuar')
    await fireEvent.submit(nextStep)
    wait(() => {
      expect(getByText('Este campo es requerido')).toBeTruthy()
    })
  })
  it(`calls onSubmit when 'CONTINUAR' is clicked`, () => {
    const onSubmit = jest.fn()
    const { getByText, fireEvent, getByLabelText } = render(
      SignupOtherCompanyBusinessForm,
      {
        setData: {
          otherBusiness: 'Maquila',
        },
        methods: {
          onSubmit,
        },
      }
    )
    const inputOtherBusiness = getByLabelText('Giro Comercial')
    fireEvent.input(inputOtherBusiness)
    const nextStep = getByText('continuar')
    fireEvent.submit(nextStep)
    expect(onSubmit).toHaveBeenCalled()
  })
})
