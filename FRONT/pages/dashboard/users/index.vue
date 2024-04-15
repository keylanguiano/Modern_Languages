<template>
  <div class="ma-1 pa-1">
    <v-row class="ma-2 pa-2">
      Pagina de usuarios
    </v-row>

    <v-row class="ma-2 pa-2">
      <ui-users />
    </v-row>
  </div>
</template>

<script>
import uiUsers from '@/components/users/ui-users.vue'

export default {
  components: {
    uiUsers
  },

  layout: 'principal',

  data () {
    return {}
  },

  mounted () {},

  methods: {}
}
</script>
