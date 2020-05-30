<template>
    <v-app light id="app">
        <navbar/>
        <v-content class="fill-height pt-0" fluid>
            <nuxt/>
        </v-content>
        <v-footer>
            <router-link to="/page/add" tag="button">Add New Page</router-link>
            <v-spacer></v-spacer>
            <div>&copy; {{ new Date().getFullYear() }}</div>
        </v-footer>
    </v-app>
</template>
<script>
  import navbar from "~/components/navbar";

  export default {
    components: {
      navbar,
    }
  };
</script>
