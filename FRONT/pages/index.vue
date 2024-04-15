<template>
  <ui-login />
</template>

<script>
import uiLogin from '@/components/users/ui-login.vue'

export default {
  name: 'IndexPage',
  components: {
    uiLogin
  },
  layout: 'login'
}
</script>
