let tempSeatValues = []
let typeOfSeats = {}
let numberOfSeats
const MAX_TICKETS = 7
const NORMAL_PRICE = 85
const SENIOR_PRICE = 75
const CHILD_PRICE = 65
let currentUserData;

export default class SaloonPage {

  constructor(changeListener) {
    this.changeListener = changeListener
    this.currentShow = [];
    this.showIndex = -1;
    this.oneClickBoolean
    this.addEventHandlers()
    this.createEmptySaloons()
  }

  addEventHandlers() {
    $('body').on('change', '.ticket-selector', () => this.getTotalCost())
    $('body').on('click', '.submit-box', () => this.createSeatArray())
    $('body').on('change', '#one-click-checkbox', () => this.activateOneClickSelect())
    $('body').on('change', '.seat', () => this.changeCheckboxBehavior())
    $('body').on('change', '.seat-checkbox', () => this.getTotalCost())
    $('body').on('mouseenter', '.seat-checkbox', () => this.tryMultiHover())
    $('body').on('mouseleave', '.seat-checkbox', () => this.removeMultiHover())
    this.changeListener.on('shows.json', () => this.getSaloons())
    //listen for changes to shows.json
  }

  tryMultiHover() {
    console.log()
    if (this.oneClickBoolean) {
      let hoveredSeat = event.target.id.replaceAll('seat-', '')
      let chosenRowNumber = $(event.target).closest('.row').attr('id').replaceAll('row-', '')
      let currentRowNumber
      let totalTickets = this.getSelectedTypes()
      for (let i = 1; i < totalTickets; i++) {
        hoveredSeat++
        if ($('#seat-' + hoveredSeat).length) {
          currentRowNumber = $('#seat-' + hoveredSeat).closest('.row').attr('id').replaceAll('row-', '')
        }
        else {
          currentRowNumber = '0'
        }
        if (!($('#seat-' + hoveredSeat).length) || $('#seat-' + hoveredSeat).is(':disabled') || currentRowNumber !== chosenRowNumber) {
          this.removeMultiHover()
          break
        }
        else {
          $('#seat-label-' + hoveredSeat).addClass('multi-seat-hover')
        }
      }
    }
  }

  removeMultiHover() {
    if (this.oneClickBoolean) {
      let hoveredSeat = event.target.id.replaceAll('seat-', '')
      let totalTickets = this.getSelectedTypes()
      for (let i = 1; i < totalTickets; i++) {
        hoveredSeat++
        $('#seat-label-' + hoveredSeat).removeClass('multi-seat-hover')
      }
    }
  }

  changeCheckboxBehavior() {
    if (this.oneClickBoolean) {
      this.uncheckAllCheckboxes()
      $(event.target).prop('checked', true)
      let seatIndex = event.target.id.replaceAll("seat-", '')
      let chosenRowNumber = $(event.target).closest('.row').attr('id').replaceAll('row-', '')
      let currentRowNumber
      let numberOfTickets = this.getSelectedTypes()
      for (let i = 1; i < numberOfTickets; i++) {
        seatIndex++
        if ($('#seat-' + seatIndex).length) {
          currentRowNumber = $('#seat-' + seatIndex).closest('.row').attr('id').replaceAll('row-', '')
        }
        else {
          currentRowNumber = '0'
        }
        if (!($('#seat-' + seatIndex).length) || $('#seat-' + seatIndex).is(':disabled') || currentRowNumber !== chosenRowNumber) {
          this.uncheckAllCheckboxes()
          break
        }
        else {
          $('#seat-' + seatIndex).prop('checked', true)
        }
      }
    }
  }

  uncheckAllCheckboxes() {
    $(".seat").prop('checked', false)
  }

  activateOneClickSelect() {
    if (event.target.checked) {
      this.oneClickBoolean = true
    }
    else {
      this.oneClickBoolean = false
    }
    this.uncheckAllCheckboxes()
    this.getTotalCost()
  }

