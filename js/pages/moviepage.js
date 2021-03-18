import Shows from "./shows.js";
import Booking from "./booking.js"

let movies = [];
let movieId = -1;
export default class MoviePage {
  constructor(changeListener) {
    this.changeListener = changeListener
    
    this.addEventHandler()
  }

  async getMovies() {
    movies = await $.getJSON('json/movies.json');
    this.render();

  }

  addEventHandler() {
    $('body').on('click', '.btn-book', (event) => {
      this.displayShows($(event.target).data("value"))
    })
  }

  movieTemplate(movie) {  //Edit buttons to eventhandler for even coding and movie in booking in the moviepage
      movieId++;
    
    return /*html */ `
    <div class="movie-box" id="${movieId}">
      <img src="${movie.images[0]}" alt="nisdn" class="movie-img">    
      <div class="movie-text">
          <h1>${movie.title}</h1>
          <h3>${movie.genre}</h3>
          <button onclick="location.href='#${movie.movieID}';" class="btn-movie-page">MORE</button>
          <button onclick="location.href='${movie.youtubeTrailers}';" class="btn-movie-page">Watch trailer</button>
          <button class="btn-movie-page btn-book" data-value="${movie.title}" >Book a show</button>
        </div>
      </div>`
  }

  render() {
    movieId = -1;
    $('main').html(/*html */` <div class="movie-grid">
    ${movies.map(this.movieTemplate).join("")}
    </div>
    `
    );
  }

  async displayShows(incomingMovieTitle) {

    const shows = new Shows(this.changeListener);
    const RANGE = 4;
    let start = 0
    shows.getShowsForMovie(incomingMovieTitle)
    shows.renderSelectionOfShows(start, RANGE)
    }

  book() {
    const booking = new Booking(this.changeListener)
    booking.book()
  }
}
