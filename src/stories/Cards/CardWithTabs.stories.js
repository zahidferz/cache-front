import { storiesOf } from '@storybook/vue'
import CardWithTabs from '../../components/UNASSIGNED/CardWithTabs.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Cards/CardWithTabs', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'default',
    () => ({
      data() {
        return {
          tabsArray: [
            {
              id: 0,
              label: 'TAB1',
              component: () =>
                import('@components/UNASSIGNED/PrivacyPolicy/Access'),
            },
            {
              label: 'TAB2',
              component: () =>
                import('@components/UNASSIGNED/PrivacyPolicy/Security'),
            },
            {
              label: 'TAB3',
              component: () =>
                import('@components/UNASSIGNED/PrivacyPolicy/MoreInfo'),
            },
            {
              label: 'TAB4',
              component: () =>
                import('@components/UNASSIGNED/PrivacyPolicy/Security'),
            },
            {
              label: 'TAB5',
              component: () =>
                import('@components/UNASSIGNED/PrivacyPolicy/MoreInfo'),
            },
          ],
        }
      },
      components: {
        CardWithTabs,
      },
      template: `
      <div>
        <CardWithTabs :tabs-array="tabsArray" />
      </div>`,
      propsDescription: {
        CardWithTabs: {
          tabsArray: `Array of objects containing the structure and info to display cards.
          Object should follow the rules from GxTabs prop:
            {id: Number, label: 'String', component: ()=> import('componentPath'), icon: 'Tab Icon(optional)'}
          `,
        },
      },
    }),
    {
      info: {
        summary: `
        <b>CardWithTabs</b> is an example of a container displaying related content with emphasis. \n
        It has text content that can be added through the props accordingly and a __Tabs__ section \n
        Built with Core Component *GxTabs*. It takes __tabs-array__ prop to display it in GxTab component.
        `,
      },
    }
  )
