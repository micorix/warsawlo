const hyperquest = require('hyperquest')
const es = require('event-stream')
const JSONStream = require('JSONStream')

const getWikipediaSummary = () => {
//es.map((school, callback) => {
  hyperquest(`https://pl.wikipedia.org/w/api.php?action=opensearch&limit=1&namespace=0&format=json&&origin=*&search=XXVII%20LICEUM%20OGÓLNOKSZTAŁCĄCE%20IM.%20TADEUSZA%20CZACKIEGO/`)
  // .pipe(JSONStream.parse())
  .pipe(process.stdout)
  // .pipe(es.mapSync(name => {
  //   console.log(name)
  //   return name
  // }))
  // callback(null, school)
  // let site = Object.values(response.query.pages)[0]
  // if(site){
  //   let text = site.extract.split(/–(.+)/)[1].trim()
  //   resolve(text.charAt(0).toUpperCase()+text.slice(1))
// })
}
getWikipediaSummary()
