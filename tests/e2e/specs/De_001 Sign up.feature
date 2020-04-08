Feature: Primer ingreso a Chain

  Quiero poder entrar a la pagina de  Chain,
  y poder realizar las operaciones correspondientes como son:
  Ingresar un usuario y realizar un login.


  Scenario: Validar la pantalla de chain

    Given Abro la pagina de Chain
    Then  Puedo ver la pantalla Chain


  Scenario:Ingresar a la pantalla de registro

    Given Abro la pagina de Chain
    And   Doy click en el botón "Registrarme"
    Then  Puedo ver la pantalla de Registro


  Scenario: Validar los campos nombre y apellido

    Given  Que estoy en el registro
    When   Ingreso en el campo "Nombre*" los datos "E"
    Then   Muestra el mensaje de "Tu nombre es muy corto"
    And    Limpio el campo "Nombre*"
    When   Ingreso en el campo "Apellido*" los datos "A"
    Then   Muestra el mensaje de "Tu nombre es muy corto"
    And    Limpio el campo "Apellido*"


  Scenario: Validar el campo teléfono

    Given  Que estoy en el registro
    When   Ingreso en el campo "Teléfono*" los datos "123"
    Then   Muestra el mensaje de "Teléfono mínimo de 10 dígitos"
    And    Limpio el campo "Teléfono*"
    When   Ingreso en el campo "Teléfono*" los datos "1111111111111111"
    Then   Muestra el mensaje de "Ingresa un número válido"
    And    Limpio el campo "Teléfono*"

  Scenario: Validar el campo correo electronico

    Given  Que estoy en el registro
    When   Ingreso en el campo "Correo Electrónico*" los datos "liongmail.com"
    Then   Muestra el mensaje de "Escribe un correo válido"
    And    Limpio el campo "Correo Electrónico*"
    When   Ingreso en el campo "Correo Electrónico*" los datos "li:on@gmail.com"
    Then   Muestra el mensaje de "Escribe un correo válido"
    And    Limpio el campo "Correo Electrónico*"
    Given  Ingreso en el campo "Correo Electrónico*" los datos "l ion@gmail.com"
    Then   Muestra el mensaje de "Escribe un correo válido"
    And    Limpio el campo "Correo Electrónico*"


  Scenario: Validar el campo contraseña

    Given  Que estoy en el registro
    When   Ingreso en el campo "Contraseña*" los datos "ges"
    Then   Muestra el mensaje de "Debes utilizar al menos 8 caracteres"
    And    Limpio el campo "Contraseña*"
    When   Ingreso en el campo "Contraseña*" los datos "gestionix"
    Then   Muestra el mensaje de "Debes utilizar al menos una letra mayúscula"
    And    Limpio el campo "Contraseña*"
    When   Ingreso en el campo "Contraseña*" los datos "Gestionix"
    Then   Muestra el mensaje de "Debes utilizar al menos un número"
    And    Limpio el campo "Contraseña*"
    # When Ingreso en el campo "Contraseña*" los datos "Gestionix 88"
    # Then   Muestra el mensaje de "La contraseña no debe contener espacio"
    # And   Limpio el campo "Contraseña*"
    When   Ingreso en el campo "Contraseña*" los datos "Gestionix88"
    And    Doy click en ver contraseña
    Then   Veo la contraseña "Gestionix88"
    And    Limpio el campo "Contraseña*"


  Scenario: Validar los campos requridos

    Given  Que estoy en el registro
    And    Doy click en el botón "Crear cuenta"
    Then   Muestra los  mensajes de "Este campo es requerido"


  # Scenario: Crer un usuario dueño

  #   Given  Que estoy en el registro
  #   And    Ingreso los datos del usuario
  #     | Required field      | Value                      |
  #     | Nombre*             | Willebaldo Emmanuel        |
  #     | Apellido*           | Cañas Arellano             |
  #     | Teléfono*           | 5567654323                 |
  #     | Correo Electrónico* | qa.pruebasx01+2001@gmail.com |
  #     | Contraseña*         | Gestionix2020              |
  #   When  Doy click en el botón "Crear cuenta"
  #   And   Doy click en el botón Continuar
  #   And   Selecciono el check "Ingresar mi información manualmente"
  #   And   Ingreso los datos del usuario
  #     | Required field        | Value                 |
  #     | RFC                   | perj930208uj3         |
  #     | Nombre o Razón Social | Pruebas-automatizadas |
  #     | Nombre Comercial      | Pruebas-automatizadas |
  #     | C.P.*                 | 07870                 |
  #   And   Selecciono el regimen fiscal
  #   When  Doy click en el botón de información "conectarme"
  #   Then  Selecciono al usuario Soy dueño
  #   And   Doy click en el botón de información "continuar"
  #   And   Omito invitar
  #   And   Doy click en el botón de información "salir"
  #   And   Cargo los datos de la empresa
  #   And   Doy click en el botón de información "Iniciar"
  #   Then  Puedo ver la pagina de Dashboard


  Scenario: Validar un usuario dueño existente

    Given  Que estoy en el registro
    And    Ingreso los datos del usuario
      | Required field      | Value                      |
      | Nombre*             | Willebaldo Emmanuel        |
      | Apellido*           | Cañas Arellano             |
      | Teléfono*           | 5567654323                 |
      | Correo Electrónico* | qa.pruebasx01+01@gmail.com |
      | Contraseña*         | Gestionix2020              |
    When  Doy click en el botón "Crear cuenta"
    Then  Muestra el mensaje de "Ya existe un usuario con el email indicado"
