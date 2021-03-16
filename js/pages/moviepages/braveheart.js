let movies = [];

export default class BraveHeart {

  async getMoviePage() {
    movies = await $.getJSON('json/movies.json');
    this.render();

  }

  render() {
    $('main').html(/*html */`
    <div class="movie-page">
    <header class="movie-header">
      <img src="https://www.wallpapertip.com/wmimgs/49-496556_braveheart-movie.jpg" alt="dasd" id="braveheart-img"></img>
    </header>
    <div class="movie-img-container">
        <img src="${movies[0].images}" alt="sda" class="movie-pic-page"></img>
        <div class="movie-text-container">
          <h2>Braveheart</h2>
          <h5>${movies[0].genre}</h5>
        </div>
        <h6>Reviews</h6>
      </div>
      <div class="movie-trailer-box">
      <iframe width="900" height="500" src="https://www.youtube.com/embed/1NJO0jxBtMo"
      frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
      </div>
      <div class="discription-box">
       <h4>${movies[0].description}</h4>
      </div>
    </div>
    `
    );
  }
}