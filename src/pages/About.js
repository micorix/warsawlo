import React, {Component} from 'react'
import styled from 'react-emotion'
import SiteWrapper from '../components/SiteWrapper'
import Time from './time.jpg'
import logo from '../logo.svg'
import Logo from '../Logo'
import Button from '../components/Button'
import {
  faMapMarkerAlt,
  faChartBar,
  faBus,
  faInfoCircle,
  faFileAlt,
  faAmbulance,
  faServer,
  faUniversity,
  faChartLine,
  faMapMarkedAlt,
  faCog,
  faDesktop,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {css, keyframes} from 'emotion'
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
    background: url(${logo});
    filter: invert(100%);
    opacity:.6;
    background-position: 90% bottom;
    background-repeat:no-repeat;
    transform: rotate(30deg) scale(1.2);
  }
`
const Header = styled('div')`
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
const HalfContainer = styled('div')`
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
const FullContainer = styled('div')`
margin: 0 5vw 0 5vw;
width:90vw;
background:transparent;
color:black;
h1{
  font-size:3rem;
}
p{
  line-height:1.5em;
  font-size:1.1em;
  letter-spacing:2px;

}
`
const Inline = styled('div')`
display:grid;
grid-template-columns: .2fr 1fr;
grid-column-gap:10px;
color: ${props => props.soon ? props.theme.colors.secondLight: 'black'};
position:relative;
h2{
  letter-spacing:2px;
  margin-left:2em;
}
&::after{
  content: ${props => props.soon ? '"Coming soon"' : 'none'};
  display:block;
  border: 2px solid ${props => props.theme.colors.primary};
  background: white;
  padding: 5px;
  color: black;
  top:0;
  right:0;
  width: 25%;
  position: absolute;
  text-align:center;
  transform: rotate(10deg);
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
const Line = styled('div')`
background:
  /* On "top" */
  repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    ${props => props.theme.colors.primary} 10px,
    ${props => props.theme.colors.primary} 20px
  );
  width:100%;
  height:20px;
`
const spin = keyframes`
from {transform:rotate(0deg);}
  to {transform:rotate(360deg);}
`
const blink = keyframes`
  0%, 100%{
    opacity:1;
  }
  10%{
    opacity: .2;
  }
`
const SourcesAnimation = styled('div')`
  width: 50%;
  .sources{
    display:flex;
    justify-content:space-around;
    animation: ${blink} 1s ease 0s infinite;
  }
  .process{
    margin:2em 0 2em 0;
    width:100%;
    display:flex;
    justify-content: center;
    transform: scale(1.2);
    svg{
      stroke-width:20;
      stroke: ${props => props.theme.colors.primary};
      path{
        fill:transparent;
      }

    }
    animation: ${spin} 5s infinite linear;
  }
  .dest{
    animation: ${blink} 1s ease 1.2s infinite;
    width:100%;
    display:flex;
    justify-content: center;
    align-items:center;
    font-weight:normal;
    svg{
      display:none;
    }
  }


`
const Box = styled('div')`
  width:80%;
  border-top: 7px solid ${props => props.theme.colors.primary};
  padding:10px;
  background:black;
  color:white;
  h1{
    margin-top:0;
  }
`
const BoxWrapper = styled('div')`
  width:50%;
  display:flex;
  justify-content:center;
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
     <Header>
<h1>Wiesz, że zostało mało czasu, <br/>a nie wiesz gdzie chcesz iść?</h1>
<p>Nie tylko, ty masz ten problem! Będziemy zmierzać się z tym razem w tym roku, ale
  po co utrudniać, coś, co może być prostsze!
  Możesz odwiedzić każdy licealny zakątek internetu
  albo znaleźć swoją szkołę marzeń w trzy klinknięcia!
</p>
<LightButton>Zobacz, jak to działa</LightButton>
</Header>
</First>


     <HalfContainer>
       <h1>To prostsze!</h1>
       <p>Nadal nie mówimy, że najławiejsze. <br />To twój wybór, ale cieszymy się, że możemy Ci go ułatwić.</p>
       <h2 className={css`margin: 2em 0 2em 0;`}>Filtruj na podstawie kryteriów:</h2>
       <InlineWrapper>
         <Inline>
           <Centered>
           <FontAwesomeIcon icon={faInfoCircle} size="3x" />
           </Centered>
           <Centered notHorizontal>
           <h2>Podstawowe informacje</h2>
           </Centered>
         </Inline>
       <Inline soon>
         <Centered>
         <FontAwesomeIcon icon={faBus} size="3x" />
              </Centered>
         <Centered notHorizontal>
         <h2>Dojazd komunikacją</h2>
              </Centered>
       </Inline>

       <Inline>
         <Centered>
         <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" />
         </Centered>
         <Centered notHorizontal>
         <h2>Lokalizacja</h2>
              </Centered>
       </Inline>

       <Inline soon>
         <Centered>
         <FontAwesomeIcon icon={faFileAlt} size="3x" />
              </Centered>
         <Centered notHorizontal>
         <h2>Zdawalność matur</h2>
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
       <Inline soon>
         <Centered>
         <FontAwesomeIcon icon={faAmbulance} size="3x" />
              </Centered>
         <Centered notHorizontal>
         <h2>Wypadki w szkołach</h2>
              </Centered>
       </Inline>


       </InlineWrapper>
     </HalfContainer>

     <FullContainer background="primary" className={css`
              display:flex;
              align-items:center;
              margin-top:7vh;
           `}>

       <SourcesAnimation>
         <div className="sources">
           <FontAwesomeIcon icon={faUniversity} size="3x"/>
           <FontAwesomeIcon icon={faMapMarkedAlt} size="3x"/>
           <FontAwesomeIcon icon={faChartLine} size="3x"/>
           <FontAwesomeIcon icon={faServer} size="3x"/>

         </div>
         <div className="process">
           <FontAwesomeIcon icon={faCog} size="3x"/>
         </div>
       <div className="dest">
         <Logo />
       </div>
       </SourcesAnimation>
       <BoxWrapper>
         <Box>
           <h1>Jak to działa?</h1>
           <h2>Pobieramy dane z różnych źródeł, aby móc przedstawić Ci je w jak najlepszej postaci.</h2>
           <p>
             Korzystamy z danych Urzędu Miasta Warszawy, aby pobrać listę szkół oraz średnie liczby punktów,
             na bierząco łączymy się z wieloma serwisami lokalizacyjnymi, aby dostarczyć Ci
             informacje o
             jak najlepszym połączeniu komunikacyjnym z twoją wymarzoną szkołą.
             <br />
             A to wszystko zebrane tylko w jednym miejscu...
           </p>
         </Box>
       </BoxWrapper>
     </FullContainer>
     <Line />
     <FullContainer>
       <h1>Zawsze aktualne</h1>
       <h2>Pragniemy, abyś już nigdy nie musiał martwić się o prawidłowość danych.
         </h2>
         <p className={css`width:50%`}>Dzięki naszym edytorom, którzy sprawdzają nasz portal oraz wsparciu (mamy nadzieję)
           Waszej społeczności będziemy budować coś przydatnego i fajnego
         </p>
     </FullContainer>

   </PageWrapper>
   </>
 )
 }
 }
