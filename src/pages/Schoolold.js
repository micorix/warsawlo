import React, {Component} from 'react'
import styled from 'react-emotion'
import SiteWrapper from '../components/SiteWrapper'
import SchoolData from '../data/data.json'
import Subjects from '../data/subjects.json'
import {Link, Redirect} from 'react-router-dom'
import mapboxgl from 'mapbox-gl'
import {css} from 'emotion'
import addSchoolMarkers from '../components/Map/schoolMarkers'
import Tag from '../components/Tag'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faGlobe, faAt, faFax, faMapMarkerAlt, faRoad, faCity, faUsers, faSchool, faHandshake, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
const Grid = styled('div')`
  display: grid;
grid-template-columns: repeat(4, 1fr);
grid-column-gap: 30px;
grid-row-gap: 30px;

.geo{
  color: rgba(0,0,0,0.5);
}
.profile{
  border-bottom: 3px solid ${props => props.theme.colors.light};
  &:last-of-type{
    border-bottom: none;
  }
}
.threshold{
  text-align:right;
  margin: 0 0 0 10px;
}
`
const Box = styled('div')`
  margin:20px;
  background:white;
  padding:10px;
`
const InnerGrid = styled('div')`
  & > div {
    display: grid;
  grid-template-columns: 1.2em 0.5fr 1fr;
  grid-column-gap: 10px;
  margin: 10px 0 10px 0;

  & *{
    display:flex;
    align-items:center;
  }
  }
`
const AddressGrid = styled('div')`

    display: grid;
  grid-template-columns: 1.2em 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 20px;

`
const PageWrapper = styled(SiteWrapper)`
  background: ${props => props.theme.colors.light};
`
const contactMapping = [
  {
    name: 'website',
    showName: 'Strona',
    icon: faGlobe,
    linkPrefix: 'http://',
    transform: data => data.replace('www.', '')
  },
  {
    name: 'email',
    showName: 'Email',
    icon: faAt,
    linkPrefix: 'mailto:'
  },
  {
    name: 'phone',
    showName: 'Telefon',
    icon: faPhone,
    linkPrefix: 'tel:'
  },
  {
    name: 'fax',
    showName: 'Faks',
    icon: faFax,
    linkPrefix: 'fax:'
  }
]
 export default class School extends Component{
 constructor(props){
 super(props)
 let schoolname = decodeURIComponent(this.props.match.params.schoolID).split('+').join(' ')
 let found = true
 let school = SchoolData.filter(s => s.name.full.toLowerCase() === schoolname.toLowerCase())[0]
 if(!school || Object.keys(school).length === 0){
  found = false
}
  this.state = {
    found,
    school
  }
  this.mapContainer = React.createRef()
 }
 componentDidMount = () => {
   this.map = new mapboxgl.Map({
     container: this.mapContainer.current,
     style: 'mapbox://styles/mapbox/streets-v9',
     center: [this.state.school.location.position.Longitude, this.state.school.location.position.Latitude],
     zoom: 14
   })
   this.map.addControl(new mapboxgl.NavigationControl())
   this.schoolMarkers = addSchoolMarkers({map:this.map, selectSchool: console.log})
   this.schoolMarkers[SchoolData.indexOf(this.state.school)].getElement().classList.add('active')
 }
 render = () => {
   if(!this.state.found)
    return <Redirect to="/error/404" />
 return (
   <PageWrapper>
   <div ref={this.mapContainer} className={css`
   width:${'100%'};
   height:20vh;
   div[class^='mapboxgl-ctrl-'], .mapboxgl-marker{
     top:auto;
     left:auto;
   }
     `}></div>
   <Box>
   <h1>{this.state.school.name.full}</h1>
   <h4>{this.state.school.meta.schoolType}</h4>
   </Box>
   <Grid>
   <div>
     <Box>
       <h4>Profile:</h4>
       {
         (() => {
           if(!this.state.school.profiles)
            return null

           return this.state.school.profiles.detailed.map(profile => {
             return (
               <div className="profile">
                 {profile[0].map(subject => {
                   let color = Subjects.filter(arr => arr[2] == subject)[0]
                   if(color)
                    return <Tag color={color[1]}>{subject}</Tag>
                  return <Tag>{subject}</Tag>
                 })}
                 <p className="threshold">{profile[1]} {isNaN(profile[1]) ? null : 'pkt'}</p>
               </div>
             )
           })
         })()
       }

     </Box></div>
     <div>
     <Box>
     <h4>Kontakt:</h4>
     <InnerGrid>
       {(() => {
         return contactMapping.map(contact => {
           if(!this.state.school.contact[contact.name])
              return null

           let value = contact.transform ? contact.transform(this.state.school.contact[contact.name]) : this.state.school.contact[contact.name]
           return (
             <div>
               <div>
               <FontAwesomeIcon icon={contact.icon} />
               </div>
               <div>{contact.showName}:</div>
               <div>
                 {(() => {
                   if(contact.linkPrefix !== null)
                    return (
                      <a href={contact.linkPrefix+value} target="_blank">
                        {value}
                      </a>
                    )
                    return value
                 })()}
               </div>
             </div>
           )
         })
       })()}
     </InnerGrid>
   </Box></div><div>
    <Box>
      <h4>Lokalizacja:</h4>
      <span className="geo">
{this.state.school.location.position.Latitude}, {this.state.school.location.position.Longitude}
      </span>
        <AddressGrid>
          <span><FontAwesomeIcon icon={faRoad} /></span>
          {this.state.school.location.address.Street} {this.state.school.location.address.HouseNumber}<br/>
          <span><FontAwesomeIcon icon={faCity} /></span>
          {this.state.school.location.address.Subdistrict}<br/>
          <span><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
          {this.state.school.location.address.District}
        </AddressGrid>
    </Box></div><div>
    <Box>
      <h4>Informacje o szkole:</h4>

        <InnerGrid>
          <div>
            <span><FontAwesomeIcon icon={faUsers} /></span>
            <span>Publiczna:</span>
            <span>{this.state.school.meta.public === true ? 'TAK' : this.state.school.meta.public === false ? 'NIE' : this.state.school.meta.public}</span>
          </div>
          <div>
            <span><FontAwesomeIcon icon={faSchool} /></span>
            <span>Organ prowadzący:</span>
            <span>{this.state.school.meta.leadingOrgan.type} {this.state.school.meta.leadingOrgan.name}</span>
          </div>
          <div>
            <span><FontAwesomeIcon icon={faHandshake} /></span>
            <span>Organizacja:</span>
            <span>{this.state.school.meta.parent}</span>
          </div>
          <div>
            <span><FontAwesomeIcon icon={faMoneyBill} /></span>
            <span>Właściciel kapitału:</span>
            <span>{this.state.school.meta.capitalOwner}</span>
          </div>
        </InnerGrid>
    </Box></div>
   </Grid>

   </PageWrapper>
 )
 }
 }
