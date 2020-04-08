import { storiesOf } from '@storybook/vue'
import GxTextAreaTags from '../../components/_Core/Forms/GxTextAreaTags'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Forms/GxTextAreaTags', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'default',
    () => ({
      components: {
        GxTextAreaTags,
      },
      data() {
        return {
          tags: [],
        }
      },
      template: `<GxTextAreaTags v-model="tags" placeholder="Añade un email" label="Correos de invitación" />`,
    }),
    {
      info: {
        summary: `
          Add comma separated values as chips.\n
          Accepts a validator function to determine if entered values are correct. Defaults to emails.\n
          Returns an array of values via the v-model binding.\n
          GxTextAreaTags takes 100% of container width.
        `,
      },
    }
  )
  .add(
    'dark',
    () => ({
      components: {
        GxTextAreaTags,
      },
      data() {
        return {
          tags: [],
        }
      },
      template: `
        <div class="p-4 bg-primary w-full">
          <GxTextAreaTags dark v-model="tags" placeholder="Añade un email" label="Correos de invitación" />
        </div>
      `,
    }),
    {
      info: {
        summary: `
          Add comma separated values as chips.\n
          Accepts a validator function to determine if entered values are correct. Defaults to emails.\n
          Returns an array of values via the v-model binding.\n
          GxTextAreaTags takes 100% of container width.
        `,
      },
    }
  )
