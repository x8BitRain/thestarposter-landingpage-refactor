// Prevent css transitions on page load

window.addEventListener("load", function () {
    document.querySelector("body").classList.remove("preload")
})

// Toggle Menu

function toggleMenu(el) {
    el.classList.toggle("active")
    document.querySelector("#sideMenu").classList.toggle("visible")
}

// Toggle language picker

function toggleLanguagePicker() {
    document.querySelector("#language-picker").classList.toggle("visible")
    document.querySelector("body").classList.toggle("disable-scroll")
}

function setLanguagePref(lang) {
    let expires = (new Date(Date.now()+ 86400*1000*90)).toUTCString();
    document.cookie = "nf_lang=" + lang + ";expires=" + expires + ";path=/";
}

// Test scrolling

function scrollMe(el) {
    let x = el.scrollLeft
    let width = el.scrollWidth
    console.log(x, width)
}

// Gallery Buttons

function scrollPrevious(el) {
    let scroller = el.parentElement.parentElement
    scroller.scrollLeft -= 260
}

function scrollNext(el) {
    let scroller = el.parentElement.parentElement
    scroller.scrollLeft += 260
}

function scrollPreviousInsta(el) {
    let scroller = el.parentElement.parentElement
    scroller.scrollLeft -= 143
}

function scrollNextInsta(el) {
    let scroller = el.parentElement.parentElement
    scroller.scrollLeft += 143
}

// Toggle dropdown

function toggleDropdown(el) {
    el = el.parentElement
    el.classList.toggle("extended")

    let extension = el.querySelector(".dropdown-extension")
    if (extension.clientHeight) {
        extension.style.height = 0;
    } else {
        let wrapper = extension.querySelector('.dropdown-extension-wrapper')
        extension.style.height = 'fit-content'
        // wrapper.clientHeight + "px"
    }
}

// Set gallery indicator

function setGalleryIndicator(el) {
    let x = el.scrollLeft
    let width = el.scrollWidth - 28 // 28px is the left padding of the container
    let indicators = document.querySelector(".gallery-indicator").children

    if (x < width / 3 / 2) {
        indicators[0].classList.add("selected")
        indicators[1].classList.remove("selected")
        indicators[2].classList.remove("selected")
    } else if (x >= width / 3 / 2 && x < width / 3 * 2 - width / 3 / 2) {
        indicators[1].classList.add("selected")
        indicators[0].classList.remove("selected")
        indicators[2].classList.remove("selected")
    } else {
        indicators[2].classList.add("selected")
        indicators[0].classList.remove("selected")
        indicators[1].classList.remove("selected")
    }
}

// Toggle create popup

window.addEventListener("scroll", toggleCreatePopup)

function toggleCreatePopup() {
    let createPopup = document.querySelector(".createPopup")
    if (createPopup != null) {
        let togglePosition = document.querySelector(".btnCreate").offsetTop + 36
        let y = window.scrollY

        if (y >= togglePosition) {
            createPopup.classList.add("visible")
        } else {
            createPopup.classList.remove("visible")
        }
    }
};
// changing the netlify url 
if (window.location.href.indexOf("lang_redr")) {
    setLanguagePref(document.querySelector('html').getAttribute('lang'))
}

                