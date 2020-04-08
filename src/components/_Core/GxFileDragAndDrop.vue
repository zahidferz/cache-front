<script>
import GxIcon from '@components/_Core/Icons/GxIcon'

export default {
  name: 'GxFileDragAndDrop',
  components: {
    GxIcon,
  },
  props: {
    value: {
      type: String,
      default: null,
    },
    originalImage: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      imageSrc: null,
      draggingFile: false,
    }
  },
  computed: {
    imageInputContainerStyles() {
      if (this.originalImage) {
        return `z-index: 0; background-image: url(${
          this.originalImage
        }?${new Date().getTime()}); filter: opacity(0.2);`
      }
      return `z-index: 0;`
    },
  },
  watch: {
    imageSrc(newVal) {
      this.$emit('input', newVal)
    },
  },
  mounted() {
    if (this.$refs.fileDropZone) {
      this.enableFileDragAndDrop()
    }
  },
  methods: {
    enableFileDragAndDrop() {
      const draggingFileOn = function(evt) {
        evt.preventDefault()
        evt.stopPropagation()
        this.draggingFile = true
      }.bind(this)
      const draggingFileOff = function(evt) {
        evt.preventDefault()
        evt.stopPropagation()
        this.draggingFile = false
      }.bind(this)
      const handleFileDrop = function(evt) {
        evt.preventDefault()
        evt.stopPropagation()
        this.draggingFile = false
        this.parseFile(evt.dataTransfer.files[0])
      }.bind(this)
      this.$refs.fileDropZone.addEventListener('dragenter', draggingFileOn)
      this.$refs.fileDropZone.addEventListener('dragover', draggingFileOn)
      this.$refs.fileDropZone.addEventListener('dragleave', draggingFileOff)
      this.$refs.fileDropZone.addEventListener('drop', handleFileDrop)

      // Prevent dropping file anywhere else from opening the file in current tab
      const handleGlobalFileDrop = function(evt) {
        evt.preventDefault()
        evt.stopPropagation()
      }
      const handleGlobalDragEnter = function(evt) {
        evt.preventDefault()
        evt.stopPropagation()
      }
      const handleGlobalDragOver = function(evt) {
        evt.preventDefault()
        evt.stopPropagation()
      }
      window.addEventListener('drop', handleGlobalFileDrop)
      window.addEventListener('dragenter', handleGlobalDragEnter)
      window.addEventListener('dragover', handleGlobalDragOver)

      this.$once('hook:beforeDestroy', () => {
        this.$refs.fileDropZone.removeEventListener('dragenter', draggingFileOn)
        this.$refs.fileDropZone.removeEventListener('dragover', draggingFileOn)
        this.$refs.fileDropZone.removeEventListener(
          'dragleave',
          draggingFileOff
        )
        this.$refs.fileDropZone.removeEventListener('drop', handleFileDrop)
        window.removeEventListener('drop', handleGlobalFileDrop)
        window.removeEventListener('dragenter', handleGlobalDragEnter)
        window.removeEventListener('dragover', handleGlobalDragOver)
      })
    },
    compress(file) {
      const fileName = file.name
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result
        img.onload = () => {
          const maxWidth = 350 // Max width for the image
          const maxHeight = 350
          let ratio = 1
          let widthRatio
          let heightRatio
          if (img.width > maxWidth) {
            widthRatio = maxWidth / img.width
          }
          if (img.height > maxHeight) {
            heightRatio = maxHeight / img.height
          }
          // original image width && height < 350px
          if (widthRatio && heightRatio) {
            ratio = widthRatio < heightRatio ? widthRatio : heightRatio
          }
          // Set new width and height based on required ratios
          // const width = 100;
          // const height = 100;
          const width = ratio * img.width
          const height = ratio * img.height
          const elem = document.createElement('canvas')
          elem.width = width
          elem.height = height
          const ctx = elem.getContext('2d')
          // img.width and img.height will contain the original dimensions
          ctx.drawImage(img, 0, 0, width, height)
          ctx.canvas.toBlob(
            (blob) => {
              const file = new File([blob], fileName, {
                type: 'image/png',
                lastModified: Date.now(),
              })
              var reader = new FileReader()
              reader.onloadend = (evt) => {
                this.imageSrc = reader.result
              }
              reader.readAsDataURL(file)
            },
            'image/png',
            1
          )
        }
        // reader.onerror = (error) => console.log(error)
      }
    },
    loadFile(input) {
      this.parseFile(input.target.files[0])
    },
    parseFile(file) {
      this.compress(file)

      var reader = new FileReader()
      reader.onloadend = () => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
    },
  },
}
</script>
<template>
  <div
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
      <span class="gx-h6">{{ label }}</span>
    </label>
  </div>
</template>
<style lang="scss" scoped>
#croppieFileInput {
  position: absolute;
  z-index: -1;
  width: 0.1px;
  height: 0.1px;
  overflow: hidden;
  opacity: 0;
}
.fileDropZone::before {
  position: absolute;
  width: 100%;
  height: 100%;
  content: '';
  background: var(--secondary);
  opacity: 0.1;
}
</style>
