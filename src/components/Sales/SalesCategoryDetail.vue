<script>
import GxCardCore from '@components/_Core/Cards/GxCardCore'
import GxInput from '@components/_Core/Forms/GxInput'
import GxLoader from '@components/_Core/Utils/GxLoader.vue'
import GxModal from '@components/_Core/Modals/GxModal'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxSwitchText from '@components/_Core/Forms/GxSwitchText'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'

import {
  UPDATE_SALES_CATEGORY,
  REACTIVATE_INCOME_CATEGORY,
  DEACTIVATE_INCOME_CATEGORY,
} from '@src/apollo//mutations'
import { LOCAL_COMPANY, INCOME_CATEGORY_BY_ID } from '@src/apollo/queries'

export default {
  name: 'SalesCategoryDetail',
  components: {
    GxDesktopHeader,
    GxInput,
    GxLoader,
    GxModal,
    GxSwitchText,
    GxCardCore,
    GxCardModal,
  },
  apollo: {
    company: LOCAL_COMPANY,
    categoryInfo: {
      query: INCOME_CATEGORY_BY_ID,
      variables() {
        return {
          page: 1,
          size: 50,
          companyNumber: this.company.number,
          incomeCategoryId: this.$route.params.categoryId,
        }
      },
      update(data) {
        return data.myAccount.companies[0].company.incomeCategories[0]
      },
      skip() {
        return !this.company
      },
    },
  },
  data() {
    return {
      categoriesList: null,
      editing: false,
      company: null,
      branches: null,
      loading: false,
      newCategoryName: '',
      invalidCategoryName: null,
      saveLoading: false,
      error: null,
      defaultBranchNumber: null,
      timeout: null,
      status: '',
      options: ['ACTIVO', 'INACTIVO'],
      categoryInfo: null,
      categoryUpdatedTimeOut: null,
      categoryUpdated: false,
    }
  },
  computed: {
    errorTextBody() {
      if (!this.error) return ''
      if (this.error === '¡Ese nombre ya existe!') {
        return 'Lo sentimos. No puedes tener dos categorías con el mismo nombre.'
      }
      return ''
    },
  },
  watch: {
    newCategoryName(newVal) {
      this.invalidCategoryName = null
    },
    categoryInfo(newVal) {
      if (newVal) {
        this.status = newVal.status === 'active' ? 'ACTIVO' : 'INACTIVO'
      }
    },
  },
  created() {
    this.$apollo.queries.categoryInfo.setOptions({
      fetchPolicy: 'network-only',
    })
  },
  methods: {
    closeCategoryUpdatedModal() {
      if (this.categoryUpdatedTimeOut) {
        clearTimeout(this.categoryUpdatedTimeOut)
      }
      this.categoryUpdated = false
    },
    previous() {
      if (
        this.$route.query.list === 'true' ||
        this.$route.query.list === true
      ) {
        this.$router.push({ name: 'categories', query: { list: true } })
      } else {
        this.$router.replace({ name: 'categories' })
      }
    },
    onErrorodalClose() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.editing = true
      this.error = null
    },
    deactivateCategory() {
      return this.$apollo.mutate({
        mutation: DEACTIVATE_INCOME_CATEGORY,
        variables: {
          companyNumber: this.company.number,
          branchNumber: this.company.branchNumber,
          incomeCategoryId: this.$route.params.categoryId,
        },
      })
    },
    deleteSelectecCategoryNewSaleFlow() {
      const data = JSON.parse(
        localStorage.getItem('newSale--addtionalDataInfo')
      )
      if (!data) return
      data.category = ''
      localStorage.setItem('newSale--addtionalDataInfo', JSON.stringify(data))
    },
    reactivateCategory() {
      return this.$apollo.mutate({
        mutation: REACTIVATE_INCOME_CATEGORY,
        variables: {
          companyNumber: this.company.number,
          branchNumber: this.company.branchNumber,
          incomeCategoryId: this.$route.params.categoryId,
        },
      })
    },
    async onInput(status) {
      this.loading = true
      this.$nextTick(async () => {
        this.status = status
        if (status === 'INACTIVO') {
          await this.deactivateCategory()
          this.deleteSelectecCategoryNewSaleFlow()
        } else {
          await this.reactivateCategory()
        }
        await this.$apollo.queries.categoryInfo.refetch()
        this.loading = false
      })
    },
    editCategoryDetails() {
      this.newCategoryName = this.categoryInfo.name
      this.editing = true
    },
    async saveEditedCategoryInfo() {
      if (!this.newCategoryName || !this.newCategoryName.length) {
        this.invalidCategoryName = `Este campo es necesario`
        return
      }
      try {
        this.saveLoading = true
        const data = {
          name: this.newCategoryName,
        }
        await this.$apollo.mutate({
          mutation: UPDATE_SALES_CATEGORY,
          variables: {
            companyNumber: this.company.number,
            branchNumber: this.company.branchNumber,
            incomeCategoryId: this.$route.params.categoryId,
            data,
          },
        })
        this.$apollo.queries.categoryInfo.refetch()
        // Category updated
        this.saveLoading = false
        this.editing = false

        this.categoryUpdated = true
        this.categoryUpdatedTimeOut = setTimeout(() => {
          this.categoryUpdated = false
        }, 3000)
      } catch (error) {
        this.saveLoading = false
        this.error = this.$utils.parseServerError(error)
        this.timeout = setTimeout(() => {
          this.onErrorodalClose()
        }, 3000)
      }
    },
  },
}
</script>
<template>
  <div
    v-if="!categoryInfo && $apollo.queries.categoryInfo.loading"
    class="flex-grow flex flex-col items-center justify-center"
  >
    <GxLoader />
  </div>
  <div v-else class="flex-grow flex flex-col ">
    <GxDesktopHeader
      v-if="$mq === 'de'"
      header="Detalle de categoría"
      icon="keyboard_backspace"
      :icon-click-handler="previous"
    >
      <template v-slot:right>
        <GxSwitchText
          :options="options"
          :value="status"
          :disabled="loading"
          :bg-colors="['bg-alert', 'bg-success']"
          @input="onInput"
        />
      </template>
    </GxDesktopHeader>
    <div class="flex flex-col">
      <div
        v-if="$mq === 'mo' && !editing"
        class="w-full flex items-center justify-end pr-4"
      >
        <GxSwitchText
          :options="options"
          :disabled="loading"
          :value="status"
          :bg-colors="['bg-alert', 'bg-success']"
          @input="onInput"
        />
      </div>
      <div
        v-if="(categoryInfo && !editing) || $mq === 'de'"
        class="px-4 de:px-0"
      >
        <p class="gx-caption de:gx-caption de:mb-2">Nombre de la categoría</p>
        <p class="gxCategoryDetailFont">{{ categoryInfo.name }}</p>
      </div>
      <GxFab
        v-if="status === 'ACTIVO' && categoryInfo && !editing"
        icon="edit"
        :mobile="$mq === 'mo'"
        :large="$mq === 'de'"
        class="shadow-2 gxFabFloat"
        label="Editar categoría"
        @click.stop.prevent="editCategoryDetails"
      />
    </div>
    <div v-if="editing && !$apolloData.loading" class="py-4">
      <GxModal v-if="$mq === 'de'" class="py-4" @close="editing = false">
        <GxCardCore
          :clickable="false"
          class="flex-grow flex flex-col py-4 de:bg-white w-82 de:w-108 de:p-8 de:shadow-4 rounded-lg"
        >
          <form @submit.prevent="saveEditedCategoryInfo">
            <h1 class="mb-8 text-primary gx-h4 px-4 font-bold"
              >Editar Categoría</h1
            >
            <GxInput
              v-model="newCategoryName"
              label="Nombre de la categoría"
              placeholder="Nombre de la categoría"
              :error="invalidCategoryName"
            />
            <GxButton class="mx-auto mt-6" :loading="saveLoading" type="submit"
              >Guardar</GxButton
            >
          </form>
        </GxCardCore>
      </GxModal>
      <form v-else class="flex-grow flex flex-col">
        <GxInput
          v-model="newCategoryName"
          label="Nombre de la categoría"
          placeholder="Nombre de la categoría"
          :error="invalidCategoryName"
        />
        <GxFab
          v-if="$mq === 'mo'"
          mini
          :loading="saveLoading"
          icon="save"
          class="shadow-2 gxFabFloat"
          label="Guardar cambios"
          @click.prevent="saveEditedCategoryInfo"
        />
      </form>
    </div>
    <GxCardModal
      v-if="error"
      :headline="error"
      :text-body="errorTextBody"
      :card-img="$utils.alertImages.Oops"
      :alt="error"
      @close="onErrorodalClose"
    />
    <GxCardModal
      v-if="categoryUpdated"
      headline="Categoría actualizada"
      :card-img="$utils.alertImages.Done"
      alt="Categoría actualizada"
      @click="closeCategoryUpdatedModal"
    />
  </div>
</template>
<style lang="scss" scoped>
.gxCategoryDetailFont {
  font-size: 18px;
}
.gxFabFloat {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
}
</style>
