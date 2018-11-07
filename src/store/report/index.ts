import { Module } from 'vuex';
import { IRootState } from '../types';
// import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { IReportState } from './types';

export const state: IReportState = {
    reports: [],
};

const namespaced: boolean = true;

export const report: Module<IReportState, IRootState> = {
    // getters,
    actions,
    mutations,
    namespaced,
    state,
};
