<template>
  <table>
    <thead>
      <tr>
        <th class="tableheader" v-for="key in columns" v-bind:key="key">
          <div>
            {{ key }}
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="file in files" v-bind:key="file.filePath">
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
    };
  },
  methods() {},
};
</script>
<style>
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
  font-weight: bold;
  font-size: 90%;
  user-select: none;
}

td.tabledata {
  cursor: pointer;
  letter-spacing: 1px;
  border: 2px solid#EBECF3;
  padding: 5px;
  font-size: 90%;
  user-select: none;
}

tbody tr:nth-child(even) {
  background-color: #f4f4f4;
}
tbody tr:nth-child(odd) {
  background-color: #ffffff;
}
</style>
