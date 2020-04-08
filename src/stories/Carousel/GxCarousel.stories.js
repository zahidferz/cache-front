import { storiesOf } from '@storybook/vue'
import GxCarousel from '@components/_Core/Carousel/GxCarousel.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Carousel/GxCarousel', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'default',
    () => ({
      components: {
        GxCarousel,
      },
      data() {
        return {
          cardsArr: [
            {
              title: 'A',
              chips: [
                {
                  text: 'blah',
                  clickHandler: () => {
                    alert('chip click handler')
                  },
                  disabled: true,
                },
              ],
              buttons: [
                {
                  text: 'button 1',
                  clickHandler: () => {
                    alert('button 1 click handler')
                  },
                },
                {
                  text: 'button 2',
                  clickHandler: () => {
                    alert('button 2 click handler')
                  },
                },
              ],
              caption: 'Some caption',
              textBody: 'This will be text body',
              subtitle: 'Subtitle',
              tags: ['tag1', 'tag2'],
              image: require('@src/assets/images/Storybook/imagenCompleta.svg'),
              alt: 'image alt text',
            },
            {
              title: 'B',
              chips: [
                {
                  text: 'blah',
                  clickHandler: () => {
                    alert('chip click handler')
                  },
                  disabled: true,
                },
              ],
              buttons: [
                {
                  text: 'button 1',
                  clickHandler: () => {
                    alert('button 1 click handler')
                  },
                },
                {
                  text: 'button 2',
                  clickHandler: () => {
                    alert('button 2 click handler')
                  },
                },
              ],
              caption: 'Some caption',
              textBody: 'This will be text body',
              subtitle: 'Subtitle',
              tags: ['tag1', 'tag2'],
              image: require('@src/assets/images/Storybook/imagenCompleta.svg'),
              alt: 'image alt text',
            },
            {
              title: 'C',
              chips: [
                {
                  text: 'blah',
                  clickHandler: () => {
                    alert('chip click handler')
                  },
                  disabled: true,
                },
              ],
              buttons: [
                {
                  text: 'button 1',
                  clickHandler: () => {
                    alert('button 1 click handler')
                  },
                },
                {
                  text: 'button 2',
                  clickHandler: () => {
                    alert('button 2 click handler')
                  },
                },
              ],
              caption: 'Some caption',
              textBody: 'This will be text body',
              subtitle: 'Subtitle',
              tags: ['tag1', 'tag2'],
              image: require('@src/assets/images/Storybook/imagenCompleta.svg'),
              alt: 'image alt text',
            },
            {
              title: 'D',
              chips: [
                {
                  text: 'blah',
                  clickHandler: () => {
                    alert('chip click handler')
                  },
                  disabled: true,
                },
              ],
              buttons: [
                {
                  text: 'button 1',
                  clickHandler: () => {
                    alert('button 1 click handler')
                  },
                },
                {
                  text: 'button 2',
                  clickHandler: () => {
                    alert('button 2 click handler')
                  },
                },
              ],
              caption: 'Some caption',
              textBody: 'This will be text body',
              subtitle: 'Subtitle',
              tags: ['tag1', 'tag2'],
              image: require('@src/assets/images/Storybook/imagenCompleta.svg'),
              alt: 'image alt text',
            },
            {
              title: 'E',
              chips: [
                {
                  text: 'blah',
                  clickHandler: () => {
                    alert('chip click handler')
                  },
                  disabled: true,
                },
              ],
              buttons: [
                {
                  text: 'button 1',
                  clickHandler: () => {
                    alert('button 1 click handler')
                  },
                },
                {
                  text: 'button 2',
                  clickHandler: () => {
                    alert('button 2 click handler')
                  },
                },
              ],
              caption: 'Some caption',
              textBody: 'This will be text body',
              subtitle: 'Subtitle',
              tags: ['tag1', 'tag2'],
              image: require('@src/assets/images/Storybook/imagenCompleta.svg'),
              alt: 'image alt text',
            },
            {
              title: 'F',
              chips: [
                {
                  text: 'blah',
                  clickHandler: () => {
                    alert('chip click handler')
                  },
                  disabled: true,
                },
              ],
              buttons: [
                {
                  text: 'button 1',
                  clickHandler: () => {
                    alert('button 1 click handler')
                  },
                },
                {
                  text: 'button 2',
                  clickHandler: () => {
                    alert('button 2 click handler')
                  },
                },
              ],
              caption: 'Some caption',
              textBody: 'This will be text body',
              subtitle: 'Subtitle',
              tags: ['tag1', 'tag2'],
              image: require('@src/assets/images/Storybook/imagenCompleta.svg'),
              alt: 'image alt text',
            },
            {
              title: 'G',
              chips: [
                {
                  text: 'blah',
                  clickHandler: () => {
                    alert('chip click handler')
                  },
                  disabled: true,
                },
              ],
              buttons: [
                {
                  text: 'button 1',
                  clickHandler: () => {
                    alert('button 1 click handler')
                  },
                },
                {
                  text: 'button 2',
                  clickHandler: () => {
                    alert('button 2 click handler')
                  },
                },
              ],
              caption: 'Some caption',
              textBody: 'This will be text body',
              subtitle: 'Subtitle',
              tags: ['tag1', 'tag2'],
              image: require('@src/assets/images/Storybook/imagenCompleta.svg'),
              alt: 'image alt text',
            },
          ],
        }
      },
      template: `
        <div class="w-full mb-6 bg-primary-500 flex p-2">
          <GxCarousel :cards="cardsArr" />
        </div>
      `,
    }),
    {
      info: {
        summary: `
          A carousel
        `,
      },
    }
  )
