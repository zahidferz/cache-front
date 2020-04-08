import RegisterCiecForm from './RegisterCiecForm'

describe('@components/RegisterCiec/RegisterCiecForm', () => {
  // it renders input for RFC and CIEC
  it('renders input for RFC and CIEC', () => {
    const { getByLabelText } = render(RegisterCiecForm, {
      stubs: ['RouterLink'],
    })
    expect(getByLabelText('RFC')).toBeTruthy()
    expect(getByLabelText('CIEC')).toBeTruthy()
  })
})
