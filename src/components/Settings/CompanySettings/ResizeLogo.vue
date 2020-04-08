<script>
import VueCropper from 'vue-cropperjs'
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'
import { UPLOAD_COMPANY_LOGO } from '@src/apollo//mutations'
import { COMPANY_INFO, LOCAL_COMPANY } from '@src/apollo/queries'
import GxIcon from '@components/_Core/Icons/GxIcon'

export default {
  name: 'ResizeLogo',
  components: {
    GxCardModal,
    VueCropper,
    GxIcon,
  },
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
  },
  apollo: {
    company: LOCAL_COMPANY,
    myAccount: {
      query: COMPANY_INFO,
      variables() {
        return {
          companyNumber: this.company.number,
        }
      },
      skip() {
        return !this.company
      },
    },
  },
  data() {
    return {
      file: null,
      succesTimeout: null,
      errorTimeout: null,
      croppedImage: null,
      customError: null,
      loading: false,
      deskRange: 50,
      company: null,
      showUpdateSuccessfulModal: false,
      updateSuccessImg: require('@assets/images/Signup/InitialTodos/mo_and_de_user_success.svg'),
    }
  },
  computed: {
    editMode() {
      return this.$route && this.$route.query.edit
    },
    companyLogo() {
      if (this.myAccount && this.myAccount.companies[0].company.companyLogo) {
        return this.myAccount.companies[0].company.companyLogo
      } else {
        return null
      }
    },
  },
  created() {
    if (!this.imageSrc) {
      this.$router.push({ name: 'uploadcompanylogo' })
    }
  },
  methods: {
    toDrawerRight() {
      this.$router.push({ name: 'dashboard', query: { drawerRight: true } })
    },
    async croppedImageToBase64() {
      return new Promise((resolve, reject) => {
        this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
          var reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = function() {
            var base64data = reader.result

            resolve(base64data)
          }
        })
      })
    },
    async onSubmit() {
      this.loading = true
      try {
        this.croppedImage = await this.croppedImageToBase64()
        const splitImg = this.croppedImage.split(',')[1]
        await this.$apollo.mutate({
          mutation: UPLOAD_COMPANY_LOGO,
          variables: {
            companyNumber: this.myAccount.companies[0].company.companyNumber,
            data: {
              companyDocumentsLogo: splitImg,
              companyLogo: splitImg,
            },
          },
          update: (store, { data }) => {
            const query = {
              query: COMPANY_INFO,
              variables: {
                companyNumber: this.company.number,
              },
            }
            const oldData = store.readQuery(query)
            const newLogo =
              data.companyUpdateInfo.updatedCompany.companyDocumentsLogo +
              `?${new Date().getTime()}`
            oldData.myAccount.companies[0].company.companyLogo = newLogo
            store.writeQuery({
              ...query,
              data: oldData,
            })

            /* eslint-disable */
            console.log('Updated data with logo: ', newLogo)
            /* eslint-enable */

            // Force persist-cache update for next reloads
            this.$apollo.queries.myAccount.refetch()
          },
        })
        this.loading = false
        this.showUpdateSuccessfulModal = true
        this.succesTimeout = setTimeout(() => {
          this.onSuccesModalClose()
        }, 3000)
      } catch (error) {
        this.loading = false
        this.customError = this.$utils.parseServerError(error)
        this.errorTimeout = setTimeout(() => {
          this.onErrorModalClose()
        }, 3000)
      }
    },
    onErrorModalClose() {
      if (this.errorTimeout) {
        clearTimeout(this.errorTimeout)
      }
      this.customError = ''
    },
    onSuccesModalClose() {
      if (this.succesTimeout) {
        clearTimeout(this.succesTimeout)
      }
      this.showUpdateSuccessfulModal = false
      if (this.$route.query.edit) {
        this.toDrawerRight()
      } else {
        this.$router.push({ name: 'invoicepreview' })
      }
    },
    scaleImage() {
      const value = this.deskRange
      const factor = value / 50
      // VueCropper function to scale an image
      const scale = this.$refs.cropper.scale
      scale(factor)
    },

    deskZoomout() {
      if (this.deskRange > 0) {
        this.deskRange = this.deskRange - 10
        this.scaleImage()
      }
    },
    deskZoomin() {
      if (this.deskRange < 100) {
        this.deskRange = this.deskRange + 10
        this.scaleImage()
      }
    },
  },
}
</script>
<template>
  <div v-if="$mq === 'mo'" class="flex-grow flex flex-col items-center p-4">
    <p class="mb-8 text-center"
      >Este logotipo aparecerá en tu perfil y los documentos que emitas en
      Chain.</p
    >
    <div>
      <!-- <div id="croppie-container" class="w-64 h-64"></div> -->
      <VueCropper
        v-if="imageSrc"
        ref="cropper"
        :src="imageSrc"
        alt="Source Image"
        :auto-crop-area="0.5"
        :min-container-width="350"
        :min-container-height="350"
        :background="true"
        :rotatable="true"
        :img-style="{ width: '350px', height: '350px' }"
        :aspect-ratio="1"
        :zoomable="true"
        :crop-box-resizable="false"
        :check-orientation="true"
        :min-crop-box-width="250"
        :min-crop-box-height="250"
      >
      </VueCropper>
    </div>
    <!-- Rotate controls -->
    <div class="mt-4" style="font-size: 2rem;">
      <GxIcon icon="rotate_90_degrees_ccw" @click="$refs.cropper.rotate(-90)" />
    </div>
    <div class="flex-grow flex flex-col justify-end mt-8">
      <GxButton :loading="loading" @click="onSubmit">Guardar</GxButton>
    </div>
    <GxCardModal
      v-if="customError"
      :headline="customError"
      :card-img="$utils.alertImages.Oops"
      :alt="customError"
      text-body="Vuelve a intentarlo"
      @click="customError = !customError"
    />
    <GxCardModal
      v-if="showUpdateSuccessfulModal"
      headline="Logo actualizado"
      :card-img="$utils.alertImages.Done"
      alt="Logo actualizado"
      @close="onSuccesModalClose"
    />
  </div>
  <div v-else class="flex-grow flex flex-col items-center">
    <header class="w-full  flex justify-start items-center mt-4">
      <i class="material-icons-round iconSize text-primary mr-4">receipt</i>
      <h4 class="gx-h4 font-bold">Ajusta tu logotipo</h4>
    </header>
    <p class="text-left mt-4 self-start"
      >Este logotipo aparecerá en tu perfil y los documentos que emitas en
      Chain.
    </p>
    <main class="flex-grow flex-col flex justify-center items-center">
      <!-- <div id="croppie-container" class="w-64 h-64"></div> -->
      <VueCropper
        v-if="imageSrc"
        ref="cropper"
        :src="imageSrc"
        alt="Source Image"
        :auto-crop-area="0.5"
        :min-container-width="350"
        :min-container-height="350"
        :background="true"
        :rotatable="true"
        :img-style="{ width: '350px', height: '350px' }"
        :aspect-ratio="1"
        :zoomable="false"
        :crop-box-resizable="false"
        :min-crop-box-width="250"
        :min-crop-box-height="250"
      >
      </VueCropper>
      <!-- Rotate controls -->
      <div class="mt-4" style="font-size: 2rem;">
        <GxIcon
          icon="rotate_90_degrees_ccw"
          @click="$refs.cropper.rotate(-90)"
        />
      </div>
      <div class="gx-controls mt-6 flex justify-start items-center">
        <GxIcon
          html-tag="button"
          icon="remove_circle"
          class="mr-4 text-xl text-primary-600"
          @click.prevent="deskZoomout"
        />
        <input
          id="volume"
          v-model.number="deskRange"
          class="w-full cursor-pointer gx-range"
          type="range"
          name="volume"
          min="0"
          step="1"
          max="100"
          @input="scaleImage"
        />
        <GxIcon
          html-tag="button"
          icon="add_circle"
          class="ml-4 text-xl text-primary-600"
          @click.prevent="deskZoomin"
        />
      </div>
      <div class="mt-8 text-center flex flex-col items-center">
        <GxButton :loading="loading" @click="onSubmit">Guardar</GxButton>
        <GxTextLink
          class="text-secondary-300 text-center mt-2"
          :to="{ name: 'uploadcompanylogo', query: { edit: editMode } }"
        >
          Elegir otra imagen
        </GxTextLink>
      </div>
      <GxCardModal
        v-if="customError"
        :headline="customError"
        :card-img="$utils.alertImages.Oops"
        :alt="customError"
        text-body="Vuelve a intentarlo"
        @click="customError = !customError"
      />
      <GxCardModal
        v-if="showUpdateSuccessfulModal"
        headline="Logo actualizado"
        :card-img="$utils.alertImages.Done"
        alt="Logo actualizado"
        @close="onSuccesModalClose"
      />
    </main>
  </div>
