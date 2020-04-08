import { storiesOf } from '@storybook/vue'
// import GxTextLinkIcon from '../../components/_Core/Buttons/GxTextLinkIcon.vue' // Now a global
import CenterDecorator from '../addons/CenterDecorator'
import StoryRouter from 'storybook-vue-router'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('TextLink/GxTextLinkIcon', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .addDecorator(StoryRouter())
  .add(
    'Example',
    () => ({
      components: {
        // GxTextLinkIcon,
      },
      template: `
        <GxTextLinkIcon :to="{ name: 'login'}"/>
      `,
      propsDescription: {
        GxTextLinkIcon: {
          to:
            'Use the *to* prop to define the route as in RouterLink components',
        },
      },
    }),
    {
      info: {
        summary: `
        GxTextLinkIcon is a variant of GxTextLink with a default add icon. It can be either a RouterLink component or a button.
        `,
      },
    }
  )
