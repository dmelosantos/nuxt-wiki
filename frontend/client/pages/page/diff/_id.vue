<template>
    <no-ssr>
        <div>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <h3>Edit</h3>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-alert v-if="message && message !== ''" :color="messageType" type="success">
                                {{ message }}
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
                            <v-text-field
                                    v-model="reason"
                                    :rules="reasonRules"
                                    :counter="255"
                                    label="Describe the Change"
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
    name: 'PageEdit',

    async asyncData({ params, $http }) {
      const pageContent = await $http.$get(`http://localhost:8081/pages/${params.id}`);
      pageContent.reason = '';
      return { ...pageContent };
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
      reasonRules: [
        v => !!v || 'Describing the change is required',
      ],
      lazy: false,
      message: '',
      messageType: '',
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
            await this.$axios.put(`http://localhost:8081/pages/${this.id}`, {
                name: this.name,
                body: this.body,
                reason: this.reason,
            });
            this.isLoading = false;
            this.message = 'Change made to page successfully saved!';
            this.messageType = 'green';
          } catch(error) {
            this.isLoading = false;
            this.message = error.message;
            this.messageType = 'red';
          }
        }
      }
    },
  };
</script>