</template>
<style lang="scss">
@import '~cropperjs/dist/cropper.css';

/*!
 * Cropper.js v1.5.1
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2019-03-10T09:55:50.492Z
 */

.cropper-container {
  position: relative;
  font-size: 0;
  line-height: 0;
  -ms-touch-action: none;
  touch-action: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  direction: ltr;
}

.cropper-container img {
  display: block;
  width: 100%;
  min-width: 0 !important;
  max-width: none !important;
  height: 100%;
  min-height: 0 !important;
  max-height: none !important;
  image-orientation: 0deg;
}

.cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.cropper-wrap-box,
.cropper-canvas {
  overflow: hidden;
}

.cropper-drag-box {
  background-color: #fff;
  opacity: 0;
}

.cropper-modal {
  background-color: #000;
  opacity: 0.5;
}

.cropper-view-box {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
}

.cropper-dashed {
  position: absolute;
  display: block;
  border: 0 dashed #eee;
  opacity: 0.5;
}

.cropper-dashed.dashed-h {
  top: calc(100% / 3);
  left: 0;
  width: 100%;
  height: calc(100% / 3);
  border-top-width: 1px;
  border-bottom-width: 1px;
}

.cropper-dashed.dashed-v {
  top: 0;
  left: calc(100% / 3);
  width: calc(100% / 3);
  height: 100%;
  border-right-width: 1px;
  border-left-width: 1px;
}

