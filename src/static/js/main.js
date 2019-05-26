"use strict";

var navig = document.querySelector('.nav');
var navigToggle = document.querySelector('.toggle');

navigToggle.addEventListener('click', function() {
  if (navig.classList.contains('nav--closed')) {
    navig.classList.remove('nav--closed');
    navig.classList.add('nav--opened');
  } else {
    navig.classList.add('nav--closed');
    navig.classList.remove('nav--opened');
  }
})