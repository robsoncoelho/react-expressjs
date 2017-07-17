import React, { Component } from 'react';

function Currency(props) {
  return (
    <h3>$ 
      <span>{String(props.price.amount).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</span>
      <sup>{props.price.decimals === 0 ? ("00") : (props.price.decimals)}</sup>
    </h3>
  );
}

class Result extends Component {
  goToCart(url) {
    window.location = "https://buyingflow.mercadolibre.com.ar/bid/confirm?item_id=" + url;
  }

  render() {
    const details = this.props.details;
    return (
      <div id="item">
        <div id="info">
          <img src={details.picture} width="100%" height="auto" alt={details.title} />
          <div>
            <h2>Descripcíon del producto</h2>
            {details.description.text !== '' ? (
              <p dangerouslySetInnerHTML={ {__html: details.description.text} }></p>
            ) : (
              <p>{details.description.plain_text}</p>
            )}
          </div>
        </div>
        <div id="price">
          <p>{details.author.nickname}</p>
          <h1>{details.item.title}</h1>
          <Currency price={details.item.price} />
          <button onClick={(e) => this.goToCart(details.item.id)}>Comprar</button>
        </div>
      </div>
    )
  }
}

export default Result;