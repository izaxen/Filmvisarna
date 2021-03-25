let movies = [];
let noob = window.location.href;
export default class detailPage {
  constructor(changeListener, showsPage) {
    this.changeListener = changeListener;
    this.shows = showsPage;

  }


  async getMoviePage(movieName) {
    movies = await $.getJSON("json/movies.json");
    this.render(this.getMovie(movieName));
  }

  render(movie) {
    $("main").html(/*html */ ` 
    <div class="movie-page">

    <header class="movie-header">
      <img src="${movie.images[1]}" alt="Poster for the movie ${movie.title}">
    </header>
    
    <div class="movie-img-container">
    <img src="${movie.images[0]}" alt="Poster for the movie ${movie.title}" class="movie-pic-page">
    <div class="movie-text-container">
      <h2>${movie.title}</h2>
      <h5>${movie.genre}</h5>
  
    </div>
</div>

<div class="booking-shows"></div>


<div class="discription-box">
   <h3>Description</h3>
   <h4>${movie.description}</h4>
   <h3>Actors</h3>
   <h4>${movie.actors}</h4>
   <h3>Director</h3>
   <h4>${movie.director}</h4>
   <h3>Length</h3>
   <h4>${movie.length} min</h4>
   <h3>Rating: ${movie.reviews[0].starsRating}/${movie.reviews[0].max}</h3>
   
   <div class= "rating-stars">
   </div>

   <h3>Reviews</h3>
   <h4>"${movie.reviews[0].quote}"</h4>
   <h4>"${movie.reviews[1].quote}"</h4>
</div>

<div class="movie-trailer-box">
    <iframe width="900" height="500" src="${movie.youtubeTrailers}"
    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
  </div>

    
    `);
    this.displayShows(`${movie.shows}`);
    this.getMovieStarsRating(movie)
  }

  displayShows(incomingMovieTitle) {
    const RANGE = 4;
    let start = 0;
    this.shows.filterShows('Movietitle', incomingMovieTitle);
    this.shows.renderSelectionOfShows(start, RANGE);
  }

  getMovie(name) {
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].movieID === name)
        return movies[i];
    }

  }

  getMovieStarsRating(movie) {
    $('.rating-stars').html('')

    for (let i = 0; i < movie.stars; i++) {
      $('.rating-stars').append(/*html*/`<span class="fa fa-star checked"></span>`);
    }

    if (movie.stars < 5) {
      console.log(movie.stars)
      let missingStar = 5 - movie.stars;
      for (let i = 0; i < missingStar; i++) {
        $('.rating-stars').append(/*html*/`<span class="fa fa-star "></span>`);
      }
    }
  }
}