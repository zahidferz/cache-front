import { storiesOf } from '@storybook/vue'
import GxChip from '@components/_Core/Chips/GxChip.vue'
import GxButton from '@components/_Core/globals/Buttons/GxButton.vue' // Now a global
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Chips/GxChip', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Example All',
    () => ({
      components: {
        GxChip,
        GxButton,
      },
      methods: {
        chipClicked() {
          alert('chipClicked')
        },
        iconLeftClicked() {
          alert('iconLeftClicked')
        },
        iconRightClicked() {
          alert('iconRightClicked')
        },
      },
      template: `
      <div>
        <h5 class="gx-h3 mb-8">Chips</h5>
        <div class="flex mb-8">
          <GxChip class="mr-2" @click="chipClicked">Regular</GxChip>
          <GxChip @click="chipClicked" disabled>Regular</GxChip>
        </div>
        <h5 class="gx-h3 mb-8">Chip left icon</h5>
        <div class="flex mb-8">
          <GxChip icon-left="info" @click-icon-left="iconRightClicked" @click="chipClicked">Regular</GxChip>
        </div>
        <h5 class="gx-h3 mb-8">Chip right icon</h5>
        <div class="flex mb-8">
          <GxChip icon-right="close" @click-icon-right="iconRightClicked" @click="chipClicked">Regular</GxChip>
        </div>
        <h5 class="gx-h3 mb-8">Chip right and left icon</h5>
        <div class="flex mb-8">
          <GxChip icon-left="info" icon-right="close" @click-icon-right="iconRightClicked" @click-icon-left="iconRightClicked" @click="chipClicked">Regular</GxChip>
        </div>
      </div>
    `,
    }),
    {
      info: {
        summary: `
          Horizontal spacing should be defined according to screen size and adjacent components.\n
          Above, the ideal spacing of 2rems between adjacent chips, followed by 1rem and the minimum spacing of 0.5rem.
        `,
      },
    }
  )
  .add(
    'default',
    () => ({
      components: {
        GxChip,
      },
      methods: {
        chipClicked() {
          alert('Chip chipClicked')
        },
      },
      template: '<GxChip @click="chipClicked">Regular</GxChip>',
    }),
    {
      info: {
        summary: `
          *Chips allow users to enter information, make selections, filter content, or trigger actions.
          Chips should appear dynamically as a group of multiple interactive elements.
          Unlike buttons, which should be a consistent and familiar call to action,
          one that a user expects to appear as the same action in the same general area.* <a href="https://material.io/design/components/chips.html#usage">Material Design Chips</a>\n
          Chips have a minimum default margin bottom of .5rem, which can be overriden with a 1rem (mb-4) or 2rem (mb-8) margin.
          Horizontal padding: 1.5rems\n
          Vertical padding: .5rem\n
          Text: gx-subtitle.\n
        `,
      },
    }
  )
  .add(
    'disabled',
    () => ({
      components: {
        GxChip,
      },
      methods: {
        chipClicked() {
          alert('Chip chipClicked')
        },
      },
      template: '<GxChip disabled @click="chipClicked">Regular</GxChip>',
    }),
    {
      info: {
        summary: 'Disabled Chip',
      },
    }
  )
  .add(
    'with left icon',
    () => ({
      components: {
        GxChip,
      },
      methods: {
        chipClicked() {
          alert('Chip chipClicked')
        },
        iconLeftClicked() {
          alert('iconLeftClicked')
        },
      },
      template:
        '<GxChip icon-left="face" @click-icon-left="iconLeftClicked" @click="chipClicked">with icon</GxChip>',
    }),
    {
      info: {
        summary: `
          Chip with left icon. Clicking on the left icon will emit a custom event **click-icon-left** which override the regular click.
        `,
      },
    }
  )
  .add(
    'with right icon',
    () => ({
      components: {
        GxChip,
      },
      methods: {
        chipClicked() {
          alert('Chip chipClicked')
        },
        iconRightClicked() {
          alert('iconRightClicked')
        },
      },
      template:
        '<GxChip icon-right="face" @click-icon-right="iconRightClicked" @click="chipClicked">with icon</GxChip>',
    }),
    {
      info: {
        summary: `
          Chip with right icon. Clicking on the right icon will emit a custom event **click-icon-right** which override the regular click.
        `,
      },
    }
  )
