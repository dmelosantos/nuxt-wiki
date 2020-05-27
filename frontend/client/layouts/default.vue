<template>
    <v-app light>
        <navbar/>
        <v-content>
            <v-container
                    class="fill-height"
                    fluid
            >
                <nuxt/>
            </v-container>
        </v-content>
        <v-footer>
            <v-spacer></v-spacer>
            <div>&copy; {{ new Date().getFullYear() }}</div>
        </v-footer>
    </v-app>
</template>
<script>
  import navbar from "~/components/navbar";

  export default {
    components: {navbar}
  };
</script>
