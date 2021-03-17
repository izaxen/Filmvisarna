
export default class Shows {

  constructor() {
    console.log('Created Shows')
    this.RANGE = 4
    this.shows = []
    this.position = 0;
  }

  async getShowsJSON() {
    console.log('Getting shows from JSON...')
    return await $.getJSON('../json/shows.json')
  }

  async getShows() {
    await this.getShowsJSON()
    this.position = this.shows.length - this.RANGE
    this.setupDelegatedEventHandlers()
    this.renderSelectionOfShows(this.position, this.shows.length)
    console.log('this.shows.length: ', this.shows.length)
    this.setupDelegatedEventHandlers()
  }

  async getShowsForMovie(urlMovieTitle) {
    console.log(urlMovieTitle)
    this.shows = await this.getShowsJSON()
    let selectedShows = this.shows.slice()

    selectedShows = selectedShows.filter(d => d["film"].replaceAll(' ', '').replaceAll('\'', '').replaceAll('.', '').replaceAll('ö', 'oe').replaceAll('ä', 'ae') === urlMovieTitle)
    this.shows = selectedShows

    //console.log(selectedShows)
    return selectedShows
  }

  nextRangeShows() {
    console.log('position, RANGE, shows.length: ', this.position, this.RANGE, this.shows.length)
    if (this.position + 1 + this.RANGE < this.shows.length) {
      console.log('>>> next shows')
      this.position += this.RANGE
      this.renderSelectionOfShows(this.position, this.position + this.RANGE)
    }
  }

  previousRangeShows() {
    console.log('this.position', this.position)
    if (this.position >= this.RANGE) {
      console.log('<<< previous shows')
      this.position -= this.RANGE
      this.renderSelectionOfShows(this.position, this.position + this.RANGE)
    }
  }

  setupDelegatedEventHandlers() {
    $('main').on('click', '#left-arrow', this.previousRangeShows.bind(this))
    $('main').on('click', '#right-arrow', this.nextRangeShows.bind(this))
  }

  renderSelectionOfShows(start, range) {
    $('main').empty()
    $('main').append('<br><br><br><br><br>') //TODO Remove. Header workaround for the current layout

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