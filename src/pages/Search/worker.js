import Engine from './engine'
export default () => {
  const apiURL = 'https://cdn.jsdelivr.net/gh/WarsawLO/data/data/data.json'
  let data = {}
  fetch(apiURL).then(res => res.json()).then(downloadedData => {
    data = downloadedData
    postMessage('fetching done')
  })





	self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
		if (!e) return

		postMessage('hey '+data)
	})
}
