import { storiesOf } from '@storybook/vue'
import GxModal from '../../components/_Core/Modals/GxModal.vue'
import GxCardCore from '../../components/_Core/Cards/GxCardCore.vue'
import CenterDecorator from '../addons/CenterDecorator'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Modals/GxModal', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'default',
    () => ({
      data() {
        return {
          showModal: false,
        }
      },
      components: {
        GxModal,
        GxCardCore,
        // GxButtonCircle,
      },
      methods: {
        closeMethod() {
          alert('Modal emits a close method to be handled by parent.')
        },
        toggleModal() {
          alert('kj')
          this.showModal = true
        },
      },
      template: `<div class="flex justify-center w-full mb-6">
        <GxButtonCircle icon="cloud_upload" label="cloud_upload" @click="toggleModal" />
        <GxModal v-if="showModal" @close="showModal = false">
          <GxCardCore>
            <p class="p-4">Some card inside a modal</p>
          </GxCardCore>
        </GxModal>
      </div>`,
    }),
    {
      info: {
        summary: `
          Modal creates a transparent gray overlay with centered content in a slot.
          It also prevents the background from scrolling.
          Modal emits a close event when user clicks outside the slot content or presses Esc.
        `,
      },
    }
  )
