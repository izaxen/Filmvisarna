let tempCinema1 = [];
let numberOfSeats;
export default class SaloonPage {

  constructor() {
    this.addEventHandler()
  }

  async getSaloons(saloonChoice) {    //Loading JSOn library with saloon info and returns choosen saloon.
    let saloons = await $.getJSON("/js/saloons/saloons.json");
    
    if (saloonChoice === 'tokyo') {
       numberOfSeats = this.countTotalSeats(saloons[0])
      //tempCinema1= [this.countTotalSeats(saloons[0])]
     // tempCinema1.length = [this.countTotalSeats(saloons[0])];
      return this.renderSeats(saloons[0]);
    }
    else {
      numberOfSeats = this.countTotalSeats(saloons[1])
      //tempCinema1.length = [this.countTotalSeats(saloons[1])];
      //tempCinema1 = [this.countTotalSeats(saloons[1])]
      return this.renderSeats(saloons[1]);
    }
  }


  renderSeats(saloon) {       //Rendering the seats in the selected saloon
    let tempRow = saloon.seatsPerRow;
    let seat;
    let seatCounter = 0;

    $('main').html(`<div class="saloon-box"><div class="seat-box"><form action =".row"></form id="booking-form"></div><button type="submit" form="booking-form">Boka</button></div>`);     //Adding main workspace
    this.renderScreener(saloon)      //Adding a screener at the top of main workspace
    let seats1 = this.controlEmptySaloon()
    console.log('control seats ', seats1)

    for (let i = 0; i < tempRow.length; i++) {      //Looping through the rows
      for (let j = 0; j < tempRow[i]; j++) {            //Looping through each seat in the row
        seatCounter++;

        if (j === 0) {    //To find the start of a new row
          if (seats1[seatCounter - 1]) {    //this.openseats should be replaced with Json array file.   
            seat = this.addSeatRowDisabeld(seatCounter) //Control if the seat is available or taken and adding them to the first place in the row (seat=)
          }
          else {
            seat = this.addSeatRowActive(seatCounter)
          }
        }
        else {
          if (seats1[seatCounter - 1]) {       //Looping through the rest of the chairs and adding them to the row. (seat +=)
            seat += this.addSeatRowDisabeld(seatCounter)
          }
          else {
            seat += this.addSeatRowActive(seatCounter)
          }
        }
      }

      $('form').append(      //Adding a row with seats to the saloonbox
        `<div class="row" id="row-${i + 1}">${seat}</div>`
      );
    }
  }

  renderScreener(saloon) {
    $(".seat-box").prepend(`<div class="saloon-title">Saloon ${saloon.name}</div`);
  }

  addSeatRowDisabeld(seatCounter) {
    return `<input type="checkbox" name="seat-booking" class="seat" id="seat-${seatCounter - 1
      } value="${seatCounter}" disabled>
        <label for="seat-${seatCounter - 1}" class="seat">${seatCounter}</label>`;
  }

  addSeatRowActive(seatCounter) {
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
        reservedSeats[i] = 'true'
      }
      else {
        reservedSeats[i] = 'false'
      }
    }
    
    tempCinema1={...reservedSeats}// bygg if sats med true värden skall in i json array reservedseats skall vidare
    console.table('kopierade ' , tempCinema1)
    // När vi trycker på boka knappen skall true värdena skjutas in i json Array
  }

  addEventHandler() {
    $('body').on('click', 'button', () => this.reserveSeats());
  }

  controlEmptySaloon() { //get from json file
    console.log('temp cinea2 ' + numberOfSeats)
    
        
    if (tempCinema1.length < 1) {
      for (let l = 0; l < numberOfSeats; l++) {
        tempCinema1[l] = false
      }
    }
    console.table('tempcinea ' + tempCinema1)
    return tempCinema1
    
  }
  
  openSeats(place) {        //Hardcoded array for testing the disabling of the seats
    
    return tempCinema1[place]
  }
  
  countTotalSeats(saloon) {
    let countSeats = 0
    for (let count of saloon.seatsPerRow) {
      countSeats += count
    }
        return countSeats;
  }

}
//Skapa en Array (Test)
//Kontrollera om arrayn är tom
//Om tom skapa en ny annars returnera befintlig
