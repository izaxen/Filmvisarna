
$('.main-box').append(/*html*/`
  <img src="https://miro.medium.com/max/2400/0*mn-YUl04OugtajCS"></img>
  
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

$(function () {
  $('#Log-in').on('click', function () {

    $('.main-box img').replaceWith(`<div class="loginPage">
      <form >
        <h1>Log in</h1>
        <input type="text" id="username" placeholder="Your username">
          <br><br>
            <input type="password" id="password" placeholder="Your password">
              <br><br>
                <button type="submit">Log in</button>
                <br><br>
              
              <p>don't have an account?</p>
                <button class="redirectToSignUpPageButton" type="submit">Sign up</button>


  </form>
  
  </div>`);
  });
});

