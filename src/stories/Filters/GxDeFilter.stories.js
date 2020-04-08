import { storiesOf } from '@storybook/vue'
import GxDeFiler from '../../components/_Core/Filters/GxDeFilter.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Filters/GxDeFiler', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add('default', () => ({
    components: {
      GxDeFiler,
    },
    data() {
      return {
        options: [
          {
            label: 'Coyoacán',
            value: 1,
          },
          {
            label: 'Reforma',
            value: 2,
          },
          {
            label: 'Del Valle',
            value: 3,
          },
        ],
      }
    },
    template: `<GxDeFiler :options="options" title="Sucursal"/>
  `,
    propsDescription: {
      GxDeFiler: {
        options: 'displays options for GxFilter',
        title: 'displays a label for GxFilter',
      },
    },
  }))
