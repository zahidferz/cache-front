import gql from 'graphql-tag'

export const UNIT = gql`
  {
    unit @client {
      code
      unit
    }
  }
`
export const SAT_KEY = gql`
  {
    satKey @client {
      code
      description
    }
  }
`

export const SIGNUP_INFO = gql`
  {
    myAccount {
      userNumber
      email
      jobTitle
      userSecurityStatus
      companies {
        company {
          companyNumber
          taxId
          companyProfile {
            businessProfileActivity
            businessSizeEmployees
            businessSizeBranches
            businessBiggestProblem
          }
        }
      }
    }
  }
`
export const TIME_ZONE = gql`
  query TIME_ZONE($companyNumber: Int) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          timeZone
        }
      }
    }
  }
`

export const COMPANY_INFO = gql`
  query COMPANY_INFO($companyNumber: Int) {
    myAccount {
      firstName
      lastName
      mobilePhone
      email
      image
      color
      companies(companyNumber: $companyNumber) {
        company {
          companyNumber
          legalName
          commercialName
          taxId
          companyLogo
          color
          fiscalAddress {
            addressId
            addressNumber
            street
            outsideNumber
            insideNumber
            neighborhood
            municipality
            city
            state
            country
            countryCode
            postalCode
            reference
            fullAddress
          }
          countryCode
          companyDataLocalized {
            ... on CompanyDataLocalized_MEX {
              regimenFiscalCodigo
              regimenFiscalNombre
              ciecConfigurada
              csd {
                certificateNumber
              }
            }
          }
        }
      }
    }
  }
`
export const DRAWER_RIGHT = gql`
  query DRAWER_RIGHT($companyNumber: Int) {
    myAccount {
      color
      companies(companyNumber: $companyNumber) {
        company {
          color
          legalName
          commercialName
          companyLogo
        }
      }
    }
  }
`
export const MENU_PROFILE = gql`
  query MENU_PROFILE {
    myAccount {
      firstName
      lastName
      email
      mobilePhone
      image
      companies {
        company {
          companyNumber
          legalName
          commercialName
          taxId
          companyLogo
          timeZone
          companyDataLocalized {
            ... on CompanyDataLocalized_MEX {
              regimenFiscalNombre
              regimenFiscalCodigo
            }
          }
        }
      }
    }
  }
`

export const HAS_CERTIFICATE = gql`
  query HAS_CERTIFICATE {
    myAccount {
      companies {
        company {
          companyNumber
          companyDataLocalized {
            ... on CompanyDataLocalized_MEX {
              csd {
                certificateNumber
              }
            }
          }
        }
      }
    }
  }
`

export const NOTIFICATIONS = gql`
  query NOTIFICATIONS($page: Int, $size: Int) {
    myAccount {
      companies {
        notifications(page: $page, size: $size) {
          list {
            notificationId
            branchId
            datetime
            image
            description
            readStatus
            userCompleteName
            userColor
            resourceReferences {
              resourceId
              resourceType
              resourceDescription
              index
            }
          }
          size
        }
      }
    }
  }
`

