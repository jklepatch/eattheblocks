<template>
  <form>
    <input
      v-model="value"
      type="text"
      placeholder="Value"
    />
    <button @click.prevent="onSubmit">Submit</button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SimpleStorageForm',
  computed: {
    ...mapGetters('drizzle', ['drizzleInstance'])
  },
  methods: {
    onSubmit() {
      this.drizzleInstance
      .contracts['SimpleStorage']
      .methods['set']
      .cacheSend(this.value)
    }
  },
  data: () => ({
    value: ''
  })
}
</script>
