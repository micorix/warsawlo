import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'

const Schoolname = styled('h1')`
  font-family: ${props => props.theme.fonts.secondary};
`
class Sidebar extends Component{
 constructor(props){
 super(props)
 }
 render = () => {
 return <Schoolname>{this.props.select.school && this.props.select.school.name.full}</Schoolname>
 }
 }
 const mapStateToProps = (state, ownProps) => {
   return ({
     style: state.style,
     select: state.select
 })
 }


 export default connect(mapStateToProps, null)(Sidebar);
