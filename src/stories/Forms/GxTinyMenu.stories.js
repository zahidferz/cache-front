import { storiesOf } from '@storybook/vue'
import GxTinyMenu from '../../components/_Core/Forms/GxTinyMenu.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Forms/GxTinyMenu', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Example ALL',
    () => ({
      data() {
        return {
          optionvalue: '',
        }
      },
      components: {
        GxTinyMenu,
      },
      template: `
      <GxTinyMenu :options="['Hoy', 'Semana', 'Mes']" v-model="optionvalue" initialValue="month"/>
      `,
      propsDescription: {
        GxTinyMenu: {
          cardImg:
            'Image source required.Recieves a variable where it has to be declared a "require" with the path to the image',
          icon: 'Name of the icon to display.',
          title: 'Text will be displayed as a headline.',
          bodyText: 'Body will be displayed after de headline.',
          overline: 'small text or indication',
          captionText: 'Name or label for the action related to the icon',
        },
      },
    }),
    {
      info: {
        summary: `
        Small card with an image (required) at the top of the card and a section to place an overline text, a title, a body and icon.
        \n <b>Notice: </b> If the image is not a square, it won't be adjust to the card.
        `,
      },
    }
  )
