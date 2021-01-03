<template>
  <dialog class="Add_Image-Dialog">
    <img class="Add_Image-previewImage" :src="image.src" />

    <form>
      <div class="Add_Image-form">
        <div class="Add_Image-fieldContainer">
          <label for="title" class="Add_Image-fieldLabel"> Title</label>
          <input
            placeholder="What's the picture's title?"
            id="title"
            type="text"
            class="Add_Image-field"
          />
        </div>
        <div class="Add_Image-fieldContainer">
          <label for="description" class="Add_Image-fieldLabel"
            >Descrption</label
          >
          <input
            placeholder="Describe the picture's setting"
            id="description"
            type="text"
            class="Add_Image-field"
          />
        </div>
        <div class="Add_Image-fieldContainer">
          <label for="photoTakenDate" class="Add_Image-fieldLabel"
            >Photo Shot Date</label
          >
          <flat-pickr
            placeholder="When was the photo taken?"
            :config="config"
            class="Add_Image-field"
          >
          </flat-pickr>
        </div>

        <div class="flex">
          <button class="btn mr-8">Upload</button>
          <button class="btn-secondary">Cancel</button>
        </div>
      </div>
    </form>
  </dialog>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
export default {
  props: ['image'],
  components: { flatPickr },
  data() {
    return {
      config: {
        altFormat: 'M j, Y',
        altInput: true,
        dateFormat: 'Y-m-d',
        static: true,
      },
    };
  },
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
<style>
.Add_Image-Dialog {
  height: 700px;
  width: 700px;
  position: absolute;
  margin: 0 auto;
  padding: 16px;
  color: black;
  border-image: 0;
  padding: 16px;
}

.Add_Image-previewImage {
  max-width: 250px;
  max-height: 250px;
  margin: 0 auto;
}

.Add_Image-form {
  display: flex;
  flex-direction: column;
  padding-left: 72px;
  padding-right: 16px;
  margin-top: 16px;
}
.Add_Image-fieldContainer {
  width: 75%;
  margin-bottom: 16px;
}
.Add_Image-fieldLabel {
  display: block;
  margin-bottom: 2px;
  margin-left: 4px;
}

.Add_Image-field {
  border: solid 1px black;
  width: 500px;
  padding: 8px;
}
</style>
