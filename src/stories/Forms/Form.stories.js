import { storiesOf } from '@storybook/vue'
import GxInput from '../../components/_Core/Forms/GxInput.vue'
// import GxButton from '../../components/_Core/Buttons/GxButton.vue' // Now a global
// import GxTextLink from '../../components/_Core/Buttons/GxTextLink.vue' // Now a global
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Forms/Form', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Example',
    () => ({
      components: {
        GxInput,
        // GxButton,
        // GxTextLink,
      },
      data() {
        return {
          userEmail: 'wrongmail@mail.com',
          password: 'Wrongpassword123',
          invalidPassword: true,
          invalidEmail: true,
          customErrorEmail: '',
          customErrorPassword: '',
          authError: 'Wrong email or password',
          collapseImage: false,
          bgImg: require('@src/assets/images/DE/Login/de_002_fondo.svg'),
        }
      },
      template: `
      <div class="bg-primary-600 p-4">
        <form >
          <GxInput
            v-model="userEmail"
            dark
            label="Correo Electrónico"
            placeholder="Correo Electrónico"
            icon="email"
            class="mr-2"
            pattern="email"
            autofocus
          ></GxInput>
          <GxInput
            v-model="password"
            placeholder="Contraseña"
            dark
            label="Contraseña"
            class="mr-2"
            pattern="password"
          />
          <p class="text-white text-center mb-2"> {{ authError }} </p>
          <GxButton class="mx-auto" dark type="submit"
            >Entrar</GxButton
          >
        </form>
        <div class="flex w-full justify-center text-white ">
          <GxTextLink  class=" mr-1 font-bold"
            >Regístrate</GxTextLink
          >
          <span class="mr-1"> | </span>
          <GxTextLink  class="font-bold">
            Recuperar contraseña</GxTextLink
          >
        </div>
        </div>

      `,
    }),
    {
      info: {
        summary: `
         This is a form example. Notice general errors must be placed 8px (0.5rems) above the submit button. Secondary actions (text links) go 8px under the button.
          `,
      },
    }
  )
