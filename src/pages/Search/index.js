import React, {Component} from 'react'
import styled from 'react-emotion'
import SiteWrapper from '../../components/SiteWrapper'
import Filters from '../../components/Filters'
import Loader from '../../components/Loader'
import Card from '../../components/Card/index'
import SchoolData from '../../data/data.json'
import Engine from './engine'
import {css} from 'emotion'
import {Redirect} from 'react-router-dom'
import posed, { PoseGroup  } from 'react-pose'
import worker from './worker'
import WebWorker from './WebWorkerSetup'
const PoseCard = posed(Card)()

const PageWrapper = styled(SiteWrapper)`
    background: ${props => props.theme.colors.light};
    display: grid;
    grid-template-columns: 25% 75%;


  .input-wrapper{
    width:75vw;
    height:10vh;
    display:flex;
    justify-content:center;
    align-items:flex-end;
    position: fixed;
    z-index: 10;
    background: ${props => props.theme.colors.light};
    padding-bottom:20px;
  }

  .results{
    margin-top: 10vh;
    margin-left:30px;
    display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-auto-rows: 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  position: relative;
  min-height:50%;
  }
`
const SearchInput = styled('input')`
  all:unset;
  display:block;
  height: 1.2em;
  padding:10px;
  background rgb(230,230,230);
  border: 3px solid rgb(230,230,230);
  border-radius:3px;
  font-size: 1.2em;
  width:50%;
  transition: .2s all;
  &:focus{
    border: 3px solid rgb(210,210,210);
  }
  position:relative;
  &::after{
    content: 'xd';
     display: block;
    position:absolute;
    top:calc(100% + 10px);
    left:0;
  }
`
const loaderStyle = css`
position: absolute;               /* 2 */
 top: 50%;                         /* 3 */
 transform: translate(0, -50%) }   /* 4 */
`

 export default class Search extends Component{
 constructor(props){
 super(props)
 this.input = React.createRef()
 this.engine = new Engine()
 this.state = {
   query: '',
   filters: {
     subjects: [],
     pointsRange: [0, 200]
   },
   result: [],
   loading: false,
   error: null,
   errorInfo: null
 }
}
componentDidMount = () => {
  let {query, filters} = this.engine.fromParams(this.props.location.search)
  this.setState({
     query,
     filters
   }, () => this.search())
   this.worker = new WebWorker(worker)
   this.worker.addEventListener('message', console.log)
}
componentDidUpdate(prevProps) {
    if (this.input.current && this.props.location !== prevProps.location && this.input.current !== document.activeElement ) {
      this.input.current.focus()
    }
  }
  componentDidCatch(error, errorInfo) {
  this.setState({
    error: error,
    errorInfo: errorInfo
  })
}
handleSearch = (e) => {
    this.setState({
      loading: true,
      query: e.target.value
    }, () => this.search())
  }
search = () => {
  this.engine.search(this.state.query, this.state.filters).then(result => {
    console.log(result);
    this.setState({
    result,
    loading: false
  })
  let paramsURI = this.engine.generateParamsURI(this.state.query, this.state.filters)
  this.props.history.push(`${this.props.location.pathname}?${paramsURI}`)
})
}
updateFilters = (obj) => {
  this.setState(state => ({
    filters: {
      ...state.filters,
       ...obj
     },
    }), () => this.search())
}
 render = () => {
   if(this.state.error){
     return <Redirect to={{
         pathname: '/error',
         state: {
           error: this.state.error,
           errorInfo: this.state.errorInfo
         }
       }} />
   }
 return (
   <PageWrapper>

   <aside>
   <Filters data={this.state.filters} onChange={this.updateFilters}/>
   </aside>

   <div>
   <div className="input-wrapper">
   <h4 style={{marginRight:20}}>Szukaj:</h4>

   <SearchInput innerRef={this.input} value={this.state.query} onChange={this.handleSearch} time={30}/>

   </div>
   <div  className="results">
   {(() => {
     if(this.state.loading)
      return <Loader className={loaderStyle}/>
     return (
       <PoseGroup flipMove={true} preEnterPose="preEnter">
       {this.state.result.map(school => {
         // return <Posed key={school.meta.regon}>{school.name.full}</Posed>
         return (<PoseCard
           key={school.meta.regon}
           school={school}
           schoolID={SchoolData.indexOf(school)}
           filters={this.state.filters}
            />)
          })
        }
       </PoseGroup>
     )

   })()}
   </div>
   </div>
   </PageWrapper>
 )
 }
 }
