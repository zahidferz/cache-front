import MenuBottom from './MenuBottom'

describe('@components/MenuBottom', () => {
  it('exports a valid component', () => {
    expect(MenuBottom).toBeAComponent()
  })
  xit('calls router push when fab is clicked and has just one shortcut', () => {
    const $router = {
      push: jest.fn(),
      options: {
        routes: [
          {
            path: '/web',
            name: 'web',
            redirect: {
              name: 'dashboard',
            },
            meta: {
              authRequired: true,
            },
            children: [
              {
                path: 'pendientes',
                name: 'todos',
                meta: {
                  isSubmenu: true,
                  icon: 'warning',
                  title: 'Pendientes',
                  statusBg: 'bg-alert',
                },
              },
              {
                path: 'dashboard',
                name: 'dashboard',
                meta: {
                  isSubmenu: true,
                  title: 'Dashboard',
                  icon: 'dashboard',
                  shortcuts: [
                    {
                      rightIcon: 'receipt',
                      label: 'Factura',
                      leftIcon: 'add',
                      to: { name: 'invoices' },
                    },
                    {
                      rightIcon: 'attach_money',
                      label: 'Cobro',
                      leftIcon: 'add',
                      to: { name: 'payments' },
                    },

                    {
                      rightIcon: 'local_offer',
                      label: 'Venta',
                      leftIcon: 'add',
                      to: { name: 'sales' },
                    },
                  ],
                },
              },
              {
                path: 'ventas',
                name: 'sales',
                meta: {
                  isSubmenu: true,
                  icon: 'local_offer',
                  title: 'Ventas',
                  statusBg: 'bg-primary-500',
                },
                children: [
                  {
                    path: 'nueva',
                    name: 'newsalechooseclient',
                    meta: {
                      isSubmenu: false,
                    },
                  },
                  {
                    path: 'misclientes',
                    redirect: { name: 'myclients' },
                    meta: {
                      isSubmenu: true,
                      icon: 'sentiment_satisfied_alt',
                      title: 'Clientes',
                    },
                    children: [
                      {
                        path: 'analisis',
                        name: 'analysis',
                        meta: {
                          isSubmenu: true,
                          icon: 'pie_chart',
                          title: 'Análisis',
                        },
                      },
                      {
                        path: '',
                        name: 'myclients',
                        children: [
                          {
                            path: 'clients/:clientId',
                            meta: {
                              isSubmenu: false,
                              shortcuts: [],
                            },
                            name: 'clientgeneralinfo',
                          },
                        ],
                        meta: {
                          isSubmenu: false,
                          shortcuts: [
                            {
                              rightIcon: 'sentiment_satisfied_alt',
                              label: 'Cliente',
                              leftIcon: 'add',
                              to: { name: 'createnewclient' },
                            },
                          ],
                        },
                      },
                      {
                        path: 'clientes/:clientId',
                        name: 'clientgeneralinfo',
                        children: [
                          {
                            path: 'clients/:clientId',
                            meta: {
                              isSubmenu: false,
                              shortcuts: [],
                            },
                            name: 'clientgeneralinfo',
                          },
                        ],
                      },
                      {
                        path: '',
                        name: 'clientsdashboard',
                        children: [
                          {
                            path: 'clients/:clientId',
                            meta: {
                              isSubmenu: false,
                              shortcuts: [],
                            },
                            name: 'clientgeneralinfo',
                          },
                        ],
                        meta: {
                          isSubmenu: false,
                          shortcuts: [
                            {
                              rightIcon: 'local_offer',
                              label: 'Venta',
                              leftIcon: 'add',
                              to: { name: 'sales' },
                            },
                            {
                              rightIcon: 'description',
                              label: 'Cotización',
                              leftIcon: 'add',
                              to: { name: '' },
                            },
                            {
                              rightIcon: 'shopping_cart',
                              label: 'Pedido',
                              leftIcon: 'add',
                              to: { name: 'clientsdashboard' },
                            },
                            {
                              rightIcon: 'attach_money',
                              label: 'Cobro',
                              leftIcon: 'add',
                              to: { name: 'payments' },
                            },
                            {
                              rightIcon: 'sentiment_satisfied_alt',
                              label: 'Cliente',
                              leftIcon: 'add',
                              to: { name: 'createnewclient' },
                            },
                          ],
                        },
                      },
                      {
                        path: 'nuevo',
                        name: 'createnewclient',
                        children: [
                          {
                            path: 'clients/:clientId',
                            meta: {
                              isSubmenu: false,
                              shortcuts: [],
                            },
                            name: 'clientgeneralinfo',
                          },
                        ],
                        meta: {
                          isSubmenu: false,
                          father: 'myclients',
                          shortcuts: [
                            {
                              rightIcon: 'local_offer',
                              label: 'Venta',
                              leftIcon: 'add',
                              to: { name: 'sales' },
                            },
                            {
                              rightIcon: 'description',
                              label: 'Cotización',
                              leftIcon: 'add',
                              to: { name: '' },
                            },
                            {
                              rightIcon: 'shopping_cart',
                              label: 'Pedido',
                              leftIcon: 'add',
                              to: { name: 'clientsdashboard' },
                            },
                            {
                              rightIcon: 'attach_money',
                              label: 'Cobro',
                              leftIcon: 'add',
                              to: { name: 'payments' },
                            },
                            {
                              rightIcon: 'sentiment_satisfied_alt',
                              label: 'Cliente',
                              leftIcon: 'add',
                              to: { name: 'createnewclient' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    }
    const $route = {
      name: 'myclients',
      fullPath: '/web/ventas/misclientes',
      meta: {
        isSubmenu: false,
        shortcuts: [
          {
            label: 'Cliente',
            leftIcon: 'add',
            rightIcon: 'sentiment_satisfied_alt',
            to: { name: 'createnewclient' },
          },
        ],
      },
      matched: [
        {
          path: 'web',
          meta: { authRequired: true },
          name: 'web',
          children: [
            {
              meta: {
                isSubmenu: false,
                shortcuts: [
                  {
                    label: 'Cliente',
                    leftIcon: 'add',
                    rightIcon: 'sentiment_satisfied_alt',
                    to: { name: 'createnewclient' },
                  },
                ],
              },
              name: 'myclients',
              children: [
                {
                  path: 'clients/:clientId',
                  meta: {
                    isSubmenu: false,
                    shortcuts: [],
                  },
                  name: 'clientgeneralinfo',
                },
              ],
            },
          ],
        },
        {
          path: '/web/ventas',
          meta: {
            icon: 'local_offer',
            isSubmenu: true,
            statusBg: 'bg-primary-500',
            title: 'Ventas',
          },
          children: [
            {
              path: 'clients/:clientId',
              meta: {
                isSubmenu: false,
                shortcuts: [],
              },
              name: 'clientgeneralinfo',
            },
          ],
          name: 'sales',
        },
        {
          path: '/web/ventas/misclientes',
          meta: {
            isSubmenu: false,
          },
          parent: '/web/ventas',
          name: 'myclietnts',
          children: [
            {
              path: 'clients/:clientId',
              meta: {
                isSubmenu: false,
                shortcuts: [],
              },
              name: 'clientgeneralinfo',
            },
          ],
        },
      ],
      children: [
        {
          path: 'clients/:clientId',
          meta: {
            isSubmenu: false,
            shortcuts: [],
          },
          name: 'clientgeneralinfo',
        },
      ],
    }
    const $apollo = {
      provider: {
        clients: { defaultClient: { wsClient: { name: 'el sockete' } } },
      },
      queries: {
        getTodos: {
          setOptions: jest.fn((object) => object),
        },
      },
    }
    const { debug } = render(MenuBottom, {
      mocks: {
        $apollo,
        $router,
        $route,
      },
    })
    debug()
  })
})
