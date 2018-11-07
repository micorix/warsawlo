import SchoolData from '../../data/data.json'
import mapboxgl from 'mapbox-gl'
import {css} from 'emotion'
const generateMarker = ({schoolID, selectSchool}) => {
  let marker = document.createElement('div')
  marker.classList.add(css`
  font-family: Playfair Display;
  font-weight: bold;
  text-transform: uppercase;
  padding:5px;
  border-radius:5px;
  background rgb(89,0,138);
  color: white;
  border: 2px solid white;
  transition: background, color, border .2s;
  cursor: pointer;
  &::after{
    content: 'LO'
  }
  &.active{
    background white;
    color:rgb(89,0,138);
    border: 2px solid rgb(89,0,138);
    transform: scale(1.1);
  }
  `)
  marker.classList.add('school-marker')
  marker.addEventListener('click', e => {
    [].forEach.call(document.querySelectorAll('.school-marker'), el => el.classList.remove('active'))
    e.target.classList.add('active')
    selectSchool(schoolID)
    window.dispatchEvent(new Event('resize')) // resize map
  })
  return marker
}
const addSchoolMarkers = ({map, selectSchool}) => SchoolData.map((school, schoolID) => {
console.log([school.location.position.Longitude, school.location.position.Latitude]);
  return new mapboxgl.Marker(generateMarker({schoolID, selectSchool}))
  .setLngLat([school.location.position.Longitude, school.location.position.Latitude])
  .addTo(map)

})
export default addSchoolMarkers
