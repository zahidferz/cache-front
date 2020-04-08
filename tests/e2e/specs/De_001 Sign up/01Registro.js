import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import { constants } from "buffer";
import { exists, watchFile } from "fs";


const link = Cypress.env('HOST')

Given("Abro la pagina de Chain", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    /* eslint-disable */
    console.log("Caught error", err);
    /* eslint-enable */
    return false;
  });
  cy.visit(link);
});

Then("Puedo ver la pantalla Chain", () => {
  cy.url().should("eq", link);
  cy.get("[data-testid=Registrarme]")
    .contains("Registrarme")
    .should("exist")
    .and("be.visible");
  cy.get(".gx-caption > .font-bold")
    .contains("iniciar sesión")
    .should("exist")
    .and("be.visible");
});

Given(/Doy click en el botón "(.*)"/, buttonTitle => {
  const selectorTitle = buttonTitle;
  cy.findByText(selectorTitle)
    .click()
    .wait(5000);
});

Then("Puedo ver la pantalla de Registro", () => {
  cy.url().should("contains", "/registro/infogeneral");
  cy.findByText("Bienvenido").should("exist");
  cy.findByLabelText("Nombre*").should("exist");
  cy.findByLabelText("Apellido*").should("exist");
  cy.findByLabelText("Teléfono*").should("exist");
  cy.findByLabelText("Correo Electrónico*").should("exist");
  cy.findByLabelText("Contraseña*").should("exist");
  cy.findByText("Crear cuenta").should("exist");
  cy.findByText("¿Ya tienes una cuenta?").should("exist");
  cy.findByText("Inicia sesión").should("exist");
  cy.get(".intercom-launcher-frame")
    .should("exist")
    .click({ force: true });
});

Then(/Ingreso en el campo "(.*)" los datos "(.*)"/, (CamSelec, DatoInt) => {
  const selectorCampo = CamSelec;
  const selectorDato = DatoInt;
  cy.findByLabelText(selectorCampo).type(selectorDato);
});

Then(/Muestra el mensaje de "(.*)"/, message => {
  const selectorMsj = message;
  cy.findByText(selectorMsj).should("exist");
});

When(/Limpio el campo "(.*)"/, CamSelec => {
  const selectorCampo = CamSelec;
  cy.findByLabelText(selectorCampo).clear();
});

Then("Doy click en ver contraseña", () => {
  cy.get(".mr-4 > .relative > .right-0")
    .should("exist")
    .click();
});

Then(/Veo la contraseña "(.*)"/, Pws => {
  const selectorPws = Pws;
  cy.findByLabelText("Contraseña*").should("have.value", selectorPws);
});

Then(/Muestra los  mensajes de "(.*)"/, message => {
  const selectorMsj = message;
  cy.findAllByText(selectorMsj).should("exist");
});

Given("Que estoy en el registro", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    /* eslint-disable */
    console.log("Caught error", err);
    /* eslint-enable */
    return false;
  });
  cy.visit(`${link}registro/`, {failOnStatusCode :  false });
});

When("Ingreso los datos del usuario", requiredFields => {
  requiredFields.rawTable.slice(1).forEach(requiredFieldDef => {
    const selector = requiredFieldDef[0];
    const value = requiredFieldDef[1];
    cy.findByLabelText(selector).type(value, { force: true });
  });
});

//Ingreso para un nuevo usuario

Then(/Doy click en el botón de información "(.*)"/, CamSelec => {
  const selectorCampo = CamSelec;
  cy.findByText(selectorCampo)
    .click()
    .wait(2000);
});

Then("Cargo los datos de la empresa", () => {
  cy.findByText("Último Paso");
  cy.findByPlaceholderText("¿A qué se dedica tu empresa?*").type("comercio", {
    force: true
  });
  cy.findByText("Comercio").click();
  cy.findByPlaceholderText("Elige cuántos son en el equipo*").type("15", {
    force: true
  });
  cy.findAllByText("15").then(arr => {
    arr[0].click();
  });
  cy.findByPlaceholderText("Elige cuántas sucursales tienes*").type("15", {
    force: true
  });
  cy.findAllByText("15").then(arr => {
    arr[2].click();
  });
});

Then("Omito invitar", () => {
  cy.findByText("Omitir este paso").click();
});

Then("Selecciono al usuario Soy dueño", () => {
  cy.findByText("Háblanos de la mejor empresa: ¡La tuya!");
  cy.findByText("Soy dueño").click();
});
Given("Selecciono el regimen fiscal", () => {
  cy.findByPlaceholderText("Régimen fiscal*").type("Sueldos", { force: true });
  cy.findByText("Sueldos y Salarios e Ingresos Asimilados a Salarios").click();
});

Then(/Selecciono el check "(.*)"/, check => {
  cy.findByLabelText("Ingresar mi información manualmente.").check({
    force: true
  });
});

Then("Doy click en el botón Continuar", () => {
  cy.wait(5000)
    .findByText("Continuar")
    .click();
});

Then("Puedo ver la pagina de Dashboard", () => {
  cy.wait(3000)
    .url()
    .should("eq", `${link}web/dashboard`);
});