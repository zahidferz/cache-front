import { storiesOf } from '@storybook/vue'
// import GxTextLink from '../../components/_Core/Buttons/GxTextLink.vue' // Now a global
import CenterDecorator from '../addons/CenterDecorator'
import StoryRouter from 'storybook-vue-router'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('TextLink/TextLink', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .addDecorator(StoryRouter())
  .add(
    'Example ALL',
    () => ({
      components: {
        // GxTextLink,
      },
      methods: {
        clicked() {
          alert('link clicked')
        },
      },
      template: `
      <div >
      <GxTextLink
      class="text-center mb-4 text-secondary"
      @click="showSkipCerAlert = !showSkipCerAlert"
      >Hacerlo después</GxTextLink
    >
<p>Protegemos tu información. <GxTextLink :to="{ name: 'privacypolicy' }">Conoce cómo.</GxTextLink></p>
    </div>

      `,
      propsDescription: {
        GxButton: {
          to:
            'Passing the *to* prop with a VueRouter object will render a RouterLink instead of the standard button element.',
        },
      },
    }),
    {
      info: {
        summary: `
        GxTextLink is used when a text is clickable, routing to another page or triggering an action.
        Has no margin or padding added and it has caption format
        `,
      },
    }
  )
