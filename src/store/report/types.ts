export interface IReport {
    startTime: string;
    tests: any[];
}
export interface IReportState {
    reports?: IReport[];
    selectedReport?: IReport;
}
