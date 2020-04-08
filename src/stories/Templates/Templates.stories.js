import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import Layout from '@src/router/layouts/LayoutMain.vue'
import GxInput from '@components/_Core/Forms/GxInput'
import GxButton from '@components/_Core/globals/Buttons/GxButton'
import GxIcon from '@components/_Core/Icons/GxIcon'
import StoryRouter from 'storybook-vue-router'
import GxTextLink from '../../components/_Core/globals/Buttons/GxTextLink.vue'
import '../Layouts/layoutStories.css'
import './templateStories_mobileFormDark.css'

storiesOf('Templates', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .add('Mobile form dark', () => ({
    components: {
      Layout,
      GxInput,
      GxButton,
      GxIcon,
      GxTextLink,
    },
    data() {
      return {
        image: require('@src/assets/images/Login/mo_002_astronauta.svg'),
        userEmail: '',
        password: '',
        invalidPassword: true,
        invalidEmail: true,
        customErrorEmail: '',
        customErrorPassword: '',
        authError: null,
      }
    },
    methods: {
      clicked(msg) {
        alert(msg)
      },
    },
    template: `
      <div id="app" class="text-black gx-body gx-body-sm bg-white" style="height: 100%">
          <Layout dark>
            <!-- Your custom code should begin here -->
            <div class="flex-grow flex flex-col backgroundColor">
              <div class="overflow-x-hidden gxFormImageContainer">
                <img
                  :src="image"
                  class="gxFormImage"
                  alt="Form image alt text"
                />
              </div>
              <div
                class="rounded-t-lg flex-grow bg-primary-2 p-4 justify-between flex flex-col"
              >
                <div class="mb-8 text-white">
                  <h2 class="gx-h3 text-center text-white mb-4">El título en h3</h2>
                  <p class="mb-4">El espaciado entre título y textos es de 1rem.</p>
                  <p>El espaciado entre el área de textos y el form es de 2rem.</p>
                </div>
                <form @submit.prevent="onSubmit">
                  <GxInput
                    v-model="userEmail"
                    dark
                    label="Correo Electrónico"
                    placeholder="Correo Electrónico"
                    icon="email"
                    class="mr-2"
                    pattern="email"
                    autofocus
                    :error="customErrorEmail"
                    @valid="invalidEmail = $event"
                  ></GxInput>
                  <GxInput
                    v-model="password"
                    placeholder="Contraseña"
                    dark
                    label="Contraseña"
                    class="mr-2"
                    pattern="password"
                    :error="customErrorPassword"
                    @valid="invalidPassword = $event"
                  />
                  <p v-if="authError" class="text-alert">{{ authError }}</p>
                  <div class="flex justify-center ">
                    <GxButton dark type="submit">Entrar</GxButton>
                  </div>
                  <div class="flex w-full justify-center text-white ">
                    <GxTextLink  class=" mr-1 font-bold"
                      >Link</GxTextLink
                    >
                    <span class="mr-1"> | </span>
                    <GxTextLink  class="font-bold">
                      Otro link</GxTextLink
                    >
                  </div>
                </form>
                <div class="flex w-full justify-center text-white mt-8">
                  <GxTextLink  class=" mr-1 font-bold"
                    >Link no relacionado a 2rem del form</GxTextLink>
                </div>
              </div>
            </div>
          </Layout>
        </div>
      `,
  }))
