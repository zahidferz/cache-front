import gql from 'graphql-tag'

export const REQUEST_SALES_BY_TIME_PERIOD = gql`
  mutation REQUEST_SALES_BY_TIME_PERIOD(
    $data: CompanyReportsRequestByEmailSalesByTimePeriodInput! #  $companyNumber: Int! #  $startDate: String #  $endDate: String
  ) {
    companyReportsRequestByEmailSalesByTimePeriod(
      data: $data #  companyNumber: $companyNumber #  startDate: $startDate #  endDate: $endDate
    ) {
      success
      email
    }
  }
`

export const FREQUENT_ITEM_DEACTIVATE = gql`
  mutation FREQUENT_ITEM_DEACTIVATE(
    $companyNumber: Int!
    $branchNumber: Int!
    $documentItemId: ID!
  ) {
    frequentItemDeactivate(
      companyNumber: $companyNumber
      branchNumber: $branchNumber
      documentItemId: $documentItemId
    ) {
      documentItemId
      status
    }
  }
`
export const FREQUENT_ITEM_REACTIVATE = gql`
  mutation FREQUENT_ITEM_REACTIVATE(
    $companyNumber: Int!
    $branchNumber: Int!
    $documentItemId: ID!
  ) {
    frequentItemReactivate(
      companyNumber: $companyNumber
      branchNumber: $branchNumber
      documentItemId: $documentItemId
    ) {
      documentItemId
      status
    }
  }
`
export const UPDATE_FREQUENT_ITEM = gql`
  mutation UPDATE_FREQUENT_ITEM(
    $companyNumber: Int!
    $branchNumber: Int!
    $documentItemId: ID!
    $data: FrequentItemUpdateInput!
  ) {
    frequentItemUpdate(
      companyNumber: $companyNumber
      branchNumber: $branchNumber
      documentItemId: $documentItemId
      data: $data
    ) {
      documentItemId
    }
  }
`

export const CREATE_FREQUENT_CONCEPT = gql`
  mutation(
    $companyNumber: Int!
    $branchNumber: Int!
    $data: FrequentItemCreateInput!
  ) {
    frequentItemCreate(
      companyNumber: $companyNumber
      branchNumber: $branchNumber
      data: $data
    ) {
      key
    }
  }
`
export const UPDATE_USER_NAME = gql`
  mutation($name: String!) {
    updateUserName(name: $name) @client
  }
`
export const UPDATE_USER_LASTNAME = gql`
  mutation($lastname: String!) {
    updateUserLastname(lastname: $lastname) @client
  }
`
export const UPDATE_USER_EMAIL = gql`
  mutation($email: String!) {
    updateUserEmail(email: $email) @client
  }
`
export const UPDATE_USER_JOBTITLE = gql`
  mutation($jobTitle: String!) {
    updateUserJobTitle(jobTitle: $jobTitle) @client
  }
`

export const UPDATE_USER_INFO = gql`
  mutation(
    $name: String!
    $lastname: String!
    $email: String!
    $phone: String!
  ) {
    updateUserInfo(
      name: $name
      lastname: $lastname
      email: $email
      phone: $phone
    ) @client
  }
`
export const UPDATE_INVITATED_USER = gql`
  mutation(
    $email: String!
    $jobTitle: String
    $companyNumber: String!
    $userNumber: String!
    $subscriptionNumber: String!
  ) {
    updateUserEmail(email: $email) @client
    updateUserNumber(number: $userNumber) @client
    updateUserJobTitle(jobTitle: $jobTitle) @client
    updateSubscriptionNumber(number: $subscriptionNumber) @client
    updateCompanyNumber(number: $companyNumber) @client
  }
`
export const SEND_TEAM_MEMBER_INVITATION = gql`
  mutation(
    $email: String!
    $companyNumber: Int!
    $profile: String
    $jobTitle: String
  ) {
    userInvite(
      email: $email
      companyNumber: $companyNumber
      profile: $profile
      jobTitle: $jobTitle
    ) {
      user {
        email
      }
    }
  }
`

export const SEND_CSD_FILES = gql`
  mutation($companyNumber: Int!, $data: CompanyUploadDigitalCertificateInput!) {
    companyUploadDigitalCertificate(
      companyNumber: $companyNumber
      data: $data
    ) {
      digitalCertificate {
        certificateNumber
      }
    }
  }
`
export const UPDATE_TAX_CIEC = gql`
  mutation(
    $companyNumber: Int!
    $taxId: String!
    $ciec: String!
    $commercialName: String!
  ) {
    companyRetrieveExistingInvoicesFiles(
      companyNumber: $companyNumber
      data: { taxId: $taxId, ciec: $ciec, commercialName: $commercialName }
    ) {
      taxId
      ciecConfigurada
      ciecConfiguradaFecha
    }
  }
`

