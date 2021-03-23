

export default class SignUpPage {
  constructor(changeListener) {
    this.changeListener = changeListener;
    this.addEventHandlers();
    this.read()
  }
  
  addEventHandlers() {
    //Write function for event here
    $("body").on("click", "#signUpButton", () => this.saveUserData());
    this.changeListener.on("../json/users.json", () => this.read());
  }

  async read() {
    this.renderSignUp();
    this.users = await JSON._load('../json/users.json');
    
  }


  renderSignUp() {
    $("main").html(/*html */ `<div class="signUpPage">
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

  async saveUserData() {
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
        
    for (let user of this.users) {       
      if (user.email === email ) {
        alert('Email is already in use')
        return;
      }
      if(user.username === username){
        alert('Username is already in use')
        return
      } 
    }
    
    this.users.push({ email, username, pass }); // skall ligga i eller efter ifstats när värdena är kontrollerade
    await JSON._save("../json/users.json", this.users);
    alert(`You have created a new user with username: ${username}`)
    location.href = "#login";
   
  } 
}
