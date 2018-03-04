import React from 'react'
import ReactDOM from 'react-dom'

var dstyles = {
	height: '40px',
	width: '100px',
	borderRadius: '10px',
  backgroundColor: '#D64736'
};
var bstyles = {
  height: '100%',
  width: '100%'
}

class AlertButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: [12], isLoaded:false};
    this.getData();
    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  getData() {
    console.log('gertdarta');
    fetch("http://192.168.1.3:55555/")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.items
        });
      },
      (error) => {
        console.log('error')
        this.setState({
          isLoaded:true,
          error
        });
      }
    )
    console.log(this.state.items)
  }

  // .then(function(response)
  //   {
  //     console.log('hey');
  //     console.log(response.status);
  //   });

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

  /*
  handleChange(e) {
    console.log('handleChange');
    fetch("http://192.168.1.3:55555/")
    .then(res => res.json())
    .then(
      (data) => {
        this.setState({
          isLoaded: true,
          items: result.items
        });
        console.log(this.state.items);
        console.log('good');
      },
      (error) => {
        console.log('error')
        this.setState({
          isLoaded:true,
          error
        });
        console.log(this.state.items);
        console.log('bad');
      }
    )
    console.log(this.state.items)
  }*/

  render() {
    return (
      <div style={dstyles}>
        <input style={bstyles} type="submit" value="Submit" onClick={this.handleChange}/>
        <div>
          {this.state.items}
        </div>
      </div>
    );
  }
}

export default AlertButton;
