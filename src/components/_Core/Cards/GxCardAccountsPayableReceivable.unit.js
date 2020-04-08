import GxCardAccountsPayableReceivable from './GxCardAccountsPayableReceivable'

describe('@components/Cards/GxCardAccountsPayableReceivable', () => {
  it('exports a valid component', () => {
    expect(GxCardAccountsPayableReceivable).toBeAComponent()
  })
  it('shows accounts payable info', () => {
    const { getByText } = render(GxCardAccountsPayableReceivable, {
      propsData: {
        payable: true,
        accounts: {
          referenceDate: '1563839999999',
          currency: 'MXN',
          total: 100000.45,
          totalDue: 0,
          totalDueOnReferenceDate: 5000.3,
          totalUndue: 65000.05,
        },
      },
    })
    expect(getByText('Total por pagar')).toBeTruthy()
    expect(getByText('$70,000.35 MXN')).toBeTruthy()
  })
  it('shows accounts receivable info', () => {
    const { getByText } = render(GxCardAccountsPayableReceivable, {
      propsData: {
        payable: false,
        accounts: {
          referenceDate: '1563839999999',
          currency: 'MXN',
          total: 100000.45,
          totalDue: 0,
          totalDueOnReferenceDate: 5000.3,
          totalUndue: 65000.05,
        },
      },
    })
    expect(getByText('Total por cobrar')).toBeTruthy()
    expect(getByText('$70,000.35 MXN')).toBeTruthy()
  })
})
