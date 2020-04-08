<script>
import GxDivider from '@components/_Core/Dividers/GxDivider'
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxAvatar from '@components/_Core/Avatars/GxAvatar'
import GxLoader from '@components/_Core/Utils/GxLoader'
import { COMPANY_INFO, LOCAL_COMPANY, TIME_ZONE } from '@src/apollo/queries'
import { version } from '@/package.json'

export default {
  name: 'MenuProfile',
  components: {
    GxDivider,
    GxIcon,
    GxAvatar,
    GxLoader,
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
    timeZone: {
      query: TIME_ZONE,
      variables() {
        return {
          companyNumber: this.company.number,
        }
      },
      skip() {
        return !this.company
      },
      fetchPolicy: 'cache-and-network',
      update(data) {
        return data.myAccount.companies[0].company.timeZone
      },
    },
  },
  data() {
    return {
      company: null,
      myAccount: null,
      timeZone: null,
      packageVersion: version,
    }
  },
  computed: {
    companyNameInitials() {
      let names
      let initials
      if (!this.myAccount.companies[0].company.commercialName) {
        return ''
      }
      if (this.myAccount.companies[0].company.commercialName[0]) {
        names = this.myAccount.companies[0].company.commercialName.split(' ')
      } else {
        names = this.myAccount.companies[0].company.legalName.split(' ')
      }
      initials = names[0][0]
      if (names[1]) {
        initials += `${names[1][0]}`
      }
      initials = initials.toUpperCase()
      return initials
    },
    hasSATConnection() {
      if (!this.myAccount) return null
      return this.myAccount.companies[0].company.companyDataLocalized
        .ciecConfigurada
    },
    hasCSD() {
      if (!this.myAccount) return null
      return (
        this.myAccount.companies[0].company.companyDataLocalized &&
        this.myAccount.companies[0].company.companyDataLocalized.csd &&
        this.myAccount.companies[0].company.companyDataLocalized.csd.length > 0
      )
    },
    formatedPhone() {
      if (this.myAccount && this.myAccount.mobilePhone) {
        if (
          this.myAccount.mobilePhone.slice(0, 2) === '55' ||
          this.myAccount.mobilePhone.slice(0, 2) === '33' ||
          this.myAccount.mobilePhone.slice(0, 2) === '81'
        ) {
          if (this.myAccount.mobilePhone.length > 10) {
            return this.myAccount.mobilePhone.replace(
              /(\d{2})(\d{4})(\d{4})(\d)/,
              '($1) $2-$3-$4'
            )
          } else {
            return this.myAccount.mobilePhone.replace(
              /(\d{2})(\d{4})(\d{4})/,
              '($1) $2-$3'
            )
          }
        } else {
          if (this.myAccount.mobilePhone.length > 10) {
            return this.myAccount.mobilePhone.replace(
              /(\d{3})(\d{3})(\d{4})(\d)/,
              '($1) $2-$3-$4'
            )
          } else {
            return this.myAccount.mobilePhone.replace(
              /(\d{3})(\d{3})(\d{4})/,
              '($1) $2-$3'
            )
          }
        }
      }
      return ''
    },
  },
  watch: {
    $route(to, from) {
      this.$emit('close')
    },
  },
  mounted() {
    const clickHandler = (evt) => {
      if (!this.$el.contains(evt.target)) {
        this.$emit('close')
      }
    }
    document.addEventListener('click', clickHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('click', clickHandler)
    })

    if (this.$mq === 'mo') {
      this.$intercom.boot({
        // Don't use custom launcher so we can open a direct message window instead
        // custom_launcher_selector: '#intercomCustomLauncher',
        hide_default_launcher: true,
      })

      this.loadUpscope()
    }
  },
  methods: {
    openNewIntercomMessage() {
      this.$intercom.showNewMessage()
    },
    loadUpscope() {
      /* eslint-disable */
      if (window.Upscope) {
        console.log('Upscope already loaded')
        return
      }
      console.log('Loading Upscope')
      function initUpscope(w, u, d) {
        var i = function() {
          i.c(arguments)
        }
        i.q = []
        i.c = function(args) {
          i.q.push(args)
        }
        var l = function() {
          var s = d.createElement('script')
          s.type = 'text/javascript'
          s.async = true
          s.src = 'https://code.upscope.io/L2QMYkMUWA.js'
          var x = d.getElementsByTagName('script')[0]
          x.parentNode.insertBefore(s, x)
        }
        if (typeof u !== 'function') {
          w.Upscope = i
          l()
        }
      }
      initUpscope(window, window.Upscope, document)
      Upscope('init', {
        uniqueId: '',
        identities: [''],
      })
      /* eslint-enable */
    },
  },
}
</script>
<template>
  <div v-if="myAccount" class="de:text-gray-700">
    <div
      class="de:mb-2 mb-8 text-center de:text-left px-4 de:flex de:items-center"
    >
      <div class="flex justify-center mb-4">
        <div class="relative inline-block px-2 de:px-0">
          <GxAvatar
            v-if="myAccount && !myAccount.image"
            class="uppercase text-white rounded-full font-bold flex-shrink-0 uppercase text-5xl de:text-base shadow-2"
            :class="[
              { 'w-32 h-32 ': $mq === 'mo' },
              `bg-avatar-${myAccount.color}`,
            ]"
            font-styles=" font-weight: 600"
          >
            {{ myAccount.firstName[0] }}{{ myAccount.lastName[0] }}
          </GxAvatar>
          <GxAvatar
            v-else
            :avatar-img="myAccount.image"
            class="shadow-2"
            :class="{ 'w-32 h-32': $mq === 'mo' }"
          />
          <RouterLink
            :to="{ name: 'uploadprofilephoto' }"
            class="rounded-full bg-gray-300 absolute w-10 h-10  de:w-3 de:h-3 right-0 bottom-0"
          >
            <div
              class="flex items-center justify-center w-full h-full border-1 border-white rounded-full border-rounded"
            >
              <GxIcon
                icon="photo_camera"
                :style="
                  $mq === 'de' ? 'font-size: .5rem' : 'font-size: 1.25rem'
                "
              />
            </div>
          </RouterLink>
        </div>
      </div>
      <div class="pl-4">
        <h2
          class="flex justify-center de:justify-start items-center gx-h5 font-bold de:gx-h6 de:font-bold mb-4 de:mb-2"
        >
          {{ myAccount.firstName }} {{ myAccount.lastName }}
          <RouterLink
            :to="{ name: 'updatemyinfo' }"
            class="flex items-center justify-center"
          >
            <GxIcon class="ml-2 text-gray-700" icon="edit" />
          </RouterLink>
        </h2>
        <p class="text-gray-700 mb-2 de:truncate de:w-44 de:text-2xs">{{
          myAccount.email
        }}</p>
        <p class="text-gray-700 de:text-2xs">{{ formatedPhone }}</p>
      </div>
    </div>
    <!-- Password  -->
    <GxDivider v-if="$mq === 'de'" class="mx-4" />
    <RouterLink
      :to="{ name: 'updatepassword' }"
      class="py-4 de:py-2 flex items-center justify-between w-full hover:bg-secondary-50 px-4"
    >
      <div class="flex items-center">
        <GxIcon class="mr-4 de:mr-2 text-gray-700" icon="lock" />
        Contraseña
      </div>
      <GxIcon class="ml-4 de:ml-2 text-gray-700" icon="chevron_right" />
    </RouterLink>
    <!-- Comparte y gana -->
    <!-- <button
      class="p-4 de:p-2 flex items-center justify-between w-full hover:bg-secondary-50"
    >
      <div class="flex items-center">
        <GxIcon class="mr-4 de:mr-2 text-gray-700" icon="card_giftcard" />
        Comparte y gana
      </div>
    </button> -->
    <GxDivider class="mx-4" />
    <!-- Info de la empresa -->
    <div class="flex items-center p-4 pb-8 de:py-2 flex items-center w-full">
      <RouterLink
        v-if="myAccount"
        class="relative inline-block"
        :to="{ name: 'uploadcompanylogo', query: { edit: true } }"
      >
        <GxAvatar
          v-if="myAccount.companies[0].company.companyLogo"
          shape="circle"
          :avatar-img="
            myAccount.companies[0].company.companyLogo +
              `?${new Date().getTime()}`
          "
          class="shadow-2"
        />
        <GxAvatar
          v-else
          shape="circle"
          :class="[
            `bg-avatar-${myAccount ? myAccount.companies[0].company.color : 0}`,
          ]"
          class="text-base  text-white rounded-full font-bold flex-shrink-0 shadow-2"
          font-styles="font-weight: 600"
        >
          {{ companyNameInitials }}
        </GxAvatar>
        <div class="rounded-full bg-gray-300 absolute w-3 h-3 right-0 bottom-0">
          <div class="flex items-center justify-center w-full h-full">
            <GxIcon icon="photo_camera" style="font-size: .5rem;" />
          </div>
        </div>
      </RouterLink>
      <div class="ml-4">
        <RouterLink
          v-if="myAccount.companies[0].company.commercialName"
          :to="{ name: 'updatecompanyinfo' }"
          class="font-bold"
        >
          {{ myAccount.companies[0].company.commercialName }}
          <GxIcon class="ml-2" icon="edit" />
        </RouterLink>
        <p class="text-gray-500 gx-caption de:gx-caption">{{
          myAccount.companies[0].company.legalName
        }}</p>
        <p class="text-gray-500  de:gx-caption">{{
          myAccount.companies[0].company.taxId
        }}</p>
      </div>
    </div>
    <!-- Conexión al SAT -->
    <RouterLink
      :to="{ name: 'satConnection' }"
      class="mr-4 p-4 pt-4 de:py-2 flex items-center justify-between w-full hover:bg-secondary-50"
    >
      <div v-if="hasSATConnection" class="flex items-center">
        <GxIcon class="mr-4 de:mr-2 text-gray-700" icon="business_center" />
        Editar contraseña CIEC
        <GxIcon class=" ml-2 text-gray-700" icon="edit" />
      </div>
      <div v-else class="flex items-center">
        <GxIcon
          class="de:mr-2 text-gray-700 pr-4 de:pr-0"
          icon="business_center"
        />
        Conexión al SAT
      </div>
      <GxIcon
        v-if="!hasSATConnection"
        class="ml-4 de:ml-2 text-gray-700"
        icon="chevron_right"
      />
    </RouterLink>
    <!-- Certificado de Sello Digital -->
    <RouterLink
      :to="
        $mq === 'mo'
          ? { name: 'uploadcsdsummary' }
          : { name: 'howtouploadcsd', query: { edit: true } }
      "
      class="py-4 de:py-2 flex items-center justify-between w-full hover:bg-secondary-50 px-4"
    >
      <div class="flex items-center">
        <GxIcon class="mr-4 de:mr-2 text-gray-700" icon="vpn_key" />
        Certificado de Sello Digital
        <GxIcon v-if="hasCSD" class="ml-2 text-gray-700" icon="edit" />
      </div>
      <GxIcon v-if="!hasCSD" class="ml-2 text-gray-700" icon="chevron_right" />
    </RouterLink>
    <GxDivider class="mx-4" />

    <p
      class="pt-4 pb-1 de:pb-1 de:py-2 flex items-center de:justify-between w-full px-4 text-black"
      >Zona horaria</p
    >
    <p
      v-if="timeZone"
      class="pb-2 de:pb-2 de:pt-0 flex items-center de:justify-between w-full text-gray-500 gx-caption de:gx-caption px-4"
      >{{ timeZone }}</p
    >
    <GxDivider class="mx-4" />
    <!-- Intercom -->
    <button
      v-if="$mq === 'mo'"
      class="py-4 de:py-2 flex items-center justify-between w-full hover:bg-secondary-50"
      @click="openNewIntercomMessage"
    >
      <div class="flex items-center">
        <GxIcon class="de:mr-2 text-gray-700 px-4 de:pr-0" icon="chat" />
        Chat de ayuda
      </div>
      <GxIcon class="mx-4 de:ml-2 text-gray-700" icon="chevron_right" />
    </button>
    <GxDivider v-if="$mq === 'mo'" class="mx-4" />
    <RouterLink
      :to="{ name: 'logout' }"
      class="py-4 de:py-2 w-full text-alert flex hover:bg-secondary-50 tracking-normal px-4"
    >
      Cerrar sesión
    </RouterLink>
    <p v-if="$mq === 'mo'" class=" de:px-2 px-4">{{ packageVersion }}</p>
  </div>
  <div v-else class="flex-grow flex items-center justify-center p-4">
    <GxLoader />
  </div>
</template>
