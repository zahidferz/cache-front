import { storiesOf } from '@storybook/vue'
import GxTabs from '@components/_Core/Navigation/GxTabs.vue'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Tabs/GxTabs', module)
  .addDecorator(withInfo)
  .add(
    'no scroll',
    () => ({
      components: {
        GxTabs,
      },
      data() {
        return {
          tabs: [
            {
              label: 'Short',
              component: () =>
                import('@components/UNASSIGNED/PrivacyPolicy/Access'),
            },
            {
              label: 'Long Label',
              component: () =>
                import('@components/UNASSIGNED/PrivacyPolicy/Security'),
            },
            {
              label: 'EXTRA LARGE LABEL',
              component: () =>
                import('@components/UNASSIGNED/PrivacyPolicy/MoreInfo'),
            },
          ],
        }
      },
      methods: {
        clicked() {
          alert('Tabs clicked')
        },
      },
      template: `
      <div class="w-full">
        <GxTabs :tabs="tabs" />
      </div>

      `,
      propsDescription: {
        GxTabs: {
          tabs: `Recieves an array of objects where you can define its different properties such as label, component and icon.
          Component property is required for each tab so it can be displayed when tab selected.`,
          isGray: 'Changes the color from primary to gray scale.',
        },
      },
    }),
    {
      info: {
        summary: `*GxTabs* render a menu with tabs and automatically detect active tab to render tab content.
        Accepts an array of objects with a required property of "component", plus at least one of "label" and "icon".
        \n Component property is required for each tab so it can be displayed when tab selected.
        \n According to [material.io](https://material.io/design/components/tabs.html#scrollable-tabs), long tabs should scroll horizontally and in this case add an offset to the first tab to indicate scroll is available.
        \n *GxTabs* will automatically display tabs accordingly, just properly passing label and component elements.`,
      },
    }
  )
  .add(
    'SCROLL',
    () => ({
      components: {
        GxTabs,
      },
      data() {
        return {
          tabs: [
            {
              label: 'Short',
              component: () =>
                import('@components/UNASSIGNED/PrivacyPolicy/Access'),
            },
            {
              label: 'Long Label',
              component: () =>
                import('@components/UNASSIGNED/PrivacyPolicy/Security'),
            },
            {
              label: 'EXTRA LARGE LABEL',
              component: () =>
                import('@components/UNASSIGNED/PrivacyPolicy/MoreInfo'),
            },
            {
              label: 'Long Label',
              component: () =>
                import('@components/UNASSIGNED/PrivacyPolicy/Security'),
            },
            {
              label: 'EXTRA LARGE LABEL',
              component: () =>
                import('@components/UNASSIGNED/PrivacyPolicy/MoreInfo'),
            },
          ],
        }
      },
      methods: {
        clicked() {
          alert('Tabs clicked')
        },
      },
      template: `
      <div>
        <GxTabs :tabs="tabs"/>
      </div>
      `,
      propsDescription: {
        GxTabs: {
          tabs:
            'Recieves an array of objects where you can define its different properties such as label, component and icon. Component property is required for each tab so it can be displayed when tab selected.',
          isgray: 'Changes the color from primary to gray scale.',
        },
      },
    }),
    {
      info: {
        summary: `*GxTabs* render a menu with tabs and automatically detect active tab to render tab content.
        Accepts an array of objects with a required property of "component", plus at least one of "label" and "icon".
        \n Component property is required for each tab so it can be displayed when tab selected.
        \n According to [material.io](https://material.io/design/components/tabs.html#scrollable-tabs), long tabs should scroll horizontally and in this case add an offset to the first tab to indicate scroll is available.
        \n *GxTabs* will automatically display tabs accordingly, just properly passing label and component elements.`,
      },
    }
  )
  .add(
    'is-gray',
    () => ({
      components: {
        GxTabs,
      },
      data() {
        return {
          tabs: [
            {
              label: 'Short',
              component: () =>
                import('@components/UNASSIGNED/PrivacyPolicy/Access'),
            },
            {
              label: 'Long Label',
              component: () =>
                import('@components/UNASSIGNED/PrivacyPolicy/Security'),
            },
            {
              label: 'EXTRA LARGE LABEL',
              component: () =>
                import('@components/UNASSIGNED/PrivacyPolicy/MoreInfo'),
            },
            {
              label: 'Long Label',
              component: () =>
                import('@components/UNASSIGNED/PrivacyPolicy/Security'),
            },
            {
              label: 'EXTRA LARGE LABEL',
              component: () =>
                import('@components/UNASSIGNED/PrivacyPolicy/MoreInfo'),
            },
          ],
        }
      },
      methods: {
        clicked() {
          alert('Tabs clicked')
        },
      },
      template: `
      <div>
        <GxTabs is-gray :tabs="tabs"/>
      </div>
      `,
      propsDescription: {
        GxTabs: {
          tabs:
            'Recieves an array of objects where you can define its different properties such as label, component and icon. Component property is required for each tab so it can be displayed when tab selected.',
          isGray: 'Changes the color from primary to gray scale.',
        },
      },
    }),
    {
      info: {
        summary: `*GxTabs* render a menu with tabs and automatically detect active tab to render tab content.
        Accepts an array of objects with a required property of "component", plus at least one of "label" and "icon".
        \n Component property is required for each tab so it can be displayed when tab selected.
        \n According to [material.io](https://material.io/design/components/tabs.html#scrollable-tabs), long tabs should scroll horizontally and in this case add an offset to the first tab to indicate scroll is available.
        \n *GxTabs* will automatically display tabs accordingly, just properly passing label and component elements.`,
      },
    }
  )
