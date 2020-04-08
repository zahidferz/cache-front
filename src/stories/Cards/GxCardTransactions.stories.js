import { storiesOf } from '@storybook/vue'
import GxCardTransactions from '@components/_Core/Cards/GxCardTransactions.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Cards/GxCardTransactions', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Example Sales/Expenses',
    () => ({
      components: {
        GxCardTransactions,
      },
      template: `
      <div class="w-full">
        <GxCardTransactions amount=150 sales class="mb-4"/>
        <GxCardTransactions amount=150 />
      </div>
      `,
      propsDescription: {
        GxCardTransactions: {
          sales: `Boolean property, indicates if the card has Sales styles such as blue color and title set as "Ventas"
            or red color for expenses with title "Gastos", color and title will be set automatically.`,
          amount: `Number, is the amount shown in the card between "$" symbol and currency.`,
          currency: `MXN as default, rececives any other value as string.`,
          timePeriod: `Sets the tiny menu option if it has a preselected preference. Default should be current month.`,
          startDate: `Initial date`,
          endDate: `Final date`,
        },
      },
    }),
    {
      info: {
        summary: `
        *GxCardTransactions* is a simple container with emphasis. It shows specific data such as an amount, the specified currency,
        \n a title related with the content: this title is set automatically by the sales prop existence, and a menu to set a filter by time.
        `,
      },
    }
  )
  .add(
    'Sales',
    () => ({
      components: {
        GxCardTransactions,
      },
      template: `
        <GxCardTransactions amount=150.00 sales/>
      `,
      propsDescription: {
        GxCardTransactions: {
          sales: `Boolean property, indicates if the card has Sales styles such as blue color and title set as "Ventas"
            or red color for expenses with title "Gastos", color and title will be set automatically.`,
          amount: `Number, is the amount shown in the card between "$" symbol and currency.`,
          currency: `MXN as default, rececives any other value as string.`,
          timePeriod: `Sets the tiny menu option if it has a preselected preference. Default should be current month.`,
          startDate: `Initial date`,
          endDate: `Final date`,
        },
      },
    }),
    {
      info: {
        summary: `
        *GxCardTransactions* is a simple container with emphasis. It shows specific data such as an amount, the specified currency,
        \n a title related with the content: this title is set automatically by the sales prop existence, and a menu to set a filter by time.
        `,
      },
    }
  )
  .add(
    'Expenses',
    () => ({
      components: {
        GxCardTransactions,
      },
      template: `
        <GxCardTransactions amount=130.00 />
      `,
      propsDescription: {
        GxCardTransactions: {
          sales: `Boolean property, indicates if the card has Sales styles such as blue color and title set as "Ventas"
            or red color for expenses with title "Gastos", color and title will be set automatically.`,
          amount: `Number, is the amount shown in the card between "$" symbol and currency.`,
          currency: `MXN as default, rececives any other value as string.`,
          timePeriod: `Sets the tiny menu option if it has a preselected preference. Default should be current month.`,
          startDate: `Initial date`,
          endDate: `Final date`,
        },
      },
    }),
    {
      info: {
        summary: `
        *GxCardTransactions* is a simple container with emphasis. It shows specific data such as an amount, the specified currency,
        \n a title related with the content: this title is set automatically by the sales prop existence, and a menu to set a filter by time.
        `,
      },
    }
  )
