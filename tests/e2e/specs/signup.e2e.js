describe('Signup flow', () => {
  // Store email as global ref to delete in after hook
  // let e2e_tests_token = '5cebe615a13ff2c99bf896d565cfcfed9d38fd836a9c5e7865369cead58b6e30'

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    /* eslint-disable */
    console.log('Caught error', err)
    /* eslint-enable */
    return false
  })

  beforeEach(() => {
    if (window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister()
        })
      })
    }
    cy.clearCookies()
  })
  it('can create a new account on desktop', () => {
    cy.viewport(1024, 720)
    // cy.visit('https://boa-test.gestionix.com/')
    cy.visit('/')
    cy.queryByText('iniciar sesión').should('exist')
    cy.queryByText('Registrarme')
      .should('exist')
      .click()
    cy.getByLabelText('Nombre*').type('Prueba')
    cy.getByLabelText('Apellido*').type('desktop')
    cy.getByLabelText('Teléfono*').type('5530202464')
    cy.getByLabelText('Correo Electrónico*').type(
      `gestionix.webmaster+cypress${Math.random() * 1000}@gmail.com`
    )
    cy.getByLabelText('Contraseña*').type('Gestionix01')
    cy.queryByText('Crear cuenta').click()

    cy.wait(15000)
    cy.findByText('Continuar').click()

    // Info fiscal
    cy.getByLabelText('Ingresar mi información manualmente.').check({
      force: true,
    })
    cy.getByLabelText('RFC').type('perj930208uj3')
    cy.getByLabelText('Nombre o Razón Social').type('E2E TEST DESKTOP', {
      force: true,
    })
    cy.getByLabelText('Nombre Comercial').type('E2E TEST DESKTOP')
    cy.getByLabelText('C.P.*').type('07870')
    cy.getByPlaceholderText('Régimen fiscal*').type('Sueldos', { force: true })
    cy.getByText('Sueldos y Salarios e Ingresos Asimilados a Salarios').click()
    cy.getByText('conectarme').click()
    cy.getByText('Háblanos de la mejor empresa: ¡La tuya!')
    cy.getByText('Soy dueño').click()
    cy.getByText('continuar').click()
    cy.getByText('Omitir este paso').click()
    cy.getByText('salir').click()
    cy.getByText('Último Paso')
    cy.getByPlaceholderText('¿A qué se dedica tu empresa?*').type('comercio', {
      force: true,
    })
    cy.getByText('Comercio').click()
    cy.getByPlaceholderText('Elige cuántos son en el equipo*').type('15', {
      force: true,
    })
    cy.queryAllByText('15').then((arr) => {
      arr[0].click()
    })
    cy.getByPlaceholderText('Elige cuántas sucursales tienes*').type('15', {
      force: true,
    })
    cy.queryAllByText('15').then((arr) => {
      arr[2].click()
    })
    cy.getByText('Iniciar').click()
    cy.wait(4000)
    cy.getByText('Dashboard')
  })
  it('can create a new account', () => {
    cy.viewport(375, 667)
    // cy.visit('https://boa-test.gestionix.com/')
    cy.visit('/')

    // Vue page transitions take 1s
    cy.wait(1000)

    // 1. Welcome page
    cy.queryByText('iniciar sesión').should('exist')
    cy.queryByText('Registrarme')
      .should('exist')
      .click()

    // 2. Name page
    cy.wait(1000)
    cy.getByLabelText('Nombre').type('John')
    // Wait for input validation to complete
    cy.wait(300)
    cy.getByLabelText('Guardar')
      .should('exist')
      .click()

    // 2. Lastname page
    cy.wait(1000)
    cy.getByLabelText('Apellidos').type('Doe')
    // Wait for input validation to complete
    cy.wait(300)
    cy.getByLabelText('Guardar')
      .should('exist')
      .click()

    // 3. Email page
    cy.wait(1000)
    cy.getByLabelText('Correo Electrónico').type(
      `gestionix.webmaster+${Math.random() * 1000}@gmail.com`
    )
    // Wait for input validation to complete
    cy.wait(300)
    cy.getByLabelText('Guardar')
      .should('exist')
      .click()

    // 4. Phone page
    cy.wait(2000)
    cy.getByLabelText('Teléfono').type('1276382938')
    // Wait for input validation to complete
    cy.wait(300)
    cy.getByLabelText('Guardar')
      .should('exist')
      .click()

    // 5. Password page
    cy.wait(1000)
    cy.getByLabelText('Contraseña').type('Gestionix1')
    // Wait for input validation to complete
    cy.wait(300)
    cy.getByLabelText('Guardar')
      .should('exist')
      .click()

    cy.wait(15000)

    cy.queryByText("You're in baby!").click()

    cy.wait(5000)
    cy.getByText('ingresar mi información manualmente.').click()
    cy.wait(1000)
    cy.getByLabelText('RFC').type('perj930208uj3')
    cy.getByLabelText('Nombre o Razón Social').type('E2E TEST DESKTOP', {
      force: true,
    })
    cy.getByLabelText('Nombre Comercial').type('E2E TEST DESKTOP', {
      force: true,
    })
    cy.getByLabelText('C.P.*').type('07870')
    cy.getByLabelText('Régimen fiscal*').select('Arrendamiento')
    cy.getByText('continuar').click()
    cy.wait(1000)
    cy.getByText('Soy contador').click()
    cy.wait(1000)
    cy.getByText('Omitir este paso').click()
    cy.wait(500)
    cy.getByText('salir').click()
    cy.wait(500)
    cy.getByText('Servicios').click()
    cy.wait(500)
    cy.getByText('continuar').click()
    cy.wait(500)
    cy.getByText('continuar').click()
    cy.wait(500)
    cy.getByText('continuar').click()
    cy.wait(500)
    cy.getByText('continuar').click()
    cy.wait(500)
    cy.getByText('continuar').click()
    cy.wait(1000)
  })
})
