<template>
  <p>
    <strong>Stored data</strong>: {{ contractData }} 
  </p>
</template>

<script>
import { mapGetters } from 'vuex'

const args = {
  contractName: 'SimpleStorage',
  method: 'storedData',
  methodArgs: ''
};
export default {
  name: 'SimpleStorage',
  computed: {
    ...mapGetters('contracts', ['getContractData']),
    contractData() {
      return this.getContractData({
        contract: args.contractName,
        method: args.method
      });
    }
  },
  created() {
    this.$store.dispatch('drizzle/REGISTER_CONTRACT', args);
  }
}
</script>
