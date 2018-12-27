import React, {Component} from 'react'
import styled from 'react-emotion'
import SiteWrapper from '../components/SiteWrapper'
import Tag from '../components/Tag'
import subjects from '../data/subjects.json'
import {Redirect} from 'react-router-dom'
const PageWrapper = styled(SiteWrapper)`
`
export default class Privacy extends Component{
 constructor(props){
   super(props)
  }

 render = () => {

   return (<PageWrapper>
    <h1>Prywatność</h1>

 </PageWrapper>)
 }
 }
