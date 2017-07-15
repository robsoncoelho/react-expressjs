import React, { Component } from 'react';
import './style.css';

class Details extends Component {

  state = { details: [] }

  componentDidMount() {
    const id = this.props.match.params.id;

    if ( id ) {
      fetch('/api/items/' + id)
        .then(res => res.json())
        .then(details => this.setState({ details }));
    } else {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="Details">
        <h1>
          Details
        </h1>
        {this.state.details.map(detail =>
          <div key={detail.id}>{detail.username}</div>
        )}
      </div>
    );
  }
}

export default Details;