<template>
  <dialog>
    <figure>
      <img :src="image.src" />
    </figure>
  </dialog>
</template>
<script>
export default {
  props: ['image'],
  watch: {
    image: {
      handler() {
        if (this.image && this.image.src.trim() !== '') {
          document.querySelector('dialog').showModal();
        }
      },
      deep: true,
    },
  },
  methods: {
    showDialog() {
      document.querySelector('dialog').showModal();
    },
  },
};
</script>
