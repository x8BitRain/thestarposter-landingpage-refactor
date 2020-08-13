

if ($('.ui.sidebar').length !== 0) {
  $('.ui.sidebar')
  .sidebar('attach events', '.toc.item')
  ;
}
else {
  console.error("Could not attach sidebar")
}

var createNowButtons = document.querySelectorAll(".editorButton")
var editorURL = "/editor";
for (var i = 0; i < createNowButtons.length; i++) {
  createNowButtons[i].addEventListener('click', function (e) {
    window.location.href = editorURL;
    e.preventDefault()
  })
}