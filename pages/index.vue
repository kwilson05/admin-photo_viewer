<template>
  <div>
    <div class="container">
      <div>
        <div>
          <label class="btn" for="newphoto">
            Add Photos
            <input
              v-show="false"
              id="newphoto"
              type="file"
              accept="image/*"
              @change="newImageFile"
            />
          </label>
        </div>
        <h2 v-show="saving" class="mb-4 mt-4">Saving Image File......</h2>
        <h2 v-show="noFiles" class="mt-4">No files here..Please add some</h2>
        <FileTable v-show="!noFiles" class="mt-4" :files="files" />
      </div>
    </div>
    <CrudDialog
      v-if="showDialog"
      ref="crudDialog"
      :imageDetails="imageDetails"
      @save="saveImage"
    />
  </div>
</template>

<script>
import FileTable from '~/components/FileTable.vue';
import CrudDialog from '~/components/CrudDialog.vue';
export default {
  components: { FileTable, CrudDialog },
  data() {
    return {
      imageDetails: {},
      imageFile: {},
      files: [],
      saving: false,
      showDialog: false,
    };
  },
  computed: {
    noFiles() {
      return this.files.length === 0;
    },
  },
  async created() {
    this.files.push(...(await this.$axios.get('/image')).data);
  },
  methods: {
    newImageFile(event) {
      const imageFiles = event.target.files;
      if (imageFiles && imageFiles.length > 0) {
        this.imageDetails.url = URL.createObjectURL(imageFiles[0]);
        this.imageFile = imageFiles[0];
      }
      event.target.value = '';
      event.target.files = null;
      this.showDialog = true;
    },
    async saveImage(newImageDetails) {
      this.saving = true;
      if (this.imageFile.name) {
        await this.createImageFile(newImageDetails);
      } else {
        await this.editImageFile(newImageDetails);
      }

      this.imageDetails = {};
      this.imageFile = {};
      this.saving = false;
      this.showDialog = false;
    },
    async createImageFile(newImageDetails) {
      // No longer need url property
      delete newImageDetails.url;

      const multiPartApi = this.$axios.create({
        headers: {
          'Content-Type': 'multipart/form-data; boundary=--XXX--;',
        },
      });
      const formData = new FormData();
      formData.append('imageFile', this.imageFile, this.imageFile.name);
      formData.append('imageDetails', JSON.stringify(newImageDetails));
      const newImageFile = (await multiPartApi.post('/image', formData)).data;
      this.file.push(newImageFile);
    },
    async editImageFile(newImageDetails) {
      await this.$axios.post(`/image/${newImageDetails.id}`, {
        imageDetails: newImageDetails,
      });
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
