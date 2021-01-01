<template>
  <div class="container">
    <div>
      <div>
        <label class="btn" for="newphoto">
          Add Photos
          <input
            v-on:change="addPhoto"
            v-show="false"
            type="file"
            id="newphoto"
            accept="image/*"
          />
        </label>
      </div>

      <AddImageDialog
        add-image-dialog
        v-show="addingNewImage"
        :image="newImage"
      />

      <FileTable />
    </div>
  </div>
</template>

<script>
import FileTable from '~/components/FileTable.vue';
import AddImageDialog from '~/components/AddImageDialog.vue';
export default {
  components: { FileTable, AddImageDialog },
  computed: {
    addingNewImage() {
      return this.newImage.src.trim() !== '';
    },
  },
  data() {
    return {
      newImage: {
        src: '',
      },
    };
  },
  methods: {
    addPhoto(event) {
      const imageFiles = event.target.files;
      if (imageFiles && imageFiles.length > 0) {
        this.newImage.src = URL.createObjectURL(imageFiles[0]);
      }
    },
  },
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
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

.btn {
  border: 1px solid;
  padding: 0px 10px;
  background-color: turquoise;
  border-radius: 8px;
  width: 100px;
  display: block;
  color: whitesmoke;
  cursor: pointer;
}

.btn:hover {
  background-color: green;
}
</style>
