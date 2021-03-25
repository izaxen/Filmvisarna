let shows = [];
let selectedShows = [];
let showIndex

export default class Shows {
  constructor(changeListener, saloonPage) {
    this.changeListener = changeListener
    this.saloonPage = saloonPage
    this.RANGE = 4
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

  filterShows(filterChoice, filterItem) {
    console.log('filterShows, shows:', shows)
    selectedShows = shows.slice();
    if (filterChoice === 'Movietitle') {
      selectedShows = selectedShows.filter((selectedShow) => selectedShow.film === filterItem);
    }
    else if (filterChoice === 'Date') {
      selectedShows = selectedShows.filter((selectedShow) => selectedShow.date === filterItem);
      if (selectedShows.length === 0) {
        alert('No shows on the selected date')
        //// Funkar inte att lägga till div
        //   $('.booking-shows').append(/*html*/`
        //     <div class="no-date"><p>No shows available for the selected date</p></div>`)
        //   $('main').prepend(/*html*/`
        //       <p class="no-date">No shows available for the selected date</p>`)
        // } else {
        //   $('.no-date').empty()
      }
    }
  }

  gotoSaloon() {
    let className = event.target.className;
    className = className.replace("shows-", "");
    showIndex = className.replace("btn-book-show", "").replaceAll(" ", "");

    this.findRealShowIndex(showIndex)
    this.saloonPage.setShow(showIndex)
  }

  renderSelectionOfShows(start, range) {
    $(".booking-shows").html(`<h1>SHOWS</h1>`);

    for (let i = start; i < range; i++) {
      $(".booking-shows")
        .append(/*html*/`<div class = "book-show-text">
        <h4>${selectedShows[i].film}</h4>
        <p>Saloon: ${selectedShows[i].auditorium}</p>
        <p>${selectedShows[i].date} -  ${selectedShows[i].time}:00</p>
        <div class = "unsold-seats"><p>Available seats: ${this.unsoldSeats(i)}</p></div>
        </div>
        ${this.disableBookingButton(this.unsoldSeats(i), i)}
        `);
    }
    $(".booking-shows").append(`<div class="arrows"></div>`);
    $(".arrows").append(
      `<img class="arrow" id="left-arrow" src="../images/left_bracket_white.png">`
    );
    $(".arrows").append(
      `<img class="arrow" id="right-arrow" src="../images/right_bracket_white.png">`
    );
  }

  disableBookingButton(unsold, i) {

    let actualDate = new Date();
    let testArray = selectedShows[i].date.split("-")
    testArray.push(selectedShows[i].time)

    var showDate = new Date(testArray[0], testArray[1] - 1, testArray[2], testArray[3])

    if (showDate < actualDate) {
      return `<button class="btn-book-show shows-${i}" disabled>Show closed</button><br></br>`
    }
    else if (unsold < 1) {
      return `<button class="btn-book-show shows-${i}" disabled>Show full</button><br></br>`
    }
    else {
      return `<button class="btn-book-show shows-${i}">Book this show</button><br></br>`
    }
  }

  findRealShowIndex(activeShowIndex) {
    for (let presentShow of shows) {
      for (let i = 0; i < selectedShows.length; i++) {
        if (selectedShows[activeShowIndex].film === presentShow.film &&
          selectedShows[activeShowIndex].date === presentShow.date &&
          selectedShows[activeShowIndex].time === presentShow.time
        ) {
          showIndex = shows.indexOf(presentShow); // This we need to refactor away!
          return shows.indexOf(presentShow);
        }
      }
    }
  }

  unsoldSeats(incomingShow) {
    let realIndex = this.findRealShowIndex(incomingShow)
    let countUnsoldSeats = 0
    for (let i = 0; i < shows[realIndex].takenSeats.length; i++) {
      if (!(shows[realIndex].takenSeats[i])) {
        countUnsoldSeats++
      }
    }
    return countUnsoldSeats
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
}

