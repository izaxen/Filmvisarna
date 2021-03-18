let tempCinema = []
let typeOfSeats = []
let numberOfSeats

export default class SaloonPage {

  //TODO: Add place of movie in shows.json as parameter
  constructor(changeListener) {
    this.changeListener = changeListener
    this.addEventHandlers()
    this.currentShow = []
    this.showIndex = -1
  }

  addEventHandlers() {
    $('body').on('click', '.submit-seats', () => this.createSeatArray())
    //this.changeListener.on('shows.json', () => this.getSaloons()) // DENNA SKALL FIXAS LÅSER PROGRAMMET JUST NU!
    //listen for changes to shows.json
  }

  checkSelectedIsCorrect() {
    let chosenNumber = parseInt(typeOfSeats.normal) + parseInt(typeOfSeats.child) + parseInt(typeOfSeats.pensioner);
    console.log('chosenNumber: ', chosenNumber)
    let checkboxCount = 0;
    let checkedBoxes = document.getElementsByName('seat-booking');
    for (let i = 0; i < checkedBoxes.length; i++) {
      if (checkedBoxes[i].checked) {
        checkboxCount++
      }
    }
    if (chosenNumber === checkboxCount && checkboxCount !== 0) {
      return true
    }
    else {
      return false
    }
  }

  async setShow(showIndex) {
    console.log('Inne i set Show')
    this.showIndex = showIndex
    this.currentShow = await JSON._load("../json/shows.json")
    console.log('this.currentShow', this.currentShow[showIndex])
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
    let countSeats = 0
    for (let count of saloon.seatsPerRow) {
      countSeats += count
    }
    return countSeats;
  }

  async renderSeats(saloon) {       //Rendering the seats in the selected saloon
    let tempRow = saloon.seatsPerRow;
    let seat;
    let seatCounter = 0;

    $('main').html(`<div class="saloon-box"><aside class="saloon-aside">
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
    $(".seat-box").prepend(`<div class="saloon-title">Saloon ${saloon.name}</div`);
  }

  renderBookingChoices() {
    let normal = `<div class="saloon-menu"><label for="normal-tickets">Normal: </label>
      <select name="normal-ticket" class="ticket-selector" id="normal-tickets"></select></div>`

    let child = `<div class="saloon-menu"><label for="child-tickets">Child: </label>
      <select name="child-ticket" class="ticket-selector" id="child-tickets"</select></div>`

    let pensioner = `<div class="saloon-menu"><label for="pensioner-tickets">Pensioner: </label>
    <select name="pensioner-ticket" class="ticket-selector" id="pensioner-tickets"></select></div>`

    let options = `<option value="0">0</option>`

    for (let i = 1; i < 7; i++) {   //Option to choose max ticket to buy
      options += `<option value="${i}">${i}</option>`
    }

    let bookingButton = `<h5 class="submit-seats">Continue</h5>`

    $('aside').append(normal, child, pensioner, bookingButton)
    $('.ticket-selector').append(options)
  }

  async controlEmptySaloonSeats() { //replace tempCinema to json file from shows.json
    //let createSaloon = [] 
    let showJson = await JSON._load('../json/shows.json')

    if (showJson[0].takenSeats === undefined) { //0 hardcoded for testing. Must be changed to showPlacement before final version
      showJson[0].takenSeats = []
      for (let l = 0; l < numberOfSeats; l++) {
        showJson[0].takenSeats[l] = false
      }
      await JSON._save("../json/shows.json", showJson);
    }
    return showJson[0].takenSeats

  }

  addSeatDisabled(seatCounter) {
    return `<input type="checkbox" name="seat-booking" class="seat" id="seat-${seatCounter - 1
      } value="${seatCounter}" disabled>
        <label for="seat-${seatCounter - 1}" class="seat">${seatCounter}</label>`;
  }

  addSeatActive(seatCounter) {
    return `<input type="checkbox" name="seat-booking" class="seat" id="seat-${seatCounter - 1
      } value="${seatCounter}">
        <label for="seat-${seatCounter - 1}" class="seat">${seatCounter}</label>`;
  }

  reserveSeats() {  //When they are checked in the seats
    let chosenSeats = document.getElementsByName('seat-booking')
    let reservedSeats = [];
    for (let i = 0; i < chosenSeats.length; i++) {
      if (chosenSeats[i].checked === true) { // if true send to bookingpage
        // save the following data: seat number and true 
        reservedSeats[i] = true
      }
      else {
        reservedSeats[i] = false
      }
    }

    tempCinema = { ...reservedSeats }
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
    for (let m = 0; m < list[0].takenSeats.length; m++) {
      if (tempCinema[m]) {
        list[0].takenSeats[m] = tempCinema[m];// Needs to have the right show object sent in from the start.

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
    let checkboxCount = 0;
    let checkedBoxes = document.getElementsByName('seat-booking');
    for (let i = 0; i < checkedBoxes.length; i++) {
      if (checkedBoxes[i].checked) {
        checkboxCount++
      }
    }
    if (chosenNumber === checkboxCount && checkboxCount !== 0) {
      return true
    }
    else {
      return false
    }
  }

}
