import React, {Component} from 'react'
import styled from 'react-emotion'
import SiteWrapper from '../components/SiteWrapper'
import Time from './time.jpg'
import logo from '../logo.svg'
import Logo from '../Logo'
import Button from '../components/Button'
import Break from '../components/Break'
import {Link} from 'react-router-dom'
import { animateScroll} from 'react-scroll'
import withBadge from '../utils/withBadge'
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
  faExclamation,
  faQuestion,
  faUsers,
  faStar
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
  margin:20px;
  border-color:white;
  font-size:1.5em;
`
const LightButtonWithBadge = withBadge(LightButton, {
  title: 'BETA',
  color: 'secondary'
})
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
padding: 0 5vw 0 5vw;
width:90vw;
background:${props => props.background ? props.theme.colors[props.background] : 'transparent'};
color:${props => props.background ? 'white' : 'black'};
${props => props.shape &&
  `clip-path: polygon(0 20%, 100% 0, 100% 80%, 0% 100%);
   padding-top:5%;
   padding-bottom:5%;`
}
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
`
const InlineSoon = withBadge(Inline, {
  title: 'Coming soon',
  color: 'primary'
})
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

  padding:10px;

  h1{
    margin-top:0;
  }
`
const BoxWrapper = styled('div')`
  width:50%;
  display:flex;
  justify-content:center;
`
const StartButton = styled(Button)`
  font-size: 3em;
  background: ${props => props.theme.colors.secondary};
  color:white;
  border-color: ${props => props.theme.colors.secondary};
  &:hover{
    background:transparent;
    color:${props => props.theme.colors.secondary};
  }
