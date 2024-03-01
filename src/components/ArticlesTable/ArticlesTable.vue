<template>
  <table>
    <thead>
      <tr>
        <th>
          <button @click="onSort('title')" class="px-3 py-1 flex items-center">
            Title
            <span
              :class="
                classNames('material-symbols-outlined', {
                  'rotate-180': sortColumn === 'title' && sortDesc,
                  'opacity-50': sortColumn !== 'title',
                })
              "
            >
              arrow_downward_alt
            </span>
          </button>
        </th>
        <th>
          <button @click="onSort('description')" class="px-3 py-1 flex items-center">
            Description
            <span
              :class="
                classNames('material-symbols-outlined', {
                  'rotate-180': sortColumn === 'description' && sortDesc,
                  'opacity-50': sortColumn !== 'description',
                })
              "
            >
              arrow_downward_alt
            </span>
          </button>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="{ title, description } in articles" :key="`${title}:${description}`">
        <td class="px-3 py-2">{{ title }}</td>
        <td class="px-3 py-2">{{ description }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
  import type { TableArticle } from "@/types/table-article.interface";
  import type { TableColumn } from "@/types/table-column.type";
  import type { TableSort } from "@/types/table-sort.interface";
  import classNames from "classnames";
  import { ref } from "vue";

  const { initialSortDesc } = withDefaults(
    defineProps<{
      articles: TableArticle[];
      initialSortColumn?: TableColumn;
      initialSortDesc?: boolean;
    }>(),
    {
      initialSortColumn: "title",
      initialSortDesc: false,
    },
  );

  const emit = defineEmits<{
    (event: "sortChange", sort: TableSort): void;
  }>();

  const sortColumn = ref<TableColumn | null>(null);
  const sortDesc = ref<boolean | null>(initialSortDesc ?? false);

  const onSort = (column: TableColumn): void => {
    // If the current sort column is the same as the clicked column
    if (sortColumn.value === column) {
      // If it is already sorted in descending order, remove the sort
      if (sortDesc.value) {
        sortColumn.value = null; // No column is currently sorted
        sortDesc.value = null; // No sort order
      } else {
        // If it was sorted in ascending order, now sort it in descending
        sortDesc.value = true;
      }
    } else {
      // If a different column is clicked, sort by that column in ascending order
      sortColumn.value = column;
      sortDesc.value = false; // Start with ascending order
    }

    emit("sortChange", {
      column: sortColumn.value,
      desc: sortDesc.value,
    });
  };
</script>
