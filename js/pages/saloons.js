
let tempSeatValues = []
let typeOfSeats = []
let numberOfSeats
const MAX_TICKETS = 7
export default class SaloonPage {
  constructor(changeListener) {
    this.changeListener = changeListener
    this.currentShow = [];
    this.showIndex = -1;
    this.addEventHandlers()
    this.createEmptySaloons()
  }

  addEventHandlers() {
    $('body').on('click', '.submit-seats', () => this.createSeatArray())
    this.changeListener.on('shows.json', () => this.getSaloons())
    //listen for changes to shows.json
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

    if (saloonChoice === "Stora Salongen - Tokyo") {
      numberOfSeats = this.countTotalSeats(saloons[TOKYO])
      return this.renderSeats(saloons[TOKYO]);
    }
    else {
      numberOfSeats = this.countTotalSeats(saloons[MONACO])
      return this.renderSeats(saloons[MONACO]);
    }
  }

  countTotalSeats(saloon) {
    saloon.seats
    
  }

  async renderSeats(saloon) {       //Rendering the seats in the selected saloon
    let tempRow = saloon.seatsPerRow;
    let seat;
    let seatCounter = 0;

    $('main').html(/*html*/`<div class="saloon-box"><aside class="saloon-aside">
    </aside><div class="seat-box"></div></div>`);     //Adding main workspace
    this.renderScreener(saloon)      //Adding a screener at the top of main workspace
    this.renderBookingChoices()
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
      $('.seat-box').append(      //Adding a row with seats to the saloonbox
        `<div class="row" id="row-${i + 1}">${seat}</div>`
      );
    }
  }

  renderScreener(saloon) {
    $(".seat-box").prepend(/*html*/`<div class="saloon-title">Saloon ${saloon.name}</div>`);
  }

  renderBookingChoices() {
    let normal = /*html*/ `<div class="saloon-menu"><label for="normal-tickets">Normal: </label>
      <select name="normal-ticket" class="ticket-selector" id="normal-tickets"></select></div>`

    let child = /*html*/ `<div class="saloon-menu"><label for="child-tickets">Child: </label>
      <select name="child-ticket" class="ticket-selector" id="child-tickets"></select></div>`

    let pensioner = /*html*/ `<div class="saloon-menu"><label for="pensioner-tickets">Pensioner: </label>
    <select name="pensioner-ticket" class="ticket-selector" id="pensioner-tickets"></select></div>`

    let options = /*html*/ `<option value="0">0</option>`

    for (let i = 1; i < MAX_TICKETS; i++) {   //Option to choose max ticket to buy
      options += `<option value="${i}">${i}</option>`
    }

    let bookingButton = /*html*/ `<h5 class="submit-seats">Continue</h5>`

    $('aside').append(normal, child, pensioner, bookingButton)
    $('.ticket-selector').append(options)
  }

 

  addSeatDisabled(seatCounter) {
    return /*html*/ `
    <input type="checkbox" name="seat-booking" class="seat" id="seat-${seatCounter - 1}"
    value="${seatCounter}" disabled>
    <label for="seat-${seatCounter - 1}" class="seat">${seatCounter}</label>`;
  }

  addSeatActive(seatCounter) {
    return /*html*/`<input type="checkbox" name="seat-booking" class="seat" id="seat-${seatCounter - 1
      }" value="${seatCounter}">
      <label for="seat-${seatCounter - 1}" class="seat">${seatCounter}</label>`;
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
    this.getSelectedTypes()
    if (!this.checkSelectedIsCorrect()) {
      $('.saloon-aside').append(`<p class="seat-error">ERROR!<br>You must choose the same amount of seats in the menu above as you did in the left window.</p>`)
      return
    }
    //if input number of seats matches checked boxes, proceed to booking page
    this.reserveSeats()
    let list = await JSON._load('../json/shows.json')
    for (let i = 0; i < list[this.showIndex].takenSeats.length; i++) {
      if (tempSeatValues[i]) {
        list[this.showIndex].takenSeats[i] = tempSeatValues[i];// Needs to have the right show object sent in from the start.

      }
    }
    await JSON._save('../json/shows.json', list);
    //TODO send user to booking page, passing along tempCinema and typeOfSeats
  }

  getSelectedTypes() {
    typeOfSeats.normal = $('#normal-tickets').find("option:selected").text()
    typeOfSeats.child = $('#child-tickets').find("option:selected").text()
    typeOfSeats.pensioner = $('#pensioner-tickets').find("option:selected").text()
  }

  checkSelectedIsCorrect() {
    let chosenNumber = parseInt(typeOfSeats.normal) + parseInt(typeOfSeats.child) + parseInt(typeOfSeats.pensioner);
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
      console.log('ine i ifsats ', eachShow.takenSeats, 'json salon seats', saloonJson)
      if (eachShow.auditorium === "Stora Salongen - Tokyo")
      { maxSeatSaloon = saloonJson[0].seats }
      else { maxSeatSaloon = saloonJson[1].seats }

        for (let i = 0; i < maxSeatSaloon; i++) {
          eachShow.takenSeats[i] = false
        }
      }
    }
    //await JSON._save("../json/shows.json", showJson);
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

}
