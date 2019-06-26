<template>
  <div v-if="isDrizzleInitialized" id="app">
    <img alt="Vue logo" src="./assets/logo.png" />

    <div class="section">
      <h2>Show the Accounts</h2>
      <Account />
    </div>

    <div class="section">
      <h2>Simple Storage</h2>
      <SimpleStorage />
      <SimpleStorageForm />
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Account from './Account';
import SimpleStorage from './SimpleStorage';
import SimpleStorageForm from './SimpleStorageForm';

export default {
  name: 'app',
  components: {
    Account,
    SimpleStorage,
    SimpleStorageForm
  },
  computed: mapGetters('drizzle', ['isDrizzleInitialized'])
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
