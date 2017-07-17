import React, { Component } from 'react';
import FaCircleONotch from 'react-icons/lib/fa/circle-o-notch';

import Item from './details';
import NoResults from './noresults';

import './style.css';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      callback: false
    };
  }
  
  componentDidMount() {
    const id = this.props.match.params.id;
    if ( id ) {
      fetch('/api/items/' + id)
        .then(res => res.json())
        .then(details => { this.setState({ details }); console.log(this.state.details); this.setState({'callback' : true}) })
    } else {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div id="details">
        {!this.state.callback &&
          <FaCircleONotch id="loading" />
        }

        {this.state.callback && !this.state.details.item &&
          <NoResults />
        }

        {this.state.callback && this.state.details.item &&
          <Item details={this.state.details} />
        }
      </div>
    );
  }
}

export default Details;