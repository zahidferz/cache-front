describe('My clients', () => {
  // // Store email as global ref to delete in after hook
  const email = `gestionix.webmaster+cypress@gmail.com`
  const password = 'Gestionix01'
  // // let e2e_tests_token = '5cebe615a13ff2c99bf896d565cfcfed9d38fd836a9c5e7865369cead58b6e30'

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    /* eslint-disable */
    console.log('Caught error', err)
    /* eslint-enable */
    return false
  })

  it('can create, deactivate, activate and delete a client', () => {
    cy.viewport(375, 667)
    // cy.visit('https://boa-test.gestionix.com')
    cy.visit('/')

    // Vue page transitions take 1s
    cy.wait(3000)

    cy.login({
      email,
      password,
    })

    cy.get('[data-testid=Ventas]')
      .should('exist')
      .click()
      .wait(500)
    cy.get('[data-testid=MisClientes]')
      .should('exist')
      .click()
      .wait(400)

    cy.queryByTestId('FAB').click()

    // // Fill out new client form
    const clientName = `Cliente ${Math.random()}`
    cy.getByLabelText('Nombre Comercial').type(clientName, { force: true })
    cy.queryByText('Guardar').click()
    cy.queryByText('Cliente creado').click()
    cy.queryByText(clientName)

    // Deactivate client
    cy.getByText('ACTIVO')
      .should('exist')
      .click()
      .wait(3000)

    // Activate client
    cy.getByText('INACTIVO')
      .should('exist')
      .click()
      .wait(3000)

    // // Deactivate and delete client
    cy.queryByText('ACTIVO').click()
    cy.queryByText('delete').click()
    cy.queryByTestId('eliminar').click()
    cy.queryByText('Cliente eliminado')
  })

  it('can check client general info', () => {
    cy.viewport(375, 667)
    // cy.visit('https://boa-test.gestionix.com')
    cy.visit('/')

    // Vue page transitions take 1s
    cy.wait(3000)

    cy.login({
      email,
      password,
    })

    cy.get('[data-testid=Ventas]')
      .should('exist')
      .click()
      .wait(500)
    cy.get('[data-testid=MisClientes]')
      .should('exist')
      .click()
      .wait(400)
    cy.getByText('Saldo pendiente').should('exist')
    cy.getByText('Recientes').should('exist')
    cy.getByText('Todos').should('exist')
    cy.get(
      '#clientList > :nth-child(1) > :nth-child(1) > :nth-child(2) > .gxOutter > .overflow-hidden'
    )
      .click()
      .wait(400)
    cy.getByText('Cuentas por cobrar').should('exist')
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
