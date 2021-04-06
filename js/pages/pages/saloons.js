let tempSeatValues = []
let typeOfSeats = {}
let numberOfSeats
const MAX_TICKETS = 7
const NORMAL_PRICE = 85
const SENIOR_PRICE = 75
const CHILD_PRICE = 65
let showToUpdateSeatsLive;
let toggleButtonAutMan = true
let bestSeatBoolean = true
let autoToManualClick = false
let currentUserData;


import bookingHandler from "../pageHandlers/bookingHandler.js";
import MultiSeatClick from "../pageHandlers/saloonHandler/multiSeatClick.js"
const multiSeatClick = new MultiSeatClick()
const bookHandler = new bookingHandler();

export default class SaloonPage {

  constructor(changeListener, seatSelection) {
    this.changeListener = changeListener
    this.currentShow = [];
    this.showIndex = -1;
    this.addEventHandlers()
    this.createEmptySaloons()
    this.seatSelection = seatSelection
  }

  addEventHandlers() {
    bookHandler.modalFunctions();
    $('body').on('click', '#best-seats', () => this.activateGetBestSeat(this.currentShow, this.getSelectedTypes()))
    $('body').on('click', '#man-adj-seats', () => this.toggleAutoManSelection())
    $('body').on('click', '#reset', () => this.resetBooking())
    $('body').on('change', '.seat-checkbox', () => {
      this.getTotalCost()
      this.activateManualSeats()
    })
    $('body').on('change', '.seat', () => {
      multiSeatClick.changeCheckboxBehavior(this.oneClickBoolean, this.getSelectedTypes())
      this.getTotalCost()
    })
    $('body').on('mouseenter', '.seat-checkbox', () => {
      multiSeatClick.tryMultiHover(this.oneClickBoolean, this.getSelectedTypes())
    })
    $('body').on('mouseleave', '.seat-checkbox', () => {
      multiSeatClick.removeMultiHover(this.oneClickBoolean, this.getSelectedTypes())
    })
    $('body').on('click', '.submit-seats', () => {
      this.createSeatArray()
    });
    $('body').on('change', '.ticket-selector', () => {
      this.showHiddenButtons()
      this.getBestSeat()
      this.getTotalCost()
    })
    this.changeListener.on('shows.json', () => {
      this.compareShows()
    });
  }

  async compareShows() {
    await this.getAllShows()
    for (let i = 0; i < this.allShows[this.showIndex].takenSeats.length; i++) {
      if (this.allShows[this.showIndex].takenSeats[i] !== this.currentShow.takenSeats[i]) {
        this.updateSeats(showToUpdateSeatsLive)
      }
    }
  }

  activateManualSeats() {
    $('#man-adj-seats').removeClass('inactive-choice')
    $('#best-seats').addClass('inactive-choice')
    if (bestSeatBoolean && !this.oneClickBoolean && !autoToManualClick) {
      autoToManualClick = true
      multiSeatClick.uncheckAllCheckboxes()
      $(event.target).prop('checked', true)
    }
  }

  async getAllShows() {
    this.allShows = await JSON._load("../json/shows.json")
  }

  async setShow(showIndex) {
    this.showIndex = showIndex
    await this.getAllShows()
    this.currentShow = this.allShows[showIndex]
    this.getSaloons()
  }

