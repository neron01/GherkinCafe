import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class extends Vue {
    public pagination: any = {
        rowsPerPage: 10,
    };
    public test: {startTime: string} = {startTime: ''};

    public async asyncData ({ params, $axios }: any) {

        const test: any[] = await $axios.$get('/api/reports/' + params.id + '?tests=true');
        const headers = [
            {
                align: 'left',
                text: 'Test name',
                value: 'name',
            },
            { text: 'Status', value: 'status' },
        ];
        // data.tests = data.tests.concat(data.tests).concat(data.tests );
        return { test, headers };
    }
    public head () {
        return {
            title: `Report: ${this.test.startTime}`,
        };
    }

    public pages () {
        if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) {
            return 0;
        }
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    }
}
