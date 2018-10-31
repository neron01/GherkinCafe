import { Component, Vue } from 'nuxt-property-decorator';
import { DateUtils } from '~/services/DateUtils.ts';

@Component
export default class extends Vue {
    public async asyncData ({ $axios }: any) {
        const data = await $axios.$get('/api/reports');
        return { reports: data.reports };
    }
    public head () {
        return {
            title: 'Reports',
        };
    }
    public formatDate (date: string): string {
        return DateUtils.formatFull(date);
    }
}