export const SEND_EMAIL_UPLOAD_CSD = gql`
  mutation($companyNumber: Int!) {
    companySendEmailToAttachCertificates(companyNumber: $companyNumber) {
      email
    }
  }
`

export const SEND_SOS_MAIL = gql`
  mutation requestUploadDigitalCertificate(
    $email: String!
    $companyNumber: Int!
  ) {
    userRequestUploadDigitalCertificate(
      data: { email: $email, companyNumber: $companyNumber }
    ) {
      email
    }
  }
`
export const UPLOAD_COMPANY_LOGO = gql`
  mutation($companyNumber: Int!, $data: CompanyUpdateInput!) {
    companyUpdateInfo(companyNumber: $companyNumber, data: $data) {
      updatedCompany {
        companyDocumentsLogo
        companyLogo: companyDocumentsLogo
        companyNumber
      }
    }
  }
`
export const UPDATE_COMPANY_CIEC = gql`
  mutation($companyNumber: Int!, $data: RetrieveExistingInvoicesFilesInput!) {
    companyRetrieveExistingInvoicesFiles(
      companyNumber: $companyNumber
      data: $data
    ) {
      taxId
      ciecConfigurada
    }
  }
`
// export const GET_INVOICE_PREVIEW = gql`
//   mutation($companyNumber: Int!) {
//     companyGetInvoiceDesignPreview(companyNumber: $companyNumber) {
//       file
//       fileType
//     }
//   }
// `

export const SET_NOTIFICATION_AS_READ = gql`
  mutation($notificationId: ID!, $companyNumber: Int!) {
    userCompanyNotificationsSetOneAsRead(
      notificationId: $notificationId
      companyNumber: $companyNumber
    ) {
      success
    }
  }
`
export const SET_ALL_NOTIFICATIONS_AS_READ = gql`
  mutation($companyNumber: Int!, $datetime: String!) {
    userCompanyNotificationsSetAllAsRead(
      companyNumber: $companyNumber
      datetime: $datetime
    ) {
      success
    }
  }
`

export const UPDATE_COMPANY_NUMBER = gql`
  mutation updateCompanyNumber($companyNumber: Int!) {
    updateCompanyNumber(companyNumber: $companyNumber) @client
  }
`
export const UPDATE_BRANCH_NUMBER = gql`
  mutation($branchNumber: Int!) {
    updateBranchNumber(branchNumber: $branchNumber) @client
  }
`

export const UPDATE_COMPANY_INFO = gql`
  mutation companyUpdateInfo($companyNumber: Int!, $data: CompanyUpdateInput!) {
    companyUpdateInfo(companyNumber: $companyNumber, data: $data) {
      updatedCompany {
        companyNumber
        legalName
        commercialName
        taxId
        companyLogo
        timeZone
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
`

export const CHANGE_TIME_PERIOD_PREFERENCE = gql`
  mutation($companyNumber: Int!, $data: UserCompanyPreferencesInput!) {
    userCompanyPreferencesUpdate(companyNumber: $companyNumber, data: $data) {
      userCompanyPreferences {
        salesSummaryDefaultView
        spendingSummaryDefaultView
      }
    }
  }
`
export const USER_UPDATE = gql`
  mutation($data: UpdateUserInput!) {
    userUpdate(data: $data) {
      userNumber
      email
      userCompleteName
      mobilePhone
      image
      firstName
      lastName
    }
  }
`
export const CLIENT_DEACTIVATE = gql`
  mutation CLIENT_DEACTIVATE($companyNumber: Int!, $clientId: ID!) {
    clientDeactivate(companyNumber: $companyNumber, clientId: $clientId) {
      clientId
      clientNumber
      companyNumber
      clientStatus
    }
  }
`
export const CLIENT_REACTIVATE = gql`
  mutation CLIENT_REACTIVATE($companyNumber: Int!, $clientId: ID!) {
    clientReactivate(companyNumber: $companyNumber, clientId: $clientId) {
      clientId
      clientNumber
      companyNumber
      clientStatus
    }
  }
`

