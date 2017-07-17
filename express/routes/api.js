var express = require('express');
var request = require('request');
var router = express.Router();


router.get('/items', function(req, res, next) {

  if(!req.query) next();

  const total_results = 4;
  let total_callback = 0;

  request('https://api.mercadolibre.com/sites/MLA/search?q=' + req.query.q, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const list = JSON.parse(body);

      if ( list.results.length > 0 ) {
        resultList = resultSearchAPI(list, total_results);
        resultList.items.forEach(function(obj, index) {
          request('https://api.mercadolibre.com/users/' + obj.author, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              const user = JSON.parse(body);
              obj.author = {
                nickname: user.nickname
              }
            }
            total_callback++;
            if( total_callback == total_results ) {
              res.json(resultList);
            }
          })
        })
      } else {
        res.json(
          result = {}
        )
      }
    } else {
      res.json(
        result = {}
      )
    }
  })

  function resultSearchAPI(list, total) {
    let categories = list.available_filters.filter(function(filters) {
      return filters.id == 'category';
    }).map(function(category, index) {
      return category.values;
    })

    if (categories.length > 0) {
      categories.reduce(function(value, next) {
        return next;
      }).map(function(item) {
        return item.name;
      })
    }

    let items = list.results.filter(function(obj, i) {
      return i < total;
    }).map(function(obj) {
      return {
        author: obj.seller.id,
        id: obj.id,
        title: obj.title,
        price: {
          currency: obj.currency_id,
          amount: Math.round(obj.price),
          decimals: parseInt((obj.price % 1).toFixed(2).split('.')[1])
        },
        picture: obj.thumbnail,
        condition: obj.condition,
        free_shipping: obj.shipping.free_shipping
      }
    });
    let result = {
      categories: categories,
      items: items
    };
    return result;
  }
})



router.get('/items/:id', function(req, res, next) {
  let total_callback = 0;
  request('https://api.mercadolibre.com/items/' + req.params.id, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let list = [];
      list.push(JSON.parse(body));

      if ( list.length > 0 ) {

        resultList = resultItemAPI(list);

        request('https://api.mercadolibre.com/users/' + resultList.author, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            const user = JSON.parse(body);
            resultList.author = {
              nickname: user.nickname
            }
          }
          requestCallback(resultList)
        })

        request('https://api.mercadolibre.com/items/' + req.params.id + '/description', function (error, response, body) {
          if (!error && response.statusCode == 200) {
            const list = JSON.parse(body);
            resultList.description = {
              text: list.text,
              plain_text: list.plain_text
            };
          }
          requestCallback(resultList)
        })
      } else {
        res.json(
          result = {}
        )
      }
    } else {
      res.json(
        result = {}
      )
    }
  })

  function requestCallback(resultList) {
    total_callback++;
    if (total_callback == 2) {
      res.json(resultList);
    }
  }

  function resultItemAPI(list) {
    let result = list.map(function(obj) {
      return {
        author: obj.seller_id,
        item: {
          id: obj.id,
          title: obj.title,
          price: {
            currency: obj.currency_id,
            amount: Math.floor(obj.price),
            decimals: parseInt((obj.price % 1).toFixed(2).split('.')[1])
          }
        },
        picture: obj.pictures[0].url,
        condition: obj.condition,
        free_shipping: obj.shipping.free_shipping,
        sold_quantity: obj.sold_quantity
      }
    }).reduce(function(prev, next){
      return next;
    });

    return result;
  }
})

module.exports = router;