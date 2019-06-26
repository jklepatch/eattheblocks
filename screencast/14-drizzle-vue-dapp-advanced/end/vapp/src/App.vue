<template>
  <div v-if="isDrizzleInitialized" id="app">
    <img alt="Vue logo" src="./assets/logo.png" />

    <div class="section">
      <h2>Show the Accounts</h2>
      <drizzle-account units="Ether" :precision="2" />
    </div>

    <div class="section">
      <h2>Simple Storage</h2>
      <drizzle-contract 
         contractName="SimpleStorage"
         method="storedData"
         label="Value"
      />
      <drizzle-contract-form
        contractName="SimpleStorage"
        method="set"
        :placeholders="['Value']"
      />
    </div>
    <Toast />
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Toast from './Toast';

export default {
  name: 'app',
  computed: mapGetters('drizzle', ['isDrizzleInitialized']),
  components: {
    Toast
  }
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
