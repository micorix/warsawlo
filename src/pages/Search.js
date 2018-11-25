import React, {Component} from 'react'
import styled from 'react-emotion'
import SiteWrapper from '../components/SiteWrapper'
import Filters from '../components/Filters'
import Card from '../components/Card/index'
import SchoolData from '../data/data.json'
import * as JsSearch from 'js-search'
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

  }
`
const SearchInput = styled('input')`
  all:unset;
  display:inline-block;
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
`
// function resizeGridItem(item){
//   if(!item)
//     return
// let grid = document.querySelector(".results");
// let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
// let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'))
// let contentHeight = item.querySelector('.card-body').getBoundingClientRect().height
// let frameHeight = item.querySelector('div:first-of-type').getBoundingClientRect().height
// let rowSpan = Math.ceil((contentHeight+frameHeight+rowGap)/(rowHeight+rowGap));
//   item.style.gridRowEnd = "span "+rowSpan
//
// }
// function resizeAllGridItems(){
// let allItems = document.querySelectorAll(".results > div")
// console.log(allItems);
// for(let x=0;x<allItems.length;x++){
//   console.log(allItems[x]);
//   resizeGridItem(allItems[x]);
// }
// }

 export default class Search extends Component{
 constructor(props){
 super(props)
 this.input = React.createRef()
 this.state = {
   query: '',
   filters: {},
   result: []
 }
 this.params = new URLSearchParams()
 this.search = new JsSearch.Search(['name', 'short'])
  this.search.searchIndex = new JsSearch.UnorderedSearchIndex()
 this.search.addIndex(['name', 'full'])
 this.search.addDocuments(SchoolData)
 window.search = this.search
 console.log(SchoolData[0], this.search);
}
componentDidMount = () => {

  let params = new URLSearchParams(this.props.location.search)
  if(params.get('subjects')){
    this.setState(state => ({
      filters: {
        ...state.filters,
        subjects: params.get('subjects').split(',')
      }
    }))
  }
  if(params.get('query')){
    this.setState({
      query: params.get('query'),
      result: this.search.search(params.get('query'))
    })
  }
  if(this.props.location.state&& this.props.location.state.focus){
    setTimeout(() => this.input.current.focus(), 100)
  }
}
componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location && this.input.current !== document.activeElement ) {
      this.input.current.focus()
    }
    // resizeAllGridItems()
  }
handleSearch = async(e) => {
  this.setState({
    query: e.target.value
  }, () => {
    this.params.set('query', this.state.query)
    this.props.history.push(`${this.props.location.pathname}?${this.params.toString()}`)
    if(this.state.query.trim().length === 0){
      this.setState({
        result: SchoolData
      })
    }else{
      this.setState({
        result: this.search.search(this.state.query)
      })
    }

  })
}
updateFilters = (obj) => {
  let [name, value] = Object.entries(obj)[0]
  if(Array.isArray(value)){
    this.params.set(name,value.join(','))
  }
  // let result = this.state.result
  // switch(name){
  //   case 'subjects':
  //     result = this.state.result.filter(school => {
  //       if(school.profiles){
  //         return false
  //       }
  //       let found = false
  //       value.forEach(v => {
  //         if(school.profiles.overview.availableSubjects.contains(value))
  //           found = true
  //       })
  //       return found
  //
  //     })
  // }
  this.setState(state => ({
    filters: {...state.filters, ...obj},

  }), () => {
    this.props.history.push(`${this.props.location.pathname}?${this.params.toString()}`)
  })
}
 render = () => {
 return (
   <PageWrapper>

   <aside>
   <Filters data={this.state.filters} onChange={this.updateFilters}/>
   </aside>

   <div>
   <div className="input-wrapper">
   <h4 style={{marginRight:20}}>Szukaj:</h4>
   <SearchInput innerRef={this.input} value={this.state.query} onChange={this.handleSearch}/>
   </div>
   <div  className="results">
   {
     this.state.result.map(school => {
       return <Card key={school.name.full} school={school} schoolID={SchoolData.indexOf(school)} />
     })
   }
   </div>
   </div>
   </PageWrapper>
 )
 }
 }
