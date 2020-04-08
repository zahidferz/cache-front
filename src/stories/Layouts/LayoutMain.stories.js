import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import Layout from '@src/router/layouts/LayoutMain.vue'
import StoryRouter from 'storybook-vue-router'
import GxButton from '../../components/_Core/globals/Buttons/GxButton.vue'
import GxTextLink from '../../components/_Core/globals/Buttons/GxTextLink.vue'
import './layoutStories.css'

storiesOf('Layouts/LayoutMain', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .add(
    'default mobile',
    () => ({
      components: {
        Layout,
        GxButton,
        GxTextLink,
      },
      data() {
        return {
          image: require('@src/assets/images/Login/mo_002_01_guru.svg'),
        }
      },
      methods: {
        clicked() {
          alert('Button clicked')
        },
      },
      template: `
        <div id="app" class="text-black gx-body gx-body-sm bg-white" style="height: 100%">
          <Layout icon="keyboard_backspace" title="Elige el estatus de la empresa">
            <div class="flex-grow flex flex-col">
              <div class="overflow-x-hidden flex justify-center gxGuruContainer">
                <img
                  :src="image"
                  alt="Gurú adivinador"
                />
              </div>
              <div class="p-4 flex-grow flex flex-col">
                <h1 class="gx-h3 text-primary text-center mb-4">Título muy cool</h1>
                <div class="flex flex-col items-center mb-8">
                  <p class="font-bold mb-4">Lorem ipsum dolor sit amet, consectetur</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem lacus, placerat sit amet auctor et, fermentum quis dui. Donec luctus dapibus purus ut volutpat. Curabitur urna nulla, pretium eget turpis nec, sagittis ultrices augue. Nullam congue neque id elit ornare.</p>
                </div>
                <div class="flex-grow flex flex-col items-center mb-8">
                  <GxButton @click="clicked">Button</GxButton>
                  <GxTextLink>Acción Secundaria</GxTextLink>
                </div>
                <p class="gx-caption mx-auto text-center">Te decimos como cuidamos tu información <GxTextLink
                class="text-center"
                :to="{ name: 'login' }"
              >
                aquí
              </GxTextLink>.</p>
              </div>
            </div>
          </Layout>
        </div>
      `,
      propsDescription: {
        Layout: {
          title: 'String to show Topbar with title.',
          dark: 'Changes the colors to dark mode.',
          icon:
            'This is the name of the icon to display at the top left corner.',
          iconRight:
            'This is the name of the icon to display at the top rigth corner.',
        },
      },
    }),
    {
      info: {
        summary: `The Main Layout has options to render a topbar with left and right icons, as well as a title.

        Shadow will be added to the TopBar Bottom when scrolling.

        Default functionallity of goBack and goForward is added for icons.
          `,
      },
    }
  )
  .add(
    'with topbar',
    () => ({
      components: {
        Layout,
      },
      data() {
        return {
          image: require('@src/assets/images/Signup/TaxInfo/mo_success.svg'),
        }
      },
      template: `
        <div id="app" class="text-black gx-body gx-body-sm bg-white" style="height: 100%">
          <Layout icon="keyboard_backspace" title="This is the layout's title" icon-right="close">
            <img :src="image" alt="Completed form image" />
            <div class="p-4">
              <p class="mb-4">View me in a mobile screen.</p>
              <p>Top bar gets a shadow when the user scrolls</p>
              <p class="mb-4">The default padding is not added to the Layout component, since child elements such as full-width images need to extend all the way to the edges.</p>
              <p class="mb-4">The default padding can be added via the child components.</p>
            </div>
          </Layout>
        </div>
      `,
    }),
    {
      info: {
        summary: `
          The Main Layout has options to render a topbar with left and right icons, as well as a title.
        `,
      },
    }
  )
  .add(
    'dark',
    () => ({
      components: {
        Layout,
      },
      data() {
        return {
          image: require('@src/assets/images/Signup/TaxInfo/mo_success.svg'),
        }
      },
      template: `
        <div id="app" class="text-black gx-body gx-body-sm bg-white" style="height: 100%">
          <Layout dark>
            <img :src="image" alt="Completed form image" />
            <div class="p-4 text-white">
              <p class="mb-4">View me in a mobile screen.</p>
              <p class="mb-4">The default padding is not added to the Layout component, since child elements such as full-width images need to extend all the way to the edges.</p>
              <p class="mb-4">The default padding can be added via the child components.</p>
            </div>
          </Layout>
        </div>
      `,
    }),
    {
      info: {
        summary:
          'The Main Layout has options to render a topbar with left and right icons, as well as a title.',
      },
    }
  )
  .add(
    'dark with topbar',
    () => ({
      components: {
        Layout,
      },
      data() {
        return {
          image: require('@src/assets/images/Signup/TaxInfo/mo_success.svg'),
        }
      },
      template: `
        <div id="app" class="text-black gx-body gx-body-sm bg-white" style="height: 100%">
          <Layout dark icon="keyboard_backspace" title="This is the layout's title" icon-right="close">
            <img :src="image" alt="Completed form image" />
            <div class="p-4 text-white">
              <p class="mb-4">View me in a mobile screen.</p>
              <p>Top bar gets a shadow when the user scrolls</p>
              <p class="mb-4">The default padding is not added to the Layout component, since child elements such as full-width images need to extend all the way to the edges.</p>
              <p class="mb-4">The default padding can be added via the child components.</p>
              <p class="mb-4">View me in a mobile screen.</p>
              <p>Top bar gets a shadow when the user scrolls</p>
              <p class="mb-4">The default padding is not added to the Layout component, since child elements such as full-width images need to extend all the way to the edges.</p>
              <p class="mb-4">The default padding can be added via the child components.</p>
              <p class="mb-4">View me in a mobile screen.</p>
              <p>Top bar gets a shadow when the user scrolls</p>
              <p class="mb-4">The default padding is not added to the Layout component, since child elements such as full-width images need to extend all the way to the edges.</p>
              <p class="mb-4">The default padding can be added via the child components.</p>
            </div>
          </Layout>
        </div>
      `,
    }),
    {
      info: {
        summary:
          'The Main Layout has options to render a topbar with left and right icons, as well as a title.',
      },
    }
  )
  .add(
    'dark with search',
    () => ({
      components: {
        Layout,
      },
      data() {
        return {
          image: require('@src/assets/images/Signup/TaxInfo/mo_success.svg'),
        }
      },
      template: `
        <div id="app" class="text-black gx-body gx-body-sm bg-white" style="height: 100%">
          <Layout dark has-search icon="keyboard_backspace" title="This is the layout's title" icon-right="close">
            <img :src="image" alt="Completed form image" />
            <div class="p-4 text-white">
              <p class="mb-4">View me in a mobile screen.</p>
              <p>Top bar gets a shadow when the user scrolls</p>
              <p class="mb-4">The default padding is not added to the Layout component, since child elements such as full-width images need to extend all the way to the edges.</p>
              <p class="mb-4">The default padding can be added via the child components.</p>
            </div>
          </Layout>
        </div>
      `,
    }),
    {
      info: {
        summary: `
          Enable a topbar search passing the *has-search* prop. This will override the right icon with a search icon that displays an input fill on click.\n
          The topbar search results are provided to children living under the layout component.\n
          We use Linus Borg's <a href="https://github.com/LinusBorg/vue-reactive-provide" target="_blank">Vue Reactive Provide</a>,
          Vue's core contributor, to inject reactive data.\n
          To retrieve the search data in a child component, add * inject: ['topBarSearch']*, and access the data like so: *this.topBarSearch.search*
        `,
      },
    }
  )
  .add(
    'dark with drawer',
    () => ({
      components: {
        Layout,
      },
      data() {
        return {
          image: require('@src/assets/images/Signup/TaxInfo/mo_success.svg'),
        }
      },
      template: `
        <div id="app" class="text-black gx-body gx-body-sm bg-white" style="height: 100%">
          <Layout dark has-drawer title="Layout with drawer">
            <img :src="image" alt="Completed form image" />
            <div class="p-4 text-white">
              <p class="mb-4">View me in a mobile screen.</p>
              <p>Top bar gets a shadow when the user scrolls</p>
              <p class="mb-4">The default padding is not added to the Layout component, since child elements such as full-width images need to extend all the way to the edges.</p>
              <p class="mb-4">The default padding can be added via the child components.</p>
            </div>
          </Layout>
        </div>
      `,
    }),
    {
      info: {
        summary: `
          Enable the left drawer by passing the *has-drawer* prop. This will override the left icon with a menu icon that opens the left drawer.\n
          The topbar search results are provided to children living under the layout component.\n
          We use Linus Borg's <a href="https://github.com/LinusBorg/vue-reactive-provide" target="_blank">Vue Reactive Provide</a>,
          Vue's core contributor, to inject reactive data.\n
        `,
      },
    }
  )
  .add(
    'default mobile dark',
    () => ({
      components: {
        Layout,
        GxButton,
        GxTextLink,
      },
      data() {
        return {
          image: require('@src/assets/images/Login/mo_002_01_guru.svg'),
        }
      },
      methods: {
        clicked() {
          alert('Button clicked')
        },
      },
      template: `
        <div id="app" class="text-black gx-body gx-body-sm bg-white" style="height: 100%">
          <Layout dark icon="keyboard_backspace" title="Elige el estatus de la empresa">
            <div class="flex-grow flex flex-col text-white">
              <div class="overflow-x-hidden flex justify-center gxGuruContainer">
                <img
                  :src="image"
                  alt="Gurú adivinador"
                />
              </div>
              <div class="p-4 flex-grow flex flex-col">
                <h1 class="gx-h3 text-primary text-center mb-4">Título muy cool</h1>
                <div class="flex flex-col items-center mb-8">
                  <p class="font-bold mb-4">Lorem ipsum dolor sit amet, consectetur</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem lacus, placerat sit amet auctor et, fermentum quis dui. Donec luctus dapibus purus ut volutpat. Curabitur urna nulla, pretium eget turpis nec, sagittis ultrices augue. Nullam congue neque id elit ornare.</p>
                </div>
                <div class="flex-grow flex flex-col items-center mb-8">
                  <GxButton dark @click="clicked">Button</GxButton>
                  <GxTextLink >Acción Secundaria</GxTextLink>
                </div>
                <p class="gx-caption mx-auto text-center">Te decimos como cuidamos tu información <GxTextLink
                class="text-center"
                :to="{ name: 'login' }"
              >
                aquí
              </GxTextLink>.</p>
              </div>
            </div>
          </Layout>
        </div>
      `,
      propsDescription: {
        Layout: {
          title: 'String to show Topbar with title.',
          dark: 'Changes the colors to dark mode.',
          icon:
            'This is the name of the icon to display at the top left corner.',
          iconRight:
            'This is the name of the icon to display at the top rigth corner.',
        },
      },
    }),
    {
      info: {
        summary: `The Main Layout has options to render a topbar with left and right icons, as well as a title.

        Shadow will be added to the TopBar Bottom when scrolling.

        Default functionallity of goBack and goForward is added for icons.
          `,
      },
    }
  )
