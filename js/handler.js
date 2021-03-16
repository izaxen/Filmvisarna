import ChangeListener from './ChangeListener.js';
const changeListener = new ChangeListener();

import FrontPage from "./pages/frontpage.js";
import MoviePage from "./pages/moviepage.js";
import TicketPage from "./pages/tickets.js";
import BraveHeart from "./pages/moviepages/braveheart.js";

const frontPage = new FrontPage();
const moviePage = new MoviePage();
const ticketPage = new TicketPage();
const braveHeart = new BraveHeart();

export default class Handler{
  
  
  constructor(selector){
    this.selector = selector;
    this.changeListener = changeListener;
    // main renders on location hash change
    // register the event listener for that:
    window.onhashchange = () => this.setCurrentPage(selector);
    // but also render it right now, based on the current hash or default page
    this.setCurrentPage(selector)
  }

  setCurrentPage(selector){
    let name = window.location.hash.replace('-','').replace('#','');
    $(selector).html(this[name || 'default']());
  }

  movies(){
    return moviePage.getMovies();
  }

  tickets(){
    return ticketPage.render();
  }

  Braveheart() {
    return braveHeart.getMoviePage();
  }

  default(){
    return frontPage.render()
  }
}