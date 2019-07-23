<template>
  <section></section>
</template>

<script>
import Toasted from 'vue-toasted';
import Vue from 'vue';

Vue.use(Toasted);

export default {
  mounted() {
    const contractEventHandler = ({ contractName, eventName, data }) => {
      const display = `${contractName}(${eventName}): ${data.from}, ${data.to}, ${data.value}`;
      const subOptions = { duration: 3000 };
      this.$toasted.show(display, subOptions);
    };
    this.$drizzleEvents.$on('drizzle/contractEvent', payload => {
      contractEventHandler(payload);
    });
  }
}
</script>
