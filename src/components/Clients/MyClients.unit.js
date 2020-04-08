import MyClients from './MyClients'
import ReactiveProvide from 'vue-reactive-provide'
import Vue from 'vue'

Vue.use(ReactiveProvide)

global.IntersectionObserver = class IntersectionObserver {
  /* eslint-disable */
  constructor() {}
  /* eslint-enable */

  observe() {
    return null
  }

  unobserve() {
    return null
  }
}

describe('@components/MyClients', () => {
  it('exports a valid component', () => {
    expect(MyClients).toBeAComponent()
  })
  xit('shows a list of clients', () => {
    const topBarSearch = {
      search: '',
    }
    const { getByText } = render(MyClients, {
      data() {
        return {
          topBarSearch,
        }
      },
      mocks: {
        $apolloData: {
          loading: false,
        },
        $apollo: {
          queries: {
            myAccount: {
              refetch: jest.fn(() => {
                return new Promise((resolve, reject) => {
                  resolve({
                    data: {
                      myAccount: {
                        companies: [
                          {
                            company: {
                              clients: [
                                {
                                  commercialName: 'Cliente 1',
                                  taxId: 'HGTJ8709178T6',
                                  recientActivityStatus: 2,
                                  avatarUrl: require('@assets/images/Storybook/mo_005_1_cliente1.png'),
                                },
                                {
                                  commercialName: 'Cliente 2',
                                  taxId: 'HGTJ8709178T9',
                                  recientActivityStatus: 2,
                                  avatarUrl: require('@assets/images/Storybook/mo_005_1_cliente1.png'),
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  })
                })
              }),
            },
          },
        },
      },
    })
    expect(getByText('Cliente 1')).toBeTruthy()
    expect(getByText('HGTJ8709178T6')).toBeTruthy()
    expect(getByText('Cliente 2')).toBeTruthy()
    expect(getByText('HGTJ8709178T6')).toBeTruthy()
  })
  xit('shows a list of clients as the search result', () => {
    const topBarSearch = {
      search: 'OK',
    }
    const { getByText } = render(MyClients, {
      data() {
        return {
          topBarSearch,
        }
      },
      mocks: {
        $apollo: {
          queries: {
            myAccount: {
              refetch: jest.fn(() => {
                return new Promise((resolve, reject) => {
                  resolve({
                    data: {
                      myAccount: {
                        companies: [
                          {
                            company: {
                              clients: [
                                {
                                  commercialName: 'Cliente 1',
                                  taxId: 'HGTJ8709178T6',
                                  recientActivityStatus: 2,
                                  avatarUrl: require('@assets/images/Storybook/mo_005_1_cliente1.png'),
                                },
                                {
                                  commercialName: 'Cliente 2',
                                  taxId: 'HGTJ8709178T9',
                                  recientActivityStatus: 2,
                                  avatarUrl: require('@assets/images/Storybook/mo_005_1_cliente1.png'),
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  })
                })
              }),
            },
          },
        },
      },
    })
    expect(getByText('Cliente 1')).toBeTruthy()
    expect(getByText('HGTJ8709178T6')).toBeTruthy()
    expect(getByText('Cliente 2')).toBeTruthy()
    expect(getByText('HGTJ8709178T9')).toBeTruthy()
  })
  xit('shows No encontramos clientes relacionados con tu búsqueda when empty search result', () => {
    const topBarSearch = {
      search: 'OK',
    }
    const { getByText } = render(MyClients, {
      data() {
        return {
          topBarSearch,
        }
      },
      mocks: {
        $apollo: {
          queries: {
            myAccount: {
              refetch: jest.fn(() => {
                return new Promise((resolve, reject) => {
                  resolve({
                    data: {
                      myAccount: {
                        companies: [
                          {
                            company: {
                              clients: [
                                {
                                  commercialName: 'Cliente 1',
                                  taxId: 'HGTJ8709178T6',
                                  recientActivityStatus: 2,
                                  avatarUrl: require('@assets/images/Storybook/mo_005_1_cliente1.png'),
                                },
                                {
                                  commercialName: 'Cliente 2',
                                  taxId: 'HGTJ8709178T9',
                                  recientActivityStatus: 2,
                                  avatarUrl: require('@assets/images/Storybook/mo_005_1_cliente1.png'),
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  })
                })
              }),
            },
          },
        },
      },
    })
    expect(
      getByText('No encontramos clientes relacionados con tu búsqueda')
    ).toBeTruthy()
  })
  xit('calls pending balance mutation to filter clients', () => {
    const topBarSearch = {
      search: '',
    }
    const { debug } = render(MyClients, {
      data() {
        return {
          topBarSearch,
        }
      },
      mocks: {
        $apollo: {
          queries: {
            myAccount: {
              refetch: jest.fn(() => {
                return new Promise((resolve, reject) => {
                  resolve({
                    data: {
                      myAccount: {
                        companies: [
                          {
                            company: {
                              clients: [
                                {
                                  commercialName: 'Cliente 1',
                                  taxId: 'HGTJ8709178T6',
                                  recientActivityStatus: 2,
                                  avatarUrl: require('@assets/images/Storybook/mo_005_1_cliente1.png'),
                                },
                                {
                                  commercialName: 'Cliente 2',
                                  taxId: 'HGTJ8709178T9',
                                  recientActivityStatus: 2,
                                  avatarUrl: require('@assets/images/Storybook/mo_005_1_cliente1.png'),
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  })
                })
              }),
            },
          },
        },
      },
    })
    debug()
  })
})
