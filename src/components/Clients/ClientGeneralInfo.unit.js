import ClientGeneralInfo from './ClientGeneralInfo'

describe('@components/ClientGeneralInfo', () => {
  it('exports a valid component', () => {
    expect(ClientGeneralInfo).toBeAComponent()
  })
  it('Shows Client General Info', async () => {
    const $route = {
      params: {
        clientId: 'CAEF3E1-3477-4EB2-A8B2-F2E9BF082A57',
      },
    }
    const myAccount = () => {
      return {
        companies: [
          {
            company: {
              clients: [
                {
                  clientId: 'CAEF3E1-3477-4EB2-A8B2-F2E9BF082A57',
                  totalSalesAmount: {
                    total: '250',
                    currencyCode: 'MXN',
                  },
                  starring: 3,
                  status: 'active',
                  lastActivityStatus: 1,
                  businessName: 'Nombre Comercial',
                },
              ],
            },
          },
        ],
      }
    }
    const { debug } = render(ClientGeneralInfo, {
      mocks: {
        $route,
        $apollo: {
          queries: {
            myAccount,
          },
        },
      },
      stubs: ['Portal'],
    })
    debug()
  })
})
