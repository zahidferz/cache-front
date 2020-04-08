import { storiesOf } from '@storybook/vue'
import GxCardImageOnly from '@components/_Core/Cards/GxCardImageOnly.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Cards/GxCardImageOnly', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'default',
    () => ({
      data() {
        return {
          image: require('@src/assets/images/Storybook/bancoexample.png'),
        }
      },
      components: {
        GxCardImageOnly,
      },
      template: `<GxCardImageOnly key="icono1" :image="image" alt="bank" class="mr-8" />`,
      propsDescription: {
        GxCardImageOnly: {
          image: 'Image with full height and width and elevation.',
          alt: 'String used as alternative text for the image.',
        },
      },
    }),
    {
      info: {
        summary: `This card is usually used to show an image with heigth and width at 100%.`,
      },
    }
  )
  .add(
    'Example',
    () => ({
      data() {
        return {
          image: require('@src/assets/images/Storybook/bancoexample.png'),
        }
      },
      components: {
        GxCardImageOnly,
      },
      template: `
      <div class="bg-white px-8 pt-8 flex justify-between flex-wrap">
        <GxCardImageOnly :image="image" alt="bank" class="mr-2"/>
        <GxCardImageOnly :image="image" alt="bank" class="mr-2"/>
        <GxCardImageOnly :image="image" alt="bank" class="mr-2"/>
        <GxCardImageOnly :image="image" alt="bank" class="mr-2"/>
      </div>`,
      propsDescription: {
        GxCardImageOnly: {
          image: 'Image with full height and width and elevation.',
          alt: 'String used as alternative text for the image.',
        },
      },
    }),
    {
      info: {
        summary: `This card is usually used to show an image with heigth and width at 100%.`,
      },
    }
  )
