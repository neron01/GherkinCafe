const mongoose = require('mongoose');
const Report = require('../models/report-model');
const Test = require('../models/test-model');
const md5 = require('md5');

const { Router } = require('express');

const router = Router();

router.get('/reports', function (req, res) {
    Report.find({}, '', function (err, reports) {
        if (err) {
            res.sendStatus(500);
        } else {
            res.send({ reports: reports });
        }
    }).sort({ _id: -1 });
});

router.post('/reports', async (req, res) => {
    const report = new Report({
        _id: new mongoose.Types.ObjectId(),
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        userAgents: req.body.userAgents,
        passed: req.body.passed,
        total: req.body.total,
        skipped: req.body.skipped,
        warnings: req.body.warnings,
        hasError: req.body.hasError,
    });
    await req.body.fixtures[0].tests.forEach(test => {
        const testEntry = new Test({
            name: test.name,
            uuid: md5(test.name),
            description: test.description,
            errs: test.errs,
            durationMs: test.durationMs,
            screenshotPath: test.screenshotPath,
            skipped: test.skipped,
            tags: test.tags,
            report: report._id,
            startTime: report.startTime,
            status: test.status,
            fixtureName: req.body.fixtures[0].name, // TODO
            fixturePath: req.body.fixtures[0].path, // TODO
        });
        testEntry.save(function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
    report.save(async function (err) {
        if (err) {
            console.log(err);
            res.send({
                success: false,
                message: err
            });
        } else {
            res.send({
                success: true,
                message: `Report with ID_${report._id} saved successfully!`
            });
        }
    });
});

router.get('/reports/test', function (req, res) {
    res.send('zbc');
});
router.get('/reports/:id', function (req, res) {
    Report.findById(req.params.id, (err, report) => {
        if (err) {
            res.sendStatus(500);
        } else {
            if (req.query.tests) {
                Test.find({ 'report': req.params.id }, (err, tests) => {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        report.tests = tests;
                        res.send(report);
                    }
                });
            } else {
                res.send(report);
            }
        }
    });
});

router.get('/tests/', function (req, res) {
    if (!req.query.uuid) {
        res.sendStatus(500);
        return;
    }
    if (req.query.sum) {
        const frequency = 0;

        const frequencyDateFormatMap = {
            0: '%Y-%m-%d',
            1: '%U',
            2: '%Y'
        };

        const frequencyDateFormat = frequencyDateFormatMap[frequency];

        Test.aggregate(
            [
                {
                    $match: {
                        uuid: req.query.uuid
                    }
                },
                {
                    $project: {
                        frequency: {
                            $dateToString: {
                                format: frequencyDateFormat,
                                date: '$startTime'
                            }
                        },
                        status: '$status'
                    }
                },
                {
                    $group: {
                        _id: {
                            status: '$status',
                            frequency: '$frequency'
                        },
                        count: {
                            $sum: 1
                        }
                    }
                }
            ], (err, tests) => {
                console.log(err);
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.send(tests);
                }
            }
        );
    } else {
        Test.find({ 'uuid': req.query.uuid }, (err, tests) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(tests);
            }
        }).sort({ _id: -1 });
    }
});

router.get('/tests/:id', function (req, res) {
    Test.findById(req.params.id, (err, report) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.send(report);
        }
    });
});

module.exports = router;
