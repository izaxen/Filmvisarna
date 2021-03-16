let movies = [];

export default class WalterMitty {

  async getMoviePage() {
    movies = await $.getJSON('json/movies.json');
    this.render();

  }

  render() {
    $('main').html(/*html */`
    <div class="movie-page">

    <header class="movie-header">
      <img src="${movies[5].images[1]}" alt="dasd" id="braveheart-img"></img>
    </header>
    
    <div class="movie-img-container">
        <img src="${movies[5].images[0]}" alt="sda" class="movie-pic-page"></img>
        <div class="movie-text-container">
          <h2>${movies[5].title}</h2>
          <h5>${movies[5].genre}</h5>
        </div>    
    </div>
    
    <div class="discription-box">
       <h3>Description:</h3>
       <h4>${movies[5].description}</h4>
       <h3>Actors:</h3>
       <h4>${movies[5].actors}</h4>
       <h3>Director:</h3>
       <h4>${movies[5].director}</h4>
       <h3>Length:</h3>
       <h4>${movies[5].length}min</h4>
    </div>

    <div class="movie-trailer-box">
        <iframe width="900" height="500" src="${movies[5].youtubeTrailers}"
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
      </div>
    `
    );
  }
}