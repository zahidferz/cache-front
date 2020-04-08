import { storiesOf } from '@storybook/vue'
import GxSwitch from '../../../components/_Core/Forms/GxSwitch.vue'
import CenterDecorator from '../../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Forms/Inputs/GxSwitch', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'default',
    () => ({
      components: {
        GxSwitch,
      },
      data() {
        return {
          input: false,
        }
      },
      template: '<div><GxSwitch v-model="input" /></div>',
      propsDescription: {
        GxSwitch: {
          value: 'Value use for v-model two-way binding',
        },
      },
    }),
    {
      info: {
        summary: `
      GxSwitch is a checkbox input, emits an input event with a boolean payload.\n
      True for checked and false for unchecked. You can add a margins with the 'class' attribute just\n
      like a native html tag.
      `,
      },
    }
  )
  .add(
    'disabled',
    () => ({
      components: {
        GxSwitch,
      },
      data() {
        return {
          inputOn: true,
          inputOff: false,
        }
      },
      template: `
        <div>
          <GxSwitch v-model="inputOn" :disabled="true"/>
          <GxSwitch v-model="inputOff" :disabled="true"/>
        </div>
      `,
      propsDescription: {
        GxSwitch: {
          disabled: 'Not required. Disabled the input',
          value: 'Value use for v-model two-way binding',
        },
      },
    }),
    {
      info: {
        summary: `

      `,
      },
    }
  )
  .add(
    'Interaction with other components(With labels) ',
    () => ({
      components: {
        GxSwitch,
      },
      data() {
        return {
          input: false,
        }
      },
      template: `
        <div>
          <GxSwitch v-model="input" />
          <p class="mb-8">Adjacent element</p>
          <div class="flex items-center">
            <p class="flex-grow">Adjacent element</p>
            <GxSwitch class="ml-2" v-model="input" />
          </div>
        </div>
      `,
      propsDescription: {
        GxSwitch: {
          value: 'Value use for v-model two-way binding',
        },
      },
    }),
    {
      info: {
        summary: `
          Theres is no default margin.
          Container elements should handle spacing using the spacing guidelines via tailwind classes on surrounding elements, or on GxSwitch itself.\n
          Reminder: Spacing guidelines 0.5rem 1rem 2rem
        `,
      },
    }
  )
