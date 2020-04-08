import { storiesOf } from '@storybook/vue'
import GxClientCard from '../../components/_Core/Cards/GxClientCard.vue'
import GxSwipe from '@components/_Core/Utils/GxSwipe.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Cards/GxClientCard', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Default',
    () => ({
      components: {
        GxClientCard,
      },
      data() {
        return {
          commercialName: 'Supramex',
          taxId: 'GEPD9211188I1',
        }
      },
      methods: {
        myFunction() {
          alert('you clicked')
        },
      },
      template: `
        <GxClientCard class="w-full" :commercialName="commercialName" :taxId="taxId"/>`,
      propsDescription: {
        GxClientCard: {
          commercialName:
            'Is the commercial Name of the client. This prop is required.',
          taxId:
            'TaxId of the client. The default is empty and will not show or change the card layout',
          avatarUrl:
            'Url string, is used to set the image for the avatar. In case this prop is missed, Card will automatically set the initials from the commercial Name with a random background color ',
          recientActivityStatus:
            'Its a number and it helps identifying recient client activity',
        },
      },
    }),
    {
      info: {
        summary: `
          GxClientCard is used to display specific data from a client.
        `,
      },
    }
  )
  .add(
    'With avatarUrl',
    () => ({
      components: {
        GxClientCard,
      },
      data() {
        return {
          commercialName: 'Supramex',
          taxId: 'GEPD9211188I1',
          avatarUrl: require('@assets/images/Storybook/mo_005_1_cliente1.png'),
        }
      },
      methods: {
        myFunction() {
          alert('you clicked')
        },
      },
      template: `
        <GxClientCard class="w-full" :commercialName="commercialName" :taxId="taxId" :avatarUrl="avatarUrl"/>`,
      propsDescription: {
        GxClientCard: {
          commercialName:
            'Is the commercial Name of the client. This prop is required.',
          taxId:
            'TaxId of the client. The default is empty and will not show or change the card layout',
          avatarUrl:
            'Url string, is used to set the image for the avatar. In case this prop is missed, Card will automatically set the initials from the commercial Name with a random background color ',
          recientActivityStatus:
            'Its a number and it helps identifying recient client activity',
        },
      },
    }),
    {
      info: {
        summary: `
          GxClientCard is used to display specific data from a client.
        `,
      },
    }
  )
  .add(
    'No TaxId',
    () => ({
      components: {
        GxClientCard,
      },
      data() {
        return {
          commercialName: 'Supramex',
          avatarUrl: require('@assets/images/Storybook/mo_005_1_cliente1.png'),
        }
      },
      methods: {
        myFunction() {
          alert('you clicked')
        },
      },
      template: `
        <GxClientCard class="w-full" :commercialName="commercialName" :avatarUrl="avatarUrl"/>`,
      propsDescription: {
        GxClientCard: {
          commercialName:
            'Is the commercial Name of the client. This prop is required.',
          taxId:
            'TaxId of the client. The default is empty and will not show or change the card layout',
          avatarUrl:
            'Url string, is used to set the image for the avatar. In case this prop is missed, Card will automatically set the initials from the commercial Name with a random background color ',
          recientActivityStatus:
            'Its a number and it helps identifying recient client activity',
        },
      },
    }),
    {
      info: {
        summary: `
          GxClientCard is used to display specific data from a client.
        `,
      },
    }
  )
  .add(
    'List',
    () => ({
      components: {
        GxClientCard,
      },
      data() {
        return {
          clients: [
            {
              commercialName: 'Cliente uno',
              taxId: 'GAPU8909188I7',
            },
            {
              commercialName: 'Cliente dos',
              recientActivityStatus: 2,
              taxId: 'GAPU8909188I0',
            },
            {
              commercialName: 'Cliente Tres',
              avatarUrl: require('@assets/images/Storybook/mo_005_1_cliente1.png'),
            },
            {
              commercialName: 'Cliente Cuatro',
              taxId: 'GAPU8709188I0',
              recientActivityStatus: 2,
              avatarUrl: require('@assets/images/Storybook/mo_005_1_cliente1.png'),
            },
          ],
        }
      },
      methods: {
        myFunction() {
          alert('you clicked')
        },
      },
      template: `
        <div class="w-full">
          <GxClientCard v-for="client in clients" :key="client.commercialName" :commercialName="client.commercialName" :avatarUrl="client.avatarUrl" :taxId="client.taxId" :recientActivityStatus="client.recientActivityStatus"/>
        </div>`,
      propsDescription: {
        GxClientCard: {
          commercialName:
            'Is the commercial Name of the client. This prop is required.',
          taxId:
            'TaxId of the client. The default is empty and will not show or change the card layout',
          avatarUrl:
            'Url string, is used to set the image for the avatar. In case this prop is missed, Card will automatically set the initials from the commercial Name with a random background color ',
          recientActivityStatus:
            'Its a number and it helps identifying recient client activity',
        },
      },
    }),
    {
      info: {
        summary: `
          GxClientCard is used to display specific data from a client.
        `,
      },
    }
  )
  .add(
    'With detail (desktop)',
    () => ({
      components: {
        GxClientCard,
      },
      data() {
        return {
          commercialName: 'Supramex',
          avatarUrl: require('@assets/images/Storybook/mo_005_1_cliente1.png'),
        }
      },
      methods: {
        myFunction() {
          alert('More detail')
        },
      },
      template: `
        <GxClientCard class="w-full" :commercialName="commercialName" :avatarUrl="avatarUrl" taxId="CORD236323212" show-icon-eye="true" :icon-click-handler="myFunction" />`,
      propsDescription: {
        GxClientCard: {
          commercialName:
            'Is the commercial Name of the client. This prop is required.',
          taxId:
            'TaxId of the client. The default is empty and will not show or change the card layout',
          avatarUrl:
            'Url string, is used to set the image for the avatar. In case this prop is missed, Card will automatically set the initials from the commercial Name with a random background color ',
          recientActivityStatus:
            'Its a number and it helps identifying recient client activity',
          showIconEye:
            'Its a boolean property to display the icon for more detail',
        },
      },
    }),
    {
      info: {
        summary: `
          GxClientCard is used to display specific data from a client. To show more detail on desktop add the property showIconEye which will make this icon visible when user hovers over the card.
          The icon is a button that will take the user to more detail.
        `,
      },
    }
  )
  .add(
    'With detail (Mobile)',
    () => ({
      components: {
        GxClientCard,
        GxSwipe,
      },
      data() {
        return {
          commercialName: 'Supramex',
          avatarUrl: require('@assets/images/Storybook/mo_005_1_cliente1.png'),
        }
      },
      methods: {
        myFunction() {
          alert('More detail')
        },
      },
      template: `
      <GxSwipe class="w-full" >
      <GxClientCard
        commercial-name="Gestionix"
        tax-id="XARG95030164"
        class="w-full"
        :avatar-url="avatarUrl"
        :recient-activity-status="2"
      />
      <template v-slot:right>
        <GxTextLink
          class="flex justify-center items-center px-4 bg-primary text-white"
          :to="{
            name: 'clientgeneralinfo',
          }"
        >
          Ver detalle
        </GxTextLink>
      </template>
    </GxSwipe>`,
      propsDescription: {
        GxClientCard: {
          commercialName:
            'Is the commercial Name of the client. This prop is required.',
          taxId:
            'TaxId of the client. The default is empty and will not show or change the card layout',
          avatarUrl:
            'Url string, is used to set the image for the avatar. In case this prop is missed, Card will automatically set the initials from the commercial Name with a random background color ',
          recientActivityStatus:
            'Its a number and it helps identifying recient client activity',
          showIconEye:
            'Its a boolean property to display the icon for more detail',
        },
      },
    }),
    {
      info: {
        summary: `
          GxClientCard is used to display specific data from a client. To show more detail on Mobile add GxSwipe component and a slot to custom your "show detail" element.
        `,
      },
    }
  )
