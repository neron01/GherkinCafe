import { Component, Vue } from 'nuxt-property-decorator';
import BackButton from '~/components/BackButton.vue';
import { DateUtils } from '~/services/DateUtils';
import { IReport } from '~/store/report/types';
import { IContext } from '~/types';

@Component({
    components: {
        BackButton,
    }
})
export default class TestIdPage extends Vue {
    public test: { startTime: string } = { startTime: '' };
    public tests: any[] = [];
    public errorsVisible: boolean = false;

    public panel: number | number[] = -1;
    public head () {
        return {
            title: `Report: ${this.test.startTime}`
        };
    }
    public formatDate(date: string): string {
        return DateUtils.formatFull(date);
    }
    public handlerErrorVisible () {
        this.errorsVisible = !this.errorsVisible;
    }
    public execTime(time: number): string {
        return DateUtils.beautyTime(time);
    }
    public async asyncData ({ params, $axios }: IContext) {
        const res = await $axios.$get('/api/tests/' + params.id);
        const res2 = await $axios.$get('/api/tests/?uuid=' + res.uuid);
        return { test: res, tests: res2 };
    }
    public mounted () {
        this.panel = this.tests.findIndex((t: IReport) => {
            return this.$route.hash === ('#a' + t._id);
        });
        this.$vuetify.goTo(this.$route.hash, {
            offset: -80,
        });
    }
}
