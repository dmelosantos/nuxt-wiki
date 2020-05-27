<template>
    <v-content>
        <v-app-bar
                app
                clipped-right
                color="blue-grey"
                dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
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
                ></v-text-field>
            </v-row>
        </v-app-bar>
        <v-navigation-drawer
                v-model="drawer"
                app
        >
            <v-list dense>
                <v-list-item @click.stop="left = !left">
                    <v-list-item-action>
                        <v-icon>mdi-exit-to-app</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title><nuxt-link to="/">Home</nuxt-link></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item @click.stop="left = !left">
                    <v-list-item-action>
                        <v-icon>mdi-exit-to-app</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title><nuxt-link to="/pages">Dogs</nuxt-link></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item @click.stop="left = !left">
                    <v-list-item-action>
                        <v-icon>mdi-exit-to-app</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title><nuxt-link to="/pages/shepherd">Only Shepherds</nuxt-link></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
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
    }),
  };
</script>
