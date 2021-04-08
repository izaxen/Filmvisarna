import BookingHandler from "../pageHandlers/bookingHandler.js"
import MultiSeatClick from "../pageHandlers/saloonHandler/multiSeatClick.js"
import SaloonLogic from "../pageHandlers/saloonHandler/saloonLogic.js"
import SeatSelection from "../pageHandlers/saloonHandler/seatSelection.js"
const bookingHandler = new BookingHandler()
const multiSeatClick = new MultiSeatClick()
const saloonLogic = new SaloonLogic(bookingHandler)
const seatSelection = new SeatSelection()

const MAX_TICKETS = 7

export default class SaloonPage {

  constructor(changeListener) {
    this.changeListener = changeListener
    this.currentShow = []
    this.showIndex = -1
    this.adjacentSeatsOn = true
    this.autoToManualClick = false
    this.updating = false
    this.addEventHandlers()
    this.createEmptySaloons()
  }

  addEventHandlers() {
    this.changeListener.on('shows.json', () => {
      if (this.showIndex !== -1 && window.location.hash === "#saloon") {
        this.compareShows();
        return
      }
    });
    bookingHandler.modalFunctions();
    $('body').on('click', '#best-seats', () => this.activateGetBestSeat(this.currentShow, saloonLogic.getSelectedTypes()))
    $('body').on('click', '#man-adj-seats', () => this.toggleAdjacentSelection())
    $('body').on('click', '#reset', () => this.resetBooking())
    $('body').on('change', '.seat-checkbox', () => {
      saloonLogic.checkSelectedIsCorrect()
      this.activateManualSeats()
    })
    $('body').on('change', '.seat', () => {
      multiSeatClick.changeCheckboxBehavior(this.adjacentSeatsOn, saloonLogic.getSelectedTypes())
      saloonLogic.checkSelectedIsCorrect()
    })
    $('body').on('mouseenter', '.seat-checkbox', () => {
      multiSeatClick.addHover(saloonLogic.getSelectedTypes(), this.adjacentSeatsOn)
    })
    $('body').on('mouseleave', '.seat-checkbox', () => {
      multiSeatClick.removeHover(saloonLogic.getSelectedTypes())
    })
    $('body').on('click', '.submit-seats', () => {
      saloonLogic.createSeatArray(this.showIndex)
    });
    $('body').on('change', '.ticket-selector', () => {
      if (saloonLogic.getSelectedTypes() > 0) {
        saloonLogic.showHiddenButtons()
        this.getBestSeat()
        saloonLogic.checkSelectedIsCorrect()
      }
      else {
        this.resetBooking()
      }
    })
  }

  async compareShows() {
    saloonLogic.saveCheckedSeats()
    await this.getAllShows()
    let automaticChoice = seatSelection.getBestSeatBoolean()
    let adjacentSeatsOn = this.adjacentSeatsOn
    for (let i = 0; i < this.allShows[this.showIndex].takenSeats.length; i++) {
      if (this.allShows[this.showIndex].takenSeats[i] !== this.currentShow.takenSeats[i]) {
        this.updating = true
        await this.updateSeats(this.showToUpdateSeatsLive)
        this.currentShow = this.allShows[this.showIndex]
        saloonLogic.showHiddenButtons()
        if (!adjacentSeatsOn) {
          this.toggleAdjacentSelection()
        }
        let success = saloonLogic.reCheckSeats()
        if (!success) {
          multiSeatClick.uncheckAllCheckboxes()
        }
        if (automaticChoice) {
          this.activateGetBestSeat()
        }
      }
    }
  }

  activateManualSeats() {
    $('#man-adj-seats').removeClass('inactive-choice')
    $('#best-seats').addClass('inactive-choice')
    if (seatSelection.getBestSeatBoolean() && !this.adjacentSeatsOn && !this.autoToManualClick) {
      this.autoToManualClick = true
      multiSeatClick.uncheckAllCheckboxes()
      $(event.target).prop('checked', true)
    }
    seatSelection.setBestSeatBoolean(false)
  }

  async getAllShows() {
    this.allShows = await JSON._load("../json/shows.json")
  }

  async setShow(showIndex) {
    this.showIndex = showIndex
    await this.getAllShows()
    this.currentShow = this.allShows[showIndex]
    this.getSaloons('setShow: showIndex', showIndex)
  }

