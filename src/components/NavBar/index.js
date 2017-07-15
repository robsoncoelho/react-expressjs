import React, { Component } from 'react';
import FaSearch from 'react-icons/lib/fa/search';
import './style.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <header className="navbar">
        <div className="container">
          <a className="nav-logo" href="//www.mercadolivre.com.br/">
            Mercado Livre Brasil - Onde comprar e vender de Tudo
          </a>
          <form className="nav-search" action="//www.mercadolivre.com.br/jm/search" method="GET" role="search">
            <input
              type="text"
              className="nav-search-input"
              value={this.state.value}
              onChange={this.handleChange} />
            <button type="submit" className="nav-search-btn">
              <FaSearch><span>Buscar</span></FaSearch>
            </button>
          </form>
        </div>
      </header>
    );
  }
}

export default NavBar;