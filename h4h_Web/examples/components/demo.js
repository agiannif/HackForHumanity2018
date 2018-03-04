import React from 'react'
import ReactDOM from 'react-dom'

import Map, {Marker, GoogleApiWrapper} from '../../src/index'
import styles from './autocomplete.module.css'
import handleChange from './AlertButton'
import TableData from './TableData.js'

const Contents = React.createClass({
  getInitialState() {
    return {
      place: null,
      position: null,
      items: [],
      isLoaded: false
    }
  },

  onMapReady: function(mapProps, map) {
    this.searchNearby(map, map.center);
  },

  onSubmit: function(e) {
    e.preventDefault();

  },

  componentDidUpdate(prevProps) {
    const {google, map} = this.props;
    if (map !== prevProps.map) {
      this.renderAutoComplete();
    }
  },

  renderAutoComplete: function() {
    const {google, map} = this.props;

    if (!google || !map) return;

    const aref = this.refs.autocomplete;
    const node = ReactDOM.findDOMNode(aref);
    var autocomplete = new google.maps.places.Autocomplete(node);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      this.setState({
        place: place,
        position: place.geometry.location
      })
    })
  },

  getData: function() {
    console.log('search');
    fetch("http://192.168.1.3:55555/")
    .then(function(response) {
      console.log('here');
      return response.text();
    })
    .then(function(text) {
      console.log('Request successful', text);
      this.setState(items: text)
    })
    .catch(function(error) {
      console.log('ererr');
      log('Request failed', error)
    });
  },

  render: function() {
    const props = this.props;
    const {position} = this.state;

    return (
      <div className={styles.flexWrapper}>
        <div className={styles.left}>
        </div>
        <TableData></TableData>
        <div className={styles.right}>
          <Map {...props}
              containerStyle={{
                position: 'relative',
                height: '100vh',
                width: '100%'
              }}
              center={this.state.position}
              centerAroundCurrentLocation={false}>
                <Marker position={this.state.position} />
          </Map>
        </div>
      </div>
    )
  }
})

const MapWrapper = React.createClass({
  render: function() {
    const props = this.props;
    const {google} = this.props;

    return (
      <Map google={google}
          className={'map'}
          visible={false}>
            <Contents {...props} />
      </Map>
    );
  }
})

export default MapWrapper
