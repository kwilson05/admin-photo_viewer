<template>
  <table>
    <thead ref="asdkfj">
      <tr ref="kasozi">
        <th class="tableheader">
          <input
            @click="selectAllRows"
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
      <tr class="tablerow" v-for="file in files" v-bind:key="file.filePath">
        <td @click="selectRow(file.id)" class="tabledata">
          <input
            :ref="'file-' + file.id"
            type="checkbox"
            data-file="image"
            :id="file.id"
            :name="file.id"
          />
        </td>
        <td @click="selectRow(file.id)" class="tabledata">
          {{ file.title }}
        </td>

        <td @click="selectRow(file.id)" class="tabledata">
          {{ file.filePath }}
        </td>
        <td @click="selectRow(file.id)" class="tabledata">
          {{ file.description }}
        </td>
        <td @click="selectRow(file.id)" class="tabledata">
          {{ formatDate(file.photoTakenDate) }}
        </td>
        <td @click="selectRow(file.id)" class="tabledata">
          {{ formatDate(file.createdDate) }}
        </td>

        <td @click="view(file)" class="tabledata">
          <img class="kebab" src="/noun_Kebab Menu_659813.svg" />
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
    selectAllRows() {
      this.selectedAllRows = !this.selectedAllRows;
      const action = this.selectedAllRows ? 'selected' : 'deselected';
      this.$emit(action, 'all');
      for (const refElement in this.$refs) {
        if (
          Array.isArray(this.$refs[refElement]) &&
          'checked' in this.$refs[refElement][0]
        ) {
          this.$refs[refElement][0].checked = this.selectedAllRows;
        }
      }
    },
    selectRow(fileId) {
      const rowKey = `file-${fileId}`;
      const selected = this.$refs[rowKey][0].checked;

      const action = !selected ? 'selected' : 'deselected';
      this.$emit(action, fileId);
      this.$refs[rowKey][0].checked = !selected;
    },
    view(file) {
      this.$emit('view', file);
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
tr.tablerow:hover {
  background-color: #f4f4f4;
}

th.tableheader {
  cursor: pointer;
  letter-spacing: 2px;
  border: solid black;
  border-width: 0px 0px 1px 0px;
  padding: 10px;
  background-color: #f4f4f4;
  font-weight: bold;
  font-size: 90%;
  user-select: none;
}

td.tabledata {
  cursor: pointer;
  letter-spacing: 1px;

  padding: 5px;
  font-size: 90%;
  user-select: none;
  border: solid black;
  border-width: 0px 0px 1px 0px;
}
</style>
