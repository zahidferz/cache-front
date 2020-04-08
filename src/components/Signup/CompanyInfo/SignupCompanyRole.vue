<script>
import GxCard from '@components/_Core/Cards/GxCard'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxTextAreaTags from '@components/_Core/Forms/GxTextAreaTags'
import GxModal from '@components/_Core/Modals/GxModal'
import GxCardImageAndLabel from '@components/_Core/Cards/GxCardImageAndLabel'
import { SEND_TEAM_MEMBER_INVITATION } from '@src/apollo//mutations'
import { axiosAccountProvisioning } from '@src/axiosConfig'
import gql from 'graphql-tag'
export default {
  name: 'SignupCompanyRole',
  components: {
    GxCard,
    GxModal,
    GxTextAreaTags,
    GxCardModal,
    GxCardImageAndLabel,
  },
  apollo: {
    myAccount: {
      query: gql`
        {
          myAccount {
            userNumber
            firstName
            companies {
              company {
                companyNumber
              }
            }
          }
        }
      `,
    },
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
  },
  data() {
    return {
      loading: false,
      roleSelection: '',
      showInvitationsForm: false,
      accountantEmail: {
        value: '',
      },
      emptyInput: false,
      teamEmails: [],
      skipStep: false,
      nextLoading: false,
      invitationSent: false,
      customError: null,
      placeholderTeamEmails: 'Añade un email',
      pickedRole: null,
      hasSelectedAnOption: false,
    }
  },
  computed: {
    options() {
      if (this.$mq === 'de') {
        return [
          {
            title: 'Soy contador',
            alt: 'Soy contador',
            image: require('@src/assets/images/Signup/CompanyInfo/SeleccionaTuPuesto/mo_001_3_contador.svg'),
            role: 'Contador',
          },
          {
            title: 'Soy dueño',
            alt: 'Soy dueño',
            image: require('@src/assets/images/Signup/CompanyInfo/SeleccionaTuPuesto/mo_001_3_dueno.svg'),
            // image: require('@src/assets/images/Signup/CompanyInfo/SeleccionaTuPuesto/old/mo_001_3_dueno.svg'),
            role: 'Dueño',
          },
          {
            title: 'Trabajo en la empresa',
            alt: 'Trabajo en la empresa',
            image: require('@src/assets/images/Signup/CompanyInfo/SeleccionaTuPuesto/mo_001_3_trabajador.svg'),
            role: 'Empleado',
          },
        ]
      } else {
        return [
          {
            title: 'Soy dueño',
            alt: 'Soy dueño',
            image: require('@src/assets/images/Signup/CompanyInfo/SeleccionaTuPuesto/mo_001_3_dueno.svg'),
            role: 'Dueño',
          },
          {
            title: 'Soy contador',
            alt: 'Soy contador',
            image: require('@src/assets/images/Signup/CompanyInfo/SeleccionaTuPuesto/mo_001_3_contador.svg'),
            role: 'Contador',
          },
          {
            title: 'Trabajo en la empresa',
            alt: 'Trabajo en la empresa',
            image: require('@src/assets/images/Signup/CompanyInfo/SeleccionaTuPuesto/mo_001_3_trabajador.svg'),
            role: 'Empleado',
          },
        ]
      }
    },
    multipleInvites() {
      if (this.roleSelection === 'Contador') {
        return this.teamEmails.length > 1
      }
      return this.teamEmails.length + (this.accountantEmail.value ? 1 : 0) > 1
    },
  },
  watch: {
    teamEmails(newVal) {
      if (newVal.length && newVal.length > 0) {
        this.placeholderTeamEmails = ''
      } else {
        this.placeholderTeamEmails = 'Añade un email...'
      }
    },
  },
  methods: {
    onSkipStep() {
      this.showInvitationsForm = false
      this.skipStep = true
    },
    async pickRole(role) {
      if (!this.roleSelection && this.$mq === 'de') {
        this.hasSelectedAnOption = true
        return
      }
      this.roleSelection = role
      this.pickedRole = role
      this.nextLoading = true
      try {
        const res = await axiosAccountProvisioning.post(
          `/update_account/${this.myAccount.userNumber}/${
            this.myAccount.companies[0].company.companyNumber
          }`,
          {
            user: {
              jobTitle: role,
            },
            subscription: {
              subscriptionNumber: this.subscription.number,
            },
          }
        )
        if (this.$route.query.invitado) {
          this.$mq === 'de'
            ? (this.nextLoading = false)
            : (this.nextLoading = true)
          this.$router.push({ name: `dashboard` })
        } else if (this.$mq === 'mo') {
          if (res.data.user.jobTitle === 'Contador') {
            this.$router.push({ name: `teamInvitations` })
          } else {
            this.$router.push({ name: `accountantInvitation` })
          }
        } else {
          this.showInvitationsForm = true
        }
        this.$mq === 'de'
          ? (this.nextLoading = false)
          : (this.nextLoading = true)
      } catch (error) {
        this.nextLoading = false
        this.customError = this.$utils.parseServerError(error)
      }
    },
    async sendInvitations() {
      if (this.roleSelection === 'Contador' && this.teamEmails.length === 0) {
        this.emptyInput = true
        return
      }
      if (this.teamEmails.length === 0 && this.accountantEmail.value === '') {
        this.emptyInput = true
        return
      }
      try {
        this.loading = true
        if (this.accountantEmail.value !== '') {
          await this.$apollo.mutate({
            mutation: SEND_TEAM_MEMBER_INVITATION,
            variables: {
              email: this.accountantEmail.value,
              companyNumber: this.myAccount.companies[0].company.companyNumber,
              profile: 'accountant',
              jobTitle: 'Contador',
            },
          })
        }
        const promises = this.teamEmails.map((mail, index) => {
          if (mail.value !== this.accountantEmail.value) {
            return this.$apollo.mutate({
              mutation: SEND_TEAM_MEMBER_INVITATION,
              variables: {
                email: mail.value,
                companyNumber: this.myAccount.companies[0].company
                  .companyNumber,
              },
            })
          }
        })
        await Promise.all(promises)
        this.loading = false
        this.invitationSent = true
        const timeout = setTimeout(() => {
          // Do something
          this.$router.push({ name: 'companyBusiness' })
        }, 3000)
        this.$once('hook:destroyed', () => {
          clearTimeout(timeout)
        })
      } catch (error) {
        this.loading = false
        // ADD MODAL ERROR PAL
        this.customError = this.$utils.parseServerError(error)
      }
    },
    closeModal() {
      this.skipStep = false
      this.showInvitationsForm = true
    },
    doItLater() {
      if (this.$route.query.invitado) {
        this.$router.push({ name: `dashboard` })
      }
      this.$router.push({ name: `companyBusiness` })
    },
  },
}
</script>
<template>
  <div class="flex-grow flex flex-col justify-center">
    <MqLayout class="flex-grow flex flex-col items-center p-4" mq="mo">
      <GxCardImageAndLabel
        v-for="(option, index) in options"
        :key="index"
        class="mb-8"
        :image="option.image"
        :alt="option.alt"
        :label="option.title"
        :loading="nextLoading && pickedRole === option.role"
        :disabled="nextLoading && pickedRole !== option.role"
        @click="pickRole(option.role)"
      />
    </MqLayout>
    <MqLayout
      class="flex-grow flex flex-col justify-center items-center px-12"
      mq="de"
    >
      <p class="gx-h4 font-bold mb-8"
        >Háblanos de la mejor empresa: ¡La tuya!</p
      >
      <div class="flex flex-col">
        <p class="gx-h5 self-start mb-16">¿Qué haces en la empresa?</p>
        <div class="flex">
          <GxCard
            v-for="(option, index) in options"
            :key="index"
            :card-img="option.image"
            :alt="option.alt"
            :headline="option.title"
            :zoom="roleSelection !== option.role"
            class="w-66"
            :class="{
              'mr-16': index !== options.length - 1,
              'de:hover:bg-gray-200': roleSelection !== option.role,
              'de:shadow-5 border-2 border-primary-400':
                roleSelection === option.role,
            }"
            @click="roleSelection = option.role"
          />
        </div>
      </div>
      <div class="flex flex-col mt-16 text-center text-alert items-center">
        <p v-if="!roleSelection && hasSelectedAnOption" class="text-center"
          >Elige una opción para continuar</p
        >
        <GxButton
          :loading="nextLoading"
          class="justify-center mt-2 "
          @click="pickRole(roleSelection)"
          >continuar</GxButton
        >
      </div>
      <transition name="modals" mode="out-in">
        <GxModal
          v-if="showInvitationsForm && !skipStep"
          key="invitationForm"
          @close="showInvitationsForm = false"
        >
          <div
            class="rounded-lg bg-primary py-6 px-8 gxModalForm flex flex-col text-white"
          >
            <p class="gx-h4 font-bold mb-6 text-center"
              >{{ myAccount.firstName }}, invita a todo tu equipo</p
            >
            <p>
              Escribe el correo de los miembros de tu equipo separado por comas
              o espacio.
            </p>
            <GxForm class="mt-8 mb-4 flex flex-col" @submit="sendInvitations">
              <p class="de:gx-caption gx-caption mb-2">Invita a tu contador:</p>
              <GxTextFieldDarkEmail
                v-if="roleSelection !== 'Contador'"
                v-model="accountantEmail.value"
                label="Correo Electrónico del contador"
                autofocus
              />
              <div class="mb-8">
                <GxTextAreaTags
                  v-model="teamEmails"
                  dark
                  :placeholder="placeholderTeamEmails"
                  label="Correos electrónicos de los miembros del equipo"
                  class="my-4"
                />
              </div>
              <p v-if="emptyInput" class="text-center text-white mb-2"
                >Escribe al menos un correo válido.</p
              >
              <p v-if="customError" class="text-center text-white mb-2">{{
                customError
              }}</p>
              <GxButton
                key="senInvitationsSubmit"
                ref="submitButton"
                class="mx-auto"
                dark
                type="submit"
                :loading="loading"
                >enviar invitaciones</GxButton
              >
              <GxTextLink class="font-bold mx-auto" @click="onSkipStep"
                >Omitir este paso</GxTextLink
              >
            </GxForm>
          </div>
        </GxModal>
        <GxCardModal
          v-else-if="skipStep && !showInvitationsForm"
          key="skipSTepModal"
          headline="¿Seguro que quieres salir?"
          text-body="Podrás integrar a tu equipo cuando lo necesites, pero ahora es
              el mejor momento."
          :card-img="$utils.alertImages.Cry"
          alt="Imagen de usuario llorando"
        >
          <template v-slot:actions>
            <div class="flex self-center de:mt-8">
              <GxButton
                :ghost="$mq === 'de'"
                :plain="$mq === 'mo'"
                class="text-alert de:text-primary mr-4"
                @click="doItLater"
                >salir</GxButton
              >
              <GxButton :plain="$mq === 'mo'" @click="closeModal"
                >continuar</GxButton
              >
            </div>
          </template>
        </GxCardModal>
      </transition>
      <GxCardModal
        v-if="!multipleInvites && invitationSent"
        headline="¡Invitación enviada!"
        text-body="Te notificaremos cuando acepte tu invitación y esté dentro."
        :card-img="$utils.alertImages.Success"
        alt="Animación de éxito"
        @click="$router.push({ name: 'companyBusiness' })"
      />
      <GxCardModal
        v-if="multipleInvites && invitationSent"
        headline="¡Invitaciones enviadas!"
        text-body="Te notificaremos cuando todo el equipo esté abordo."
        :card-img="$utils.alertImages.Success"
        alt="Animación de éxito"
        @click="$router.push({ name: 'companyBusiness' })"
      />
    </MqLayout>
  </div>
</template>
<style lang="scss" scoped>
.gxModalForm {
  width: 27rem;
}
.zoom {
  transition: all 0.05s ease-in-out;
}
.zoom:hover {
  transform: scale(1.08);
}
.zoom:active {
  transform: scale(1);
}
</style>
