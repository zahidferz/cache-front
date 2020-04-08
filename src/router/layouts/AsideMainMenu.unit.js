import AsideMainMenu from './AsideMainMenu'

describe('AsideMainMenu', () => {
  xit('renders properly', () => {
    const { getByText, fireEvent } = render(AsideMainMenu, {
      propsData: {
        isCollapsed: false,
      },
      stubs: ['RouterLink', 'router-link'],
      mocks: {
        $route: {
          fullPath: '',
        },
      },
    })

    expect(getByText('Dashboard')).toBeTruthy()
    expect(getByText('Ventas')).toBeTruthy()
    // expect(getByText('Banco')).toBeTruthy()

    fireEvent.click(getByText('arrow_right'))

    expect(getByText('Mis clientes')).toBeTruthy()
    // 2019/12/13 not  implemented yet

    // expect(getByText('Cobros')).toBeTruthy()
    // expect(getByText('Facturas')).toBeTruthy()
    // expect(getByText('Categorías')).toBeTruthy()
  })
})
