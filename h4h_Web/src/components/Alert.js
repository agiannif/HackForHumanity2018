import React from 'react'
import ReactDOM from 'react-dom'

export class Alert extends React.component(){
  render() {
    return (
      <div>
        <h4>Amber Alert</h4>
        <div className={styles.amber}>
          <form>
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}
