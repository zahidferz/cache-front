import { storiesOf } from '@storybook/vue'
import GxButtonCircle from '../../components/_Core/globals/Buttons/GxButtonCircle.vue' // Now a global
import GxInput from '../../components/_Core/Forms/GxInput.vue'
import GxCardSmallImage from '../../components/_Core/Cards/GxCardSmallImage.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Buttons/GxButtonCircle', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'default',
    () => ({
      components: {
        GxButtonCircle,
      },
      methods: {
        onClick() {
          alert('Clicked')
        },
      },
      template: `
        <div class="flex justify-around p-2 w-full">
          <GxButtonCircle icon="share" label="share" @click="onClick"/>
          <GxButtonCircle icon="favorite" label="favorite" @click="onClick" />
          <GxButtonCircle icon="search" label="search" @click="onClick" />
        </div>
      `,
      propsDescription: {
        GxButtonCircle: {
          icon: 'Icon Name',
        },
      },
    }),
    {
      info: {
        summary: `*GxButtonCircle* is a simple rounded button with an icon. It can trigger an action and accepts the prop *icon* with the name of the icon.\n
          To change the color of the icon tailwind classes can be set for each icon.
          Icon will have __font-size of 1.125rems__ by default.`,
      },
    }
  )
  .add(
    'dark',
    () => ({
      components: {
        GxButtonCircle,
      },
      methods: {
        onClick() {
          alert('Clicked')
        },
      },
      template: `
        <div class="flex justify-around p-2 bg-primary w-full">
          <GxButtonCircle dark icon="share" label="share" @click="onClick"/>
          <GxButtonCircle dark icon="favorite" label="favorite" @click="onClick"/>
          <GxButtonCircle dark icon="search" label="search" @click="onClick"/>
        </div>
      `,
      propsDescription: {
        GxButtonCircle: {
          icon: 'Icon Name',
        },
      },
    }),
    {
      info: {
        summary: `dark is used to change background color so it can be used over a dark background`,
      },
    }
  )
  .add(
    'transparent',
    () => ({
      components: {
        GxButtonCircle,
      },
      methods: {
        onClick() {
          alert('Clicked')
        },
      },
      template: `
        <div class="flex justify-around p-2 w-full">
          <GxButtonCircle transparent icon="share" label="" @click="onClick"/>
          <GxButtonCircle transparent icon="favorite" label="" @click="onClick"/>
          <GxButtonCircle transparent icon="search" label="" @click="onClick"/>
        </div>
      `,
      propsDescription: {
        GxButtonCircle: {
          icon: 'Icon Name',
        },
      },
    }),
    {
      info: {
        summary: `transparent is used to add an action when icon is clicked inside a card`,
      },
    }
  )
  .add(
    'disabled',
    () => ({
      components: {
        GxButtonCircle,
      },
      methods: {
        onClick(iconName) {
          alert(`Clicked ${iconName}`)
        },
      },
      data() {
        return {
          validTaxId: '',
        }
      },
      template: `
      <div class="flex justify-around p-2 w-full">
          <GxButtonCircle disabled icon="share" label="share" @click="onClick"/>
          <GxButtonCircle disabled icon="favorite" label="favorite" @click="onClick" />
          <GxButtonCircle disabled icon="search" label="search" @click="onClick" />
        </div>
      `,
      propsDescription: {
        GxButtonCircle: {
          icon: 'Icon Name',
        },
      },
    }),
    {
      info: {
        summary: 'Icon changes its color according state.',
      },
    }
  )
  .add(
    'Example transparent',
    () => ({
      components: {
        GxButtonCircle,
        GxCardSmallImage,
      },
      data() {
        return {
          image: require('@src/assets/images/Signup/TaxInfo/mo_success.svg'),
        }
      },
      methods: {
        onClick(iconName) {
          alert(`Clicked ${iconName}`)
        },
      },
      template: `
      <GxCardSmallImage
    :icons="[{ name: 'favorite', method: onclick }, { name: 'search', method: onclick }, { name: 'share', method: onclick }]"
    :image="image"
    alt="img"
  />
      `,
      propsDescription: {
        GxButtonCircle: {
          icons: 'Array of icons to show',
          image: 'string of the url or location to display image',
          alt: 'alternative text for the image',
        },
      },
    }),
    {
      info: {
        summary:
          'GxCardSmallImage use *GxButtonCircle transparent* to display a group of icons.',
      },
    }
  )
  .add(
    'Example default',
    () => ({
      components: {
        GxButtonCircle,
        GxInput,
      },
      methods: {
        onClick(iconName) {
          alert(`Clicked ${iconName}`)
        },
      },
      data() {
        return {
          validTaxId: '',
        }
      },
      template: `
      <div class="w-full flex">
      <GxInput v-model="validTaxId" placeholder="Tax ID input" label="Tax ID input" icon="account_circle" pattern="taxId" />
        <div class="ml-2">
          <GxButtonCircle icon="arrow_forward" label="arrow_forward" @click="onClick('favorite')" />
        </div>
      </div>
      `,
      propsDescription: {
        GxButtonCircle: {
          icon: 'Icon Name',
        },
      },
    }),
    {
      info: {
        summary: 'Icon changes its color according state.',
      },
    }
  )
  .add(
    'Example dark',
    () => ({
      components: {
        GxButtonCircle,
        GxInput,
      },
      methods: {
        onClick(iconName) {
          alert(`Clicked ${iconName}`)
        },
      },
      data() {
        return {
          validTaxId: '',
        }
      },
      template: `
      <div class="w-full flex p-4 bg-primary">
        <GxInput dark v-model="validTaxId" placeholder="Tax ID input" label="Tax ID input" icon="account_circle" pattern="taxId" />
        <div class="ml-2">
          <GxButtonCircle dark icon="arrow_forward" label="arrow_forward" @click="onClick('favorite')" />
        </div>
      </div>
      `,
      propsDescription: {
        GxButtonCircle: {
          icon: 'Icon Name',
        },
      },
    }),
    {
      info: {
        summary: 'Icon changes its color according state.',
      },
    }
  )
  .add(
    'Example disabled',
    () => ({
      components: {
        GxButtonCircle,
        GxInput,
      },
      methods: {
        onClick(iconName) {
          alert(`Clicked ${iconName}`)
        },
      },
      data() {
        return {
          validTaxId: '',
        }
      },
      template: `
      <div class="w-full flex p-4 bg-primary">
        <GxInput dark v-model="validTaxId" placeholder="Tax ID input" label="Tax ID input" icon="account_circle" pattern="taxId" />
        <div class="ml-2">
          <GxButtonCircle dark disabled icon="arrow_forward" label="arrow_forward" @click="onClick('favorite')" />
        </div>
      </div>
      `,
      propsDescription: {
        GxButtonCircle: {
          icon: 'Icon Name',
        },
      },
    }),
    {
      info: {
        summary: 'Icon changes its color according state.',
      },
    }
  )
