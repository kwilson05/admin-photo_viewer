<template>
  <div>
    <aside v-show="saving" class="toast mb-4 mt-4">
      <p class="text-center">Saving image......</p>
    </aside>

    <ConfirmToast
      v-if="hasDeletedFiles"
      @close="deletedFiles = {}"
      :message="deletedFilesMessage"
    >
    </ConfirmToast>
    <MessageToast v-if="deleting" :message="'Deleting selected images......'">
    </MessageToast>

    <div class="container">
      <div>
        <div class="flex justify-around">
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
          <div>
            <button
              @click="showDeleteDialog = true"
              :disabled="!hasFilesSelected"
              class="btn"
            >
              Delete
            </button>
          </div>
        </div>

        <h2 v-show="noFiles" class="mt-4">No files here..Please add some</h2>
        <FileTable
          @selected="selectFile"
          @deselected="deselectFile"
          @view="viewImage"
          v-show="!noFiles"
          class="mt-4"
          :files="files"
        />
      </div>
    </div>
    <CrudDialog
      v-if="showSaveDialog"
      ref="crudDialog"
      :imageDetails="imageInView"
      @save="saveImage"
      @close="showSaveDialog = false"
    />

    <ConfirmDialog
      v-if="showDeleteDialog"
      @yes="deleteSelectedFiles"
      @no="showDeleteDialog = false"
    />
  </div>
</template>

<script>
import FileTable from '~/components/FileTable.vue';
import CrudDialog from '~/components/CrudDialog.vue';
import ConfirmDialog from '~/components/ConfirmDialog.vue';
import { deleteImages } from '~/service/ImageService';
import ConfirmToast from '~/components/ConfirmToast';
import MessageToast from '~/components/MessageToast';

export default {
  components: {
    FileTable,
    CrudDialog,
    ConfirmDialog,
    ConfirmToast,
    MessageToast,
  },
  data() {
    return {
      imageInView: {},
      files: [],
      selectedFiles: [],
      saving: false,
      showSaveDialog: false,
      showDeleteDialog: false,
      deleting: false,
      deletedFiles: {},
    };
  },
  computed: {
    noFiles() {
      return this.files.length === 0;
    },
    hasFilesSelected() {
      return this.selectedFiles.length > 0;
    },
    hasDeletedFiles() {
      return !!this.deletedFiles.sucess && !!this.deletedFiles.failed;
    },
    deletedFilesMessage() {
      if (this.hasFilesSelected) {
        return `Deleted ${this.deletedFiles.sucess.length} files and Failed to delete ${this.deletedFiles.failed.length}`;
      } else {
        return null;
      }
    },
  },
  async created() {
    this.files.push(...(await this.$axios.get('/image')).data);
  },
  methods: {
    async deleteSelectedFiles() {
      this.showDeleteDialog = false;
      this.deleting = true;
      const selectedFilesIds = this.selectedFiles.map((selectedFile) => {
        return selectedFile.id;
      });
      this.deletedFiles = (await deleteImages(selectedFilesIds)).data;
      this.files = this.files.filter((file) => {
        return this.deletedFiles.sucess.includes(file.id);
      });
      this.deleting = false;
    },
    newImageFile(event) {
      const imageFiles = event.target.files;
      if (imageFiles && imageFiles.length > 0) {
        this.imageInView.url = URL.createObjectURL(imageFiles[0]);
        this.imageInView.file = imageFiles[0];
      }
      event.target.value = '';
      event.target.files = null;
      this.showSaveDialog = true;
    },
    async saveImage(newImageDetails) {
      this.showSaveDialog = false;
      this.saving = true;

      if (this.imageInView.file) {
        await this.createImageFile(newImageDetails);
      } else {
        await this.editImageFile(newImageDetails);
      }

      this.imageInView = {};
      this.saving = false;
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
      formData.append(
        'imageFile',
        this.imageInView.file,
        this.imageInView.file.name
      );

      formData.append('imageDetails', JSON.stringify(newImageDetails));
      const newImage = (await multiPartApi.post('/image', formData)).data;
      this.files.push(newImage);
    },
    editImageFile(newImageDetails) {
      this.$axios.post(`/image/${newImageDetails.id}`, {
        imageDetails: newImageDetails,
      });

      for (const file of this.files) {
        if (file.id === newImageDetails.id) {
          Object.assign(file, newImageDetails);
          return;
        }
      }
    },
    viewImage(image) {
      this.imageInView = image;
      this.showSaveDialog = true;
    },
    selectFile(file) {
      if (file === 'all') {
        this.selectedFiles = [];
        this.selectedFiles.push(...this.files);
      } else {
        this.selectedFiles.push(file);
      }
    },
    deselectFile(deselectedFile) {
      if (deselectedFile === 'all') {
        this.selectedFiles = [];
      } else {
        this.selectedFiles = this.selectedFiles.filter((file) => {
          if (deselectedFile.id !== file.id) {
            return file;
          }
        });
      }
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

.toast {
  position: absolute;
  bottom: 0px;
  right: 1px;
  background: black;
  color: white;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 4px;
  width: 500px;
}
</style>
