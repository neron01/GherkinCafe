const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    startTime: {
        type: Date,
        unique: true
    },
    endTime: Date,
    userAgents: [String],
    passed: Number,
    total: Number,
    skipped: Number,
    warnings: [String],
    hasError: Boolean,
    tests: [],
});

module.exports = mongoose.model('reports', ReportSchema);
