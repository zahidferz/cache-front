import GxTodoDashboardCard from './GxTodoDashboardCard'
describe('@components/GxTodoDashboardCard', () => {
  it('exports a valid component', () => {
    expect(GxTodoDashboardCard).toBeAComponent()
  })
  it('Renders dashboard card elements', () => {
    const { getByText } = render(GxTodoDashboardCard, {
      stubs: ['RouterLink', 'RouterView'],
      propsData: {
        title: 'This is my title',
        id: 'incomeReceivedPaymentsAction4',
        type: 'incomeReceivedPaymentsAction4',
        informativeCaption: null,
        subtitleToDo: 'Tienes {2 pagos} para aprobar el día de hoy',
        date: '1566829467691',
        actionButtons: ['Aceptar', 'Rechazar'],
      },
      mocks: {
        $router: jest.fn(),
      },
    })
    expect(getByText('This is my title')).toBeTruthy()
    expect(getByText('Aceptar')).toBeTruthy()
    expect(getByText('Rechazar')).toBeTruthy()
  })
  it('Renders links', () => {
    const { getAllByTestId } = render(GxTodoDashboardCard, {
      stubs: ['RouterLink', 'RouterView'],
      propsData: {
        title: 'This is my title',
        id: 'incomeReceivedPaymentsAction4',
        type: 'incomeReceivedPaymentsAction4',
        informativeCaption: null,
        subtitleToDo: 'Tienes {2 pagos} para aprobar el {día} de hoy',
        date: '1566829467691',
        actionButtons: ['Aceptar', 'Rechazar'],
      },
      mocks: {
        $router: jest.fn(),
      },
    })
    let descriptionLinks = getAllByTestId('description')
    expect(descriptionLinks.length).toBe(2)
  })
  it('Calls mutation when Accept option is clicked', async () => {
    const $apollo = {
      mutate: jest.fn(() => Promise.resolve()),
    }
    const { fireEvent, getByText, wait } = render(GxTodoDashboardCard, {
      stubs: ['RouterLink', 'RouterView'],
      propsData: {
        title: 'This is my title',
        id: 'incomeReceivedPaymentsAction4',
        type: 'incomeReceivedPaymentsAction4',
        informativeCaption: null,
        subtitleToDo: 'Tienes {2 pagos} para aprobar el día de hoy',
        date: '1566829467691',
        actionButtons: ['Aceptar', 'Rechazar'],
      },
      mocks: {
        $router: jest.fn(),
        $apollo,
      },
    })
    const acceptBtn = getByText('Aceptar')
    fireEvent.click(acceptBtn)
    await wait(() => {
      expect($apollo.mutate).toHaveBeenCalledTimes(1)
    })
  })
  it('Calls mutation when Reject option is clicked', async () => {
    const $apollo = {
      mutate: jest.fn(() => Promise.resolve()),
    }
    const { fireEvent, getByText, wait } = render(GxTodoDashboardCard, {
      stubs: ['RouterLink', 'RouterView'],
      propsData: {
        title: 'This is my title',
        id: 'incomeReceivedPaymentsAction4',
        type: 'incomeReceivedPaymentsAction4',
        informativeCaption: null,
        subtitleToDo: 'Tienes {2 pagos} para aprobar el día de hoy',
        date: '1566829467691',
        actionButtons: ['Aceptar', 'Rechazar'],
      },
      mocks: {
        $router: jest.fn(),
        $apollo,
      },
    })
    const acceptBtn = getByText('Rechazar')
    fireEvent.click(acceptBtn)
    await wait(() => {
      expect($apollo.mutate).toHaveBeenCalledTimes(1)
    })
  })
})
