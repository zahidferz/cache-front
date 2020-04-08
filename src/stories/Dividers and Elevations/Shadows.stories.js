import { storiesOf } from '@storybook/vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Dividers and Elevations/Shadows (Elevations)', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Box Shadows',
    () => ({
      template: `
      <div class="justify-around w-full">
        <h1 class="gx-h3 mb-4">Box Shadows Mobile</h1>
        <h2 class="gx-h5 mb-4">shadow-#</h2>
          <div class="flex justify-between mb-8">
             <div class="h-20 w-20 shadow-1 mb-4">1</div>
              <div class="h-20 w-20 shadow-3 mb-4" >2</div>
              <div class="h-20 w-20 shadow-3 mb-4">3</div>
          </div>
          <div class="flex justify-between mb-8">
              <div class="h-20 w-20 shadow-4 mb-4">4</div>
              <div class="h-20 w-20 shadow-5 mb-4">5</div>
              <div class="h-20 w-20 shadow-6 mb-4">6</div>
          </div>
          <div class="flex justify-between mb-8">
              <div class="h-20 w-20 shadow-7 mb-4">7</div>
              <div class="h-20 w-20 shadow-8 mb-8">8</div>
              <div class="h-20 w-20 shadow-9 mb-8">9</div>
          </div>
        </div>
      </div>
      `,
    }),
    {
      info: {
        summary: `Shadows are provided to give shape and dimension to flat design elements. *Shadows can express the degree of elevation between surfaces*. <a href="https://material.io/design/environment/elevation.html#depicting-elevation">Material design Elevations</a>
        \n These are defined by <a href="https://tailwindcss.com/docs/shadows/#app">tailwind</a> class <b>shadow-x</b>, with x between 1 and 9.
        \n Mobile shadows use the prefix shadow and are used for <b>mobile</b> versions: <b>shadow-x</b> For example: *shadow-1*, *shadow-3*.
        \n According to the UI kit This are the uses for these shadows :
        * none : Usually used to show a clickable element is pressed
        * mo-1 : Enabled buttons, FABS, circled buttons and cards
        *
        \n Other elevations will depend on the context given. The more elevated will be the one with more importance.
        `,
      },
    }
  )
  .add(
    'Desktop Box Shadows',
    () => ({
      template: `
      <div>
        <div class="w-full p-4">
          <h1 class="gx-h3 mb-4">Box Shadows Desktop</h1>
          <h2 class="gx-h5 mb-4">shadow-#</h2>
          <div class="flex  mb-8">
            <div class="h-20 w-20 rounded-lg shadow-1 mx-4">1</div>
            <div class="h-20 w-20 rounded-lg shadow-2 mx-4" >2</div>
            <div class="h-20 w-20 rounded-lg shadow-3 mx-4" >3</div>
            <div class="h-20 w-20 rounded-lg shadow-4 mx-4" >4</div>
            <div class="h-20 w-20 rounded-lg shadow-5 mx-4" >5</div>
            <div class="h-20 w-20 rounded-lg shadow-9 mx-4" >9</div>
          </div>
        </div>
        <div class="w-full p-4 bg-primary">
          <h1 class="gx-h3 mb-4">Box Shadows Desktop on Dark Background</h1>
          <h2 class="gx-h5 mb-4">shadow-#</h2>
          <div class="flex  mb-8">
            <div class="bg-white h-20 w-20 rounded-lg shadow-1 mx-4">1</div>
            <div class="bg-white h-20 w-20 rounded-lg shadow-6 mx-4" >6</div>
            <div class="bg-white h-20 w-20 rounded-lg shadow-7 mx-4" >7</div>
            <div class="bg-white h-20 w-20 rounded-lg shadow-8 mx-4" >8</div>
          </div>
        </div>
      </div>
      `,
    }),
    {
      info: {
        summary: `Shadows are provided to give shape and dimension to flat design elements. *Shadows can express the degree of elevation between surfaces*. <a href="https://material.io/design/environment/elevation.html#depicting-elevation">Material design Elevations</a>
        \n These are defined by <a href="https://tailwindcss.com/docs/shadows/#app">tailwind</a> class <b>shadow-x</b>, with x between 1 and 9.
        \n Desktop shadows use the prefix shadow and are used for <b>desktop</b> versions: <b>shadow-x</b> For example: *shadow-1*, *shadow-3*.
        \n According to the UI kit This are the uses for these shadows :
        * none : Usually used to show a clickable element is being pressed
        * mo-1 : clickable elements
        * mo-2 : clickable elements
        \n Other elevations will depend on the context given. The more elevated will be the one with more importance.
        `,
      },
    }
  )
