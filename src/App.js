import React, { Component, Fragment} from 'react';
import styled, {createGlobalStyle} from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import Logo from './Logo'
const GlobalStyle = createGlobalStyle`
  @import "https://cdn.jsdelivr.net/gh/theleagueof/ostrich-sans/webfonts/ostrich-sans.css";
  @import url('https://fonts.googleapis.com/css?family=Playfair+Display:400&subset=latin-ext');
  html, body, #root{
    width:100%;
    height:100%;
    margin:0;
    padding:0;
  }
`
const Social = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  padding:20px;
  svg{
    margin:10px;
    &:hover{
      path{
        fill: #59008A;
      }
    }
  }
`
const Wrapper = styled.div`
  width:100%;
  height:100%;
  background:white;
  background-size:cover;
  display:flex;
  justify-content:center;
`
const Container = styled.div`
  margin-top:5vh;
  width:40%;
  @media only screen and (max-width: 1000px) {
    width:calc(100% - 40px);
    font-size: 0.8em;
  }
`
const Paragraph = styled.p`
  color:#282c34;
  font-family: 'Playfair Display';
  line-height:1.8em;
  font-size:1.5em;
`
const Sign = styled.span`
  display:block;
  text-align:right;
  font-style: italic;
  span{
    color:#59008A;
  }
`
class App extends Component {
  state = {social:true}

  componentDidMount = () => {
    window.addEventListener('scroll', e => {
      if(window.innerWidth < 1000 & window.scrollY > 20){
        this.setState({social:false})
      }else{
        this.setState({social:true})
      }
    })
  }
  render() {
    return (
      <Fragment>
        <GlobalStyle />
        {(() => {
          if(this.state.social){
            return (<Social>
              <a href="https://fb.com/warsawlo" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} size="3x" color="#4c5363"/></a>
              <a href="https://m.me/warsawlo" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookMessenger} size="3x" color="#4c5363"/></a>
            </Social>)
          }
          return null
        })()}
          <Wrapper>
            <Container>
              <Logo />

            <Paragraph>
              <h3>Nie wiesz, co robić po podstawówce lub gimnazjum?</h3>
            Nie rozwiążemy tego problemu za Ciebie, ale możemy Ci pomóc.
          Pamiętasz to szukanie na <b>1000</b> stron różnych szkół, aby dowiedzieć się podstawowych rzeczy?
          <br /> <b>Wszystko to będzie tutaj.</b> (Przynajmniej postaramy się, aby było ;)
            <br /><br />
          <i>Ale daj nam chwilę. Też się uczymy ;) <br /> Zajrzyj tu za jakiś czas.</i>
          <Sign>
            Warsaw<span>LO</span> team
          </Sign>
            </Paragraph>
          </Container>

          </Wrapper>
      </Fragment>
    );
  }
}

export default App;
