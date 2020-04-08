import { storiesOf } from '@storybook/vue'
import GxTodoDashboardCard from '../../components/_Core/Cards/GxTodoDashboardCard.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Cards/GxTodoDashboardCard', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'Default',
    () => ({
      data() {
        return {}
      },
      components: {
        GxTodoDashboardCard,
      },
      methods: {
        handleClick() {
          alert('you clicked')
        },
      },
      template: `
          <ul class="shadow-1 rounded-lg pb-2">
            <GxTodoDashboardCard  subtitle-to-do="Iván Peréz y 2 personas solicitaron unirse " :action-buttons="[{label: 'Aceptar', method: 'handleClick'}, {label: 'Rechazar', method: 'handleClick'}]" title="Solicitud de equipo" date="Hoy a las 9:35 a.m." informative-caption="As"/>
           </ul>
           `,
    }),
    {
      info: {
        summary: `
          This li works for dashboard todos and it's always full width. Notice  <ul> tag needs to be added in the component.
        `,
      },
    }
  )
