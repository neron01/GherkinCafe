<template>
    <v-container grid-list-md text-xs-left>
        <v-layout row wrap>
            <h1 class="title">
               {{ test.name }}
            </h1>
            <v-flex xs12>
                <code>{{test}}</code>
            </v-flex>
            <nuxt-link class="button"
                       :to="{name: 'reports-id', params: { id: test.report }}"
            >
                Back to report
            </nuxt-link>
        </v-layout>
        <span class="subheading">Tests history</span>
        <template v-for="(t, index) in tests">
            <v-layout row wrap>
                <v-flex xs12 v-show="true">
                    <code>{{t}}</code>
                </v-flex>
            </v-layout>

            <v-divider
                    :key="index"
            ></v-divider>
        </template>
    </v-container>
</template>

<script>
    export default {
        name: 'id',
        async asyncData ({ params, error, $axios }) {
            const res = await $axios.$get('/api/tests/' + params.id);
            const res2 = await $axios.$get('/api/tests/?uuid=' + res.uuid);
            return { test: res, tests: res2 };
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
