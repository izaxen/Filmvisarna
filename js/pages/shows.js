import SaloonPage from './saloons.js'
let shows = [];
let selectedShows = []

export default class Shows {

  constructor(changeListener) {
    this.changeListener = changeListener
    this.saloonPage = new SaloonPage(this.changeListener)
    this.RANGE = 4
    this.readJson()
    this.position = 0;
    this.setupDelegatedEventHandlers()
  }

  setupDelegatedEventHandlers() {
    $('main').on('click', '#left-arrow', this.previousRangeShows.bind(this))
    $('main').on('click', '#right-arrow', this.nextRangeShows.bind(this))
    $('main').on('click', '.shows', this.gotoSaloon.bind(this))
  }

  async readJson() {
    shows = await JSON._load('../json/shows.json')
  }


  getShows() {
    this.position = shows.length - this.RANGE
    this.renderSelectionOfShows(this.position, shows.length)
  }

  getShowsForMovie(movieTitle) {
    selectedShows = shows.slice()
    selectedShows = selectedShows.filter(selectedShow => selectedShow.film === movieTitle)
  }

  nextRangeShows() {
    if (this.position + 1 + this.RANGE < selectedShows.length) {
      this.position += this.RANGE
      this.renderSelectionOfShows(this.position, this.position + this.RANGE)
    }
  }

  previousRangeShows() {
    if (this.position >= this.RANGE) {
      this.position -= this.RANGE
      this.renderSelectionOfShows(this.position, this.position + this.RANGE)
    }
  }

  gotoSaloon() {
    let className = event.target.className
    className = className.replace('shows-', '')
    let selectedIndex = className.replace('shows', '').replaceAll(' ', '')
    let showIndex = -1

    for (let presentShow of shows) {
      if (selectedShows[selectedIndex].film === presentShow.film && selectedShows[selectedIndex].date === presentShow.date
        && selectedShows[selectedIndex].time === presentShow.time) {
        showIndex = shows.indexOf(presentShow)

        break;
      }
    }
    this.saloonPage.setShow(showIndex)
  }

  renderSelectionOfShows(start, range) {
    $('main').empty()
    $('main').append('<br><br><br><br><br>')

    $('main').append(`<img class="arrow" id="left-arrow" src="../images/left_bracket_white.png">`)
    for (let i = start; i < range; i++) {
      $("main").append(`<p class="shows shows-${i}"><strong class="shows-${i}">${selectedShows[i].film}</strong><br>
        Saloon: ${selectedShows[i].auditorium}<br>
        ${selectedShows[i].date} -  ${selectedShows[i].time}:00
        </p>`);
    }
    $('main').append(`<img class="arrow" id="right-arrow" src="../images/right_bracket_white.png">`)
  }

  renderAllShows() { //unused
    for (let show of shows) {
      $('main').append(`<div class="show"><p>
        Movie: <strong> ${show.film} </strong><br>
        Saloon: ${show.auditorium}<br>
        Date: ${show.date} - ${show.time}
        </p></div>`)
    }
  }
}
