
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
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
      <ul>
        <li><a href="#movies" id="movies">Movies</a></li>
        <li><a href="#shows" id="shows">Shows</a></li>
        <li><a href="#news" id="news">News</a></li>
      </ul>
      </div>
      <div class="bar2">
        <img id="img" src="Logo.svg" alt="sadad">
        <a href="#" id="logo-text">
          <h2>FILMVISARNA</h2>
        </a>
      </div>

      <ul class="bar3">
      <div class="user-bar-offline">
        <li><a href="#contact" id="contact">Contact</a></li>
        <li><a href="#signUp" id="signUp">Sign up</a></li>
        <li><a href="#login" id="login">Log in</a></li>
      </div>
      <div class="user-bar-online" hidden >
        <li><a id="clear">Logout</a></li>
        <li><a href="#mina-sidors" id="user-online">${sessionStorage.getItem('username')}</a></li>
      </div>
        
      
      </ul>
    </nav>
  </div>
    `);
    //$("#login").hide();

    this.showID()
  }

  showID() {
    if (sessionStorage.getItem('username') !== null) {
      $('.user-bar-offline').hide()
      $('.user-bar-online').show()

    }
  }

  clear() {
    $('header').on('click', '#clear', () => {
      sessionStorage.clear();
      $(".user-bar-offline").show();
      $(".user-bar-online").hide();
      //this.render()
    })
  }
}