
export default class Header {

  render() {
    this.clear()
    $('header').html(/*html */`
    <div class="tool-bar">
    <nav class="navbar">
      <div class="bar1">
        <div class="dropdown">
          <button type="button" class="navbar-toggler">
            <em class="fas fa-bars"></em>
          </button>
          <div class="dropdown-content">
            <a href="#movies">Movies</a>
            <a href="#shows">Shows</a>
            <a href="#signUp" class="user-bar-offline" id="signUp-dropdown">Sign up</a>
            <div class="logout" id="nav-toggler-logout" hidden><a>Logout</a></div>
        
          </div>
        </div>
          <div class="bar1-buttons">
           <ul>
            <li><a href="#movies" id="movies">Movies</a></li>
            <li><a href="#shows" id="tickets">Shows</a></li>
            </ul>
          </div>
      </div>
      <div class="bar2">
        <img id="img" src="Logo.svg" alt="sadad">
        <a href="#" id="logo-text">
          <h2>FILMVISARNA</h2>
        </a>
      </div>

      <ul class="bar3">
      <div class="user-bar-offline">
        <li><a href="#signUp" id="signUp">Sign up</a></li>
        <li><a href="#login" id="login">Log in</a></li>
      </div>
      <div class="user-bar-online" hidden >
        <li><a href="#" class="logout">Logout</a></li>
        <li><a href="#myPage" id="user-online">${sessionStorage.getItem('username')}</a></li>
      </div>

      </ul>
    </nav>
  </div>
    `);
    //$("#login").hide();

    this.showUserLoggedIn()
  }

  showUserLoggedIn() {
    if (sessionStorage.getItem('username') !== null) {
      $('.user-bar-offline').hide()
      $('.user-bar-online').show()
      $('#nav-toggler-logout').show();

      
    }
  }

  clear() {
    $('header').on('click', '.logout', () => {
      sessionStorage.clear();
      $(".user-bar-offline").show();
      $(".user-bar-online").hide();
      $('#nav-toggler-logout').hide();
    })
  } 
}