let tempCinema = [];    // Only temp array until we can save to Json array
let numberOfSeats;
export default class SaloonPage {

  constructor() {
    this.addEventHandler()
  }

  addEventHandler() {
    $('body').on('click', '.submit-seats', () => this.reserveSeats());
  }

  async getSaloons(saloonChoice) {    //Loading JSOn library with saloon info and returns choosen saloon.
    let saloons = await $.getJSON("/js/saloons/saloons.json");

    if (saloonChoice === 'tokyo') {
      numberOfSeats = this.countTotalSeats(saloons[0])
      return this.renderSeats(saloons[0]);
    }
    else {
      numberOfSeats = this.countTotalSeats(saloons[1])
      return this.renderSeats(saloons[1]);
    }
  }

  renderSeats(saloon) {       //Rendering the seats in the selected saloon
    let tempRow = saloon.seatsPerRow;
    let seat;
    let seatCounter = 0;

    $('main').html(`<div class="saloon-box"><aside class="saloon-aside">
    </aside><div class="seat-box"></div></div>`);     //Adding main workspace
    this.renderScreener(saloon)      //Adding a screener at the top of main workspace
    this.renderBookingChoices()
    let seats = this.controlEmptySaloonSeats()
    console.log('control seats ', seats)

    for (let i = 0; i < tempRow.length; i++) {      //Looping through the rows
      for (let j = 0; j < tempRow[i]; j++) {            //Looping through each seat in the row
        seatCounter++;

        if (j === 0) {    //To find the start of a new row
          if (seats[seatCounter - 1]) {    //this.openseats should be replaced with Json array file.   
            seat = this.addSeatDisabeld(seatCounter) //Control if the seat is available or taken and adding them to the first place in the row (seat=)
            console.log('if j ===0', seats[seatCounter - 1])
          }
          else {
            seat = this.addSeatActive(seatCounter)
          }
        }
        else {
          if (seats[seatCounter - 1]) {       //Looping through the rest of the chairs and adding them to the row. (seat +=)
            seat += this.addSeatDisabeld(seatCounter)
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

  addSeatDisabeld(seatCounter) {
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
    console.log('reserved to tempcin', tempCinema)
    this.getSaloons('tokyo')  // Remove, only hardcoded to test the booking array
  }

  controlEmptySaloonSeats() { //replace tempCinema to json file from shows.json
    if (tempCinema.length < 1) {
      for (let l = 0; l < numberOfSeats; l++) {
        tempCinema[l] = false
      }
    }
    console.log('controlEmpty ', tempCinema)
    return tempCinema
  }

  countTotalSeats(saloon) {
    let countSeats = 0
    for (let count of saloon.seatsPerRow) {
      countSeats += count
    }
    return countSeats;
  }

}