export const CLIENTS_SHORT_QUERY = gql`
  query clients($companyNumber: Int!, $size: Int) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          clients(
            page: 1
            size: $size
            options: { withDefaultClientsForCountryCode: "MEX" }
          ) {
            size
            list {
              clientId
              clientNumber
              taxId
              businessName
              commercialName
              countryCode
              gln
              status
              registeredDate
              lastActivityStatus
              avatarURL
              lastActivity
            }
          }
        }
      }
    }
  }
`
export const CLIENTS_SEARCH = gql`
  query CLIENTS_SEARCH(
    $companyNumber: Int!
    $page: Int
    $size: Int
    $where: CompanyClientsCriteriaInput
    $options: CompanyClientsOptionsInput
  ) {
    myAccount {
      userNumber
      email
      companies(companyNumber: $companyNumber) {
        company {
          companyNumber
          taxId
          clients(page: $page, size: $size, where: $where, options: $options) {
            list {
              clientId
              clientNumber
              color
              taxId
              businessName
              commercialName
              countryCode
              gln
              status
              registeredDate
              lastActivityStatus
              avatarURL
              lastActivity
            }
            size
          }
        }
      }
    }
  }
`
export const CLIENT_INFO_SHORT = gql`
  query CLIENT_INFO_SHORT($companyNumber: Int!, $clientId: ID!) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          clients(page: 1, size: 10, where: { clientId: $clientId }) {
            list {
              clientId
              clientNumber
              color
              taxId
              businessName
              commercialName
              countryCode
              gln
              status
              registeredDate
              lastActivityStatus
              avatarURL
              lastActivity
              expectedPaymentMethod
              expectedPaymentMethodDescription
              usoCfdi
            }
          }
        }
      }
    }
  }
`

