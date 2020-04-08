<script>
import GxIcon from '@components/_Core/Icons/GxIcon'

export default {
  name: 'AsideMainMenuPrivacy',
  components: {
    GxIcon,
  },
  data() {
    return {
      menu: {
        cuidamosdeti: {
          name: 'Cuidamos de ti',
          route: 'privacypolicy',
          icon: 'vpn_lock',
          children: {
            // proteccion: {
            //   name: 'Protección de datos',
            //   route: 'dataprotection',
            //   initialTab: 0,
            //   icon: 'import_contacts',
            // },
            terminos: {
              name: 'Términos y condiciones',
              route: 'termsandconditions',
              initialTab: 1,
              icon: 'contacts',
            },
            politica: {
              name: 'Aviso de privacidad',
              route: 'privacypolicy',
              initialTab: 2,
              icon: 'lock',
            },
          },
        },
      },
    }
  },
  computed: {
    item() {
      let itemMenu = this.$route.query.initialTab
      return itemMenu
    },
  },
}
</script>
<template>
  <ul class="my-4">
    <li v-for="menuItem in menu" :key="menuItem.name" class="mb-4">
      <a class="flex items-center p-2 px-4" href="#">
        <GxIcon icon="vpn_key" class="text-gray-700" />
        <span class="mx-2 truncate">{{ menuItem.name }}</span>
      </a>
      <ul v-if="menuItem.children" class="mb-4">
        <li
          v-for="(submenuItem, index) in menuItem.children"
          :key="index"
          class=" truncate px-8 hover:bg-gray-200 py-2 hover:text-secondary-200 group"
        >
          <RouterLink
            :class="{
              'font-bold group-hover:text-black':
                item === submenuItem.initialTab,
            }"
            :to="{
              name: submenuItem.route,
              query: { initialTab: submenuItem.initialTab },
            }"
            ><GxIcon
              :icon="submenuItem.icon"
              :class="{
                'text-primary': item === submenuItem.initialTab,
                'text-gray-700 group-hover:text-secondary-300':
                  item !== submenuItem.initialTab,
              }"
            />
            {{ submenuItem.name }}</RouterLink
          >
        </li>
      </ul>
    </li>
  </ul>
</template>
