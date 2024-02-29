import { ref, watch } from "vue";
import { useRoute, useRouter, type LocationQuery } from "vue-router";

export const useQueryParams = () => {
  const route = useRoute();
  const router = useRouter();

  const queryParams = ref({ ...route.query });

  watch(route, (newRoute) => {
    queryParams.value = { ...newRoute.query };
  });

  const setQueryParams = async ({ queryParams, replace }: { queryParams: LocationQuery; replace?: boolean }): Promise<void> => {
    const { path } = route;
    const query = Object.fromEntries(Object.entries(queryParams).filter(([, value]) => value));

    if (replace) {
      await router.replace({
        path,
        query,
      });
      return;
    }

    await router.push({
      path,
      query,
    });
  };

  return {
    queryParams,
    setQueryParams,
  };
};