export const CLIENT_DETAIL_INFO = gql`
  query CLIENT_DETAIL_INFO(
    $companyNumber: Int
    $clientId: ID
    $branchNumber: Int!
  ) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          clients(page: 1, size: 10, where: { clientId: $clientId }) {
            list {
              # Valor arriba de las estrellitas cuentas por cobrar
              totalAccountsReceivableAmount(branchNumber: $branchNumber) {
                total
                currencyCode
              }
              color
              #pendiente pero se pueden usar los campos que empiezan contag
              tagPaymentBehavior
              tagActivityBehavior
              tagDebLevel
              tagCreditBehavior
              #estrellitas
              starring
              avatarURL
              status
              commercialName
              expectedPaymentMethod
              expectedPaymentMethodDescription
              usoCfdi
              lastActivityStatus
            }
          }
        }
      }
    }
  }
`
export const CLIENT_SALES_SUMMARY = gql`
  query CLIENT_SALES_SUMMARY($companyNumber: Int, $clientId: ID, $year: Int) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          clients(page: 1, size: 10, where: { clientId: $clientId }) {
            list {
              salesSumary(searchedYear: $year) {
                total
                months {
                  total
                  currency
                  month
                }
              }
              salesSumaryExistedYears
            }
          }
        }
      }
    }
  }
`
export const CLIENT_GENERAL_INFO = gql`
  query CLIENT_GENERAL_INFO(
    $companyNumber: Int!
    $clientId: ID!
    $branchNumber: Int!
  ) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          clients(where: { clientId: $clientId }) {
            list {
              clientId
              clientNumber
              color
              taxId
              businessName
              commercialName
              countryCode
              gln
              status
              totalAccountsReceivableAmount(branchNumber: $branchNumber) {
                total
                currencyCode
              }
              registeredDate
              lastActivity
              address {
                addressNumber
                street
                outsideNumber
                insideNumber
                neighborhood
                municipality
                city
                state
                country
                countryCode
                postalCode
                reference
                fullAddress
              }
              contacts {
                personId
                name
                jobTitle
                email
                phone
                mobilePhone
                countryCode
                country
              }
              bankAccounts {
                bankAccountId
                bankAccountNumber
                bank {
                  name
                }
                status
                owner
                currency
                countryCode
                bank {
                  #bankId
                  bankCode
                  name
                  longName
                  countryCode
                }
                bankAccountDataLocalized {
                  ... on MoneyAccountData_MEX {
                    clabe
                  }
                }
              }
              sellOnCredit
              maximumCreditAmount
              maximumCreditCurrency
              maximumCreditDays
              starring
              lastActivityStatus
              branches {
                clientBranchId
                name
                address {
                  addressId
                  addressNumber
                  street
                  outsideNumber
                  insideNumber
                  neighborhood
                  municipality
                  city
                  state
                  country
                  countryCode
                  postalCode
                  reference
                  fullAddress
                }
              }
              avatarURL
              totalSalesAmount {
                total
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`
export const COMPANY_INCOME_SUMMARY = gql`
  query COMPANY_INCOME_SUMMARY($companyNumber: Int) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          incomeSummary {
            accountsReceivable {
              total
              totalDueOnReferenceDate
              totalUndue
              totalDue
              currency
              referenceDate
            }
          }
        }
      }
    }
  }
`
export const COMPANY_SALES_SUMMARY = gql`
  query COMPANY_SALES_SUMMARY($companyNumber: Int, $searchedYear: Int) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          salesSumaryExistedYears
          salesSumaryPerMonth(searchedYear: $searchedYear) {
            total
            months {
              total
              currency
              month
            }
          }
        }
      }
    }
  }
`
export const COMPANY_YEARS_WITH_SALES = gql`
  query COMPANY_YEARS_WITH_SALES($companyNumber: Int) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          salesSumaryExistedYears
        }
      }
    }
  }
`
export const SALES_SEARCH = gql`
  query SALES_SEARCH(
    $companyNumber: Int
    $page: Int
    $size: Int
    $where: CompanySalesCriteriaInput
  ) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          sales(page: $page, size: $size, where: $where) {
            list {
              saleId
              #NO VIENE EL VE SOLO 100 se tiene que dar formato VE-100
              saleNumber
              date
              total
              currency
              branchNumber
              #fullyPaid -cobrada
              #partiallyPaid -parcial
              #notPaid  - estimado y debe traer expectedPaymentSchedule (Estimado del 17 julio)
              paymentStatus
              status #cancelled -- cancelada ahorita solo valid
              invoices {
                invoiceId
                saleId
                #LETRA DE  LA ABAJO A LA DERECHA
                folio
                amount
                saleAmount
              }
              incomeCategory {
                color
                name
                status
              }
              expectedPaymentSchedule {
                expectedDate
              }
              receivedPayments {
                amountPaidToThisSale
                date
              }
            }
            size
          }
        }
      }
    }
  }
`
export const GET_SALE_PDF = gql`
  query GET_SALE_PDF($companyNumber: Int, $branchNumber: Int, $saleId: ID) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          sales(
            size: 1
            page: 1
            where: { branchNumber: $branchNumber, saleId: $saleId }
          ) {
            list {
              pdfFile
            }
          }
        }
      }
    }
  }
`
export const GET_SALE_XML = gql`
  query GET_SALE_XML($companyNumber: Int, $branchNumber: Int, $saleId: ID) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          sales(
            size: 1
            page: 1
            where: { branchNumber: $branchNumber, saleId: $saleId }
          ) {
            list {
              xmlFile
            }
          }
        }
      }
    }
  }
`
export const SALE_DETAIL_HISTORY = gql`
  query SALE_DETAIL_HISTORY(
    $companyNumber: Int!
    $branchNumber: Int!
    $saleId: ID!
    $page: Int
    $size: Int
  ) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          companyNumber
          sales(where: { branchNumber: $branchNumber, saleId: $saleId }) {
            list {
              saleHistory(page: $page, size: $size) {
                list {
                  movementType
                  creationDate
                  color
                  image
                  movement
                  fullName
                }
                size
              }
            }
          }
        }
      }
    }
  }
`
export const SALE_DETAIL = gql`
  query SALE_DETAIL($companyNumber: Int!, $branchNumber: Int!, $saleId: ID!) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          companyNumber
          sales(where: { branchNumber: $branchNumber, saleId: $saleId }) {
            list {
              saleId
              saleNumber
              total
              invoices {
                invoiceId
                saleId
                amount
                saleAmount
                folio
              }
              status
              invoicedStatus
              paymentStatus
              pdfFile
              xmlFile
              expectedPaymentMethod
              receivedPayments {
                date
                amountPaidToThisSale
                currency
                exchangeRate
              }
              expectedPaymentSchedule {
                expectedDate
                expectedAmount
              }
            }
          }
        }
      }
    }
  }
`

