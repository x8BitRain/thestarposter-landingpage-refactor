var lang = document.querySelector('html').getAttribute('lang')
var translations = {
  de: {
    discountOnEverything: 'Dein Paket kommt bis Weihnachten an',
    discountDisclaimer: '',
    countdownAlternative: 'Für ungerahmte Poster nach Deutschland. <span style="text-decoration: underline">Mehr Infos</span>',
    href: '/christmasdelivery'
  },
  en: {
    discountOnEverything: 'Your order arrives until christmas',
    discountDisclaimer: '',
    countdownAlternative: "For posters delivered to any EU country. <span style='text-decoration: underline'>More info</span>",
    endsIn: 'Ends in',
    href: '/christmasdelivery'
  },
  it: {
    discountOnEverything: 'Il tuo ordine arriva fino a Natale',
    discountDisclaimer: '', 
    countdownAlternative: "Pour les affiches livrées en Italie. <span style='text-decoration: underline'>Alteriori informazioni</span>",
    endsIn: 'Finisce in',
    href: '/christmasdelivery'
  },
  fr: {
    discountOnEverything: "VOTRE COMMANDE CHEZ VOUS AVANT NOËL",
    discountDisclaimer: "",
    countdownAlternative: "Pour les affiches livrées en France. <span style='text-decoration: underline'>Plus d'info</span>",
    endsIn: 'se termine dans',
    href: '/christmasdelivery'
  },
  es: {
    discountOnEverything: 'Su pedido llega hasta Navidad',
    discountDisclaimer: "",
    countdownAlternative: 'Para pósters enviados a España. <span style="text-decoration: underline">Más info</span>',
    endsIn: 'Termina en',
    href: '/christmasdelivery'
  }
}
var translation = translations[lang] || translations['en']


//inline styles
var fullPriceStyle = 'style="text-decoration: line-through; font-weight: bold; color: #742a2a;"';
var offerStyle = 'style="font-weight: bold; padding: 0.2rem; color: #2d5385;"';
var promoStyle = 'style="background-color: #f6e05e; margin-left: 0.5rem; margin-right: 0.5rem; padding: 0.1rem; color: #744210"';
/*
willArriveBeforeChistmas(false, function (err, willArrive) {
  if (err) {
    throw err
  }
  if (lang == 'de' && !willArrive) {
    willArriveBeforeChistmas(true, function (err, willArriveExpress) {
      if (err) {
        throw err
      }
      if (willArriveExpress) {
        putBanner({
          discountOnEverything: 'Dein Paket kommt bis Weihnachten an',
          discountDisclaimer: '',
          countdownAlternative: 'Für Poster nach Deutschland mit Expressversand. <span style="text-decoration: underline">Mehr Infos</span>',
          href: '/christmasdelivery'
        })
      }
    })
    return
  }
  if (willArrive) {
    putBanner(translation)
  }
  //document.querySelector('.discount-popup').style = "background-color: #f6e05e; font-weight: 600; font-size: 1em"
  //document.querySelector('.discount-disclaimer').style = "font-size: 0.8em; color: #744210; opacity:1"
})
*/
function willArriveBeforeChistmas(withExpressShipping, cb) {
  var relevantShippingSpeed = withExpressShipping? "EXPRESS" : "STANDARD"
  fetch("https://backend.heurekaprints.de/services/latestDelivery/poster/"+lang).then(function (ans) {
    if (ans.status != 200) {
      return cb(ans.status)
    }
    return ans.json() 
  }).then(function (ans) {
    for (var i=0; i<ans.length; i++) {
      if (ans[i].deliveryTime === relevantShippingSpeed) {
        var willArrive = new Date(ans[i].latestDeliveryDate).getTime() > Date.now()
        return cb(null, willArrive)
      }
    }
    cb(null, false)
  })
}

function putBanner(banner) {
  document.querySelector('#discount-message').innerHTML = banner.discountOnEverything
  document.querySelector('.tooltiptext').innerHTML = banner.discountDisclaimer
  if (banner.discountDisclaimer == "") {
    document.querySelector('.discount .circular').remove()
    document.querySelector('.tooltiptext').remove()
  }
  document.querySelector('.discount-popup').setAttribute('href', banner.href)
  document.querySelector('.discount-disclaimer').innerHTML = banner.countdownAlternative
}