import UploadLogo from './UploadLogo'
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/UploadLogo', () => {
  it('exports a valid component', () => {
    expect(UploadLogo).toBeAComponent()
  })
  // shows modal '¿Seguro que quieres salir?' when omitir este paso is clicked
  it(`shows modal '¿Seguro que quieres salir?' when omitir este paso is clicked`, async () => {
    const { fireEvent, getByText, wait } = render(UploadLogo, {
      stubs: ['router-link', 'Portal'],
    })
    await fireEvent.click(getByText('omitir este paso'))
    await wait(() => {
      expect(getByText('¿Seguro que quieres salir?')).toBeTruthy()
    })
  })
  it(`calls $router.push when SALIR is clicked`, async () => {
    const $router = {
      push: jest.fn(),
    }
    const { fireEvent, getByText, wait } = render(UploadLogo, {
      stubs: ['router-link', 'Portal'],
      mocks: {
        $router,
      },
    })
    await fireEvent.click(getByText('omitir este paso'))
    await fireEvent.click(getByText('salir'))
    await wait(() => {
      expect($router.push).toHaveBeenCalledTimes(1)
    })
  })
  it(`closes modal when CONTINUAR is clicked`, async () => {
    const $router = {
      push: jest.fn(),
    }
    const { fireEvent, getByText, wait } = render(UploadLogo, {
      stubs: ['router-link', 'Portal'],
      mocks: {
        $router,
      },
    })
    await fireEvent.click(getByText('omitir este paso'))
    await fireEvent.click(getByText('continuar'))
    await wait(() => {
      expect(getByText(/SUBIR LOGO/)).toBeTruthy()
    })
  })
})
