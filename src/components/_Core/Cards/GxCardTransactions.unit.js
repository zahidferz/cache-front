import GxCardTransactions from './GxCardTransactions'

describe('@components/Cards/GxCardTransactions', () => {
  it('exports a valid component', () => {
    expect(GxCardTransactions).toBeAComponent()
  })
  it('shows sales info', () => {
    const { getByText } = render(GxCardTransactions, {
      propsData: {
        timePeriod: 'month',
        sales: true,
        amount: {
          currentMonth: {
            total: 500,
          },
        },
        currency: 'MXN',
      },
    })
    expect(getByText('Ventas')).toBeTruthy()
    expect(getByText('$500.00')).toBeTruthy()
  })
  xit('shows expenses info', () => {
    const { getByText } = render(GxCardTransactions, {
      propsData: {
        timePeriod: 'day',
        sales: true,
        amount: 500,
        currency: 'MXN',
      },
    })
    expect(getByText('Ventas')).toBeTruthy()
    expect(getByText('$500.00')).toBeTruthy()
  })
})
