import { INuxtActionTree, IRootState } from '../types';
import { IReport, IReportState } from './types';

export const actions: INuxtActionTree<IReportState, IRootState> = {
    async loadReports({ commit }) {
        const data = await this.$axios.$get('/api/reports');
        return commit('setReports', data.reports);
    },
    async loadSelectedReport({ commit }, reportId) {
        const report: IReport = await this.$axios.$get(`/api/reports/${reportId}?tests=true`);
        report.tests = report.tests
            .concat(report.tests)
            .concat(report.tests)
            .concat(report.tests)
            .concat(report.tests)
            .concat(report.tests)
            .concat(report.tests);

        return commit('setReport', report);
    },
};
