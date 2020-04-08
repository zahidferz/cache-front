import Callback from '@components/Auth/Callback.vue'
import Logout from '@components/Auth/Logout.vue'
import Signup from '@views/Signup/Signup'
import SignupGeneralInfoView from '@views/Signup/GeneralInfo/SignupGeneralInfoView.vue'
import SignupNameView from '@views/Signup/GeneralInfo/SignupNameView'
import SignupLastnameView from '@views/Signup/GeneralInfo/SignupLastnameView'
import SignupMailView from '@views/Signup/GeneralInfo/SignupMailView'
import LoginView from '@views/Login/LoginView'
import SignupPhoneView from '@views/Signup/GeneralInfo/SignupPhoneView'
import SignupPasswordView from '@views/Signup/GeneralInfo/SignupPasswordView'
import SignupAccountConfirmationView from '@views/Signup/GeneralInfo/SignupAccountConfirmationView'
import SignupCompanyRoleForInvitationView from '@views/Signup/GeneralInfo/SignupCompanyRoleForInvitationView'
import SignupYoureInView from '@views/Signup/GeneralInfo/SignupYoureInView'
import SignupAccountConfirmedView from '@views/Signup/GeneralInfo/SignupAccountConfirmedView'
import SignupTaxView from '@views/Signup/TaxInfo/SignupTaxView.vue'
import SignupDownloadXmlsView from '@views/Signup/TaxInfo/SignupDownloadXmlsView'
import SignupTaxInfoView from '@views/Signup/TaxInfo/SignupTaxInfoView'
import SignupCompanyInfoView from '@views/Signup/CompanyInfo/SignupCompanyInfoView.vue'
import SignupCompanyRoleView from '@views/Signup/CompanyInfo/SignupCompanyRoleView'
import SignupTeamInvitationsView from '@views/Signup/CompanyInfo/SignupTeamInvitationsView'
import SignupAccountantInvitationView from '@views/Signup/CompanyInfo/SignupAccountantInvitationView'
import SignupCompanyBusinessView from '@views/Signup/CompanyInfo/SignupCompanyBusinessView'
import SignupOtherCompanyBusinessView from '@views/Signup/CompanyInfo/SignupOtherCompanyBusinessView'
import SignupTeamMemberCountView from '@views/Signup/CompanyInfo/SignupTeamMemberCountView'
import SignupBranchOfficesCountView from '@views/Signup/CompanyInfo/SignupBranchOfficesCountView'
import SignupSolvingMainProblemView from '@views/Signup/CompanyInfo/SignupSolvingMainProblemView'

