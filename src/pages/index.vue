<template>
    <v-container fluid grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs12 md8 class="border-right">
                <v-layout row wrap>
                    <v-flex sm8 xs12>
                        <no-ssr>
                            <vue-apexcharts type="line" :options="optionsLine" :series="seriesLine"></vue-apexcharts>
                        </no-ssr>
                    </v-flex>
                    <v-flex sm4 xs12>
                        <v-list>
                            <v-list-tile
                                @click=""
                                :key="i"
                                v-for="(item, i) in additionalInfoLine"
                                exact
                            >
                                <v-list-tile-action>
                                    <v-icon class="color-box"
                                            v-bind:class=item.color
                                    ></v-icon>
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
                <no-ssr>
                    <vue-apexcharts type="donut" :options="optionsDonut" :series="seriesDonut"></vue-apexcharts>
                </no-ssr>
            </v-flex>

        <!--<my-line v-if="showLine" :data="lineData" :options="options"></my-line>-->
        </v-layout>
    </v-container>
</template>

<script>
    import { DateUtils } from '~/services/DateUtils.ts';

    export default {
        data () {
            return {
                showLine: false,
            };
        },
        mounted () {
            this.showLine = true; // showLine will only be set to true on the client. This keeps the DOM-tree in sync.
        },
        computed: {
          data () {
            return this.tests;
          }
        },
        async asyncData ({ $axios }) {
            const response = await $axios.$get('/api/reports');
            // const lineData = {}; // some data
            // const options = {}; // some options

            // For donut
            const optionsDonut = {
                chart: {
                    animations: {
                        enabled: false
                    }
                },
                colors: ['#775DD0', '#00C8E1', '#FFB900'],
                dataLabels: {
                    enabled: false,
                },
                labels: ['Smoke', 'Regression', 'screenshot'],
                plotOptions: {
                    pie: {
                        donut: {
                            size: '72%',
                        }
                    }
                },
                title: {
                    align: 'center',
                    text: 'By test types'
                }
            };
            const seriesDonut = [40, 25, 5];
            //
            //
            // const series = [{
            //     name: 'series-1',
            //     data: [30, 40, 45, 50, 49, 60, 70, 91]
            // }];
            // const series = [
            //     {
            //         name: 'series-1',
            //         data: [30]
            //     },
            //     {
            //         name: 'series-2',
            //         data: [30]
            //     },
            //     {
            //         name: 'series-3',
            //         data: [30]
            //     }
            // ];
            // const series = [30, 40, 45];

            let totalSum = 0;
            let totalFail = 0;
            let totalSuccess = 0;
            let totalSkipped = 0;
            const passedValues = [];
            const failedValues = [];
            const categoriesXAxis = [];
            response.reports && response.reports.forEach((report) => {
                totalSum += report.total;
                totalFail += report.total - report.passed;
                totalSuccess += report.passed;
                totalSkipped += report.skipped;
                passedValues.push(report.passed);
                failedValues.push(report.total - report.passed);
                categoriesXAxis.push(DateUtils.formatDate(new Date(report.startTime)));
            });
            const additionalInfoLine = [
                {
                    color: 'passed',
                    subTitle: `${(totalSuccess / totalSum) * 100}% set to Passed`,
                    title: `${totalSuccess} Passed`
                },
                {
                    color: 'error',
                    subTitle: `${(totalFail / totalSum) * 100}% set to Failed`,
                    title: `${totalFail} Failed`,
                },
                {
                    color: 'skipped',
                    subTitle: `${(totalSkipped / totalSum) * 100}% set of new tests`,
                    title: `${totalSkipped} new tests`
                },
            ];

            const optionsLine = {
                chart: {
                    animations: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                globals: {
                    minY: 0
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                minY: 0,
                stroke: {
                    curve: 'straight'
                },
                title: {
                    align: 'left',
                    text: 'Passed trends for last 2 weeks'
                },
                xaxis: {
                    categories: categoriesXAxis,
                },
                yaxis: {
                    labels: {
                        step: 2
                    },
                    min: 0
                }
            };
            const seriesLine = [
                {
                    data: passedValues,
                    name: 'Passed'
                },
                {
                    data: failedValues,
                    name: 'Errors'
                }
            ];

            return {
                additionalInfoLine,
                optionsDonut,
                optionsLine,
                seriesDonut,
                seriesLine,
                tests2: response
            };
        }
    };
</script>

<style scoped lang="postcss">
    .color-box {
        width: 25px;
        height: 25px;
    }
    .skipped {
        background-color: #F1C40F;
    }
    .error {
        background-color: #E84C3D;
    }
    .passed {
        background-color: #2DCC70;
    }
    .border-right {
        border-right: 1px solid #ccc;
    }
</style>
