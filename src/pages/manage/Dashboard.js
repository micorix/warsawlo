import React, {Component} from 'react'
import SiteWrapper from '../../components/SiteWrapper'
import Button from '../../components/Button'
import styled from 'react-emotion'
import {Redirect} from 'react-router-dom'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import Octokit from '@octokit/rest'


const PageWrapper = styled(SiteWrapper)`
  background:${props => props.theme.colors.primary};
  color:white;
  display:flex;
  justify-content:center;
`
const Container = styled('div')`
  margin-top:10vh;
  width:50%;
  text-align:center;
`
const octokit = new Octokit()

export default class Home extends Component{
  state = {
    token: false
  }
  render = () => {
      console.log(firebase.auth().currentUser)
    return (
      <PageWrapper>
        <Container>
      <h1>WarsawLO manage Dashboard</h1>
      <p>Strona przeznaczona tylko dla moderatorów i administatorów serwisu.</p>
      </Container>
      </PageWrapper>
    )
  }
}
