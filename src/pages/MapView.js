import React, {Component, Fragment} from 'react'
import {css} from 'react-emotion'
import Map from '../components/Map/index'
import styled from 'react-emotion'
import {connect} from 'react-redux'
import Sidebar from '../components/Sidebar'
import SchoolInfo from '../components/SchoolInfo'
import {selectSchool} from '../store/actions/select'
const InfoWrapper = styled('div')`
  height:${props => props.collapsed ? 30 : 60}vh;
  position: absolute;
  bottom:${props => props.hidden ? '-100%' : 0};
  left:0;
  width:100vw;
  transition: .2s all;
  background:${props => props.theme.colors.light};
  padding: 10px;
  z-index:10;
  box-shadow: 0 37.125px 70px -12.125px rgba(0,0,0,0.3);
`
const MapWrapper = styled('div')`
  width:100vw;
  display:flex;
  justify-content:flex-end;
  overflow:hidden;
  background:red;
`
class MapView extends Component{
   constructor(props){
     super(props)
     // if(this.props.match.params.schoolID){
     //   console.log(this.props.match.params.schoolID);
     //   this.props.selectSchool(parseInt(this.props.match.params.schoolID))
     // }
   }
   componentDidUpdate = (prevProps) => {
     let schoolChanged = prevProps.select.school !== this.props.select.school


     // selection has been cleared
     if(this.props.select.school === null && prevProps.select.school !== null){
       this.props.history.push(`/map`)
     }

     // school selection changed
     if(this.props.select.school !== null && schoolChanged){
       this.props.history.push(`/school/${this.props.select.school.name.full}`)
     }
   }
   render = () => {
     let collapsed = !Boolean(this.props.match.params.schoolID)
     let hidden = !Boolean(this.props.select.school)
     return (
       <Fragment>
       <MapWrapper>
       <Map sidebar={Boolean(this.props.select.school)}/>

       </MapWrapper>
       <InfoWrapper collapsed={collapsed} hidden={hidden}>
        <SchoolInfo collapsed={collapsed} />
       </InfoWrapper>
       </Fragment>
     )
   }
 }
 const mapStateToProps = (state, ownProps) => {
   return ({
     style: state.style,
     select: state.select
 })
 }
 const mapDispatchToProps = (dispatch) => ({
   selectSchool: schoolID => dispatch(selectSchool(schoolID))
 })

 export default connect(mapStateToProps, mapDispatchToProps)(MapView);
