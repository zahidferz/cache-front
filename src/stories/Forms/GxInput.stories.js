import { storiesOf } from '@storybook/vue'
import GxInput from '../../components/_Core/Forms/GxInput.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Forms/GxInput', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'all',
    () => ({
      components: {
        GxInput,
      },
      data() {
        return {
          password: '',
          validPassword: 'Gestionix0',
          invalidPassword: 'gestionix',
          phone: '',
          validPhone: '4378328712',
          invalidPhone: '16253',

          csd: '',
          ciec: '',
          taxId: '',

          someText: '',
          someTextWithValue: 'alpha',
        }
      },
      template: `
      <div class="w-full">
        <div class="p-4">
          <h2 class="font-bold">Texto libre con mínimo de caracteres</h2>
          <GxInput mark-touched v-model="someText" icon="face" icon-right="face" placeholder="Sin valor y visitado" label="Sin valor y visitado" />
          <GxInput dark mark-touched v-model="someText" icon="face" icon-right="face" placeholder="Sin valor y visitado" label="Sin valor y visitado" />
          <GxInput v-model="someText" icon="face" icon-right="face" placeholder="Sin valor y no visitado" label="Sin valor y no visitado" />
          <GxInput dark v-model="someText" icon="face" icon-right="face" placeholder="Sin valor y no visitado" label="Sin valor y no visitado" />
          <GxInput v-model="someTextWithValue" icon="face" icon-right="face" placeholder="Con valor y no visitado" label="Con valor y no visitado" />
          <GxInput dark v-model="someTextWithValue" icon="face" icon-right="face" placeholder="Con valor y no visitado" label="Con valor y no visitado" />
          <GxInput mark-touched v-model="someTextWithValue" icon="face" icon-right="face" placeholder="Con valor y visitado" label="Con valor y visitado" />
          <GxInput dark mark-touched v-model="someTextWithValue" icon="face" icon-right="face" placeholder="Con valor y visitado" label="Con valor y visitado" />
        </div>
        <div class="p-4">
          <h2 class="font-bold">Contraseña (password)</h2>
          <GxInput pattern="password" v-model="password" placeholder="Contraseña" label="Contraseña" />
          <GxInput dark pattern="password" v-model="password" placeholder="Contraseña" label="Contraseña" />
          <GxInput pattern="password" v-model="validPassword" placeholder="Valor inicial correcto" label="Valor inicial correcto" />
          <GxInput dark pattern="password" v-model="validPassword" placeholder="Valor inicial correcto" label="Valor inicial correcto" />
          <GxInput mark-touched pattern="password" v-model="validPassword" placeholder="Valor inicial correcto y visitado" label="Valor inicial correcto  y visitado" />
          <GxInput mark-touched dark pattern="password" v-model="validPassword" placeholder="Valor inicial correcto y visitado" label="Valor inicial correcto  y visitado" />
          <GxInput pattern="password" v-model="invalidPassword" placeholder="Valor inicial incorrecto" label="Valor inicial incorrecto" />
          <GxInput dark pattern="password" v-model="invalidPassword" placeholder="Valor inicial incorrecto" label="Valor inicial incorrecto" />
        </div>
        <div class="p-4">
          <h2 class="font-bold">Teléfono (phone)</h2>
          <GxInput pattern="phone" v-model="phone" placeholder="Teléfono" label="Teléfono" />
          <GxInput pattern="phone" v-model="validPhone" placeholder="Valor inicial correcto" label="Valor inicial correcto" />
          <GxInput pattern="phone" v-model="invalidPhone" placeholder="Valor inicial incorrecto" label="Valor inicial incorrecto" />
        </div>
      </div>
      `,
      propsDescription: {
        GxInput: {
          icon:
            'Required. Name of the icon. https://material.io/tools/icons/?icon=favorite&style=baseline',
          pattern:
            'Not Required. Some cases of validations. Can be numeric, email, phone. When the input lost focus will emit a vue event called valid with a boolean payload.',
          label: 'Required. Input label',
          type:
            'Not required.Defines the native html input type.(email,tel,phone,number,text). Incase a valid pattern is passed to the component, it automatically will use the right input.',
          assistive: 'Not required. Some text to show',
          valid: 'Not required. Allow  handle the input state',
          value:
            'Value used for v-model two-way binding different to model propertie',
          error:
            'Pass a String as a custom error. This will automatically set the input to an error state and display the error message.',
          min:
            'Minimum number of digits for a valid phone number (default: 10)',
          max:
            'Maximum number of digits for a valid phone number (default: 15)',
          autofocus: 'Automatically focus this input 300ms after mounting',
          loading: 'Used for single input forms.',
        },
      },
    }),
    {
      info: {
        summary: `
            Automatically focus this input 300ms after mounting.\n
            For comparison, all inputs are shown inside a container with the standard horizontal
            padding of 1rem.\n
            All input validations have a 300ms delay (debounced) after the last keypress.\n
            No vertical padding is provided, but should be given according to context of use.\n
            All inputs come with a standard margin bottom of 0.5rems.\n
            The dark variant is to be used as the single input inside a form over a dark background.
          `,
      },
    }
  )
  .add(
    'date',
    () => ({
      components: {
        GxInput,
      },
      data() {
        return {
          inputValue: '',
          withStartingValue: new Date('2019-03-17T23:13:57.544Z').toISOString(),
        }
      },
      template: `
      <div class="w-full">
        <div class="p-4">
          <GxInput v-model="inputValue" :phrases="{ ok: 'OK', cancel: 'Cancelar' }" pattern="date" name="date" placeholder="Elige una fecha" label="Elige una fecha" icon="account_circle" />
        </div>
        <div class="p-4">
          <GxInput v-model="withStartingValue" pattern="date" name="date" placeholder="Elige una fecha" label="Elige una fecha" icon="account_circle" />
        </div>
      </div>
      `,
      propsDescription: {
        GxInput: {
          phrases:
            'If passed will show buttons to confirm date selection. If not passes, date will automatically be selected on selection.',
        },
      },
    }),
    {
      info: {
        summary: `
            Date input is a modified version of vue-datetime
          `,
      },
    }
  )
  .add(
    'Autofocus',
    () => ({
      components: {
        GxInput,
      },
      data() {
        return {
          inputValue: '',
        }
      },
      template: `
      <div class="w-full">
        <div class="p-4">
          <GxInput v-model="inputValue" placeholder="Do you love me?" label="Do you love me?" icon="account_circle" autofocus/>
        </div>
        <div class="bg-primary px-4">
          <GxInput v-model="inputValue" dark placeholder="Do you love me?" label="Do you love me?" icon="account_circle" autofocus/>
        </div>
      </div>
      `,
      propsDescription: {
        GxInput: {
          icon:
            'Required. Name of the icon. https://material.io/tools/icons/?icon=favorite&style=baseline',
          pattern:
            'Not Required. Some cases of validations. Can be numeric, email, phone. When the input lost focus will emit a vue event called valid with a boolean payload.',
          label: 'Required. Input label',
          type:
            'Not required.Defines the native html input type.(email,tel,phone,number,text). Incase a valid pattern is passed to the component, it automatically will use the right input.',
          assistive: 'Not required. Some text to show',
          valid: 'Not required. Allow  handle the input state',
          value:
            'Value used for v-model two-way binding different to model propertie',
          error:
            'Pass a String as a custom error. This will automatically set the input to an error state and display the error message.',
          min:
            'Minimum number of digits for a valid phone number (default: 10)',
          max:
            'Maximum number of digits for a valid phone number (default: 15)',
          autofocus: 'Automatically focus this input 300ms after mounting',
          loading: 'Used for single input forms.',
        },
      },
    }),
    {
      info: {
        summary: `
            Automatically focus this input 300ms after mounting.\n
            For comparison, all inputs are shown inside a container with the standard horizontal
            padding of 1rem.\n
            All input validations have a 300ms delay (debounced) after the last keypress.\n
            No vertical padding is provided, but should be given according to context of use.\n
            All inputs come with a standard margin bottom of 0.5rems.\n
            The dark variant is to be used as the single input inside a form over a dark background.
          `,
      },
    }
  )
  .add(
    'Assistive text',
    () => ({
      components: {
        GxInput,
      },
      data() {
        return {
          inputValue: '',
        }
      },
      template: `
        <div class="w-full">
          <div class="p-4">
            <GxInput v-model="inputValue" placeholder="Do you love me?" label="Do you love me?" icon="account_circle" assistive="Some assistive text" />
          </div>
          <div class="bg-primary p-4">
            <GxInput v-model="inputValue" dark placeholder="Do you love me?" label="Do you love me?" icon="account_circle" assistive="Some assistive text" />
          </div>
        </div>
      `,
      propsDescription: {
        GxInput: {
          icon:
            'Required. Name of the icon. https://material.io/tools/icons/?icon=favorite&style=baseline',
          pattern:
            'Not Required. Some cases of validations. Can be numeric, email, phone, name, ciec, csd, company-name. When the input lost focus will emit a vue event called valid with a boolean payload.',
          label: 'Required. Input label',
          type:
            'Not required.Defines the native html input type.(email,tel,phone,number,text). Incase a valid pattern is passed to the component, it automatically will use the right input.',
          assistive: 'Not required. Some text to show',
          valid: 'Not required. Allow  handle the input state',
          value:
            'Value used for v-model two-way binding different to model propertie',
          error:
            'Pass a String as a custom error. This will automatically set the input to an error state and display the error message.',
          min:
            'Minimum number of digits for a valid phone number (default: 10)',
          max:
            'Maximum number of digits for a valid phone number (default: 15)',
          autofocus: 'Automatically focus this input 300ms after mounting',
          loading: 'Used for single input forms.',
        },
      },
    }),
    {
      info: {
        summary: `
            Assistive text is displayed underneath the input and should take up a single line.\n
            Notice that the assistive text does not increase the spacing between elements. \n
            For comparison, all inputs are shown inside a container with the standard horizontal
            padding of 1rem.\n
            All input validations have a 300ms delay (debounced) after the last keypress.\n
            No vertical padding is provided, but should be given according to context of use.\n
            All inputs come with a standard margin bottom of 0.5rems.\n
            The dark variant is to be used as the single input inside a form over a dark background.
          `,
      },
    }
  )
  .add(
    'Custom error',
    () => ({
      components: {
        GxInput,
      },
      data() {
        return {
          email: 'a@e.com',
          customError: 'Email already exists',
        }
      },
      template: `
        <div class="w-full">
          <div class="p-4">
            <GxInput v-model="email" placeholder="Do you love me?" label="Do you love me?" icon="account_circle" :error="customError" />
          </div>
          <div class="bg-primary p-4">
            <GxInput v-model="email" dark placeholder="Do you love me?" label="Do you love me?" icon="account_circle" :error="customError" />
          </div>
        </div>
      `,
      propsDescription: {
        GxInput: {
          icon:
            'Required. Name of the icon. https://material.io/tools/icons/?icon=favorite&style=baseline',
          pattern:
            'Not Required. Some cases of validations. Can be numeric, email, phone. When the input lost focus will emit a vue event called valid with a boolean payload.',
          label: 'Required. Input label',
          type:
            'Not required.Defines the native html input type.(email,tel,phone,number,text). Incase a valid pattern is passed to the component, it automatically will use the right input.',
          assistive: 'Not required. Some text to show',
          valid: 'Not required. Allow  handle the input state',
          value:
            'Value used for v-model two-way binding different to model propertie',
          error:
            'Pass a String as a custom error. This will automatically set the input to an error state and display the error message.',
          min:
            'Minimum number of digits for a valid phone number (default: 10)',
          max:
            'Maximum number of digits for a valid phone number (default: 15)',
          autofocus: 'Automatically focus this input 300ms after mounting',
          loading: 'Used for single input forms.',
        },
      },
    }),
    {
      info: {
        summary: `
            The *error* prop can be used to pass a custom error to the input.\n
            Note that this will immediately set the input to an error state and override the assistive text with the given error.\n
            While internal input errors, the *error* prop is useful when passing server side errors that are unavailable until the
            form is submitted.\n
            For comparison, all inputs are shown inside a container with the standard horizontal
            padding of 1rem.\n
            All input validations have a 300ms delay (debounced) after the last keypress.\n
            No vertical padding is provided, but should be given according to context of use.\n
            All inputs come with a standard margin bottom of 0.5rems.\n
            The dark variant is to be used as the single input inside a form over a dark background.
          `,
      },
    }
  )
  .add(
    'Icon right',
    () => ({
      components: {
        GxInput,
      },
      data() {
        return {
          inputValue: 'Bienvenido a Gestionix',
          customError: 'Tu cuenta ya existe',
        }
      },
      methods: {
        rightIconClicked() {
          alert('right icon was clicked')
        },
      },
      template: `
        <div class="w-full">
          <div class="p-4">
            <GxInput v-model="inputValue" placeholder="Do you love me?" label="Do you love me?" icon-right="cloud_upload" @icon-right-click="rightIconClicked" icon="account_circle" :error="customError" />
          </div>
          <div class="bg-primary p-4">
            <GxInput v-model="inputValue" dark placeholder="Do you love me?" label="Do you love me?" icon-right="cloud_upload" @icon-right-click="rightIconClicked" icon="account_circle" :error="customError" />
          </div>
        </div>
      `,
      propsDescription: {
        GxInput: {
          icon:
            'Required. Name of the icon. https://material.io/tools/icons/?icon=favorite&style=baseline',
          pattern:
            'Not Required. Some cases of validations. Can be numeric, email, phone. When the input lost focus will emit a vue event called valid with a boolean payload.',
          label: 'Required. Input label',
          type:
            'Not required.Defines the native html input type.(email,tel,phone,number,text). Incase a valid pattern is passed to the component, it automatically will use the right input.',
          assistive: 'Not required. Some text to show',
          valid: 'Not required. Allow  handle the input state',
          value:
            'Value used for v-model two-way binding different to model propertie',
          error:
            'Pass a String as a custom error. This will automatically set the input to an error state and display the error message.',
          min:
            'Minimum number of digits for a valid phone number (default: 10)',
          max:
            'Maximum number of digits for a valid phone number (default: 15)',
          autofocus: 'Automatically focus this input 300ms after mounting',
          loading: 'Used for single input forms.',
        },
      },
    }),
    {
      info: {
        summary: `
            The *icon-right* prop displays a second icon button to the right of the input.
            Clicking on this icon button will emit a *right-icon-click* event.\n
            Certain input validations, such as *pattern="password"* have their own internal right icon.\n
            For comparison, all inputs are shown inside a container with the standard horizontal
            padding of 1rem.\n
            All input validations have a 300ms delay (debounced) after the last keypress.\n
            No vertical padding is provided, but should be given according to context of use.\n
            All inputs come with a standard margin bottom of 0.5rems.\n
            The dark variant is to be used as the single input inside a form over a dark background.
          `,
      },
    }
  )
  .add(
    'Tax id validation',
    () => ({
      components: {
        GxInput,
      },
      data() {
        return {
          validTaxId: 'TW1123345UJ3',
          invalidTaxId: 'PERJ930208UJ3',
        }
      },
      template: `
        <div class="w-full">
          <div class="p-4">
            <GxInput v-model="validTaxId" placeholder="Tax ID input" label="Tax ID input" icon="account_circle" pattern="taxId" />
           </div>
          <div class="p-4">
            <GxInput v-model="invalidTaxId" placeholder="Tax ID input" label="Tax ID input" icon="account_circle" pattern="taxId" />
          </div>
          <div class="bg-primary p-4">
          <div >
            <GxInput v-model="validTaxId" dark placeholder="Tax ID input" label="Tax ID input" icon="account_circle" pattern="taxId" />
          </div>
          <div class="bg-primary">
            <GxInput v-model="invalidTaxId" dark placeholder="Tax ID input" label="Tax ID input" icon="account_circle" pattern="taxId" />
          </div>
        </div>
      `,
      propsDescription: {
        GxInput: {
          icon:
            'Required. Name of the icon. https://material.io/tools/icons/?icon=favorite&style=baseline',
          pattern:
            'Not Required. Some cases of validations. Can be numeric, no-numeric, email, phone. When the input lost focus will emit a vue event called valid with a boolean payload.',
          label: 'Required. Input label',
          type:
            'Not required.Defines the native html input type.(email,tel,phone,number,text). Incase a valid pattern is passed to the component, it automatically will use the right input.',
          assistive: 'Not required. Some text to show',
          valid: 'Not required. Allow  handle the input state',
          value:
            'Value used for v-model two-way binding different to model propertie',
          error:
            'Pass a String as a custom error. This will automatically set the input to an error state and display the error message.',
          min:
            'Minimum number of digits for a valid phone number (default: 10)',
          max:
            'Maximum number of digits for a valid phone number (default: 15)',
          autofocus: 'Automatically focus this input 300ms after mounting',
          loading: 'Used for single input forms.',
        },
      },
    }),
    {
      info: {
        summary: `
          Focus and blur every input to see invalid and valid state.\n
          Valid tax id format (XXXX000000XXX,XXX000000XXX)\n
          For comparison, all inputs are shown inside a container with the standard horizontal
          padding of 1rem.\n
          All input validations have a 300ms delay (debounced) after the last keypress.\n
          No vertical padding is provided, but should be given according to context of use.\n
          All inputs come with a standard margin bottom of 0.5rems.\n
          The dark variant is to be used as the single input inside a form over a dark background.
        `,
      },
    }
  )
  .add(
    'Email validation',
    () => ({
      components: {
        GxInput,
      },
      data() {
        return {
          validEmail: 'ppp@gmail.com',
          invalidEmail: 'ppp,@gmail.om',
        }
      },
      template: `
        <div class="w-full">
          <div class="p-4">
            <GxInput v-model="validEmail" placeholder="Email input" label="ppppEmail input" icon="account_circle" pattern="email" />
            <GxInput v-model="invalidEmail" placeholder="Email input" label="Email input" icon="account_circle" pattern="email" />
          </div>
          <div class="bg-primary p-4">
            <GxInput v-model="validEmail" dark placeholder="Email input" label="Email input" icon="account_circle" pattern="email" />
            <GxInput v-model="invalidEmail" dark placeholder="Email input" label="Email input" icon="account_circle" pattern="email" />
          </div>
        </div>
      `,
      propsDescription: {
        GxInput: {
          icon:
            'Required. Name of the icon. https://material.io/tools/icons/?icon=favorite&style=baseline',
          pattern:
            'Not Required. Some cases of validations. Can be numeric, no-numeric, email, phone. When the input lost focus will emit a vue event called valid with a boolean payload.',
          label: 'Required. Input label',
          type:
            'Not required.Defines the native html input type.(email,tel,phone,number,text). Incase a valid pattern is passed to the component, it automatically will use the right input.',
          assistive: 'Not required. Some text to show',
          valid: 'Not required. Allow  handle the input state',
          value:
            'Value used for v-model two-way binding different to model propertie',
          error:
            'Pass a String as a custom error. This will automatically set the input to an error state and display the error message.',
          min:
            'Minimum number of digits for a valid phone number (default: 10)',
          max:
            'Maximum number of digits for a valid phone number (default: 15)',
          autofocus: 'Automatically focus this input 300ms after mounting',
          loading: 'Used for single input forms.',
        },
      },
    }),
    {
      info: {
        summary: `
          Email validation.\n
          For comparison, all inputs are shown inside a container with the standard horizontal
          padding of 1rem.\n
          All input validations have a 300ms delay (debounced) after the last keypress.\n
          No vertical padding is provided, but should be given according to context of use.\n
          All inputs come with a standard margin bottom of 0.5rems.\n
          The dark variant is to be used as the single input inside a form over a dark background.
        `,
      },
    }
  )
  .add(
    'Phone validation',
    () => ({
      components: {
        GxInput,
      },
      data() {
        return {
          invalidPhone: '12345679',
          validPhone: '1234567991',
        }
      },
      template: `
        <div class="w-full pb-4">
          <div class="pb-8">
            <GxInput class="pb-8" v-model="validPhone" placeholder="Phone input" label="Phone input" icon="account_circle" pattern="phone" />
            <GxInput class="pb-8" v-model="invalidPhone" placeholder="Phone input" label="Phone input" icon="account_circle" pattern="phone" />
          </div>
          <div class="bg-primary py-8">
            <GxInput class="pb-8" v-model="validPhone" dark placeholder="Phone input" label="Phone input" icon="account_circle" pattern="phone" />
            <GxInput  class="pb-8" v-model="invalidPhone" dark placeholder="Phone input" label="Phone input" icon="account_circle" pattern="phone" />
          </div>
        </div>
      `,
      propsDescription: {
        GxInput: {
          icon:
            'Required. Name of the icon. https://material.io/tools/icons/?icon=favorite&style=baseline',
          pattern:
            'Not Required. Some cases of validations. Can be numeric, no-numeric, email, phone. When the input lost focus will emit a vue event called valid with a boolean payload.',
          label: 'Required. Input label',
          type:
            'Not required.Defines the native html input type.(email,tel,phone,number,text). Incase a valid pattern is passed to the component, it automatically will use the right input.',
          assistive: 'Not required. Some text to show',
          valid: 'Not required. Allow  handle the input state',
          size: 'Not required. Just for pattern phone.(telephone lenght)',
          value:
            'Value used for v-model two-way binding different to model propertie',
          error:
            'Pass a String as a custom error. This will automatically set the input to an error state and display the error message.',
          min:
            'Minimum number of digits for a valid phone number (default: 10)',
          max:
            'Maximum number of digits for a valid phone number (default: 15)',
          autofocus: 'Automatically focus this input 300ms after mounting',
          loading: 'Used for single input forms.',
        },
      },
    }),
    {
      info: {
        summary: `
          The default length for a valid phone number is between 10 and 15 digits.\n
          These values can be overriden using the *min* and *max* props.\n
          For comparison, all inputs are shown inside a container with the standard horizontal
          padding of 1rem.\n
          All input validations have a 300ms delay (debounced) after the last keypress.\n
          No vertical padding is provided, but should be given according to context of use.\n
          All inputs come with a standard margin bottom of 0.5rems.\n
          The dark variant is to be used as the single input inside a form over a dark background.
        `,
      },
    }
  )
  .add(
    'No-numeric validation',
    () => ({
      components: {
        GxInput,
      },
      data() {
        return {
          validInput: 'alphanumeric',
        }
      },
      template: `
        <div class="w-full">
          <div class="p-4">
            <GxInput v-model="validInput" placeholder="Non-numeric input" label="Non-numeric input" icon="account_circle" pattern="no-numeric" />
          </div>
          <div class="bg-primary p-4">
            <GxInput v-model="validInput" dark placeholder="Non-numeric input" label="Non-numeric input" icon="account_circle" pattern="no-numeric" />
          </div>
        </div>
      `,
      propsDescription: {
        GxInput: {
          icon:
            'Required. Name of the icon. https://material.io/tools/icons/?icon=favorite&style=baseline',
          pattern:
            'Not Required. Some cases of validations. Can be numeric, no-numeric, email, phone. When the input lost focus will emit a vue event called valid with a boolean payload.',
          label: 'Required. Input label',
          type:
            'Not required.Defines the native html input type.(email,tel,phone,number,text). Incase a valid pattern is passed to the component, it automatically will use the right input.',
          assistive: 'Not required. Some text to show',
          valid: 'Not required. Allow  handle the input state',
          size: 'Not required. Just for pattern phone.(telephone lenght)',
          value:
            'Value used for v-model two-way binding different to model propertie',
          error:
            'Pass a String as a custom error. This will automatically set the input to an error state and display the error message.',
          min:
            'Minimum number of digits for a valid phone number (default: 10)',
          max:
            'Maximum number of digits for a valid phone number (default: 15)',
          autofocus: 'Automatically focus this input 300ms after mounting',
          loading: 'Used for single input forms.',
        },
      },
    }),
    {
      info: {
        summary: `
          A non numeric input cannot be in an invalid state since numeric characters are pruned automatically.\n
          Try entering a number.\n
          For comparison, all inputs are shown inside a container with the standard horizontal
          padding of 1rem.\n
          All input validations have a 300ms delay (debounced) after the last keypress.\n
          No vertical padding is provided, but should be given according to context of use.\n
          All inputs come with a standard margin bottom of 0.5rems.\n
          The dark variant is to be used as the single input inside a form over a dark background.
        `,
      },
    }
  )
  .add(
    'Numeric validation',
    () => ({
      components: {
        GxInput,
      },
      data() {
        return {
          validInput: '121345',
        }
      },
      template: `
        <div class="w-full">
          <div class="p-4">
            <GxInput v-model="validInput" placeholder="Numeric input" label="Numeric input" icon="account_circle" pattern="numeric" />
          </div>
          <div class="bg-primary p-4">
            <GxInput v-model="validInput" dark placeholder="Numeric input" label="Numeric input" icon="account_circle" pattern="numeric" />
          </div>
        </div>
      `,
      propsDescription: {
        GxInput: {
          icon:
            'Required. Name of the icon. https://material.io/tools/icons/?icon=favorite&style=baseline',
          pattern:
            'Not Required. Some cases of validations. Can be numeric, no-numeric, email, phone. When the input lost focus will emit a vue event called valid with a boolean payload.',
          label: 'Required. Input label',
          type:
            'Not required.Defines the native html input type.(email,tel,phone,number,text). Incase a valid pattern is passed to the component, it automatically will use the right input.',
          assistive: 'Not required. Some text to show',
          valid: 'Not required. Allow  handle the input state',
          size: 'Not required. Just for pattern phone.(telephone lenght)',
          value:
            'Value used for v-model two-way binding different to model propertie',
          error:
            'Pass a String as a custom error. This will automatically set the input to an error state and display the error message.',
          min:
            'Minimum number of digits for a valid phone number (default: 10)',
          max:
            'Maximum number of digits for a valid phone number (default: 15)',
          autofocus: 'Automatically focus this input 300ms after mounting',
          loading: 'Used for single input forms.',
        },
      },
    }),
    {
      info: {
        summary: `
          A numeric input cannot be in an invalid state since non-numeric characters are pruned automatically.\n
          Try entering a letter.\n
          For comparison, all inputs are shown inside a container with the standard horizontal
          padding of 1rem.\n
          All input validations have a 300ms delay (debounced) after the last keypress.\n
          No vertical padding is provided, but should be given according to context of use.\n
          All inputs come with a standard margin bottom of 0.5rems.\n
          The dark variant is to be used as the single input inside a form over a dark background.
        `,
      },
    }
  )
  .add(
    'Password validation',
    () => ({
      methods: {
        isValid(val) {
          this.validInput = val
        },
      },
      components: {
        GxInput,
      },
      data() {
        return {
          password: '1230Aaee',
        }
      },
      template: `
        <div class="w-full">
          <div class="p-4">
            <GxInput v-model="password" placeholder="Password input" label="Password input" pattern="password" />
          </div>
          <div class="bg-primary p-4">
            <GxInput v-model="password" dark placeholder="Password input" label="Password input" pattern="password" />
          </div>
        </div>
      `,

      propsDescription: {
        GxInput: {
          icon:
            'Required. Name of the icon. https://material.io/tools/icons/?icon=favorite&style=baseline',
          pattern:
            'Not Required. Some cases of validations. Can be numeric, no-numeric, email, phone. When the input lost focus will emit a vue event called valid with a boolean payload.',
          label: 'Required. Input label',
          type:
            'Not required.Defines the native html input type.(email,tel,phone,number,text). Incase a valid pattern is passed to the component, it automatically will use the right input.',
          assistive: 'Not required. Some text to show',
          valid: 'Not required. Allow  handle the input state',
          size: 'Not required. Just for pattern phone.(telephone lenght)',
          value:
            'Value used for v-model two-way binding different to model propertie',
          error:
            'Pass a String as a custom error. This will automatically set the input to an error state and display the error message.',
          min:
            'Minimum number of digits for a valid phone number (default: 10)',
          max:
            'Maximum number of digits for a valid phone number (default: 15)',
          autofocus: 'Automatically focus this input 300ms after mounting',
          loading: 'Used for single input forms.',
        },
      },
      eventDescription: {
        valid:
          'To use valid event create a method that recieves a payload to return if password input is true or false.',
      },
    }),
    {
      info: {
        summary: `
          Accepts numbers and letters.\n
          Requires at least one upper-case letter, and a min. of 8 character to be valid.\n
          For comparison, all inputs are shown inside a container with the standard horizontal
          padding of 1rem.\n
          All input validations have a 300ms delay (debounced) after the last keypress.\n
          No vertical padding is provided, but should be given according to context of use.\n
          All inputs come with a standard margin bottom of 0.5rems.\n
          The dark variant is to be used as the single input inside a form over a dark background.
        `,
      },
    }
  )
  .add(
    'loading',
    () => ({
      methods: {
        isValid(val) {
          this.validInput = val
        },
      },
      components: {
        GxInput,
      },
      data() {
        return {
          password: '1230Aaee',
        }
      },
      template: `
        <div class="w-full">
          <div class="p-4">
            <GxInput :loading="true" v-model="password" placeholder="Password input" label="Password input" pattern="password" />
          </div>
          <div class="bg-primary p-4">
            <GxInput :loading="true" v-model="password" dark placeholder="Password input" label="Password input" pattern="password" />
          </div>
        </div>
      `,

      propsDescription: {
        GxInput: {
          icon:
            'Required. Name of the icon. https://material.io/tools/icons/?icon=favorite&style=baseline',
          pattern:
            'Not Required. Some cases of validations. Can be numeric, no-numeric, email, phone. When the input lost focus will emit a vue event called valid with a boolean payload.',
          label: 'Required. Input label',
          type:
            'Not required.Defines the native html input type.(email,tel,phone,number,text). Incase a valid pattern is passed to the component, it automatically will use the right input.',
          assistive: 'Not required. Some text to show',
          valid: 'Not required. Allow  handle the input state',
          size: 'Not required. Just for pattern phone.(telephone lenght)',
          value:
            'Value used for v-model two-way binding different to model propertie',
          error:
            'Pass a String as a custom error. This will automatically set the input to an error state and display the error message.',
          min:
            'Minimum number of digits for a valid phone number (default: 10)',
          max:
            'Maximum number of digits for a valid phone number (default: 15)',
          autofocus: 'Automatically focus this input 300ms after mounting',
          loading: 'Used for single input forms.',
        },
      },
      eventDescription: {
        valid:
          'To use valid event create a method that recieves a payload to return if password input is true or false.',
      },
    }),
    {
      info: {
        summary: `
          Used for single input forms to show a loading state. Prefer the button loading in most cases.\n
          For comparison, all inputs are shown inside a container with the standard horizontal
          padding of 1rem.\n
          All input validations have a 300ms delay (debounced) after the last keypress.\n
          No vertical padding is provided, but should be given according to context of use.\n
          All inputs come with a standard margin bottom of 0.5rems.\n
          The dark variant is to be used as the single input inside a form over a dark background.
        `,
      },
    }
  )
  .add(
    'ciec or csd',
    () => ({
      methods: {
        isValid(val) {
          this.validInput = val
        },
      },
      components: {
        GxInput,
      },
      data() {
        return {
          ciec: '',
          csd: '',
        }
      },
      template: `
        <div class="w-full">
          <div class="p-4">
            <GxInput v-model="ciec" placeholder="ciec input" label="CIEC" pattern="ciec" />
          </div>
          <div class="bg-primary p-4">
            <GxInput v-model="csd" dark placeholder="CSD input" label="CSD" pattern="csd" />
          </div>
        </div>
      `,

      propsDescription: {
        GxInput: {
          icon:
            'Required. Name of the icon. https://material.io/tools/icons/?icon=favorite&style=baseline',
          pattern:
            'Not Required. Some cases of validations. Can be numeric, no-numeric, email, phone. When the input lost focus will emit a vue event called valid with a boolean payload.',
          label: 'Required. Input label',
          type:
            'Not required.Defines the native html input type.(email,tel,phone,number,text). Incase a valid pattern is passed to the component, it automatically will use the right input.',
          assistive: 'Not required. Some text to show',
          valid: 'Not required. Allow  handle the input state',
          size: 'Not required. Just for pattern phone.(telephone lenght)',
          value:
            'Value used for v-model two-way binding different to model propertie',
          error:
            'Pass a String as a custom error. This will automatically set the input to an error state and display the error message.',
          min:
            'Minimum number of digits for a valid phone number (default: 10)',
          max:
            'Maximum number of digits for a valid phone number (default: 15)',
          autofocus: 'Automatically focus this input 300ms after mounting',
          loading: 'Used for single input forms.',
        },
      },
      eventDescription: {
        valid:
          'To use valid event create a method that recieves a payload to return if input is true or false.',
      },
    }),
    {
      info: {
        summary: `
          Used for single input forms to get CIEC password or CSD password.\n
          For comparison, all inputs are shown inside a container with the standard horizontal
          padding of 1rem.\n
          Input won't accept special characters except -._%&
          No vertical padding is provided, but should be given according to context of use.\n
          All inputs come with a standard margin bottom of 0.5rems.\n
          The dark variant is to be used as the single input inside a form over a dark background.
        `,
      },
    }
  )
  .add(
    'business-name',
    () => ({
      methods: {
        isValid(val) {
          this.validInput = val
        },
      },
      components: {
        GxInput,
      },
      data() {
        return {
          businessName: '',
        }
      },
      template: `
          <div class="p-4 w-full">
            <GxInput v-model="businessName" placeholder="Nombre o Razón Social" label="Nombre o Razón Social" pattern="business-name" />
          </div>
      `,

      propsDescription: {
        GxInput: {
          icon:
            'Required. Name of the icon. https://material.io/tools/icons/?icon=favorite&style=baseline',
          pattern:
            'Not Required. Some cases of validations. Can be numeric, no-numeric, email, phone. When the input lost focus will emit a vue event called valid with a boolean payload.',
          label: 'Required. Input label',
          type:
            'Not required.Defines the native html input type.(email,tel,phone,number,text). Incase a valid pattern is passed to the component, it automatically will use the right input.',
          assistive: 'Not required. Some text to show',
          valid: 'Not required. Allow  handle the input state',
          size: 'Not required. Just for pattern phone.(telephone lenght)',
          value:
            'Value used for v-model two-way binding different to model propertie',
          error:
            'Pass a String as a custom error. This will automatically set the input to an error state and display the error message.',
          min:
            'Minimum number of digits for a valid phone number (default: 10)',
          max:
            'Maximum number of digits for a valid phone number (default: 15)',
          autofocus: 'Automatically focus this input 300ms after mounting',
          loading: 'Used for single input forms.',
        },
      },
      eventDescription: {
        valid:
          'To use valid event create a method that recieves a payload to return if input is true or false.',
      },
    }),
    {
      info: {
        summary: `
          Used for single input forms to get business name.\n
          For comparison, all inputs are shown inside a container with the standard horizontal
          padding of 1rem.\n
          Input won't accept special characters except -.&-@
          No vertical padding is provided, but should be given according to context of use.\n
          All inputs come with a standard margin bottom of 0.5rems.\n
          The dark variant is to be used as the single input inside a form over a dark background.
        `,
      },
    }
  )
  .add(
    'file',
    () => ({
      methods: {
        onDeskInput(evt) {
          const file =
            evt &&
            evt.target &&
            evt.target.files &&
            evt.target.files.length &&
            evt.target.files[0]
          if (file) {
            const regex = /.*\.cer$/g
            if (regex.test(file.name)) {
              this.cerName = file.name
              this.csdInfo.cer = file
            } else {
              this.cerName = ''
              this.fileError = true
            }
          }
        },
      },
      components: {
        GxInput,
      },
      data() {
        return {
          csdInfo: {
            cer: '',
          },
          cerName: '',
        }
      },
      template: `
          <div class="p-4 w-full">
          <GxInput
          :value="cerName"
          label="Certificado (.cer)"
          placeholder="Certificado (.cer)"
          :icon-right="cerName ? 'check_circle' : 'search'"
          type="file"
          accept=".cer"
          class="mr-2"
          @input="onDeskInput"
        />
          </div>
      `,

      propsDescription: {
        GxInput: {
          icon:
            'Required. Name of the icon. https://material.io/tools/icons/?icon=favorite&style=baseline',
          pattern:
            'Not Required. Some cases of validations. Can be numeric, no-numeric, email, phone. When the input lost focus will emit a vue event called valid with a boolean payload.',
          label: 'Required. Input label',
          type:
            'Not required.Defines the native html input type.(email,tel,phone,number,text). Incase a valid pattern is passed to the component, it automatically will use the right input.',
          assistive: 'Not required. Some text to show',
          valid: 'Not required. Allow  handle the input state',
          size: 'Not required. Just for pattern phone.(telephone lenght)',
          value:
            'Value used for v-model two-way binding different to model propertie',
          error:
            'Pass a String as a custom error. This will automatically set the input to an error state and display the error message.',
          min:
            'Minimum number of digits for a valid phone number (default: 10)',
          max:
            'Maximum number of digits for a valid phone number (default: 15)',
          autofocus: 'Automatically focus this input 300ms after mounting',
          loading: 'Used for single input forms.',
        },
      },
      eventDescription: {
        valid:
          'To use valid event create a method that recieves a payload to return if input is true or false.',
      },
    }),
    {
      info: {
        summary: `
          Used for single input forms to select a file.\n
          Input type file will emit event.
          Father component will handle file validation.
          File name can be assigned as the value property to be shown after validation.
          No vertical padding is provided, but should be given according to context of use.\n
          All inputs come with a standard margin bottom of 0.5rems.\n
          The dark variant is to be used as the single input inside a form over a dark background.
        `,
      },
    }
  )
