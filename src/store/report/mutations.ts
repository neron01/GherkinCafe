import { MutationTree } from 'vuex';
import { IReport, IReportState } from './types';

export const mutations: MutationTree<IReportState> = {
    setReports(state: IReportState, reports: IReport[]) {
        state.reports = reports;
    },
    setReport(state: IReportState, report: IReport) {
        state.selectedReport = report;
    },
};
