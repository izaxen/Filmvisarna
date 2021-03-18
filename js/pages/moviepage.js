import Shows from "./shows.js";
import Booking from "./booking.js"

let movies = [];

export default class MoviePage {
  constructor(changeListener) {
    this.changeListener = changeListener
    this.addEventHandler()
  }

  async getMovies() {
    movies = await $.getJSON('json/movies.json');
    this.render();

  }

  movieTemplate(movie) {
    let urlMovieTitle = movie.title.replaceAll(' ', '').replaceAll('\'', '').replaceAll('.', '').replaceAll('ö', 'oe').replaceAll('ä', 'ae')
    //console.log(urlMovieTitle)
    return `
    <div class="movie-box">
      <img src="${movie.images}" alt="nisdn" class="movie-img"></img>     
      <div class="movie-text">
          <h1>${movie.title}</h1>
          <p>${movie.description}</p>
          <p class="btn-movie-booking" id="btn-${urlMovieTitle}">Book show</p>
          </div>
      </div>`
  }

  render() {
    $('main').html(/*html */` <div class="movie-grid">
     ${movies.map(this.movieTemplate).join("")}
    </div>
    `);
  }

  addEventHandler() {
    $('body').on('click', '.btn-movie-booking', () => this.displayShows())
  }

  async displayShows() {
    this.urlMovieTitle = event.target.id.replace('btn-', '')
    const shows = new Shows();
    let selectedShows = await shows.getShowsForMovie(this.urlMovieTitle)
    shows.setupDelegatedEventHandlers() // arrows
    //console.log(selectedShows)
    const RANGE = 4;
    let start = 0
    shows.renderSelectionOfShows(start, RANGE)
    //test
    //this.book()
  }

  book() {
    const booking = new Booking(this.changeListener)
    booking.book()
  }
}