export const LOCAL_COMPANY = gql`
  query LOCAL_COMPANY {
    company @client {
      number
      branchNumber
    }
  }
`

export const COMPANY_NUMBER = gql`
  query COMPANY_NUMBER {
    myAccount {
      companies {
        company {
          companyNumber
        }
      }
    }
  }
`
export const BRANCHES = gql`
  query BRANCHES($companyNumber: Int!) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          branches {
            branchNumber
            name
          }
        }
      }
    }
  }
`
export const DASHBOARD = gql`
  query DASHBOARD($companyNumber: Int!) {
    myAccount {
      userNumber
      firstName
      email
      jobTitle
      creationDate
      companies(companyNumber: $companyNumber) {
        company {
          companyDocumentsLogo
          companyNumber
          configuration {
            features {
              sales {
                used
              }
              spending {
                used
              }
            }
          }
          moneyAccounts {
            moneyAccountId
            moneyAccountNumber
            moneyAccountType
            name
            description
            moneyAccountBalance {
              balance
              initialBalance
              initialBalanceDate
            }
            owner
            status
            currency
            countryCode
            logo
            moneyAccountConnection {
              status
              lastSyncDate
            }
            # ... on BankAccount {
            #   bankAccountId
            #   accountType
            #   bankAccountName
            #   bankAccountNumber
            #   accountBalance
            #   currency
            #   logo
            #   bank {
            #     name
            #     longName
            #   }
            #   connectionStatus
            #   connectionLastSynchDate
            # }
            # ... on CreditAccount {
            #   creditAccountId
            #   accountType
            #   creditAccountName
            #   creditAccountNumber
            #   accountBalance
            #   currency
            #   logo
            #   bank {
            #     name
            #     longName
            #   }
            #   connectionStatus
            #   connectionLastSynchDate
            # }
            # ... on OtherAccount {
            #   accountId
            #   accountType
            #   accountName
            #   accountNumber
            #   accountBalance
            #   currency
            #   logo
            # }
          }
          incomeSummary {
            accountsReceivable {
              referenceDate
              currency
              total
              totalDue
              totalDueOnReferenceDate
              totalUndue
            }
            sales {
              today {
                total
                currency
                dateRangeFilterType
                startDate
                endDate
              }
              currentWeek {
                total
                currency
                dateRangeFilterType
                startDate
                endDate
              }
              currentMonth {
                total
                currency
                dateRangeFilterType
                startDate
                endDate
              }
            }
          }
          spendingSummary {
            accountsPayable {
              referenceDate
              currency
              total
              totalDue
              totalDueOnReferenceDate
              totalUndue
            }
            expenses {
              today {
                total
                currency
                dateRangeFilterType
                startDate
                endDate
              }
              currentWeek {
                total
                currency
                dateRangeFilterType
                startDate
                endDate
              }
              currentMonth {
                total
                currency
                dateRangeFilterType
                startDate
                endDate
              }
            }
          }
          companyDataLocalized {
            ... on CompanyDataLocalized_MEX {
              ciecConfigurada
              ciecConfiguradaFecha
              estatusDescargaCfdis
              csd {
                certificateToken
                certificateStatus
              }
            }
          }
        }
        userCompanyPreferences {
          salesSummaryDefaultView
          spendingSummaryDefaultView
        }
      }
    }
  }
`
export const TODOS_FILTERS = gql`
  query filterTodos(
    $companyNumber: Int!
    $page: Int!
    $size: Int!
    $branches: [Int!]
    $text: String
  ) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          pendingItems(
            page: $page
            size: $size
            where: { branches: $branches, text: $text }
          ) {
            size
            list {
              pendingItemId
              type
              branchNumber
              actionableResourceId
              title
              actions
              actionableResourceType
              description
              actionableResourceReference
              descriptionReferences {
                resourceDescription
              }
              creationDatetime
              title
              users {
                image
                userNumber
                userCompleteName
              }
            }
          }
        }
      }
    }
  }
`
export const TODOS_FILTER_SIZE = gql`
  query filterTodosSize(
    $companyNumber: Int!
    $page: Int!
    $size: Int!
    $branches: [Int!]
    $text: String
  ) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          pendingItems(
            page: $page
            size: $size
            where: { branches: $branches, text: $text }
          ) {
            size
            list
          }
        }
      }
    }
  }
`
export const TODOS_SIZE = gql`
  query getTodos($companyNumber: Int!, $page: Int!, $size: Int!) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          pendingActions(page: $page, size: $size) {
            size
          }
        }
      }
    }
  }
`
export const TODOS = gql`
  query getTodos($companyNumber: Int!, $page: Int!, $size: Int!) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          pendingActions(page: $page, size: $size) {
            size
            list {
              type
              companyNumber
              branchNumber
              itemsCount
              datetime
              actionableResourcesType
              description
              title
              actions
              users {
                userNumber
                userCompleteName
                image
              }
              items {
                pendingItemId
              }
            }
          }
        }
      }
    }
  }
`

