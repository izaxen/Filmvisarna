let errorMessage = true
export default class LoginPage {

  constructor() {
    this.addEventHandlers();
    //this.readJson();
      }

  addEventHandlers() {
    $('main').on('click', '#redirect-to-sign-up-page-button', () => location.href = "#signUp")
    $('main').on('click', '#btn-login', () => this.loginUser())
    //this.changeListener.on('shows.json', () => this.getSaloons('tokyo'))
  

  }

  async readJson() {
    console.log('Reading users json,')
    this.users = await JSON._load('../json/users.json');
    this.renderLogin();


  }
  
  loginUser() {
    
    let username = document.getElementById("username-login").value;
    let pass = document.getElementById("password-login").value;

    for (let user of this.users) {
      if (user.username === username) {
        if (user.pass === pass) {
          sessionStorage.setItem('username', user.username)
          let userIndex = this.users.indexOf (user)
          sessionStorage.setItem('index', userIndex)
          this.hideBar()
          location.href = "#movies"
          return;
        }
      }
    }
    this.wrongLogin()
    
  }

  wrongLogin() {
        if(errorMessage){
        alert('Username or password is wrong or does not exist!')
      }
  }
    
    

  renderLogin() {
    
    $('main').html(/*html*/`<div class="login-page">
      <form class="form-login">
        <h1>Log in</h1>
        <input type="text" id="username-login" placeholder="Your username">
          <br><br>
            <input type="password" id="password-login" placeholder="Your password">
              <br><br>
                <button class="button-login-and-signup" id="btn-login" type="submit">Log in</button>
                <br><br>

              <div class="login-page-signup">
              <p>Don't have an account?</p>
                <button onclick="location.href = '#signUp'" class="button-login-and-signup" id="redirect-to-sign-up-page-button" type="submit">Sign up</button>
            </div>

  </form>
  
  </div>`);
    }

    hideBar() {
      
      $('#user-online').html(/*html */`
      <li><a href="#mina-sidors" id="user-online">${sessionStorage.getItem('username')}</a></li>
      `)

      $(".user-bar-offline").hide();
      $(".user-bar-online").show();
      $('#nav-toggler-logout').show();
    
  }
}
