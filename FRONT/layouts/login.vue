<template>
  <v-app>
    <v-row class="centerClass">
      <Nuxt />
      <ui-alert v-if="showAlert" class="alerta" />
    </v-row>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import UiAlert from '@/components/settings/ui-alert.vue'

export default {
  components: {
    UiAlert
  },
  computed: {
    ...mapState(['showAlert'])
  }
}
</script>
