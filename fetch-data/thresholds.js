const es = require('event-stream')
const formatRows = rows => {
  let schoolnames = []
  return rows.reduce((schools, row, i) => {
    let schoolname = row[1]
    let profile = row[2]
    let threshold = row[3]

    if(i == 0 || !schoolname) return schools
    if (!schoolnames.includes(schoolname)) {
      schoolnames.push(schoolname)
        schools.push({
          name: schoolname,
          profiles: []
        })
      }
    schools.filter(school => school.name == schoolname)[0].profiles.push([profile, threshold])
    return schools
}, [])}
const extractThresholds = rows => es.map((school, callback) => {
  const data = formatRows(rows)
  const matching = data.filter(dataSchool => dataSchool.name.toUpperCase() == school.name.full)
  if(matching.length > 0){
    school.profiles = matching[0].profiles
  }
  callback(null, school)
})
module.exports = extractThresholds
