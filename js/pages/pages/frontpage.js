export default class FrontPage {

  async getMovies() {
    this.movies = await JSON._load('../json/movies.json');
    this.shows = await JSON._load('../json/shows.json')
    this.render();
    window.location.href ="#"
  }

  render() {
    let randomMovie = this.randomNumberGenerator()

    $("main").html(/*html */ `
    
    <div class="front-page">
        <iframe frameBorder ="0" id="front-movie-trailer" src="${this.movies[randomMovie].youtubeTrailers}&autoplay=1&mute=1&controls=0&showinfo=0&autohide=1"></iframe>`
    )

    this.showShows()
  }
  randomNumberGenerator() {
    return Math.floor(Math.random() * 6)
  }

  showShows() {
    let dailyShows = []

    $(".front-page").append(/*html*/`<div class="front-shows"></div>`)
    $(".front-shows").append(/*html*/ `
    <div class="front-daily-shows">
      <h2>
        <div class="pulsing-star">*</div>${this.getTodaysDate()}<div class="pulsing-star">*</div>
      </h2>
        <div class="shows-today"></div>
      </div>`);
    for (let show of this.shows) {
      if (show.date === this.getTodaysDate()) {
        dailyShows.push(show)
      }
    }
    if (dailyShows.length === 0) {
      $('.shows-today').append(/*html*/`<div class="showinfo"><p>There are no shows today</p></div>`)
      return
    }
    for (let i = 0; i < dailyShows.length; i++) {

      $(".shows-today").append(/*html*/`<div class="showinfo"><h5>${dailyShows[i].film}</h5><p>${dailyShows[i].auditorium}</p><p>${dailyShows[i].time}:00</p></div>`)
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