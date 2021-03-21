import SaloonPage from "./saloons.js";
let shows = [];
let selectedShows = [];
let showIndex

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
    selectedShows = selectedShows.filter((selectedShow) => selectedShow.film === movieTitle);
  }

 

  gotoSaloon() {
    let className = event.target.className;
    className = className.replace("shows-", "");
    showIndex = className.replace("btn-book-show", "").replaceAll(" ", "");
    
    this.findRealShowIndex(showIndex)
    this.saloonPage.setShow(showIndex)
  }

  renderSelectionOfShows(start, range) {
    $(".booking-shows").empty();
    $(".booking-shows").append(`<h1>SHOWS</h1>`);
    
    for (let i = start; i < range; i++) {
      $(".booking-shows")
        .append(`<br><div class = "book-show-text">
        Saloon: ${selectedShows[i].auditorium}<br>
        ${selectedShows[i].date} -  ${selectedShows[i].time}:00<br>
        <div class = "unsold-seats">Available seats: ${this.unsoldSeats(i)}</div>
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
    let testArray =selectedShows[i].date.split("-")
    testArray.push(selectedShows[i].time)
   
    var showDate = new Date(testArray[0], testArray[1]-1,testArray[2],testArray[3])

    if (showDate < actualDate) {
      return `<button class="btn-book-show shows-${i}" disabled>Show closed</button><br></br>`
    }
    else if (unsold < 1) {
      return `<button class="btn-book-show shows-${i}" disabled>Show full</button><br></br>`
    }
    else{
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
    let realIndex =  this.findRealShowIndex(incomingShow)
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

