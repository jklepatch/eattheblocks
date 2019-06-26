<template>
  <div>
    <div>{{ activeAccount }}</div>
    <div>Balance: {{ activeBalance }} Wei</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Accounts',
  computed: {
    ...mapGetters('accounts', ['activeAccount', 'activeBalance'])
  }
}
</script>
