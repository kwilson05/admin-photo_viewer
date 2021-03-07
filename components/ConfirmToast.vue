<template>
  <aside class="toast mb-4 mt-4">
    <label class="text-right" @click="close"> X</label>
    <p class="text-center">{{ message }}</p>
  </aside>
</template>
<script>
export default {
  props: ['message'],
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
