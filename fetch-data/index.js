const fs = require('fs')
const es = require('event-stream')

const prompt = require('./prompt')

const getDataFromTable = require('./table')
const getSchools = require('./schools')
const format = require('./format')
const getDetailedLocation = require('./localization')
const extractThresholds = require('./thresholds')
const JSONStream = require('JSONStream')
let counter = 0;
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
      stream.on('end', () => console.log(`Processed ${counter} schools`))
        stream
              .pipe(format())
              .pipe(extractThresholds(table))
              .pipe(getDetailedLocation())
              .pipe(es.mapSync(school => {
                counter++;
                console.log(`Done: ${school.name.full}`)
                return school
              }))
              .pipe(JSONStream.stringify())
              .pipe(fs.createWriteStream(`src/data/${answers.filename}`))

  })
})
