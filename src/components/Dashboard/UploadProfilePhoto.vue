<script>
import gql from 'graphql-tag'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'
import GxFileDragAndDrop from '@components/_Core/GxFileDragAndDrop.vue'

export default {
  name: 'UploadProfilePhoto',
  components: {
    GxDesktopHeader,
    GxFileDragAndDrop,
  },
  apollo: {
    myAccount: gql`
      {
        myAccount {
          image
          userNumber
          companies {
            company {
              companyNumber
            }
          }
        }
      }
    `,
  },
  data() {
    return {
      // draggingFile: false,
      imageSrc: null,
      summaryImg: require('@assets/images/Signup/InitialTodos/mo_001_7_certificados.svg'),
      loading: false,
    }
  },
  computed: {
    profilePhoto() {
      if (this.myAccount && this.myAccount.image) {
        return this.myAccount.image
      } else {
        return null
      }
    },
    inputLabel() {
      if (this.myAccount && this.myAccount.image) {
        return 'CAMBIAR FOTO'
      }
      return 'SUBIR FOTO'
    },
    imageInputContainerStyles() {
      if (this.profilePhoto) {
        return `z-index: 0; background-image: url(${
          this.profilePhoto
        }?${new Date().getTime()}); filter: opacity(0.2);`
      }
      return `z-index: 0;`
    },
  },
  watch: {
    imageSrc(newVal) {
      this.$router.push({
        name: 'resizeprofilephoto',
        params: { imageSrc: newVal },
      })
    },
  },
  mounted() {
    if (this.$refs.fileDropZone) {
      this.enableFileDragAndDrop()
    }
  },
  methods: {
    // enableFileDragAndDrop() {
    //   const draggingFileOn = function(evt) {
    //     evt.preventDefault()
    //     evt.stopPropagation()
    //     this.draggingFile = true
    //   }.bind(this)
    //   const draggingFileOff = function(evt) {
    //     evt.preventDefault()
    //     evt.stopPropagation()
    //     this.draggingFile = false
    //   }.bind(this)
    //   const handleFileDrop = function(evt) {
    //     evt.preventDefault()
    //     evt.stopPropagation()
    //     this.draggingFile = false
    //     console.log(evt)
    //     this.parseFile(evt.dataTransfer.files[0])
    //   }.bind(this)
    //   this.$refs.fileDropZone.addEventListener('dragenter', draggingFileOn)
    //   this.$refs.fileDropZone.addEventListener('dragover', draggingFileOn)
    //   this.$refs.fileDropZone.addEventListener('dragleave', draggingFileOff)
    //   this.$refs.fileDropZone.addEventListener('drop', handleFileDrop)

    //   this.$once('hook:beforeDestroy', () => {
    //     this.$refs.fileDropZone.removeEventListener('dragenter', draggingFileOn)
    //     this.$refs.fileDropZone.removeEventListener('dragover', draggingFileOn)
    //     this.$refs.fileDropZone.removeEventListener(
    //       'dragleave',
    //       draggingFileOff
    //     )
    //     this.$refs.fileDropZone.removeEventListener('drop', handleFileDrop)
    //   })
    // },
    // compress(file) {
    //   const fileName = file.name
    //   const reader = new FileReader()
    //   reader.readAsDataURL(file)
    //   reader.onload = (event) => {
    //     const img = new Image()
    //     img.src = event.target.result
    //     img.onload = () => {
    //       const maxWidth = 350 // Max width for the image
    //       const maxHeight = 350
    //       let ratio = 1
    //       let widthRatio
    //       let heightRatio
    //       if (img.width > maxWidth) {
    //         widthRatio = maxWidth / img.width
    //       }
    //       if (img.height > maxHeight) {
    //         heightRatio = maxHeight / img.height
    //       }
    //       // original image width && height < 350px
    //       if (widthRatio && heightRatio) {
    //         ratio = widthRatio < heightRatio ? widthRatio : heightRatio
    //       }
    //       // Set new width and height based on required ratios
    //       // const width = 100;
    //       // const height = 100;
    //       const width = ratio * img.width
    //       const height = ratio * img.height
    //       const elem = document.createElement('canvas')
    //       elem.width = width
    //       elem.height = height
    //       const ctx = elem.getContext('2d')
    //       // img.width and img.height will contain the original dimensions
    //       ctx.drawImage(img, 0, 0, width, height)
    //       ctx.canvas.toBlob(
    //         (blob) => {
    //           const file = new File([blob], fileName, {
    //             type: 'image/png',
    //             lastModified: Date.now(),
    //           })
    //           var reader = new FileReader()
    //           reader.onloadend = (evt) => {
    //             this.imageSrc = reader.result
    //             this.$router.push({
    //               name: 'resizeprofilephoto',
    //               params: { imageSrc: this.imageSrc },
    //             })
    //           }
    //           reader.readAsDataURL(file)
    //         },
    //         'image/png',
    //         1
    //       )
    //     }
    //     // reader.onerror = (error) => console.log(error)
    //   }
    // },
    // loadFile(input) {
    //   this.parseFile(input.target.files[0])
    // },
    // parseFile(file) {
    //   this.compress(file)

    //   var reader = new FileReader()
    //   reader.onloadend = () => {
    //     console.log('Image src updated')
    //     this.imageSrc = reader.result
    //     console.log(this.imageSrc)
    //   }
    //   reader.readAsDataURL(file)
    // },
    goBack() {
      this.$router.gxAnim = 'slide-right'
      this.$router.back()
    },
  },
}
</script>
<template>
  <div
    v-if="$mq === 'mo'"
    class="flex-grow flex flex-col items-center p-4 text-center"
  >
    <p class="mb-8"
      >Esta fotografía aparecerá en tu perfil, podrás cambiarla cuando
      quieras.</p
    >
    <GxFileDragAndDrop
      v-model="imageSrc"
      :original-image="profilePhoto"
      :label="inputLabel"
    />
    <!-- <div
      class="mb-2 w-64 h-64 border border-primary flex justify-center items-center rounded-lg"
    > -->
    <!-- <div
        class="absolute mb-2 w-50 h-50 flex justify-center items-center rounded-lg bg-center bg-contain bg-no-repeat pointer-events-none"
        :style="imageInputContainerStyles"
      ></div>
      <input
        id="croppieFileInput"
        data-testid="uploadlogofileinput"
        name="croppieFileInput"
        type="file"
        @change="loadFile"
      />
      <label
        class="text-h3 text-primary flex flex-col justify-center items-center w-50 h-50 border border-dashed border-primary rounded-lg"
        for="croppieFileInput"
      >
        <GxIcon icon="cloud_upload" />
        <span class="gx-h6">{{ inputLabel }}</span>
      </label> -->
    <!-- </div> -->
  </div>
  <div v-else class="flex-grow flex flex-col items-center ">
    <GxDesktopHeader
      v-if="myAccount"
      class="self-start"
      icon="keyboard_backspace"
      :header="
        myAccount.image ? 'Actualizar foto de perfil' : 'Subir foto de perfil'
      "
      :icon-click-handler="goBack"
    >
    </GxDesktopHeader>
    <p class="self-start"
      >Esta fotografía aparecerá en tu perfil, podrás cambiarla cuando
      quieras.</p
    >
    <main class="flex-grow flex-col flex justify-center items-center">
      <GxFileDragAndDrop
        v-model="imageSrc"
        :original-image="profilePhoto"
        :label="inputLabel"
      />
      <!-- <div
        ref="fileDropZone"
        class="relative mb-2 w-64 h-64 border border-primary flex justify-center items-center rounded-lg"
        :class="{
          fileDropZone: draggingFile,
        }"
      >
        <div
          class="absolute mb-2 w-50 h-50 flex justify-center items-center rounded-lg bg-center bg-contain bg-no-repeat pointer-events-none"
          :style="imageInputContainerStyles"
        >
        </div>
        <input
          id="croppieFileInput"
          data-testid="uploadlogofileinput"
          name="croppieFileInput"
          type="file"
          @change="loadFile"
        />
        <label
          class="text-h3 cursor-pointer text-primary flex flex-col justify-center items-center w-50 h-50 border border-dashed border-primary rounded-lg"
          for="croppieFileInput"
        >
          <GxIcon icon="cloud_upload" />
          <span class="gx-h6">{{ inputLabel }}</span>
        </label>
      </div> -->
    </main>
  </div>
</template>
<style lang="scss" scoped>
// #croppieFileInput {
//   position: absolute;
//   z-index: -1;
//   width: 0.1px;
//   height: 0.1px;
//   overflow: hidden;
//   opacity: 0;
// }
// .fileDropZone::before {
//   position: absolute;
//   content: '';
//   width: 100%;
//   height: 100%;
//   background: var(--secondary);
//   opacity: 0.1;
// }
</style>
