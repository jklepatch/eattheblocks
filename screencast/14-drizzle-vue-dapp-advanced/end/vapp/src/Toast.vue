<template>
  <section></section>
</template>

<script>
import Toasted from 'vue-toasted';
import { DrizzleEvents } from '@drizzle/vue-plugin';
import Vue from 'vue';
Vue.use(Toasted);

export default {
  mounted() {
    // See docs: https://github.com/shakee93/vue-toasted#options
    const subOptions = { duration: 3000 } // 3 seconds
    const contractEventHandler = ({ contractName, eventName, data }) => {
      const display = `${contractName}(${eventName}): storedData updated to '${data.newValue}' on ${new Date(parseInt(data.date))}`;
      this.$toasted.show(display, subOptions);
    }
    DrizzleEvents.$on('drizzle/contractEvent', payload => {
      contractEventHandler(payload)
    })
  }
}
</script>
