<template>
    <v-content>
        <v-app-bar
                app
                color="blue-grey"
                dark
        >
            <v-toolbar-title>Wiki</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-row
                    align="center"
                    style="max-width: 650px"
            >
                <v-text-field
                        :append-icon-cb="() => {}"
                        placeholder="Search..."
                        single-line
                        append-icon="mdi-magnify"
                        color="white"
                        hide-details
                        v-model="searchTerm"
                        @keydown.enter="search"
                ></v-text-field>
            </v-row>
        </v-app-bar>
    </v-content>
</template>

<script>
  export default {
    name: 'NavBar',
    data: () => ({
      drawer: null,
      drawerRight: null,
      right: false,
      left: false,
      searchTerm: '',
    }),
    methods: {
      async search() {
        if (this.searchTerm && this.searchTerm.trim() !== '') {
          this.$router.push({path: `/search/${this.searchTerm}`})
        }
      }
    },
  };
</script>