  async getSaloons() {  //Loading JSON library with saloon info and returns choosen saloon.
    const TOKYO = 0
    const MONACO = 1
    let saloonChoice = this.currentShow.auditorium
    let saloons = await JSON._load("../json/saloons.json");
    this.getUserOnline();

    if (saloonChoice === "Big Tokyo") {
      numberOfSeats = saloons[TOKYO].seats
      showToUpdateSeatsLive = saloons[TOKYO];
      return this.renderSeats(saloons[TOKYO]);
    }
    else {
      numberOfSeats = saloons[MONACO].seats
      showToUpdateSeatsLive = saloons[MONACO];
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
    this.oneClickBoolean = true
  }

  renderTitle(saloon) {
    $(".title-saloon").prepend(/*html*/`<div class="saloon-title">Saloon ${saloon.name}</div>`);
  }

  renderBookingChoices() {
    let normal = /*html*/ `<div class="saloon-menu"><label for="normal-tickets">Normal </label>
      <select name="normal-ticket" class="ticket-selector" id="normal-tickets"></select><p class="ticket-cost">${NORMAL_PRICE} SEK</p></div>`

    let child = /*html*/ `<div class="saloon-menu"><label for="child-tickets">Child </label>
      <select name="child-ticket" class="ticket-selector" id="child-tickets"></select><p class="ticket-cost">${CHILD_PRICE} SEK</p></div>`

    let senior = /*html*/ `<div class="saloon-menu"><label for="senior-tickets">Senior </label>
    <select name="senior-ticket" class="ticket-selector" id="senior-tickets"></select><p class="ticket-cost">${SENIOR_PRICE} SEK</p></div>`

    let options = /*html*/ `<option value="0">0</option>`

    for (let i = 1; i < MAX_TICKETS; i++) {   //Option to choose max ticket to buy
      options += `<option value="${i}">${i}</option>`
    }

    let bookingButton = /*html*/ `<div class="submit-box" hidden><h5 class="submit-seats open-saloon-modal">Book seats</h5><div class="total-cost"><p>Total: 0 SEK</p></div></div>`

    $('aside').append(`<div class="menu-holder"></div>`, bookingButton)
    $('.menu-holder').append(normal, child, senior)
    $('.ticket-selector').prepend(options)
  }

  reserveSeats() {  //When they are checked in the seats
    let allSeats = document.getElementsByName('seat-booking')
    let reservedSeats = [];
    for (let i = 0; i < allSeats.length; i++) {
      if (allSeats[i].checked === true) { // if true send to bookingpage
        // save the following data: seat number and true 
        reservedSeats[i] = true
      }
      else {
        reservedSeats[i] = false
      }
    }
    tempSeatValues = { ...reservedSeats }
  }

  async createSeatArray() {
    this.reserveSeats()
    let list = await JSON._load('../json/shows.json')

    let bookedSeatsNumber = []

    for (let i = 0; i < list[this.showIndex].takenSeats.length; i++) {
      if (tempSeatValues[i]) {
        list[this.showIndex].takenSeats[i] = tempSeatValues[i];// Needs to have the right show object sent in from the start.
        bookedSeatsNumber.push(i + 1) //bokade platser i Arry. får +1 här vid avbokning måste vi lägga in minus 1 att den drar från.
      }
    }
    bookHandler.createBookingsAndReceipt(list, bookedSeatsNumber, this.showIndex, this.getTotalCost(), typeOfSeats, currentUserData)
  }

  async getUserOnline() {
    let users = await JSON._load("../json/users.json");
    let userOnline = sessionStorage.getItem('username');

    for (let user of users) {
      if (user.username === userOnline) {
        currentUserData = user
      }
    }
   // return currentUserData
  }

  activateGetBestSeat() {
    bestSeatBoolean = true
    this.getBestSeat()
  }

  getBestSeat() {
    if (bestSeatBoolean) {
      $('#man-adj-seats').addClass('inactive-choice')
      $('#best-seats').removeClass('inactive-choice')
      multiSeatClick.uncheckAllCheckboxes()
      let bestSeats = []
      bestSeats = this.seatSelection.getBestSeat(this.currentShow, this.getSelectedTypes())
      for (let markSeats of bestSeats) {
        $("#seat-" + markSeats).prop('checked', true)
      }
      this.getTotalCost()
    }
  }

  resetBooking() {
    $('#normal-tickets')[0].selectedIndex = 0
    $('#child-tickets')[0].selectedIndex = 0
    $('#senior-tickets')[0].selectedIndex = 0
    $('.submit-box').hide()
    this.showHiddenButtons()
    multiSeatClick.uncheckAllCheckboxes()
  }

  showHiddenButtons() {
    if (this.getSelectedTypes() > 0) {
      $('.seat-button-holder').show()
      return
    }
    $('.seat-button-holder').hide()
  }

  toggleAutoManSelection() {
    toggleButtonAutMan = toggleButtonAutMan ? false : true;
    bestSeatBoolean = false;
    $('#man-adj-seats').text(toggleButtonAutMan ? "Adjacent seats on" : "Adjacent seats off")
    $('#man-adj-seats').removeClass('inactive-choice')
    $('#best-seats').addClass('inactive-choice')
    if (toggleButtonAutMan) {
      this.oneClickBoolean = true
      autoToManualClick = false
      $('#man-adj-seats').removeClass('button-off')
    }
    else {
      this.oneClickBoolean = false
      $('#man-adj-seats').addClass('button-off')
    }
    multiSeatClick.uncheckAllCheckboxes()
  }

  getSelectedTypes() {
    typeOfSeats.normal = $('#normal-tickets').find("option:selected").text()
    typeOfSeats.child = $('#child-tickets').find("option:selected").text()
    typeOfSeats.senior = $('#senior-tickets').find("option:selected").text()
    typeOfSeats.normal = parseInt(typeOfSeats.normal)
    typeOfSeats.child = parseInt(typeOfSeats.child)
    typeOfSeats.senior = parseInt(typeOfSeats.senior)
    return (typeOfSeats.normal + typeOfSeats.child + typeOfSeats.senior)
  }

  getTotalCost() {
    let totalPrice = 0
    if (this.getSelectedTypes() !== 0 && this.checkSelectedIsCorrect()) {

      for (let key in typeOfSeats) {
        if (key === 'normal') {
          totalPrice += typeOfSeats[key] * NORMAL_PRICE
        }
        else if (key === 'child') {
          totalPrice += typeOfSeats[key] * CHILD_PRICE
        }
        else if (key === 'senior') {
          totalPrice += typeOfSeats[key] * SENIOR_PRICE
        }
      }
      $('.submit-box').show()
      $('.total-cost').html(/*html*/`<p>Total: ${totalPrice} SEK</p>`)
    }
    else {
      $('.submit-box').hide()
    }
    return totalPrice
  }

  checkSelectedIsCorrect() {
    let checkedboxCount = 0;
    let checkBoxes = document.getElementsByName('seat-booking');
    for (let i = 0; i < checkBoxes.length; i++) {
      if (checkBoxes[i].checked) {
        checkedboxCount++
      }
    }
    return (this.getSelectedTypes() === checkedboxCount && checkedboxCount !== 0)
  }

  countTotalSeats(saloon) {   //Refactor away
    return saloon.seats
  }

  async controlEmptySaloonSeats() {
    let showJson = await JSON._load('../json/shows.json')
    if (showJson[this.showIndex].takenSeats === undefined) {
      showJson[this.showIndex].takenSeats = []
      for (let i = 0; i < numberOfSeats; i++) {
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