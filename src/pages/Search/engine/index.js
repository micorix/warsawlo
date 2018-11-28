import Fuse from 'fuse.js'
import SchoolData from '../../../data/data.json'
import * as tests from './tests'
import transformParam from './transformParams'
export default class Engine {
  constructor() {
    this.byQuery = new Fuse(SchoolData, {
      keys: [
        'name.full',
        'name.short'
      ]
    })
  }
  generateTests = (filters) => Object.keys(filters).map(key => tests[key](filters[key]))
  generateParamsURI = (query, filters) => {
    let params = new URLSearchParams()
    for(let [name, value] of Object.entries(filters)) {
      if(name !== 'query' && value)
        params.set(name, transformParam(name, value))
    }
    if(query){
      params.set('query', query)
    }

  return decodeURIComponent(params.toString())
}
  fromParams = (params) => {
    let searchParams = new URLSearchParams(params)
    let filters = {}
    let query = searchParams.has('query') ? searchParams.get('query') : ''

    for(let [name, value] of searchParams.entries()) {
      if(name !== 'query' && value.trim().length > 0)
        filters[name] = transformParam(name, value, true)
    }
    return {
      query,
      filters
    }
  }

  search = (query, filters) => new Promise((resolve, reject) => {
    if (query.trim().length === 0) {
      this.queryResult = SchoolData
    } else {
      this.queryResult = this.byQuery.search(query)
    }
    this.runTests = this.generateTests(filters)
    let url = ''
    let result = this.queryResult
    if (this.runTests.length !== 0) {
      result = this.queryResult.filter(school => this.runTests.every(test => test(school)))
    }
    resolve(result)



  })
}
