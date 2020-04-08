import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import CenterDecorator from '../addons/CenterDecorator'

storiesOf('Text/Body', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'gx-body',
    () => ({
      template: `
        <div>
          <p class="gx-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem lacus, placerat sit amet auctor et, fermentum quis dui. Donec luctus dapibus purus ut volutpat. Curabitur urna nulla, pretium eget turpis nec, sagittis ultrices augue. Nullam congue neque id elit ornare, id elementum purus tincidunt. Duis semper vehicula velit ac semper.</p>
          <p class="gx-body font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem lacus, placerat sit amet auctor et, fermentum quis dui. Donec luctus dapibus purus ut volutpat. Curabitur urna nulla, pretium eget turpis nec, sagittis ultrices augue. Nullam congue neque id elit ornare, id elementum purus tincidunt. Duis semper vehicula velit ac semper.</p>
        </div>
      `,
    }),
    {
      info: {
        summary: `
          The bold variant may be achieved by adding Tailwind's <b>font-bold</b> class.\n
          The root body tag has this class enabled and updates on each breakpoint to reflect the design spec: \n
          body-mo and body-sm (desk >=768px). \n
          You should rarely (never, really) need to use this class.\n
          View this page in mobile and desktop to see the difference.
        `,
      },
    }
  )
  .add(
    'gx-overline',
    () => ({
      template: '<span class="gx-overline de:gx-overline">Overline</span>',
    }),
    {
      info: {
        summary: `
          All overline text is rendered in uppercase.\n
          <b>Should not be used in bold</b>\n
          <b>Should not be used for paragraphs of text.</b>\n
          *Caption and overline text(text with a line above it) are the smallest font sizes.
          They are used sparingly to annotate imagery or to introduce a headline. <a target="_blank" href="https://material.io/design/typography/the-type-system.html#applying-the-type-scale">*Material Design Typography.</a>
        `,
      },
    }
  )
  .add(
    'gx-caption',
    () => ({
      template: `
        <div>
          <div class="gx-caption de:gx-caption">This is a caption text</div>
          <div class="gx-caption de:gx-caption font-bold">This is a caption bold text</div>
        </div>
      `,
    }),
    {
      info: {
        summary: `
          The bold variant may be achieved by adding Tailwind 's <b>font-bold</b> class.\n
          Captions are used for secondary actions and info text (tabs, small text, etc.)\n
          *Caption and overline text(text with a line above it) are the smallest font sizes.
          They are used sparingly to annotate imagery or to introduce a headline. <a target="_blank" href="https://material.io/design/typography/the-type-system.html#applying-the-type-scale">*Material Design Typography.</a>
        `,
      },
    }
  )
  .add(
    'gx-subtitle',
    () => ({
      template: `
        <div>
          <div class="gx-subtitle de:gx-subtitle">This is a subtitle text</div>
          <div class="gx-subtitle de:gx-subtitle font-bold">This is a subtitle bold text</div>
        </div>
      `,
    }),
    {
      info: {
        summary: `
          The bold variant may be achieved by adding Tailwind 's <b>font-bold</b> class.\n
          *Subtitles are smaller than headlines.They are typically reserved
          for medium - emphasis text that is shorter in length. <a target="_blank" href="https://material.io/design/typography/the-type-system.html#applying-the-type-scale">*Material Design Typography.</a>
        `,
      },
    }
  )
  .add(
    'gx-card-text',
    () => ({
      template: `
        <div>
          <div class="mb-4 gx-card-text">This is a text only for dashboard cards. It must be used for mobile and desktop versions </div>
          <div class="gx-card-text font-bold">This is a text only for dashboard cards. It must be used for mobile and desktop versions </div>
          </div>
      `,
    }),
    {
      info: {
        summary: `
          This is a text only for dashboard cards. It must be used for mobile and desktop versions to make sure font size is 1rem always.
        `,
      },
    }
  )
