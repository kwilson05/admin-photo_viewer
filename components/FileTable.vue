<template>
  <table>
    <thead>
      <tr>
        <th v-for="key in tableColumns" v-bind:key="key">
          <div>
            {{ key }}
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="file in files" v-bind:key="file.filePath">
        <td>
          {{ file.title }}
        </td>
        <td>
          {{ file.filePath }}
        </td>
        <td>
          {{ file.description }}
        </td>
        <td>
          {{ file.createdDate }}
        </td>
        <td>
          {{ file.photoTakenDate }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['data'],
  computed: {
    rowCount() {
      return this.files.length;
    },
    tableColumns() {
      if (this.files.length > 0) {
        return Object.keys(this.files[0]).filter(function (key) {
          return key !== 'id';
        });
      }
      return [];
    },
    columnCount() {
      return this.files.length > 0 ? Object.keys(this.files[0]).length : 0;
    },
  },
  data() {
    return {
      files: [
        {
          id: 1,
          title: 'Hello world',
          filePath: 'ige.jpg',
          description: 'Sample image',
          photoTakenDate: 'Monday, Jan 1, 2012',
          createdDate: 'Tuesday, December 2nd, 2020',
        },
        {
          id: 2,
          title: 'Hello world',
          filePath: 'e.jpg',
          description: 'Sample image',
          photoTakenDate: 'Monday, Jan 1, 2012',
          createdDate: 'Tuesday, December 2nd, 2020',
        },
        {
          id: 3,
          title: 'Hello world',
          filePath: 'i.jpg',
          description: 'Sample image',
          photoTakenDate: 'Monday, Jan 1, 2012',
          createdDate: 'Tuesday, December 2nd, 2020',
        },
        {
          id: 4,
          title: 'Hello world',
          filePath: 'ie.jpg',
          description: 'Sample image',
          photoTakenDate: 'Monday, Jan 1, 2012',
          createdDate: 'Tuesday, December 2nd, 2020',
        },
      ],
    };
  },
  mounted() {},
};
</script>
