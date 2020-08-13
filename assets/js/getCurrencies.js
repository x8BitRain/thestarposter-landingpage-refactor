function readCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

function setCookie(name, value, days) {
  var d = new Date;
  d.setTime(d.getTime() + 24*60*60*1000*days);
  var domain = window.location.host
  if (window.location.host.indexOf('nachthimmel.de') > -1) {
    domain = ".nachthimmel.de"
  }
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString()+";domain="+domain;
}

function getCurrencies() {
  var preferredCurrency = readCookie("preferredCurrency");
  var currencySelector = document.querySelector('.currency');
  var endpoint = backendUrl + 'currency/list';
  var requestOptions = {
  method: "GET",
  redirect: "follow"
  };

  fetch(endpoint, requestOptions)
    .then(response => response.json())
    .then(currencies => {
      currencies.forEach(function(curr) {
        var item = "<option>" + curr.iso + "</option>";
        if (curr.default) { // Put default currency first in the list.
          currencySelector.insertAdjacentHTML('afterbegin', item);
        } else {
          currencySelector.insertAdjacentHTML('beforeend', item);
        }
        currencySelector.style.display = "block";
      })
      if (preferredCurrency) {
        currencySelector.value = preferredCurrency;
      } else {
        currencySelector.value = currencySelector[0].innerText;
      };
    }).catch(err => {
      currencySelector.style.opacity = "0"
      throw new Error(err);
    });

    currencySelector.addEventListener("change", function(event){
       setCookie("preferredCurrency", event.target.value, 90);
        location.reload();
    }, false);	

  }
             
