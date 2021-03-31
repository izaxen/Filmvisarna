export default class FrontPage {

  async getMovies() {
    this.movies = await JSON._load('../json/movies.json');
    this.shows = await JSON._load('../json/shows.json')
    this.render();
  }

  render() {
    let randomMovie = this.randomNumberGenerator()

    $("main").html(/*html */ `
    
    <div class="front-page">
      <div class="front-movie-trailer-box">
        <div class="front-movie-header">
          <h1>${this.movies[randomMovie].title}</h1>
        </div>
        <iframe id="front-movie-trailer" src="${this.movies[randomMovie].youtubeTrailers}&autoplay=1&mute=1"></iframe>
        
      </div>
      
      <div class="candy-display">
        <div class="candy-bar">
          <div id="candy-text"><h3>Book your candy</h3></div>
        
        <div class="moving-candy">
          <div class="front-moving-popcorns">
            <img id="front-popcorn" src="https://images.unsplash.com/photo-1585647347483-22b66260dfff?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" alt="popcorn">
          </div>
          
          <div class="front-moving-cola">
            <img id="front-coca-cola" src="https://images.unsplash.com/photo-1568739319466-dff6d8fc2a41?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80" alt="coca-cola">
          </div>
          
          <div class="front-moving-bears">
            <img id="front-gummibears" src="https://images.unsplash.com/photo-1547097465-617b04e11bb2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80" alt="gummibears">
            </div>
          </div>
        </div>
      </div>    
    </div>
    `)
    this.showShows()
  }
  randomNumberGenerator() {
    return Math.floor(Math.random() * 6)
  }

  showShows() {
    let dailyShows = []



    $(".front-page").append(/*html*/`<div class="front-shows"><h3><div class="bulb">*</div>${this.getTodaysDate()}<div class="bulb">*</div></h3></div>`)
    $(".front-shows").append(/*html*/`<div class="front-daily-shows"><h2>Today's show</h2></div>`)
    for (let show of this.shows) {
      if (show.date === this.getTodaysDate()) {
        dailyShows.push(show)
      }
    }
    for (let i = 0; i < dailyShows.length; i++) {

      $(".front-shows").append(/*html*/`<div class="front-daily-shows"><p>${dailyShows[i].film}</p><p>${dailyShows[i].auditorium}</p><p>${dailyShows[i].time}:00</p></div>`)
    }

  }
  getTodaysDate() {
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate()
    if (day < 10) {
      day = '0' + day
    }
    if (month < 10) {
      month = '0' + month

    }
    return year + '-' + month + '-' + day
  }
}

{/* <div id="lights">
        <div class="bulb">*</div>
        <div class="bulb">*</div>
      </div> */}