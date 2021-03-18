let userOnline;

  export default class LoginPage {

  constructor() {
    this.addEventHandlers();
    this.readJson();
    
    
  }

  addEventHandlers() {
    $('main').on('click', '#redirect-to-sign-up-page-button', () => location.href = "#signUp")
    $('main').on('click', '#btn-login', () => this.loginUser())
    //this.changeListener.on('shows.json', () => this.getSaloons('tokyo'))
  

  }

  async readJson() {
    this.users = await JSON._load('../json/users.json');
    console.log('read jsnon done')
    this.renderLogin();


  }
  
  loginUser() {
    let username = document.getElementById("username-login").value;
    let pass = document.getElementById("password-login").value;
        
    console.log('username: ', username, ' pass: ', pass)

    for (let user of this.users) {
      if (user.username === username) {
        if (user.pass === pass) {
          //Aktivera klassen när login lyckas. Göm signup/login. 
          //Sparar usern i en variabel.
          this.userOnline = user;
          //Lägg in alert att kunden är inloggad - return?
        } else {
          //Alert att det är fel lösen
        }
      }
      //Lägg in else med alert att username är fel
    }
    console.log('test user online outside if ', this.userOnline);
    location.href = "#movies";
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




}
