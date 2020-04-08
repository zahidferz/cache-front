import { storiesOf } from '@storybook/vue'
import GxDropdown from '../../components/_Core/Forms/GxDropdown.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Forms/GxDropdown', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'default',
    () => ({
      components: {
        GxDropdown,
      },
      data() {
        return {
          dropdownValue: '',
          options: ['Option 1', 'Option 2', 'Option 3'],
        }
      },
      template: `
        <div class="w-full">
          <GxDropdown v-model="dropdownValue" label="Some dropdown" placeholder="Some placeholder text" :options="options" />
          <GxDropdown disabled v-model="dropdownValue" label="Some dropdown" placeholder="Some placeholder text" :options="options" />
        </div>
      `,
    }),
    {
      info: {
        summary: `
          GxDropdown is a basic select with custom styles. This is used to take advantage of native mobile behavior when using this HTML tag.\n
          Takes a simple array of strings, which will be used to set the displayed value as well as the v-model value.
        `,
      },
    }
  )
  .add(
    'with objects array',
    () => ({
      components: {
        GxDropdown,
      },
      data() {
        return {
          dropdownValue: '',
          options: [
            { code: 'code1', name: 'Option 1' },
            { code: 'code2', name: 'Option 2' },
            { code: 'code3', name: 'Option 3' },
          ],
        }
      },
      template: `
        <div class="w-full">
          <GxDropdown v-model="dropdownValue" option-text="name" option-value="code" label="Some dropdown" placeholder="Some placeholder text" :options="options" />
        </div>
      `,
    }),
    {
      info: {
        summary: `
          When providing an array of objects, you must specify what keys to use for the option's value and text using the props *option-text* and *option-value*.\n
          GxDropdown is a basic select with custom styles. This is used to take advantage of native mobile behavior when using this HTML tag.\n
          Takes a simple array of strings, which will be used to set the displayed value as well as the v-model value.
        `,
      },
    }
  )
  .add(
    'with error',
    () => ({
      components: {
        GxDropdown,
      },
      data() {
        return {
          dropdownValue: '',
          options: ['Option 1', 'Option 2', 'Option 3'],
          error: 'A custom error message',
        }
      },
      template: `
        <div class="w-full">
          <GxDropdown v-model="dropdownValue" :error="error" label="Some dropdown" placeholder="Some placeholder text" :options="options" />
        </div>
      `,
    }),
    {
      info: {
        summary: `
          GxDropdown is a basic select with custom styles. This is used to take advantage of native mobile behavior when using this HTML tag.\n
          Takes a simple array of strings, which will be used to set the displayed value as well as the v-model value.
        `,
      },
    }
  )
  .add(
    'dark',
    () => ({
      components: {
        GxDropdown,
      },
      data() {
        return {
          dropdownValue: '',
          options: ['Option 1', 'Option 2', 'Option 3'],
        }
      },
      template: `
        <div class="w-full bg-primary">
          <GxDropdown dark v-model="dropdownValue" label="Some dropdown" placeholder="Some placeholder text" :options="options" />
          <GxDropdown dark disabled v-model="dropdownValue" label="Some dropdown" placeholder="Some placeholder text" :options="options" />
        </div>
      `,
    }),
    {
      info: {
        summary: `
          GxDropdown is a basic select with custom styles. This is used to take advantage of native mobile behavior when using this HTML tag.\n
          Takes a simple array of strings, which will be used to set the displayed value as well as the v-model value.
        `,
      },
    }
  )
  .add(
    'dark with error',
    () => ({
      components: {
        GxDropdown,
      },
      data() {
        return {
          dropdownValue: '',
          options: ['Option 1', 'Option 2', 'Option 3'],
          error: 'Some custom error message',
        }
      },
      template: `
        <div class="w-full bg-primary">
          <GxDropdown :error="error" dark v-model="dropdownValue" label="Some dropdown" placeholder="Some placeholder text" :options="options" />
        </div>
      `,
    }),
    {
      info: {
        summary: `
          GxDropdown is a basic select with custom styles. This is used to take advantage of native mobile behavior when using this HTML tag.\n
          Takes a simple array of strings, which will be used to set the displayed value as well as the v-model value.
        `,
      },
    }
  )
