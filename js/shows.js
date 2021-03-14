
export default class Shows {

  constructor() {
    console.log('Created Shows')
    this.RANGE = 4
    this.shows = []
    this.position = 0;
  }

  async getShows() {
    console.log('Getting shows from JSON...')
    this.shows = await $.getJSON('../json/shows.json')
    this.position = this.shows.length - this.RANGE
    this.renderSelectionOfShows(this.position, this.shows.length)
    console.log('this.shows.length: ', this.shows.length)
    this.setupDelegatedEventHandlers()

  }

  nextRangeShows() {
    console.log('>>> next shows')
    if (this.position + 1 + this.RANGE < this.shows.length) {
      this.position += this.RANGE
      $('main').html = ''
      this.renderSelectionOfShows(this.position, this.RANGE)
    }
  }

  previousRangeShows() {
    console.log('<<< previous shows')
    if (this.position > 0) {
      this.position -= this.RANGE
      $('main').html = ''
      this.renderSelectionOfShows(this.position, this.RANGE)
    }
  }

  setupDelegatedEventHandlers() {
    $('main').on('click', '#left-arrow', this.previousRangeShows)
    $('main').on('click', '#right-arrow', this.nextRangeShows)
  }

  renderSelectionOfShows(start, range) {
    $('main').append(`<img class="arrow" id="left-arrow" src="../images/left_bracket_white.png">`)
    for (let i = start; i < range; i++) {
      $('main').append(`<div id="shows"><p>
        <strong>${this.shows[i].film}</strong><br>
        Saloon: ${this.shows[i].auditorium}<br>
        ${this.shows[i].date} - ${this.shows[i].time}
        </p></div>`)
    }
    $('main').append(`<img class="arrow" id="right-arrow" src="../images/right_bracket_white.png">`)
  }

  renderAllShows() { //unused
    for (let show of this.shows) {
      $('main').append(`<p>
        Movie: <strong> ${show.film} </strong><br>
        Saloon: ${show.auditorium}<br>
        Date: ${show.date} - ${show.time}
        </p>`)
    }

  }
}