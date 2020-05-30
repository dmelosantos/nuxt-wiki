<template>
    <v-simple-table>
        <template v-slot:default>
            <thead>
            <tr>
                <th class="text-left">Change Description</th>
                <th class="text-left">Edited At</th>
                <th class="text-left">Diff</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in pages" :key="item.id">
                <td>{{ item.reason || 'No Changelog Entry' }}</td>
                <td>{{ item.createdAt }}</td>
                <td><nuxt-link :to="`/page/diff/${item.id}`">Diff</nuxt-link></td>
            </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
  export default {
    name: 'PageHistory',

    async asyncData({params, $http}) {
      const pages = await $http.$get(`http://localhost:8081/pages/history/${params.id}`);
      console.log(pages)
      return {
        pages
      };
    },

    data: () => ({

    }),
  };
</script>

