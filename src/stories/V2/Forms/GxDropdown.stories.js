import { storiesOf } from '@storybook/vue'
import GxDropdown2 from '../../../components/_Core/globals/V2/Forms/GxDropdown2.vue'
import GxForm from '../../../components/_Core/globals/V2/Forms/GxForm.vue'
import { withInfo } from 'storybook-addon-vue-info'
import orderedSatKeys from '@src/assets/Catalogos/CAT_006_MEX_CFDI_Clave_de_producto_o_Servicio.json'

storiesOf('V2/Forms/GxDropdown2', module)
  .addDecorator(withInfo)
  .add('default', () => ({
    components: {
      GxDropdown2,
      GxForm,
    },
    data() {
      return {
        inputValue1: '',
        inputValue2: '',
        options2: ['Papas', 'Zanahoria', 'fresas'],
        options1: [
          {
            regime_code: '601',
            description: 'General de Ley Personas Morales',
            valid_for_person: false,
            valid_for_company: true,
          },
          {
            regime_code: '603',
            description: 'Personas Morales con Fines no Lucrativos',
            valid_for_person: false,
            valid_for_company: true,
          },
          {
            regime_code: '605',
            description: 'Sueldos y Salarios e Ingresos Asimilados a Salarios',
            valid_for_person: true,
            valid_for_company: false,
          },
        ],
        orderedSatKeys: orderedSatKeys,
        satKey: '',
      }
    },
    computed: {
      orderedSatKeysDropdownOptions() {
        return this.orderedSatKeys.map((key) => key.d)
      },
    },
    methods: {
      onSubmit() {
        /* eslint-disable */
        console.log('form 1 submitted')
        /* eslint-enable */
      },
      onSubmit2() {
        /* eslint-disable */
        console.log('form 2 submitted')
        /* eslint-enable */
      },
    },
    template: `
      <div class="w-full flex flex-col de:flex-row">
        <div class="w-full px-4">
          <h2>GxDropdown2</h2>
          <GxForm @submit="onSubmit" class="p-4">
            <div class="py-4">
                <p>Input obligatorio</p>
                <p class="mb-2">Las opciones son un arreglo de objetos</p>
                <pre>
                  [
                    {
                      regime_code: '601',
                      description: 'General de Ley Personas Morales',
                      valid_for_person: false,
                      valid_for_company: true,
                    },
                    {
                      regime_code: '603',
                      description: 'Personas Morales con Fines no Lucrativos',
                      valid_for_person: false,
                      valid_for_company: true,
                    },
                  ]
                </pre>
                <p class="mb-2 text-2xs">Valor: {{inputValue1}}</p>
                <GxDropdown2 v-model="inputValue1" required  :options="options1" option-text="description" option-value="regime_code" label="Regimen fiscal" />
                <p class="mt-4">Las opciones  son aun arreglo de strings ['Papas','Zanahorias','fresas']</p>
                <p class="mt-4">Input no obligatorio</p>
                <p class="mb-2 text-2xs">Valor: {{inputValue2}}</p>
                <GxDropdown2 v-model="inputValue2"
                :options="options2"  label="Verduras" />
                <p class="mt-4">Input deshabilitado</p>
                <GxDropdown2 class="mt-4" disabled  label="Disabled" />
                <GxDropdown2 v-model="satKey" :options="orderedSatKeysDropdownOptions" class="mt-4" label="Very long list" />
                <button class="mt-4" type="submit">Submit</button>
            </div>
          </GxForm>
        </div>
       </div>
      `,
  }))
