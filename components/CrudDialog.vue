<template>
  <dialog ref="imageDialog" class="Dialog">
    <img
      v-show="hasImage"
      class="Dialog-previewImage"
      :src="imageDetails.url"
    />

    <form>
      <div class="Dialog-form">
        <div class="Dialog-fieldContainer">
          <label for="title" class="Dialog-fieldLabel"> Title</label>
          <input
            v-model="newImageDetails.title"
            placeholder="What's the picture's title?"
            id="title"
            type="text"
            class="Dialog-field"
          />
        </div>
        <div class="Dialog-fieldContainer">
          <label for="description" class="Dialog-fieldLabel">Descrption</label>
          <input
            v-model="newImageDetails.description"
            placeholder="Describe the picture's setting"
            id="description"
            type="text"
            class="Dialog-field"
          />
        </div>
        <div class="Dialog-fieldContainer mb-5">
          <label for="photoTakenDate" class="Dialog-fieldLabel"
            >Photo Shot Date</label
          >
          <flat-pickr
            placeholder="When was the photo taken?"
            :config="flatpickrConfig"
            class="Dialog-field"
            v-model="newImageDetails.photoTakenDate"
          >
          </flat-pickr>
        </div>

        <nav class="flex">
          <button type="button" class="btn mr-8" @click="savePhoto">
            Save
          </button>
          <button type="button" @click="closeDialog" class="btn-secondary">
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
import DateUtil from '../mixins/date';
export default {
  props: ['imageDetails'],
  mixins: [DateUtil],

  data() {
    return {
      newImageDetails: {},
      savingPhoto: false,
    };
  },
  mounted() {
    this.newImageDetails = { ...this.imageDetails };
    this.$refs.imageDialog.showModal();
  },
  computed: {
    hasImage() {
      return this.imageDetails.url;
    },
  },
  methods: {
    savePhoto() {
      this.$emit('save', this.newImageDetails);
    },
    closeDialog() {
      this.$refs.imageDialog.close();
      this.$emit('close');
    },
  },
};
</script>
<style>
.Dialog {
  height: 700px;
  width: 700px;
  position: absolute;
  top: 20%;
  margin: 0 auto;
  padding: 16px;
  color: black;
  border-image: 0;
  padding: 16px;
}

.Dialog-previewImage {
  max-width: 250px;
  max-height: 250px;
  margin: 0 auto;
}

.Dialog-form {
  display: flex;
  flex-direction: column;
  padding-left: 72px;
  padding-right: 16px;
  margin-top: 16px;
}
.Dialog-fieldContainer {
  width: 75%;
  margin-bottom: 16px;
}
.Dialog-fieldLabel {
  display: block;
  margin-bottom: 2px;
  margin-left: 4px;
}

.Dialog-field {
  border: solid 1px black;
  width: 500px;
  padding: 8px;
}
</style>
