import { storiesOf } from '@storybook/vue'
import GxCheckboxGroup from '../../components/_Core/Forms/GxCheckboxGroup.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Forms/GxCheckboxGroup', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'default',
    () => ({
      components: {
        GxCheckboxGroup,
      },
      template: `<form class="w-32  flex flex-row justify-center items-center">
          <GxCheckboxGroup
            :inputs="[
              { label: 'Tripa', value: 'tripa'},
              { label: 'Cabeza', value: 'cabeza'},
              { label: 'Pastor', value: 'pastor'},
              { label: 'Lengua', value: 'lengua', checked:true},
              { label: 'Ojo', value: 'ojo'},
              { label: 'Cachete', value: 'cachete'},
              {label:'Pescado',value:'pescado',disabled:true}
              ]"
          />
        </form>`,
      propsDescription: {
        GxCheckboxGroup: {
          inputs:
            'Required. Array of objects like this { label:inputLabel, value:inputValue, checked:true(make current input the default option), disable:true(disabled current input)} each object is an GxCheckbox',
          value:
            'Value use for v-model two-way binding different to model propertie',
        },
      },
    }),
    {
      info: {
        summary: `
          The input event payload will be an array with the value of each selection.\n
        `,
      },
    }
  )