  async setShow(showIndex) {
    this.showIndex = showIndex
    this.currentShow = await JSON._load("../json/shows.json")
    this.currentShow = this.currentShow[showIndex]
    this.getSaloons()
  }

  async getSaloons() {  //Loading JSON library with saloon info and returns choosen saloon.
    const TOKYO = 0
    const MONACO = 1
    let saloonChoice = this.currentShow.auditorium
    let saloons = await JSON._load("../json/saloons.json");
    this.getUserOnline();

    if (saloonChoice === "Stora Salongen - Tokyo") {
      numberOfSeats = this.countTotalSeats(saloons[TOKYO])
      return this.renderSeats(saloons[TOKYO]);
    }
    else {
      numberOfSeats = this.countTotalSeats(saloons[MONACO])
      return this.renderSeats(saloons[MONACO]);
    }
  }

  countTotalSeats(saloon) {   //Refactor away
    return saloon.seats
  }

  async renderSeats(saloon) {       //Rendering the seats in the selected saloon
    let tempRow = saloon.seatsPerRow;
    let seat;
    let seatCounter = 0;

    $('main').html(/*html*/`
    <div class="saloon-box">
    <div class="seat-box-frame">
    <div class="seat-box">
      <div class="title-saloon"></div>
      <div class="rows-saloon"></div>
      <p class="seat-error" hidden><br>You must choose the same amount of seats in the menu <br> above as you did in the left window.</p>
      <div class="tickets-saloon"><aside class="saloon-aside"></aside></div>
    </div>
    </div>
    </div>`);
    $('seat-error').hide()
    this.renderBookingChoices()     //Adding main workspace
    this.renderTitle(saloon)      //Adding a screener at the top of main workspace
    let seats = await this.controlEmptySaloonSeats()

    for (let i = 0; i < tempRow.length; i++) {      //Looping through the rows
      for (let j = 0; j < tempRow[i]; j++) {            //Looping through each seat in the row
        seatCounter++;

        if (j === 0) {    //To find the start of a new row
          if (seats[seatCounter - 1]) {    //this.openseats should be replaced with Json array file.   
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
    $('.rows-saloon').append(/*html*/ `<div class="checkbox-box"><input type="checkbox" name="select-all-one-click" class="checkbox-one-click" id="one-click-checkbox">Choose adjacent seats</div>`)
    this.oneClickBoolean = false
  }


  renderTitle(saloon) {
    $(".title-saloon").prepend(/*html*/`<div class="saloon-title">Saloon ${saloon.name}</div>`);
  }

  renderBookingChoices() {

    let normal = /*html*/ `<div class="saloon-menu"><label for="normal-tickets">Normal: </label>
      <select name="normal-ticket" class="ticket-selector" id="normal-tickets"></select><p class="ticket-cost">${NORMAL_PRICE} SEK</p></div>`

    let child = /*html*/ `<div class="saloon-menu"><label for="child-tickets">Child: </label>
      <select name="child-ticket" class="ticket-selector" id="child-tickets"></select><p class="ticket-cost">${CHILD_PRICE} SEK</p></div>`

    let senior = /*html*/ `<div class="saloon-menu"><label for="senior-tickets">Senior: </label>
    <select name="senior-ticket" class="ticket-selector" id="senior-tickets"></select><p class="ticket-cost">${SENIOR_PRICE} SEK</p></div>`

    let options = /*html*/ `<option value="0">0</option>`

    for (let i = 1; i < MAX_TICKETS; i++) {   //Option to choose max ticket to buy
      options += `<option value="${i}">${i}</option>`
    }

    let bookingButton = /*html*/ `<div class="submit-box" hidden><h5 class="submit-seats">Book seats</h5><div class="total-cost"><p>Total: 0 SEK</p></div></div>`

    $('aside').append(normal, child, senior, bookingButton)
    $('.ticket-selector').prepend(options)
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

  reserveSeats() {  //When they are checked in the seats
    console.log('reserveSeats')
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
    console.log('creatieSeatArray()')
    if (!this.checkSelectedIsCorrect()) {
      $('.seat-error').show()
      return
    }
    //if input number of seats matches checked boxes, proceed to booking page
    this.reserveSeats()
    let list = await JSON._load('../json/shows.json')

    let bookedSeatsNumber = []


    for (let i = 0; i < list[this.showIndex].takenSeats.length; i++) {
      if (tempSeatValues[i]) {
        list[this.showIndex].takenSeats[i] = tempSeatValues[i];// Needs to have the right show object sent in from the start.
        bookedSeatsNumber.push(i + 1) //bokade platser i Arry. får +1 här vid avbokning måste vi lägga in minus 1 att den drar från.
      }
    }
    this.createBookingsAndReceipt(list, bookedSeatsNumber)
  }

  async getUserOnline() {
    let users = await JSON._load("../json/users.json");
    let userOnline = sessionStorage.getItem('username');

    for (let user of users) {
      if (user.username === userOnline) {
        currentUserData = user
      }
    }
  }

  async createBookingsAndReceipt(list, bookedSeatsNumber) {

    let totalCost = this.getTotalCost()
    let receiptJson = await JSON._load('../json/receipt.json')
    let bookedShowInfo = []
    let bookingNumber

    bookingNumber = this.createRndBookingNr(); //Bryta ut till egen funktion. Och kontrollera emot receipt Jsn
    let username = currentUserData.username;
    let email = currentUserData.email;
    let title = list[this.showIndex].film
    let saloon = list[this.showIndex].auditorium
    let date = list[this.showIndex].date
    let time = list[this.showIndex].time

    bookedShowInfo.push({
      username,
      email,
      title,
      saloon,
      date,
      time,
      bookedSeatsNumber,
      typeOfSeats,
      totalCost
    })

    receiptJson.push({ bookingNumber, bookedShowInfo })
    await JSON._save('../json/shows.json', list);
    await JSON._save('../json/receipt.json', receiptJson);

    //Utskrift av kvittot!
    alert(`        Bookingnr:  ${bookingNumber}

        Movie: ${bookedShowInfo[0].title}
        Saloon: ${bookedShowInfo[0].saloon}
        Date: ${bookedShowInfo[0].date}
        Time: ${bookedShowInfo[0].time}:00
        Seats: ${bookedShowInfo[0].bookedSeatsNumber}`)

    location.href = "#" // Going to main

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
    let chosenNumber = typeOfSeats.normal + typeOfSeats.child + typeOfSeats.senior;
    let checkedboxCount = 0;
    let checkBoxes = document.getElementsByName('seat-booking');
    for (let i = 0; i < checkBoxes.length; i++) {
      if (checkBoxes[i].checked) {
        checkedboxCount++
      }
    }
    return (chosenNumber === checkedboxCount && checkedboxCount !== 0)
  }

  async createEmptySaloons() {

    let showJson = await JSON._load('../json/shows.json')
    let saloonJson = await JSON._load('../json/saloons.json')
    let maxSeatSaloon;

    for (let eachShow of showJson) {
      if (eachShow.takenSeats === undefined) {
        eachShow.takenSeats = []

        if (eachShow.auditorium === "Stora Salongen - Tokyo") { maxSeatSaloon = saloonJson[0].seats }
        else { maxSeatSaloon = saloonJson[1].seats }

        for (let i = 0; i < maxSeatSaloon; i++) {
          eachShow.takenSeats[i] = false
        }
        await JSON._save("../json/shows.json", showJson);
      }
    }

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
  createRndBookingNr() {
    let newBookingNr = ""
    let rndLetterNumber = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y']


    //34st array 

    for (let i = 0; i < 6; i++) {
      newBookingNr += rndLetterNumber[Math.floor(Math.random() * 34)]
    }
    return newBookingNr
  }
}