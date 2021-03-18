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

  movieTemplate(movie) {
    /*let urlMovieTitle = movie.title.replaceAll(' ', '').replaceAll('\'', '').replaceAll('.', '').replaceAll('ö', 'oe').replaceAll('ä', 'ae')
    //console.log(urlMovieTitle)
    return `
    <div class="movie-box">
      <img src="${movie.images}" alt="nisdn" class="movie-img"></img>     
      <div class="movie-text">
          <h1>${movie.title}</h1>
          <p>${movie.description}</p>
          <p class="btn-movie-booking" id="btn-${urlMovieTitle}">Book show</p>
          </div> 
          
          TODO see if needed at all*/

    movieId++;

    return /*html */ `
    <div class="movie-box" id="${movieId}">
      <img src="${movie.images[0]}" alt="nisdn" class="movie-img"></img>     
      <div class="movie-text">
          <h1>${movie.title}</h1>
          <h3>${movie.genre}</h3>
          <button  onclick="location.href='#${movie.movieID}';" class="btn-movie-page">MORE</button>
          <button onclick="location.href='${movie.youtubeTrailers}';" class="btn-movie-page">Watch trailer</button>
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

  addEventHandler() {
    $('body').on('click', '.btn-movie-booking', () => this.displayShows())
  }

  async displayShows() {
    this.urlMovieTitle = event.target.id.replace('btn-', '')
    const shows = new Shows(this.changeListener);
    let selectedShows = await shows.getShowsForMovie(this.urlMovieTitle)
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
