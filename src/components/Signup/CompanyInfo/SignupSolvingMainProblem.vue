<script>
import GxTextArea from '@components/_Core/Forms/GxTextArea'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import { axiosAccountProvisioning } from '@src/axiosConfig'
import gql from 'graphql-tag'
import get from 'lodash/get'
const _ = {
  get,
}
export default {
  name: 'SignupSolvingMainProblem',
  components: {
    GxTextArea,
    GxCardModal,
  },
  apollo: {
    user: gql`
      {
        user @client {
          number
        }
      }
    `,
    company: gql`
      {
        company @client {
          number
        }
      }
    `,
    subscription: gql`
      {
        subscription @client {
          number
        }
      }
    `,
    myAccount: gql`
      {
        myAccount {
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
      image: require('@src/assets/images/Signup/CompanyInfo/PrincipalProblema/mo_001_3_problema.svg'),
      mainProblem: '',
      showWelcomeModal: false,
      welcomeImg: require('@src/assets/images/Signup/Alerts/mo_welcome.svg'),
      welcomeAlt: '¡Bienvenido!',
      loading: false,
      hasFocus: false,
      loadingSuccess: false,
    }
  },
  computed: {
    collapseImage() {
      return this.hasFocus && !this.$utils.isIphone
    },
  },
  mounted() {
    setTimeout(() => {
      this.hasFocus = true
    }, 2000)
  },
  methods: {
    sendComment() {
      this.loading = true
      axiosAccountProvisioning
        .post(
          `/update_account/${this.myAccount.userNumber}/${
            this.myAccount.companies[0].company.companyNumber
          }`,
          {
            subscription: {
              registry: {
                businessBiggestProblem: this.mainProblem,
              },
            },
          }
        )
        .then((res) => {
          this.loading = false
          this.loadingSuccess = true
          // Waiting for the loading-success animation to be completed before displaying the welcome modal
          setTimeout(() => {
            this.showWelcomeModal = true
          }, 1000)
          const timeout = setTimeout(() => {
            // Do something
            this.nextPage()
          }, 3000)
          this.$once('hook:destroyed', () => {
            clearTimeout(timeout)
          })
        })
        .catch((err) => {
          this.loading = false
          this.customError = _.get(
            err,
            'response.data.message',
            'Hubo un error'
          )
        })
    },
    nextPage() {
      this.$router.push({ name: 'dashboard', query: { verpendientes: true } })
    },
  },
}
</script>
<template>
  <div class="flex-grow flex flex-col">
    <div
      class="overflow-x-hidden"
      :class="{ gxImageContainer: !collapseImage }"
    >
    </div>
    <form
      :class="{ 'mb-8': hasFocus, 'mb-0': !hasFocus }"
      class="gxMainProblemForm flex-grow border-t border-primary rounded-lg bg-primary p-4 z-1"
      @submit.prevent="sendComment"
    >
      <p class=" text-white"
        >¿Cuál es el problema principal que quieres resolver con Chain?</p
      >
      <GxTextArea
        v-model="mainProblem"
        dark
        label="mainProblem"
        class="mt-4 h-64"
        placeholder="Escribe tu comentario aquí"
        autofocus
        :autofocus-timeout="1000"
        @focus="hasFocus = true"
        @blur="hasFocus = false"
      />
      <GxButton
        class="mx-auto mt-8"
        dark
        type="submit"
        :loading="loading"
        :loading-success="loadingSuccess"
        >continuar</GxButton
      >
    </form>

    <GxCardModal
      v-if="showWelcomeModal"
      headline="¡Bienvenido!"
      text-body="Tú, tu equipo y tu empresa están dentro junto a miles de empresas que solo utilizan la mejor app."
      :card-img="$utils.alertImages.Success"
      alt="Imagen de éxito"
      @click="nextPage"
    />
  </div>
</template>
<style>
.gxMainProblemForm {
  margin-top: -1rem;
}
.gxImageContainer {
  width: 100%;
  padding-bottom: calc(100% * 244 / 360);
  margin-top: -3.25rem;
  background-image: url(~@assets/images/Signup/CompanyInfo/PrincipalProblema/mo_001_3_problema.svg);
  background-repeat: no-repeat;
  background-position-x: center;
  background-size: cover;
  transition: all 0.1s ease-in-out;
}
</style>
