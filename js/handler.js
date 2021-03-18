import ChangeListener from './ChangeListener.js';
const changeListener = new ChangeListener();

// Main pages
import FrontPage from "./pages/frontpage.js";
import MoviePage from "./pages/moviepage.js";
import TicketPage from "./pages/tickets.js";

// Movie info pages
import BraveHeart from "./pages/moviepages/braveheart.js";
import BrotherHearts from "./pages/moviepages/Brotherslionhearts.js";
import WalterMitty from "./pages/moviepages/WalterMitty.js";
import Zohan from "./pages/moviepages/Zohan.js";
import Shawshank from "./pages/moviepages/Shawshank.js";
import Kong from "./pages/moviepages/Kong.js";

// Saloon
import SaloonPage from "./pages/saloons.js";
import LoginPage from "./pages/loginpage.js";
import SignUpPage from "./pages/signUpPage.js";
import ShowsPage from "./pages/shows.js"


const frontPage = new FrontPage();
const moviePage = new MoviePage(changeListener);
const ticketPage = new TicketPage();
const braveHeart = new BraveHeart();
const brotherHearts = new BrotherHearts();
const walterMitty = new WalterMitty();
const zohan = new Zohan();
const shawshank = new Shawshank();
const kong = new Kong();

const saloonPage = new SaloonPage(changeListener);
const loginPage = new LoginPage();
const signUpPage = new SignUpPage();
const showsPage = new ShowsPage();

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

  movies() {
    return moviePage.getMovies();
  }

  tickets() {
    //return moviePage.displayShows()
    return saloonPage.setShow(0) 

    // if we want a new instance every time we visit a page we instanciate here instead
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