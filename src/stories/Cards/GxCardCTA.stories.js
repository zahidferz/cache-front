import { storiesOf } from '@storybook/vue'
import GxCardCTA from '../../components/_Core/Cards/GxCardCTA.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Cards/GxCardCTA', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Default',
    () => ({
      components: {
        GxCardCTA,
      },
      template: `
      <div>
          <GxCardCTA class="mb-4" icon="credit_card" alt="img" title="AGREGA TU PRIMERA CUENTA" subtitle="De cheques, crédito u otras"/>
          <GxCardCTA icon="attach_money" alt="img" title="registra tu primer gasto" subtitle="Puedes migrar tu información"/>
          <div/>

          `,
    }),
    {
      info: {
        summary: `
        This is an example of how a call to action card will look like when the user has not registered a sale, an expense, or has not connected to a bank account.
        `,
      },
    }
  )
