describe('Venta facturada', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    /* eslint-disable */
    console.log('Caught error', err)
    /* eslint-enable */
    return false
  })
  beforeEach(() => {
    // Flaky Multiselect behavior when choosing a Concept can break these tests.
    // Retry automatically for now
    Cypress.currentTest.retries(2)

    if (window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister()
        })
      })
    }
    cy.clearCookies()
  })

  const email = `gestionix.webmaster+cypress@gmail.com`
  const password = 'Gestionix01'

  it.skip('Caso con error al no pasarle descuentos', () => {
    cy.viewport(375, 667)

    // cy.visit('https://boa-test.gestionix.com')
    cy.visit('http://dev.local:8080')
    // cy.visit('/')

    // Vue page transitions take 1s
    // cy.wait(3000)

    cy.login({
      email,
      password,
    })

    // cy.wait(1000)

    cy.newInvoicedSale({
      client: 'Mi primer cliente',
      // paymentMethod: 'Pago en parcialidades o diferido-PPD', // Opcional
      // paymentType: 'Monedero electrónico', // Opcional
      // currency: 'EUR-Euro', // Opcional
      // cfdiUse: 'Devoluciones', // Opcional
      concept: 'Concepto 1',
      conceptIsFrequent: false, // Opcional: default false
      key: 'Clave 1', // Opcional si el Frequent Concept lo trae
      satKey: '60102401 - Abacos', // Opcional si el Frequent Concept lo trae
      quantity: 1231.334434,
      measurmentUnit: 'ND - Barril neto', // Opcional si el Frequent Concept lo trae
      unitPrice: 534.53, // Opcional si el Frequent Concept lo trae
      transferredTaxes: [
        // Opcional
        // {
        //   name: 'IEPS',
        //   percentage: 5,
        // },
        {
          name: 'IVA',
          percentage: 16,
        },
      ],
      withheldTaxes: [
        // Opcional
        {
          name: 'IEPS',
          percentage: 6,
        },
      ],
      // discount: 6.999999, // Opcional
      visibleNote: 'Una nota visible', // Opcional
      invisibleNote: 'Una nota NO visible', // Opcional
      category: 'Mi primera categoría',
      bankAccount: 'Cuenta Principal',
    })
  })
  it.skip('Caso con error en liberación por descuentos 2', () => {
    cy.viewport(375, 667)

    // cy.visit('https://boa-test.gestionix.com')
    cy.visit('http://dev.local:8080')
    // cy.visit('/')

    // Vue page transitions take 1s
    cy.wait(3000)

    cy.login({
      email,
      password,
    })

    cy.wait(1000)

    cy.newInvoicedSale({
      client: 'Mi primer cliente',
      // paymentMethod: 'Pago en parcialidades o diferido-PPD', // Opcional
      // paymentType: 'Monedero electrónico', // Opcional
      // currency: 'EUR-Euro', // Opcional
      // cfdiUse: 'Devoluciones', // Opcional
      concept: 'Concepto 1',
      conceptIsFrequent: false, // Opcional: default false
      key: 'Clave 1', // Opcional si el Frequent Concept lo trae
      satKey: '60102401 - Abacos', // Opcional si el Frequent Concept lo trae
      quantity: 1231.334434,
      measurmentUnit: 'ND - Barril neto', // Opcional si el Frequent Concept lo trae
      unitPrice: 534.53, // Opcional si el Frequent Concept lo trae
      transferredTaxes: [
        // Opcional
        // {
        //   name: 'IEPS',
        //   percentage: 5,
        // },
        {
          name: 'IVA',
          percentage: 16,
        },
      ],
      withheldTaxes: [
        // Opcional
        {
          name: 'IEPS',
          percentage: 6,
        },
      ],
      discount: 6.999999, // Opcional
      visibleNote: 'Una nota visible', // Opcional
      invisibleNote: 'Una nota NO visible', // Opcional
      category: 'Mi primera categoría',
      bankAccount: 'Cuenta Principal',
    })
  })
  it.skip('Factura con decimales largos', () => {
    cy.viewport(375, 667)

    // cy.visit('https://boa-test.gestionix.com')
    cy.visit('http://dev.local:8080')
    // cy.visit('/')

    // Vue page transitions take 1s
    cy.wait(3000)

    cy.login({
      email,
      password,
    })

    cy.wait(1000)

    cy.newInvoicedSale({
      client: 'Mi primer cliente',
      // paymentMethod: 'Pago en parcialidades o diferido-PPD', // Opcional
      // paymentType: 'Monedero electrónico', // Opcional
      // currency: 'EUR-Euro', // Opcional
      // cfdiUse: 'Devoluciones', // Opcional
      concept: 'Concepto 1',
      conceptIsFrequent: false, // Opcional: default false
      key: 'Clave 1', // Opcional si el Frequent Concept lo trae
      satKey: '60102401 - Abacos', // Opcional si el Frequent Concept lo trae
      quantity: 13232.323233,
      measurmentUnit: 'ND - Barril neto', // Opcional si el Frequent Concept lo trae
      unitPrice: 3232.32, // Opcional si el Frequent Concept lo trae
      transferredTaxes: [
        // Opcional
        // {
        //   name: 'IEPS',
        //   percentage: 5,
        // },
        {
          name: 'IVA',
          percentage: 16,
        },
      ],
      withheldTaxes: [
        // Opcional
        {
          name: 'ISR',
          percentage: 10,
        },
      ],
      discount: 9, // Opcional
      visibleNote: 'Una nota visible', // Opcional
      invisibleNote: 'Una nota NO visible', // Opcional
      category: 'Mi primera categoría',
      bankAccount: 'Cuenta Principal',
    })
  })
  it('IVA trasladado 0%, ISR retenido 0%', () => {
    cy.viewport(375, 667)

    // cy.visit('https://boa-test.gestionix.com')
    cy.visit('http://dev.local:8080')
    // cy.visit('/')

    // Vue page transitions take 1s
    cy.wait(3000)

    cy.login({
      email,
      password,
    })

    cy.wait(1000)

    cy.newInvoicedSale({
      client: 'Mi primer cliente',
      // paymentMethod: 'Pago en parcialidades o diferido-PPD', // Opcional
      // paymentType: 'Monedero electrónico', // Opcional
      // currency: 'EUR-Euro', // Opcional
      // cfdiUse: 'Devoluciones', // Opcional
      concept: 'Concepto 1',
      conceptIsFrequent: false, // Opcional: default false
      key: 'Clave 1', // Opcional si el Frequent Concept lo trae
      satKey: '60102401 - Abacos', // Opcional si el Frequent Concept lo trae
      quantity: 2121.423424,
      measurmentUnit: 'ND - Barril neto', // Opcional si el Frequent Concept lo trae
      unitPrice: 543543.23, // Opcional si el Frequent Concept lo trae
      transferredTaxes: [
        // Opcional
        // {
        //   name: 'IEPS',
        //   percentage: 5,
        // },
        {
          name: 'IVA',
          percentage: 0,
        },
      ],
      withheldTaxes: [
        // Opcional
        {
          name: 'ISR',
          percentage: 0,
        },
      ],
      discount: 5, // Opcional
      visibleNote: 'Una nota visible', // Opcional
      invisibleNote: 'Una nota NO visible', // Opcional
      category: 'Mi primera categoría',
      bankAccount: 'Cuenta Principal',
    })
  })
  // WORKING
  it.skip('IVA 16%', () => {
    cy.viewport(375, 667)

    // cy.visit('https://boa-test.gestionix.com')
    cy.visit('/')

    // Vue page transitions take 1s
    cy.wait(3000)

    cy.login({
      email,
      password,
    })

    cy.wait(1000)

    cy.newInvoicedSale({
      client: 'Mi primer cliente',
      // paymentMethod: 'Pago en parcialidades o diferido-PPD', // Opcional
      // paymentType: 'Monedero electrónico', // Opcional
      // currency: 'EUR-Euro', // Opcional
      // cfdiUse: 'Devoluciones', // Opcional
      concept: 'Concepto 1',
      conceptIsFrequent: false, // Opcional: default false
      key: 'Clave 1', // Opcional si el Frequent Concept lo trae
      satKey: '60102401 - Abacos', // Opcional si el Frequent Concept lo trae
      quantity: 10,
      measurmentUnit: 'ND - Barril neto', // Opcional si el Frequent Concept lo trae
      unitPrice: 10.68, // Opcional si el Frequent Concept lo trae
      transferredTaxes: [
        // Opcional
        // {
        //   name: 'IEPS',
        //   percentage: 5,
        // },
        {
          name: 'IVA',
          percentage: 16,
        },
      ],
      // withheldTaxes: [
      //   // Opcional
      //   {
      //     name: 'ISR',
      //     percentage: 0,
      //   },
      // ],
      discount: 5, // Opcional
      visibleNote: 'Una nota visible', // Opcional
      invisibleNote: 'Una nota NO visible', // Opcional
      category: 'Mi primera categoría',
      bankAccount: 'Cuenta Principal',
    })
  })
  // WORKING
  it.skip('ISR retenido 0%', () => {
    cy.login()

    cy.newInvoicedSale({
      client: 'Mi primer cliente',
      // paymentMethod: 'Pago en parcialidades o diferido-PPD', // Opcional
      // paymentType: 'Monedero electrónico', // Opcional
      // currency: 'EUR-Euro', // Opcional
      // cfdiUse: 'Devoluciones', // Opcional
      concept: 'Concepto 1',
      conceptIsFrequent: false, // Opcional: default false
      key: 'Clave 1', // Opcional si el Frequent Concept lo trae
      satKey: '60102401 - Abacos', // Opcional si el Frequent Concept lo trae
      quantity: 10,
      measurmentUnit: 'ND - Barril neto', // Opcional si el Frequent Concept lo trae
      unitPrice: 10.68, // Opcional si el Frequent Concept lo trae
      transferredTaxes: [
        // Opcional
        // {
        //   name: 'IEPS',
        //   percentage: 5,
        // },
        // {
        //   name: 'IVA',
        //   percentage: 16,
        // },
      ],
      withheldTaxes: [
        // Opcional
        {
          name: 'ISR',
          percentage: 0,
        },
      ],
      discount: 5, // Opcional
      visibleNote: 'Una nota visible', // Opcional
      invisibleNote: 'Una nota NO visible', // Opcional
      category: 'Mi primera categoría',
      bankAccount: 'Cuenta Principal',
    })
  })
  // WORKING
  it.skip('IEPS retenido 30%', () => {
    cy.login()

    cy.newInvoicedSale({
      client: 'Mi primer cliente',
      // paymentMethod: 'Pago en parcialidades o diferido-PPD', // Opcional
      // paymentType: 'Monedero electrónico', // Opcional
      // currency: 'EUR-Euro', // Opcional
      // cfdiUse: 'Devoluciones', // Opcional
      concept: 'Concepto 1',
      conceptIsFrequent: false, // Opcional: default false
      key: 'Clave 1', // Opcional si el Frequent Concept lo trae
      satKey: '60102401 - Abacos', // Opcional si el Frequent Concept lo trae
      quantity: 10,
      measurmentUnit: 'ND - Barril neto', // Opcional si el Frequent Concept lo trae
      unitPrice: 10.68, // Opcional si el Frequent Concept lo trae
      // transferredTaxes: [
      //   // Opcional
      //   {
      //     name: 'IEPS',
      //     percentage: 5,
      //   },
      //   {
      //     name: 'IVA',
      //     percentage: 16,
      //   },
      // ],
      withheldTaxes: [
        // Opcional
        {
          name: 'IEPS',
          percentage: 30,
        },
      ],
      discount: 5, // Opcional
      visibleNote: 'Una nota visible', // Opcional
      invisibleNote: 'Una nota NO visible', // Opcional
      category: 'Mi primera categoría',
      bankAccount: 'Cuenta Principal',
    })
  })
  // WORKING
  it.skip('IEPS retenido 3%', () => {
    cy.login()

    cy.newInvoicedSale({
      client: 'Mi primer cliente',
      // paymentMethod: 'Pago en parcialidades o diferido-PPD', // Opcional
      // paymentType: 'Monedero electrónico', // Opcional
      // currency: 'EUR-Euro', // Opcional
      // cfdiUse: 'Devoluciones', // Opcional
      concept: 'Concepto 1',
      conceptIsFrequent: false, // Opcional: default false
      key: 'Clave 1', // Opcional si el Frequent Concept lo trae
      satKey: '60102401 - Abacos', // Opcional si el Frequent Concept lo trae
      quantity: 10,
      measurmentUnit: 'ND - Barril neto', // Opcional si el Frequent Concept lo trae
      unitPrice: 10.68, // Opcional si el Frequent Concept lo trae
      transferredTaxes: [
        // Opcional
        {
          name: 'IEPS',
          percentage: 3,
        },
      ],
      discount: 5, // Opcional
      visibleNote: 'Una nota visible', // Opcional
      invisibleNote: 'Una nota NO visible', // Opcional
      category: 'Mi primera categoría',
      bankAccount: 'Cuenta Principal',
    })
  })
  it.skip('concepto frecuente simple', () => {
    cy.login()

    // Concepto frecuente
    cy.newInvoicedSale({
      client: 'Mi primer cliente',
      concept: 'cactus',
      conceptIsFrequent: true,
      // key: 'Clave 1',
      // satKey: '60102401 - Abacos',
      quantity: 10,
      // measurmentUnit: 'ND - Barril neto',
      // unitPrice: 10.68,
      // transferredTaxes: [
      //   {
      //     name: 'IEPS',
      //     percentage: 5,
      //   },
      //   {
      //     name: 'IVA',
      //     percentage: 16,
      //   },
      // ],
      visibleNote: 'Una nota visible',
      invisibleNote: 'Una nota NO visible',
      category: 'Mi primera categoría',
      bankAccount: 'Cuenta Principal',
    })
  })
})
