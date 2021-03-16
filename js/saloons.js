let tempCinema = []
let typeOfSeats = []
let numberOfSeats
//TODO: 
//Write method to send tempCinema and typeOfSeats on to booking page
// Fix typeOfSeats so it saves correctly
// Write logic to force user to choose as many seats as they do in the aside
// Write logic that doesn't overwrite all seat values, but only changes false to true as necessary
export default class SaloonPage {

  //TODO: Add place of movie in shows.json as parameter
  constructor(changeListener/*, showPlacement*/) {
    //this.showPlacement = showPlacement
    this.changeListener = changeListener
    this.addEventHandlers()
  }

  addEventHandlers() {
    $('body').on('click', '.submit-seats', () => this.createSeatArray())
    this.changeListener.on('shows.json', () => this.getSaloons('tokyo')) //listen for changes to shows.json
  };

  async createSeatArray() {
    this.getSelectedTypes()
    this.reserveSeats()
    let list = await JSON._load('../json/shows.json')
    console.log(list)
    list[0].takenSeats = tempCinema
    list[0].typesOfEach = typeOfSeats
    await JSON._save('../json/shows.json', list);
    console.log('saved')
    console.log(list)
  }

  getSelectedTypes() {
    typeOfSeats.normal = $('#normal-tickets').find("option:selected").text()
    typeOfSeats.child = $('#child-tickets').find("option:selected").text()
    typeOfSeats.pensioner = $('#pensioner-tickets').find("option:selected").text()

    console.log(typeOfSeats)
  }

  async getSaloons(/*this.showPlacement.auditorium*/saloonChoice) {    //Loading JSON library with saloon info and returns choosen saloon.
    let saloons = await $.getJSON("../json/saloons.json");

    if (saloonChoice === /*replace with this: 'Big Saloon - Tokyo'*/'tokyo') {
      numberOfSeats = this.countTotalSeats(saloons[0])
      return this.renderSeats(saloons[0]);
    }
    else {
      numberOfSeats = this.countTotalSeats(saloons[1])
      return this.renderSeats(saloons[1]);
    }
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
    console.log('control seats ', seats)

    for (let i = 0; i < tempRow.length; i++) {      //Looping through the rows
      for (let j = 0; j < tempRow[i]; j++) {            //Looping through each seat in the row
        seatCounter++;

        if (j === 0) {    //To find the start of a new row
          if (seats[seatCounter - 1]) {    //this.openseats should be replaced with Json array file.   
            seat = this.addSeatDisabled(seatCounter) //Control if the seat is available or taken and adding them to the first place in the row (seat=)
            console.log('if j ===0', seats[seatCounter - 1])
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

  renderBookingChoices() {
    let normal = `<div class="saloon-menu"><label for="normal-tickets">Normal: </label>
      <select name="normal-ticket" class="ticket-selector" id="normal-tickets"></select></div>`

    let child = `<div class="saloon-menu"><label for="child-tickets">Child: </label>
      <select name="child-ticket" class="ticket-selector" id="child-tickets"</select></div>`

    let pensioner = `<div class="saloon-menu"><label for="pensioner-tickets">Pensioner: </label>
    <select name="pensioner-ticket" class="ticket-selector" id="pensioner-tickets"></select></div>`

    let options = `<option value="0"></option>`

    for (let i = 1; i < 7; i++) {
      options += `<option value="${i}">${i}</option>`
    }

    let bookingButton = `<h5 class="submit-seats">Continue</h5>`

    $('aside').append(normal, child, pensioner, bookingButton)
    $('.ticket-selector').append(options)
  }

  renderScreener(saloon) {
    $(".seat-box").prepend(`<div class="saloon-title">Saloon ${saloon.name}</div`);
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

    tempCinema = { ...reservedSeats }// bygg if sats med true värden skall in i json array reservedseats skall vidare
    // När vi trycker på boka knappen skall true värdena skjutas in i json Array
    console.log('reserved to tempcin', tempCinema.takenSeats)
  }

  async controlEmptySaloonSeats() { //replace tempCinema to json file from shows.json
    tempCinema = await JSON._load('../json/shows.json')
    console.log(tempCinema[0])
    if (tempCinema[0].takenSeats === undefined) { //0 hardcoded for testing. Must be changed to showPlacement before final version
      tempCinema[0].takenSeats = []
      for (let l = 0; l < numberOfSeats; l++) {
        tempCinema[0].takenSeats[l] = false
      }
    }
    console.log('controlEmpty ', tempCinema[0].takenSeats)
    return tempCinema[0].takenSeats

  }

  countTotalSeats(saloon) {
    let countSeats = 0
    for (let count of saloon.seatsPerRow) {
      countSeats += count
    }
    return countSeats;
  }

}
