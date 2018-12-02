import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import {Link, Redirect} from 'react-router-dom'

import SiteWrapper from '../components/SiteWrapper'
import SchoolData from '../data/data.json'
import Subjects from '../data/subjects.json'
import Tag from '../components/Tag'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faGlobe, faAt, faFax, faMapMarkerAlt, faRoad, faCity, faUsers, faSchool, faHandshake, faMoneyBill } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled('div')`
  width:100%;
  height:100%;
`
const Handler = styled(Link)`
all:unset;
display:block;
left: 50%;
top:10px;
margin-right: -50%;
transform: translate(-50%, 0);
width:10%;
height:10px;
background:white;
position:absolute;
border-radius:20px;
cursor:pointer;
`
const Grid = styled('div')`
  display: grid;
  visibility: ${props => props.show ? 'visible' : 'hidden'};
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
class SchoolInfo extends Component{
 constructor(props){
 super(props)
 }
 render = () => {
  if(!this.props.select.school){
    return <Redirect to='/map' />
  }
 return (
   <Wrapper>
   <Handler to={this.props.collapsed ? `/school/${this.props.select.school.name.full}` : '/map'} />
   <Box>
   <h1>{this.props.select.school.name.full}</h1>
   <h4>{this.props.select.school.meta.schoolType}</h4>
   </Box>
   <Grid show={!this.props.collapsed}>
   <div>
     <Box>
       <h4>Profile:</h4>
       {
         (() => {
           if(!this.props.select.school.profiles)
            return null

           return this.props.select.school.profiles.detailed.map(profile => {
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
           if(!this.props.select.school.contact[contact.name])
              return null

           let value = contact.transform ? contact.transform(this.props.select.school.contact[contact.name]) : this.props.select.school.contact[contact.name]
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
{this.props.select.school.location.position.Latitude}, {this.props.select.school.location.position.Longitude}
      </span>
        <AddressGrid>
          <span><FontAwesomeIcon icon={faRoad} /></span>
          {this.props.select.school.location.address.Street} {this.props.select.school.location.address.HouseNumber}<br/>
          <span><FontAwesomeIcon icon={faCity} /></span>
          {this.props.select.school.location.address.Subdistrict}<br/>
          <span><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
          {this.props.select.school.location.address.District}
        </AddressGrid>
    </Box></div><div>
    <Box>
      <h4>Informacje o szkole:</h4>

        <InnerGrid>
          <div>
            <span><FontAwesomeIcon icon={faUsers} /></span>
            <span>Publiczna:</span>
            <span>{this.props.select.school.meta.public === true ? 'TAK' : this.props.select.school.meta.public === false ? 'NIE' : this.props.select.school.meta.public}</span>
          </div>
          <div>
            <span><FontAwesomeIcon icon={faSchool} /></span>
            <span>Organ prowadzący:</span>
            <span>{this.props.select.school.meta.leadingOrgan.type} {this.props.select.school.meta.leadingOrgan.name}</span>
          </div>
          <div>
            <span><FontAwesomeIcon icon={faHandshake} /></span>
            <span>Organizacja:</span>
            <span>{this.props.select.school.meta.parent}</span>
          </div>
          <div>
            <span><FontAwesomeIcon icon={faMoneyBill} /></span>
            <span>Właściciel kapitału:</span>
            <span>{this.props.select.school.meta.capitalOwner}</span>
          </div>
        </InnerGrid>
    </Box></div>
   </Grid>
   </Wrapper>
 )
 }
 }
 const mapStateToProps = (state, ownProps) => {
   return ({
     select: state.select
 })
 }


 export default connect(mapStateToProps, null)(SchoolInfo);
