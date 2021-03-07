<template>
  <dialog ref="confirmDialog" class="Confirm-Dialog">
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

<style>
.Confirm-Dialog {
  height: 300px;
  width: 300px;
  position: absolute;
  top: 20%;
  margin: 0 auto;
  padding: 16px;
  color: black;
  border-image: 0;
  padding: 16px;
}
</style>
