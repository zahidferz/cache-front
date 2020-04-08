import { storiesOf } from '@storybook/vue'
import GxInputPercentage from '../../components/_Core/Forms/GxInputPercentage.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Forms/GxInputPercentage', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'example',
    () => ({
      components: {
        GxInputPercentage,
      },
      data() {
        return {
          inputValue: null,
          amount: 100,
          total: 200,
        }
      },
      template: `
      <GxInputPercentage
                v-model.number="inputValue"
                :total="total"
                :amount="amount"
                :error="false"
                class="mt-4 mr-2  de:mr-4 flex-grow"
              />
      `,
      propsDescription: {
        GxInputPercentage: {
          value: 'Value of the input',
          total: 'Total amount to calculate the percentage',
        },
      },
    }),
    {
      info: {
        summary: `
            Automatically focus this input 300ms after mounting.\n
            For comparison, all inputs are shown inside a container with the standard horizontal
            padding of 1rem.\n
            All input validations have a 300ms delay (debounced) after the last keypress.\n
            No vertical padding is provided, but should be given according to context of use.\n
            All inputs come with a standard margin bottom of 0.5rems.\n
            The dark variant is to be used as the single input inside a form over a dark background.
          `,
      },
    }
  )
  .add(
    'error',
    () => ({
      components: {
        GxInputPercentage,
      },
      data() {
        return {
          inputValue: null,
          amount: 100,
          total: 200,
        }
      },
      template: `
      <GxInputPercentage
                v-model.number="inputValue"
                :total="total"
                :amount="amount"
                :error="true"
                class="mt-4 mr-2  de:mr-4 flex-grow"
              />
      `,
      propsDescription: {
        GxInputPercentage: {
          value: 'Value of the input',
          total: 'Total amount to calculate the percentage',
        },
      },
    }),
    {
      info: {
        summary: `
            Automatically focus this input 300ms after mounting.\n
            For comparison, all inputs are shown inside a container with the standard horizontal
            padding of 1rem.\n
            All input validations have a 300ms delay (debounced) after the last keypress.\n
            No vertical padding is provided, but should be given according to context of use.\n
            All inputs come with a standard margin bottom of 0.5rems.\n
            The dark variant is to be used as the single input inside a form over a dark background.
          `,
      },
    }
  )
