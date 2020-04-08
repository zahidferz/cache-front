import { storiesOf } from '@storybook/vue'
import GxListItemResolvedTodo from '../../components/_Core/Lists/GxListItemResolvedTodo.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Lists/GxListItemResolvedTodo', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'default',
    () => ({
      components: {
        GxListItemResolvedTodo,
      },
      template: `
        <GxListItemResolvedTodo />
      `,
      propsDescription: {
        GxBulletList: {
          inputs: 'Array with list item values.',
        },
      },
    }),
    {
      info: {
        summary: `
          GxBulletList vertically display a bullet-list of labels contained in *inputs* prop.
        `,
      },
    }
  )
