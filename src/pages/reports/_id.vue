<script lang="ts" src="./_id.vue.ts"></script>

<template>
  <v-container grid-list-md text-xs-left>
    <v-layout row wrap>
      <h1 class="title">
        Report {{ test.startTime }}
      </h1>
      <v-flex xs12>
        <span class="pr-2">{{test.passed}}/{{test.total}} Passed</span>
        <span class="px-2">{{test.total-test.passed}}/{{test.total}} Failure</span>
        <span class="pl-2">{{test.skipped}}/{{test.total}} Skipped</span>
      </v-flex>
      <v-flex>
        <span class="subheading">Tests</span>
        <v-data-table
                :headers="headers"
                :items="test.tests"
                :pagination.sync="pagination"
                hide-actions
                class="elevation-1"
        >
          <template slot="headerCell" slot-scope="props">
            <v-tooltip bottom>
              <span slot="activator">
                {{ props.header.text }}
              </span>
              <span>
                {{ props.header.text }}
              </span>
            </v-tooltip>
          </template>
          <template slot="items" slot-scope="props">
            <router-link tag="tr"
                         :to="{name: 'tests-id', params: { id: props.item._id }}">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.errs.length === 0 ? 'Passed' : 'Error' }}</td>
            </router-link>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2" v-if="pages > 1">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
      </v-flex>
      <v-flex xs12 v-show="false">
        <code>{{test}}</code>
      </v-flex>
      <v-flex xs12>
        <nuxt-link class="button" :to="{name: 'reports'}">
          Reports
        </nuxt-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

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
