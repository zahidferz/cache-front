import { storiesOf } from '@storybook/vue'
import GxSearch from '../../components/_Core/Forms/GxSearch.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Forms/GxSearch', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'default',
    () => ({
      components: {
        GxSearch,
      },
      data() {
        return {
          search: '',
        }
      },
      template: `
        <GxSearch v-model="search" placeholder="Busca algo..." />
      `,
    }),
    {
      info: {
        summary: `
            GxSearch.
          `,
      },
    }
  )
  .add(
    'disabled',
    () => ({
      components: {
        GxSearch,
      },
      data() {
        return {
          search: '',
        }
      },
      template: `
        <GxSearch v-model="search" disabled placeholder="Busca algo..." />
      `,
    }),
    {
      info: {
        summary: `
            GxSearch.
          `,
      },
    }
  )
  .add(
    'dark',
    () => ({
      components: {
        GxSearch,
      },
      data() {
        return {
          search: '',
        }
      },
      template: `
        <GxSearch v-model="search" dark placeholder="Busca algo..." />
      `,
    }),
    {
      info: {
        summary: `
            GxSearch.
          `,
      },
    }
  )
  .add(
    'dark disabled',
    () => ({
      components: {
        GxSearch,
      },
      data() {
        return {
          search: '',
        }
      },
      template: `
        <GxSearch v-model="search" dark disabled placeholder="Busca algo..." />
      `,
    }),
    {
      info: {
        summary: `
            GxSearch.
          `,
      },
    }
  )
