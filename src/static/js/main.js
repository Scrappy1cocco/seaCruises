"use strict";

var navig = document.querySelector('.nav');
var navigToggle = document.querySelector('.toggle');
var btnCatalog = document.querySelector('.catalog__btn');
var item5 = document.querySelector('.catalog__item-5');

navigToggle.addEventListener('click', function() {
  if (navig.classList.contains('nav--closed')) {
    navig.classList.remove('nav--closed');
    navig.classList.add('nav--opened');
  } else {
    navig.classList.add('nav--closed');
    navig.classList.remove('nav--opened');
  }
})

btnCatalog.addEventListener('click', function() {
  item5.style.display = "block";
})