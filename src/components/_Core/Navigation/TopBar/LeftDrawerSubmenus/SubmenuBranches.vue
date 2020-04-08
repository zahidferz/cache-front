<script>
// import GxToDoListItem from '@components/_Core/Lists/GxToDoListItem'
// import GxAvatar from '@components/_Core/Avatars/GxAvatar'
// import { format } from 'date-fns'
// const es = require('date-fns/locale/es')

export default {
  name: 'SubmenuBranches',
  components: {},
  data() {
    return {
      image: require('@src/assets/images/UNASSIGNED/10.svg'),
      welcomeImage: require('@src/assets/images/Storybook/bestia.svg'),
      error: null,
    }
  },
  computed: {},
  methods: {},
}
</script>

<template>
  <ul class="bg-white flex-grow w-full">
    <li>Branch 1</li>
    <li>Branch 1</li>
    <li>Branch 1</li>
    <li>Branch 1</li>
    <li>Branch 1</li>
  </ul>
</template>
