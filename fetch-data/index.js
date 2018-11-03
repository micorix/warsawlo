const fs = require('fs')
const es = require('event-stream')

const prompt = require('./prompt')

const getDataFromTable = require('./table')
const getSchools = require('./schools')
const format = require('./format')
const getDetailedLocation = require('./localization')
const extractThresholds = require('./thresholds')

prompt().then(answers => {
  if(answers.overwrite === false)
    process.exit()

  console.log('Processing...\nIt may take a while.');
  Promise.all([
    getDataFromTable('./fetch-data/resources/thresholds_2018.pdf'),
    getSchools()
  ])
  .then(values => {
    let table = values[0]
    let { stream } = values[1]
        stream
              .pipe(format())
              .pipe(extractThresholds(table))
              .pipe(getDetailedLocation())
              .pipe(es.stringify())
              .pipe(fs.createWriteStream(`src/data/${answers.filename}`))
  })
})
