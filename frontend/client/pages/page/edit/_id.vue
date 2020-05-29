<template>
    <no-ssr>
        <div>
            <h1>Edit</h1>

        </div>
    </no-ssr>
</template>

<script>
  if(process.client) {
    import 'codemirror/lib/codemirror.css';
    import '@toast-ui/editor/dist/toastui-editor.css';
    import { Editor } from '@toast-ui/vue-editor';
  }

  export default {
    name: 'edit',

    async asyncData({ params, $http }) {
      const pageContent = await $http.$get(`http://localhost:8081/pages/${params.id}`);

      return { ...pageContent };
    },
    head() {
      return {
        title: "Edit Page",
        meta: [
          {
            hid: "description",
            name: "description",
            content: `Edit Page`
          }
        ]
      };
    }
  };
</script>

