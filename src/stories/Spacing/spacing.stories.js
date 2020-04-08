import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import CenterDecorator from '../addons/CenterDecorator'
import GxButton from '../../components/_Core/globals/Buttons/GxButton.vue'
import GxInput from '../../components/_Core/Forms/GxInput.vue'

storiesOf('Spacing/spacing', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'general rules',
    () => ({
      components: {
        GxButton,
        GxInput,
      },
      template: `
        <div class="bg-secondary-100 px-4 pt-8 w-full ">
          <h2 class="gx-h2">Lorem ipsum</h2>
          <div class="mt-4 mb-8">
              <p class="gx-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem lacus, placerat sit amet auctor et, fermentum quis dui. Donec luctus dapibus purus ut volutpat. Curabitur urna nulla, pretium eget turpis nec, sagittis ultrices augue. Nullam congue neque id elit ornare, id elementum purus tincidunt. Duis semper vehicula velit ac semper.</p>
              <p class="gx-body font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem lacus, placerat sit amet auctor et, fermentum quis dui. Donec luctus dapibus purus ut volutpat. Curabitur urna nulla, pretium eget turpis nec, sagittis ultrices augue. Nullam congue neque id elit ornare, id elementum purus tincidunt. Duis semper vehicula velit ac semper.</p>
            </div>
            <div>
              <GxButton>B1</GxButton>
            </div>
          </div>
      `,
    }),
    {
      info: {
        summary: `
          Spacing is based on <a href="https://tailwindcss.com/docs/shadows/#app">tailwind</a> spacing classes where paddings and margins are expressed as <b>.p{side?}-{size}</b> and <b>.m{side?}-{size}</b> classes.
          \n Each size grows <b>0.25 rems</b>, for example: <b>mt-1</b>, means <b>0.25 rem</b> margin top, <b>mt-2</b> means <b>0.5 rem</b> margin top, and so on.
          \n As in the example above, container should have <b>1rem</b> of padding horizontally minimum(*px-4*).
          \n <b>Ideal space</b>  between elements (e.g above, text and button elements) is <b>2 rem</b> (number 8 on tailwind), or in some cases, <b>1 rem</b> (4 on tailwind). Minimum space is <b>0.5 rem</b> (expressed with number 2 in tailwind), .
          \n <b>Ideal space</b>  between <b>Header</b> or <b>Navbars</b> and the first element is <b>2 rem</b>. As the Header is marginless by default, a padding top of 2 rems should be added.
          \n <b>Ideal space</b>  between <b>Header</b>, <b>overline</b>, <b>captions</b>, <b>subtitles</b> and a default font parragraph (gx-body) is <b>1 rem</b>. As this elements are marginless by default, a padding top of 1 rem should be added in the parragraph with the default font (gx-body).


          `,
      },
    }
  )
  .add(
    'buttons and inputs',
    () => ({
      data() {
        return {
          inputValue: '',
        }
      },
      components: {
        GxButton,
        GxInput,
      },
      template: `
        <div class="flex flex-col w-full p-4">
          <GxInput v-model="inputValue" label="My input" placeholder="my input"/>
          <GxButton>Button 1</GxButton>
          <GxButton disabled>Button 2</GxButton>
        </div>
      `,
    }),
    {
      info: {
        summary: `
          Buttons and input spacing is by default defined with 0.5 rem margin bottom (*mb-2*), which is the minimum.
          \n When the number of elements and screen size allow a margin of <b>1 o 2 rems</b>, should be used.
          \n To overwrite the default margin bottom, simply add a class of <b>mb-4</b> (1rem) or <b>mb-8</b> (2rem).
          `,
      },
    }
  )
