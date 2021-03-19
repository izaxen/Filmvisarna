import SaloonPage from './saloons.js'
let shows = [];
let selectedShows = []

export default class Shows {

  constructor(changeListener) {
    this.changeListener = changeListener
    this.RANGE = 4
    this.readJson()
    this.position = 0;
    this.setupDelegatedEventHandlers()
  }

  setupDelegatedEventHandlers() {
    $('main').on('click', '#left-arrow', this.previousRangeShows.bind(this))
    $('main').on('click', '#right-arrow', this.nextRangeShows.bind(this))
    $('main').on('click', '.btn-book-show', ()=>{
      console.log("this.gotoSaloon.bind(this) blablalbla")
      this.gotoSaloon()
    })
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
    console.log('Jag är innen i gotosalon')
    let className = event.target.className
    console.log("classname1 ", className)
    className = className.replace('shows-', '')
    console.log("classname2 ", className);
    let showIndex = className.replace('btn-book-show', '').replaceAll(' ', '')
    console.log('classname3 ', className)
    console.log('Showindex', showIndex)

    for (let presentShow of shows) {
      if (selectedShows[showIndex].film === presentShow.film && selectedShows[showIndex].date === presentShow.date
        && selectedShows[showIndex].time === presentShow.time) {
        showIndex = shows.indexOf(presentShow)

        break;
      }
    }
    const saloonPage = new SaloonPage(this.changeListener)
    saloonPage.setShow(showIndex)
  }

  renderSelectionOfShows(start, range) {
    $('.booking-shows').empty()
    //$('.booking-shows').append('<br><br><br><br><br>')

    
    for (let i = start; i < range; i++) {
      $('.booking-shows').append(`<p class="shows shows-${i}"><strong class="shows-${i}">${selectedShows[i].film}</strong><br>
        Saloon: ${selectedShows[i].auditorium}<br>
        ${selectedShows[i].date} -  ${selectedShows[i].time}:00<br>
        <button class="btn-book-show shows-${i}">book here</button>
        </p>`);

    }
    $('.booking-shows').append(`<div class="arrows"></div>`)
    $('.arrows').append(`<img class="arrow" id="left-arrow" src="../images/left_bracket_white.png">`)
    $('.arrows').append(`<img class="arrow" id="right-arrow" src="../images/right_bracket_white.png">`)
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
