<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      class="pt-4 nav-bar"
      :mini-variant.sync="mini"
      permanent
    >
      <!--Lista de opciones-->
      <v-list-item class="nav-bar">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/66.jpg" />
        </v-list-item-avatar>
        <v-list-item-title>Keyla Anguiano</v-list-item-title>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider />

      <v-list>
        <v-list-item v-for="opcion in opciones" :key="opcion.titulo" :to="opcion.path">
          <v-list-item-icon>
            <v-icon>{{ opcion.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="nav-option">{{ opcion.titulo }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="center">
      <Nuxt />
      <ui-alert v-if="showAlert" class="alerta" />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import UiAlert from '@/components/settings/ui-alert.vue'

export default {
  components: {
    UiAlert
  },
  data () {
    return {
      drawer: true,
      mini: true,
      opciones: [
        { titulo: 'Users', icon: 'mdi-account', path: '/dashboard/users' }
      ]
    }
  },
  computed: {
    ...mapState({
      showAlert: state => state.showAlert
    })
  },
  methods: {
    users (path) {
      this.$router.push(path)
    }
  }
}
</script>
