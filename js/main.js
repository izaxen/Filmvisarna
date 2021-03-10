import App from './App.js';
new App();

console.log('Running js/main.js');

$('.main-box').append(/*html*/`
  <img src="https://sm.mashable.com/mashable_in/seo/default/8-years-of-the-avengers-how-joss-whedons-risk-became-crucial_5z9w.jpg"></img>
  
  `);

$('footer').append(`<h3>Contact Filmskaparna@hotmail.com</h3>`);

$(function () {
  $('#movies').on('click', function () {

    $('.main-box img').replaceWith('<img src="https://cdn57.androidauthority.net/wp-content/uploads/2020/04/best-movies-on-starz-1200x473.jpg"></img>');
  });
});

$(function () {
  $('#tickets').on('click', function () {

    $('.main-box img').replaceWith('<img src="https://i.stack.imgur.com/2dC6h.png"></img>');
  });
});

$(function () {
  $('#news').on('click', function () {

    $('.main-box img').replaceWith('<img src="https://sm.mashable.com/mashable_in/seo/default/8-years-of-the-avengers-how-joss-whedons-risk-became-crucial_5z9w.jpg"></img>');
  });
});