import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Component, Vue } from 'nuxt-property-decorator';
import { DateUtils } from '~/services/DateUtils.ts';

@Component
export default class extends Vue {
    public async asyncData({ $axios }: { $axios: NuxtAxiosInstance }) {
        const response = await $axios.$get('/api/reports');
        // const lineData = {}; // some data
        // const options = {}; // some options

        // For donut
        const optionsDonut = {
            chart: {
                animations: {
                    enabled: false,
                },
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
                    },
                },
            },
            title: {
                align: 'center',
                text: 'By test types',
            },
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
        const passedValues: any[] = [];
        const failedValues: any[] = [];
        const categoriesXAxis: any[] = [];
        response.reports &&
            response.reports.forEach((report: any) => {
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
                subTitle: `${DateUtils.formatDigit((totalSuccess / totalSum) * 100)}% set to Passed`,
                title: `${totalSuccess} Passed`,
            },
            {
                color: 'error',
                subTitle: `${DateUtils.formatDigit((totalFail / totalSum) * 100)}% set to Failed`,
                title: `${totalFail} Failed`,
            },
            {
                color: 'skipped',
                subTitle: `${DateUtils.formatDigit((totalSkipped / totalSum) * 100)}% set of new tests`,
                title: `${totalSkipped} new tests`,
            },
        ];

        const optionsLine = {
            chart: {
                animations: {
                    enabled: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            globals: {
                minY: 0,
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5,
                },
            },
            minY: 0,
            stroke: {
                curve: 'straight',
            },
            title: {
                align: 'left',
                text: 'Passed trends for last 2 weeks',
            },
            xaxis: {
                categories: categoriesXAxis,
            },
            yaxis: {
                labels: {
                    step: 2,
                },
                min: 0,
            },
        };
        const seriesLine = [
            {
                data: passedValues,
                name: 'Passed',
            },
            {
                data: failedValues,
                name: 'Errors',
            },
        ];

        return {
            additionalInfoLine,
            optionsDonut,
            optionsLine,
            seriesDonut,
            seriesLine,
            tests2: response,
        };
    }
}
