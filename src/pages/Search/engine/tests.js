import Subjects from '../../../data/subjects.json'
import {getDistance} from 'geolib'
export const subjects = (values) => (school) => {
  if(!school.profiles){
    return false
  }
  let shortNames = values.map(fullName => Subjects.filter(subject => subject[0] === fullName)[0][2])
  if(shortNames.every(elem => school.profiles.overview.availableSubjects.includes(elem))){

    return true
  }
  console.log(shortNames, school.profiles.overview.availableSubjects);
  return false
}
export const pointsRange = (values) => (school) => {
  if(!school.profiles){
    if(values[0] === 0 && values[1] === 100)
      return true
    return false
  }
  if(school.profiles.overview.pointsRange[0] > values[0] && school.profiles.overview.pointsRange[1] < values[1]){
    return true
  }
  return false
}
export const distance = (value) => (school) => {
  console.log(value.startPosition);
  let distanceInMeters = getDistance({
    latitude: value.startPosition.latitude,
    longitude: value.startPosition.longitude
  }, {
     latitude: school.location.position.Latitude,
     longitude: school.location.position.Longitude
  })
  return distanceInMeters <= value.maxDistance
}
