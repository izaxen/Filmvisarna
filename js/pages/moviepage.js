let movies = [];

export default class MoviePage {


  async getMovies() {
    movies = await $.getJSON('json/movies.json');
    this.render();

  }

  movieTemplate(movie) {
    return `
    <div class="movie-box">
      <img src="${movie.images}" alt="nisdn" class="movie-img"></img>     
      <div class="movie-text">
          <h1>${movie.title}</h1>
          <p>${movie.description}</p>
        </div>
      </div>`
  }

  render() {
    $('main').html(/*html */` <div class="movie-grid">
     ${movies.map(this.movieTemplate).join("")}
    </div>
    `);
  }
}