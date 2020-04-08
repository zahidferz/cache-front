import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Text', module)
  .addDecorator(withInfo)
  .add(
    'Example All',
    () => ({
      template: `
       <div class="gx-body p-2">
         <h1 class="gx-h1">Hello, World in gx-h1.</h1>
         <h2 class="gx-h2">An Adaptable Foundation in gx-h2.</h2>
         <div class="flex flex-col sm:flex-row">
           <div>
             <h6 class="gx-h6">Headline 6</h6>
             <p class="mt-4">Apparently dolor sit amet, consectetur adipiscing elit. Sed lorem lacus, placerat sit amet auctor et, fermentum quis dui. Donec luctus dapibus purus ut volutpat. Curabitur urna nulla, pretium eget turpis nec, sagittis </p>
           </div>
           <div>
             <h4 class="gx-h4">Headline 4</h4>
             <h5 class="gx-h5">Headline 5</h5>
             <p class="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem lacus, placerat sit amet auctor et, fermentum quis dui. Donec luctus dapibus purus ut volutpat. Curabitur urna nulla, pretium eget turpis nec, sagittis ultrices augue. Nullam congue.</p>
           </div>
           <div>
             <p>Body 1</p>
             <p class="gx-caption">Caption</p>
             <p class="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem lacus, placerat sit amet auctor et, fermentum quis dui. Donec luctus dapibus purus ut volutpat. Curabitur urna nulla, pretium eget turpis nec, sagittis ultrices augue. Nullam congue.</p>
           </div>
         </div>
       </div>
     `,
    }),
    {
      info: {
        summary: `
     This is an example of all of our fonts together. Do not add extra margin on headlines, subtitles or overlines.
               \n <b>Ideal space</b>  between <b>Header</b>, <b>overline</b>, <b>captions</b>, <b>subtitles</b> and a default font parragraph (gx-body) is <b>1 rem</b>.
               \n As these elements are marginless by default, a <b>padding top of 1 rem</b> should be added in the <b>parragraph</b> with the default font.
       `,
      },
    }
  )
