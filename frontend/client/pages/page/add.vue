<template>
    <no-ssr>
        <div>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <h3>Create a new page</h3>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-alert v-if="message && message !== ''" color="green" type="success" v-html="message">
                            </v-alert>
                        </v-col>
                        <v-col cols="12" md="12" align="right">
                            <v-btn light color="blue" @click="save" :disabled="isLoading">Save</v-btn>
                            <v-btn light color="gray" :disabled="isLoading">Cancel</v-btn>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-text-field
                                    v-model="name"
                                    :rules="nameRules"
                                    :counter="255"
                                    label="Name"
                                    required
                                    :disabled="isLoading"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <MarkdownEditor class="ml-auto mr-auto" :initialValue="body"
                                            :disabled="isLoading"></MarkdownEditor>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </div>
    </no-ssr>
</template>

<script>
  export default {
    name: 'PageCreate',

    async asyncData({ params, $http }) {
      return {};
    },

    data: () => ({
      valid: true,
      id: '',
      name: '',
      body: '',
      reason: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      lazy: false,
      message: '',
      isLoading: false,
    }),

    methods: {
      validate () {
        return this.$refs.form.validate()
      },
      async save() {
        if(this.validate()) {
          try {
            this.isLoading = true;
            const response = await this.$axios.post('http://localhost:8081/pages/', {
                name: this.name,
                body: this.body,
                reason: this.reason,
            });

            this.isLoading = false;
            this.message = `Page created successfully! <a href="/pages/${response.data.id}">Access it here</a>`;
          } catch(error) {
            this.isLoading = false;
            this.message = error.message;
          }
        }
      }
    },
  };
</script>

