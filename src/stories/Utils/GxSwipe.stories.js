import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import CenterDecorator from '../addons/CenterDecorator'
import GxSwipe from '@components/_Core/Utils/GxSwipe.vue'
import GxClientCard from '@components/_Core/Cards/GxClientCard'

storiesOf('Utils/GxSwipe', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'GxSwipe',
    () => ({
      components: {
        GxSwipe,
        GxClientCard,
      },
      methods: {
        someMethod() {
          alert('Clicked a button')
        },
      },
      template: `
        <div class="w-full">
          <h2>Actions on both sides</h2>
          <GxSwipe class="w-full">
            <template v-slot:left>
              <button @click="someMethod" class="w-full flex flex-no-wrap flex-shrink-1 items-center justify-center p-2 bg-alert">Botón</button>
              <button @click="someMethod" class="w-full flex flex-no-wrap flex-shrink-1 items-center justify-center p-2 bg-secondary">Botón 2</button>
            </template>
            <GxClientCard
              commercial-name="La tienda"
              tax-id="XEXX010101X00"
              :recient-activity-status="1567549087346"
            />
            <template v-slot:right>
              <button @click="someMethod" class="w-full flex flex-no-wrap flex-shrink-1 items-center justify-center p-2 bg-alert">Botón 5</button>
              <button @click="someMethod" class="w-full flex flex-no-wrap flex-shrink-1 items-center justify-center p-2 bg-secondary">Botón 2</button>
            </template>
          </GxSwipe>
          <h2 class="mt-4">Actions left side only</h2>
          <GxSwipe class="w-full">
            <template v-slot:left>
              <button @click="someMethod" class="w-full flex flex-no-wrap flex-shrink-1 items-center justify-center p-2 bg-alert">Botón</button>
              <button @click="someMethod" class="w-full flex flex-no-wrap flex-shrink-1 items-center justify-center p-2 bg-secondary">Botón 2</button>
            </template>
            <GxClientCard
              commercial-name="La tienda"
              tax-id="XEXX010101X00"
              :recient-activity-status="1567549087346"
            />
          </GxSwipe>
          <h2 class="mt-4">Actions right side only</h2>
          <GxSwipe class="w-full">
            <GxClientCard
              commercial-name="La tienda"
              tax-id="XEXX010101X00"
              :recient-activity-status="1567549087346"
            />
            <template v-slot:right>
              <button @click="someMethod" class="w-full flex flex-no-wrap flex-shrink-1 items-center justify-center p-2 bg-alert">Botón 5</button>
              <button @click="someMethod" class="w-full flex flex-no-wrap flex-shrink-1 items-center justify-center p-2 bg-secondary">Botón 2</button>
            </template>
          </GxSwipe>
        </div>
      `,
    }),
    {
      info: {
        summary: `
          GxSwipe is a simple wrapper that allows you to add hidden actions that become visible on swipe.
          The left and right slots provide oppportunity to add actions to either side of the element.
        `,
      },
    }
  )
