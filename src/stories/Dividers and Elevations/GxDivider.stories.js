import { storiesOf } from '@storybook/vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'
import GxDivider from '@components/_Core/Dividers/GxDivider.vue'

storiesOf('Dividers and Elevations/GxDivider', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Divider',
    () => ({
      components: {
        GxDivider,
      },
      template: `
      <div class="w-full">
         <h1 class="gx-h3 mb-8">Full-bleed divider </h1>
        <div class="flex items-center h-24 w-full bg-primary-500 mb-8">
            <GxDivider  />
        </div>

        <div>
         <h1 class="gx-h3 mb-8">Inset dividers</h1>
        <div class="flex items-center h-24 w-full bg-primary-500 px-2 mb-2">
            <GxDivider  />
        </div>
        <div class="flex items-center h-24 w-full bg-primary-500 px-4 mb-2">
            <GxDivider  />
        </div>
        <div class="flex items-center h-24 w-full bg-primary-500 px-8 mb-2">
            <GxDivider  />
        </div>
        </div>
      </div>
        `,
    }),
    {
      info: {
        summary: `A Divider is used to separete texts or elements.
        \n Its color is defined using <a href="https://tailwindcss.com/docs/colors/#customizing">Tailwind</a> classes, with a default value of **gray-400**.
        \n A <b>full bleed</b> divider extends the whole width of the container element. Click <a href="https://material.io/design/components/dividers.html#usage"> here </a> to see more ideas about Material Design <b>Dividers</b>
        \n To create and <b>inset</b> divider use a *px-x* class on the container element. Paddings adapt to the ideal spacing scale of <b>px-2</b> (0.5 rem), <b>px-4</b> (1 rem) and <b>px-8</b> (2 rem) as shown in the example.
        \n <b>IMPORTANT</b>: container elements are responsible for positioning the divider (e.g. centering). In the examples above, container elements define a fixed height, and center the divider using flexbox classes.`,
      },
    }
  )
