var translations = {
  de: {
    discountOnEverything: 'Dein Paket kommt bis Weihnachten an',
    discountDisclaimer: '',
    countdownAlternative: 'Für ungerahmte Poster nach Deutschland. <span style="text-decoration: underline">Mehr Infos</span>',
    href: 'https://cart.nachthimmel.de/christmasdelivery'
  }
}
var translation = translations.de
/*
willArriveBeforeChistmas(function (err, willArrive) {
  if (err) {
    throw err
  }
  if (!willArrive) {
    return
  }
  var bar = document.querySelector('.announcement-bar')
    if (bar) {
        bar.style = "font-weight: 600;font-size: 1em;padding: 0.75em;color:white"
        bar.innerHTML = "<div id='discount-message'></div><div class='discount-disclaimer'></div>"
        document.querySelector('#discount-message').innerHTML = translation.discountOnEverything
        document.querySelector('.site-footer__linklist-item').classList.add('tooltiptext')
        document.querySelector('.tooltiptext').innerHTML = translation.discountDisclaimer
        document.querySelector('.discount-disclaimer').innerHTML = translation.countdownAlternative
        document.querySelector('.discount-disclaimer').style = "font-size: 0.8em;1"
        bar.href = translation.href
    }

  
})*/

function willArriveBeforeChistmas(cb) {
  fetch("https://backend.heurekaprints.de/services/latestDelivery/poster/"+lang).then(function (ans) {
    if (ans.status != 200) {
      return cb(ans.status)
    }
    return ans.json() 
  }).then(function (ans) {
    for (var i=0; i<ans.length; i++) {
      if (ans[i].deliveryTime === "STANDARD") {
        var willArrive = new Date(ans[i].latestDeliveryDate).getTime() > Date.now()
        return cb(null, willArrive)
      }
    }
    cb(new Error('unknown date'))
  })
}