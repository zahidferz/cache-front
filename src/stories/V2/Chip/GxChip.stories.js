import { storiesOf } from '@storybook/vue'
// import GxChip2 from '../../../components/_Core/V2/Chip/GxChip2.vue' // Now a global
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('V2/Chip/GxChip2', module)
  .addDecorator(withInfo)
  .add('default', () => ({
    components: {
      // GxChip2,
    },
    template: `
      <div class="w-full flex flex-col de:flex-row">
        <div class="w-full px-4">
          <h2>Chip</h2>
          <GxChip2 left-icon="calendar_today">A chip</GxChip2>
          <GxChip2 left-icon="face">A chip</GxChip2>
          <GxChip2 left-icon="lock">A chip</GxChip2>
        </div>
      </div>
      `,
  }))