  async getSaloons() {  //Loading JSON library with saloon info and returns choosen saloon.
    const TOKYO = 0
    const MONACO = 1
    let saloonChoice = this.currentShow.auditorium
    let saloons = await JSON._load("../json/saloons.json");
    saloonLogic.getUserOnline();
    if (saloonChoice === "Big Tokyo") {
      this.numberOfSeats = saloons[TOKYO].seats
      this.showToUpdateSeatsLive = saloons[TOKYO];
      return this.renderSeats(saloons[TOKYO]);
    }
    else {
      this.numberOfSeats = saloons[MONACO].seats
      this.showToUpdateSeatsLive = saloons[MONACO];
      return this.renderSeats(saloons[MONACO]);
    }
  }

  async renderSeats(saloon) {  //Rendering the seats in the selected saloon

    $('main').html(/*html*/`
    <div class="saloon-box">
    <div class="seat-box-frame">
    <div class="seat-box">
      <div class="title-saloon"></div>
      <div class="rows-saloon"></div>
      <div class="tickets-saloon"><aside class="saloon-aside"></aside></div>
    </div>
    </div>
    </div>`);
    this.renderBookingChoices()     //Adding main workspace
    this.renderTitle(saloon)      //Adding a screener at the top of main workspace
    this.updateSeats(saloon);
  }

  async updateSeats(saloon) {
    let tempRow = saloon.seatsPerRow;
    let seat;
    let seatCounter = 0;
    let seats = await this.controlEmptySaloonSeats()
    $('.rows-saloon').html('');

    for (let i = 0; i < tempRow.length; i++) {      //Looping through the rows
      for (let j = 0; j < tempRow[i]; j++) {            //Looping through each seat in the row
        seatCounter++;

        if (j === 0) {    //To find the start of a new row
          if (seats[seatCounter - 1]) {
            seat = this.addSeatDisabled(seatCounter) //Control if the seat is available or taken and adding them to the first place in the row (seat=)
          }
          else {
            seat = this.addSeatActive(seatCounter)
          }
        }
        else {
          if (seats[seatCounter - 1]) {       //Looping through the rest of the chairs and adding them to the row. (seat +=)
            seat += this.addSeatDisabled(seatCounter)
          }
          else {
            seat += this.addSeatActive(seatCounter)
          }
        }
      }
      $('.rows-saloon').append(      //Adding a row with seats to the saloonbox
        /*html*/`<div class="row" id="row-${i + 1}">${seat}</div>`
      );

    }
    $('.rows-saloon').append(/*html*/`<div class="seat-button-holder" hidden></div>`)
    $('.seat-button-holder').append(/*html*/ `<div class="seat-choice-holder"></div>`)
    $('.seat-choice-holder').append(/*html*/ `<button class="best-seat"
    id="man-adj-seats" value="true">Adjacent seats on</button>`)
    $('.seat-choice-holder').append(/*html*/ `<button class="best-seat inactive-choice"id="best-seats">Automatic choice</button>`)
    $('.seat-button-holder').append(/*html*/ `<button class="best-seat" id="reset" type=button>Reset</button>`)
    if (!this.updating) {
      seatSelection.setBestSeatBoolean(true)
    }
    this.adjacentSeatsOn = true
    this.updating = false
  }

  renderTitle(saloon) {
    $(".title-saloon").prepend(/*html*/`<div class="saloon-title">Saloon ${saloon.name}</div>`);
  }

  renderBookingChoices() {
    let normal = /*html*/ `<div class="saloon-menu"><label for="normal-tickets">Normal </label>
      <select name="normal-ticket" class="ticket-selector" id="normal-tickets"></select><p class="ticket-cost">${saloonLogic.getNormalPrice()} SEK</p></div>`

    let child = /*html*/ `<div class="saloon-menu"><label for="child-tickets">Child </label>
      <select name="child-ticket" class="ticket-selector" id="child-tickets"></select><p class="ticket-cost">${saloonLogic.getChildPrice()} SEK</p></div>`

    let senior = /*html*/ `<div class="saloon-menu"><label for="senior-tickets">Senior </label>
    <select name="senior-ticket" class="ticket-selector" id="senior-tickets"></select><p class="ticket-cost">${saloonLogic.getSeniorPrice()} SEK</p></div>`

    let options = /*html*/ `<option value="0">0</option>`

    for (let i = 1; i < MAX_TICKETS; i++) {   //Option to choose max ticket to buy
      options += `<option value="${i}">${i}</option>`
    }

    let bookingButton = /*html*/ `<div class="submit-box"><button class="submit-seats open-saloon-modal" disabled>Book seats</button><div class="total-cost"><p>Total: 0 SEK</p></div></div>`

    $('aside').append(/*html*/`<div class="menu-holder"></div>`, bookingButton)
    $('.menu-holder').append(normal, child, senior)
    $('.ticket-selector').prepend(options)
    $('.menu-holder').addClass('pulsating-red-border')
  }

