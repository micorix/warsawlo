import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import { faAt } from '@fortawesome/free-solid-svg-icons'
import { css} from 'emotion'
import styled from 'react-emotion'
import {connect} from 'react-redux'
import * as styleActions from '../store/actions/style'
import Logo from './Logo'
import {withRouter, Link} from 'react-router-dom'
const Brand = styled(Link)`
all:unset;
cursor:pointer;
margin-right:20px;
font-size: 2em;
color:black !important;
display:flex;
align-items:center;
span:not(.highlight){
  font-family: ${props => props.theme.fonts.tertiary};
}
  span.highlight{
    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fonts.secondary}
  }
  svg{
    height:2.5em;

      path{
        fill: ${props => props.theme.colors.primary};
      }
  }
`
const Navbar = styled('nav')`
position:fixed;
top:0;
left:0;
width:calc(100vw - 20px * 2);
display:flex;
align-items:center;
padding:0 20px 0 20px;
background:white;
z-index:10;
`
const SearchInput = styled('input')`
  all:unset;
  display:inline-block;
  height: 1.2em;
  padding:10px;
  margin-right:10%;
  background rgb(230,230,230);
  border: 3px solid rgb(230,230,230);
  border-radius:3px;
  font-size: 1.2em;
  width:50%;
  transition: .2s all;
  &:focus{
    border: 3px solid rgb(210,210,210);
  }
`
const LinksContainer = styled('div')`
display:flex;
align-items:center;
justify-content:space-between;
width:calc(100% - 20px);
`
const Action = styled('a')`
margin:20px;
`
const NavLink = styled(Link)`
all:unset;
cursor:pointer;
margin:20px;
color: rgb(100, 100,100);
transition: .2s all;
&:hover{
  color:black;
}
`
 class AppNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    }
    this.navbarEl = React.createRef()
  }
  componentDidMount = () => {
    this.props.updateNavHeight(this.navbarEl.current.querySelector('.navbar').offsetHeight)
    window.addEventListener('resize', e => this.props.updateNavHeight(this.navbarEl.current.querySelector('.navbar').offsetHeight))
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleSearch = (e) => {
    this.props.history.replace({
      pathname: '/search',
      search: `?query=${e.target.value.trim().split(' ').join('+')}`,
      state: {
        focus: true
      }
    })
    e.nativeEvent.target.value = ""
    e.nativeEvent.target.blur()
  }
  render() {
    return (
      <div ref={this.navbarEl}>
        <Navbar className="navbar">

          <Brand to="/">
          <Logo />
          <span>Warsaw<span className="highlight">LO</span></span>
        </Brand>


        <LinksContainer>
          <div className="mr-auto" navbar>

              <NavLink to="/about" className="nav-link">O projekcie</NavLink>

              <NavLink to="/map" className="nav-link">Mapa</NavLink>
              <NavLink to="/calculator" className="nav-link">Kalkulator punktów</NavLink>
          </div>
            <div className="ml-auto" navbar>
              {(() => {
                console.log(this.props)
                if(this.props.location.pathname !== '/' && this.props.location.pathname !== '/search')
                  return  <SearchInput placeholder="Szukaj szkoły" onChange={this.handleSearch}/>
                return null
              })()}
<Action href="http://fb.com/warsawlo" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} size="2x"/></Action>
  <Action href="/about" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookMessenger} size="2x"/></Action>
    <Action href="mailto:info@warsawlo.pl" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faAt} size="2x"/></Action>

            </div>
            </LinksContainer>

        </Navbar>
      </div>
    );
  }
}
// <NavItem>
//
// </NavItem>
// <NavItem>
//   <NavLink href="/about" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookMessenger} size="2x"/></NavLink>
// </NavItem>
// <NavItem>
//   <NavLink href="mailto:info@warsawlo.pl" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faAt} size="2x"/></NavLink>
// </NavItem>

const mapDispatchToProps = (dispatch) => ({
    updateNavHeight: navHeight => dispatch(styleActions.updateNavHeight(navHeight))
}
)

// Use connect to put them together
export default connect(null, mapDispatchToProps)(withRouter(AppNavbar))
