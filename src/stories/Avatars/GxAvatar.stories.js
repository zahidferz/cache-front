import { storiesOf } from '@storybook/vue'
import GxAvatar from '../../components/_Core/Avatars/GxAvatar.vue'
import GxListItem from '../../components/_Core/Lists/GxListItem.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'
import Layout from '@src/router/layouts/LayoutMain'
import StoryRouter from 'storybook-vue-router'

import '../Layouts/layoutStories.css'

storiesOf('Avatars/GxAvatar', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .add(
    'Example',
    () => ({
      components: {
        GxListItem,
        Layout,
      },
      data() {
        return {
          image: require('@src/assets/images/Storybook/bancoexample.png'),
        }
      },
      template: `
        <Layout>
          <div class="flex-grow px-4">
            <GxListItem list-item-text="List Item 1" list-item-icon="chevron_right" :avatar-img="image"/>
            <GxListItem list-item-text="List Item 2" list-item-icon="chevron_right" :avatar-img="image"/>
            <GxListItem list-item-text="List Item 3" list-item-icon="chevron_right" :avatar-img="image"/>
            <GxListItem list-item-text="List Item 4" list-item-icon="chevron_right" :avatar-img="image"/>
            <GxListItem list-item-text="List Item 5" list-item-icon="chevron_right" :avatar-img="image"/>
          </div>
        </Layout>
      `,
    }),
    {
      info: {
        summary:
          'This is an example of an avatar interacting with other elements; notice that the margin between the text and the image is <b>NOT</b> defined by the image',
      },
    }
  )
  .addDecorator(CenterDecorator)
  .add(
    'circle',
    () => ({
      components: {
        GxAvatar,
      },
      data() {
        return {
          image: require('@src/assets/images/Storybook/bancoexample.png'),
        }
      },
      template: `<GxAvatar :avatarImg="image"/>`,
      propsDescription: {
        GxAvatar: {
          shape:
            'Default value "circle". Required value. Can take value: cirlce, maxCircle, square, bigSquare, horizontal.',
          avatarImg: 'Property to change the image that a user provides',
        },
      },
    }),
    {
      info: {
        summary: `This is the *default* value. Avatars are used to present a customer's logo. Six different shapes provide these images in six different fixed dimensions to be used in componentes such as ListItems.
        \n Rectangular shapes have a border radius of 0.5rems.
      \n Because an avatar is considered as an atom, its margin will be defined by the rules of other elements.`,
      },
    }
  )
  .add(
    'square',
    () => ({
      components: {
        GxAvatar,
      },
      data() {
        return {
          image: require('@src/assets/images/Storybook/bancoexample.png'),
        }
      },
      template: '<GxAvatar shape="square" :avatarImg="image"/>',
      propsDescription: {
        GxAvatar: {
          shape:
            'Its value "square" makes a 80x80 image with 0.5 rem border-radius.',
          avatarImg: 'Property to change the image that a user provides',
        },
      },
    }),
    {
      info: {
        summary: '',
      },
    }
  )
  .add(
    'bigSquare',
    () => ({
      components: {
        GxAvatar,
      },
      data() {
        return {
          image: require('@src/assets/images/Storybook/bancoexample.png'),
        }
      },
      template: '<GxAvatar shape="bigSquare" :avatarImg="image"/>',
      propsDescription: {
        GxAvatar: {
          shape:
            'Its value "bigSquare" makes a 80x80 size image with 0.5 rem border-radius.',
          avatarImg: 'Property to change the image that a user provides',
        },
      },
    }),
    {
      info: {
        summary: '',
      },
    }
  )
  .add(
    'horizontal',
    () => ({
      components: {
        GxAvatar,
      },
      data() {
        return {
          image: require('@src/assets/images/Storybook/bancoexample.png'),
        }
      },
      template: '<GxAvatar shape="horizontal" :avatarImg="image"/>',
      propsDescription: {
        GxAvatar: {
          shape:
            'Its value "horizontal" makes an horizontal image that measures 112x64 with 0.5 rem border-radius.',
          avatarImg: 'Property to change the image that a user provides',
        },
      },
    }),
    {
      info: {
        summary: '',
      },
    }
  )
  .add(
    'maxCircle',
    () => ({
      components: {
        GxAvatar,
      },
      data() {
        return {
          image: require('@src/assets/images/Storybook/bancoexample.png'),
        }
      },
      template: '<GxAvatar shape="maxCircle" :avatarImg="image"/>',
      propsDescription: {
        GxAvatar: {
          shape:
            'Its value "maxCircle" makes the biggest circle avatar. It measures 72x72 with a border-radius of 50%.',
          avatarImg: 'Property to change the image that a user provides',
        },
      },
    }),
    {
      info: {
        summary: '',
      },
    }
  )
  .add(
    'miniAvatar',
    () => ({
      components: {
        GxAvatar,
      },
      data() {
        return {
          image: require('@src/assets/images/Storybook/bancoexample.png'),
        }
      },
      template: '<GxAvatar shape="miniAvatar" :avatarImg="image"/>',
      propsDescription: {
        GxAvatar: {
          shape:
            'Its value "miniAvatar" makes the smallest circle avatar. It measures 40x40 with border-radius of 50%.',
          avatarImg: 'Property to change the image that a user provide',
        },
      },
    }),
    {
      info: {
        summary: '',
      },
    }
  )