export const CLIENT_DELETE = gql`
  mutation CLIENT_DELETE($companyNumber: Int!, $clientId: ID!) {
    clientDelete(companyNumber: $companyNumber, clientId: $clientId) {
      clientId
      clientNumber
      companyNumber
      clientStatus
    }
  }
`
export const CREATE_NEW_CLIENT = gql`
  mutation CREATE_NEW_CLIENT(
    $companyNumber: Int!
    $branchNumber: Int
    $data: ClientCreateInput!
  ) {
    clientCreate(
      companyNumber: $companyNumber
      branchNumber: $branchNumber
      data: $data
    ) {
      clientId
    }
    # clientCreate(
    #   companyNumber: 1913172
    #   branchNumber: 5131
    #   data: {
    #   taxId: "ROMP850718AQ0"
    #   businessName: "Leguaje Latino AC"
    #   commercialName: "Lenguaje Latino"
    #   countryCode: "MEX"
    #   address: {
    #     street: "Av Siempreviva"
    #     outsideNumber: "505"
    #     insideNumber: "S/N"
    #     neighborhood: "Buenavista"
    #     municipality: "Paseos del Lago 2"
    #     city: "Zumpango"
    #     state: "Estado de Mexico"
    #     country: "Mexico"
    #     countryCode: "MEX"
    #     postalCode: "55650"
    #     reference: "Cerca de Town Center"
    #   }
    # }
    # )
  }
`

export const UPDATE_CLIENT = gql`
  mutation UPDATE_CLIENT(
    $companyNumber: Int!
    $clientId: ID!
    $branchNumber: Int!
    $data: ClientUpdateInput!
  ) {
    clientUpdate(
      companyNumber: $companyNumber
      clientId: $clientId
      data: $data
    ) {
      clientId
      clientNumber
      countryCode
      gln
      lastActivity
      address {
        addressNumber
        fullAddress
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
      }
      taxId
      businessName
      commercialName
      status
      registeredDate
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
          # bankId
          bankCode
          name
          longName
          countryCode
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
      totalAccountsReceivableAmount(branchNumber: $branchNumber) {
        total
        currencyCode
      }
      totalSalesAmount {
        total
        currencyCode
      }
    }
  }
`

export const CLIENT_SEND_CSV_FILE_EMAIL = gql`
  mutation clientSendCSVFileEmail($companyNumber: Int!) {
    clientSendCSVFileEmail(companyNumber: $companyNumber) {
      companyNumber
      email
      message
      error
    }
  }
`

export const PENDING_ACTION_EXECUTE = gql`
  mutation pendingActionExecute(
    $companyNumber: Int!
    $pendingType: PendingTypeEnum!
    $action: String!
    $pendingItemIds: [String!]!
  ) {
    companyPendingActionExecute(
      data: {
        companyNumber: $companyNumber
        pendingType: $pendingType
        action: $action
        pendingItemIds: $pendingItemIds
      }
    ) {
      success
    }
  }
`

