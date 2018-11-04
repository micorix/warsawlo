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
const Brand = styled(NavbarBrand)`
font-size: 2em;
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
  render() {
    return (
      <div ref={this.navbarEl}>
        <Navbar color="light" light expand="md" fixed="top">
          <Brand href="/">
          <Logo />
          Warsaw<span>LO</span>
          </Brand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/about">O projekcie</NavLink>
            </NavItem>
          </Nav>
            <Nav className="ml-auto" navbar>
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
export default connect(null, mapDispatchToProps)(AppNavbar);
