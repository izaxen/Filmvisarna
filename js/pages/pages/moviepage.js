
let movies = [];
let movieId = -1;
export default class MoviePage {

  async getMovies() {
    movies = await JSON._load('../json/movies.json');
    this.render();
  }

  movieTemplate(movie) {
    movieId++;
    return /*html */ `
    <div class="movie-box" id="${movieId}">
      <img src="${movie.images[0]}" alt="nisdn" class="movie-img">    
      <div class="movie-text">
          <h1>${movie.title}</h1>
          <h3>${movie.genre}</h3>
          <button onclick="location.href='#${movie.movieID}';" class="btn-movie-page">MORE</button>
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

  book() {
    const booking = new Booking(this.changeListener)
    booking.book()
  }
}
