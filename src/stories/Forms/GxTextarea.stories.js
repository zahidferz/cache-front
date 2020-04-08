import { storiesOf } from '@storybook/vue'
import GxTextArea from '../../components/_Core/Forms/GxTextArea'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Forms/GxTextArea', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'default',
    () => ({
      components: {
        GxTextArea,
      },
      data() {
        return {
          someData: '',
        }
      },
      template:
        '<GxTextArea v-model="someData" tooltip="Some helper text" label="Text area" placeholder="Text area" />',
    }),
    {
      info: {
        summary: `
          GxTextArea adopta el 100% del ancho del contenedor.\n
          Puedes pasar el texto para un tooltip. Esto añade el ícono de ayuda y muestra el texto en un modal al hacer clic en el ícono.
        `,
      },
    }
  )
  .add(
    'dark',
    () => ({
      components: {
        GxTextArea,
      },
      data() {
        return {
          someData: '',
        }
      },
      template: `
        <div class="p-4 bg-primary w-full">
          <GxTextArea dark v-model="someData" tooltip="Some helper text" label="Text area" placeholder="Text area" />
        </div>
      `,
    }),
    {
      info: {
        summary: `
          GxTextArea adopta el 100% del ancho del contenedor.\n
          Puedes pasar el texto para un tooltip. Esto añade el ícono de ayuda y muestra el texto en un modal al hacer clic en el ícono.
        `,
      },
    }
  )
