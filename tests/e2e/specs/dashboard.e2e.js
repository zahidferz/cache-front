describe('Dashboard', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    /* eslint-disable */
    console.log('Caught error', err)
    /* eslint-enable */
    return false
  })

  const email = `gestionix.webmaster+cypress@gmail.com`
  const password = 'Gestionix01'

  it('dashboard renders correctly', () => {
    cy.viewport(375, 667)
    // cy.visit('https://boa-test.gestionix.com')
    cy.visit('/')

    // Vue page transitions take 1s
    // cy.wait(3000)

    cy.login({
      email,
      password,
    })

    cy.wait(1000)

    // Dashboard sections load
    cy.getByText('Movimientos')
    cy.getByText('Cuentas por cobrar')

    cy.wait(1000)

    // Bottom menu loads
    cy.getByTestId('Pendientes')
    cy.getByTestId('Dashboard')
    cy.getByTestId('Ventas')
  })
})
