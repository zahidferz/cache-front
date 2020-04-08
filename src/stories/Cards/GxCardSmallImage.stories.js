import { storiesOf } from '@storybook/vue'
import GxCardSmallImage from '@components/_Core/Cards/GxCardSmallImage.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Cards/GxCardSmallImage', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Example ALL',
    () => ({
      data() {
        return {
          image: require('@src/assets/images/Storybook/imagenCompleta.svg'),
        }
      },
      methods: {
        onclick() {
          alert('Clciked')
        },
      },
      components: {
        GxCardSmallImage,
      },
      template: `
      <div>
        <p class="mb-4">* This card has desktop version</p>
        <GxCardSmallImage
        title="Title Add"
          :image="image"
          alt="img"
          class="mr-4"
        />
        <GxCardSmallImage
          :icons="[{ name: 'favorite', method: onclick }, { name: 'search', method: onclick }, { name: 'share', method: onclick }]"
          :image="image"
          alt="img"
        />
      </div>
      `,
      propsDescription: {
        GxCardSmallImage: {
          image:
            'Image source required. Recieves a variable where it has to be declared a "require" with the path to the image ',
          icons: 'An array with the names of the icons to display',
        },
      },
    }),
    {
      info: {
        summary: `
        Small card with an image (required) at the top of the cars and text or icons displayed.
        \n <b>Notice: </b> If the image is not a square, it won't be adjust to the card.

        * Desktop:  Desktop version has text-primary-500 and 56 width.
        `,
      },
    }
  )
