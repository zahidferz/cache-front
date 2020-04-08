import { storiesOf } from '@storybook/vue'
import GxRadioButtonGroup from '../../components/_Core/Forms/GxRadioButtonGroup.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Forms/GxRadioButtonGroup', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'default',
    () => ({
      components: {
        GxRadioButtonGroup,
      },
      template: `<div class="w-32 flex justify-center items-center">
          <GxRadioButtonGroup
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
        </div>`,
      propsDescription: {
        GxRadioButtonGroup: {
          inputs:
            'Required. Array of objects like this { label:inputLabel, value:inputValue, checked:true(make current input the default option), disable:true(disabled current input)} each object is an GxRadioButton',
          value:
            'Value use for v-model two-way binding different to model propertie',
        },
      },
    }),
    {
      info: {
        summary:
          'Only one radio button in a group can be selected at the same time.',
      },
    }
  )
