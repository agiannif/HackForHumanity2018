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
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ];

    var center = {lat: 37.3496, lng: -121.9390};
    var positions = [];
for(var i = 0; i < 500; ++i)
{
  var pos1 = center.lat + ((0.001)*((Math.random() * 100) ));
  var pos2 = center.lng + ((0.001)*((Math.random() * 100) ));

  var temp = Math.random()*100;
  for (var j = 0; j < 1; ++j)
  {
    positions.push({lat: pos1, lng: pos2});
  }

}

    return (
      <Map google={this.props.google}
          style={{width: '100%', height: '100%', position: 'relative'}}
          className={'map'}
          zoom={14}>
        <HeatMap
          gradient={gradient}
          radius={20}
          opacity={0.5}
          positions={positions}
        />
      </Map>
    )
  }
});

export default WithHeatMap
