import SignupDownloadXmlsForm from './SignupDownloadXmlsForm'
// You can use RouterLinkStub component to find a router-link component in the render tree.
import { RouterLinkStub } from '@vue/test-utils'
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/SignupDownloadXmlForm', () => {
  it('exports a valid component', () => {
    expect(SignupDownloadXmlsForm).toBeAComponent()
  })
  xit('shows error: "Te falta capturar tu RFC" if user submits both inputs empty', async () => {
    const { getByText, fireEvent, getByLabelText, wait } = render(
      SignupDownloadXmlsForm,
      {
        stubs: ['RouterLink', 'RouterView'],
      }
    )
    const inputTaxId = getByLabelText('taxId')
    inputTaxId.value = ''
    fireEvent.input(inputTaxId)
    const inputPassword = getByLabelText('ciec')
    inputPassword.value = ''
    fireEvent.submit(getByText('conectarme'))
    await wait(() => {
      expect(getByText('Te falta capturar tu RFC')).toBeTruthy()
    })
  })
  xit('shows error: "Si no recuerdas tu contraseña del SAT puedes capturar tus datos manualmente" ONLY IF password input is empty', async () => {
    const { fireEvent, getByPlaceholderText, getByText, wait } = render(
      SignupDownloadXmlsForm,
      {
        stubs: ['RouterLink', 'RouterView'],
      }
    )
    const inputTaxId = getByPlaceholderText('RFC')
    inputTaxId.value = 'CARD950301664'
    fireEvent.input(inputTaxId)
    const inputPassword = getByPlaceholderText('Contraseña del SAT')
    inputPassword.value = ''
    fireEvent.input(inputPassword)
    fireEvent.submit(getByText('conectarme'))
    await wait(() => {
      expect(
        getByText(
          'Si no recuerdas tu contraseña del SAT puedes capturar tus datos manualmente'
        )
      ).toBeTruthy()
    })
  })
  xit('Goes to the next page if input values are correct"', async () => {
    const $router = {
      push: jest.fn(),
    }
    const $apollo = {
      mutate: jest.fn(),
    }
    const { fireEvent, getByPlaceholderText, getByText, wait } = render(
      SignupDownloadXmlsForm,
      {
        stubs: ['RouterLink', 'RouterView', 'Portal'],
        mocks: {
          $router,
          $apollo,
        },
      }
    )
    const inputTaxId = getByPlaceholderText('RFC')
    inputTaxId.value = 'XEXX010101000'
    fireEvent.input(inputTaxId)
    const inputPassword = getByPlaceholderText('Contraseña del SAT')
    inputPassword.value = '12345678a'
    fireEvent.input(inputPassword)
    fireEvent.submit(getByText('conectarme'))
    await wait(() => expect($apollo.mutate).toHaveBeenCalled())
  })

  xit('Does not go to the next page if input values are incorrect "', async () => {
    const $router = {
      push: jest.fn(),
    }
    const { fireEvent, getByPlaceholderText, getByText, wait } = render(
      SignupDownloadXmlsForm,
      {
        stubs: ['RouterLink', 'RouterView'],
        mocks: {
          $router,
        },
      }
    )
    const inputTaxId = getByPlaceholderText('RFC')
    inputTaxId.value = 'CARD01664'
    fireEvent.input(inputTaxId)
    const inputPassword = getByPlaceholderText('Contraseña del SAT')
    inputPassword.value = 'Padadadasd11231231'
    fireEvent.input(inputPassword)
    fireEvent.click(getByText('conectarme'))
    await wait(() => expect($router.push).toHaveBeenCalledTimes(0))
  })
  xit('Go to manual process when that option is clicked ', async () => {
    const { wrapper } = render(SignupDownloadXmlsForm, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    })
    const manualFormBtn = wrapper.findAll(RouterLinkStub).at(0)
    expect(manualFormBtn.props().to).toEqual({
      name: 'taxinfoform',
      query: {
        taxId: '',
      },
    })
  })
})

describe('@components/SignupDownloadXmlForm Desktop', () => {
  let queries
  const $router = {
    push: jest.fn(),
  }
  const mqConfig = {
    breakpoints: {
      mo: 768,
      de: Infinity,
    },
    defaultBreakpoint: 'de',
  }
  beforeEach(() => {
    queries = render(SignupDownloadXmlsForm, {
      stubs: ['router-link'],
      mocks: {
        $router,
      },
      mqConfig,
    })
  })
  xit('Shows an error if user clicks submit an the form is empty', async () => {
    const { getByText, fireEvent, wait } = queries
    fireEvent.submit(getByText('conectarme'))
    await wait(() => getByText('Te falta capturar tu RFC'))
  })
  xit('Shows an error if the user tries to submit the form without a CIEC', async () => {
    const value = 'HELK111111LP3'
    const errorMessage =
      'Si no recuerdas tu contraseña del SAT puedes capturar tus datos manualmente'
    const { getByText, getByLabelText, fireEvent, wait } = queries
    const taxIdInput = getByLabelText('RFC')
    fireEvent.input(taxIdInput, {
      target: {
        value,
      },
    })
    fireEvent.submit(getByText('conectarme'))
    await wait(() => getByText(errorMessage))
  })
  it('Shows an error if the user tries type an invalid taxId', async () => {
    const value = 'invalidTaxId'
    const errorMessage = 'Ups, RFC inválido'
    const { getByText, getByLabelText, fireEvent, wait } = queries
    const taxIdInput = getByLabelText('RFC*')
    fireEvent.input(taxIdInput, {
      target: {
        value,
      },
    })
    await wait(() => getByText(errorMessage))
  })
  it('Go to manual process when checkbox input is checked', async () => {
    const { getAllByLabelText, fireEvent, wait } = queries
    const taxIdInput = getAllByLabelText('Ingresar mi información manualmente.')
    fireEvent.input(taxIdInput[0], {
      target: {
        checked: true,
      },
    })
    await wait(() => expect($router.push).toHaveBeenCalledTimes(1))
  })
})
