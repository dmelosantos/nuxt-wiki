<template>
    <v-content>
        <v-row>
            <v-col lg="12">
                <h3>Results</h3>
            </v-col>
            <v-col lg="12">
                <ul>
                    <li v-for="page in pages" :key="page.id">
                        <nuxt-link :to="`/page/${page.id}`">{{page.name}}</nuxt-link>
                    </li>
                </ul>
            </v-col>
        </v-row>
    </v-content>
</template>

<script>
  export default {
    name: 'PageSearch',

    async asyncData({params, $http}) {
      const pages = await $http.$get(`http://localhost:8081/pages/search/${params.term}`);
      console.log(pages)
      return {
        pages
      };
    },

    data: () => ({

    }),
  };
</script>

