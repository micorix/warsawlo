import React, {Component} from 'react'
import SiteWrapper from '../../components/SiteWrapper'
import Button from '../../components/Button'
import styled from 'react-emotion'
import {Redirect} from 'react-router-dom'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import GitHub from 'github-api'
import Octokit from '@octokit/rest'
firebase.initializeApp({
  apiKey: 'AIzaSyC7EkCCk8jidC73X0_aqKZ8npfxJpabgyE',
  authDomain: 'warsawlopl.firebaseapp.com',
  databaseURL: 'https://warsawlopl.firebaseio.com',
  projectId: 'warsawlopl',
  storageBucket: 'warsawlopl.appspot.com',
  messagingSenderId: '269380711417'
})
const provider = new firebase.auth.GithubAuthProvider()
provider.addScope('repo')
provider.addScope('user')


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
  login = () => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
    firebase.auth().signInWithPopup(provider).then((result) => {
      let token = result.credential.accessToken
      octokit.authenticate({
        type: 'app',
        token
      })
      octokit.orgs.getMembershipForAuthenticatedUser({org: 'WarsawLO'}).then(result => {
        this.setState({
          token
        })
      }).catch(err => {
        if(err.message === 'You do not have access to this organization membership.'){
          alert('Nie masz uprawnień do dostępu')
          firebase.auth().signOut()
        }
      })
      console.log(result.additionalUserInfo.username)
      console.log({token})
}).catch(err => {
  alert('Wystąpił błąd. Szczegóły w konsoli.')
  console.error(err)
})
})
  }
  render = () => {
    if(this.state.token){
      return <Redirect to={{
        pathname: '/manage/dashboard',
        state: {
          token: this.state.token
        }
      }} />
    }
    return (
      <PageWrapper>
        <Container>
      <h1>WarsawLO manage zone</h1>
      <p>Strona przeznaczona tylko dla moderatorów i administatorów serwisu.</p>
      <Button onClick={this.login}>Zaloguj się przez Github</Button>
      </Container>
      </PageWrapper>
    )
  }
}
