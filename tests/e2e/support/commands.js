// // Create custom Cypress commands and overwrite existing ones.
// // https://on.cypress.io/custom-commands

// cypress testing library https://testing-library.com/docs/cypress-testing-library/intro
import '@testing-library/cypress/add-commands'

Cypress.Commands.add(
  'login',
  ({
    email = 'gsxqa.test+prueba01@gmail.com',
    password = 'Gestionix01',
  } = {}) => {
    // 1. Welcome page
    cy.queryByText('iniciar sesión')
      .should('exist')
      .click()

    // cy.wait(1000)
    cy.getByLabelText('Correo Electrónico').type(email, { force: true })
    // Wait for input validation to complete
    // cy.wait(300)
    cy.getByLabelText('Contraseña').type(password, { force: true })
    // cy.wait(300)

    cy.getByText('Entrar')
      .should('exist')
      .click()
    // .wait(500)
  }
)

Cypress.Commands.add(
  'newInvoicedSale',
  ({
    client,
    paymentMethod, // Defaults to Una exhibición, but can override to "Pago en parcialidades o diferido-PPD"
    paymentType, // Defaults to initial value, but can override to for example "Monedero electrónico"
    currency, // Defaults to initial value MXN, but can override to for example "EUR-Euro"
    cfdiUse, // Defaults to initial value Gastos en general, but can override to for example "Devoluciones"
    concept,
    conceptIsFrequent = false,
    key,
    satKey,
    quantity,
    measurmentUnit,
    unitPrice,
    transferredTaxes,
    withheldTaxes,
    discount,
    visibleNote,
    invisibleNote,
    category,
    bankAccount,
  } = {}) => {
    // Go to sales dashboard
    cy.wait(3000)
    cy.queryByTestId('Ventas').click()

    // Start a new sale
    cy.queryByTestId('FAB').click()
    // Pick the testing client
    cy.queryByText(client, { timeout: 10000 }).click()

    // FILL FORMS
    // Wait for async data rerender
    // cy.wait(500)
    // Form 1 leave as default
    if (paymentMethod) {
      cy.queryByLabelText('Método de pago*').select(paymentMethod)
      // cy.wait(500)
    }
    if (paymentType) {
      cy.queryByLabelText('Forma de pago*').select(paymentType)
      // cy.wait(500)
    }
    if (currency) {
      cy.queryByLabelText('Moneda*').select(currency)
      // cy.wait(500)
    }
    if (cfdiUse) {
      cy.queryByLabelText('Uso de CFDI*').select(cfdiUse)
      // cy.wait(500)
    }
    cy.queryByText('siguiente').click()

    // Form 2
    // Wait for async data rerender
    // cy.wait(3000)
    // Concepto NO FRECUENTE
    cy.queryByTestId('Nombre del concepto*').click({ force: true })
    // cy.wait(500)
    cy.getByLabelText('Nombre del concepto*')
      .type(concept, { force: true })
      .wait(1000)
      .blur()
    // cy.wait(500)
    // cy.queryByTestId('Nombre del concepto*').click()
    // cy.wait(500)
    // cy.getByLabelText('Nombre del concepto*')
    //   .clear()
    //   .type(concept)

    if (conceptIsFrequent) {
      cy.queryByText(concept).click()
      // cy.wait(500)
    }

    // Clave
    if (key) {
      cy.getByLabelText('Clave*').type(key)
    }

    // Clave SAT
    if (satKey) {
      cy.queryByTestId('Clave SAT*').click()
      cy.getByLabelText('Clave SAT*').type(satKey[0])
      cy.wait(400)
      cy.getByTestId(satKey).click({ force: true })
    }

    // Cantidad
    cy.getByLabelText('Cantidad*').type(quantity)

    // Unidad de medida
    if (measurmentUnit) {
      cy.queryByTestId('Unidad de medida*').click({ force: true })
      cy.getByLabelText('Unidad de medida*').type(
        measurmentUnit.slice(0, measurmentUnit.length - 1)
      )
      cy.getByTestId(measurmentUnit).click()
    }

    // Precio unitario
    if (unitPrice) {
      cy.getByLabelText('Precio unitario*').type(unitPrice)
    }

    // Impuestos trasladados
    if (transferredTaxes) {
      transferredTaxes.forEach((tax) => {
        cy.queryByTestId('Impuestos trasladados').click()
        // cy.wait(1000)
        cy.getAllByText(tax.name)
          .first()
          .click({ force: true })
      })
      transferredTaxes.forEach((tax) => {
        cy.getAllByLabelText('Porcentaje*')
          .first()
          .scrollIntoView({ offset: '50px' })
          .clear()
          .type(tax.percentage, { force: true })
      })
    }

    // Impuestos retenidos
    if (withheldTaxes) {
      withheldTaxes.forEach((tax) => {
        cy.queryByTestId('Impuestos retenidos').click()
        // cy.wait(1000)
        cy.getAllByText(tax.name)
          .last()
          .click({ force: true })
        cy.getAllByLabelText('Porcentaje*')
          .last()
          .scrollIntoView({ offset: '50px' })
          .type(tax.percentage, { force: true })
      })
    }

    if (discount) {
      // Get previous inserted taxes to get the index of the discount percentage input
      let previousTaxesCount = 0
      if (transferredTaxes && transferredTaxes.length) {
        previousTaxesCount += transferredTaxes.length
      }
      if (withheldTaxes && withheldTaxes.length) {
        previousTaxesCount += withheldTaxes.length
      }
      cy.getByLabelText('Descuento').click({ force: true })
      cy.getAllByLabelText('Porcentaje*')
        .eq(previousTaxesCount)
        .scrollIntoView({ offset: '50px' })
        .type(discount, { force: true })
    }

    // cy.wait(500)

    cy.queryByText('siguiente').click()

    // Form 3
    // Wait for async data rerender
    // cy.wait(100)

    // No bank account for now
    // Cuenta
    // if (bankAccount) {
    //   cy.queryByLabelText('Cuenta*').select(bankAccount, { timeout: 10000 })
    // }
    // Categoría
    if (category) {
      cy.queryByTestId('Categoría*').click({ force: true })
      cy.getByLabelText('Categoría*').type(
        category.slice(0, category.length - 1)
      )
      cy.queryByTestId(category).click()
    }
    // Nota visible
    if (visibleNote) {
      cy.queryByLabelText('Nota visible para el cliente').type(visibleNote)
    }
    // Nota no visible
    if (invisibleNote) {
      cy.queryByLabelText('Nota interna (no visible para el cliente)').type(
        invisibleNote
      )
    }

    cy.queryByText('siguiente').click()

    // Borrador visible
    cy.getByText('Borrador de factura')

    // Esperando FIX de decimales
    cy.getByText('emitir').click()
    cy.getByText('Venta facturada correctamente', { timeout: 35000 })
  }
)
