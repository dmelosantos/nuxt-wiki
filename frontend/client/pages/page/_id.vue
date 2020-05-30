<template>
    <v-container>
        <v-col lg="12">
            <v-layeout class="pl-3" v-html="page.name"></v-layeout>
        </v-col>
        <v-col lg="12">
            <v-layout class="pl-3" v-html="page.body"></v-layout>
        </v-col>
    </v-container>
</template>

<script>
  import Markdown from '@nuxt/markdown';

  export default {
    name: 'view',

    async asyncData({ params, $http }) {
      const pageContent = await $http.$get(`http://localhost:8081/pages/${params.id}`);
      const md = new Markdown({ toc: false, sanitize: false });
      const contents = await md.toMarkup(pageContent.body);

      return { page: { ...pageContent, body: contents.html } };
    },
  };
</script>

