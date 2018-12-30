import React, {Component, Fragment} from 'react'
import {css} from 'react-emotion'
import Map from '../components/Map/index'
import styled from 'react-emotion'
import {connect} from 'react-redux'
import Sidebar from '../components/Sidebar'
import SchoolInfo from '../components/SchoolInfo'
import {selectSchool} from '../store/actions/select'
// TODO: Import from redux saga
const HeaderWrapper = styled('div')`
width:100vw;
height: calc(${props => props.collapsed ? '100vh' : '50vh'} - ${props => props.navHeight}px);
display:flex;
`
const HeaderImage = styled('img')`
  height:100%;
  width: ${props => props.smallMap ? '60vw' : 0};
  transition: .8s all;
  position:relative;
  z-index:2;
`
const InfoWrapper = styled('div')`
  min-height:${props => props.collapsed ? 30 : 60}vh;
  position: absolute;
  top:${props => props.hidden ? 'calc(100vh + 100%)' : '50vh'};
  left:0;
  width:calc(100vw - 20px);
  transition: .2s all;
  background:${props => props.theme.colors.light};
  padding: 10px;
  z-index:10;
`
const MapWrapper = styled('div')`
  width:${props => props.smallMap ? '40vw' : '100vw'};
  height: 100%;
  display:flex;
  justify-content:flex-end;
  overflow:hidden;
`
class MapView extends Component{
   constructor(props){
     super(props)
     // if(this.props.match.params.schoolID){
     //   console.log(this.props.match.params.schoolID)
     //   SchoolData.map((school, index) => {
     //     if(school.name.full.split(' ').join('+') == urlEn)
     //   })
     //   this.props.selectSchool(parseInt(this.props.match.params.schoolID))
     // }
     this.state = {
       smallMap: false
     }
   }
   componentDidMount = () => {
     setTimeout(() => this.map.resize(), 300)
   }
   componentDidUpdate = (prevProps) => {
     let schoolChanged = prevProps.select.school !== this.props.select.school


     // selection has been cleared
     if(this.props.select.school === null && prevProps.select.school !== null){
       this.props.history.push(`/map`)
       this.setState({
         smallMap: false
       }, () => {
         setTimeout(() => cancelAnimationFrame(animation), 1000)
         let animate = () => {
           this.map.resize()
           requestAnimationFrame(animate)
         }
         let animation = requestAnimationFrame(animate)
       })
     }

     // school selection changed
     if(this.props.select.school !== null && schoolChanged){
       this.props.history.push(`/school/${this.props.select.school.name.full}`)
       this.setState({
         smallMap: true
       }, () => this.map.resize())
     }



   }
   getMap = (mapEl) => {
     this.map = mapEl
   }
   render = () => {
     let collapsed = !Boolean(this.props.match.params.schoolID)
     let hidden = !Boolean(this.props.select.school)
     return (
       <Fragment>
       <HeaderWrapper collapsed={collapsed} navHeight={this.props.style.navHeight}>
       <HeaderImage src='https://source.unsplash.com/random' smallMap={this.state.smallMap} />
       <MapWrapper smallMap={this.state.smallMap}>
       <Map sidebar={Boolean(this.props.select.school)} getMap={this.getMap}/>

       </MapWrapper>
       </HeaderWrapper>
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
