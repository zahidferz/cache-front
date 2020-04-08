import { storiesOf } from '@storybook/vue'
import GxFab from '../../components/_Core/globals/Buttons/GxFab.vue' // Now a global
import GxInput from '@components/_Core/Forms/GxInput.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Buttons/GxFab', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'default',
    () => ({
      components: {
        GxFab,
      },
      methods: {
        fabClicked() {
          alert('Fab clicked')
        },
      },
      template: '<GxFab @click="fabClicked" />',
    }),
    {
      info: {
        summary: `
          GxFab, or Floating Action Buttons, are used for quick and main actions in a given page.\n
          They tend to have a fixed position in the lower right corner of the page, and therefore have no default margin bottom like regular buttons do.\n
          *dark*, *dashed&* and *mini* options are available via boolean props of the same name.\n
        `,
      },
    }
  )
  .add(
    'dark',
    () => ({
      components: {
        GxFab,
      },
      methods: {
        fabClicked() {
          alert('Fab clicked')
        },
      },
      template: `
      <div class="bg-primary w-64 h-64 flex justify-center items-center">
        <GxFab dark @click="fabClicked" />
      </div>`,
    }),
    {
      info: {
        summary: `
          GxFab, or Floating Action Buttons, are used for quick and main actions in a given page.\n
          They tend to have a fixed position in the lower right corner of the page, and therefore have no default margin bottom like regular buttons do.\n
          *dark*, *dashed&* and *mini* options are available via boolean props of the same name.\n
        `,
      },
    }
  )
  .add(
    'mini',
    () => ({
      components: {
        GxFab,
      },
      methods: {
        fabClicked() {
          alert('Fab clicked')
        },
      },
      template: '<GxFab mini @click="fabClicked" />',
    }),
    {
      info: {
        summary: `
          GxFab, or Floating Action Buttons, are used for quick and main actions in a given page.\n
          They tend to have a fixed position in the lower right corner of the page, and therefore have no default margin bottom like regular buttons do.\n
          *dark*, *dashed&* and *mini* options are available via boolean props of the same name.\n
        `,
      },
    }
  )
  .add(
    'large',
    () => ({
      components: {
        GxFab,
      },
      methods: {
        fabClicked() {
          alert('Fab clicked')
        },
      },
      template: '<GxFab large @click="fabClicked" />',
    }),
    {
      info: {
        summary: `
          GxFab, or Floating Action Buttons, are used for quick and main actions in a given page.\n
          They tend to have a fixed position in the lower right corner of the page, and therefore have no default margin bottom like regular buttons do.\n
          *dark*, *dashed&* and *mini* options are available via boolean props of the same name.\n
        `,
      },
    }
  )
  .add(
    'dashed',
    () => ({
      components: {
        GxFab,
      },
      methods: {
        fabClicked() {
          alert('Fab clicked')
        },
      },
      template: '<GxFab dashed icon="add" @click="fabClicked" />',
    }),
    {
      info: {
        summary: `
          GxFab, or Floating Action Buttons, are used for quick and main actions in a given page.\n
          They tend to have a fixed position in the lower right corner of the page, and therefore have no default margin bottom like regular buttons do.\n
          *dark*, *dashed&* and *mini* options are available via boolean props of the same name.\n
        `,
      },
    }
  )
  .add(
    'mobile',
    () => ({
      components: {
        GxFab,
      },
      methods: {
        fabClicked() {
          alert('Fab clicked')
        },
      },
      template: `<GxFab mobile @click="fabClicked" /> `,
    }),
    {
      info: {
        summary: `
          GxFab, or Floating Action Buttons, are used for quick and main actions in a given page.\n
          They tend to have a fixed position in the lower right corner of the page, and therefore have no default margin bottom like regular buttons do.\n
          *dark*, *dashed&* and *mini* options are available via boolean props of the same name.\n
        `,
      },
    }
  )
  .add(
    'Example - White Background',
    () => ({
      components: {
        GxFab,
        GxInput,
      },
      data() {
        return {
          inputValue: '',
        }
      },
      methods: {
        fabClicked() {
          alert('Fab clicked')
        },
      },
      template: `
      <div class="w-42 h-64 p-4 shadow-3 flex flex-col">
      <p class="flex-grow">FAB RIGTH CORNER</p>
      <div class="self-end">
          <GxFab @click="fabClicked"/>
        </div>
      </div>`,
    }),
    {
      info: {
        summary: 'Example of a FAB Button used on a white background.',
      },
    }
  )
  .add(
    'Example - Dark Background ',
    () => ({
      components: {
        GxFab,
        GxInput,
      },
      data() {
        return {
          inputValue: '',
        }
      },
      methods: {
        fabClicked() {
          alert('Fab clicked')
        },
      },
      template: `
      <div class="w-42 h-64 p-4 shadow-3 flex flex-col bg-primary">
      <p class="flex-grow text-white">FAB RIGTH CORNER</p>
      <div class="self-end">
          <GxFab dark @click="fabClicked"/>
        </div>
      </div>`,
    }),
    {
      info: {
        summary: 'Example of a FAB Button used on a dark background.',
      },
    }
  )
