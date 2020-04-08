<script>
import GxToDoListItem from '@components/_Core/Lists/GxToDoListItem'
import gql from 'graphql-tag'
import GxAvatar from '@components/_Core/Avatars/GxAvatar'
import { format } from 'date-fns'
const es = require('date-fns/locale/es')
export default {
  name: 'SubmenuTodos',
  components: {
    GxToDoListItem,
    GxAvatar,
  },
  apollo: {
    myAccount: {
      query: gql`
        {
          myAccount {
            userNumber
            firstName
            creationDate
            companies {
              company {
                companyNumber
              }
            }
          }
        }
      `,
      error(error) {
        this.error = error.message
      },
    },
  },
  data() {
    return {
      image: require('@src/assets/images/UNASSIGNED/10.svg'),
      welcomeImage: require('@src/assets/images/Storybook/bestia.svg'),
      error: null,
      showWelcomeAnimation: false,
    }
  },
  computed: {
    parsedDate() {
      return format(new Date(parseInt(this.myAccount.creationDate)), 'MMM D', {
        locale: es,
      })
    },
  },
  methods: {
    welcomeCelebration() {
      this.showWelcomeAnimation = true
    },
    toLinkBank() {
      this.$router.push({ name: 'linkbank' })
    },
    toCSD() {
      this.$router.push({ name: 'uploadcompanylogo' })
    },
  },
}
</script>

<template>
  <ul class="bg-white flex-grow w-full">
    <Portal v-if="showWelcomeAnimation" to="modal">
      <img
        src="@assets/images/Dashboard/welcomeAnimation.gif"
        alt="Welcome to Chain animation!"
        class="fixed bottom-0 mb-4 de:mb-8"
        @click="showWelcomeAnimation = false"
      />
    </Portal>
    <!-- <GxModal v-if="showWelcomeAnimation">
      <WelcomeAnimation
        class="w-screen h-screen"
        @click="showWelcomeAnimation = false"
      />
    </GxModal> -->
    <li v-if="myAccount" class="flex items-center bg-white">
      <GxToDoListItem
        class="text-black"
        title="Te damos la bienvenida"
        subtitle="Tu negocio donde quieras con Chain"
        caption="Aquí encontrarás tus pendientes"
        :date="parsedDate"
        @click="welcomeCelebration"
      >
        <template v-slot:image>
          <div
            class="bg-primary rounded-full w-12 h-12 flex justify-center items-center"
          >
            <GxAvatar shape="circle" :avatar-img="welcomeImage" />
          </div>
        </template>
      </GxToDoListItem>
    </li>
    <!-- <li class="flex items-center bg-white">
      <GxToDoListItem
        class="text-black"
        has-chevron
        :avatar-img="welcomeImage"
        avatar-shape="circle"
        title="Conéctate con tu banco"
        subtitle="Mantente al día con tus movimientos"
        caption="Menos de 1 minuto"
        @click="toLinkBank"
      />
    </li> -->
    <li v-if="myAccount" class="flex items-center bg-white">
      <GxToDoListItem
        class="text-black"
        has-chevron
        title="Emite tu primera factura"
        subtitle="Sube fácil tus certificados e inicia"
        caption="Menos de 5 minutos"
        :date="parsedDate"
        @click="toCSD"
      >
        <template v-slot:image>
          <div
            class="bg-primary rounded-full w-12 h-12 flex justify-center items-center"
          >
            <GxAvatar shape="circle" :avatar-img="welcomeImage" />
          </div>
        </template>
      </GxToDoListItem>
    </li>
    <!-- <li class="flex items-center py-2">
      <div
        class="w-10 h-10 rounded-full text-white border-2 border-white border-dashed flex items-center justify-center"
      >
        <GxIcon icon="add" />
      </div>
      <div class="flex-grow text-white ml-4">
        <p class="font-bold">Añadir otra empresa</p>
      </div>
    </li> -->
  </ul>
</template>
