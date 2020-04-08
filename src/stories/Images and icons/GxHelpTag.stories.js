import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import GxHelpTag from '../../components/_Core/Icons/GxHelpTag.vue'
import CenterDecorator from '../addons/CenterDecorator'

storiesOf('Icons/GxHelpTag', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'default',
    () => ({
      template: `
        <div>
          <GxHelpTag message="Greyhound divisively hello coldly wonderfully marginally far.Greyhound divisively hello coldly wonderfully."/>
        </div>
      `,
      components: {
        GxHelpTag,
      },
    }),
    {
      info: {
        summary: `
          El icono de ayuda puede estar junto a cualquier texto, al dar click se abrirá un modal que ocupará toda la pantalla, esto será para la versión mobile, para desk se abrirá un tooltip
        `,
      },
    }
  )
