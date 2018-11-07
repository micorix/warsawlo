
import React from 'react'
import mapboxgl from 'mapbox-gl'
import {css} from 'emotion'
import {connect} from 'react-redux'
import addSchoolMarkers from './schoolMarkers'
import {injectGlobal} from 'emotion'
import {selectSchool} from '../../store/actions/select'
mapboxgl.accessToken = 'pk.eyJ1IjoibWljb3JpeHBhYm1lZCIsImEiOiJjamxrcGN2MW0wbXlxM2twaXZjdXU1eDEyIn0.4_sxaF5tHhMDudaaJ8_vzQ';

injectGlobal`
@import url('https://api.mapbox.com/mapbox-gl-js/v0.50.0/mapbox-gl.css');
`
class Map extends React.Component {
  constructor(props){
    super(props)
    this.mapContainer = React.createRef()
  }
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [21.009241599999996, 52.2320503],
      zoom: 12
    })
    this.map.addControl(new mapboxgl.NavigationControl());
    addSchoolMarkers({
      map: this.map,
      selectSchool: this.props.selectSchool
    })
  }
  componentDidUpdate = (prevProps) => {
    if(prevProps.select.school != this.props.select.school){
      let position = this.props.select.school.location.position
      this.map.easeTo({
        zoom: 15,
        center: [position.Longitude, position.Latitude]
      });
      setTimeout(() => {
        var layers = this.map.getStyle().layers;

    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
        }
    }
    this.map.easeTo({
      center: [position.Longitude, position.Latitude],
      zoom: 17,
      pitch: 60
    })
    this.map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#aaa',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "height"]
            ],
            'fill-extrusion-base': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "min_height"]
            ],
            'fill-extrusion-opacity': .6
        }
    }, labelLayerId)
      }, 5000)
    }
  }

  render() {
    let navHeight = this.props.style.navHeight ? this.props.style.navHeight : 0;
    return (<div ref={this.mapContainer} className={css`
    width:${this.props.sidebar ? '70%' : '100%'};
    float:right;
    height:calc(100vh - ${navHeight}px);
    div[class^='mapboxgl-ctrl-'], .mapboxgl-marker{
      top:auto;
      left:auto;
    }
      `}></div>)
}
}
const mapStateToProps = (state, ownProps) => {
  return ({
    style: state.style,
    select: state.select
})
}

const mapDispatchToProps = (dispatch) => ({
  selectSchool: schoolID => dispatch(selectSchool(schoolID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Map);
