


let movies = [];





export default class BraveHeart {

  async getMoviePage() {
    movies = await $.getJSON('json/movies.json');
    
    this.render();

  }

  render() {
    $('main').html(` 
    <div class="movie-page">
    <header class="movie-header">
      <img src="https://www.wallpapertip.com/wmimgs/49-496556_braveheart-movie.jpg" alt="dasd" id="braveheart-img"></img>
    </header>
    <div class="movie-img-container">
        <img src="${movies[0].images}" alt="sda" class="movie-pic-page"></img>
        <div class="movie-text-container">
          <h2>Braveheart (${movies[0].productionYear})</h2>
          <h4>Genre: ${movies[0].genre}</h4>
          <h4>Director: ${movies[0].director}</h4>
          <h4>Stars: ${movies[0].actors}</h4>
          <h4>Length: ${movies[0].length} minutes</h4>          

        </div>
        
      </div>
      <div class="movie-trailer-box">
      <iframe width="900" height="500" src="https://www.youtube.com/embed/1NJO0jxBtMo"
      frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
      </div>

      

      <div class="discription-box">
       <h4>${movies[0].description}</h4>
      </div>

      <div class= "review-box">
      <h3>Rating:${movies[0].reviews[0].stars}/${movies[0].reviews[0].max}</h3>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span><br>
      
      <h3>Reviews:</h3><br>
      <h4>"${movies[0].reviews[0].quote}"<br>-${movies[0].reviews[0].source}-</h4>
      
      
      </div>

    </div>

    `
    );
  }
} 