import UploadCSD from './UploadCSD'
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/UploadCSD', () => {
  it('exports a valid component', () => {
    expect(UploadCSD).toBeAComponent()
  })
  fit('prompts user to upload the next required file or fill the password input after the previous step is donde', async () => {
    const fileCer = new File(['cer'], 'cer.cer', {
      type: 'text/plain',
    })
    const fileKey = new File(['key'], 'key.key', {
      type: 'text/plain',
    })
    const { fireEvent, getByLabelText, getByText, queryByText, wait } = render(
      UploadCSD,
      {
        stubs: ['RouterLink', 'Portal'],
      }
    )

    // Step 1: upload .CER
    const inputCer = getByLabelText(/Subir .Cer/)
    Object.defineProperty(inputCer, 'files', {
      value: [fileCer],
    })
    fireEvent.change(inputCer)
    await wait(() => expect(queryByText(/Subir .Cer/)).toBeFalsy())
    await wait(() => expect(getByText(/Subir .Key/)).toBeTruthy())

    // Step 2: upload .KEY
    const inputKey = getByLabelText(/Subir .Key/)
    Object.defineProperty(inputKey, 'files', {
      value: [fileKey],
    })
    fireEvent.change(inputKey)
    await wait(() => expect(queryByText(/Subir .Cer/)).toBeFalsy())
    await wait(() => expect(queryByText(/Subir .Key/)).toBeFalsy())

    // Step 3: enter password
    const inputPassword = getByLabelText(/Contraseña/)
    inputPassword.value = 'kasjdfaksjdsakd'
    fireEvent.change(inputPassword)
    await wait(() => expect(queryByText(/Subir .Cer/)).toBeFalsy())
    await wait(() => expect(queryByText(/Subir .Key/)).toBeFalsy())

    // Step 4: Submit form
  })
})
