import { storiesOf } from '@storybook/vue'
import GxCardImageAndLabel from '../../components/_Core/Cards/GxCardImageAndLabel.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Cards/GxCardImageAndLabel', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Example',
    () => ({
      data() {
        return {
          image: require('@src/assets/images/Signup/CompanyInfo/GiroComercial/businessImages/MO_001_3_comercio.svg'),
          alt: 'Example',
          title: 'Title',
        }
      },
      methods: {
        businessSelected(msg) {
          alert(msg)
        },
      },
      components: {
        GxCardImageAndLabel,
      },
      template: `
      <GxCardImageAndLabel
      :image="image"
      :alt="alt"
      :label="title"
      @click="businessSelected(title)"
    />
      `,
      propsDescription: {
        GxCardHorizontal: {
          image:
            'String. Source or location from the image to show in this card.',
          alt: 'String used as alternative text for the image.',
          label: 'Header',
        },
      },
    }),
    {
      info: {
        summary: `
        <b>GxCardImageAndLabel</b> is a simple container to display related content with emphasis. \n
        _Used only for mobile version._ \n This card shows an image and a Label horizontally aligned.
        `,
      },
    }
  )
  .add(
    'List',
    () => ({
      data() {
        return {
          options: [
            {
              image: require('@src/assets/images/Signup/CompanyInfo/GiroComercial/businessImages/MO_001_3_comercio.svg'),
              alt: 'Example',
              title: 'Title 1',
            },
            {
              image: require('@src/assets/images/Signup/CompanyInfo/GiroComercial/businessImages/MO_001_3_servicios.svg'),
              alt: 'Example',
              title: 'Title 2',
            },
          ],
        }
      },
      methods: {
        businessSelected(msg) {
          alert(msg)
        },
      },
      components: {
        GxCardImageAndLabel,
      },
      template: `
      <div class="w-full">
      <GxCardImageAndLabel
      v-for="(option, index) in options"
      :key="index"
      :image="option.image"
      :alt="option.alt"
      :label="option.title"
      :class="{'mb-4': index !== options.length-1}"
      @click="businessSelected(title)"
    />
    </div>
      `,
      propsDescription: {
        GxCardHorizontal: {
          image:
            'String. Source or location from the image to show in this card.',
          alt: 'String used as alternative text for the image.',
          label: 'Header',
        },
      },
    }),
    {
      info: {
        summary: `
        <b>GxCardImageAndLabel</b> is a simple container to display related content with emphasis. \n
        _Used only for mobile version._ \n This card shows an image and a Label horizontally aligned.
        `,
      },
    }
  )
