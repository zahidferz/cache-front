<script>
import GxDivider from '@components/_Core/Dividers/GxDivider'
import GxIcon from '@components/_Core/Icons/GxIcon'
import CreateNewClientFormBranch from './CreateNewClientFormBranch'

export default {
  name: 'CreateNewClientFormBranches',
  components: {
    GxDivider,
    GxIcon,
    CreateNewClientFormBranch,
  },
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      branchesList: this.value.map((branch, index) => {
        const id = Date.now() + index

        const branchWithId = {
          ...branch,
          id,
        }
        return branchWithId
      }),
    }
  },
  computed: {
    editingClient() {
      if (this.$route.params.clientId) {
        return true
      } else return false
    },
  },
  watch: {
    branchesList(newVal) {
      // Deleting front end validation variables not accepted in the data base
      const branchesData = newVal.filter((branch) => {
        // Valid branches must have both Branch name and address
        return branch.name && branch.address.fullAddress
      })

      this.$emit('input', branchesData)
    },
  },
  methods: {
    updateBranch(newValue) {
      const updateIndex = this.branchesList.findIndex(
        (b) => b.id === newValue.id
      )
      const newBranch = this.branchesList[updateIndex]
      newBranch.name = newValue.name
      newBranch.address = newValue.address
      this.branchesList = [
        ...this.branchesList.slice(0, updateIndex),
        newBranch,
        ...this.branchesList.slice(updateIndex + 1),
      ]
    },
    addBranch() {
      const newBranch = {
        id: Date.now(),
        name: '',
        address: {
          fullAddress: '',
        },
      }
      this.branchesList = [...this.branchesList, newBranch]

      if (this.branchesList.length > 1) {
        setTimeout(() => {
          const el = document.getElementById(newBranch.id)
          if (el) {
            el.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
          }
        }, 300)
      }
    },
    removeBranch(id) {
      const indexToRemove = this.branchesList.findIndex((b) => b.id === id)
      this.branchesList = [
        ...this.branchesList.slice(0, indexToRemove),
        ...this.branchesList.slice(indexToRemove + 1),
      ]
    },
  },
}
</script>
<template>
  <section class="flex-grow flex flex-col pt-4">
    <GxDivider />
    <div
      class="flex-grow px-4 de:px-8 bg-gray-100 flex items-center text-gray-500"
      :class="{
        'justify-end': branchesList.length === 0,
        'justify-between': branchesList.length > 0,
        'h-8': $mq === 'mo',
        'h-7': $mq === 'de',
      }"
    >
      <h1
        v-if="branchesList.length > 0"
        class="uppercase font-bold gx-caption de:text-2xs flex-grow"
        >Sucursales</h1
      >
      <GxTextLink
        class="flex items-center"
        type="button"
        @click.prevent="addBranch"
      >
        <span class="mr-1" :class="{ gxDeskLink: $mq === 'de' }"
          >Agregar sucursal</span
        >
        <GxIcon icon="add" />
      </GxTextLink>
    </div>
    <GxDivider />
    <div v-if="branchesList.length > 0">
      <div
        v-for="(branch, index) in branchesList"
        :key="branch.id"
        class="flex-grow flex flex-col pt-4"
      >
        <GxTextLink
          class="flex self-end mr-4 de:mr-8 items-center"
          @click="removeBranch(branch.id)"
        >
          <span class="mr-1">Eliminar sucursal</span>
          <div
            class="bg-gray-200 rounded gxAddOther flex items-center justify-center"
          >
            <GxIcon
              icon="remove_circle_outline"
              style="font-size:0.5rem"
              class="text-alert"
            />
          </div>
        </GxTextLink>
        <CreateNewClientFormBranch
          :branch="branch"
          @update="updateBranch($event)"
        />
        <GxDivider v-if="index !== branchesList.length - 1" />
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.gxDeskLink {
  font-size: 12px;
}
.gxAddOther {
  width: 0.875rem;
  height: 0.875rem;
}
</style>
