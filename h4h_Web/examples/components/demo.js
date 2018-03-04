import React from 'react'
import ReactDOM from 'react-dom'

import Map, {Marker, GoogleApiWrapper} from '../../src/index'
import styles from './autocomplete.module.css'

const Contents = React.createClass({
  getInitialState() {
    return {
      place: null,
      position: null
    }
  },

  onMapReady: function(mapProps, map) {
    this.searchNearby(map, map.center);
  },

  onSubmit: function(e) {
    e.preventDefault();

  },

  componentDidMount: function() {
    this.renderAutoComplete();
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

  render: function() {
    const props = this.props;
    const {position} = this.state;

    var data = [
      {
        "firstName": "Zach",
        "lastName": "Bellay",
        "numPeople": "1",
        "emergencyLevel": "2",
        "fire": "false",
        "flood": "false",
        "earthquake": "true",
        "trapped": "false",
        "child": "true",
        "injury": "false",
        "disability": "false",
        "elderly": "false",
        "time": "1520153541",
        "latitude": "37.3542",
        "longitude": "-121.9551"
      },
      {
        "firstName": "Glen",
        "lastName": "Chandler",
        "numPeople": "4",
        "emergencyLevel": "1",
        "fire": "true",
        "flood": "false",
        "earthquake": "true",
        "trapped": "false",
        "child": "true",
        "injury": "false",
        "disability": "false",
        "elderly": "false",
        "time": "1520143541",
        "latitude": "37.3539",
        "longitude": "-121.9552"
      },
      {
        "firstName": "Bob",
        "lastName": "Jones",
        "numPeople": "10",
        "emergencyLevel": "2",
        "fire": "false",
        "flood": "false",
        "earthquake": "true",
        "trapped": "false",
        "child": "true",
        "injury": "false",
        "disability": "false",
        "elderly": "false",
        "time": "1520131541",
        "latitude": "37.3545",
        "longitude": "-121.9550"
      },
      {
        "firstName": "Alex",
        "lastName": "Seto",
        "numPeople": "4",
        "emergencyLevel": "2",
        "fire": "false",
        "flood": "false",
        "earthquake": "false",
        "trapped": "false",
        "child": "false",
        "injury": "false",
        "disability": "false",
        "elderly": "false",
        "time": "1520158941",
        "latitude": "37.3544",
        "longitude": "-121.9550"
      }
<<<<<<< HEAD
    ];

    var tableData = <table>
    <tr><td>Name</td><td>{data[0].firstName} {data[0].lastName}</td></tr>
    <tr><td>Number of People</td><td>{data[0].numPeople}</td></tr>
    <tr><td>Level of Emergency</td><td>{data[0].emergencyLevel}</td></tr>
    <tr><td>Fire?</td><td>{data[0].fire}</td></tr>
    <tr><td>Flood?</td><td>{data[0].flood}</td></tr>
    <tr><td>Trapped?</td><td>{data[0].trapped}</td></tr>
    <tr><td>Children?</td><td>{data[0].child}</td></tr>
    <tr><td>Injury?</td><td>{data[0].injury}</td></tr>
    <tr><td>Disability?</td><td>{data[0].disability}</td></tr>
    <tr><td>Elderly?</td><td>{data[0].elderly}</td></tr>
    </table>;

=======
    ]
   function get_request() {
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
       data = JSON.parse(this.responseText);
     }
   };
   xhttp.open("GET", "http:192.168.1.3:55555", true);
   xhttp.send();
 }
    var tableData = <table><tr><td>Name</td><td>Name2</td><td>Name3</td></tr></table>;
>>>>>>> 7c2ce5cbe950dfe5aec493243bee2d608f72e2d2

    return (
      <div className={styles.flexWrapper}>
        <div className={styles.left}>
          <form onSubmit={this.onSubmit}>
            <input
              ref='autocomplete'
              type="text"
              placeholder="Enter a location" />
            <input
              className={styles.button}
              type='submit'
              value='Search'
              onClick='get_request()'/>
          </form>
          <div>
            <div>Lat: {position && position.lat()}</div>
            <div>Lng: {position && position.lng()}</div>
          </div>
          <div>
            <div>{tableData}</div>
          </div>
        </div>
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
