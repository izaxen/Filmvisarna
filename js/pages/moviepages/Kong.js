let movies = [];
import Shows from "../shows.js";

export default class WalterMitty {
  constructor(changeListener) {
    this.changeListener = changeListener;
    this.shows = new Shows(this.changeListener);
  }

  async getMoviePage() {
    movies = await $.getJSON('json/movies.json');
    this.render();

  }

  render() {
    $('main').html(/*html */`
    <div class="movie-page">

    <header class="movie-header">
      <img src="${movies[5].images[1]}" alt="dasd" id="Kong-img"></img>
    </header>
    
    <div class="movie-img-container">
        <img src="${movies[5].images[0]}" alt="sda" class="movie-pic-page"></img>
        <div class="movie-text-container">
          <h2>${movies[5].title}</h2>
          <h5>${movies[5].genre}</h5>
        </div>    
    </div>
    <div class="booking-shows"></div>
    <div class="discription-box">
       <h3>Description:</h3>
       <h4>${movies[5].description}</h4>
       <h3>Actors:</h3>
       <h4>${movies[5].actors}</h4>
       <h3>Director:</h3>
       <h4>${movies[5].director}</h4>
       <h3>Length:</h3>
       <h4>${movies[5].length}min</h4>

       <h3>Rating:${movies[5].reviews[0].stars}/${movies[5].reviews[1].max}</h3><br>
   
       <div class= "rating-stars">
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star "></span>
       </div>
       <h3>Reviews:</h3>
       <h4>"${movies[5].reviews[0].quote}"</h4>
       
       
    </div>

    <div class="movie-trailer-box">
        <iframe width="900" height="500" src="${movies[5].youtubeTrailers}"
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
      </div>
    `
    );
    this.displayShows(`${movies[5].title}`);
  }
  displayShows(incomingMovieTitle) {
    const RANGE = 4;
    let start = 0;
    this.shows.getShowsForMovie(incomingMovieTitle);
    this.shows.renderSelectionOfShows(start, RANGE);
  }
}