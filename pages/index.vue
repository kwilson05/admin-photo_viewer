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
              @change="addPhoto"
            />
          </label>
        </div>

        <h2 v-show="noFiles" class="mt-4">No files here..Please add some</h2>
        <FileTable v-show="!noFiles" class="mt-4" :files="files" />
      </div>
    </div>
    <AddImageDialog
      @addedImage="addImage"
      :image="newImage"
      :imageUrl="newImageUrl"
    />
  </div>
</template>

<script>
import FileTable from '~/components/FileTable.vue';
import AddImageDialog from '~/components/AddImageDialog.vue';
export default {
  components: { FileTable, AddImageDialog },
  data() {
    return {
      newImage: {},
      newImageUrl: '',
      files: [],
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
    addPhoto(event) {
      const imageFiles = event.target.files;
      if (imageFiles && imageFiles.length > 0) {
        this.newImageUrl = URL.createObjectURL(imageFiles[0]);
        this.newImage = imageFiles[0];
      }
      event.target.value = '';
      event.target.files = null;
    },
    addImage(file) {
      this.files.push(file);
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
