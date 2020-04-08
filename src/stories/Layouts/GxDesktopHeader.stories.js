import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'

storiesOf('Layouts/GxDesktopHeader', module)
  .addDecorator(withInfo)
  .add(
    'default',
    () => ({
      components: {
        GxDesktopHeader,
      },
      data() {
        return {}
      },
      methods: {
        clicked() {
          alert('Button clicked')
        },
      },
      template: `
        <div id="app" class="text-black gx-body gx-body-sm bg-white" style="height: 100%">
          <GxDesktopHeader header="Este es el nombre de la sección" />
        </div>
      `,
      propsDescription: {
        GxDesktopHeader: {
          header: 'Current view title',
          back:
            "Helper boolean that sets a back icon with Vue Router back functionality (when using back, don't pass icon nor iconClickHandler)",
          icon: 'Icon to display at the top left corner of current view',
          iconClickHandler: 'Method to call when clicking on top left icon',
        },
      },
    }),
    {
      info: {
        summary: `
          GxDesktopHeader is used as the standard page header for desktop views. It usually invoves a header
          for the current section, an icon next to the header and optional actions on the right side.
        `,
      },
    }
  )
  .add(
    'with right side actions',
    () => ({
      components: {
        GxDesktopHeader,
      },
      data() {
        return {}
      },
      methods: {
        clicked() {
          alert('Button clicked')
        },
      },
      template: `
        <div id="app" class="text-black gx-body gx-body-sm bg-white" style="height: 100%">
          <GxDesktopHeader header="Este es el nombre de la sección">
            <template v-slot:right>
              <p>Right hand actions can be inserted here via a slot</p>
            </template>
          </GxDesktopHeader>
        </div>
      `,
      propsDescription: {
        GxDesktopHeader: {
          header: 'Current view title',
          back:
            "Helper boolean that sets a back icon with Vue Router back functionality (when using back, don't pass icon nor iconClickHandler)",
          icon: 'Icon to display at the top left corner of current view',
          iconClickHandler: 'Method to call when clicking on top left icon',
        },
      },
    }),
    {
      info: {
        summary: `
          GxDesktopHeader is used as the standard page header for desktop views. It usually invoves a header
          for the current section, an icon next to the header and optional actions on the right side.
        `,
      },
    }
  )
