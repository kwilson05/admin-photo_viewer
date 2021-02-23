<template>
  <table>
    <thead>
      <tr>
        <th class="tableheader">
          <input
            @change="handleSelectAll"
            v-model="selectedAllRows"
            type="checkbox"
            id="selectAll"
            name="selectAll"
          />
        </th>
        <th class="tableheader" v-for="key in columns" v-bind:key="key">
          <div>
            {{ key }}
          </div>
        </th>
        <th class="tableheader"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="file in files" v-bind:key="file.filePath">
        <td class="tabledata">
          <input
            type="checkbox"
            data-file="image"
            :id="file.id"
            :name="file.id"
          />
        </td>
        <td class="tabledata">
          {{ file.title }}
        </td>

        <td class="tabledata">
          {{ file.filePath }}
        </td>
        <td class="tabledata">
          {{ file.description }}
        </td>
        <td class="tabledata">
          {{ formatDate(file.photoTakenDate) }}
        </td>
        <td class="tabledata">
          {{ formatDate(file.createdDate) }}
        </td>

        <td class="tabledata">
          <nuxt-link
            tag="img"
            :to="{ name: 'image-id', params: { id: file.id } }"
            class="kebab"
            src="/noun_Kebab Menu_659813.svg"
          >
          </nuxt-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import DateUtil from '../mixins/date';
export default {
  props: ['files'],
  mixins: [DateUtil],
  computed: {
    rowCount() {
      return this.files.length;
    },
    columnCount() {
      return this.columns.length;
    },
  },
  data() {
    return {
      columns: [
        'Title',
        'Path',
        'Description',
        'Shot Date',
        'File Create Date',
      ],
      selectedAllRows: false,
    };
  },
  methods: {
    handleSelectAll() {
      const checkboxes = document.querySelectorAll('[data-file]');

      for (const checkbox of checkboxes) {
        checkbox.checked = this.selectedAllRows;
      }
    },
  },
};
</script>
<style>
.kebab {
  width: 100px;
  height: 50px;
  cursor: pointer;
}

table {
  table-layout: fixed;

  text-overflow: ellipsis;
  margin: 10px 10px;
  user-select: none;
  border-radius: 4px;
}

th.tableheader {
  cursor: pointer;
  letter-spacing: 2px;
  border: 2px solid#EBECF3;
  padding: 10px;
  background-color: #f4f4f4;
  border: none;
  font-weight: bold;
  font-size: 90%;
  user-select: none;
}

td.tabledata {
  letter-spacing: 1px;
  border: 2px solid#EBECF3;
  padding: 5px;
  font-size: 90%;
  user-select: none;
  border: solid black;
  border-width: 0px 0px 1px 0px;
}
</style>