  activateGetBestSeat() {
    seatSelection.setBestSeatBoolean(true)
    this.getBestSeat()
  }

  getBestSeat() {
    if (seatSelection.getBestSeatBoolean()) {
      $('#man-adj-seats').addClass('inactive-choice')
      $('#best-seats').removeClass('inactive-choice')
      multiSeatClick.uncheckAllCheckboxes()
      let bestSeats = []
      bestSeats = seatSelection.getBestSeat(this.currentShow, saloonLogic.getSelectedTypes())
      if (bestSeats === -1) {
        this.toggleAdjacentSelection()
        return
      }
      for (let markSeats of bestSeats) {
        $("#seat-" + markSeats).prop('checked', true)
      }
      saloonLogic.checkSelectedIsCorrect()
    }
  }

  resetBooking() {
    $('#normal-tickets')[0].selectedIndex = 0
    $('#child-tickets')[0].selectedIndex = 0
    $('#senior-tickets')[0].selectedIndex = 0
    $('.submit-seats').prop('disabled', true)
    saloonLogic.showHiddenButtons()
    multiSeatClick.uncheckAllCheckboxes()
    $('.menu-holder').addClass('pulsating-red-border')
  }

  toggleAdjacentSelection() {
    this.adjacentSeatsOn = this.adjacentSeatsOn ? false : true;
    seatSelection.setBestSeatBoolean(false)
    $('#man-adj-seats').text(this.adjacentSeatsOn ? "Adjacent seats on" : "Adjacent seats off")
    $('#man-adj-seats').removeClass('inactive-choice')
    $('#best-seats').addClass('inactive-choice')
    if (this.adjacentSeatsOn) {
      this.autoToManualClick = false
      $('#man-adj-seats').removeClass('button-off')
    }
    else {
      $('#man-adj-seats').addClass('button-off')
    }
    multiSeatClick.uncheckAllCheckboxes()
    saloonLogic.checkSelectedIsCorrect()
  }

  async controlEmptySaloonSeats() {
    let showJson = await JSON._load('../json/shows.json')
    if (showJson[this.showIndex].takenSeats === undefined) {
      showJson[this.showIndex].takenSeats = []
      for (let i = 0; i < this.numberOfSeats; i++) {
        showJson[this.showIndex].takenSeats[i] = false
      }
      await JSON._save("../json/shows.json", showJson);
    }
    return showJson[this.showIndex].takenSeats
  }

  async createEmptySaloons() {
    let showJson = await JSON._load('../json/shows.json')
    let saloonJson = await JSON._load('../json/saloons.json')
    let maxSeatSaloon;
    for (let eachShow of showJson) {
      if (eachShow.takenSeats === undefined) {
        eachShow.takenSeats = []
        if (eachShow.auditorium === "Big Tokyo") { maxSeatSaloon = saloonJson[0].seats }
        else { maxSeatSaloon = saloonJson[1].seats }
        for (let i = 0; i < maxSeatSaloon; i++) {
          eachShow.takenSeats[i] = false
        }
        await JSON._save("../json/shows.json", showJson);
      }
    }
  }

  addSeatDisabled(seatCounter) {
    return /*html*/ `
    <input type="checkbox" name="seat-booking" class="seat seat-checkbox" id="seat-${seatCounter - 1}"
    value="${seatCounter}" disabled>
    <label for="seat-${seatCounter - 1}" class="seat" id="seat-label-${seatCounter - 1}">${seatCounter}</label>`;
  }

  addSeatActive(seatCounter) {
    return /*html*/`<input type="checkbox" name="seat-booking" class="seat seat-checkbox" id="seat-${seatCounter - 1
      }" value="${seatCounter}">
      <label for="seat-${seatCounter - 1}" class="seat" id="seat-label-${seatCounter - 1}">${seatCounter}</label>`;
  }
}