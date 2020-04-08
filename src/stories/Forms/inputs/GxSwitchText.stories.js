import { storiesOf } from '@storybook/vue'
import GxSwitchText from '../../../components/_Core/Forms/GxSwitchText.vue'
import CenterDecorator from '../../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Forms/Inputs/GxSwitchText', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'default',
    () => ({
      components: {
        GxSwitchText,
      },
      data() {
        return {
          input: 'Alpha',
          options: ['Alpha', 'Beta'],
        }
      },
      template:
        '<div><GxSwitchText v-model="input" :options="options" /></div>',
      propsDescription: {
        GxSwitchText: {
          value:
            'Value used for v-model two-way binding. Must have an initial value equal to one of the options.',
          options: 'Array of possible values',
        },
      },
    }),
    {
      info: {
        summary: `
          GxSwitchText is a checkbox input with text. It accepts an array of two options, that define the v-model value as well as the value displayed.\n
        `,
      },
    }
  )
  .add(
    'disabled',
    () => ({
      components: {
        GxSwitchText,
      },
      data() {
        return {
          input1: 'Alpha',
          input2: 'Beta',
          options: ['Alpha', 'Beta'],
        }
      },
      template: `
        <div>
          <GxSwitchText v-model="input1" :options="options" disabled />
          <GxSwitchText v-model="input2" :options="options" disabled />
        </div>
      `,
      propsDescription: {
        GxSwitchText: {
          value:
            'Value used for v-model two-way binding. Must have an initial value equal to one of the options.',
          options: 'Array of possible values',
        },
      },
    }),
    {
      info: {
        summary: `
          GxSwitchText is a checkbox input with text. It accepts an array of two options, that define the v-model value as well as the value displayed.\n
        `,
      },
    }
  )
// .add(
//   'disabled',
//   () => ({
//     components: {
//       GxSwitchText,
//     },
//     data() {
//       return {
//         inputOn: true,
//         inputOff: false,
//       }
//     },
//     template: `
//       <div>
//         <GxSwitchText v-model="inputOn" :disabled="true"/>
//         <GxSwitchText v-model="inputOff" :disabled="true"/>
//       </div>
//     `,
//     propsDescription: {
//       GxSwitchText: {
//         inputId: 'Required. Value for id html attribute',
//         selectedLabel:
//           'Not required. String that will be shown when the input is checked',
//         unselectedLabel:
//           'Not required. String that will be shown when the input is not checked',
//         disabled: 'Not required. Disabled the input',
//         value: 'Value use for v-model two-way binding',
//       },
//     },
//   }),
//   {
//     info: {
//       summary: `

//     `,
//     },
//   }
// )
// .add(
//   'Interaction with other components(With labels) ',
//   () => ({
//     components: {
//       GxSwitchText,
//     },
//     data() {
//       return {
//         input: false,
//       }
//     },
//     template: `
//       <div>
//         <GxSwitchText v-model="input" />
//         <p class="mb-8">Adjacent element</p>
//         <div class="flex items-center">
//           <p class="flex-grow">Adjacent element</p>
//           <GxSwitchText class="ml-2" v-model="input" />
//         </div>
//       </div>
//     `,
//     propsDescription: {
//       GxSwitchText: {
//         inputId: 'Required. Value for id html attribute',
//         selectedLabel:
//           'Not required. String that will be shown when the input is checked',
//         unselectedLabel:
//           'Not required. String that will be shown when the input is not checked',
//         value: 'Value use for v-model two-way binding',
//       },
//     },
//   }),
//   {
//     info: {
//       summary: `
//         Theres is no default margin.
//         Container elements should handle spacing using the spacing guidelines via tailwind classes on surrounding elements, or on GxSwitchText itself.\n
//         Reminder: Spacing guidelines 0.5rem 1rem 2rem
//       `,
//     },
//   }
// )
