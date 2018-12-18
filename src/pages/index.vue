<template>
    <v-container fluid grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs12 md8>
                <v-layout row wrap class="chart-back">
                    <v-flex sm8 xs12>
                        <no-ssr>
                            <vue-apexcharts type="line" :options="optionsLine" :series="seriesLine"></vue-apexcharts>
                        </no-ssr>
                    </v-flex>
                    <v-flex sm4 xs12>
                        <v-list>
                            <v-list-tile @click="" :key="i" v-for="(item, i) in additionalInfoLine" exact>
                                <v-list-tile-action>
                                    <v-icon class="color-box" v-bind:class="item.color"></v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                                    <v-list-tile-sub-title v-text="item.subTitle"></v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12 md4>
                <v-layout class="chart-back">
                    <no-ssr>
                        <vue-apexcharts type="donut" :options="optionsDonut" :series="seriesDonut" style="width: 100%;"></vue-apexcharts>
                    </no-ssr>
                </v-layout>
            </v-flex>

            <!-- <my-line v-if="showLine" :data="lineData" :options="options"></my-line> -->
        </v-layout>
    </v-container>
</template>

<script lang="ts" src="./index.vue.ts"></script>

<style scoped>
.color-box {
    width: 25px;
    height: 25px;
}
.chart-back {
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    background-color: white;
    margin: 0 10px !important;
}
.skipped {
    background-color: #f1c40f;
}
.error {
    background-color: #e84c3d;
}
.passed {
    background-color: #2dcc70;
}
.border-right {
    border-right: 1px solid #ccc;
}
</style>
