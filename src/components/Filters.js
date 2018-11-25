import React, {Component} from 'react'
import styled from 'react-emotion'
import {css} from 'emotion'
import { Range, createSliderWithTooltip} from 'rc-slider'
import 'rc-slider/assets/index.css'
import subjects from '../data/subjects.json'
import Tag from './Tag'
const Wrapper = styled('div')`
  height:100%;
  width:25vw;
  display:flex;
  justify-content:center;
  position:fixed;

  .box{
    margin-top:10vh;
    width:80%;
    height:70vh;
    background:white;
    // box-shadow: 0 37.125px 70px -12.125px rgba(0,0,0,0.3);
  }
`
const PointsRange = styled(createSliderWithTooltip(Range))`
  margin: 0 10px 0 10px;
  width: calc(100% - 20px);
  .rc-slider-rail{
    background: rgb(210,210,210);
  }
  .rc-slider-handle{
    border: 2px solid ${props => props.theme.colors.primary};
    &:active{
      box-shadow:0;
    }
  }
  .rc-slider-track{
    background: ${props => props.theme.colors.primary};
  }
`
const initialState = {
  subjects: [],
  init:true
}
 export default class Filters extends Component{
 constructor(props){
 super(props)
 this.state = initialState
 }
 static getDerivedStateFromProps(props, state) {
    if (state.init && props.data && props.data.subjects && props.data.subjects.length > 0 || props.data.query) {
      return {
        ...props.data,
        init: false
      }
    }
    return null
  }
 handleSubjectsChange = (subject) => {
   console.log(subject, this.state.subjects.includes(subject));
     this.setState(state => ({
       subjects: this.state.subjects.includes(subject) ? state.subjects.filter(e => e != subject) : [...state.subjects, subject]
     }), () => {
       this.props.onChange({
         subjects: this.state.subjects
       })
     })
 }
 render = () => {
 return (
   <Wrapper>
   <div className="box">
   {
     subjects.map(subject => {
       return (
         <Tag
         key={subject}
         active={this.state.subjects.includes(subject[0])}
         color={subject[1]}
         onClick={this.handleSubjectsChange.bind(this, subject[0])}
         >{subject[0]}</Tag>

       )
     })
   }
   <h6>Liczba punktów:</h6>
   <PointsRange min={0} max={200} tipFormatter={value => `${value} pkt`}/>
   </div>
   </Wrapper>
 )
 }
 }
