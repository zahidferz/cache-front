<script>
import GxCard from '@components/_Core/Cards/GxCard'
import GxCardImageAndLabel from '@components/_Core/Cards/GxCardImageAndLabel'
import { UPDATE_USER_JOBTITLE } from '@src/apollo//mutations'
import { axiosAccountProvisioning } from '@src/axiosConfig'
import gql from 'graphql-tag'
import get from 'lodash/get'
const _ = {
  get,
}
export default {
  name: 'CompanyRoleFromInvitation',
  components: {
    GxCard,
    GxCardImageAndLabel,
  },
  apollo: {
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
      loading: false,
      customError: null,
      selection: '',
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
  },
  methods: {
    pickRole(role) {
      this.$apollo.mutate({
        mutation: UPDATE_USER_JOBTITLE,
        variables: {
          jobTitle: role,
        },
      })
      this.loading = true
      axiosAccountProvisioning
        .post(
          `/update_account/${this.myAccount.userNumber}/${
            this.myAccount.companies[0].company.companyNumber
          }`,
          {
            user: {
              jobTitle: role,
            },
          }
        )
        .then((res) => {
          this.loading = false
          this.$router.push({
            name: `dashboard`,
            query: {
              invitado: true,
            },
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
  },
}
</script>
<template>
  <div class="flex-grow flex flex-col justify-between">
    <MqLayout class="flex-grow flex flex-col items-center p-4" mq="mo">
      <GxCardImageAndLabel
        v-for="(option, index) in options"
        :key="index"
        class="my-2"
        :image="option.image"
        :alt="option.alt"
        :label="option.title"
        @click="pickRole(option.role)"
      />
    </MqLayout>
    <MqLayout class="flex-grow flex flex-col items-center px-12" mq="de">
      <p class="gx-h4 font-bold mb-8"
        >Háblanos de la mejor empresa: ¡La tuya!</p
      >
      <p class="gx-h5 self-start mb-12">¿Qué haces en la empresa?</p>
      <div class="flex">
        <GxCard
          v-for="(option, index) in options"
          :key="index"
          :card-img="option.image"
          :alt="option.alt"
          :headline="option.title"
          class="w-64"
          :class="{
            'mr-16': index !== options.length - 1,
            'de:hover:bg-secondary-50': selection !== option.role,
            'de:shadow-4': selection === option.role,
          }"
          @click="selection = option.role"
        />
      </div>
      <p v-if="customError">{{ customError }}</p>
      <GxButton class="mt-16" :loading="loading" @click="pickRole(selection)"
        >Continuar</GxButton
      >
    </MqLayout>
  </div>
</template>
