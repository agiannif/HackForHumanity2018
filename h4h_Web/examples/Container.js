import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import GitHubForkRibbon from 'react-github-fork-ribbon'

let GoogleApiWrapper;
if (__IS_DEV__) {
  GoogleApiWrapper = require('../src/index').GoogleApiWrapper
} else {
  GoogleApiWrapper = require('../dist').GoogleApiWrapper
}

import styles from './styles.module.css'

export const Container = React.createClass({

  propTypes: {
    children: PropTypes.element.isRequired
  },

  contextTypes: {
    router: PropTypes.object
  },

  renderChildren: function() {
    const {children} = this.props;
    if (!children) return;

    const sharedProps = {
      google: this.props.google,
      loaded: this.props.loaded
    }
    return React.Children.map(children, c => {
      return React.cloneElement(c, sharedProps, {

      });
    })
  },

  render: function() {
    const {routeMap, routeDef} = this.props;
    const {router} = this.context;

    const c = this.renderChildren();
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.list}>
            <ul>
              {Object.keys(routeMap).map(key => {
                return (
                  <Link to={key}
                        activeClassName={styles.active}
                        key={key}>
                    <li>{routeMap[key].name}</li>
                  </Link>
                )
              })}
            </ul>
            <img src="https://i.imgur.com/T29lC0U.png" />
          </div>
          <div className={styles.right_side}>
            <div className={styles.content}>
              {c}
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__,
  libraries: ['places','visualization']
})(Container)
