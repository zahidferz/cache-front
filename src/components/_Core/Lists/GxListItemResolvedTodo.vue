<script>
import GxAvatar from '@components/_Core/Avatars/GxAvatar'
import GxIcon from '@components/_Core/Icons/GxIcon'
// There are no todos with a defined detail
// import GxListItemDetail from '@components/_Core/Lists/GxListItemDetail'

export default {
  name: 'GxListItemResolvedTodo',
  components: {
    GxIcon,
    GxAvatar,
    // There are no todos with a defined detail
    // GxListItemDetail,
  },
  props: {
    description: {
      type: String,
      default: null,
    },
    date: {
      type: String,
      default: null,
    },
    avatar: {
      type: Object,
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    descriptionReferences: {
      type: Array,
      default: null,
    },
    items: {
      type: Array,
      default: null,
    },
    gxModule: {
      type: String,
      default: null,
    },
    searchTerm: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      show: false,
      genericAvatar: require('@src/assets/images/UNASSIGNED/avatar.svg'),
    }
  },
  computed: {
    initials() {
      if (this.avatar.userCompleteName) {
        const [firstName, lastName] = this.avatar.userCompleteName.split(' ')
        if (lastName) {
          return firstName[0].toUpperCase() + lastName[0].toUpperCase()
        }
        return firstName[0].toUpperCase()
      }
      return null
    },
    avatarImage() {
      if (this.avatar) {
        return this.avatar.image
      }
      return null
    },
    searchReferences() {
      if (!this.descriptionReferences) {
        return null
      }
      if (!this.searchTerm && Array.isArray(this.descriptionReferences)) {
        return this.descriptionReferences.map(
          ({ resourceDescription }) => resourceDescription
        )
      }
      let references = this.descriptionReferences.map(
        ({ resourceDescription }) => {
          let scapedSearch = this.searchTerm.replace('.', '\\.')
          scapedSearch = scapedSearch.replace('+', '\\+')
          scapedSearch = scapedSearch.replace('-', '\\-')
          scapedSearch = scapedSearch.replace('(', '\\(')
          scapedSearch = scapedSearch.replace(')', '\\)')
          scapedSearch = scapedSearch.replace('{', '\\{')
          scapedSearch = scapedSearch.replace('{', '\\}')
          const regex = new RegExp(`${scapedSearch}`, 'ig')
          const matches = resourceDescription.match(regex)
          let newRefrence = resourceDescription
          if (Array.isArray(matches)) {
            matches.forEach((match) => {
              newRefrence = newRefrence.replace(match, '{}')
            })
            matches.forEach((match) => {
              newRefrence = newRefrence.replace(
                '{}',
                `<span class="bg-underlined font-bold">${match}</span>`
              )
            })
          }
          return newRefrence
        }
      )
      return references
    },
    descriptionTemplate() {
      if (this.searchTerm) {
        const array = this.description.split('{}')
        const search = array.map((text) => {
          let scapedSearch = this.searchTerm.replace('.', '\\.')
          scapedSearch = scapedSearch.replace('+', '\\+')
          scapedSearch = scapedSearch.replace('-', '\\-')
          scapedSearch = scapedSearch.replace('(', '\\(')
          scapedSearch = scapedSearch.replace(')', '\\)')
          scapedSearch = scapedSearch.replace('{', '\\{')
          scapedSearch = scapedSearch.replace('{', '\\}')
          const regex = new RegExp(`${scapedSearch}`, 'ig')
          const matches = text.match(regex)
          let newRefrence = text
          if (Array.isArray(matches)) {
            matches.forEach((match) => {
              newRefrence = newRefrence.replace(match, '{}')
            })
            matches.forEach((match) => {
              newRefrence = newRefrence.replace(
                '{}',
                `<span class="bg-underlined" style="font-weight: inherit;">${match}</span>`
              )
            })
            return newRefrence
          } else {
            return newRefrence
          }
        })
        return search.join('{}')
      }
      return this.description
    },
    descriptionWithLinks() {
      if (this.searchReferences) {
        let html = this.descriptionTemplate
        this.searchReferences.forEach((resourceDescription) => {
          html = html.replace(
            '{}',
            `<span class="font-bold" data-testid="description">${resourceDescription}<span>`
          )
        })
        return html
      }
      let descriptionSolvedTodo = this.descriptionTemplate
      descriptionSolvedTodo = descriptionSolvedTodo.replace(
        /{/g,
        '<span class="font-bold" data-testid="description">'
      )
      descriptionSolvedTodo = descriptionSolvedTodo.replace(/}/g, '</span>')
      return descriptionSolvedTodo
    },
    dateString() {
      if (this.$mq === 'de') {
        return this.$utils.dates.getRelativeDate(this.date)
      }
      return this.$utils.dates.getRelativeDateShort(this.date)
    },
    statusColor() {
      switch (this.status) {
        case 'active':
          return 'bg-success'
        default:
          return 'bg-success'
      }
    },
    iconType() {
      switch (this.gxModule) {
        case 'users':
          return 'people'
        case 'spendingSentPayments':
          return 'attach_money'
        case 'incomeSaleInvoices':
          return 'assignment_ind'
        case 'incomeSales':
          return 'local_offer'
        default:
          return ''
      }
    },
  },
}
</script>

