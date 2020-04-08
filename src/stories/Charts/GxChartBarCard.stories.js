import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import CenterDecorator from '../addons/CenterDecorator'
import GxChartBarCard from '@components/_Core/Charts/GxChartBarCard.vue'

storiesOf('Charts/Bar', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'GxChartBarCard',
    () => ({
      components: {
        GxChartBarCard,
      },
      data() {
        return {
          dropdownOptions: [
            { value: '2019', label: '2019' },
            { value: '2018', label: '2018' },
            { value: '2017', label: '2017' },
          ],
          dropdownValue: '2019',
          dataset: {
            '2019': [
              { label: 'ENE', formattedAmount: '$80.00 MXN', amount: 80 },
              { label: 'FEB', formattedAmount: '$100.00 MXN', amount: 100 },
              { label: 'MAR', formattedAmount: '$0.00 MXN', amount: 0 },
              { label: 'ABR', formattedAmount: '$120.00 MXN', amount: 120 },
              { label: 'MAY', formattedAmount: '$180.00 MXN', amount: 180 },
              { label: 'JUN', formattedAmount: '$30.00 MXN', amount: 30 },
              { label: 'JUL', formattedAmount: '$40.00 MXN', amount: 40 },
              { label: 'AGO', formattedAmount: '$120.00 MXN', amount: 120 },
              { label: 'SEP', formattedAmount: '$160.00 MXN', amount: 160 },
              {
                label: 'OCT',
                formattedAmount: '$0.00 MXN',
                amount: 0,
                disabled: true,
              },
              {
                label: 'NOV',
                formattedAmount: '$0.00 MXN',
                amount: 0,
                disabled: true,
              },
              {
                label: 'DIC',
                formattedAmount: '$0.00 MXN',
                amount: 0,
                disabled: true,
              },
            ],
            '2018': [
              { label: 'ENE', formattedAmount: '$5.00 MXN', amount: 5 },
              { label: 'FEB', formattedAmount: '$48.00 MXN', amount: 48 },
              { label: 'MAR', formattedAmount: '$0.00 MXN', amount: 0 },
              { label: 'ABR', formattedAmount: '$487.00 MXN', amount: 487 },
              { label: 'MAY', formattedAmount: '$78.00 MXN', amount: 78 },
              { label: 'JUN', formattedAmount: '$7,877.00 MXN', amount: 7877 },
              { label: 'JUL', formattedAmount: '$78.00 MXN', amount: 78 },
              { label: 'AGO', formattedAmount: '$120.00 MXN', amount: 120 },
              { label: 'SEP', formattedAmount: '$160.00 MXN', amount: 160 },
              {
                label: 'OCT',
                formattedAmount: '$0.00 MXN',
                amount: 0,
                disabled: true,
              },
              {
                label: 'NOV',
                formattedAmount: '$0.00 MXN',
                amount: 0,
                disabled: true,
              },
              {
                label: 'DIC',
                formattedAmount: '$0.00 MXN',
                amount: 0,
                disabled: true,
              },
            ],
            '2017': [
              { label: 'ENE', formattedAmount: '$30.00 MXN', amount: 30 },
              { label: 'FEB', formattedAmount: '$78.00 MXN', amount: 78 },
              { label: 'MAR', formattedAmount: '$0.00 MXN', amount: 0 },
              { label: 'ABR', formattedAmount: '$58.00 MXN', amount: 58 },
              { label: 'MAY', formattedAmount: '$180.00 MXN', amount: 180 },
              { label: 'JUN', formattedAmount: '$30.00 MXN', amount: 30 },
              { label: 'JUL', formattedAmount: '$40.00 MXN', amount: 40 },
              { label: 'AGO', formattedAmount: '$120.00 MXN', amount: 120 },
              { label: 'SEP', formattedAmount: '$160.00 MXN', amount: 160 },
              { label: 'OCT', formattedAmount: '$0.00 MXN', amount: 0 },
              { label: 'NOV', formattedAmount: '$0.00 MXN', amount: 0 },
              { label: 'DIC', formattedAmount: '$0.00 MXN', amount: 0 },
            ],
          },
          loading: false,
        }
      },
      watch: {
        dropdownValue(newVal) {
          if (newVal === '2017') {
            this.loading = true
            setTimeout(() => {
              this.loading = false
            }, 500)
          }
        },
      },
      template: `
        <GxChartBarCard v-model="dropdownValue" :loading="loading" :dropdown-options="dropdownOptions" :dataset="dataset[dropdownValue]" />
      `,
    }),
    {
      info: {
        summary: `
          The bar chart card take an array of options, in this case years, and an array as dataset.
          The v-model holds a reference to the selected option to the dropdown. This assumes you need to change the dataset for the
          graph depending on the value selected from this dropdown.
          In this case we have 3 dropdown options, each modifying the dataset being passed.
          You can use the returned value in v-model to retrieve a new dataset asynchronously as well.
          The data set objects can have a disabled option that will render bars in the disabled color and be unclickable. This is useful when
          you need to display bars of months in the future.
          The component accepts a loading state, useful when you need to retrieve new data from the server in response to an option being selected from
          the dropdown menu.
        `,
      },
    }
  )
