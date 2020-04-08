import { storiesOf } from '@storybook/vue'
import GxCardBill from '../../components/_Core/Cards/GxCardBill.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Cards/GxCardBill', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Default',
    () => ({
      data() {
        return {
          image: require('@src/assets/images/Storybook/bancoexample.png'),
          accountNumber: 554496,
        }
      },
      components: {
        GxCardBill,
      },
      methods: {
        handleClick() {
          alert('click')
        },
      },
      template: `
           <GxCardBill :card-img="image" alt="img" class="mb-4" :account-number="accountNumber" amount="95,750.62" accountType="Crédito" @click="handleClick"/>`,
    }),
    {
      info: {
        summary: `
        `,
      },
    }
  )
