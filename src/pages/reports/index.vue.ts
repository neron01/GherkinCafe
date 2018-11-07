import { Component, Vue } from 'nuxt-property-decorator';
import { State } from 'vuex-class';
import { DateUtils } from '~/services/DateUtils.ts';
import { IReportState } from '~/store/report/types';

@Component
export default class extends Vue {
    @State('report')
    public reportState!: IReportState;

    public async fetch({ store }: any) {
        if (store.state.report.reports === undefined || store.state.report.reports.length === 0) {
            await store.dispatch('report/loadReports');
        }
    }
    public head() {
        return {
            title: 'Reports',
        };
    }
    public formatDate(date: string): string {
        return DateUtils.formatFull(date);
    }
}
