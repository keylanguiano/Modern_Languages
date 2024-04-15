export const state = () => ({
  type: '',
  showAlert: false,
  mensaje: '',
  token: ''
})

export const mutations = {
  modifyType (state, type) {
    state.type = type
  },

  modifyAlert (state, showAlert) {
    state.showAlert = showAlert
  },

  modifyText (state, mensaje) {
    console.log(mensaje)
    state.mensaje = mensaje
  },

  modifyColor (state, colorBack) {
    state.colorBack = colorBack
  },

  modifyToken (state, token) {
    state.token = token
  }
}
