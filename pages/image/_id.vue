<template>
  <div class="Edit_Image-Container">
    <section class="Edit_Image-panel">
      <form>
        <div class="Edit_Image-form">
          <div class="Edit_Image-fieldContainer">
            <label for="title" class="Edit_Image-fieldLabel"> Title</label>
            <input
              v-model="imageDetails.title"
              placeholder="What's the picture's title?"
              id="title"
              type="text"
              class="Edit_Image-field"
            />
          </div>
          <div class="Edit_Image-fieldContainer">
            <label for="description" class="Edit_Image-fieldLabel"
              >Descrption</label
            >
            <input
              v-model="imageDetails.description"
              placeholder="Describe the picture's setting"
              id="description"
              type="text"
              class="Edit_Image-field"
            />
          </div>
          <div class="Edit_Image-fieldContainer">
            <label for="photoTakenDate" class="Edit_Image-fieldLabel"
              >Photo Shot Date</label
            >
            <flat-pickr
              placeholder="When was the photo taken?"
              :config="flatpickrConfig"
              class="Edit_Image-field"
              v-model="imageDetails.photoTakenDate"
              name="date"
            >
            </flat-pickr>
          </div>

          <nav class="flex justify-center">
            <button
              v-show="notSaving"
              @click="saveChanges"
              ref="saveButton"
              type="button"
              class="btn mr-8"
            >
              Save
            </button>
            <nuxt-link
              v-show="notSaving"
              tag="button"
              :to="{ name: 'index' }"
              ref="cancelButton"
              type="button"
              class="btn-secondary"
            >
              Cancel
            </nuxt-link>
            <h2 v-show="!notSaving">Saving....</h2>
          </nav>
        </div>
      </form>
    </section>
  </div>
</template>
<script>
import DateUtil from '@/mixins/date';
export default {
  asyncData({ params }) {
    const id = params.id;
    return { id };
  },
  mixins: [DateUtil],
  data() {
    return {
      imageDetails: {},
      notSaving: true,
    };
  },
  async mounted() {
    this.imageDetails = (await this.$axios.get(`/image/${this.id}`)).data;
  },
  methods: {
    async saveChanges() {
      this.notSaving = false;
      await this.$axios.post(`/image/${this.id}`, {
        imageDetails: this.imageDetails,
      });
      this.$router.push('/');
    },
  },
};
</script>
<style>
.Edit_Image-Container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Edit_Image-panel {
  border: 1px black solid;
  box-shadow: 1px 1px #1025444d, -1px -1px #1025444d;
  padding: 16px;
}

.Edit_Image-previewImage {
  max-width: 250px;
  max-height: 250px;
  margin: 0 auto;
}

.Edit_Image-form {
  display: flex;
  flex-direction: column;
}
.Edit_Image-fieldContainer {
  width: 75%;
  margin-bottom: 16px;
}
.Edit_Image-fieldLabel {
  display: block;
  margin-bottom: 2px;
  margin-left: 4px;
}

.Edit_Image-field {
  border: solid 1px black;
  width: 500px;
  padding: 8px;
}
</style>
