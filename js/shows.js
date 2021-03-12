
export default class Shows {

  constructor() {
    console.log('Created Shows')
    this.shows = []
    this.getShows()
  }

  async getShows() {
    console.log('Getting shows from JSON...')
    this.shows = await $.getJSON('../json/shows.json')
    this.renderSelectionOfShows(0, 4) // TODO create arrows to navigate shows
  }

  renderSelectionOfShows(start, range) {
    $('main').append(`<img class="arrow" src="../images/left_bracket_white.png">`)
    for (let i = start; i < range; i++) {
      $('main').append(`<div id="shows"><p>
        Movie: <strong>${this.shows[i].film}</strong><br>
        Saloon: ${this.shows[i].auditorium}<br>
        ${this.shows[i].date} - ${this.shows[i].time}
        </p></div>`)
    }
    $('main').append(`<img class="arrow" src="../images/right_bracket_white.png">`)
  }

  renderAllShows() {
    for (let show of this.shows) {
      $('main').append(`<p>
        Movie: <strong> ${show.film} </strong><br>
        Saloon: ${show.auditorium}<br>
        Date: ${show.date} - ${show.time}
        </p>`)
    }

  }
}