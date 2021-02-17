<template>
  <dialog ref="addPhotoDialog" class="Add_Image-Dialog">
    <img class="Add_Image-previewImage" :src="imageUrl" />

    <form>
      <div class="Add_Image-form">
        <div class="Add_Image-fieldContainer">
          <label for="title" class="Add_Image-fieldLabel"> Title</label>
          <input
            v-model="imageDetails.title"
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
            v-model="imageDetails.description"
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
            :config="flatpickrConfig"
            class="Add_Image-field"
            v-model="imageDetails.photoTakenDate"
          >
          </flat-pickr>
        </div>

        <nav class="flex">
          <button
            ref="addButton"
            type="button"
            class="btn mr-8"
            @click="savePhoto"
          >
            Upload
          </button>
          <button
            ref="cancelButton"
            type="button"
            @click="closeDialog"
            class="btn-secondary"
          >
            Cancel
          </button>
        </nav>
      </div>
      <div>
        <h2 v-show="savingPhoto">Saving Photo...</h2>
      </div>
    </form>
  </dialog>
</template>

<script>
import 'flatpickr/dist/flatpickr.css';
import DateUtil from '../mixins/date';
export default {
  props: ['image', 'imageUrl'],
  mixins: [DateUtil],
  data() {
    return {
      imageDetails: {
        title: '',
        description: '',
        photoTakenDate: '',
      },
      savingPhoto: false,
    };
  },
  watch: {
    image: {
      handler() {
        if (this.image && this.image.name) {
          this.$refs.addPhotoDialog.showModal();
        }
      },
      deep: true,
    },
  },
  methods: {
    closeDialog() {
      this.$refs.addPhotoDialog.close();
    },
    async savePhoto() {
      this.$refs.addButton.disabled = true;
      this.$refs.cancelButton.disabled = true;
      this.savingPhoto = true;

      const multiPartApi = this.$axios.create({
        headers: {
          'Content-Type': 'multipart/form-data; boundary=--XXX--;',
        },
      });
      const formData = new FormData();
      formData.append('imageFile', this.image, this.image.name);
      formData.append('imageDetails', JSON.stringify(this.imageDetails));
      const newImage = (await multiPartApi.post('/image', formData)).data;

      this.$emit('addedImage', newImage);

      this.closeDialog();
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
