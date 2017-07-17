import React, { Component } from 'react';

function Currency(props) {
  return (
  	<p className="price">$ {String(props.price).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</p>
  );
}

class Result extends Component {
  render() {
    return (
      <ol>
        {this.props.items.map(item =>
          <li key={item.id}>
	        <div className="image">
	          <a href={"/items/" + item.id} target="_self">
	            <img alt={item.title} src={item.picture} />
	          </a>
	        </div>
	        <div className="info">
	          <div className="product-info">
	            <Currency price={item.price.amount} />
	            <h2 className="name">
	              <a href={"/items/" + item.id} target="_self">
	                <span>{item.title}</span>
	              </a>
	            </h2>
	          </div>
	          <div className="seller-info">
	            <p>{item.author.nickname}</p>
	          </div>
	        </div>
	      </li>
        )}
      </ol>
    )
  }
}

export default Result;