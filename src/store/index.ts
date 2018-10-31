import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { auth } from './auth/index';
import { IRootState } from './types';

Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
    modules: {
        auth
    },
    state: {
        version: '1.0.0' // a simple property
    }
};

export default () => new Vuex.Store<IRootState>(store);
