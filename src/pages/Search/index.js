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
import Button from '../../components/Button'
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
    align-items:center;
    position: fixed;
    z-index: 10;
    background: ${props => props.theme.colors.light};
    padding-bottom:20px;

    .meta{
      line-height: 1.2em;
      margin-left:10px;
      width:100px;
    }
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
  border-radius: 3px 0 0 3px;
  font-size: 1.2em;
  width:80%;
  transition: .2s all;
  &:focus{
    border: 3px solid rgb(210,210,210);
    border-right:3px solid rgb(230,230,230);
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
const SearchButton = styled(Button)`
  background: ${props => props.theme.colors.primary};
  color:white;
  font-size:1.2em;
  height: 1.2em;
  border-width:3px;
  border-radius: 0 3px 3px 0;
  border-left:none;
  border-color: ${props => props.active ? 'rba(210,210,210)' : 'rgb(230,230,230)'};
`
const SearchForm = styled('form')`
  display:flex;
  width:50%;
`
 export default class Search extends Component{
 constructor(props){
 super(props)
 this.input = React.createRef()
 this.engine = new Engine(SchoolData)
 this.state = {
   query: '',
   filters: {
     subjects: [],
     pointsRange: [0, 200]
   },
   result: [],
   loading: true,
   error: null,
   errorInfo: null,
   notFound: false,
   fetchingDone: false,
   startTime: null,
   inputFocus: false
 }
}
componentDidMount = () => {
  // let {query, filters} = this.engine.fromParams(this.props.location.search)
  // this.setState({
  //    query,
  //    filters
  //  }, () => this.search())

   this.worker = new Worker('./worker.js', { type: 'module'})
   this.worker.addEventListener('message', e => {

     if(this.state.fetchingDone === false){
       this.setState({
         fetchingDone: true
     })
     }
     let { result, paramsURI} = JSON.parse(e.data)
     console.log(result)
     this.setState({
     result,
     loading: false,
   })
   clearTimeout(this.timeout)
   if(paramsURI)
    this.props.history.push(`${this.props.location.pathname}?${paramsURI}`)
   })
}
handleFocus = () => this.setState({
  inputFocus: true
})
handleBlur = () => this.setState({
  inputFocus: false
})
handleFormSubmit = (e) => {
  e.preventDefault()
  this.search()
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
handleInputChange = (e) => {
    this.setState({
      query: e.target.value
    })
  }
search = () => {
  if(this.state.fetchingDone){
    let { query, filters } = this.state
    clearTimeout(this.timeout)
    this.setState({
      startTime: new Date().getTime()
    })
    this.timeout = setTimeout(() => this.setState({
      loading: false,
      notFound: true
    }), 10000)
    this.worker.postMessage(JSON.stringify({
      query,
      filters
    }))
  }
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
   <SearchForm onSubmit={this.handleFormSubmit}>
   <SearchInput
    innerRef={this.input}
    value={this.state.query}
    onChange={this.handleInputChange}
    time={30}
    onFocus={this.handleFocus}
    onBlur={this.handleBlur}
    disabled={this.state.loading}/>
   <SearchButton active={this.state.inputFocus}>Szukaj</SearchButton>
   </SearchForm>
  <div className="meta">
    <div>Total: {this.state.result.length}</div>
    <div>{this.state.startTime &&<span>w {(new Date().getTime() - this.state.startTime) / 1000} s</span>}</div>
  </div>
   </div>
   <div  className="results">
   {(() => {
     if(this.state.notFound | this.state.result.length === 0)
      return (
        <div>
        <h1>Sorry</h1>
        <h3>Nie mogliśmy znaleźć tej szkoły</h3>
        </div>
      )
     if(this.state.loading)
      return <Loader className={loaderStyle}/>
     return (
  <PoseGroup>
       {this.state.result.map(school => {
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
