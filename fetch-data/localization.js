const HereMapsAPI = require('here-maps-node').default;
const dotenv = require('dotenv')
const es = require('event-stream')
dotenv.config()
const hmAPI = new HereMapsAPI({
  app_id: process.env.HERE_APP_ID,
  app_code: process.env.HERE_APP_CODE
})
const getDetailedLocation = () => es.map((school, callback) => {
console.log(school.name.full);
  hmAPI.geocode({
    searchtext: `${school.location.street} ${school.location.houseNumber}, Warszawa, Polska`
  }, (err, result) => {
    if(!err)
      callback(err)

    let position = result.Response.View[0].Result[0].Location.DisplayPosition
    let address = result.Response.View[0].Result[0].Location.Address

    callback(null, {
      ...school,
      location: {
        position,
        address
      }
    })
})
})
module.exports = getDetailedLocation