<template>
  <li
    class="flex flex-col p-4 cursor-pointer active:bg-secondary-50 border-b de:hover:bg-gray-200 gxOutter"
    @click="show = !show"
  >
    <div class="flex">
      <figure style="height: 2.875rem;">
        <GxAvatar
          v-if="avatarImage"
          style="width: 2.875rem; height: 2.875rem;"
          class="mr-2 bg-gray-200 rounded-full"
          :avatar-img="avatarImage"
        />
        <div
          v-else
          style="width: 2.875rem; height: 2.875rem;"
          :class="
            `mr-2 rounded-full flex items-center justify-center text-white gx-h4  bg-avatar-${
              avatar ? avatar.color : 0
            }`
          "
        >
          {{ initials }}
        </div>
        <div
          class="h-3 w-3 rounded-full border border-white de:hover:border-gray-200"
          :class="statusColor"
          style="transform:translate(280%, -100%);"
        ></div>
      </figure>

      <div class="flex flex-col">
        <!-- eslint-disable vue/no-v-html -->
        <p
          v-if="descriptionWithLinks"
          class="mb-2"
          v-html="descriptionWithLinks"
        ></p>
        <!-- eslint-enable vue/no-v-html -->
        <div class="flex de:gx-caption gx-caption text-gray-500 items-center">
          <template v-if="!items || items.length === 0">
            <div key="date-icon" class="flex items-center">
              <GxIcon :icon="iconType" class="mr-2" />
              <span>{{ dateString }}</span>
            </div>
          </template>
          <template v-else>
            <transition mode="out-in" name="fade">
              <div key="date-icon" class="flex items-center">
                <GxIcon :icon="iconType" class="mr-2" />
                <span>{{ dateString }}</span>
              </div>
              <!-- There are no todos with a defined detail -->
              <!-- <div
                v-if="!show && items"
                key="date-icon"
                class="flex items-center"
              >
                <GxIcon :icon="iconType" class="mr-2" />
                <span>{{ dateString }}</span>
              </div> -->
              <!-- <ul v-if="show && items !== null" key="resolvedList">
                <GxListItemDetail
                  v-for="(item, index) in items"
                  :key="index"
                  :avatar-img="genericAvatar"
                  :index="index"
                />
                <div
                  key="detail"
                  class="flex de:gx-caption gx-caption text-gray-500 items-center mt-2"
                  style="transform:translateX(-4px)"
                >
                  <GxIcon :icon="iconType" class="mr-2" />
                  <span>{{ dateString }}</span>
                </div>
              </ul> -->
            </transition>
          </template>
        </div>
      </div>
    </div>
  </li>
</template>

<style lang="scss" scoped>
/* stylelint-disable */
.fade-enter-active {
  transition: opacity 0.2s ease-out;
}
.fade-leave-active {
  transition: opacity 0.2s ease-in;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.gxOutter {
  -webkit-tap-highlight-color: transparent;
}
.gxOutter:active {
  background-color: var(--secondary-50);
}
</style>
