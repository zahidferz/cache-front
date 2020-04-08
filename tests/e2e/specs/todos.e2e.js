describe('Todos', () => {
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
  it('can see and resolve the welcome todo for a new account on desk', () => {
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
      `gestionix.webmaster+${Math.random() * 1000}@gmail.com`
    )
    cy.getByLabelText('Contraseña*').type('Gestionix01')
    cy.queryByText('Crear cuenta').click()
    // Retrieve confirmation email from localstorage to simulate opening the email
    // Note that the confirmation email is only stored in localstorage during cypress execution
    // cy.window().then((window) => {
    //   const ecu = window.localStorage.getItem('ecu')
    //   cy.request({
    //     method: 'GET',
    //     url: ecu,
    //     failOnStatusCode: false,
    //   })
    // })
    cy.wait(15000)
    cy.findByText('Continuar').click()
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
    // cy.wait(4000)
    // cy.getByText('Dashboard')
    cy.getByText('Pendientes').click()
    // cy.wait(1000)
    cy.getByText('Te damos la bienvenida').then((some) => {
      some.click()
      cy.wait(5000)
      cy.queryByText('Te damos la bienvenida').should('not.exist')
    })
  })
  it('can see and resolve the welcome todo for a new account on mobile', () => {
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

    // cy.queryByText('Confirma tu cuenta')

    // // Retrieve confirmation email from localstorage to simulate opening the email
    // // Note that the confirmation email is only stored in localstorage during cypress execution
    // cy.window().then((window) => {
    //   const ecu = window.localStorage.getItem('ecu')
    //   cy.request({
    //     method: 'GET',
    //     url: ecu,
    //     failOnStatusCode: false,
    //   })
    // })
    cy.wait(15000)
    cy.findByText("You're in baby!").click()

    cy.wait(3000)
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
    cy.getByText('Pendientes').click()
    cy.wait(1000)
    cy.getByText('Te damos la bienvenida').then((some) => {
      some.click()
      cy.wait(5000)
      cy.queryByTitle('Te damos la bienvenida').should('not.exist')
    })
    // cy.wait(1000)
    // cy.getByTitle('Te damos la bienvenida').trigger('click', { force: true })
  })

  // after(function() {
  //   // runs once after all tests in the block
  //   // We need boaAuthUrl to delete de created user at the end
  //   const boaAuthUrl = 'https://gx-boa-auth-test.azurewebsites.net'
  //   const appid = 'tezbQgAVakyPPNB5i6lw8QfIXDa2x1lo'
  //   const appsecret =
  //     't3mmg-W_UaMyB7ywjt3ULz6DuhtkUOjtyRpa4KZU9jPhiNXnwHw3cOg1r85WyGgm'

  //   cy.request({
  //     method: 'POST',
  //     url: `${boaAuthUrl}/access_token`,
  //     body: {
  //       client_id: 'jc3qO11EdoNr7xf2Iv9q12oe1LiKqqBi',
  //       username: email,
  //       password: 'Gestionix1',
  //     },
  //   }).then((response) => {
  //     // response.body is automatically serialized into JSON
  //     /* eslint-disable camelcase */
  //     const id_token = response.body.id_token
  //     /* eslint-enable */

  //     cy.request({
  //       method: 'POST',
  //       url: `${boaAuthUrl}/introspect`,
  //       body: {
  //         id_token,
  //       },
  //     }).then((response) => {
  //       /* eslint-disable camelcase */
  //       const user_id = response.body.user_id.replace('auth0|', '')
  //       /* eslint-enable */

  //       // Delete user from Auth0
  //       cy.request({
  //         method: 'DELETE',
  //         /* eslint-disable camelcase */
  //         url: `${boaAuthUrl}/users/auth0%${user_id}`,
  //         /* eslint-enable */
  //         headers: {
  //           appid,
  //           appsecret,
  //         },
  //       }).then((response) => {
  //         expect(response.status).to.eq(204)
  //       })

  //       // Delete user from Account Provisioning
  //       // cy.request({
  //       //   method: 'POST',
  //       //   /* eslint-disable camelcase */
  //       //   url: `${boaAuthUrl}/users/auth0%${user_id}`,
  //       //   /* eslint-enable */
  //       //   headers: {
  //       //     appid,
  //       //     appsecret,
  //       //   },
  //       // }).then((response) => {
  //       //   console.log(response)
  //       // })
  //     })
  //   })
  // })
})
