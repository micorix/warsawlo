/* eslint-env worker */
import Engine from './engine'

  let self = this
  const apiURL = 'https://cdn.jsdelivr.net/gh/WarsawLO/data@92706ad/data/data.json'
  let data = {}
  let engine = null
  fetch(apiURL).then(res => res.json()).then(downloadedData => {
    data = downloadedData
    engine = new Engine(downloadedData)
    postMessage(JSON.stringify({
      result: downloadedData,
      paramsURI: ''
    }))
  })

  // engine.search(this.state.query, this.state.filters)
// eslint-disable-next-line

	addEventListener('message', e => {
		if (!e) return
    let { query, filters, params } = JSON.parse(e.data)
    let args = [
      query ? query : '',
      filters
    ]
    if(params){
      let fromParams = engine.fromParams(params)
      args[0] = fromParams.query
      args[1] = fromParams.filters
    }
    engine.search(...args).then(result => {
      postMessage(JSON.stringify({
        result,
        paramsURI: engine.generateParamsURI(...args)
      }))
    })
	})
