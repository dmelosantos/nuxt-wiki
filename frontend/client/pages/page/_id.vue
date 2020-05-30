<template>
    <v-content>
        <v-row>
            <v-col lg="12">
                <v-row>
                    <v-col lg="10"></v-col>
                    <v-col lg="1" v-html="editLink"></v-col>
                    <v-col lg="1" v-html="historyLink"></v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-layout class="pl-3" v-html="page.name"></v-layout>
        <div v-html="page.body"></div>
    </v-content>
</template>

<script>
  import Markdown from '@nuxt/markdown';

  export default {
    name: 'PageView',

    async asyncData({ params, $http }) {
      const pageContent = await $http.$get(`http://localhost:8081/pages/${params.id}`);
      const md = new Markdown({ toc: false, sanitize: false });
      const contents = await md.toMarkup(pageContent.body);

      const editLink = `<a href="/page/edit/${pageContent.id}">Edit</a>`;
      const historyLink = `<a href="/page/history/${pageContent.id}">View History</a>`;
      return {
        page: { ...pageContent, body: contents.html },
        editLink,
        historyLink
      };
    },

    data: () => ({
      editLink: '',
      historyLink: '',
    }),
  };
</script>

