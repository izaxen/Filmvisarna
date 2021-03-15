import ChangeListener from './ChangeListener.js';
const changeListener = new ChangeListener();

import FrontPage from "./pages/frontpage.js";
import MoviePage from "./pages/moviepage.js";
import SaloonPage from "./saloons/saloons.js";
import LoginPage from "./pages/loginpage.js";
import SignUpPage from "./pages/signUpPage.js";

const frontPage = new FrontPage();
const moviePage = new MoviePage();
const saloonPage = new SaloonPage();
const loginPage = new LoginPage();
const signUpPage = new SignUpPage();

export default class Handler {


  constructor(selector) {
    this.selector = selector;
    this.changeListener = changeListener;
    // main renders on location hash change
    // register the event listener for that:
    window.onhashchange = () => this.setCurrentPage(selector);
    // but also render it right now, based on the current hash or default page
    this.setCurrentPage(selector)
  }

  setCurrentPage(selector) {
    let name = window.location.hash.replace('-', '').replace('#', '');
    $(selector).html(this[name || 'default']());
  }

  ////////////////
  // Our pages (the method names matches the hashes with any slashes - removed)

  movies() {
    // if we want a new instance every time we visit a page we instanciate here instead
    return moviePage.getMovies();
  }

  tickets() {
    // if we want a new instance every time we visit a page we instanciate here instead
    return saloonPage.getSaloons('tokyo');
  }

  login() {
   return loginPage.login()
  }
  
  signUp() {
    return signUpPage.signUp()
  }

  default() {
    return frontPage.render()
  }
}