export default [
  // {
  //   path: '/',
  //   redirect: {
  //     name: 'welcome',
  //   }
  // },
  {
    path: '/',
    name: 'welcome',
    component: () => lazyLoadView(import('@views/welcome')),
    beforeEnter(to, from, next) {
      if (to.query.callback) {
        next({ name: 'callback' })
        return
      }

      // If logged in, redirect to callback
      if (window.localStorage && window.localStorage.loggedIn) {
        next({ name: 'callback' })
        return
      }

      next()
    },
  },
  {
    path: '/web',
    name: 'web',
    redirect: {
      name: 'dashboard',
    },
    component: () => lazyLoadView(import('@views/web')),
    meta: {
      authRequired: true,
    },
    children: [
      {
        path: 'pendientes',
        name: 'todos',
        meta: {
          isSubmenu: true,
          icon: 'warning',
          title: 'Pendientes',
          statusBg: 'bg-alert',
        },
        component: () => lazyLoadView(import('@views/todos')),
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          isSubmenu: true,
          title: 'Dashboard',
          icon: 'dashboard',
          shortcuts: [
            // {
            //   rightIcon: 'receipt',
            //   label: 'Factura',
            //   leftIcon: 'add',
            //   to: { name: 'invoices' },
            // },
            // {
            //   rightIcon: 'attach_money',
            //   label: 'Cobro',
            //   leftIcon: 'add',
            //   to: { name: 'payments' },
            // },
            {
              rightIcon: 'local_offer',
              label: 'Venta',
              leftIcon: 'add',
              to: { name: 'newsalechooseclient' },
            },
          ],
        },
        component: () => lazyLoadView(import('@views/dashboard')),
      },
      {
        path: 'ventas',
        name: 'sales',
        redirect: { name: 'salesDashboard' },
        meta: {
          isSubmenu: true,
          icon: 'local_offer',
          title: 'Ventas',
          statusBg: 'bg-primary-500',
        },
        component: () => lazyLoadView(import('@views/Sales/SalesView')),
        children: [
          {
            path: ':saleId/detalle',
            name: 'saleDetail',
            // meta: {
            //   isSubmenu: false, // Should this route be shown as a link in the bottom menu for mobile
            //   shortcuts: [ // Options to show when clicking on a FAB
            //     {
            //       rightIcon: 'local_offer',
            //       label: 'Venta',
            //       leftIcon: 'add',
            //       to: { name: 'newsalechooseclient' },
            //     },
            //   ],
            // },
            component: () =>
              lazyLoadView(import('@views/Sales/SaleDetailView')),
          },
          {
            // Mobile only route
            path: ':saleId/enviar',
            name: 'saleDetailSendEmail',
            component: () =>
              lazyLoadView(import('@views/Sales/SaleDetailSendEmailView')),
          },
          {
            path: 'dashboard',
            name: 'salesDashboard',
            meta: {
              isSubmenu: false,
              shortcuts: [
                {
                  rightIcon: 'local_offer',
                  label: 'Venta',
                  leftIcon: 'add',
                  to: { name: 'newsalechooseclient' },
                },
              ],
            },
            component: () =>
              lazyLoadView(import('@views/Sales/SalesDashboardView')),
          },
          {
            path: 'misventas/descargar',
            name: 'mySalesDownload',
            meta: {
              isSubmenu: false,
            },
            component: () =>
              lazyLoadView(import('@views/Sales/MySalesDownloadMobileView')),
          },
          {
            path: 'misventas',
            name: 'mySales',
            meta: {
              isSubmenu: false,
              shortcuts: [
                {
                  rightIcon: 'local_offer',
                  label: 'Venta',
                  leftIcon: 'add',
                  to: { name: 'newsalechooseclient' },
                },
              ],
            },
            component: () => lazyLoadView(import('@views/Sales/MySalesView')),
          },
          {
            path: 'cliente',
            name: 'newsalechooseclient',
            meta: {
              isSubmenu: false,
            },
            component: () =>
              lazyLoadView(import('@views/Sales/NewSaleChooseClientView')),
          },
          {
            path: 'cliente/:clientId',
            name: 'newsalewithclient',
            meta: {
              isSubmenu: false,
            },
            component: () =>
              lazyLoadView(import('@views/Sales/NewSaleWithClientView')),
          },
          {
            path: 'concepto',
            name: 'saleconcept',
            meta: {
              isSubmenu: false,
            },
            component: () =>
              lazyLoadView(import('@views/Sales/NewSaleConceptView')),
          },
          {
            path: 'nuevo/concepto',
            name: 'newfrequentconcept',
            meta: {
              isSubmenu: false,
            },
            component: () =>
              lazyLoadView(import('@views/Sales/NewFrequentConceptView')),
          },
          {
            path: 'conceptofrecuente',
            name: 'choosefrequentconcept',
            meta: {
              isSubmenu: false,
            },
            component: () =>
              lazyLoadView(import('@views/Sales/NewSaleFrequentConceptView')),
          },
          {
            path: 'detalleconcepto/:id',
            name: 'conceptdetail',
            meta: {
              isSubmenu: false,
            },
            component: () =>
              lazyLoadView(import('@views/Sales/ConceptDetailView')),
          },
          {
            path: 'actualizarconcepto/:id',
            name: 'updateconcept',
            meta: {
              isSubmenu: false,
            },
            component: () =>
              lazyLoadView(import('@views/Sales/NewSaleUpdateConceptView')),
          },
          {
            path: 'clavesat',
            name: 'newsaleselectsatkey',
            meta: {
              isSubmenu: false,
            },
            component: () =>
              lazyLoadView(import('@views/Sales/NewSaleSelectSatKeyView')),
          },
          {
            path: 'unidad',
            name: 'selectunit',
            meta: {
              isSubmenu: false,
            },
            component: () =>
              lazyLoadView(import('@views/Sales/NewSaleSelectUnitView')),
          },
          {
            path: 'infoadicional',
            name: 'additionalinfo',
            meta: {
              isSubmenu: false,
            },
            component: () =>
              lazyLoadView(import('@views/Sales/AdditionalInfoView')),
          },
          {
            path: 'borrador',
            name: 'saleInvoiceDraft',
            meta: {
              isSubmenu: false,
            },
            component: () =>
              lazyLoadView(import('@views/Sales/InvoiceDraftView')),
          },
          {
            path: 'enviarfactura/:companyNumber/:saleId/:branchNumber',
            name: 'sendInvoice',
            meta: {
              isSubmenu: false,
            },
            component: () =>
              lazyLoadView(import('@views/Sales/SendInvoiceView')),
          },
          {
            path: 'clientes',
            redirect: { name: 'myclients' },
            meta: {
              isSubmenu: true,
              icon: 'contacts',
              title: 'Mis Clientes',
            },
            component: () => lazyLoadView(import('@views/Clients/ClientsView')),
            children: [
              // {
              //   path: 'analisis',
              //   name: 'analysis',
              //   meta: {
              //     isSubmenu: true,
              //     icon: 'pie_chart',
              //     title: 'Análisis',
              //   },
              //   component: () =>
              //     lazyLoadView(import('@views/Clients/ClientsAnalysisView')),
              // },
              {
                path: 'misclientes',
                name: 'myclients',
                meta: {
                  // Actually is a submenu but for development is clients/dashboard and has its own icon
                  // icon: 'contacts',
                  isSubmenu: false,
                  title: 'Mis clientes',
                  shortcuts: [
                    {
                      rightIcon: 'sentiment_satisfied_alt',
                      label: 'Cliente',
                      leftIcon: 'add',
                      to: { name: 'createnewclient' },
                    },
                  ],
                },
                component: () =>
                  lazyLoadView(import('@views/Clients/MyClientsView')),
              },
              {
                path: 'misclientes/:clientId',
                name: 'clientDetail',
                meta: {
                  isSubmenu: false,
                },
                component: () =>
                  lazyLoadView(
                    import('@views/Clients/ClientDetail/ClientInfoView')
                  ),
                redirect: 'clientgeneralinfo',
                children: [
                  {
                    path: 'info',
                    name: 'clientgeneralinfo',
                    component: () =>
                      lazyLoadView(
                        import('@views/Clients/ClientDetail/ClientGeneralInfoView')
                      ),
                  },
                  {
                    path: 'detalle',
                    name: 'clientData',
                    component: () =>
                      lazyLoadView(
                        import('@views/Clients/ClientDetail/ClientDetailView')
                      ),
                  },
                ],
              },
              {
                path: 'dashboard',
                name: 'clientsdashboard',
                meta: {
                  isSubmenu: false,
                  shortcuts: [
                    {
                      rightIcon: 'local_offer',
                      label: 'Venta',
                      leftIcon: 'add',
                      to: { name: 'sales' },
                    },
                    {
                      rightIcon: 'description',
                      label: 'Cotización',
                      leftIcon: 'add',
                      to: { name: '' },
                    },
                    {
                      rightIcon: 'shopping_cart',
                      label: 'Pedido',
                      leftIcon: 'add',
                      to: { name: 'clientsdashboard' },
                    },
                    {
                      rightIcon: 'attach_money',
                      label: 'Cobro',
                      leftIcon: 'add',
                      to: { name: 'payments' },
                    },
                    {
                      rightIcon: 'sentiment_satisfied_alt',
                      label: 'Cliente',
                      leftIcon: 'add',
                      to: { name: 'createnewclient' },
                    },
                  ],
                },
                component: () =>
                  lazyLoadView(import('@views/Clients/ClientsDashboardView')),
              },
              {
                path: 'nuevo',
                name: 'createnewclient',
                meta: {
                  isSubmenu: false,
                  father: 'clientsdashboard',
                },
                component: () =>
                  lazyLoadView(import('@views/Clients/CreateNewClientView')),
              },
            ],
          },
          // {
          //   path: 'cobros',
          //   name: 'payments',
          //   meta: {
          //     isSubmenu: true,
          //     icon: 'attach_money',
          //     title: 'Cobros',
          //   },
          //   component: () => lazyLoadView(import('@views/Sales/PaymentsView')),
          // },
          // {
          //   path: 'facturas',
          //   name: 'invoices',
          //   meta: {
          //     isSubmenu: true,
          //     icon: 'receipt',
          //     title: 'Facturas',
          //   },
          //   component: () => lazyLoadView(import('@views/Sales/InvoicesView')),
          // },
          {
            path: 'borrador',
            name: 'draft',
            meta: {
              isSubmenu: false,
            },
            component: () =>
              lazyLoadView(import('@views/Sales/InvoiceDraftView')),
          },
          {
            path: 'categorias',
            name: 'categories',
            component: () =>
              lazyLoadView(import('@views/Sales/SalesCategoriesView')),
          },
          {
            path: 'categorias/:categoryId',
            name: 'categoryDetail',
            component: () =>
              lazyLoadView(import('@views/Sales/SalesCategoryDetailView')),
          },
        ],
      },
      // End of menu buttton submenu options
      {
        path: 'notificaciones',
        name: 'notifications',
        component: () => lazyLoadView(import('@views/notifications')),
      },
      {
        name: 'initialtodos',
        path: 'pendientes',
        redirect: {
          name: 'uploadcompanylogo',
        },
        component: () =>
          lazyLoadView(
            import('@views/Signup/InitialTodos/InitialTodosView.vue')
          ),
        children: [
          {
            path: 'comosubircsdinfo',
            name: 'uploadcsdsummary',
            props: true,
            component: () =>
              lazyLoadView(
                import('@views/Signup/InitialTodos/UploadCSDSummaryView')
              ),
          },
          {
            path: 'comosubircsd',
            name: 'howtouploadcsd',
            props: true,
            component: () =>
              lazyLoadView(
                import('@views/Signup/InitialTodos/HowToUploadCSDView')
              ),
          },
          {
            path: 'subircsd',
            name: 'uploadcsd',
            props: true,
            component: () =>
              lazyLoadView(import('@views/Signup/InitialTodos/UploadCSDView')),
          },
          {
            path: 'enviarsos',
            name: 'sendsos',
            props: true,
            component: () =>
              lazyLoadView(import('@views/Signup/InitialTodos/SendSosView')),
          },
          {
            path: 'linkbank',
            name: 'linkbank',
            props: true,
            component: () =>
              lazyLoadView(import('@views/Signup/InitialTodos/LinkBankView')),
          },
          {
            path: 'choosebank',
            name: 'choosebank',
            props: true,
            component: () =>
              lazyLoadView(import('@views/Signup/InitialTodos/ChooseBankView')),
          },
          {
            path: 'bankform/:bank',
            name: 'bankform',
            props: true,
            component: () =>
              lazyLoadView(import('@views/Signup/InitialTodos/BankFormView')),
          },
        ],
      },
      {
        path: 'gastos',
        name: 'expenses',
        // redirect: {
        //   name: 'clients',
        // },
        component: () => lazyLoadView(import('@views/Expenses/ExpensesView')),
        children: [
          {
            path: 'primergasto',
            name: 'firstexpenses',
            component: () =>
              lazyLoadView(import('@views/Expenses/FirstExpensesView')),
          },
        ],
      },
      {
        path: 'saldosencuentas',
        name: 'accountBalance',
        component: () =>
          lazyLoadView(import('@views/AccountBalance/AccountBalanceView')),
        children: [
          {
            path: 'primeracuenta',
            name: 'firstaccount',
            component: () =>
              lazyLoadView(import('@views/AccountBalance/FirstAccountView')),
          },
        ],
      },
      {
        name: 'updatemyinfo',
        path: 'actualizarinfo',
        component: () =>
          lazyLoadView(import('@views/Dashboard/UpdateMyInfoView')),
      },
      {
        name: 'updatepassword',
        path: 'actualizarcontraseña',
        component: () =>
          lazyLoadView(import('@views/Dashboard/UpdatePasswordView')),
      },
      {
        name: 'uploadprofilephoto',
        path: 'actualizarfoto',
        component: () =>
          lazyLoadView(import('@views/Dashboard/UploadProfilePhotoView')),
      },
      {
        name: 'resizeprofilephoto',
        path: 'ajustarfoto',
        props: true,
        component: () =>
          lazyLoadView(import('@views/Dashboard/ResizeProfilePhotoView')),
      },
      {
        name: 'dashboarddownloadXmls',
        path: 'conectatealsat',
        component: () =>
          lazyLoadView(import('@views/Dashboard/DashboardDownloadXmlsView')),
      },
      {
        name: 'settings',
        path: 'configuracion',
        component: () => lazyLoadView(import('@views/Settings/Settings.vue')),
        redirect: {
          name: 'companysettings',
        },
        children: [
          {
            name: 'companysettings',
            path: 'empresa',
            component: () =>
              lazyLoadView(
                import('@views/Settings/CompanySettings/CompanySettings.vue')
              ),
            redirect: {
              name: 'uploadcompanylogo',
            },
            children: [
              {
                name: 'uploadcompanylogo',
                path: 'subirlogo',
                component: () =>
                  lazyLoadView(
                    import('@views/Settings/CompanySettings/UploadLogoView')
                  ),
              },
              {
                path: 'ajustarlogo',
                name: 'resizelogo',
                props: true,
                component: () =>
                  lazyLoadView(
                    import('@views/Settings/CompanySettings/ResizeLogoView')
                  ),
              },
              {
                path: 'previewfactura',
                name: 'invoicepreview',
                props: true,
                component: () =>
                  lazyLoadView(
                    import('@views/Settings/CompanySettings/InvoicePreviewView')
                  ),
              },
              {
                name: 'updatecompanyinfo',
                path: 'actualizarinfo',
                component: () =>
                  lazyLoadView(
                    import('@views/Settings/CompanySettings/UpdateCompanyInfoView')
                  ),
              },
              {
                path: 'ciec',
                name: 'satConnection',
                component: () =>
                  lazyLoadView(
                    import('@views/Settings/CompanySettings/SatConnectionView')
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'privacy',
    path: '/tecuidamos',
    redirect: {
      name: 'termsandconditions',
    },
    component: () => lazyLoadView(import('@views/PrivacyPolicy/Privacy')),
    children: [
      // {
      //   name: 'dataprotection',
      //   path: 'protecciondedatos',
      //   redirect: 'privacypolicy',
      //   component: () =>
      //     lazyLoadView(import('@views/PrivacyPolicy/DataProtectionView')),
      // },
      {
        name: 'termsandconditions',
        path: 'terminosycondiciones',
        component: () =>
          lazyLoadView(import('@views/PrivacyPolicy/TermsAndConditionsView')),
      },
      {
        name: 'privacypolicy',
        path: 'politicadeprivacidad',
        component: () =>
          lazyLoadView(import('@views/PrivacyPolicy/PrivacyPolicyView')),
      },
    ],
  },
  {
    path: '/cuentaverificada',
    name: 'cuentaverificada',
    component: SignupAccountConfirmedView,
    // component: () =>
    //   lazyLoadView(
    //     import('@views/Signup/GeneralInfo/SignupAccountConfirmedView')
    //   ),
  },
  {
    path: '/callback',
    name: 'callback',
    component: Callback,
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    // component: () => lazyLoadView(import('@views/Login/LoginView')),
    beforeEnter(to, from, next) {
      if (window.localStorage && window.localStorage.loggedIn) {
        next({ name: 'callback' })
        return
      }
      next()
    },
  },
  {
    path: '/mailrecuperar',
    name: 'passwordrecovery',
    component: () =>
      lazyLoadView(import('@views/Login/LoginPasswordRecoveryView')),
  },
  {
    path: '/mailrecuperareenviar',
    name: 'mailrecovery',
    component: () => lazyLoadView(import('@views/Login/LoginMailRecoveryView')),
  },
  {
    name: 'changepassword',
    path: '/cambiacontrasena',
    component: () =>
      lazyLoadView(import('@views/Login/LoginDefineNewPasswordView')),
  },

  {
    path: '/registro',
    name: 'signup',
    redirect: {
      name: 'generalinfo',
    },
    component: Signup,
    // component: () => lazyLoadView(import('@views/Signup/Signup')),
    beforeEnter(to, from, next) {
      if (from.name === 'dashboard') {
        next({ name: 'dashboard' })
        return
      }
      next()
    },
    children: [
      {
        name: 'generalinfo',
        path: 'infogeneral',
        redirect: {
          name: 'signupName',
        },
        component: SignupGeneralInfoView,
        // component: () =>
        //   lazyLoadView(
        //     import('@views/Signup/GeneralInfo/SignupGeneralInfoView.vue')
        //   ),
        children: [
          {
            path: 'nombre',
            name: 'signupName',
            component: SignupNameView,
            // component: () =>
            //   lazyLoadView(import('@views/Signup/GeneralInfo/SignupNameView')),
          },
          {
            path: 'apellidos',
            name: 'signupLastname',
            component: SignupLastnameView,
            // component: () =>
            //   lazyLoadView(
            //     import('@views/Signup/GeneralInfo/SignupLastnameView')
            //   ),
          },
          {
            path: 'correo',
            name: 'signupEmail',
            component: SignupMailView,
            // component: () =>
            //   lazyLoadView(import('@views/Signup/GeneralInfo/SignupMailView')),
          },
          {
            path: 'telefono',
            name: 'signupPhone',
            component: SignupPhoneView,
            // component: () =>
            //   lazyLoadView(import('@views/Signup/GeneralInfo/SignupPhoneView')),
          },
          {
            path: 'contrasena',
            name: 'signupPassword',
            component: SignupPasswordView,
            // component: () =>
            //   lazyLoadView(
            //     import('@views/Signup/GeneralInfo/SignupPasswordView')
            //   ),
          },
          {
            path: 'confirmacion',
            name: 'signupAccountConfirmation',
            component: SignupAccountConfirmationView,
            // Redirect to account confirmed until we implement SMS code confirmation
            redirect: {
              name: 'signupYourein',
            },
            // component: () =>
            //   lazyLoadView(
            //     import('@views/Signup/GeneralInfo/SignupAccountConfirmationView')
            //   ),
            meta: { authRequired: true },
          },
          {
            path: 'rol',
            name: 'companyRoleFromInvitation',
            component: SignupCompanyRoleForInvitationView,
            // component: () =>
            //   lazyLoadView(
            //     import('@views/Signup/GeneralInfo/SignupCompanyRoleForInvitationView')
            //   ),
            meta: { authRequired: true },
          },
          {
            path: 'exito',
            name: 'signupYourein',
            component: SignupYoureInView,
            // component: () =>
            //   lazyLoadView(
            //     import('@views/Signup/GeneralInfo/SignupYoureInView')
            //   ),
            meta: { authRequired: true },
          },
          {
            path: 'cuentaconfirmada',
            name: 'signupAccountConfirmed',
            component: SignupAccountConfirmedView,
            // component: () =>
            //   lazyLoadView(
            //     import('@views/Signup/GeneralInfo/SignupAccountConfirmedView')
            //   ),
          },
        ],
      },
      {
        name: 'taxInfo',
        path: 'infofiscal',
        redirect: {
          name: 'downloadxmls',
        },
        meta: { authRequired: true },
        component: SignupTaxView,
        // component: () =>
        //   lazyLoadView(import('@views/Signup/TaxInfo/SignupTaxView.vue')),
        children: [
          {
            path: 'descargaxmls',
            name: 'downloadxmls',
            component: SignupDownloadXmlsView,
            // component: () =>
            //   lazyLoadView(
            //     import('@views/Signup/TaxInfo/SignupDownloadXmlsView')
            //   ),
          },
          {
            path: 'formularioinfofiscal',
            name: 'taxinfoform',
            component: SignupTaxInfoView,
            // component: () =>
            //   lazyLoadView(import('@views/Signup/TaxInfo/SignupTaxInfoView')),
          },
        ],
      },
      {
        name: 'companyinfo',
        path: 'infodelaempresa',
        component: SignupCompanyInfoView,
        redirect: {
          name: 'companyrole',
        },
        meta: { authRequired: true },
        // component: () =>
        //   lazyLoadView(
        //     import('@views/Signup/CompanyInfo/SignupCompanyInfoView.vue')
        //   ),
        children: [
          {
            path: 'rol',
            name: 'companyrole',
            component: SignupCompanyRoleView,
            // component: () =>
            //   lazyLoadView(
            //     import('@views/Signup/CompanyInfo/SignupCompanyRoleView')
            //   ),
          },
          {
            path: 'invitaequipo',
            name: 'teamInvitations',
            component: SignupTeamInvitationsView,
            // component: () =>
            //   lazyLoadView(
            //     import('@views/Signup/CompanyInfo/SignupTeamInvitationsView')
            //   ),
          },
          {
            path: 'invitacontador',
            name: 'accountantInvitation',
            component: SignupAccountantInvitationView,
            // component: () =>
            //   lazyLoadView(
            //     import('@views/Signup/CompanyInfo/SignupAccountantInvitationView')
            //   ),
          },
          {
            path: 'girodelaempresa',
            name: 'companyBusiness',
            component: SignupCompanyBusinessView,
            // component: () =>
            //   lazyLoadView(
            //     import('@views/Signup/CompanyInfo/SignupCompanyBusinessView')
            //   ),
          },
          {
            path: 'otrogiro',
            name: 'otherBusiness',
            component: SignupOtherCompanyBusinessView,
            // component: () =>
            //   lazyLoadView(
            //     import('@views/Signup/CompanyInfo/SignupOtherCompanyBusinessView')
            //   ),
          },
          {
            path: 'conteodemiembros',
            name: 'teamMemberCount',
            component: SignupTeamMemberCountView,
            meta: { authRequired: true },
            // component: () =>
            //   lazyLoadView(
            //     import('@views/Signup/CompanyInfo/SignupTeamMemberCountView')
            //   ),
          },
          {
            path: 'conteosucursales',
            name: 'branchOfficesCount',
            component: SignupBranchOfficesCountView,
            // component: () =>
            //   lazyLoadView(
            //     import('@views/Signup/CompanyInfo/SignupBranchOfficesCountView')
            //   ),
          },
          {
            path: 'problemaprincipal',
            name: 'solvingProblem',
            component: SignupSolvingMainProblemView,
            // component: () =>
            //   lazyLoadView(
            //     import('@views/Signup/CompanyInfo/SignupSolvingMainProblemView')
            //   ),
          },
        ],
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: require('@views/_404').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },
]

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require('@views/_loading').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require('@views/_timeout').default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    },
  })
}
