import React, { Component } from 'react';
import FaCircleONotch from 'react-icons/lib/fa/circle-o-notch';

import queryString from 'query-string';
import ResultList from './results';
import NoResults from './noresults';

import './style.css';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      callback: false
    };
  }

  componentDidMount() {
    const param = queryString.parse(this.props.location.search);

    if (param.search) {
      fetch('/api/items?q=' + param.search)
        .then(res => res.json() )
        .then(results => { this.setState({ results }); this.setState({'callback' : true}) })
    } else {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div id="results">
        {!this.state.callback &&
          <FaCircleONotch id="loading" />
        }

        {this.state.callback && this.state.results.items &&
          <ResultList items={this.state.results.items} />
        }

        {this.state.callback && !this.state.results.items &&
          <NoResults />
        }
      </div>
    );
  }
}

export default Results;