.cropper-center {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0;
  height: 0;
  opacity: 0.75;
}

.cropper-center::before,
.cropper-center::after {
  position: absolute;
  display: block;
  content: ' ';
  background-color: #eee;
}

.cropper-center::before {
  top: 0;
  left: -3px;
  width: 7px;
  height: 1px;
}

.cropper-center::after {
  top: -3px;
  left: 0;
  width: 1px;
  height: 7px;
}

.cropper-face,
.cropper-line,
.cropper-point {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.1;
}

.cropper-face {
  top: 0;
  left: 0;
  background-color: #fff;
}

.cropper-line {
  background-color: #39f;
}

.cropper-line.line-e {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: ew-resize;
}

.cropper-line.line-n {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: ns-resize;
}

.cropper-line.line-w {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: ew-resize;
}

.cropper-line.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: ns-resize;
}

.cropper-point {
  width: 5px;
  height: 5px;
  background-color: #39f;
  opacity: 0.75;
}

.cropper-point.point-e {
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: ew-resize;
}

.cropper-point.point-n {
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: ns-resize;
}

.cropper-point.point-w {
  top: 50%;
  left: -3px;
  margin-top: -3px;
  cursor: ew-resize;
}

.cropper-point.point-s {
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize;
}

.cropper-point.point-ne {
  top: -3px;
  right: -3px;
  cursor: nesw-resize;
}

.cropper-point.point-nw {
  top: -3px;
  left: -3px;
  cursor: nwse-resize;
}

.cropper-point.point-sw {
  bottom: -3px;
  left: -3px;
  cursor: nesw-resize;
}

.cropper-point.point-se {
  right: -3px;
  bottom: -3px;
  width: 20px;
  height: 20px;
  cursor: nwse-resize;
  opacity: 1;
}

@media (min-width: 768px) {
  .cropper-point.point-se {
    width: 15px;
    height: 15px;
  }
}

@media (min-width: 992px) {
  .cropper-point.point-se {
    width: 10px;
    height: 10px;
  }
}

@media (min-width: 1200px) {
  .cropper-point.point-se {
    width: 5px;
    height: 5px;
    opacity: 0.75;
  }
}

.cropper-point.point-se::before {
  position: absolute;
  right: -50%;
  bottom: -50%;
  display: block;
  width: 200%;
  height: 200%;
  content: ' ';
  background-color: #39f;
  opacity: 0;
}

.cropper-invisible {
  opacity: 0;
}

.cropper-bg {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
}

.cropper-hide {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
}

.cropper-hidden {
  display: none !important;
}

.cropper-move {
  cursor: move;
}

.cropper-crop {
  cursor: crosshair;
}

.cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}

// gx-range
.gx-controls {
  width: calc(40px + 350px);
}
input[type='range'] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type='range']::-ms-track {
  width: 100%;
  color: transparent;
  cursor: pointer;

  /* Hides the slider so custom styles can be added */
  background: transparent;
  border-color: transparent;
}
input[type='range']:focus {
  outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}

input[type='range'].gx-range {
  height: 2px;
  color: #a176ff;
  background: #a176ff;
  border-block-color: #a176ff;
}
input[type='range'].gx-range::-webkit-slider-thumb {
  width: 12px;
  height: 12px;
  cursor: pointer;
  background: #4b23ef;
  border-radius: 50%;
  // margin-top: -1px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
  box-shadow: 0 0 0; /* Add cool effects to your sliders! */
  -webkit-appearance: none;
}
input[type='range'].gx-range::-moz-range-thumb {
  width: 12px;
  height: 12px;
  cursor: pointer;
  background: #4b23ef;
  border: none;
  border-radius: 50%;
  box-shadow: 0 0 0;
  -webkit-appearance: none;
}
</style>