export const SOLVED_TODOS = gql`
  query getSolvedTodos($companyNumber: Int!, $page: Int!, $size: Int!) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          pendingActionsDone(page: $page, size: $size) {
            size
            list {
              pendingActionDoneId
              type
              actionedResourcesType
              description
              datetime
              items {
                pendingItemId
              }
              completedBy {
                image
                userStatus
                color
                userCompleteName
              }
            }
          }
        }
      }
    }
  }
`
export const SOLVED_TODOS_FILTERS = gql`
  query solvedTodosFilters(
    $companyNumber: Int!
    $page: Int!
    $size: Int!
    $branches: [Int!]
    $text: String
  ) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          pendingItemsDone(
            page: $page
            size: $size
            where: { branches: $branches, text: $text }
          ) {
            size
            list {
              pendingItemId
              type
              completionDatetime
              title
              description
              completedBy {
                image
                color
                userStatus
                userCompleteName
              }
              descriptionReferences {
                resourceDescription
              }
            }
          }
        }
      }
    }
  }
`
export const INCOME_CATEGORIES = gql`
  query INCOME_CATEGORIES($companyNumber: Int!, $page: Int!, $size: Int!) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          incomeCategories(page: $page, size: $size) {
            incomeCategoryId
            color
            status
            name
          }
        }
      }
    }
  }
`

