<template>
  <dialog ref="confirmDialog" class="Dialog">
    <div class="flex">
      <button @click="$emit('yes')" class="btn mr-4" type="button">Yes</button>
      <button @click="$emit('no')" class="btn-secondary" type="button">
        No
      </button>
    </div>
  </dialog>
</template>
<script>
export default {
  mounted() {
    this.$refs.confirmDialog.showModal();
  },
};
</script>
