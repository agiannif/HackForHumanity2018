import React from 'react'
import ReactDOM from 'react-dom'
import styles from './autocomplete.module.css'

var i = 0;
var items = [{
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
        "longitude": "-121.9551"}

    ];

class TableData extends React.Component {
  constructor(props) {
    super(props);

    this.flipLeft = this.flipLeft.bind(this);
    this.flipRight = this.flipRight.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }

  flipRight() {
    i= i+1;
    this.forceUpdate();
  }

  flipLeft() {
    i=i-1;
    this.forceUpdate();
  }

  refreshData() {
    fetch("http://192.168.1.3:55555/")
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log('done2', json['data']);
      items = json['data'];
      console.log('hey',items);
      this.render();
    })
    .catch(function(error) {
      return;
    });
  }

  render() {
    console.log('rendered');
    console.log(items[i]);
    console.log(items[i]['firstName']);
    var nfname = items[i]['firstName'];
    return (
        <div>
          <table>
              <tr><td>Name</td><td>{items[i]['firstName']} {items[i]['lastName']}</td></tr>
              <tr><td>Number of People</td><td>{items[i]['numPeople']}</td></tr>
              <tr><td>Level of Emergency</td><td>{items[i]['emergencyLevel']}</td></tr>
              <tr><td>Fire?</td><td>{items[i]['fire']}</td></tr>
              <tr><td>Flood?</td><td>{items[i]['flood']}</td></tr>
              <tr><td>Trapped?</td><td>{items[i]['trapped']}</td></tr>
              <tr><td>Children?</td><td>{items[i]['child']}</td></tr>
              <tr><td>Injury?</td><td>{items[i]['injury']}</td></tr>
              <tr><td>Disability?</td><td>{items[i]['disability']}</td></tr>
              <tr><td>Elderly?</td><td>{items[i]['elderly']}</td></tr>
        </table>
        <div className={styles.buttons}>
          <input type="submit" value="Previous" onClick={this.flipLeft}/>
          <input type="submit" value="Refresh" onClick={this.refreshData}/>
          <input type="submit" value="Next" onClick={this.flipRight}/>
        </div>
      </div>
    );
  }
}

export default TableData;
