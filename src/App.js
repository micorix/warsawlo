import React, { Component, Fragment} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import { faAt } from '@fortawesome/free-solid-svg-icons'
import Logo from './Logo'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'
import Navbar from './components/Navbar'
import {css} from 'emotion'
import styled from 'react-emotion'
import {connect} from 'react-redux'
class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Fragment>
        <Router>
          <Fragment>
          <Navbar/>
          <div className={css`
              width:100%;
              height: calc(100% - ${this.props.style.navHeight}px);
              margin-top: ${this.props.style.navHeight}px;
                `} >

            <Routes />
          </div>

          </Fragment>
        </Router>


      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  style: state.style
})

export default connect(mapStateToProps, null)(App);
