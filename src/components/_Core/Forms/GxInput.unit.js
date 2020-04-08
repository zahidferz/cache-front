import GxInput from './GxInput'
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

// Tell jest to mock this import
describe('@components/GxInput', () => {
  it(`shows error 'Escribe un correo válido.' if email is invalid`, async () => {
    const { fireEvent, getByText, getByLabelText, wait } = render(GxInput, {
      propsData: {
        value: 'mail@mail',
        placeholder: 'inputData',
        label: 'inputData',
        pattern: 'email',
      },
    })
    fireEvent.input(getByLabelText('inputData'))
    await wait(() => expect(getByText('Escribe un correo válido')).toBeTruthy())
  })
})
