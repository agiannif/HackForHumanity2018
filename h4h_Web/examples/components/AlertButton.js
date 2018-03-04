import React from 'react'
import ReactDOM from 'react-dom'

var dstyles = {
	height: '40px',
  position: 'relative',
	width: '100%',
	borderRadius: '10px',
  backgroundColor: '#D64736',
  textAlign: 'center',
};
var bstyles = {
  height: '100%',
  width: '100%',
  background: 'transparent',
  border: 'transparent',
  color: 'white',
  fontSize: '20px',
  fontFamily: 'Open Sans',
  fontWeight: 'lighter',
}

class AlertButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: [], isLoaded:false};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log('handleChange');
    fetch("http://192.168.1.3:55555/")
      .then(function(response) {
        console.log('here');
        return response.text();
      })
      .then(function(text) {
        console.log('Request successful', text);
      })
      .catch(function(error) {
        console.log('ererr');
        log('Request failed', error)
      });
  }

  render() {
    return (
      <div style={dstyles}>
        <input style={bstyles} type="submit" value="Submit" onClick={this.handleChange}/>
      </div>
    );
  }
}

export default AlertButton;
