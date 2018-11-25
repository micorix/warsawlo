import React, {Component} from 'react'
import styled from 'react-emotion'
import SiteWrapper from '../components/SiteWrapper'
import Tag from '../components/Tag'
import subjects from '../data/subjects.json'
import {Redirect} from 'react-router-dom'
import bg from './bg.jpg'
const SearchInput = styled('input')`
  all:unset;
  padding:10px;
  background rgb(230,230,230);
  border: 3px solid rgb(230,230,230);
  border-radius:3px;
  font-size: 1.2em;
  width:100%;
  transition: .2s all;
  &:focus{
    border: 3px solid rgb(210,210,210);
  }
`
const PageWrapper = styled(SiteWrapper)`
  display:flex;
  justify-content:center;
  background: ${props => props.theme.colors.light.replace('rgb', 'rgba').replace(')', ',0.8)')};

  position:relative;

  &::after{
    content: '';
    position: absolute;
    z-index:-1;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background url('${bg}');
    background-size:cover;
  }
`
const Container = styled('main')`
  margin-top:10%;
  width:50%;
  h1{
    font-family: ${props => props.theme.fonts.primary};
  }
  h1,h5{
    text-align:center;
  }
  h5{
    margin: 20px 0 20px 0;
  }
  .tags{
    display:flex;
    justify-content:center;
     flex-wrap: wrap;
  }
  .search{
    display: flex;
    justify-content: center;
    margin-top:20px;

    button{
      all:unset;
      cursor:pointer;
      padding:10px;
      font-size:1.5em;
      border: 2px solid rgb(210,210,210);
      color:black;
      border-radius: 3px;
      border: 2px solid ${props => props.theme.colors.primary};
      transition: .2s all;
      &:hover{
        color:${props => props.theme.colors.primary};
      }
    }
  }
`
export default class Home extends Component{
 constructor(props){
   super(props)
   this.state = {
     active: [],
     query: ''
   }
  }
  handleActive = (subject) => {
    console.log(subject);
    if(this.state.active.includes(subject)){
      this.setState(state => ({
        active: state.active.filter(e => e != subject)
      }))
    }else{
      console.log('add');
      this.setState(state => ({
        active: [...state.active, subject]
      }))
    }
  }
  handleType = e => {
    let query = e.target.value
    this.setState({query})
  }
  handleSend = () => {
    this.setState({
      sent:true
    })
  }
 render = () => {
   if(this.state.query){
     return <Redirect to={{
       pathname: '/search',
       search: `?query=${this.state.query.trim().split(' ').join('+')}`,
       state: {
         focus: true
       }
     }} />
   }
   if(this.state.sent){
     return <Redirect to={{
       pathname: '/search',
       search: `?subjects=${this.state.active.join(',')}`
     }} />
   }
   return (<PageWrapper>
     <Container>

     <h1>Gdzie chcesz iść?</h1>
     <SearchInput placeholder="Wpisz nazwę szkoły" onChange={this.handleType}/>
     <h5>lub wybierz co Cię interesuje</h5>
     <div className="tags">
     {
       subjects.map((subject, i) => (
         <Tag key={subject}
          color={subject[1]}
          active={this.state.active.includes(subject[0])}
          onClick={this.handleActive.bind(this, subject[0])}>{subject[0]}</Tag>
       ))
     }
     </div>
     <div className="search">
     <button onClick={this.handleSend}>Znajdź mi szkołę</button>
     </div>
     </Container>

 </PageWrapper>)
 }
 }
