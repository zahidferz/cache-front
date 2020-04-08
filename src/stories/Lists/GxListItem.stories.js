import { storiesOf } from '@storybook/vue'
import GxListItem from '../../components/_Core/Lists/GxListItem'
import GxSwitch from '../../components/_Core/Forms/GxSwitch'

import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Lists/GxListItem', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Example ALL',
    () => ({
      components: {
        GxListItem,
      },
      template: `
           <div class="w-full px-2">
              <GxListItem   avatar-shape="horizontal" list-item-text="Horizontal" list-item-icon="favorite" list-caption="Caption Text" avatar-img="https://images.pexels.com/photos/265685/pexels-photo-265685.jpeg" />
              <GxListItem   avatar-shape="bigSquare" list-item-text="bigSquare" list-item-icon="favorite" list-caption="Caption Text" avatar-img="https://images.pexels.com/photos/265685/pexels-photo-265685.jpeg" />
              <GxListItem   avatar-shape="square" list-item-text="Square" list-item-icon="favorite" list-caption="Caption Text" avatar-img="https://images.pexels.com/photos/265685/pexels-photo-265685.jpeg" />
              <GxListItem   avatar-shape="circle" list-item-text="Rounded" list-item-icon="favorite" list-caption="Caption Text" avatar-img="https://images.pexels.com/photos/265685/pexels-photo-265685.jpeg" />

              <GxListItem   avatar-shape="horizontal" list-item-text="Horizontal" list-item-icon="favorite" avatar-img="https://images.pexels.com/photos/265685/pexels-photo-265685.jpeg" />
              <GxListItem   avatar-shape="bigSquare" list-item-text="bigSquare" list-item-icon="favorite" avatar-img="https://images.pexels.com/photos/265685/pexels-photo-265685.jpeg" />
              <GxListItem   avatar-shape="square" list-item-text="Square" list-item-icon="favorite" avatar-img="https://images.pexels.com/photos/265685/pexels-photo-265685.jpeg" />
              <GxListItem   avatar-shape="circle" list-item-text="Rounded" list-item-icon="favorite" avatar-img="https://images.pexels.com/photos/265685/pexels-photo-265685.jpeg" />

              <GxListItem  list-item-text="Text" list-item-icon="favorite" list-caption="Caption Text" />
              <GxListItem  list-item-text="Text" list-item-icon="favorite" has-switch />
              <GxListItem  list-item-text="Text" list-item-icon="favorite" />

           </div>
    `,
      propsDescription: {
        GxListItem: {
          listCaption:
            'Caption Text is used to display a caption right under the Subtitle.',
          avatarImg:
            'url or location from the image to show in the GxAvatar element, if it is not provided the display will change.',
          avatarShape:
            'This prop sets the avatar shape, could be horizontal, bigSquare, square, rounded-full, if it is not defined will set rounded-full by default but it will only show it if avatarImg exists',
          listItemText:
            'This element is required. Text will be display as bold above the caption if one is provided.',
          listItemIcon: 'Required. Name of the desired icon.',
        },
      },
    }),
    {
      info: {
        summary: `<b>GxListItem</b> has an horizontal *GxAvatar*, a subtitle wich will be automatically display as a text with bold font,
          caption and an *GxIcon*.\n
          <b>Not</b> setting any of this props will change the display accordingly.
          Width will fill the screen dimensions.Two Line ListItem display will be set automatically only if a caption is provided.\n
          This case is passing a value for each prop.`,
      },
    }
  )
  .add(
    'Two Line List Item',
    () => ({
      components: {
        GxListItem,
      },
      template: `
            <GxListItem  avatar-shape="horizontal" list-item-text="Horizontal" list-item-icon="favorite" list-caption="Caption Text" avatar-img="https://images.pexels.com/photos/265685/pexels-photo-265685.jpeg" />
    `,
      propsDescription: {
        GxListItem: {
          listCaption:
            'Caption Text is used to display a caption right under the Subtitle.',
          avatarImg:
            'url or location from the image to show in the GxAvatar element, if it is not provided the display will change.',
          avatarShape:
            'When using the GxAvatar prop, this prop sets its shape, could be use as horizontal, bigSquare, square, rounded-lg, rounded-full',
          listItemText:
            'This element is required. Text will be display as bold above the caption if one is provided.',
          listItemIcon: 'Required. Name of the desired icon.',
        },
      },
    }),
    {
      info: {
        summary: `<b>GxListItem</b> has an horizontal *GxAvatar*, a subtitle wich will be automatically display as a text with bold font,
          caption and an *GxIcon*.\n
          <b>Not</b> setting any of this props will change the display accordingly.
          Width will fill the screen dimensions.Two Line ListItem display will be set automatically only if a caption is provided.\n
          This case is passing a value for each prop.`,
      },
    }
  )
  .add(
    'One Line List Item',
    () => ({
      components: {
        GxListItem,
      },
      template:
        '<GxListItem avatar-shape="square" list-item-text="Square no caption" list-item-icon="phone" avatar-img="https://images.pexels.com/photos/265685/pexels-photo-265685.jpeg" />',
    }),
    {
      info: {
        summary:
          'One Line List Item display will be automatically set when caption prop is not provided.',
      },
    }
  )
  .add(
    'No avatar and no caption One line List Item',
    () => ({
      components: {
        GxListItem,
      },
      template:
        '<GxListItem list-item-text="No avatar no caption" list-item-icon="favorite" />',
    }),
    {
      info: {
        summary:
          'No avatar and no caption One line List Item display will be automatically set when caption and avatar prop are not provided',
      },
    }
  )
  .add(
    'No avatar Two line List Item',
    () => ({
      components: {
        GxListItem,
      },
      template:
        '<GxListItem list-item-text="No Avatar" list-item-icon="favorite" list-caption="Caption Text" />',
    }),
    {
      info: {
        summary:
          'No avatar Two line List Item display will be automatically set when avatar prop is not provided.',
      },
    }
  )
  .add(
    'One Line With Switch',
    () => ({
      components: {
        GxListItem,
        GxSwitch,
      },
      template:
        '<GxListItem  list-item-text="Text" list-item-icon="favorite" has-switch />',
    }),
    {
      info: {
        summary:
          'One line List Item display a switch when attribute *has-switch* is added',
      },
    }
  )
