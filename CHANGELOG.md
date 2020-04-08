# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

- Added - para funcionalidades nuevas.
- Changed - para los cambios en las funcionalidades existentes.
- Deprecated para indicar que una característica o funcionalidad está obsoleta y que se eliminará en las próximas versiones.
- Removed - para las características en desuso que se eliminaron en esta versión.
- Fixed - para corrección de errores.
- Security - en caso de vulnerabilidades.
- Unreleased - para llevar los cambios que se aplicarán en el siguiente release
- Package - para cambios en dependencias

## [Unreleased]

## [1.0.8] - 2020-04-06

### Fixed

- Migrate GxTextFieldMoney (Add thousand separator to maximumCreditAmount) on CreateNewClientForm [4ya8up](https://app.clickup.com/t/4ya8up)
- Horizontal Padding ClientSummary.vue (Mo)
- Hide Itercom chat while update app prompt is open [4pfb8g](https://app.clickup.com/t/4pfb8g)
- Add limit (99999999999999) to GxTextFieldMoney
- Fallback when the user does not have clients
- Fallback when the user does not have clients with recent activity
- Actualizar Público en General pantalla de Mis Clientes [5g8at8](https://app.clickup.com/t/5g8at8)
- Text Area issues [#3w7kf7](https://app.clickup.com/t/3w7kf7)
- Handler enter-leave transitions bewtween modals(Skip step modal and invitation form) on SignupCompanyRole

## [1.0.7] - 2020-03-30

### Added

- The icon to show the password must always be visible (GxTextFieldDarkPassword and GxTextFieldPassword)[549gu5](https://app.clickup.com/t/549gu5)
- Not results found image and text in NewSaleSelectUnit.vue
- Item divider NewSaleSelectUnit.vue
- Not results found image and text in NewSaleSelectSatKey.vue

### Fixed

- 18 digit CLABEs displaying error when creating a new client
- 404 copy should be the same in all devices [5jg0xz](https://app.clickup.com/t/5jg0xz)
- Migrate GxAutocomplete on NewSaleConcept[5jdnum](https://app.clickup.com/t/5jdnum)
- Migrate Autocomplete Clave SAT and Unit Measure[5p8p4r](https://app.clickup.com/t/5p8p4r)
- Display postal on select addres GxAddressGoogleMaps[4ub6h8](https://app.clickup.com/1229867/v/l/6-21077616-1)

## [1.0.6] - 2020-03-25

### Added

- Added GxTextFieldMoney. Selecionar contenido del input al hacer foco,Alinear texto de moneda con el texto del input. Dejar como valor Default 0.00
- Tag PPD as Pago por Definir [4ya97g](https://app.clickup.com/t/4ya97g)

### Fixed

- Typo [5adyn5](https://app.clickup.com/t/5adyn5)
- Change title if user is an accountant [567mkd](https://app.clickup.com/t/567mkd)
- Remove autofocus on signupDownloadXmlsForm [567fhe](https://app.clickup.com/t/567fhe)

## [1.0.5] - 2020-03-23

### Added

- Add drag and drop to profile pic and logo uploads [4jev3d](https://app.clickup.com/t/4jev3d)

### Fixed

- Fix sales rounding [5ga4hu](https://app.clickup.com/t/5ga4hu)

## [1.0.4] - 2020-03-18

### Fixed

- Fix show error when Colaborador tries to send SOS [4p8wyv](https://app.clickup.com/t/4p8wyv)
- Fix show address when viewing client detail [4ub71p](https://app.clickup.com/t/4ub71p)
- Fix instagram and facebook hovers [4y7ryt](https://app.clickup.com/t/4y7ryt)
- Conditioning autofocus on textarea and textfieldDark components [4jf6em](https://app.clickup.com/t/4jf6em)
- Add authentication handler to ApolloClient (Silent login and retry failed queries)[54bxvh](https://app.clickup.com/t/54bxvh)

### Package

- TailwindCSS 1.1.2 to 1.2.0

## [1.0.3] - 2020-03-03

### Fixed

- Add fallback for cookies when the user did not go through the welcome screen [548tjg](https://app.clickup/com/t/548tjg)
- Can create a PPD sale with a single payment [4ufn7w](https://app.clickup.com/t/4ufn7w)
- Typo on mail labels [4pfhmt](https://app.clickup.com/t/4pfhmt)
- Add spanish language to google maps api [4ub6r7](https://app.clickup.com/t/4ub6r7)

## [1.0.2] - 2020-02-27

### Fixed

- Update autofocus timeouts in signup [4jf6em](https://app.clickup.com/t/4jf6em)
- Typos [4pfhmt](https://app.clickup.com/t/4pfhmt)
- Upadate 404 PAGE [4g9dpz](https://app.clickup.com/t/4g9dpz)
- ADD hovers on banner buttons [4wct1a](https://app.clickup.com/t/4wct1a)
- Upadate notifications icon [4jb0rj](https://app.clickup.com/t/4jb0rj)

### Added

- TaxID to query params of SignUp links used by TotalPlay as invitations: [https://app.chain.inc/registro/infogeneral/nombre?tp=true&fn=John&ln=Doe&e=john@doe.com&p=5582938293&tax=XEXX000101X00](https://app.chain.inc/registro/infogeneral/nombre?tp=true&fn=John&ln=Doe&e=john@doe.com&p=5582938293&tax=XEXX000101X00)
- Upscope integration
