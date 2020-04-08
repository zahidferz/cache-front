import { render, fireEvent } from '@testing-library/vue'
import GxTextField from './GxTextField'
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))
// Tell jest to mock this import
describe('@components/GxTextField', () => {
  fit(`shows an error if the validationFn returns a String with the error message`, async () => {
    // GxTextField requires a full @input :value flow to work.
    // Since we're isolating the component, the @input event is never heard if we just render
    // GxTextField, so we create a wrapper that properly binds via v-model
    // When testing other components that import GxTextField and its derivatives, this
    // shouldn't be necessary since they'll do the work our wrapperComponent performs here
    const wrapperComponent = {
      template:
        '<div><GxTextField v-model="inputValue" label="Enter a value" :validation-fn="validationFn" /></div>',
      data() {
        return {
          inputValue: '',
        }
      },
      methods: {
        validationFn: (value) => {
          if (value.length < 2) {
            return 'Value is too short'
          }
          if (value.length > 5) {
            return 'Value is too long'
          }

          return ''
        },
      },
      components: {
        GxTextField,
      },
    }
    const { getByLabelText, getByText } = render(wrapperComponent)

    const input = getByLabelText(/Enter a value/i)

    await fireEvent.update(input, 'A')
    expect(getByText('Value is too short')).toBeTruthy()

    await fireEvent.update(input, 'Alphanumeric')
    expect(getByText('Value is too long')).toBeTruthy()
  })
})
