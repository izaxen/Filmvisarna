export default class LoginPage {

  login() {
    /*$(function () {
      $('#login').on('click', function () {*/

        $('main').html(`<div class="login-page">
      <form class="form-login">
        <h1>Log in</h1>
        <input type="text" id="username" placeholder="Your username">
          <br><br>
            <input type="password" id="password" placeholder="Your password">
              <br><br>
                <button class="button-login-and-signup" type="submit">Log in</button>
                <br><br>

              <div class="login-page-signup">
              <p>Don't have an account?</p>
                <button class="button-login-and-signup" id="redirect-to-sign-up-page-button" type="submit">Sign up</button>
            </div>

  </form>
  
  </div>`);
      }}