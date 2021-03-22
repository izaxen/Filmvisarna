import ChangeListener from './ChangeListener.js';
const changeListener = new ChangeListener();

import Shows from "./pages/shows.js";

// Main pages
import FrontPage from "./pages/frontpage.js";
import MoviePage from "./pages/moviepage.js";
import ShowPage from "./pages/showpage.js"

// Movie info pages
import BraveHeart from "./pages/moviepages/braveheart.js";
import BrotherHearts from "./pages/moviepages/Brotherslionhearts.js";
import WalterMitty from "./pages/moviepages/WalterMitty.js";
import Zohan from "./pages/moviepages/Zohan.js";
import Shawshank from "./pages/moviepages/Shawshank.js";
import Kong from "./pages/moviepages/Kong.js";

// Saloon
import LoginPage from "./pages/loginpage.js";
import SignUpPage from "./pages/signUpPage.js";

const shows = new Shows(changeListener)
const frontPage = new FrontPage();
const moviePage = new MoviePage(changeListener);
const showPage = new ShowPage(changeListener, shows)
const braveHeart = new BraveHeart(changeListener, shows);
const brotherHearts = new BrotherHearts(changeListener, shows);
const walterMitty = new WalterMitty(changeListener, shows);
const zohan = new Zohan(changeListener, shows);
const shawshank = new Shawshank(changeListener, shows);
const kong = new Kong(changeListener, shows);

const loginPage = new LoginPage();
const signUpPage = new SignUpPage();

export default class Handler {


  constructor(selector) {
    this.selector = selector;
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

  movies() {
    return moviePage.getMovies();
  }

  shows() {
    return showPage.getAllShows()
  }

  Braveheart() {
    return braveHeart.getMoviePage();
  }

  BrodernaLejonhjarta() {
    return brotherHearts.getMoviePage();
  }
  WalterMitty() {
    return walterMitty.getMoviePage();
  }
  Zohan() {
    return zohan.getMoviePage();
  }
  Shawshank() {
    return shawshank.getMoviePage();
  }
  Kong() {
    return kong.getMoviePage();
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