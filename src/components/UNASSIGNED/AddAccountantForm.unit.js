import AddAccountantForm from './AddAccountantForm'

describe('@components/AddAccountantForm', () => {
  it('exports a valid component', () => {
    expect(AddAccountantForm).toBeAComponent()
  })
  xit('should display disabled button if input data is incorrect', () => {
    const { wrapper } = render(AddAccountantForm)
    const input = wrapper.find('input')
    input.element.value = 'mails.com'
    input.trigger('input')
    const button = wrapper.find('button')

    const disabled = button.attributes('disabled')
    expect(disabled).toBeTruthy()
  })
  xit('should not display disabled button when input data is correct', () => {
    const { wrapper } = render(AddAccountantForm)
    const input = wrapper.find('input')
    input.element.value = 'adad@mail.com'
    input.trigger('input')
    const button = wrapper.find('button')

    const disabled = button.attributes('disabled')
    expect(disabled).toBeFalsy()
  })
})
