export default class Header{

  render() {

    $('header').append(/*html */`
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
        <li><a href="#tickets" id="tickets">Tickets</a></li>
        <li><a href="#news" id="news">News</a></li>
        <li><a href="#member" id="member">Member</a></li>
      </ul>
      </div>
      <div class="bar2">
        <img id="img" src="Logo.svg" alt="sadad">
        <a href="#" id="logo-text">
          <h2>Cinema World</h2>
        </a>
      </div>

      <ul class="bar3">
        <li><a href="#contact" id="contact">Contact</a></li>
        <li><a href="#signUp" id="signUp">Sign up</a></li>
        <li><a href="#login" id="login">Log in</a></li>
        
      </ul>
    </nav>
  </div>
    `);
  }
}