export const SEARCH_INCOME_CATEGORY = gql`
  query SEARCH_INCOME_CATEGORY(
    $page: Int!
    $size: Int!
    $search: String
    $status: IncomeCategoryStatusEnum
    $companyNumber: Int!
  ) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          incomeCategories(
            page: $page
            size: $size
            where: { search: $search, status: $status }
          ) {
            incomeCategoryId
            name
            status
            color
          }
        }
      }
    }
  }
`
export const INCOME_CATEGORY_BY_ID = gql`
  query INCOME_CATEGORY_BY_ID(
    $page: Int!
    $size: Int!
    $incomeCategoryId: ID
    $companyNumber: Int!
  ) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          incomeCategories(
            page: $page
            size: $size
            where: { incomeCategoryId: $incomeCategoryId }
          ) {
            incomeCategoryId
            color
            status
            name
          }
        }
      }
    }
  }
`
export const FREQUENT_ITEMS = gql`
  query frequentItems($companyNumber: Int, $page: Int, $size: Int) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          frequentItems(size: $size, page: $page) {
            size
            list {
              documentItemId
              key
              description
              unitBasePrice
              status
              currency
              withheldTaxesPerUnit {
                rate
                withheldTaxesPerUnitId
                amount
                name
                code
              }
              transferredTaxesPerUnit {
                rate
                transferredTaxesPerUnitId
                amount
                name
                code
              }
              itemAdditionalDataLocalized {
                ... on FrequentItemAdditionalData_MEX {
                  claveProductoServicioSAT
                  descripcionProductoServicioSAT
                  claveUnidadMedidaSAT
                  descripcionUnidadMedidaSAT
                }
              }
            }
          }
        }
      }
    }
  }
`
export const FREQUENT_ITEMS_SEARCH = gql`
  query frequentItemsSearch(
    $companyNumber: Int
    $page: Int
    $size: Int
    $search: String
    $status: FrequentItemStatusSearchEnum
  ) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          frequentItems(
            size: $size
            page: $page
            where: { search: $search, status: $status }
          ) {
            size
            list {
              documentItemId
              key
              status
              description
              unitBasePrice
              currency
              withheldTaxesPerUnit {
                rate
                withheldTaxesPerUnitId
                amount
                name
                code
              }
              transferredTaxesPerUnit {
                rate
                transferredTaxesPerUnitId
                amount
                name
                code
              }
              itemAdditionalDataLocalized {
                ... on FrequentItemAdditionalData_MEX {
                  claveProductoServicioSAT
                  descripcionProductoServicioSAT
                  claveUnidadMedidaSAT
                  descripcionUnidadMedidaSAT
                }
              }
            }
          }
        }
      }
    }
  }
`
export const FREQUENT_CONCEPT_BY_ID = gql`
  query frequentItemById($companyNumber: Int, $id: ID) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          frequentItems(size: 50, page: 1, where: { documentItemId: $id }) {
            size
            list {
              documentItemId
              key
              description
              status
              unitBasePrice
              currency
              withheldTaxesPerUnit {
                rate
                withheldTaxesPerUnitId
                amount
                name
                code
              }
              transferredTaxesPerUnit {
                rate
                transferredTaxesPerUnitId
                amount
                name
                code
              }
              itemAdditionalDataLocalized {
                ... on FrequentItemAdditionalData_MEX {
                  claveProductoServicioSAT
                  descripcionProductoServicioSAT
                  claveUnidadMedidaSAT
                  descripcionUnidadMedidaSAT
                }
              }
            }
          }
        }
      }
    }
  }
`
export const LOCAL_SALE = gql`
  {
    sale @client {
      saleId
      branchNumber
      pdfFile
      pdfUrl
      date
      expectedPaymentMethod
      expectedPaymentMethodDescription
      expectedPaymentForm {
        code
        paymentType
        usesBank
      }
      saleAdditionalDataLocalizedInput_MEX {
        usoCfdi
        code
        use
        valid_for_company
        valid_for_person
      }
      currency
      invoicedSale
      clientId
      items {
        type
        itemReferenceId
        localId
        position
        description
        currency
        additionalNotes
        key
        itemAdditionalDataLocalizedInput_MEX {
          claveProductoServicioSAT
          claveProductoServicioSATDescripcion
          claveUnidadMedidaSAT
          claveUnidadMedidaSATDescripcion
        }
        quantity
        unit
        unitBasePrice
        currency
        discountPercentage
        discountAmount
        discountDescription
        unitPriceWithDiscounts
        totalAmount
        unitTotalPrice
        subtotalAmount
        unitPriceWithDiscounts
        transferredTaxesPerUnit {
          code
          taxName
          rate
          amount
        }
        withheldTaxesPerUnit {
          code
          taxName
          rate
          amount
        }
      }
      paymentStatus
      expectedDate
      expectedPaymentSchedule {
        expectedDate
        expectedAmount
        expectedReceivingMoneyAccountId
        accountDescription
      }
      incomeCategoryId
      internalNotes
      externalNotes
    }
  }
`
export const BANK_ACCOUNTS = gql`
  query bankAccount($companyNumber: Int) {
    myAccount {
      companies(companyNumber: $companyNumber) {
        company {
          moneyAccounts {
            moneyAccountId
            name
          }
        }
      }
    }
  }
`
export const LOCAL_INCOME_CATEGORY = gql`
  {
    incomeCategory @client {
      incomeCategoryId
      name
    }
  }
`
