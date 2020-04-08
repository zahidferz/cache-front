import { storiesOf } from '@storybook/vue'
import GxCardAccountsPayableReceivable from '@components/_Core/Cards/GxCardAccountsPayableReceivable.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Cards/GxCardAccountsPayableReceivable', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Example Payable/Receivable',
    () => ({
      data() {
        return {
          payable: {
            referenceDate: '1563839999999',
            currency: 'MXN',
            total: 2568.4,
            totalDue: 3000.1,
            totalDueOnReferenceDate: 5000.3,
            totalUndue: 65000.05,
          },
          receivable: {
            referenceDate: '1563839999999',
            currency: 'MXN',
            total: 100000.45,
            totalDue: 0,
            totalDueOnReferenceDate: 5000.3,
            totalUndue: 65000.05,
          },
          receivableEmpty: {
            referenceDate: '1563839999999',
            currency: 'MXN',
            total: 10000000000000000000.45,
            totalDue: 0,
            totalDueOnReferenceDate: 0,
            totalUndue: 0,
          },
          payableEmpty: {
            referenceDate: '1563839999999',
            currency: 'MXN',
            total: 100000.45,
            totalDue: 0,
            totalDueOnReferenceDate: 0,
            totalUndue: 0,
          },
        }
      },
      components: {
        GxCardAccountsPayableReceivable,
      },
      template: `
      <div class="w-full">
        <GxCardAccountsPayableReceivable payable class="mb-4" :accounts="payable"/>
        <GxCardAccountsPayableReceivable  :accounts="receivable" class="mb-4"/>
        <GxCardAccountsPayableReceivable  :accounts="receivableEmpty" class="mb-4"/>
        <GxCardAccountsPayableReceivable payable :accounts="payableEmpty"/>
      </div>
      `,
      propsDescription: {
        GxCardAccountsPayableReceivable: {
          payable: `Boolean property, indicates if the card has Payable accounts info to set styles: color blue, title and values for due, undue and due today, will be set automatically. \n
          If this property is not set default values are set to automatically take this card to display
          AccountsReceivable info and styles.`,
          accounts: `Object containing all the info to display. Object example:
          accountsObject: {
            referenceDate: '1563839999999',
            currency: 'MXN',
            total: 100000.45,
            totalDue: 0,
            totalDueOnReferenceDate: 5000.3,
            totalUndue: 65000.05,
          }
          `,
        },
      },
    }),
    {
      info: {
        summary: `
        *GxCardAccountsPayableReceivable* is a simple container with emphasis. It shows specific data from payable and receivable accounts such as the total amount, the specified currency,
        a title related with the content: this title is set automatically, horizontal bar divided by due, undue and due today percentage.
        To display an account you just have to pass an object with the following structure:
\n
            accountsObject: {
            referenceDate: '1563839999999',
            currency: 'MXN',
            total: 100000.45,
            totalDue: 0,
            totalDueOnReferenceDate: 5000.3,
            totalUndue: 65000.05,
            }


        `,
      },
    }
  )
  .add(
    'Payable',
    () => ({
      data() {
        return {
          payable: {
            referenceDate: '1563839999999',
            currency: 'MXN',
            total: 2568.4,
            totalDue: 3000.1,
            totalDueOnReferenceDate: 5000.3,
            totalUndue: 65000.05,
          },
        }
      },
      components: {
        GxCardAccountsPayableReceivable,
      },
      template: `
        <GxCardAccountsPayableReceivable payable class="mb-4" :accounts="payable"/>
      `,
      propsDescription: {
        GxCardAccountsPayableReceivable: {
          payable: `Boolean property, indicates if the card has Payable accounts info to set styles: color blue, title and values for due, undue and due today, will be set automatically. \n
          If this property is not set default values are set to automatically take this card to display
          AccountsReceivable info and styles.`,
          accounts: `Object containing all the info to display. Object example:
          accountsObject: {
            referenceDate: '1563839999999',
            currency: 'MXN',
            total: 100000.45,
            totalDue: 0,
            totalDueOnReferenceDate: 5000.3,
            totalUndue: 65000.05,
          }
          `,
        },
      },
    }),
    {
      info: {
        summary: `
        *GxCardAccountsPayableReceivable* is a simple container with emphasis. It shows specific data from payable and receivable accounts such as the total amount, the specified currency,
        a title related with the content: this title is set automatically, horizontal bar divided by due, undue and due today percentage.
        To display an account you just have to pass an object with the following structure:
\n
            accountsObject: {
            referenceDate: '1563839999999',
            currency: 'MXN',
            total: 100000.45,
            totalDue: 0,
            totalDueOnReferenceDate: 5000.3,
            totalUndue: 65000.05,
            }
        `,
      },
    }
  )
  .add(
    'Receivable',
    () => ({
      data() {
        return {
          receivable: {
            referenceDate: '1563839999999',
            currency: 'MXN',
            total: 2568.4,
            totalDue: 3000.1,
            totalDueOnReferenceDate: 5000.3,
            totalUndue: 65000.05,
          },
        }
      },
      components: {
        GxCardAccountsPayableReceivable,
      },
      template: `
        <GxCardAccountsPayableReceivable :accounts="receivable"/>
      `,
      propsDescription: {
        GxCardAccountsPayableReceivable: {
          payable: `Boolean property, indicates if the card has Payable accounts info to set styles: color blue, title and values for due, undue and due today, will be set automatically. \n
          If this property is not set default values are set to automatically take this card to display
          AccountsReceivable info and styles.`,
          accounts: `Object containing all the info to display. Object example:
          accountsObject: {
            referenceDate: '1563839999999',
            currency: 'MXN',
            total: 100000.45,
            totalDue: 0,
            totalDueOnReferenceDate: 5000.3,
            totalUndue: 65000.05,
          }
          `,
        },
      },
    }),
    {
      info: {
        summary: `
        *GxCardAccountsPayableReceivable* is a simple container with emphasis. It shows specific data from payable and receivable accounts such as the total amount, the specified currency,
        a title related with the content: this title is set automatically, horizontal bar divided by due, undue and due today percentage.
        To display an account you just have to pass an object with the following structure:
\n
            accountsObject: {
            referenceDate: '1563839999999',
            currency: 'MXN',
            total: 100000.45,
            totalDue: 0,
            totalDueOnReferenceDate: 5000.3,
            totalUndue: 65000.05,
            }
        `,
      },
    }
  )
  .add(
    'Payable Empty',
    () => ({
      data() {
        return {
          payable: {
            referenceDate: '1563839999999',
            currency: 'MXN',
            total: 0,
            totalDue: 0,
            totalDueOnReferenceDate: 0,
            totalUndue: 0,
          },
        }
      },
      components: {
        GxCardAccountsPayableReceivable,
      },
      template: `
        <GxCardAccountsPayableReceivable payable class="mb-4" :accounts="payable"/>
      `,
      propsDescription: {
        GxCardAccountsPayableReceivable: {
          payable: `Boolean property, indicates if the card has Payable accounts info to set styles: color blue, title and values for due, undue and due today, will be set automatically. \n
          If this property is not set default values are set to automatically take this card to display
          AccountsReceivable info and styles.`,
          accounts: `Object containing all the info to display. Object example:
          accountsObject: {
            referenceDate: '1563839999999',
            currency: 'MXN',
            total: 100000.45,
            totalDue: 0,
            totalDueOnReferenceDate: 5000.3,
            totalUndue: 65000.05,
          }
          `,
        },
      },
    }),
    {
      info: {
        summary: `
        *GxCardAccountsPayableReceivable* is a simple container with emphasis. It shows specific data from payable and receivable accounts such as the total amount, the specified currency,
        a title related with the content: this title is set automatically, horizontal bar divided by due, undue and due today percentage.
        To display an account you just have to pass an object with the following structure:
\n
            accountsObject: {
            referenceDate: '1563839999999',
            currency: 'MXN',
            total: 100000.45,
            totalDue: 0,
            totalDueOnReferenceDate: 5000.3,
            totalUndue: 65000.05,
            }
        `,
      },
    }
  )
  .add(
    'Receivable Empty',
    () => ({
      data() {
        return {
          receivable: {
            referenceDate: '1563839999999',
            currency: 'MXN',
            total: 0,
            totalDue: 0,
            totalDueOnReferenceDate: 0,
            totalUndue: 0,
          },
        }
      },
      components: {
        GxCardAccountsPayableReceivable,
      },
      template: `
        <GxCardAccountsPayableReceivable :accounts="receivable"/>
      `,
      propsDescription: {
        GxCardAccountsPayableReceivable: {
          payable: `Boolean property, indicates if the card has Payable accounts info to set styles: color blue, title and values for due, undue and due today, will be set automatically. \n
          If this property is not set default values are set to automatically take this card to display
          AccountsReceivable info and styles.`,
          accounts: `Object containing all the info to display. Object example:
          accountsObject: {
            referenceDate: '1563839999999',
            currency: 'MXN',
            total: 100000.45,
            totalDue: 0,
            totalDueOnReferenceDate: 5000.3,
            totalUndue: 65000.05,
          }
          `,
        },
      },
    }),
    {
      info: {
        summary: `
        *GxCardAccountsPayableReceivable* is a simple container with emphasis. It shows specific data from payable and receivable accounts such as the total amount, the specified currency,
        a title related with the content: this title is set automatically, horizontal bar divided by due, undue and due today percentage.
        To display an account you just have to pass an object with the following structure:
\n
            accountsObject: {
            referenceDate: '1563839999999',
            currency: 'MXN',
            total: 100000.45,
            totalDue: 0,
            totalDueOnReferenceDate: 5000.3,
            totalUndue: 65000.05,
            }
        `,
      },
    }
  )
