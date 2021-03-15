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