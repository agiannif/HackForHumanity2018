import React from 'react'
import ReactDOM from 'react-dom'
import styles from './autocomplete.module.css'

var i = 0;

class TableData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: [{
            "firstName": "Sam",
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
          }
        ]
      };
      console.log(i);
    // this.flipLeft = this.flipLeft.bind(this);
    // this.flipRight = this.flipRight.bind(this);
  }

  flipRight() {
    i= i+1;
    console.log(i);
    console.log(this);
    this.render();
  }

  flipLeft() {
    i=i-1;
    console.log(i);
    this.render();
  }

  refreshData() {
    fetch("http://192.168.1.3:55555/")
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      var data = json['data'].push(this.items);
      console.log('done2', json);
      this.setState(items: json);
    })
    .catch(function(error) {
      return;
    });
  }

  render() {
    console.log(i);
    return (
        <div>
          <table>
              <tr><td>Name</td><td>{this.state.items[i]['firstName']} {this.state.items[i]['lastName']}</td></tr>
              <tr><td>Number of People</td><td>{this.state.items[i]['numPeople']}</td></tr>
              <tr><td>Level of Emergency</td><td>{this.state.items[i]['emergencyLevel']}</td></tr>
              <tr><td>Fire?</td><td>{this.state.items[i]['fire']}</td></tr>
              <tr><td>Flood?</td><td>{this.state.items[i]['flood']}</td></tr>
              <tr><td>Trapped?</td><td>{this.state.items[i]['trapped']}</td></tr>
              <tr><td>Children?</td><td>{this.state.items[i]['child']}</td></tr>
              <tr><td>Injury?</td><td>{this.state.items[i]['injury']}</td></tr>
              <tr><td>Disability?</td><td>{this.state.items[i]['disability']}</td></tr>
              <tr><td>Elderly?</td><td>{this.state.items[i]['elderly']}</td></tr>
        </table>
        <div className={styles.buttons}>
          <input type="submit" value="Left" onClick={this.flipLeft}/>
          <input type="submit" value="Refresh" onClick={this.refreshData}/>
          <input type="submit" value="After" onClick={this.flipRight}/>
        </div>
      </div>
    );
  }
}

export default TableData;