`
 export default class About extends Component{
 constructor(props){
 super(props)
 }
 scrollToContent = () => {
   animateScroll.scrollTo(window.innerHeight*0.8);
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
<LightButton onClick={this.scrollToContent}>Czytaj dalej</LightButton>
<Link to='/start' className={css`all:unset;margin: 20px 0 0 0;`}>
<LightButtonWithBadge>Znajdź mi szkołę</LightButtonWithBadge>
</Link>
</Header>
</First>


     <HalfContainer>
       <h1>To prostsze!</h1>
       <Break color="secondary" />
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
       <InlineSoon>
         <Centered>
         <FontAwesomeIcon icon={faBus} size="3x" />
              </Centered>
         <Centered notHorizontal>
         <h2>Dojazd komunikacją</h2>
              </Centered>
       </InlineSoon>

       <Inline>
         <Centered>
         <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" />
         </Centered>
         <Centered notHorizontal>
         <h2>Lokalizacja</h2>
              </Centered>
       </Inline>

       <InlineSoon>
         <Centered>
         <FontAwesomeIcon icon={faFileAlt} size="3x" />
              </Centered>
         <Centered notHorizontal>
         <h2>Zdawalność matur</h2>
              </Centered>
       </InlineSoon>
       <Inline>
         <Centered>
         <FontAwesomeIcon icon={faChartBar} size="3x" />
              </Centered>
         <Centered notHorizontal>
         <h2>Progi punktowe</h2>
              </Centered>
       </Inline>
       <InlineSoon>
         <Centered>
         <FontAwesomeIcon icon={faStar} size="3x" />
              </Centered>
         <Centered notHorizontal>
         <h2>Oceny innych</h2>
              </Centered>
       </InlineSoon>


       </InlineWrapper>
     </HalfContainer>

     <FullContainer background="secondary" shape  className={css`
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
           <Break color="primary" />
           <h2>Pobieramy dane z różnych źródeł, aby móc przedstawić Ci je w jak najlepszej postaci.</h2>
           <p>
             Korzystamy z danych Urzędu Miasta Warszawy, aby pobrać listę szkół oraz średnie liczby punktów,
             na bierząco łączymy się z wieloma serwisami lokalizacyjnymi, aby dostarczyć Ci
             informacje o
             jak najlepszym połączeniu komunikacyjnym z twoją wymarzoną szkołą.
             <br />
             A to wszystko zebrane tylko w jednym miejscu...
           </p>
           <Link to="/dev" className={css`
             color:white;
             &:visited{
               color:white;
             }
             `}>Dowiedz się o tym więcej na naszym blogu</Link>
         </Box>
       </BoxWrapper>
     </FullContainer>

     <FullContainer className={css`
              display:flex;
              align-items:center;
           `}>

           <div className={css`
             width:50%;
             `}>
             <h1>Nieaktualne dane?</h1>
             <Break color="secondary" />
             <h2>Nobody's perfect...</h2>
               <p className={css`width:100%`}>
               Przetwarzając ogromne ilości informacji może wkraść się do danych jakiś błąd.
               Jeżeli natkniesz się na niego, zgłoś go.
               Nasi moderatorzy zajmą się tym tak szybko, jak tylko będę mogli.
               </p>
             </div>

     <div className={css`
       width:50%;
       display:flex;
       align-items:center;
       justify-content:center;
       `}>
     <FontAwesomeIcon icon={faExclamation} size="10x"/>
     <FontAwesomeIcon icon={faQuestion} size="10x"/>
     </div>

     </FullContainer>
     <FullContainer className={css`
              display:flex;
              align-items:center;
              margin-top:7vh;
           `}>
     <div className={css`
       width:50%;
       display:flex;
       align-items:center;
       justify-content:center;
       `}>
     <FontAwesomeIcon icon={faUsers} size="10x"/>
     </div>
     <BoxWrapper>
       <Box>
       <h1>Społeczność</h1>
       <Break color="secondary" />
       <h2>Ten portal tworzy każdy z nas</h2>
         <p className={css`width:100%`}>
        Idziesz dopiero do liceum i zrobiłeś ogromny research, czy może masz już rekrutacje za sobą i wiesz jak to działa?
        Podziel się swoimi spostrzeżeniami tutaj.
        Każdego ucznia ostatniej klasy gimnazjum czy podtawówki co roku czeka to samo.
        Pomagajmy sobie nawzajem.  WarsawLO to portal tworzony przez uczniów dla uczniów.
       <br />
         <br />
         <Break color="secondary" />
          <br />

         Masz jakiś pomysł? Myślisz, że fajnie byłoby coś tutaj dodać? To świetnie!
         Napisz do nas na Messengerze albo mailem na ideas@warsawlo.pl
         </p>
       </Box>
     </BoxWrapper>
   </FullContainer>
   <FullContainer className={css`
     padding-top:2em;
     display:flex;
     align-items:center;
     justify-content:center;
     margin: 5em 0 5em 0;
     `}>

     <StartButton>Znajdź swoją szkołę już teraz</StartButton>
   </FullContainer>
   <Line/>
     <FullContainer  background="primary" className={css`padding-top:2em`}>

       <h1 className={css`margin-top:0`}>Kto za tym stoi?</h1>
       <Break color="light" />
       <h2>Hej!</h2>
         <p className={css`width:100%`}>

         Jesteśmy grupą uczniów z warszawskich gimnazjów a zarazem pasjonatów informatyki.
         Rekrutacja spotka lub spotkała każdego z nas. Wszyscy mówią, że chcą się dostać do jak najlepszej szkoły,
         ale przecież to, czy dana szkoła jest najlepsza to kwestia subiektywna.
         Chcieliśmy choć trochę uprościć ten trudny wybór szkoły średniej.
         Nasunęło się nam na myśl, że czemu nie rozwiązać tego problemu właśnie za pomocą aplikacji lub strony internetowej?
         Tak zrodziło się WarsawLO. Całkowicie pozaszkolny, niekomercyjny projekt open-source.
         Wiemy, że nasza strona jest niedoskonała, ale liczymy, że z Waszą pomocą damy radę ;)


       </p>
         <Break color="light" />
         <h2>Kontakt</h2>
          info@warsawlo.pl
         <br />
     </FullContainer>
   </PageWrapper>
   </>
 )
 }
 }
