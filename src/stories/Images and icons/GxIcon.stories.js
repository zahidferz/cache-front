import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import GxIcon from '../../components/_Core/Icons/GxIcon.vue'
import CenterDecorator from '../addons/CenterDecorator'

storiesOf('Icons/GxIcon', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Examples - Dimensions with adjacent text',
    () => ({
      template: `
        <div>
          <div class="mb-8 flex flex-col">
            <label for="text">Texto
              <input class="border" id="text" v-model="text" />
            </label>
            <label for="textClass">Text class
              <select class="border" id="textClass" v-model="textClass">
                <option value="gx-body">gx-body</option>
                <option value="gx-overline">gx-overline</option>
                <option value="gx-caption">gx-caption</option>
                <option value="gx-subtitle">gx-subtitle</option>
                <option value="gx-h1">gx-h1</option>
                <option value="gx-h2">gx-h2</option>
                <option value="gx-h3">gx-h3</option>
                <option value="gx-h4">gx-h4</option>
                <option value="gx-h5">gx-h5</option>
                <option value="gx-h6">gx-h6</option>
              </select>
            </label>
            <label for="icon">Ícono
              <input class="border" id="icon" v-model="icon" />
            </label>
            <label for="iconfontsize">Ícono tamaño
              <input class="border" type="number" id="iconfontsize" v-model="iconFontSize" />
            </label>
            <label for="iconMarginRight">Espacio entre ícono y texto
              <select class="border" id="iconMarginRight" v-model="iconMarginRight">
                <option value="">0</option>
                <option value="mr-2">8px</option>
                <option value="mr-4">16px</option>
                <option value="mr-8">32px</option>
              </select>
            </label>
          </div>
          <div class="border border-primary p-4 flex items-center justify-center">
            <GxIcon :icon="icon" :class="iconMarginRight" class="border border-gray" :style="iconFontSizeParse" />
            <p :class="textClass" class="border border-gray">{{text}}</p>
          </div>
        </div>
      `,
      data() {
        return {
          text: 'Dummy text',
          textClass: 'gx-body',
          icon: 'email',
          iconFontSize: '24',
          iconMarginRight: '',
        }
      },
      computed: {
        iconFontSizeParse() {
          return `font-size: ${this.iconFontSize}px;`
        },
      },
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
          <b>mail</b> icon is usually placed inside an email input.
        `,
      },
    }
  )
  .add(
    'Example - All icons',
    () => ({
      data() {
        return {
          copySuccess: '',
        }
      },
      methods: {
        copyToClipboard(msg) {
          const el = document.createElement('textarea')
          el.value = msg
          document.body.appendChild(el)
          el.select()
          document.execCommand('copy')
          document.body.removeChild(el)

          const success = document.execCommand('copy')
          if (success) {
            this.copySuccess = `Successfully copied <b class="text-black">${msg}</b> to clipboard`
          } else {
            this.copySuccess = 'Unable to copy to clipboard'
          }
        },
      },
      template: `
        <div>
          <div class="bg-success text-white text-center" v-html="copySuccess"></div>
          <p>Click any icon to copy it's name to the clipboard</p>
          <div class="flex flex-wrap items-center">
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('notifications')">
              <GxIcon icon="notifications" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('menu')">
              <GxIcon icon="menu" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('keyboard_backspace')">
              <GxIcon icon="keyboard_backspace" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('more_vert')">
              <GxIcon icon="more_vert" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('close')">
              <GxIcon icon="close" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('search')">
              <GxIcon icon="search" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('add')">
              <GxIcon icon="add" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('add_circle')">
              <GxIcon icon="add_circle" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('remove_circle')">
              <GxIcon icon="remove_circle" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('check_circle')">
              <GxIcon icon="check_circle" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('cancel')">
              <GxIcon icon="cancel" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('arrow_drop_down')">
              <GxIcon icon="arrow_drop_down" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('arrow_drop_up')">
              <GxIcon icon="arrow_drop_up" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('arrow_left')">
              <GxIcon icon="arrow_left" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('arrow_right')">
              <GxIcon icon="arrow_right" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('expand_more')">
              <GxIcon icon="expand_more" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('expand_less')">
              <GxIcon icon="expand_less" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('chevron_left')">
              <GxIcon icon="chevron_left" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('chevron_right')">
              <GxIcon icon="chevron_right" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('check')">
              <GxIcon icon="check" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('face')">
              <GxIcon icon="face" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('share')">
              <GxIcon icon="share" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('thumb_up')">
              <GxIcon icon="thumb_up" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('visibility')">
              <GxIcon icon="visibility" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('favorite')">
              <GxIcon icon="favorite" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('location_on')">
              <GxIcon icon="location_on" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('save')">
              <GxIcon icon="save" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('phone_iphone')">
              <GxIcon icon="phone_iphone" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('email')">
              <GxIcon icon="email" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('lock')">
              <GxIcon icon="lock" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('business')">
              <GxIcon icon="business" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('accessibility_new')">
              <GxIcon icon="accessibility_new" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('store_mall_directory')">
              <GxIcon icon="store_mall_directory" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('notes')">
              <GxIcon icon="notes" />
            </div>
            <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('notes')">
              <GxIcon icon="dashboard" />
            </div>
           <div class="flex flex-col items-center w-32 m-2 cursor-pointer" @click="copyToClipboard('notes')">
              <GxIcon icon="autorenew" />
            </div>
          </div>
        </div>
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
          Icons are controlled via font-size. They are 1rem and black color by default.\n
          If an icon is making a main accion its color must be primary-500
        `,
      },
    }
  )
  .add(
    'mail',
    () => ({
      template: `
          <GxIcon icon="email" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
          <b>mail</b> icon is usually placed inside an email input.
        `,
      },
    }
  )
  .add(
    'lock',
    () => ({
      template: `
          <GxIcon icon="lock" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
          <b>lock</b> icon is usually placed inside a password input or any other field with sensitive information.
        `,
      },
    }
  )
  .add(
    'arrow_forward',
    () => ({
      template: `
          <GxIcon icon="arrow_forward" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
        <b>arrow_forward</b> icon is usually placed inside a FAB indicating next action or step.
        `,
      },
    }
  )
  .add(
    'face',
    () => ({
      template: `
          <GxIcon icon="face" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
        <b>face</b> icon is usually placed inside a name input or indicating user info.
        `,
      },
    }
  )
  .add(
    'phone_iphone',
    () => ({
      template: `
          <GxIcon icon="phone_iphone" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
        <b>phone_iphone</b> icon is usually placed inside a phone input.
        `,
      },
    }
  )
  .add(
    'add',
    () => ({
      template: `
          <GxIcon icon="add" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
        <b>add</b> icon is usually placed inside a FAB indicating adding elements action available.
        `,
      },
    }
  )
  .add(
    'chevron_right',
    () => ({
      template: `
          <GxIcon icon="chevron_right" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
        <b>chevron_right</b> Icon is usually placed inside list items indicating more actions are available.
        `,
      },
    }
  )
  .add(
    'keyboard_backspace',
    () => ({
      template: `

          <GxIcon icon="keyboard_backspace" />

      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
        <b>keyboard_backspace</b> icon is usually placed inside a FAB indicating goBack action or slide to left action.
        `,
      },
    }
  )
  .add(
    'check_circle',
    () => ({
      template: `
          <GxIcon icon="check_circle" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
        <b>check_circle</b> Icon is placed over a card containing only an image, when selected.
        `,
      },
    }
  )
  .add(
    'business_center',
    () => ({
      template: `
          <GxIcon icon="business_center" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
        <b>business_center</b> Icon is usually placed inside input for companyName or any other input with company info related.
        `,
      },
    }
  )
  .add(
    'library_books',
    () => ({
      template: `
          <GxIcon icon="library_books" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
        <b>library_books</b> Icon is usually placed inside input related with bank user info.
        `,
      },
    }
  )
  .add(
    'close',
    () => ({
      template: `
        <GxIcon icon="close" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
        <b>close</b> icon is usually placed inside a navbar when page can be close or cancelled.
        `,
      },
    }
  )
  .add(
    'RFC',
    () => ({
      template: `
        <GxIcon icon="business" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
        <b>business</b> icon is placed inside inputs related with the Federal Taxpayer Registry (RFC) of the user.
        `,
      },
    }
  )
  .add(
    'menu',
    () => ({
      template: `
          <GxIcon icon="menu" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
        <b>menu</b> icon is usually placed in a navbar to indicate there is a menu, this icon is the universal symbol for a menu in mobile devices.
        `,
      },
    }
  )
  .add(
    'more_vert',
    () => ({
      template: `
          <GxIcon icon="more_vert" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
        <b>more_vert</b> icon three dots vertical aligned to show a menu, usually placed on a navbar in mobile devices.
        `,
      },
    }
  )
  .add(
    'add_circle',
    () => ({
      template: `
          <GxIcon icon="add_circle" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
        <b>add_circle</b> icon will be used to indicate zoom in.
        `,
      },
    }
  )
  .add(
    'remove_circle',
    () => ({
      template: `
          <GxIcon icon="remove_circle" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
        <b>remove_circle</b> icon will be used to indicate zoom out.
        `,
      },
    }
  )
  .add(
    'notes',
    () => ({
      template: `
          <GxIcon icon="notes" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
        <b>notes</b> icon will be used on some inputs were user must  add information that
        \n will be specified on the input label.
        `,
      },
    }
  )
  .add(
    'store_mall_directory',
    () => ({
      template: `
          <GxIcon icon="store_mall_directory" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
        <b>store_mall_directory</b> icon will be used on some inputs were user must add information about their commercial business
        `,
      },
    }
  )
  .add(
    'dashboard',
    () => ({
      template: `
          <GxIcon icon="dashboard" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
        <b>dashboard</b> icon is for making a reference to the dashboard.
        `,
      },
    }
  )
  .add(
    'autorenew',
    () => ({
      template: `
          <GxIcon icon="autorenew" />
      `,
      components: {
        GxIcon,
      },
    }),
    {
      info: {
        summary: `
        <b>autorenew</b> icon is usually placed to indicate some data is updating or needs to be updated.
        `,
      },
    }
  )
