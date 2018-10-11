<template>
  <v-container grid-list-md text-xs-left>
    <v-layout row wrap>
      <h1 class="title">
        Test {{ test.startTime }}
      </h1>
      <v-flex xs12>
        <code>{{test}}</code>
      </v-flex>
      <nuxt-link class="button" :to="{name: 'reports'}">
        Reports
      </nuxt-link>
    </v-layout>
  </v-container>
</template>

<script>
import axios from '~/plugins/axios';

export default {
  name: 'id',
  asyncData ({ params, error }) {
    return axios.get('/api/reports/' + params.id)
      .then((res) => {
        return { test: res.data };
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'User not found' });
      });
  },
  head () {
    return {
      title: `Report: ${this.test.startTime}`
    };
  }
};
</script>

<style scoped>
.title {
  margin-top: 30px;
}

code {
  width: 100%;
}
.button {
  margin-top: 30px;
}
</style>
