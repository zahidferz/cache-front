import { storiesOf } from '@storybook/vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Text/Header', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Example All Headers',
    () => ({
      template: `
        <div>
          <div class="flex">
            <div style="width: 400px" class="p-2">
              <p>Regular</p>
              <h1 class="gx-h1">H1 - Lorem ipsum lorem ipsum</h1>
              <h2 class="gx-h2">H2 - Lorem ipsum lorem ipsum</h2>
              <h3 class="gx-h3">H3 - Lorem ipsum lorem ipsum lorem ipsum</h3>
              <h4 class="gx-h4">H4 - Lorem ipsum lorem ipsum lorem ipsum</h4>
              <h5 class="gx-h5">H5 - Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</h5>
              <h6 class="gx-h6"> H6- Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</h6>
            </div>
            <div style="width: 400px" class="p-2">
              <p>Bold</p>
              <h1 class="gx-h1 font-bold">H1 - Lorem ipsum lorem ipsum</h1>
              <h2 class="gx-h2 font-bold">H2 - Lorem ipsum lorem ipsum</h2>
              <h3 class="gx-h3 font-bold">H3 - Lorem ipsum lorem ipsum lorem ipsum</h3>
              <h4 class="gx-h4 font-bold">H4 - Lorem ipsum lorem ipsum lorem ipsum</h4>
              <h5 class="gx-h5 font-bold">H5 - Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</h5>
              <h6 class="gx-h6 font-bold"> H6- Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</h6>
            </div>
          </div>
          <div class="flex">
            <div style="width: 400px" class="bg-primary text-white p-2">
              <p>Regular</p>
              <h1 class="gx-h1">H1 - Lorem ipsum lorem ipsum</h1>
              <h2 class="gx-h2">H2 - Lorem ipsum lorem ipsum</h2>
              <h3 class="gx-h3">H3 - Lorem ipsum lorem ipsum lorem ipsum</h3>
              <h4 class="gx-h4">H4 - Lorem ipsum lorem ipsum lorem ipsum</h4>
              <h5 class="gx-h5">H5 - Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</h5>
              <h6 class="gx-h6"> H6- Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</h6>
            </div>
            <div style="width: 400px" class="bg-primary text-white p-2">
              <p>Bold</p>
              <h1 class="gx-h1 font-bold">H1 - Lorem ipsum lorem ipsum</h1>
              <h2 class="gx-h2 font-bold">H2 - Lorem ipsum lorem ipsum</h2>
              <h3 class="gx-h3 font-bold">H3 - Lorem ipsum lorem ipsum lorem ipsum</h3>
              <h4 class="gx-h4 font-bold">H4 - Lorem ipsum lorem ipsum lorem ipsum</h4>
              <h5 class="gx-h5 font-bold">H5 - Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</h5>
              <h6 class="gx-h6 font-bold"> H6- Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</h6>
            </div>
          </div>
        </div>
      `,
    }),
    {
      info: {
        summary: `
          Header classes can be used with any h1-h6 tag.\n
          It is recommended to have a single h1 per page, followed by any number of h2...h6 according to order of importance within the page.\n
          When it doesn't make semantic sense to use a header tag, you can use the proper tag element and apply any given *gx-h#* class for styling purposes, for example *&lt;p class="gx-h#"&gt;Text with header class styling&lt;/p&gt;*.
          For desktop version, use our tailwind custom class 'de' (desktop) to specify the header needed. For example: de:gx-h1, de:gx-h2.
        `,
      },
    }
  )
  .add(
    'gx-h1',
    () => ({
      template: '<h1 class="gx-h1"> H1 - Lorem ipsum dolor sit amet</h1>',
    }),
    {
      info: {
        summary: `
          Header classes can be used with any h1-h6 tag.\n
          It is recommended to have a single h1 per page, followed by any number of h2...h6 according to order of importance within the page.\n
          When it doesn't make semantic sense to use a header tag, you can use the proper tag element and apply any given *gx-h#* class for styling purposes, for example *&lt;p class="gx-h#"&gt;Text with header class styling&lt;/p&gt;*.
          For desktop version, use our tailwind custom class 'de' (desktop) to specify the header needed. For example: de:gx-h1, de:gx-h2.
          `,
      },
    }
  )
  .add(
    'gx-h2',
    () => ({
      template: '<h2 class="gx-h2">H2 - Lorem ipsum dolor sit amet</h2>',
    }),
    {
      info: {
        summary: `
          Header classes can be used with any h1-h6 tag.\n
          It is recommended to have a single h1 per page, followed by any number of h2...h6 according to order of importance within the page.\n
          When it doesn't make semantic sense to use a header tag, you can use the proper tag element and apply any given *gx-h#* class for styling purposes, for example *&lt;p class="gx-h#"&gt;Text with header class styling&lt;/p&gt;*.
          For desktop version, use our tailwind custom class 'de' (desktop) to specify the header needed. For example: de:gx-h1, de:gx-h2.
          `,
      },
    }
  )
  .add(
    'gx-h3',
    () => ({
      template: '<h3 class="gx-h3">H3 - Lorem ipsum dolor sit amet</h3>',
    }),
    {
      info: {
        summary: `
          Header classes can be used with any h1-h6 tag.\n
          It is recommended to have a single h1 per page, followed by any number of h2...h6 according to order of importance within the page.\n
          When it doesn't make semantic sense to use a header tag, you can use the proper tag element and apply any given *gx-h#* class for styling purposes, for example *&lt;p class="gx-h#"&gt;Text with header class styling&lt;/p&gt;*.
          For desktop version, use our tailwind custom class 'de' (desktop) to specify the header needed. For example: de:gx-h1, de:gx-h2.
          `,
      },
    }
  )
  .add(
    'gx-h4',
    () => ({
      template: '<h4 class="gx-h4">H4 - Lorem ipsum dolor sit amet</h4>',
    }),
    {
      info: {
        summary: `
          Header classes can be used with any h1-h6 tag.\n
          It is recommended to have a single h1 per page, followed by any number of h2...h6 according to order of importance within the page.\n
          When it doesn't make semantic sense to use a header tag, you can use the proper tag element and apply any given *gx-h#* class for styling purposes, for example *&lt;p class="gx-h#"&gt;Text with header class styling&lt;/p&gt;*.
          For desktop version, use our tailwind custom class 'de' (desktop) to specify the header needed. For example: de:gx-h1, de:gx-h2.
          `,
      },
    }
  )
  .add(
    'gx-h5',
    () => ({
      template: '<h5 class="gx-h5"> H5 -Lorem ipsum dolor sit amet</h5>',
    }),
    {
      info: {
        summary: `
          Header classes can be used with any h1-h6 tag.\n
          It is recommended to have a single h1 per page, followed by any number of h2...h6 according to order of importance within the page.\n
          When it doesn't make semantic sense to use a header tag, you can use the proper tag element and apply any given *gx-h#* class for styling purposes, for example *&lt;p class="gx-h#"&gt;Text with header class styling&lt;/p&gt;*.
          For desktop version, use our tailwind custom class 'de' (desktop) to specify the header needed. For example: de:gx-h1, de:gx-h2.
          `,
      },
    }
  )
  .add(
    'gx-h6',
    () => ({
      template: '<h6 class="gx-h6">H6 -Lorem ipsum dolor sit amet</h6>',
    }),
    {
      info: {
        summary: `
          Header classes can be used with any h1-h6 tag.\n
          It is recommended to have a single h1 per page, followed by any number of h2...h6 according to order of importance within the page.\n
          When it doesn't make semantic sense to use a header tag, you can use the proper tag element and apply any given *gx-h#* class for styling purposes, for example *&lt;p class="gx-h#"&gt;Text with header class styling&lt;/p&gt;*.
          For desktop version, use our tailwind custom class 'de' (desktop) to specify the header needed. For example: de:gx-h1, de:gx-h2.
          `,
      },
    }
  )
