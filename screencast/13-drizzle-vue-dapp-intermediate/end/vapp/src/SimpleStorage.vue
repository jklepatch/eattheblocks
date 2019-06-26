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
  computed: {
    ...mapGetters('contracts', ['getContractData', 'contractInstances']),
    contractData() {
      const t = this.getContractData({
        contract: args.contractName,
        method: args.method
      });
      //eslint-disable-next-line
      console.log(t);
      return t;
    }
  },
  created() {
    this.$store.dispatch('drizzle/REGISTER_CONTRACT', args);
  }
}
</script>
