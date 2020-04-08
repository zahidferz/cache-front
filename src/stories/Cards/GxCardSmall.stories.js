import { storiesOf } from '@storybook/vue'
import GxCardSmall from '@components/_Core/Cards/GxCardSmall.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Cards/GxCardSmall', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Example ALL',
    () => ({
      components: {
        GxCardSmall,
      },
      data() {
        return {
          image: require('@src/assets/images/Storybook/imagenCompleta.svg'),
        }
      },
      template: `
      <div>
          <GxCardSmall title="Title" body-text="99.99" class="mr-4" />
          <GxCardSmall
            title="Title"
            body-text="99.99"
            card-title="Card Title"
            :image="image"
          />
      </div>
      `,
      propsDescription: {
        GxCardSmall: {
          image:
            'A section is added to the bottom of the card adding a title (imageTitle) and the image.',
        },
      },
    }),
    {
      info: {
        summary: `
        Small card. Can contain Just a title and a text, if image is added a second text *img-title* is required.
        `,
      },
    }
  )
  .add(
    'Small card',
    () => ({
      components: {
        GxCardSmall,
      },
      template: `
      <div>
        <GxCardSmall title="Title" body-text="99.99"/>
      </div>
      `,
      propsDescription: {
        GxCardSmall: {
          image:
            'A section is added to the bottom of the card adding a title (imageTitle) and the image.',
        },
      },
    }),
    {
      info: {
        summary: `
        Small card with a title and a text.
        `,
      },
    }
  )
