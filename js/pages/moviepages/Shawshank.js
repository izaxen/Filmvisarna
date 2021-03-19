let movies = [];
export default class Shawshank {
  constructor(changeListener, showsPage) {
    this.changeListener = changeListener;
    this.shows = showsPage;
  }

  async getMoviePage() {
    movies = await $.getJSON('json/movies.json');
    this.render();

  }

  render() {
    $('main').html(/*html */`
    <div class="movie-page">

    <header class="movie-header">
      <img src="${movies[4].images[1]}" alt="dasd" id="braveheart-img"></img>
    </header>
    
    <div class="movie-img-container">
        <img src="${movies[4].images[0]}" alt="sda" class="movie-pic-page"></img>
        <div class="movie-text-container">
          <h2>${movies[4].title}</h2>
          <h5>${movies[4].genre}</h5>
        </div>    
    </div>
    <div class="booking-shows"></div>
    <div class="discription-box">
       <h3>Description:</h3>
       <h4>${movies[4].description}</h4>
       <h3>Actors:</h3>
       <h4>${movies[4].actors}</h4>
       <h3>Director:</h3>
       <h4>${movies[4].director}</h4>
       <h3>Length:</h3>
       <h4>${movies[4].length}min</h4>

       <h3>Rating:${movies[4].reviews[0].stars}/${movies[4].reviews[1].max}</h3><br>
   
       <div class= "rating-stars">
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star "></span>
       </div>
       <h3>Reviews:</h3>
       <h4>"${movies[4].reviews[0].quote}"</h4>
       <h4>"${movies[4].reviews[1].quote}"</h4>

    </div>

    <div class="movie-trailer-box">
        <iframe width="900" height="500" src="${movies[4].youtubeTrailers}"
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
      </div>
    `
    );
    this.displayShows(`${movies[4].title}`);
  }
  displayShows(incomingMovieTitle) {
    const RANGE = 4;
    let start = 0;
    this.shows.getShowsForMovie(incomingMovieTitle);
    this.shows.renderSelectionOfShows(start, RANGE);
  }
}