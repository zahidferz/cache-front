import { storiesOf } from '@storybook/vue'
import GxButton from '../../components/_Core/globals/Buttons/GxButton.vue'
import CenterDecorator from '../addons/CenterDecorator'
import StoryRouter from 'storybook-vue-router'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Buttons/GxButton', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Example ALL',
    () => ({
      components: {
        GxButton,
      },
      methods: {
        clicked(msg) {
          alert(msg)
        },
      },
      template: `
      <div class="p-4 flex-grow flex flex-col items-center justify-between">
        <h1 class="gx-h3 mb-8 self-start">Buttons</h1>
        <div class="w-full flex mb-8">
          <GxButton  class="mr-2" disabled>Button</GxButton>
          <GxButton  class="mr-2">Button</GxButton>
        </div>
        <h1 class="gx-h3 mb-8 self-start">Buttons with icons</h1>
        <div class="w-full flex mb-8">
          <GxButton  class="mr-2" icon="add" disabled>Button</GxButton>
          <GxButton  class="mr-2" icon="add">Button</GxButton>
        </div>
        <h1 class="gx-h3 mb-8 self-start">Buttons ghost</h1>
        <div class="w-full flex mb-8">
          <GxButton  class="mr-2" ghost disabled>Button</GxButton>
          <GxButton  class="mr-2" ghost>Button</GxButton>
        </div>
        <h1 class="gx-h3 mb-8 self-start">Buttons variant</h1>
        <div class="w-full flex mb-8">
          <GxButton  class="mr-2" variant disabled>Button</GxButton>
          <GxButton  class="mr-2" variant>Button</GxButton>
        </div>
        <h1 class="gx-h3 mb-8 self-start">Buttons variant ghost</h1>
        <div class="w-full flex mb-8">
          <GxButton  class="mr-2" variant ghost disabled>Button</GxButton>
          <GxButton  class="mr-2" variant ghost>Button</GxButton>
        </div>
        <h1 class="gx-h3 mb-8 self-start">Buttons plain</h1>
        <div class="w-full flex mb-8">
          <GxButton  class="mr-2" plain disabled>Button</GxButton>
          <GxButton  class="mr-2" plain>Button</GxButton>
        </div>
        <h1 class="gx-h3 mb-8 self-start">Buttons full</h1>
        <div class="w-full flex mb-8">
          <GxButton  class="mr-2" full disabled>Button</GxButton>
          <GxButton  class="mr-2" full>Button</GxButton>
        </div>
        <h1 class="gx-h3 mb-8 self-start">Button loading</h1>
        <div class="w-full flex mb-8">
          <GxButton  class="mr-2" loading>Button</GxButton>
          <GxButton  class="mr-2" loading full>Button</GxButton>
        </div>
        <h1 class="gx-h3 mb-8 self-start">Buttons stacked</h1>
        <div class="w-full mb-8">
          <GxButton  class="mr-2">Button</GxButton>
          <GxButton  class="mr-2" disabled>Button</GxButton>
          <GxButton  class="mr-2" full>Button</GxButton>
        </div>
    </div>

      `,
      propsDescription: {
        GxButton: {
          icon:
            'Icon receives icon name to set an icon embeded at the left of button text.',
          disabled:
            'Disabled button hides any icons and text with visibility hidden to preserve width.',
          loading:
            'Loading button hides any icons and text with visibility hidden to preserve width and adds a spinner on top',
          variant: 'Variant button change style into a square-ish shape.',
          ghost:
            'ghost button changes button style to a white background and text with primary color.',
          full: 'full value (true) sets the width to that of its container.',
          plain: `ghost button without border. This prop should be use only for mobile devices. It will take the width from the text plus the default padding.`,
          dark: 'Changes color so button can be used over a dark background',
        },
      },
    }),
    {
      info: {
        summary: `
        <b>Button</b> element can be use to emit an event which is inherited from the father element.\n

        It has default styling such as border-radius: 50%, background color primary, text-white and
        full width, this attributes can change according to the props added. Mobile buttons have a height of 2rems. Desktops have a height of 2.25rems.\n

        It has a bottom spacing of 0.5 rems by default (class="mb-2") but it can
        be modified using one of the three preferred spacings (mb-2, mb-4, mb-8).
        \n

        If it's surounded by other elements to the left or right, margin-left or margin-right
        should be added to the element following the same rule as above using the corresponding classes:\n
        * class="mr-[2,4,8]"
        * class="ml-[2,4,8]"
        \n
        The <b>class="mx-[2,4,8]"</b> could be used if this apply for both sides.
        `,
      },
    }
  )
  .add(
    'default',
    () => ({
      components: {
        GxButton,
      },
      methods: {
        clicked(msg) {
          alert(msg)
        },
      },
      template: `<GxButton>Enabled</GxButton>`,
      propsDescription: {
        GxButton: {
          icon:
            'Icon receives icon name to set an icon embeded at the left of button text.',
          disabled:
            'Disabled button hides any icons and text with visibility hidden to preserve width.',
          loading:
            'Loading button hides any icons and text with visibility hidden to preserve width and adds a spinner on top',
          variant: 'Variant button change style into a square-ish shape.',
          ghost:
            'ghost button changes button style to a white background and text with primary color.',
          full: 'full value (true) sets the button width to full screen width.',
          plain: 'ghost button without border.',
          dark:
            'dark value (true) ets button background white and text primary to be displayed over a dark background.',
        },
      },
    }),
    {
      info: {
        summary: `Default button with min width of 9.5rem It accepts props to ad icon or change color and shape.`,
      },
    }
  )
  .add(
    'disabled',
    () => ({
      components: {
        GxButton,
      },
      methods: {
        clicked(msg) {
          alert(msg)
        },
      },
      template: `<GxButton disabled @click="clicked('Button clicked')">Disabled</GxButton>`,
    }),
    {
      info: {
        summary: `
          Disabled button hides any icons and text with visibility hidden to preserve width.\n
          Disabled buttons can be used when an actions is not yet available (e.g. when a form is incomplete)\n
          This attribute is not necessary when using loading, as passing that attribute will take care of disabling a button as well.
        `,
      },
    }
  )
  .add(
    'ghost',
    () => ({
      components: {
        GxButton,
      },
      methods: {
        clicked(msg) {
          alert(msg)
        },
      },
      template: `<GxButton ghost @click="clicked('Button clicked')">ghost</GxButton>`,
    }),
    {
      info: {
        summary:
          'ghost button changes button style to a white background and text with primary color.',
      },
    }
  )
  .add(
    'with icon',
    () => ({
      components: {
        GxButton,
      },
      methods: {
        clicked(msg) {
          alert(msg)
        },
      },
      template: `<GxButton icon="face" @click="clicked('Button clicked')">Regular Button with icon</GxButton>`,
    }),
    {
      info: {
        summary:
          'Regular button with icon, this prop could be use combined with other props. Icon receives icon name to set an icon embeded at the left of button text.',
      },
    }
  )
  .add(
    'variant',
    () => ({
      components: {
        GxButton,
      },
      methods: {
        clicked(msg) {
          alert(msg)
        },
      },
      template: `<GxButton variant @click="clicked('Button clicked')">Variant</GxButton>`,
    }),
    {
      info: {
        summary: 'Variant button change style into a square-ish shape.',
      },
    }
  )
  .add(
    'height-variant',
    () => ({
      components: {
        GxButton,
      },
      methods: {
        clicked(msg) {
          alert(msg)
        },
      },
      template: `<GxButton height-variant @click="clicked('Button clicked')">Height Variant</GxButton>`,
    }),
    {
      info: {
        summary:
          'Height variant reduces the buttons height, without modifying other attributes. ONLY Desktop.',
      },
    }
  )
  .add(
    'plain',
    () => ({
      components: {
        GxButton,
      },
      methods: {
        clicked(msg) {
          alert(msg)
        },
      },
      template: `<GxButton plain @click="clicked('Button clicked')">Plain</GxButton>`,
    }),
    {
      info: {
        summary:
          'ghost button without border. Plain button has background white, no borders and text primary. It takes the text width plus de default padding',
      },
    }
  )
  .add(
    'loading',
    () => ({
      components: {
        GxButton,
      },
      data() {
        return {
          loading: false,
          loadingSuccess: false,
        }
      },
      methods: {
        initLoading() {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.loadingSuccess = true
          }, 3000)
        },
      },
      template: `
        <div class="flex flex-col items-center">
          <GxButton :loading="loading" :loading-success="loadingSuccess" @click="initLoading">Loading</GxButton>
          <GxButton plain :loading="loading" :loading-success="loadingSuccess" @click="initLoading">Loading</GxButton>
        </div>
      `,
    }),
    {
      info: {
        summary: `
            Click button to see loading state.\n
            Loading button transforms the button size and adds a spinner on top.\n
            Loading will also disable interactions with the button the same way disabled does. Both properties should never be used at the same time.
          `,
      },
    }
  )
  .add(
    'dark',
    () => ({
      components: {
        GxButton,
      },
      methods: {
        clicked(msg) {
          alert(msg)
        },
      },
      template: `
      <div class="w-full bg-primary-500 p-2">
        <GxButton class="mx-auto"  dark>dark</GxButton>
      </div>`,
    }),
    {
      info: {
        summary:
          'dark sets button background white and text primary to be displayed over a dark background',
      },
    }
  )
  .add(
    'full',
    () => ({
      components: {
        GxButton,
      },
      methods: {
        clicked(msg) {
          alert(msg)
        },
      },
      template: `<GxButton full @click="clicked('Button clicked')">Full</GxButton>`,
    }),
    {
      info: {
        summary: 'Full sets the button width to that of its container.',
      },
    }
  )
  .addDecorator(StoryRouter())
  .add(
    'link',
    () => ({
      components: {
        GxButton,
      },
      template: `<GxButton :to="{name: 'home'}">Link</GxButton>`,
    }),
    {
      info: {
        summary:
          'Passing the *to* prop with a VueRouter object will render a RouterLink instead of the standard button element.',
      },
    }
  )
  .add(
    'variant secondary',
    () => ({
      components: {
        GxButton,
      },
      methods: {
        clicked(msg) {
          alert(msg)
        },
      },
      template: `
        <GxButton class="mx-auto" variant-secondary @click="onClick('Button clicked')">variant secondary</GxButton>`,
    }),
    {
      info: {
        summary:
          'dark sets button background white and text primary to be displayed over a dark background',
      },
    }
  )
