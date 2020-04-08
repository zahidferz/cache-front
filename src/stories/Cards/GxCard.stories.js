import { storiesOf } from '@storybook/vue'
import GxCard from '../../components/_Core/Cards/GxCard.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Cards/GxCard', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Default',
    () => ({
      data() {
        return {
          image: require('@src/assets/images/Storybook/imagenCompleta.svg'),
        }
      },
      components: {
        GxCard,
      },
      methods: {
        myFunction() {
          alert('you clicked')
        },
      },
      template: `
      <div class="flex flex-col justify-center">
      <p class="mb-2">* This card has desktop version</p>
        <GxCard
        :chips="[
          {text:'bla', clickHandler: myFunction }, {text:'chip', clickHandler: myFunction, disabled:true }
        ]"
        :buttons="[
          {text:'continuar', clickHandler: myFunction}, {text:'regresar', clickHandler: myFunction},
         ]"
         caption="This is my caption"
         textBodyBold="This will be text body bold This will be text body bold"
         textBody="This will be text body This will be text body"
         headline="Card Title" subtitle="Subtitle"
         :card-img="image"
         alt="img"
         :tags="['tag1', 'tag2']"
         :inputs="[
              { label: 'Tripa', value: 'tripa'},
              { label: 'Cabeza', value: 'cabeza'},
              { label: 'Pastor', value: 'pastor'},
              {label:'Pescado',value:'pescado',disabled:true}
              ]"
      />
      </div>`,
      propsDescription: {
        GxCard: {
          tags: 'Recieves an array of tags in case of needed',
          chips:
            'Recieves an array of objects where you define text of the chip, function ("clickHandler") and disabled if needed',
          buttons:
            'Recieves an array of objects where you define the text of the button, and function ("clickHandler")',

          checkboxes: 'Recieves an array where you define label and id ',
          textBodyBod: 'creates a textBody bold before the textBody',
        },
      },
    }),
    {
      info: {
        summary: `
          GxCard is a more complex card in which you can use different props to add more elements:
         \n * Image
         \n * Header 5
         \n * Caption
         \n * Tags
         \n * Text body
         \n * Subtitle
         \n * Enable or disabled chips
         \n * Buttons
        \n Its horizontal size is defined by the image and the hight is defined by all the elements inside.
        `,
      },
    }
  )

  .add(
    'Example only some elements ',
    () => ({
      data() {
        return {
          image: require('@src/assets/images/Storybook/imagenCompleta.svg'),
        }
      },
      components: {
        GxCard,
      },
      methods: {
        myFunction() {
          alert('you clicked')
        },
      },
      template: `<GxCard :buttons="[{text:'button', clickHandler: myFunction}, {text:'button2', clickHandler: myFunction} ]" caption="This is my caption" textBody="This will be text body" headline="Card Title" :card-img="image" alt="img"/>`,
      propsDescription: {
        GxCard: {
          chips:
            'Recieves an array of objects where you define text of the chip, function ("clickHandler") and disabled if needed',
          buttons:
            'Recieves an array of objects where you define the text of the button, and function ("clickHandler")',
        },
      },
    }),
    {
      info: {
        summary: `
         Example GxCard.
         \n <b>Notice</b>: Elements will be collapsed if you don't add the props needed.
         \n In this example tags, buttons and chips were not wanted.
        `,
      },
    }
  )
  .add(
    'Example Desktop',
    () => ({
      components: {
        GxCard,
      },
      methods: {
        myFunction() {
          alert('you clicked')
        },
      },
      template: `<GxCard :buttons="[{text:'button', clickHandler: myFunction}]" textBody="This will be text body This will be text body This will be text body" headline="Card Title" :card-img="image" alt="img"/>`,
      propsDescription: {
        GxCard: {
          chips:
            'Recieves an array of objects where you define text of the chip, function ("clickHandler") and disabled if needed',
          buttons:
            'Recieves an array of objects where you define the text of the button, and function ("clickHandler")',
        },
      },
    }),
    {
      info: {
        summary: `
         Example GxCard.
         \n <b>Notice</b>: Elements will be collapsed if you don't add the props needed.
         \n In this example tags, buttons and chips were not wanted.
        `,
      },
    }
  )