export const CREATE_NEW_CATEGORY = gql`
  mutation createCategory(
    $companyNumber: Int!
    $branchNumber: Int!
    $data: IncomeCategoryCreateInput!
  ) {
    incomeCategoryCreate(
      companyNumber: $companyNumber
      branchNumber: $branchNumber
      data: $data
    ) {
      incomeCategoryId
      name
    }
  }
`
export const DEACTIVATE_INCOME_CATEGORY = gql`
  mutation incomeCategoryDeactivate(
    $companyNumber: Int!
    $branchNumber: Int!
    $incomeCategoryId: ID!
  ) {
    incomeCategoryDeactivate(
      companyNumber: $companyNumber
      branchNumber: $branchNumber
      incomeCategoryId: $incomeCategoryId
    ) {
      status
    }
  }
`
export const REACTIVATE_INCOME_CATEGORY = gql`
  mutation incomeCategoryReactivate(
    $companyNumber: Int!
    $branchNumber: Int!
    $incomeCategoryId: ID!
  ) {
    incomeCategoryReactivate(
      companyNumber: $companyNumber
      branchNumber: $branchNumber
      incomeCategoryId: $incomeCategoryId
    ) {
      status
    }
  }
`
export const UPDATE_SALES_CATEGORY = gql`
  mutation updateCategory(
    $companyNumber: Int!
    $branchNumber: Int!
    $incomeCategoryId: ID!
    $data: IncomeCategoryUpdateInput!
  ) {
    incomeCategoryUpdate(
      companyNumber: $companyNumber
      branchNumber: $branchNumber
      incomeCategoryId: $incomeCategoryId
      data: $data
    ) {
      incomeCategoryId
      name
    }
  }
`
export const UPDATE_LOCAL_INCOME_CATEGORY = gql`
  mutation updateIncomeCategory($incomeCategoryId: String, $name: String) {
    updateIncomeCategory(incomeCategoryId: $incomeCategoryId, name: $name)
      @client
  }
`
export const LOCAL_UPDATE_PAYMENT_STATUS = gql`
  mutation updatePaymentStatus($incomePaymentStatus: IncomePaymentStatusEnum) {
    updatePaymentStatus(incomePaymentStatus: $incomePaymentStatus) @client
  }
`
export const LOCAL_ADD_PAYMENT = gql`
  mutation addPayment(
    $expectedDate: String!
    $expectedAmount: Float!
    $expectedReceivingMoneyAccountId: String!
    $accountDescription: String
  ) {
    addSalePayment(
      expectedDate: $expectedDate
      expectedAmount: $expectedAmount
      expectedReceivingMoneyAccountId: $expectedReceivingMoneyAccountId
      accountDescription: $accountDescription
    ) @client
  }
`
export const LOCAL_DELETE_PAYMENT = gql`
  mutation deletePayment($paymentId: String!) {
    deletePayment(paymentId: $paymentId) @client
  }
`
export const UPDATE_CREATED_SALE = gql`
  mutation updateCreatedSale(
    $saleId: String
    $branchNumber: Int
    $pdfFile: String
    $pdfUrl: String
  ) {
    updateCreatedSale(
      saleId: $saleId
      branchNumber: $branchNumber
      pdfFile: $pdfFile
      pdfUrl: $pdfUrl
    ) @client
  }
`
export const VALIDATE_SALE = gql`
  mutation validateSale(
    $companyNumber: Int!
    $branchNumber: Int!
    $data: SaleCreateInput
  ) {
    saleValidateInfoForInvoicing(
      companyNumber: $companyNumber
      branchNumber: $branchNumber
      data: $data
    ) {
      success
    }
  }
`
export const PREVIEW_SALE = gql`
  mutation saleInvoicePreviewCreate(
    $companyNumber: Int!
    $branchNumber: Int!
    $data: SaleCreateInput
  ) {
    saleInvoicePreviewCreate(
      companyNumber: $companyNumber
      branchNumber: $branchNumber
      data: $data
    ) {
      saleInvoicePreviewFile
    }
  }
`
export const CREATE_SALE = gql`
  mutation createSale(
    $companyNumber: Int!
    $branchNumber: Int!
    $data: SaleCreateInput
  ) {
    saleCreate(
      companyNumber: $companyNumber
      branchNumber: $branchNumber
      data: $data
    ) {
      sale {
        saleId
        branchNumber
      }
    }
  }
`
export const UPDATE_SALE = gql`
  mutation saleUpdate(
    $companyNumber: Int!
    $branchNumber: Int!
    $saleId: ID!
    $data: SaleUpdateInput
  ) {
    saleUpdate(
      companyNumber: $companyNumber
      branchNumber: $branchNumber
      saleId: $saleId
      data: $data
    ) {
      sale {
        saleId
        branchNumber
        status
      }
    }
  }
`
export const CREATE_INVOICE_SALE = gql`
  mutation createInvoiceSale(
    $saleId: ID!
    $companyNumber: Int!
    $branchNumber: Int!
  ) {
    saleInvoiceCreate(
      saleId: $saleId
      companyNumber: $companyNumber
      branchNumber: $branchNumber
    ) {
      sale {
        client {
          clientId
          usoCfdi
          expectedPaymentMethod
          expectedPaymentMethodDescription
          contacts {
            email
          }
        }
      }
    }
  }
`
export const RESET_SAT_KEY_CONCEPT = gql`
  mutation resetSatKey {
    resetSatKey @client
  }
`
export const RESET_UNIT = gql`
  mutation resetUnit {
    resetUnit @client
  }
`
export const RESET_SALE = gql`
  mutation resetSale {
    resetSale @client
  }
`
export const SEND_INVOICE_BY_EMAIL = gql`
  mutation saleInvoiceSendByEmail(
    $saleId: ID!
    $email: String
    $companyNumber: Int!
    $branchNumber: Int!
  ) {
    saleInvoiceSendByEmail(
      saleId: $saleId
      email: $email
      companyNumber: $companyNumber
      branchNumber: $branchNumber
    ) {
      success
    }
  }
`
