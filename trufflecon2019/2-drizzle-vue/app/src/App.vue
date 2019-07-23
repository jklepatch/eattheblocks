<template>
  <div v-if="isDrizzleInitialized" id="app">
    <h1>Drizzle Event Example - Vue</h1>

    <div class="section">
      <h2>ERC20 Token</h2>
      <div>
        <strong>Balance of {{ addr }} </strong>
        <drizzle-contract 
           contractName="ERC20Token"
           method="balanceOf"
           :methodArgs="[addr]"
        />
      </div>
      <div>
        <strong>Transfer</strong>
        <drizzle-contract-form
          contractName="ERC20Token"
          method="transfer"
          :placeholders="['Address', 'Value']"
        />
      </div>
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
  data: () => ({
    addr: '0x2cfb04529afed0ceeb3e7518130e1843276c829b'
  }),
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
