let movies = [];
let movieId = -1;


export default class MoviePage {


  async getMovies() {
    movies = await $.getJSON('json/movies.json');
    this.render();

  }

  movieTemplate(movie) {

    movieId++;

    return /*html */ `
    <div class="movie-box" id="${movieId}">
      <img src="${movie.images}" alt="nisdn" class="movie-img"></img>     
      <div class="movie-text">
          <h1>${movie.title}</h1>
          <p>${movie.description}</p>
          <a href="#${movie.title}" id="#${movie.title}">${movie.title}</a>
          <a href="${movie.youtubeTrailers}"><button>Watch trailer</button></a trailer>
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
}
