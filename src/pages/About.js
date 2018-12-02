import React, {Component} from 'react'
import styled from 'react-emotion'
import SiteWrapper from '../components/SiteWrapper'
import Time from './time.jpg'
import Logo from '../logo.svg'
import Button from '../components/Button'
import {faMapMarkerAlt, faChartBar, faBus, faInfoCircle, faFileAlt, faAmbulance} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {css} from 'emotion'
const First = styled(SiteWrapper)`
  display:block;
  background: ${props => props.theme.colors.primary.replace('rgb', 'rgba').replace(')', ',0)')} ;
  position:relative;
  &:last-child{
    margin-top:60vh;
    margin-left:-10vw;
  }
  &::before{
    position:absolute;
    content: '';
    top:-20%;
    left:0;
    width:100%;
    height:100%;
    z-index:-2;
    background: ${props => props.theme.colors.primary.replace('rgb', 'rgba').replace(')', ',1)')};
    background-position: 90% bottom;
    background-repeat:no-repeat;
    transform: rotate(30deg) scale(1.2);
  }
  &::after{
    position:absolute;
    content: '';
    top:-20%;
    left:0;
    width:100%;
    height:100%;
    z-index:-2;
    mask-image:;
    background: url(${Logo});
    filter: invert(100%);
    opacity:.6;
    background-position: 90% bottom;
    background-repeat:no-repeat;
    transform: rotate(30deg) scale(1.2);
  }
`
const Container = styled('div')`
  padding-top:10vh;
  margin-left:10vw;
  width:40vw;
  color:white;
  h1{
    font-size:3rem;
  }
  p{
    line-height:1.5em;
    font-size:1.1em;
    letter-spacing:2px;

  }
`
const PageWrapper = styled(SiteWrapper)`
background:transparent;
`
const LightButton = styled(Button)`
  color:${props => props.theme.colors.primary};
  margin-top:20px;
  border-color:white;
  font-size:1.5em;
`
const Content = styled('div')`
  padding:0 5% 5% 5%;
  width:90vw;
  background:transparent;
  color:black;
  width:50vw;
  p{
    line-height:1.5em;
    font-size:1.1em;
    letter-spacing:2px;

  }
  h1{
    font-size:3rem;
  }
`
const Inline = styled('div')`
display:grid;
grid-template-columns: .2fr 1fr;
grid-column-gap:10px;
h2{
  letter-spacing:2px;
  margin-left:2em;
}
`
const InlineWrapper = styled('div')`
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap:20px;
  grid-row-gap:3em;
`
const Centered = styled('div')`
  display:flex;
  align-items:${props => props.notVertical ? 'flex-start' : 'center'};
  justify-content:${props => props.notHorizontal ? 'flex-start' : 'center'};;
`
 export default class About extends Component{
 constructor(props){
 super(props)
 }
 render = () => {
 return (
   <>
   <PageWrapper>
     <First>
     <Container>
<h1>Wiesz, że zostało mało czasu, <br/>a nie wiesz gdzie chcesz iść?</h1>
<p>Nie tylko, ty masz ten problem! Będziemy zmierzać się z tym razem w tym roku, ale
  po co utrudniać, coś, co może być prostsze!
  Możesz odwiedzić każdy licealny zakątek internetu
  albo znaleźć swoją szkołę marzeń w trzy klinknięcia!
</p>
<LightButton>Zobacz, jak to działa</LightButton>
     </Container>
</First>


     <Content>
       <h1>To prostsze!</h1>
       <p>Nadal nie mówimy, że najławiejsze. <br />To twój wybór, ale cieszymy się, że możemy Ci go ułatwić.</p>
       <h2 className={css`margin: 2em 0 2em 0;`}>Filtruj na podstawie kryteriów:</h2>
       <InlineWrapper>
       <Inline>
         <Centered>
         <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" />
         </Centered>
         <Centered notHorizontal>
         <h2>Lokalizacja</h2>
              </Centered>
       </Inline>
       <Inline>
         <Centered>
         <FontAwesomeIcon icon={faBus} size="3x" />
              </Centered>
         <Centered notHorizontal>
         <h2>Dojazd komunikacją</h2>
              </Centered>
       </Inline>
       <Inline>
         <Centered>
         <FontAwesomeIcon icon={faChartBar} size="3x" />
              </Centered>
         <Centered notHorizontal>
         <h2>Progi punktowe</h2>
              </Centered>
       </Inline>
       <Inline>
         <Centered>
         <FontAwesomeIcon icon={faFileAlt} size="3x" />
              </Centered>
         <Centered notHorizontal>
         <h2>Zdawalności matur</h2>
              </Centered>
       </Inline>
       <Inline>
         <Centered>
         <FontAwesomeIcon icon={faAmbulance} size="3x" />
              </Centered>
         <Centered notHorizontal>
         <h2>Wypadki w szkołach</h2>
              </Centered>
       </Inline>
       <Inline>
         <Centered>
         <FontAwesomeIcon icon={faInfoCircle} size="3x" />
         </Centered>
         <Centered notHorizontal>
         <h2>Podstawowe informacje</h2>
         </Centered>
       </Inline>
       </InlineWrapper>
     </Content>

   </PageWrapper>
   </>
 )
 }
 }
