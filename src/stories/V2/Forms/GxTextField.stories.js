import { storiesOf } from '@storybook/vue'
import GxTextField from '../../../components/_Core/globals/V2/Forms/GxTextField.vue'
import GxTextFieldPhone from '../../../components/_Core/globals/V2/Forms/GxTextFieldPhone.vue'
import GxTextFieldEmail from '../../../components/_Core/globals/V2/Forms/GxTextFieldEmail.vue'
import GxTextFieldPassword from '../../../components/_Core/globals/V2/Forms/GxTextFieldPassword.vue'
import GxTextFieldName from '../../../components/_Core/globals/V2/Forms/GxTextFieldName.vue'
import GxTextFieldDark from '../../../components/_Core/globals/V2/Forms/GxTextFieldDark.vue'
import GxTextFieldDarkPhone from '../../../components/_Core/globals/V2/Forms/GxTextFieldDarkPhone.vue'
import GxTextFieldDarkEmail from '../../../components/_Core/globals/V2/Forms/GxTextFieldDarkEmail.vue'
import GxTextFieldDarkPassword from '../../../components/_Core/globals/V2/Forms/GxTextFieldDarkPassword.vue'
import GxTextFieldDarkName from '../../../components/_Core/globals/V2/Forms/GxTextFieldDarkName.vue'
import GxTextFieldMoney from '../../../components/_Core/globals/V2/Forms/GxTextFieldMoney.vue'
import GxForm from '../../../components/_Core/globals/V2/Forms/GxForm.vue'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('V2/Forms/GxTextField', module)
  .addDecorator(withInfo)
  .add('default', () => ({
    components: {
      GxTextField,
      GxTextFieldPhone,
      GxTextFieldPassword,
      GxTextFieldName,
      GxTextFieldEmail,
      GxTextFieldDark,
      GxTextFieldDarkPhone,
      GxTextFieldDarkPassword,
      GxTextFieldDarkName,
      GxTextFieldDarkEmail,
      GxTextFieldMoney,
      GxForm,
    },
    data() {
      return {
        inputAutofocus: '',
        inputPassword: 'ÁgkÉjp',
        inputPhone: '',
        inputEmail: '',
        inputName: '',
        inputValue: '',
        inputValue2: '',
        inputValue3: '',
        inputValue4: '',
        inputValue5: 'Some value',
        inputValue6: '',
        inputValue7: 'ÁgkÉjp',
        inputValue10: '',
        inputValue11: '',
        inputValue12: '',
        inputValue13: '',
        inputMoney: '0.00',
        validationFn: (value) => {
          // console.log('validationFn', value)
          if (value.length < 2) {
            return 'Value is too short'
          }
          if (value.length > 5) {
            return 'Value is too long'
          }

          return ''
        },
        validationFn2: (value) => {
          // console.log('validationFn2', value)
          return value.length > 12
        },
      }
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
          <h2>White</h2>
          <GxForm @submit="onSubmit" class="p-4">
            <div class="py-4">
              <p class="mb-2 font-bold uppercase">Autofocus</p>
              <p class="mb-2 text-2xs">NOTA*: Por limitaciones de Apple, el autofocus no funciona en iPhone</p>
              <GxTextField v-model="inputAutofocus" autofocus label="Autofocus" />
            </div>
            <div class="py-4">
              <p class="mb-2 font-bold uppercase">Email</p>
              <GxTextFieldEmail v-model="inputEmail" label="Email" />
            </div>
            <div class="py-4">
              <p class="mb-2 font-bold uppercase">Name</p>
              <GxTextFieldName v-model="inputName" label="Name" />
            </div>
            <div class="py-4">
              <p class="mb-2 font-bold uppercase">Password</p>
              <GxTextFieldPassword v-model="inputPassword" required label="Password" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase">Phone</p>
              <p class="mb-2 text-2xs">NOTA*: este input acepta caracteres especiales como "-", por lo que el usuario puede insertar
              "55-1254-2345", es importante borrar esos caracteres especiales al momento de enviar la información al back para que
              el número se guarde como 5512542345, esto se puede hacer con un regex: <strong class="font-bold">input.match(/\\d/gi).join('')</strong></p>
              <GxTextFieldPhone v-model="inputPhone" required label="Phone" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase">Text</p>
              <p class="mb-2 text-2xs">No validation and required</p>
              <GxTextField v-model="inputValue10" required label="ÁgkÉjp" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase">Text</p>
              <p class="mb-2 text-2xs">Validation and required</p>
              <GxTextField v-model="inputValue11" :validation-fn="validationFn" required label="ÁgkÉjp" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase">Text</p>
              <p class="mb-2 text-2xs">Validation and not required</p>
              <GxTextField v-model="inputValue12" :validation-fn="validationFn" label="ÁgkÉjp" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase">Text</p>
              <p class="mb-2 text-2xs">No validation and not required</p>
              <GxTextField v-model="inputValue13" label="ÁgkÉjp" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase">Text</p>
              <p class="mb-2 text-2xs">No icons and required</p>
              <GxTextField v-model="inputValue7" required label="ÁgkÉjp" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase">Text</p>
              <p class="mb-2 text-2xs">Left icon, required and custom validationFn of (str > 2)</p>
              <GxTextField v-model="inputValue2" required left-icon="email" error="Custom error message" :validation-fn="validationFn" label="Icon and required" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase">Text</p>
              <p class="mb-2 text-2xs">Left icon</p>
              <GxTextField v-model="inputValue3" left-icon="domain" label="Left icon" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase">Text</p>
              <p class="mb-2 text-2xs">Simple</p>
              <GxTextField v-model="inputValue3" label="Simple" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase">Text</p>
              <p class="mb-2 text-2xs">Left icon and disabled</p>
              <GxTextField v-model="inputValue4" disabled left-icon="lock" label="Icon" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase">Text</p>
              <p class="mb-2 text-2xs">Left icon and disabled with prepopulated value</p>
              <GxTextField v-model="inputValue5" disabled left-icon="domain" label="Icon" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase">Text</p>
              <p class="mb-2 text-2xs">Left icon and assistive text</p>
              <GxTextField v-model="inputValue6" assistive="assistive text" left-icon="domain" label="Icon and assistive" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase">GxTextFieldMoney</p>
              <p class="mb-2 text-2xs">Left icon and assistive text</p>
              <p class="mb-2 text-2xs">Input event payload: {{inputMoney}}</p>
              <GxTextFieldMoney v-model="inputMoney"  label="GxTextFieldMoney" required/>
            </div>
            <button type="submit">Submit</button>
          </GxForm>
        </div>
        <div class="w-full px-4 bg-primary-600">
          <h2 class="text-2xl text-white">Dark</h2>
          <GxForm @submit="onSubmit2" class="p-4">
            <div class="py-4">
              <p class="mb-2 font-bold uppercase text-white">Autofocus</p>
              <p class="mb-2 text-2xs text-white">NOTA*: Por limitaciones de Apple, el autofocus no funciona en iPhone</p>
              <GxTextFieldDarkName v-model="inputAutofocus" autofocus label="Autofocus" />
            </div>
            <div class="py-4">
              <p class="mb-2 font-bold uppercase text-white">Email</p>
              <GxTextFieldDarkEmail v-model="inputEmail" label="Email" />
            </div>
            <div class="py-4">
              <p class="mb-2 font-bold uppercase text-white">Name</p>
              <GxTextFieldDark v-model="inputName" label="Name" />
            </div>
            <div class="py-4">
              <p class="mb-2 text-white font-bold uppercase">Password</p>
              <GxTextFieldDarkPassword v-model="inputPassword" required label="Password" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase text-white">Phone</p>
              <p class="mb-2 text-white text-2xs">NOTA*: este input acepta caracteres especiales como "-", por lo que el usuario puede insertar
              "55-1254-2345", es importante borrar esos caracteres especiales al momento de enviar la información al back para que
              el número se guarde como 5512542345, esto se puede hacer con un regex: <strong class="font-bold">input.match(/\\d/gi).join('')</strong></p>
              <GxTextFieldDarkPhone v-model="inputPhone" required label="Phone" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase text-white">Text</p>
              <p class="mb-2 text-white text-2xs">No icons and required</p>
              <GxTextFieldDark v-model="inputValue7" required label="ÁgkÉjp" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase text-white">Text</p>
              <p class="mb-2 text-white text-2xs">Left icon, required and custom validationFn of (str > 2)</p>
              <GxTextFieldDark v-model="inputValue2" required left-icon="email" error="Custom error message" :validation-fn="validationFn" label="Icon and required" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase text-white">Text</p>
              <p class="mb-2 text-white text-2xs">Left icon</p>
              <GxTextFieldDark v-model="inputValue3" left-icon="domain" label="Left icon" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase text-white">Text</p>
              <p class="mb-2 text-white text-2xs">Simple</p>
              <GxTextFieldDark v-model="inputValue3" label="Simple" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase text-white">Text</p>
              <p class="mb-2 text-white text-2xs">Left icon and disabled</p>
              <GxTextFieldDark v-model="inputValue4" disabled left-icon="lock" label="Icon" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase text-white">Text</p>
              <p class="mb-2 text-white text-2xs">Left icon and disabled with prepopulated value</p>
              <GxTextFieldDark v-model="inputValue5" disabled left-icon="domain" label="Icon" />
            </div>
            <div class="py-4">
              <p class="font-bold uppercase text-white">Text</p>
              <p class="mb-2 text-white text-2xs">Icon and assistive text</p>
              <GxTextFieldDark v-model="inputValue6" assistive="assistive text" left-icon="domain" label="Icon and assistive text" />
            </div>
            <button type="submit">Submit</button>
          </GxForm>
        </div>
      </div>
      `,
  }))
