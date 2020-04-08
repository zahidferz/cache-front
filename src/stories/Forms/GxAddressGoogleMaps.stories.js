import { storiesOf } from '@storybook/vue'
import GxAddressGoogleMaps from '../../components/_Core/Forms/GxAddressGoogleMaps.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Forms/GxAddressGoogleMaps', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'default',
    () => ({
      components: {
        GxAddressGoogleMaps,
      },
      data() {
        return {
          value: 'Avenida Paseo de la Reforma 222',
          address: {
            city: 'Ciudad de México',
            country: 'Mexico',
            countryCode: 'MX',
            municipality: 'Juárez',
            neighborhood: null,
            outsideNumber: '222',
            postalCode: '06600',
            state: 'Ciudad de México',
            street: 'Avenida Paseo de la Reforma',
          },
          // preexistingValue: `${this.address.street} ${
          //   this.address.outsideNumber
          // }, ${this.address.municipality}, ${this.address.neighborhood}, ${
          //   this.address.city
          // }, ${this.address.state}, ${this.address.country}, ${
          //   this.address.postalCode
          // }`,
        }
      },
      template: `
        <div class="w-full">
          <GxAddressGoogleMaps @validAddress="address=$event" icon-right="expand_more" v-model="value" label="Dirección" placeholder="Dirección" />
          <GxAddressGoogleMaps disabled icon-right="expand_more" v-model="value" label="Dirección" placeholder="Dirección" />
        </div>
      `,
    }),
    {
      info: {
        summary: `
          GxAddressGoogleMaps is styled the same was as a GxInput,
          but renders a dynamic list of matches returned by the Google Maps Places API.
        `,
      },
    }
  )
