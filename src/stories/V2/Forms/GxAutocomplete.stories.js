import { storiesOf } from '@storybook/vue'
import GxAutocomplete from '../../../components/_Core/globals/V2/Forms/GxAutocomplete.vue'
import GxForm from '../../../components/_Core/globals/V2/Forms/GxForm.vue'
import { withInfo } from 'storybook-addon-vue-info'
import orderedSatKeys from '@src/assets/Catalogos/CAT_006_MEX_CFDI_Clave_de_producto_o_Servicio.json'
import GxIcon2 from '@components/_Core/Icons/GxIcon2'
storiesOf('V2/Forms/GxAutocomplete', module)
  .addDecorator(withInfo)
  .add('default', () => ({
    components: {
      GxAutocomplete,
      GxIcon2,
      GxForm,
    },
    data() {
      return {
        orderedSatKeys: orderedSatKeys,
        satKey1: '',
        satKey2: '',
        satKey3: '',
        satKey1Prefilled: 'Abanicos',
        satKey2Prefilled: 'Abanicos',
        satKey3Prefilled: 'Abanicos',
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
    },
    template: `
      <div class="w-full flex flex-col de:flex-row">
        <div class="w-full px-4">
          <h2>GxAutocomplete</h2>
          <GxForm @submit="onSubmit" class="p-4">
            <div class="py-4">
                <h3>Guardar el texto escrito</h3>
                <p>Cuando el usuario use Tab, se guardará el texto escrito, y no la opción resaltada</p>
                <p>Input payload:{{satKey1}}</p>
                <GxAutocomplete keep-typed-value required v-model="satKey1" :options="orderedSatKeysDropdownOptions" class="mt-4" label="Very long list" >
                  <template v-slot:option="{option,formattedOption}" >
                    <p v-html="formattedOption(option.toUpperCase())"></p>
                  </template>
                </GxAutocomplete>
                </div>
                <div class="py-4">
                <h3>No guardar el texto escrito</h3>
                <p>Cuando el usuario use Tab, se guardará la opción resaltada, como si hubiera presionado Enter</p>
                <p>Un click fuera del componente, cierra y no actualiza el valor seleccionado.</p>
                <p>Input payload: {{satKey3}}</p>
                <GxAutocomplete v-model="satKey3" required :options="orderedSatKeysDropdownOptions" class="mt-4" label="Very long list" />
                </div>
                <div class="py-4">
                <p>Deshabilitado</p>
                <GxAutocomplete disabled v-model="satKey2" :options="orderedSatKeysDropdownOptions" class="mt-4" label="Very long list" />
                </div>
                <button class="mt-4" type="submit">Submit</button>
          </GxForm>
        </div>
        <div class="w-full px-4">
          <h2>GxAutocomplete con valores prellenados</h2>
          <GxForm @submit="onSubmit" class="p-4">
            <div class="py-4">
                <p>Guardar el texto escrito</p>
                <p>Cuando el usuario use Tab, se guardará el texto escrito, y no la opción resaltada</p>
                <GxAutocomplete keep-typed-value v-model="satKey1Prefilled" :options="orderedSatKeysDropdownOptions" class="mt-4" label="Very long list" />
                </div>
                <div class="py-4">
                <p>No guardar el texto escrito</p>
                <p>Cuando el usuario use Tab, se guardará la opción resaltada, como si hubiera presionado Enter</p>
                <p>Un click fuera del componente, cierra y no actualiza el valor seleccionado.</p>
                <GxAutocomplete v-model="satKey3Prefilled" :options="orderedSatKeysDropdownOptions" class="mt-4" label="Very long list" />
                </div>
                <div class="py-4">
                <p>Deshabilitado</p>
                <GxAutocomplete disabled v-model="satKey2Prefilled" :options="orderedSatKeysDropdownOptions" class="mt-4" label="Very long list" />
                </div>
                <button class="mt-4" type="submit">Submit</button>
          </GxForm>
        </div>
       </div>
      `,
  }))
