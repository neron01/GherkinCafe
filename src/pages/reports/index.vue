<template>
    <v-list three-line>
        <v-subheader>
            Last reports
        </v-subheader>
        <template v-for="(test, index) in reports">
            <v-list-tile
                    class="list-tile"
                    :key="test.startTime"
                    @click=""
                    :to="{name: 'reports-id', params: { id: test._id }}"
                    v-bind:class="{ 'error-mark': test.hasError, 'skipped-mark': test.skipped !== 0, 'passed-mark': !test.hasError && test.skipped === 0, }"
            >
                <v-list-tile-avatar>
                    {{(test.passed / test.total) * 100}}%
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{formatDate(test.startTime)}}</v-list-tile-title>
                    <v-list-tile-sub-title>
                        Total: {{test.total}}, Passed: {{test.passed}}, Failed: {{test.total-test.passed}}, Skipped: {{test.skipped}}
                    </v-list-tile-sub-title>
                </v-list-tile-content>

            </v-list-tile>

            <v-divider
                    :key="index"
            ></v-divider>
        </template>
    </v-list>
</template>
<script lang="ts" src="./index.vue.ts"></script>

<style scoped>
    .list-tile {
        color: black;
    }
    .skipped-mark {
        border-left: 5px solid #F1C40F;
    }
    .error-mark {
        border-left: 5px solid #E84C3D;
    }
    .passed-mark {
        border-left: 5px solid #2DCC70;
    }
</style>
