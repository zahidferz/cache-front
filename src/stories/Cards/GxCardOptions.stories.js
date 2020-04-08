import { storiesOf } from '@storybook/vue'
import GxCardOptions from '../../components/_Core/Cards/GxCardOptions.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Cards/GxCardOptions', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'One Option',
    () => ({
      data() {
        return {
          image: require('@src/assets/images/Signup/CompanyInfo/GiroComercial/businessImages/MO_001_3_comercio.svg'),
          alt: 'Example',
          label: 'Title',
          subtitle: 'Subtitle',
        }
      },
      methods: {
        optionSelected(msg) {
          alert(msg)
        },
      },
      components: {
        GxCardOptions,
      },
      template: `
      <GxCardOptions
      :image="image"
      :alt="alt"
      :label="label"
      :subtitle="subtitle"
      @click="optionSelected(label)"
    />
      `,
      propsDescription: {
        GxCardHorizontal: {
          image:
            'String. Source or location from the image to show in this card.',
          alt: 'String used as alternative text for the image.',
          label: 'Header',
          subtitle: 'Subtitle. Text Body',
        },
      },
    }),
    {
      info: {
        summary: `
        <b>GxCardOptions</b> is a simple container to display related content with emphasis. \n
      This card shows an image, header and a text body (aligned to the left).
        `,
      },
    }
  )
  .add(
    'List of Options',
    () => ({
      data() {
        return {
          image: require('@src/assets/images/Signup/CompanyInfo/GiroComercial/businessImages/MO_001_3_comercio.svg'),
          alt: 'Example',
          label: 'Title',
          subtitle: 'Subtitle',
          image2: require('@src/assets/images/Signup/CompanyInfo/GiroComercial/businessImages/MO_001_3_comercio.svg'),
          alt2: 'Example',
          label2: 'Title',
          subtitle2: 'Subtitle',
        }
      },
      methods: {
        optionSelected(msg) {
          alert(msg)
        },
      },
      components: {
        GxCardOptions,
      },
      template: `
      <div class="w-full flex flex-col items-center justify-center">
      <GxCardOptions
      :image="image"
      :alt="alt"
      :label="label"
      :subtitle="subtitle"
      class="mb-4"
      @click="optionSelected(label)"
    />
    <GxCardOptions
      :image="image2"
      :alt="alt2"
      :label="label2"
      :subtitle="subtitle2"
      @click="optionSelected(label2)"
    />
    </div>
      `,
      propsDescription: {
        GxCardHorizontal: {
          image:
            'String. Source or location from the image to show in this card.',
          alt: 'String used as alternative text for the image.',
          label: 'Header',
          subtitle: 'Subtitle. Text Body',
        },
      },
    }),
    {
      info: {
        summary: `
        <b>GxCardOptions</b> is a simple container to display related content with emphasis. \n
      This card shows an image, header and a text body (aligned to the left).
        `,
      },
    }
  )
