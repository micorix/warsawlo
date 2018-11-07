import React, {Component, Fragment} from 'react'
import {css} from 'react-emotion'
import Map from '../components/Map/index'
import styled from 'react-emotion'
import {connect} from 'react-redux'
import Sidebar from '../components/Sidebar'
const SidebarWrapper = styled('div')`
  height:calc(100% - ${props => props.navHeight}px);
  position: absolute;
  top: ${props => props.navHeight}px;
  left:${props => props.active ? 0 : '-100%'};
  width:30vw;
  transition: .2s all;
  background:white;
  padding: 10px;
`
const MapWrapper = styled('div')`
  width:100vw;
  display:flex;
  justify-content:flex-end;
`
class Home extends Component{
   constructor(props){
     super(props)
   }
   render = () => {
     return (
       <Fragment>
       <MapWrapper>

       <Map sidebar={Boolean(this.props.select.school)}/>

       </MapWrapper>

         <SidebarWrapper navHeight={this.props.style.navHeight} active={Boolean(this.props.select.school)}>
           <Sidebar />
         </SidebarWrapper>




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


 export default connect(mapStateToProps, null)(Home);
