const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestSchema = new Schema({
    name: String,
    uuid: String,
    description: {
        name: String,
        steps: [{
            keyword: String,
            text: String
        }]
    },
    errs: [String],
    durationMs: Number,
    screenshotPath: String,
    skipped: Boolean,
    tags: [String],
    report: { type: Schema.Types.ObjectId, ref: 'reports' },
    startTime: Date,
    status: String,
    fixtureName: String,
    fixturePath: String,
});

module.exports = mongoose.model('tests', TestSchema);
