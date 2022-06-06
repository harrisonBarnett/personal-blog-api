var express = require('express');
var router = express.Router();
const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const { resourceLimits } = require('worker_threads');

router.get('/', (req, res) => {
    const data = [];
    fs.createReadStream('./routes/workoutdata.csv')
        .pipe(csvParser())
        .on('data', (row) => {
            data.push(row)
        })
        .on('end', () => {
            console.log('done reading')
            res.send(data)
        })
})

router.post('/', (req, res) => {
    const csvWriter = createCsvWriter({
        path: './routes/workoutdata.csv',
        header: [
            {id: 'squat', title: 'Squat'},
            {id: 'dead', title: 'Dead'},
            {id: 'bench', title: 'Bench'},
            {id: 'ohp', title: 'OHP'},
            {id: 'prevRotation', title: 'PrevRotation'},
            {id: 'prevDate', title: 'PrevDate'}
        ]
    });
    const records = [
        {squat: req.body.squat, 
            dead: req.body.dead, 
            bench: req.body.bench, 
            ohp: req.body.ohp, 
            prevRotation: req.body.prevRotation, 
            prevDate: req.body.prevDate},
        
    ]
    csvWriter.writeRecords(records)
        .then(() => {
            res.sendStatus(200)
        })
})

module.exports = router;