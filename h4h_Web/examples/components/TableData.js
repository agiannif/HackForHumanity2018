import React from 'react'
import ReactDOM from 'react-dom'
import styles from './autocomplete.module.css'


class TableData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ind: 0, items: {'data':[{
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
      }
    };

    this.flipLeft = this.flipLeft.bind(this);
    this.flipRight = this.flipRight.bind(this);
  }

  flipRight(i) {
    i+=1;//var i = (this.state.ind + 1)%(this.state.items['data'].length);
    this.setState({ind: i});
  }

  flipLeft(i) {
    i-=1;//var i = (this.state.ind - 1)%(this.state.items['data'].length);
    this.setState({ind: i});
  }

  refreshData() {
    fetch("http://192.168.1.3:55555/")
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log('done2', json['data'][0]['emergencyLevel'])
      this.setState(items: json);
    })
    .catch(function(error) {
      log('Request failed', error);
    });
  }

  render() {
    this.refreshData();
    return (
        <div>
          <table>
              <tr><td>Name</td><td>{this.state.items['data'][this.state.ind]['firstName']} {this.state.items['data'][this.state.ind]['lastName']}</td></tr>
              <tr><td>Number of People</td><td>{this.state.items['data'][this.state.ind]['numPeople']}</td></tr>
              <tr><td>Level of Emergency</td><td>{this.state.items['data'][this.state.ind]['emergencyLevel']}</td></tr>
              <tr><td>Fire?</td><td>{this.state.items['data'][this.state.ind]['fire']}</td></tr>
              <tr><td>Flood?</td><td>{this.state.items['data'][this.state.ind]['flood']}</td></tr>
              <tr><td>Trapped?</td><td>{this.state.items['data'][this.state.ind]['trapped']}</td></tr>
              <tr><td>Children?</td><td>{this.state.items['data'][this.state.ind]['child']}</td></tr>
              <tr><td>Injury?</td><td>{this.state.items['data'][this.state.ind]['injury']}</td></tr>
              <tr><td>Disability?</td><td>{this.state.items['data'][this.state.ind]['disability']}</td></tr>
              <tr><td>Elderly?</td><td>{this.state.items['data'][this.state.ind]['elderly']}</td></tr>
        </table>
        <div className={styles.buttons}>
          <input type="submit" value="Left" onClick={this.flipLeft(this.state.ind)}/>
          <input type="submit" value="Refresh" onClick={this.refreshData}/>
          <input type="submit" value="After" onClick={this.flipRight(this.state.ind)}/>
        </div>
      </div>
    )
  }
}

export default TableData;
