import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import { faAt } from '@fortawesome/free-solid-svg-icons'
import { css} from 'emotion'
import styled from 'react-emotion'
import {connect} from 'react-redux'
import * as styleActions from '../store/actions/style'
import Logo from './Logo'
import {withRouter, Link} from 'react-router-dom'
const Brand = styled(NavbarBrand)`
font-size: 2em;
color:black !important;
font-family: ${props => props.theme.fonts.tertiary};
  span{
    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fonts.secondary}
  }
  svg{
    height:2.5em;
    transform:translateY(-0.125em);
      path{
        fill: ${props => props.theme.colors.primary};
      }
  }
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
        <Navbar color="light" light expand="md" fixed="top">
          <Link to="/">
          <Brand>
          <Logo />
          Warsaw<span>LO</span>
          </Brand></Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/about" className="nav-link">O projekcie</Link>
            </NavItem>
            <NavItem>
              <Link to="/map" className="nav-link">Mapa</Link>
            </NavItem>
          </Nav>
            <Nav className="ml-auto" navbar>
              {(() => {
                console.log(this.props)
                if(this.props.location.pathname !== '/' && this.props.location.pathname !== '/search')
                  return  <SearchInput placeholder="Szukaj szkoły" onChange={this.handleSearch}/>
                return null
              })()}

              <NavItem>
                <NavLink href="http://fb.com/warsawlo" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} size="2x"/></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookMessenger} size="2x"/></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="mailto:info@warsawlo.pl" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faAt} size="2x"/></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
    updateNavHeight: navHeight => dispatch(styleActions.updateNavHeight(navHeight))
}
)

// Use connect to put them together
export default connect(null, mapDispatchToProps)(withRouter(AppNavbar))
