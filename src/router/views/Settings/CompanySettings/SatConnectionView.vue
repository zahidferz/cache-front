<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import SatConnection from '@components/Settings/CompanySettings/SatConnection'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  page: {
    title: 'Conexión al SAT',
    meta: [{ name: 'description', content: 'Conexión al SAT' }],
  },
  name: 'SatConnectionView',
  components: { LayoutWebMobile, SatConnection, GxCardModal, GxIcon },
  data() {
    return {
      alertImg: this.$utils.alertImages.retencion_de_usuario,
      showDoItLater: false,
    }
  },
}
</script>
<template>
  <LayoutWebMobile
    title="Conexión al SAT"
    icon="keyboard_backspace"
    icon-class-without-scroll="text-black"
    :icon-click-handler="() => (showDoItLater = true)"
  >
    <template v-if="$mq === 'de'">
      <h1 class=" gx-h4 flex items-center ">
        <GxIcon
          class="cursor-pointer"
          icon="keyboard_backspace"
          @click="() => (showDoItLater = true)"
        />
        <span class="ml-4 font-bold">Conexión al SAT</span>
      </h1>
    </template>
    <SatConnection />
    <GxCardModal
      v-if="showDoItLater"
      headline="¿Seguro que quieres salir?"
      text-body="Podrás actualizar tu conexión al SAT después, pero te recomendamos hacerlo ahora."
      :card-img="$utils.alertImages.Khaaa"
      alt="alertAlt"
    >
      <template v-slot:actions>
        <div class="flex justify-center">
          <GxButton
            :ghost="$mq === 'de'"
            :plain="$mq === 'mo'"
            class="text-alert de:text-primary mr-4"
            @click="
              () =>
                $router.push({
                  name: 'dashboard',
                  query: { drawerRight: true },
                })
            "
            >salir</GxButton
          >
          <GxButton :plain="$mq === 'mo'" @click="showDoItLater = false"
            >Continuar</GxButton
          >
        </div>
      </template>
    </GxCardModal>
  </LayoutWebMobile>
</template>
