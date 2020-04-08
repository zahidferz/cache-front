import { storiesOf } from '@storybook/vue'
import GxBulletList from '../../components/_Core/Lists/GxBulletList.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Lists/GxBulletList', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'default',
    () => ({
      components: {
        GxBulletList,
      },
      template: `
        <GxBulletList :inputs="[
          { label: 'Tripa'},
          { label: 'Cabeza'},
          { label: 'Pastor'},
          { label: 'Lengua'},
          { label: 'Ojo'},
          { label: 'Cachete'},
          {label:'Pescado'}
          ]" />
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
