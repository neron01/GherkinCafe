import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Component, Vue } from 'nuxt-property-decorator';
import { Dictionary } from 'vuex';

@Component
export default class TestIdPage extends Vue {
    public test: { startTime: string } = { startTime: '' };

    public errorsVisible: boolean = false;

    public head () {
        return {
            title: `Report: ${this.test.startTime}`
        };
    }

    public handlerErrorVisible () {
        this.errorsVisible = !this.errorsVisible;
    }

    public async asyncData ({ params, $axios }: { params: Dictionary<string>, $axios: NuxtAxiosInstance }) {
        const res = await $axios.$get('/api/tests/' + params.id);
        const res2 = await $axios.$get('/api/tests/?uuid=' + res.uuid);
        return { test: res, tests: res2 };
    }
}
