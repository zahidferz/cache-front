import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import CenterDecorator from '../addons/CenterDecorator'
import GxBottomNav from '../../components/_Core/Navigation/GxBottomNav.vue'

storiesOf('Navigation/GxBottomNav', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'GxBottomNav',
    () => ({
      components: {
        GxBottomNav,
      },
      template: `<GxBottomNav />`,
    }),
    {
      info: {
        summary: `
            GxBottomNav is hidden at or above 768px (sm breakpoint).\n
            Has a main action defined by a Fab button that is 1rem taller and 1rem wider than the default.\n
          `,
      },
    }
  )
