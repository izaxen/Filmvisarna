import SaloonPage from "./saloons.js";
let shows = [];
let selectedShows = [];

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
    $("main").on("click", "#left-arrow", this.previousRangeShows.bind(this));
    $("main").on("click", "#right-arrow", this.nextRangeShows.bind(this));
    $("main").on("click", ".btn-book-show", () => {
      this.gotoSaloon();
    });
  }

  async readJson() {
    shows = await JSON._load("../json/shows.json");
  }

  getShows() {
    this.position = shows.length - this.RANGE;
    this.renderSelectionOfShows(this.position, shows.length);
  }

  getShowsForMovie(movieTitle) {
    selectedShows = shows.slice();
    selectedShows = selectedShows.filter(
      (selectedShow) => selectedShow.film === movieTitle
    );
  }

  nextRangeShows() {
     if (this.position + 1 + this.RANGE < selectedShows.length) {
       this.position += this.RANGE
       let temp = selectedShows.length - this.position;
       
       if (temp < this.RANGE) {
         
         this.renderSelectionOfShows(this.position, this.position + this.RANGE - temp)
         return;
       }
      this.renderSelectionOfShows(this.position, this.position + this.RANGE)
    }
  }

  previousRangeShows() {
    if (this.position >= this.RANGE) {
      this.position -= this.RANGE;
      this.renderSelectionOfShows(this.position, this.position + this.RANGE);
    }
  }

  gotoSaloon() {
    let className = event.target.className;
    className = className.replace("shows-", "");
    let showIndex = className.replace("btn-book-show", "").replaceAll(" ", "");

    for (let presentShow of shows) {
      if (
        selectedShows[showIndex].film === presentShow.film &&
        selectedShows[showIndex].date === presentShow.date &&
        selectedShows[showIndex].time === presentShow.time
      ) {
        showIndex = shows.indexOf(presentShow);

        break;
      }
    }
    this.saloonPage.setShow(showIndex)
  }

  renderSelectionOfShows(start, range) {
    $(".booking-shows").empty();
    $(".booking-shows").append(`<h1>SHOWS</h1>`);
    //$('.booking-shows').append('<br><br><br><br><br>')

    for (let i = start; i < range; i++) {
      $(".booking-shows")
        .append(`<h3 class="shows-${i}">${selectedShows[i].film}</h3><br>
        Saloon: ${selectedShows[i].auditorium}<br>
        ${selectedShows[i].date} -  ${selectedShows[i].time}:00<br>
        <button class="btn-book-show shows-${i}">book here</button>
        `);
    }
    // console.log('heej')
    $(".booking-shows").append(`<div class="arrows"></div>`);
    $(".arrows").append(
      `<img class="arrow" id="left-arrow" src="../images/left_bracket_white.png">`
    );
    $(".arrows").append(
      `<img class="arrow" id="right-arrow" src="../images/right_bracket_white.png">`
    );
  }


}
