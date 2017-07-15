import React, { Component } from 'react';
import './style.css';

import queryString from 'query-string';

class Results extends Component {

  state = { results: [] }

  componentDidMount() {
    const param = queryString.parse(this.props.location.search);

    if (param.search) {
      fetch('/api/items?q=' + param.search)
        .then(res => res.json())
        .then(results => this.setState({ results }));
    } else {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="Results">
        <h1>
          Results
        </h1>

      </div>
    );
  }
}

export default Results;