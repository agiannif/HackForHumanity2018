import React from 'react'
import ReactDOM from 'react-dom'

import Map, {GoogleApiWrapper} from '../../src/index'
import HeatMap from '../../src/components/HeatMap'

const WithHeatMap = React.createClass({
  render: function() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }

    var gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 204, 0, 1)',
      'rgba(255, 255, 0, 1)',
      'rgba(255, 153, 51, 1)',
      'rgba(255, 128, 0, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ];

    var center = {lat: 37.3496, lng: -121.9390};
    var positions = [];
for(var i = 0; i < 300; ++i)
{
  var lat1 = center.lat + ((0.001)*((Math.random() * 85) ));
  var lat2 = center.lat - ((0.001)*((Math.random() * 200) ));
  var long1 = center.lng + ((0.001)*((Math.random() * 300) ));
  var long2 = center.lng - ((0.001)*((Math.random() * 300) ));
  positions.push({lat: lat1, lng: long1});
  positions.push({lat: lat1, lng: long2});
  positions.push({lat: lat2, lng: long1});
  positions.push({lat: lat2, lng: long2});
}

    return (
      <Map google={this.props.google}
          style={{width: '100%', height: '100%', position: 'relative'}}
          className={'map'}
          zoom={12}>
        <HeatMap
          gradient={gradient}
          radius={32}
          opacity={0.5}
          positions={positions}
        />
      </Map>
    )
  }
});

export default WithHeatMap
