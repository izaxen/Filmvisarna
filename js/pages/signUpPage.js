export default class SignUpPage {

  constructor() { 
    this.addEventHandlers()
  }

  signUp() {

    $('main').html(`<div class="signUpPage">
      <form class="form-signup">
        <h1>Sign up</h1>
        <h3>Type in your information:</h3>
        <input type="email" id="email" placeholder="Enter your email">
          <br><br>
            <input type="text" id="username" placeholder="Enter your username">
              <br><br>
                <input type="password" id="password" placeholder="Enter your password">
                  <br><br>
                    <button class="button-login-and-signup" id="signUpButton" type="submit">Create account</button>
                    <br><br>
            


  </form>
  
  </div>`);
  }

  addEventHandlers() {
    //Write function for event here
    $('body').on('click', '#signUpButton', ()=> this.saveUserData())
  }

  saveUserData(){
    console.log('This is saveUserData()')
  }
}
