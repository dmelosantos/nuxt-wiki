<template>
    <v-row>
        <v-col lg="12">
            <v-row>
                <v-col lg="10"></v-col>
                <v-col lg="1">Edit</v-col>
                <v-col lg="1">View History</v-col>
            </v-row>
        </v-col>
        <v-col lg="12">
            <v-layeout class="pl-3" v-html="page.name"></v-layeout>
        </v-col>
        <v-col lg="12">
            <v-layout class="pl-3" v-html="page.body"></v-layout>
        </v-col>
    </v-row>
</template>

<script>
export default {
  async asyncData({ params, $http }) {
    const mainPage = await $http.$get("http://localhost:8081/pages/1");
    return { page: mainPage };
  }
};
</script>
