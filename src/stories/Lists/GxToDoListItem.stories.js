import { storiesOf } from '@storybook/vue'
import GxToDoListItem from '../../components/_Core/Lists/GxToDoListItem'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Lists/GxToDoListItem', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Example',
    () => ({
      data() {
        return {
          image: require('@src/assets/images/UNASSIGNED/7.svg'),
        }
      },
      methods: {
        onClick(msg) {
          alert(msg)
        },
      },
      components: {
        GxToDoListItem,
      },
      template: `
      <GxToDoListItem
          has-chevron
          avatar-shape="circle"
          :avatar-img="image"
          title="Mantenlo simple"
          subtitle="¡Bienvenido a FINTONE!"
          caption="Tiempo: 5 minutos"
          chip-text="10 Facturas"
          @click="onClick('Clicked ToDo List Item')"
        />
    `,
      propsDescription: {
        GxToDoListItem: {
          chipText:
            'Text will be displayed on the chip. If device has a width below 440px chip wont be displayed.',
          caption:
            'Caption Text is used to display a caption right under the Subtitle.',
          avatarImg:
            'url or location from the image to show in the GxAvatar element, if it is not provided the display will change.',
          avatarShape:
            'This prop sets the avatar shape, could be horizontal, bigSquare, square, rounded-full, if it is not defined will set rounded-full by default but it will only show it if avatarImg exists',
          title: 'Text will be display with font bold.',
          subtitle: 'Text will be displayed under the title.',
          hasChevron:
            'passing this prop as attribute will display chevron_right icon next to the chip',
        },
      },
    }),
    {
      info: {
        summary: `<b>GxToDoListItem</b> has an horizontal *GxAvatar*, a title, subtitle and a caption.
          <b>Not</b> setting any of this props will change the display accordingly.
          Width will fill the screen dimensions.
          You can add a chip with text or the chevron icon that can trigger an action.`,
      },
    }
  )
  .add(
    'Example List of items',
    () => ({
      data() {
        return {
          items: [
            {
              chevron: true,
              avatar: 'circle',
              image: require('@src/assets/images/UNASSIGNED/7.svg'),
              title: 'Mantenlo simple',
              subtitle: '¡Bienvenido a FINTONE!',
              caption: 'Tiempo: 5 minutos',
              chip: 'Muchas Facturas',
            },
            {
              chevron: true,
              avatar: 'circle',
              image: require('@src/assets/images/UNASSIGNED/7.svg'),
              title: 'Mantenlo simple',
              subtitle: '¡Bienvenido a FINTONE!',
              caption: 'Tiempo: 5 minutos',
              chip: '10 Muchas Facturas',
            },
          ],
        }
      },
      methods: {
        onClick(msg) {
          alert(msg)
        },
      },
      components: {
        GxToDoListItem,
      },
      template: `
      <div>
        <div v-for="(item, index) in items">
          <GxToDoListItem
              :has-chevron="item.chevron"
              :avatar-shape="item.avatar"
              :avatar-img="item.image"
              :title="item.title"
              :subtitle="item.subtitle"
              :caption="item.caption"
              :chip-text="item.chip"
              @click="onClick(index)"
            />
        </div>
      </div>
    `,
      propsDescription: {
        GxToDoListItem: {
          chipText: 'Text will be displayed on the chip.',
          caption:
            'Caption Text is used to display a caption right under the Subtitle.',
          avatarImg:
            'url or location from the image to show in the GxAvatar element, if it is not provided the display will change.',
          avatarShape:
            'This prop sets the avatar shape, could be horizontal, bigSquare, square, rounded-full, if it is not defined will set rounded-full by default but it will only show it if avatarImg exists',
          title: 'Text will be display with font bold.',
          subtitle: 'Text will be displayed under the title.',
          hasChevron:
            'passing this prop as attribute will display chevron_right icon next to the chip',
        },
      },
    }),
    {
      info: {
        summary: `<b>GxToDoListItem</b> has an horizontal *GxAvatar*, a title, subtitle and a caption.
          <b>Not</b> setting any of this props will change the display accordingly.
          Width will fill the screen dimensions.
          You can add a chip with text or the chevron icon that can trigger an action.`,
      },
    }
  )
  .add(
    'No Avatar',
    () => ({
      data() {
        return {
          image: require('@src/assets/images/UNASSIGNED/7.svg'),
        }
      },
      components: {
        GxToDoListItem,
      },
      template: `
      <GxToDoListItem
          has-chevron
          title="Mantenlo simple"
          subtitle="¡Bienvenido a FINTONE!"
          caption="Tiempo: 5 minutos"
          chip-text="Añadir"
          @click="onClick('Clicked ToDo List Item')"
        />
    `,
      propsDescription: {
        GxToDoListItem: {
          chipText: 'Text will be displayed on the chip.',
          caption:
            'Caption Text is used to display a caption right under the Subtitle.',
          avatarImg:
            'url or location from the image to show in the GxAvatar element, if it is not provided the display will change.',
          avatarShape:
            'This prop sets the avatar shape, could be horizontal, bigSquare, square, rounded-full, if it is not defined will set rounded-full by default but it will only show it if avatarImg exists',
          title: 'Text will be display with font bold.',
          subtitle: 'Text will be displayed under the title.',
          hasChevron:
            'passing this prop as attribute will display chevron_right icon next to the chip',
        },
      },
    }),
    {
      info: {
        summary: `<b>GxToDoListItem</b> has an horizontal *GxAvatar*, a title, subtitle and a caption.
          <b>Not</b> setting any of this props will change the display accordingly.
          Width will fill the screen dimensions.
          You can add a chip with text or the chevron icon that can trigger an action.`,
      },
    }
  )
  .add(
    'No chip',
    () => ({
      data() {
        return {
          image: require('@src/assets/images/UNASSIGNED/7.svg'),
        }
      },
      components: {
        GxToDoListItem,
      },
      template: `
      <GxToDoListItem
          has-chevron
          avatar-shape="circle"
          :avatar-img="image"
          title="Mantenlo simple"
          subtitle="¡Bienvenido a FINTONE!"
          caption="Tiempo: 5 minutos"
          @click="onClick('Clicked ToDo List Item')"
        />
    `,
      propsDescription: {
        GxToDoListItem: {
          chipText: 'Text will be displayed on the chip.',
          caption:
            'Caption Text is used to display a caption right under the Subtitle.',
          avatarImg:
            'url or location from the image to show in the GxAvatar element, if it is not provided the display will change.',
          avatarShape:
            'This prop sets the avatar shape, could be horizontal, bigSquare, square, rounded-full, if it is not defined will set rounded-full by default but it will only show it if avatarImg exists',
          title: 'Text will be display with font bold.',
          subtitle: 'Text will be displayed under the title.',
          hasChevron:
            'passing this prop as attribute will display chevron_right icon next to the chip',
        },
      },
    }),
    {
      info: {
        summary: `<b>GxToDoListItem</b> has an horizontal *GxAvatar*, a title, subtitle and a caption.
          <b>Not</b> setting any of this props will change the display accordingly.
          Width will fill the screen dimensions.
          You can add a chip with text or the chevron icon that can trigger an action.`,
      },
    }
  )
  .add(
    'No chevron icon',
    () => ({
      data() {
        return {
          image: require('@src/assets/images/UNASSIGNED/7.svg'),
        }
      },
      components: {
        GxToDoListItem,
      },
      template: `
      <GxToDoListItem
          avatar-shape="circle"
          :avatar-img="image"
          title="Mantenlo simple"
          subtitle="¡Bienvenido a FINTONE!"
          caption="Tiempo: 5 minutos"
          chip-text="Añadir"
          @click="onClick('Clicked ToDo List Item')"
        />
    `,
      propsDescription: {
        GxToDoListItem: {
          chipText: 'Text will be displayed on the chip.',
          caption:
            'Caption Text is used to display a caption right under the Subtitle.',
          avatarImg:
            'url or location from the image to show in the GxAvatar element, if it is not provided the display will change.',
          avatarShape:
            'This prop sets the avatar shape, could be horizontal, bigSquare, square, rounded-full, if it is not defined will set rounded-full by default but it will only show it if avatarImg exists',
          title: 'Text will be display with font bold.',
          subtitle: 'Text will be displayed under the title.',
          hasChevron:
            'passing this prop as attribute will display chevron_right icon next to the chip',
        },
      },
    }),
    {
      info: {
        summary: `<b>GxToDoListItem</b> has an horizontal *GxAvatar*, a title, subtitle and a caption.
          <b>Not</b> setting any of this props will change the display accordingly.
          Width will fill the screen dimensions.
          You can add a chip with text or the chevron icon that can trigger an action.`,
      },
    }
  )
  .add(
    'No Chip no Chevron no caption',
    () => ({
      data() {
        return {
          image: require('@src/assets/images/UNASSIGNED/7.svg'),
        }
      },
      components: {
        GxToDoListItem,
      },
      template: `
      <GxToDoListItem
          avatar-shape="circle"
          :avatar-img="image"
          title="Mantenlo simple"
          subtitle="¡Bienvenido a FINTONE!"
          @click="onClick('Clicked ToDo List Item')"
        />
    `,
      propsDescription: {
        GxToDoListItem: {
          chipText: 'Text will be displayed on the chip.',
          caption:
            'Caption Text is used to display a caption right under the Subtitle.',
          avatarImg:
            'url or location from the image to show in the GxAvatar element, if it is not provided the display will change.',
          avatarShape:
            'This prop sets the avatar shape, could be horizontal, bigSquare, square, rounded-full, if it is not defined will set rounded-full by default but it will only show it if avatarImg exists',
          title: 'Text will be display with font bold.',
          subtitle: 'Text will be displayed under the title.',
          hasChevron:
            'passing this prop as attribute will display chevron_right icon next to the chip',
        },
      },
    }),
    {
      info: {
        summary: `<b>GxToDoListItem</b> has an horizontal *GxAvatar*, a title, subtitle and a caption.
          <b>Not</b> setting any of this props will change the display accordingly.
          Width will fill the screen dimensions.
          You can add a chip with text or the chevron icon that can trigger an action.`,
      },
    }
  )
