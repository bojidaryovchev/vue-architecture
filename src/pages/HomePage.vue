<template>
  <main>
    <ArticlesTable v-if="tableArticles" :articles="tableArticles" @sort-change="onTableSortChange($event)" />
  </main>
</template>

<script lang="ts" setup>
  import { getTableArticles } from "@/API";
  import { ArticlesTable } from "@/components/ArticlesTable";
  import { useQueryParams } from "@/hooks/use-query-params.hook";
  import { QueryParamType } from "@/types/query-param-type.enum";
  import type { TableArticle } from "@/types/table-article.interface";
  import type { TableSort } from "@/types/table-sort.interface";
  import { onMounted, ref } from "vue";

  const { queryParams, setQueryParams } = useQueryParams();
  const tableArticles = ref<TableArticle[]>([]);

  onMounted(async () => {
    tableArticles.value = await getTableArticles();
  });

  const onTableSortChange = ({ column, desc }: TableSort) => {
    setQueryParams({
      queryParams: {
        ...queryParams.value,
        [QueryParamType.TABLE_SORT_COLUMN]: column,
        [QueryParamType.TABLE_SORT_DESC]: desc ? desc.toString() : null,
      },
    });
  };
</script>

<style scoped></style>
