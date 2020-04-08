import { storiesOf } from '@storybook/vue'
import GxLoader from '@components/_Core/Utils/GxLoader'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Loader/loader', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'default',
    () => ({
      components: {
        GxLoader,
      },
      template: `<GxLoader />`,
    }),
    {
      info: {
        summary: `
          GxLoader is a circular progress indicator to express an unspecified wait time.
        `,
      },
    }
  )
