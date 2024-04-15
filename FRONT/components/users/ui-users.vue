<template>
  <div>
    <v-row class="mt-2 mb-10">
      <v-btn block class="btn" @click="openDialog">
        Add user
      </v-btn>
    </v-row>

    <v-row>
      <v-data-table :headers="headers" :items="usuarios" class="table elevation-2">
        <template #[`item.acciones`]="{ item }">
          <v-row align="center" justify="center">
            <v-col cols="6">
              <v-tooltip bottom color="red lighteen-6">
                <template #activator="{ on, attrs }">
                  <v-btn icon color="red lighteen-6" v-bind="attrs" @click="delete_user(item)" v-on="on">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Delete user {{ item.usuario }}</span>
              </v-tooltip>
            </v-col>

            <v-col cols="6">
              <v-tooltip bottom color="green lighteen-6">
                <template #activator="{ on, attrs }">
                  <v-btn icon color="green lighteen-6" v-bind="attrs" @click="update_user(item)" v-on="on">
                    <v-icon>mdi-update</v-icon>
                  </v-btn>
                </template>
                <span>Update user {{ item.usuario }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-row>

    <v-dialog v-model="showDialog" width="600" persistent>
      <v-card class="centerClass dialog">
        <v-card-title>Datos del usuario</v-card-title>

        <v-card-text>
          <v-form ref="frmUser" v-model="frmUser">
            <v-text-field v-model="usuario.nombre" type="text" label="Nombre" placeholder="Ingresa tu nombre" :rules="[requerido, longitud_3]" />
            <v-text-field v-model="usuario.apaterno" type="text" label="Apellido patero" placeholder="Ingresa tu apellido paterno" :rules="[requerido]" />
            <v-text-field v-model="usuario.amaterno" type="text" label="Apellido matero" placeholder="Ingresa tu apellido materno" />
            <v-text-field v-model="usuario.telefono" type="text" label="Teléfono" placeholder="Ingresa tu telefono" />
            <v-text-field v-model="usuario.usuario" type="text" label="Usuario" placeholder="Ingresa tu usuario" :rules="[requerido]" />
            <v-text-field v-model="usuario.password" type="password" label="Password" placeholder="Ingresa tu password" :rules="[requerido, longitud_6]" />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn class="btn" @click="showDialog = false">
            <v-icon>mdi-cancel</v-icon>
            Cancelar
          </v-btn>
          <v-btn class="btn" @click="guardaUsuarios">
            <v-icon>mdi-account</v-icon>
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_delete" max-width="300" persistent>
      <v-card class="centerClass dialog-delete">
        <v-card-title>
          Delete User
        </v-card-title>
        <v-card-text>
          Are you sure want to delete the user?
        </v-card-text>
        <v-card-actions>
          <v-btn color="white" text class="btn" @click="dialog_delete = false">
            Cancel
          </v-btn>
          <v-btn color="white" text class="btn" @click="post_delete">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_update" width="600" persistent>
      <v-card class="centerClass dialog">
        <v-card-title>Datos del usuario</v-card-title>

        <v-card-text>
          <v-form ref="frmUserUpdate" v-model="frmUserUpdate">
            <v-text-field v-model="usuario.nombre" type="text" label="Nombre" placeholder="Ingresa tu nombre" :rules="[requerido, longitud_3]" />
            <v-text-field v-model="usuario.apaterno" type="text" label="Apellido patero" placeholder="Ingresa tu apellido paterno" :rules="[requerido]" />
            <v-text-field v-model="usuario.amaterno" type="text" label="Apellido matero" placeholder="Ingresa tu apellido materno" />
            <v-text-field v-model="usuario.telefono" type="text" label="Teléfono" placeholder="Ingresa tu telefono" />
            <v-text-field
              v-model="usuario.usuario"
              type="text"
              style="display: none;"
              label="Usuario"
              placeholder="Ingresa tu usuario"
              :rules="[requerido]"
            />
            <v-text-field v-model="usuario.password" type="password" label="Password" placeholder="Ingresa tu password" :rules="[requerido, longitud_6]" />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn class="btn" @click="dialog_update = false">
            <v-icon>mdi-cancel</v-icon>
            Cancelar
          </v-btn>
          <v-btn class="btn" @click="actualizarUsuario">
            <v-icon>mdi-account-arrow-up</v-icon>
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      usuarios: [],
      headers: [
        { text: 'Nombre', align: 'c ter', sortable: true, value: 'nombre' },
        { text: 'A. Paterno', align: 'center', sortable: true, value: 'apaterno' },
        { text: 'A. Materno', align: 'center', sortable: true, value: 'amaterno' },
        { text: 'Telefono', align: 'center', sortable: false, value: 'telefono' },
        { text: 'Usuario', align: 'center', sortable: false, value: 'usuario' },
        { text: 'Acciones', align: 'center', sortable: false, value: 'acciones' }
      ],
      showDialog: false,
      frmUser: false,
      usuario: {
        nombre: '',
        apaterno: '',
        amaterno: '',
        telefono: '',
        usuario: '',
        password: ''
      },
      formulario_usuario: {
        nombre: '',
        apaterno: '',
        amaterno: '',
        telefono: '',
        usuario: '',
        password: ''
      },
      requerido: value => !!value || 'Required',
      longitud_3: value => value.length > 2 || 'Nombre requires 3 chars',
      longitud_6: value => value.length > 5 || 'Password requires 6 chars',
      dialog_delete: false,
      user_delete: '',
      dialog_update: false,
      frmUserUpdate: false
    }
  },
  computed: {
    ...mapState({
      token: state => state.token
    })
  },
  mounted () {
    this.getAllUsers()
  },
  methods: {
    openDialog () {
      this.usuario = {
        nombre: '',
        apaterno: '',
        amaterno: '',
        telefono: '',
        usuario: '',
        password: ''
      }
      this.showDialog = true
    },
    async getAllUsers () {
      const headers = {
        headers:
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token
        }
      }
      const response = await this.$axios.get('get-all', headers)

      if (response.data.alerta === 'Success') {
        this.usuarios = response.data.data
      }
    },
    guardaUsuarios () {
      this.frmUser = this.$refs.frmUser.validate()
      if (this.frmUser) {
        this.$axios.post('signup', this.usuario)
          .then((result) => {
            if (result.data.alerta === 'Success') {
              this.$store.commit('modifyAlert', true)
              this.$store.commit('modifyType', 'success')
              this.$store.commit('modifyColor', 'rgb(107, 209, 200)')
              this.$store.commit('modifyText', 'Usuario registrado 🤍')
              setTimeout(() => {
                this.$store.commit('modifyAlert', false)
                this.getAllUsers()
                this.showDialog = false
              }, 3000)
            } else {
              this.$store.commit('modifyAlert', true)
              this.$store.commit('modifyType', 'error')
              this.$store.commit('modifyColor', 'rgb(255, 138, 130)')
              this.$store.commit('modifyText', 'Datos incorrectos')
              setTimeout(() => {
                this.$store.commit('modifyAlert', false)
              }, 3000)
            }
          })
          .catch((err) => {
            console.log('@ Keyla => err ', err)
          })
      }
    },
    delete_user (user) {
      console.log('delete_user')
      this.user_delete = user
      this.dialog_delete = true
    },
    post_delete () {
      console.log('post')
      if (this.user_delete !== '') {
        const user = {
          usuario: this.user_delete.usuario
        }
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token
        }
        console.log(this.usuario)
        this.$axios.post('delete-user', user, { headers })
          .then((result) => {
            if (result.data.alerta === 'El usuario fue borrado') {
              this.getAllUsers()
              this.$store.commit('modifyAlert', true)
              this.$store.commit('modifyType', 'success')
              this.$store.commit('modifyText', 'User delete 🤍')
              this.$store.commit('modifyColor', 'rgb(107, 209, 200)')
              setTimeout(() => {
                this.$store.commit('modifyAlert', false)
                this.getAllUsers()
                this.dialog_delete = false
              }, 3000)
            } else {
              this.$store.commit('modifyAlert', true)
              this.$store.commit('modifyType', 'error')
              this.$store.commit('modifyText', 'Error')
              this.$store.commit('modifyColor', 'rgb(255, 138, 130)')
              setTimeout(() => {
                this.$store.commit('modifyAlert', false)
              }, 3000)
            }
          })
          .catch((err) => {
            console.log('@ Keyla => err ', err)
          })
      }
    },
    update_user (user) {
      this.usuario.nombre = ''
      this.usuario.apaterno = ''
      this.usuario.amaterno = ''
      this.usuario.telefono = ''
      this.usuario.usuario = user.usuario
      this.usuario.password = ''

      this.dialog_update = true
    },
    actualizarUsuario () {
      this.frmUserUpdate = this.$refs.frmUserUpdate.validate()
      if (this.frmUserUpdate) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token
        }
        this.$axios.post('update-user', this.usuario, { headers })
          .then((result) => {
            this.$store.commit('modifyAlert', true)
            this.$store.commit('modifyType', 'success')
            this.$store.commit('modifyText', 'Usuario actualizado 🤍')
            this.$store.commit('modifyColor', 'rgb(107, 209, 200)')
            setTimeout(() => {
              this.$store.commit('modifyAlert', false)
              this.getAllUsers()
              console.log('@ Keyla => update', result)
              this.dialog_update = false
            }, 3000)
          })
          .catch((err) => {
            console.log('@ Keyla => error', err)
          })
      } else {
        this.$store.commit('modifyAlert', true)
        this.$store.commit('modifyType', 'error')
        this.$store.commit('modifyColor', 'rgb(255, 138, 130)')
        this.$store.commit('modifyText', 'Datos incorrectos')
        setTimeout(() => {
          this.$store.commit('modifyAlert', false)
        }, 3000)
      }
    }

  }
}
</script>
