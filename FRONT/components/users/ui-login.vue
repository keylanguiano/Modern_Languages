<template>
  <v-card width="400" class="card">
    <v-card-title class="titulo">
      Welcome
    </v-card-title>

    <v-card-text>
      <v-form ref="frmLogin" v-model="valid">
        <v-text-field v-model="usuario" type="text" placeholder="Ingresa el usuario" label="Usuario" :rules="[rules.required]" />
        <v-text-field v-model="password" type="password" placeholder="Ingresa la contraseña" label="Password" :rules="[rules.required, rules.password]" />
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn block elevation="0" class="btn" @click="loginUser">
        Login
        <v-icon color="white">
          mdi-account
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      usuario: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        password: value => value.length > 5 || 'Password requires 6 chars'
      }
    }
  },

  methods: {
    loginUser () {
      this.valid = this.$refs.frmLogin.validate()

      if (this.valid) {
        const sendData = {
          usuario: this.usuario,
          password: this.password
        }

        this.$axios.post('login', sendData)
          .then((result) => {
            if (result.data.alerta === 'Success') {
              this.$store.commit('modifyAlert', true)
              this.$store.commit('modifyType', 'success')
              this.$store.commit('modifyColor', 'rgb(107, 209, 200)')
              this.$store.commit('modifyText', 'Bienvenido 🤍')
              this.$store.commit('modifyToken', result.data.token)
              setTimeout(() => {
                this.$store.commit('modifyAlert', false)
                this.$router.push('/dashboard')
                console.log('@ Keyla => Token ', result.data.token)
              }, 3000)
            } else {
              this.$store.commit('modifyAlert', true)
              this.$store.commit('modifyType', 'error')
              this.$store.commit('modifyColor', 'rgb(255, 138, 130)')
              this.$store.commit('modifyText', result.data.alerta)
              setTimeout(() => {
                this.$store.commit('modifyAlert', false)
              }, 3000)
            }
          })
          .catch()
      } else {
        // handle invalid form
      }
    }
  }
}

</script>
