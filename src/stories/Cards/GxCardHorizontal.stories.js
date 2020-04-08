import { storiesOf } from '@storybook/vue'
import GxCardHorizontal from '../../components/_Core/Cards/GxCardHorizontal.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Cards/GxCardHorizontal', module)
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
        handleClick() {
          alert('click')
        },
      },
      components: {
        GxCardHorizontal,
      },
      template: `
      <div>
          <GxCardHorizontal :card-img="image" alt="img" class="mb-4" text-body="This is my text-body" title="HEADLINE 3" @click="handleClick"/>
          <GxCardHorizontal  :actions="[{label: 'HELLO', method: 'handleClick'}, {label: 'Click', method: 'handleClick'}]" title="HEADLINE 3" class="mb-4" text-body="Greyhound divisively hello coldly
          wonderfully marginally far."/>
          <GxCardHorizontal :actions="[{label: 'HELLO', method: 'handleClick'}]" class="mb-4" text-body="This is my text-body" title="HEADLINE 3" />
      </div>
      `,
      propsDescription: {
        GxCardHorizontal: {
          hasActions: 'It displays buttons to the right side of the card',
          actionText:
            'Array that sets the text for the buttons. Default actions are set as 2 buttons with text BUTTON.',
          textBody: 'Displays the text inside this card',
          alt: 'String used as alternative text for the image.',
        },
      },
    }),
    {
      info: {
        summary: `
        <b>GxCardHorizontal</b> is a simple container to display related content with emphasis. \n
        In this case, the card contains an icon, a headline of 1.75rems and a text body displayed horizontally.\n
        An image can be added aligned to the right, passing the url or source of it through the prop cardImg.
        \n <b>Notice: </b> If the image is not a square, it won't be adjust to the card
        *GxCard* does not include margin so, GxCardHorizontal will be position according to the context.
        `,
      },
    }
  )

  .add(
    'With image',
    () => ({
      data() {
        return {
          image: require('@src/assets/images/Storybook/imagenCompleta.svg'),
        }
      },
      components: {
        GxCardHorizontal,
      },
      template: `
          <GxCardHorizontal :card-img="image" alt="img" text-body="This is my text-body"/>
      `,
      propsDescription: {
        GxCardHorizontal: {
          hasActions: 'It displays buttons to the right side of the card',
          actionText:
            'Array that sets the text for the buttons. Default actions are set as 2 buttons with text BUTTON.',
          cardImg:
            'Sets an image inside the card. This prop passes the source of it.',
          textBody: 'Displays the text inside this card',
          alt: 'String used as alternative text for the image.',
        },
      },
    }),
    {
      info: {
        summary: `
        Image can be added to the default element just passing the source through the prop *card-img*.
        \n <b>Notice: </b> If the image is not a square, it won't be adjust to the card.
        `,
      },
    }
  )
  .add(
    'Only ONE action',
    () => ({
      components: {
        GxCardHorizontal,
      },
      methods: {
        handleClick() {
          alert('click')
        },
      },
      template: `
          <GxCardHorizontal :actions="[{label: 'button', method: handleClick}]" text-body="This is my text-body. This is my text-body"/>
      `,
      propsDescription: {
        GxCardHorizontal: {
          actionText:
            'Array that sets the text for the buttons. Default actions are set as 2 buttons with text BUTTON.',
          cardImg:
            'Sets an image inside the card. This prop passes the source of it.',
          textBody: 'Displays the text inside this card',
          alt: 'String used as alternative text for the image.',
        },
      },
    }),
    {
      info: {
        summary: `
        When only one action is needed it will be placed automatically at the beggining of the card. \n
        This is done by default in GxCardHorizontal, so no attributes are required for this example
        `,
      },
    }
  )
  .add(
    'With TWO actions',
    () => ({
      data() {
        return {
          image: require('@src/assets/images/Storybook/imagenCompleta.svg'),
        }
      },
      components: {
        GxCardHorizontal,
      },
      methods: {
        handleClick() {
          alert('click')
        },
      },
      template: `
        <GxCardHorizontal :card-img="image" alt="img" :actions="[{label: 'HELLO', method: handleClick}, {label: 'Click', method: handleClick}]" text-body="This is my text-body"/>
      `,
      propsDescription: {
        GxCardHorizontal: {
          actionText:
            'Array that sets the text for the buttons. Default actions are set as 2 buttons with text BUTTON.',
          cardImg:
            'Recieves a variable where it has to be declared a "require" with the path to the image ',
          textBody: 'Displays the text inside this card',
          alt: 'String used as alternative text for the image.',
        },
      },
    }),
    {
      info: {
        summary: `
        \n <b>Notice: </b> If the image is not a square, it won't be adjust to the card.

        `,
      },
    }
  )
