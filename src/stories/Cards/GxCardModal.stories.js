import { storiesOf } from '@storybook/vue'
import GxCardModal from '../../components/_Core/Cards/GxCardModal.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'
import GxButton from '@components/_Core/globals/Buttons/GxButton'

storiesOf('Cards/GxCardModal', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Default',
    () => ({
      data() {
        return {
          image: this.$utils.alertImages.retencion_de_usuario,
        }
      },
      components: {
        GxCardModal,
        GxButton,
      },
      template: `
        <GxCardModal
             class="text-center"
             headline="You're in baby!"
             label="You're in baby!"
             text-body="Nos encanta tenerte aquí. Ahora cuéntanos de la mejor empresa del mundo: ¡La tuya!"
             :card-img="image"
        ></GxCardModal>
     `,
      propsDescription: {
        GxCardModal: {
          cardImg:
            'Recieves a variable where it has to be declared a "require" with the path to the image ',
          headline:
            'Recieves an string wich will be positioned as a title with classes gx-h3 and text-secondary-200',
          subtitle: 'String to add a subtitle after the headline',
          chips:
            'Recieves an array of objects where you define text of the chip, function ("clickHandler") and disabled if needed',
          linkTo:
            'This link will be added at the end of the textBody to redirect the user somewhere. e.g, to give more information ',
          alt: 'String used as alternative text for the image.',
          textBody: 'Parragraph added after headline',
          tags: 'Array of strings',
          caption: 'Add a caption after the headline',
        },
      },
    }),
    {
      info: {
        summary: `
        Ideally GxCardModal only uses an <b> image, headline and a body </b>. In case of needed you can use different props to add more elements such as:
         \n * Caption
         \n * Tags
         \n * Subtitle
         \n * Enable or disabled chips
         \n * Buttons
        \n Its horizontal size is defined by the image and the hight is defined by all the elements inside.
        \n Background color will change from white (for mobile) to bg-primary-2 (for desk), automatically.
        `,
      },
    }
  )
  .add(
    'With Buttons',
    () => ({
      data() {
        return {
          image: this.$utils.alertImages.retencion_de_usuario,
          alt: 'Example image',
          skipStep: true,
        }
      },
      methods: {
        buttonClicked(msg) {
          alert(msg)
        },
      },
      components: {
        GxCardModal,
        // GxButton,
      },
      template: `
      <GxCardModal
        v-if="skipStep"
        headline="¿Seguro que quieres salir?"
        text-body="Podrás integrar a tu equipo cuando lo necesites, pero ahora es
              el mejor momento."
        :card-img="image"
        :alt="alt"
      >
        <template v-slot:actions>
          <div class="flex self-end de:mt-8">
            <GxButton
              :ghost="$mq === 'de'"
              :plain="$mq === 'mo'"
              class="text-alert de:text-white mr-4 de:border-white"
              @click="buttonClicked('Salir')"
              >salir</GxButton
            >
            <GxButton
              :dark="$mq === 'de'"
              :plain="$mq === 'mo'"
              @click="buttonClicked('Continuar')"
              >continuar</GxButton
            >
          </div>
        </template>
      </GxCardModal>
     `,
      propsDescription: {
        GxCardModal: {
          cardImg:
            'Recieves a variable where it has to be declared a "require" with the path to the image ',
          headline:
            'Recieves an string wich will be positioned as a title with classes gx-h3 and text-secondary-200',
          subtitle: 'String to add a subtitle after the headline',
          chips:
            'Recieves an array of objects where you define text of the chip, function ("clickHandler") and disabled if needed',
          linkTo:
            'This link will be added at the end of the textBody to redirect the user somewhere. e.g, to give more information ',
          alt: 'String used as alternative text for the image.',
          textBody: 'Parragraph added after headline',
          tags: 'Array of strings',
          caption: 'Add a caption after the headline',
        },
      },
    }),
    {
      info: {
        summary: `
      Can add buttons as content in a slot 'actions'.
        `,
      },
    }
  )
  .add(
    'loading',
    () => ({
      data() {
        return {
          image: this.$utils.alertImages.retencion_de_usuario,
          alt: 'Example image',
          loading: false,
        }
      },
      methods: {
        buttonClicked(msg) {
          alert(msg)
        },
        clickHandler() {
          this.loading = !this.loading
        },
      },
      components: {
        GxCardModal,
        GxButton,
      },
      template: `
      <div @click="clickHandler">
        <GxCardModal
          headline="¿Seguro que quieres hacerlo después?"
          label="¿Seguro que quieres hacerlo después?"
          text-body="Podrás integrar a tu equipo cuando, lo necesites, pero ahora es
                  el mejor momento."
          :card-img="image"
          :alt="image"
          :loading="loading"
        >
          <template v-slot:actions>
            <div class="flex self-end de:mt-8">
              <GxButton
                plain
                class="text-alert mr-4"
                lable="closeModal"
                @click="buttonClicked('SALIR')"
                >salir</GxButton
              >
              <GxButton plain lable="doItLater" @click="buttonClicked('CONTINUAR')"
                >continuar</GxButton
              >
            </div>
          </template>
        </GxCardModal>
      </div>
     `,
      propsDescription: {
        GxCardModal: {
          cardImg:
            'Recieves a variable where it has to be declared a "require" with the path to the image ',
          headline:
            'Recieves an string wich will be positioned as a title with classes gx-h3 and text-secondary-200',
          subtitle: 'String to add a subtitle after the headline',
          chips:
            'Recieves an array of objects where you define text of the chip, function ("clickHandler") and disabled if needed',
          linkTo:
            'This link will be added at the end of the textBody to redirect the user somewhere. e.g, to give more information ',
          alt: 'String used as alternative text for the image.',
          textBody: 'Parragraph added after headline',
          tags: 'Array of strings',
          caption: 'Add a caption after the headline',
        },
      },
    }),
    {
      info: {
        summary: `
          Click to start and end loading state.
        `,
      },
    }
  )
