import CreateNewClientForm from './CreateNewClientForm'
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/CreateNewClientForm', () => {
  it('exports a valid component', () => {
    expect(CreateNewClientForm).toBeAComponent()
  })
  it('Asks for commercial name if empty at submit event', async () => {
    const $route = {
      params: {
        clientId: null,
      },
    }
    const { getByText, fireEvent, wait } = render(CreateNewClientForm, {
      mocks: {
        $route,
      },
      stubs: ['Portal'],
    })
    fireEvent.click(getByText('Guardar'))
    await wait(() => {
      expect(getByText('Este campo es necesario')).toBeTruthy()
    })
  })
  it('Calls create client mutation when submit', async () => {
    const $route = {
      params: {
        clientId: null,
        newSale: false,
      },
    }
    const redirectModal = jest.fn()
    const company = {
      number: '190217',
    }
    const mutate = jest.fn(() =>
      Promise.resolve({
        data: {
          clientCreate: {
            clientId: '7CAEF3E1-3477-4EB2-A8B2-F2E9BF082A57',
          },
        },
      })
    )
    const { getByText, fireEvent, wait, getByLabelText } = render(
      CreateNewClientForm,
      {
        mocks: {
          $route,
          company: company,
          commercialName: 'Nombre Comercial',
          $apollo: {
            mutate,
          },
        },
        stubs: ['Portal'],
        methods: {
          redirectModal,
        },
      }
    )
    getByLabelText('Nombre Comercial').value = 'Nombre Comercial'
    fireEvent.input(getByLabelText('Nombre Comercial'))
    fireEvent.click(getByText('Guardar'))
    await wait(() => {
      expect(mutate).toHaveBeenCalledTimes(1)
      expect(getByText('Cliente creado')).toBeTruthy()
    })
    // expect(redirectModal).toHaveBeenCalledTimes(1)
  })
  it('shows more contact info inputs if add contact is clicked', async () => {
    const $route = {
      params: {
        clientId: null,
        newSale: false,
      },
    }

    const {
      getByText,
      fireEvent,
      queryAllByText,
      queryAllByLabelText,
    } = render(CreateNewClientForm, {
      mocks: {
        $route,
      },
      stubs: ['Portal'],
    })
    expect(queryAllByLabelText('Puesto').length).toBe(1)
    fireEvent.click(getByText('Agregar contacto'))
    expect(queryAllByLabelText('Puesto').length).toBe(2)
    expect(queryAllByText('Eliminar contacto').length).toBe(2)
  })
  it('delete contact info inputs if delete contact is clicked', async () => {
    const $route = {
      params: {
        clientId: null,
        newSale: false,
      },
    }

    const {
      getByText,
      fireEvent,
      queryAllByText,
      queryAllByLabelText,
    } = render(CreateNewClientForm, {
      mocks: {
        $route,
      },
      stubs: ['Portal'],
    })
    fireEvent.click(getByText('Agregar contacto'))
    expect(queryAllByText('Eliminar contacto').length).toBe(2)
    fireEvent.click(queryAllByText('Eliminar contacto')[0])
    expect(queryAllByLabelText('Puesto').length).toBe(1)
  })
  it('delete specific contact info if delete contact is clicked', async () => {
    const $route = {
      params: {
        clientId: null,
      },
    }
    Element.prototype.scrollIntoView = () => {}
    const {
      getByLabelText,
      getByText,
      fireEvent,
      queryAllByText,
      queryAllByLabelText,
    } = render(CreateNewClientForm, {
      mocks: {
        $route,
      },
      stubs: ['Portal'],
    })
    fireEvent.click(getByText('Agregar contacto'))
    expect(queryAllByText('Eliminar contacto').length).toBe(2)
    queryAllByLabelText('Puesto')[0].value = 'Empleado'
    await fireEvent.input(queryAllByLabelText('Puesto')[0])
    queryAllByLabelText('Puesto')[1].value = 'Contador'
    await fireEvent.input(queryAllByLabelText('Puesto')[1])
    fireEvent.click(queryAllByText('Eliminar contacto')[1])
    expect(queryAllByLabelText('Puesto').length).toBe(1)
    expect(getByLabelText('Puesto').value).toBe('Empleado')
  })
  it('delete bank account inputs if delete bank account is clicked', async () => {
    const $route = {
      params: {
        clientId: null,
        newSale: false,
      },
    }

    const {
      getByText,
      fireEvent,
      queryAllByText,
      queryAllByLabelText,
    } = render(CreateNewClientForm, {
      mocks: {
        $route,
      },
      stubs: ['Portal'],
    })
    fireEvent.click(getByText('Agregar cuenta'))
    expect(queryAllByText('Eliminar cuenta').length).toBe(2)
    fireEvent.click(queryAllByText('Eliminar cuenta')[0])
    expect(queryAllByLabelText('Cuenta').length).toBe(1)
  })
  it('delete specific bank account if delete bank account is clicked', async () => {
    const $route = {
      params: {
        clientId: null,
        newSale: false,
      },
    }
    Element.prototype.scrollIntoView = () => {}
    const {
      getByLabelText,
      getByText,
      fireEvent,
      queryAllByText,
      queryAllByLabelText,
    } = render(CreateNewClientForm, {
      mocks: {
        $route,
      },
      stubs: ['Portal'],
    })
    fireEvent.click(getByText('Agregar cuenta'))
    expect(queryAllByText('Eliminar cuenta').length).toBe(2)
    queryAllByLabelText('Cuenta')[0].value = '010101010101010101'
    await fireEvent.input(queryAllByLabelText('Cuenta')[0])
    queryAllByLabelText('Cuenta')[1].value = '02020202020202020202'
    await fireEvent.input(queryAllByLabelText('Cuenta')[1])
    fireEvent.click(queryAllByText('Eliminar cuenta')[1])
    expect(queryAllByLabelText('Cuenta').length).toBe(1)
    expect(getByLabelText('Cuenta').value).toBe('010101010101010101')
  })
  // Updating client
  xit('Calls update client mutation when submit', async () => {
    const $route = {
      params: {
        clientId: '7CAEF3E1-3477-4EB2-A8B2-F2E9BF082A57',
        newSale: false,
      },
    }
    const redirectModal = jest.fn()
    const company = {
      number: '190217',
    }
    const mutate = jest.fn(() =>
      Promise.resolve({
        data: {
          taxId: 'GADP9101076U1',
          commercialName: 'Nombre Comercial',
        },
      })
    )

    const countries = [
      {
        country: 'Alemania',
        countryCode: 'DEU',
      },
      {
        country: 'México',
        countryCode: 'MEX',
      },
    ]
    const editingClientData = {
      commercialName: 'Nombre Comercial',
      clientId: null,
      clientNumber: 25,
      isNational: 'Nacional',
      branches: [],
      address: {
        fullAddress: '',
      },
      bankAccounts: [],
      businessName: '',
      contacts: [
        {
          name: '',
          nameError: null,
          invalidName: '',
          jobTitle: '',
          email: '',
          customErrorMail: null,
          invalidEmail: '',
          mobilePhone: '',
          customErrorMobilePhone: null,
          invalidMobilePhone: '',
          phone: '',
          customErrorPhone: null,
          invalidPhone: '',
        },
      ],
      status: 'ACTIVO',
      statusSwitchOptions: ['ACTIVO', 'INACTIVO'],
      taxId: '',
      countryCode: 'MEX',
      sellOnCredit: false,
      maximumCreditAmount: '',
      maximumCreditDays: '',
      customClientNumberError: null,
      customMaxCreditError: null,
      customMaxDaysOfCreditError: null,
    }
    const { getByLabelText, fireEvent } = render(CreateNewClientForm, {
      mocks: {
        $route,
        company: company,
        $apollo: {
          mutate,
          query: {
            countries,
          },
        },
      },
      stubs: ['Portal'],
      methods: {
        redirectModal,
      },
      propsData: {
        editingClientData,
      },
    })
    expect(getByLabelText('Nombre Comercial').value).toBe('Nombre Comercial')
    getByLabelText('Nombre Comercial').value = 'Nombre dos'
    fireEvent.click(getByLabelText('guardar'))
    expect(mutate).toHaveBeenCalledTimes(1)
    expect(getByLabelText('Nombre Comercial').value).toBe('Nombre dos')
  })
})
