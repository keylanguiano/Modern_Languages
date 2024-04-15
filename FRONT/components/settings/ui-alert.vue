<template>
  <v-alert :type="alertType" :color="colorBack">
    {{ mensaje }} {{ classAlert }}
  </v-alert>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      alertType: state => state.type,
      mensaje: state => state.mensaje,
      colorBack: state => state.colorBack
    })
  },
  watch: {
    type () {},
    mensaje () {}
  }
}
</script>
