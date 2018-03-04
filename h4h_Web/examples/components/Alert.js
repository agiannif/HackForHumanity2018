import React from 'react'
import ReactDOM from 'react-dom'

class Alert extends React.Component {
  constructor(props) {
      super(props);
      this.state = {message: ''};

      this.handleChange = this.handleChange.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.message} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </div>
    )
  }
}

export default Alert;
