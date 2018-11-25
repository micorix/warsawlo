import React, {Component} from 'react'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import styled from 'react-emotion'
import {css} from 'emotion'
import {connect} from 'react-redux'
import {selectSchool} from '../../store/actions/select'
import {Link} from 'react-router-dom'
import Subjects from '../../data/subjects.json'
import Tag from '../Tag'
const SmallTag = styled(Tag)`
  font-size: 0.8em;
  margin: 2px;
`
const SitePreview = styled('div')`
  position:relative;
  width:${props => props.dimensions.width}px;
  height:${props => props.dimensions.height * 0.4}px;
  padding: 0;
  overflow: hidden;
  margin: 0 auto 0 auto;
  iframe{
    width:${props => props.dimensions.width*4}px;
    height:${props => props.dimensions.height * 4}px;
    border: 0;
    transform: scale(0.25);
    transform-origin: 0 0;
    pointer-events:none;
    overflow:hidden;
    display: block;
  }
  &::after{
    content: '${props => props.website ? '' : 'LO'}';
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:2;
    background:${props => props.theme.colors.primary};
    opacity:0.5;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:${props => props.dimensions.height * 0.4 * 0.8}px;
    font-family ${props => props.theme.fonts.secondary};
    color:white;
  }
`
const cardStyle = css`
  overflow:hidden;
  height:100%;
  width:100%;
`
const getWikiSummary = (name, signal) => new Promise(async (resolve) => {
  let searchRes, pageRes
  try{
  searchRes = await fetch(`https://pl.wikipedia.org/w/api.php?action=opensearch&limit=1&namespace=0&format=json&&origin=*&search=${name}`,
    {
      signal
    })
  }catch{
    resolve('')
    return
  }
  if(!searchRes){
    resolve('')
    return
  }
  let response = await searchRes.json()
  if(!response[1]){
    resolve('')
    return
  }
  let normalizedName = response[1]
  try {
  pageRes = await fetch(`https://pl.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=${normalizedName}`,
  {
    signal
  })
} catch (e) {
  console.log(e);
  resolve('')
  return
}
  if(!pageRes){
    resolve('')
    return
  }
  response = await pageRes.json()
  if(response.query === undefined || !response.query.pages || !response.query.pages.length < 1){
    resolve('')
    return
  }
  console.log(response);
  let site = Object.values(response.query.pages)[0]
  if(site){
    let text = site.extract.split(/–(.+)/)[1].trim()
    resolve(text.charAt(0).toUpperCase()+text.slice(1))
    return
  }
  resolve('')
})
class SchoolCard extends Component{
 constructor(props){
 super(props)
 this.state = {
   summary: '',
   dimensions: {},
   loadError: false
 }
 this.el = React.createRef()
 this.frame = React.createRef()
 }
 getDimensions = () => {
   this.setState({
     dimensions: {
       height: this.el.current.clientHeight,
       width: this.el.current.clientWidth
     }
   })
 }
 componentDidMount = () => {
   this.timeout = setTimeout(this.fireIframeError, 10000)
   this.getDimensions()
   window.addEventListener('resize', this.getDimensions)
   this.controller = new AbortController()
   this.signal = this.controller.signal

   getWikiSummary(this.props.school.name.full, this.signal).then(summary => {
     this.setState({
       summary
     })
   }).catch(err => {
     console.log(err);
   })
 }
 componentWillUnmount = () =>{
   this.controller.abort()
   window.removeEventListener('resize', this.getDimensions)
   clearTimeout(this.timeout)
 }
 selectSchool = () => {
   this.props.selectSchool(this.props.schoolID)
 }
 handleLoad = () => {
   clearTimeout(this.timeout)
 }
 fireIframeError = (e) => {
   if(e){
     console.log(e);
   }
   this.setState({
     loadError: true
   })
 }
 render = () => {
   return (
     <div ref={this.el}>
       <Card onClick={this.selectSchool} className={cardStyle}>
       <SitePreview dimensions={this.state.dimensions} website={!this.state.loadError & Boolean(this.props.school.contact.website)}>
       {
         (() => {
           if(!this.state.loadError && this.props.school.contact.website)
             return <iframe src={`http://${this.props.school.contact.website}`} ref={this.frame} onLoad={this.handleLoad}></iframe>

           return null
         })()
       }
       </SitePreview>
         <CardBody>
           <CardTitle>{this.props.school.name.full}</CardTitle>
           <CardSubtitle>{this.props.school.location.address.District}</CardSubtitle>
           {(() => {
            if(this.props.school.profiles){
              return this.props.school.profiles.overview.availableSubjects.map(subject => {
                let color = Subjects.filter(arr => arr[2] == subject)[0]
                color = color ? color[1] : 'black'
                return <SmallTag color={color}>{subject}</SmallTag>
              })
            }
            return null
           })()}
           <CardText>{this.state.summary.length > 100 ? this.state.summary.substr(0, 100).trim()+' ...' : this.state.summary}</CardText>
           <Link to={`/school/${this.props.school.name.full.split(' ').join('+')}`}><Button>Więcej</Button></Link>
         </CardBody>
       </Card>
     </div>
   )
 }
 }

 const mapDispatchToProps = (dispatch) => ({
   selectSchool: schoolID => dispatch(selectSchool(schoolID))
 })

 // Use connect to put them together
 export default connect(null, mapDispatchToProps)(SchoolCard);
