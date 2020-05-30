<template>
    <v-row>
        <v-col lg="12">
            <code-diff :old-string="oldValue" :new-string="newValue" :context="10" output-format="side-by-side"/>
        </v-col>
    </v-row>
</template>

<script>
  export default {
    name: 'PageDiff',

    async asyncData({ params, $http }) {
      const differences = await $http.$get(`http://localhost:8081/pages/compare/${params.previousId}/${params.id}`);
      const formattedResponse = { oldValue: differences.originalPage.body, newValue: differences.historyPage.body };
      console.log(formattedResponse)
      return formattedResponse;
    },

    data: () => ({

    }),
  };
</script>

