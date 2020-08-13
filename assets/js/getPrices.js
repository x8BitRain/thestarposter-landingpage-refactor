function getPrices(currency = "EUR") {
  var posterPrice = document.querySelectorAll('#poster-price');
  var forexPrice = document.querySelectorAll('#forex-price');
  var digitalPrice = document.querySelectorAll('#digital-price');

  // var endpoint = 'https://backend.dev.heurekaprints.de/backend/currency/' + currency + '/starmap/prices';
  var endpoint = backendUrl + 'currency/' + currency + '/starmap/prices';
  var requestOptions = {
  method: "GET",
  redirect: "follow"
  };

  var requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch(endpoint, requestOptions)
    .then(response => response.json())
    .then(prices => {
      posterPrice.forEach((e) => {
        e.innerHTML = prices.currencySymbol.prefix + "&nbsp;" + prices.prices.poster + "&nbsp;" + prices.currencySymbol.postfix;
      });
      forexPrice.forEach((e) => {
        e.innerHTML = prices.currencySymbol.prefix + "&nbsp;" + prices.prices.forex + "&nbsp;" + prices.currencySymbol.postfix;
      })
      digitalPrice.forEach((e) => {
        e.innerHTML = prices.currencySymbol.prefix + "&nbsp;" + prices.prices.digital + "&nbsp;" + prices.currencySymbol.postfix;
      })
    }).catch(err => {
      throw new Error(err);
  });
}