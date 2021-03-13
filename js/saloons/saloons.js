export default class SaloonPage {

  openSeats(place) {        //Hardcoded array for testing the disabling of the seats
    let openSeats = [
      "true",
      "false",
      "false",
      "true",
      "false",
      "false",
      "true",
      "false",
      "true"
    ]
    return openSeats[place]
  }

  async getSaloons(saloonChoice) {    //Loading JSOn library with saloon info and returns choosen saloon.
    let saloons = await $.getJSON("/js/saloons/saloons.json");
    if (saloonChoice === 'tokyo') {
      return this.renderSeats(saloons[0]);
    }
    else return this.renderSeats(saloons[1]);
  }

  renderSeats(saloon) {       //Rendering the seats in the selected saloon
    let tempRow = saloon.seatsPerRow;
    let seat;
    let seatCounter = 0;

    $('main').html(`<div class="saloon-box"><div class="seat-box"></div></div>`);     //Adding main workspace
    this.renderScreener(saloon);      //Adding a screener at the top of main workspace

    for (let i = 0; i < tempRow.length; i++) {      //Looping through the rows
      for (let j = 0; j < tempRow[i]; j++) {            //Looping through each seat in the row
        seatCounter++;

        if (j === 0) {    //To find the start of a new row
          if (this.openSeats(seatCounter - 1) === 'true') {       //Control if the seat is available or taken and adding them to the first place in the row (seat=)
            seat = this.addSeatRowDisabeld(seatCounter)
          }
          else {
            seat = this.addSeatRowActive(seatCounter)
          }
        }
        else {
          if (this.openSeats(seatCounter - 1) === 'true') {       //Looping through the rest of the chairs and adding them to the row. (seat +=)
            seat += this.addSeatRowDisabeld(seatCounter)
          }
          else {
            seat += this.addSeatRowActive(seatCounter)
          }
        }
      }

      $(".seat-box").append(      //Adding a row with seats to the saloonbox
        `<div class="row" id="row-${i + 1}">${seat}</div>`
      );
    }
  }

  renderScreener(saloon) {
    $(".seat-box").prepend(`<div class="saloon-title">Saloon ${saloon.name}</div`);
  }

  addSeatRowDisabeld(seatCounter) {
    return `<input type="checkbox" class="seat" id="seat-${seatCounter - 1
      } value="${seatCounter}" disabled>
        <label class="seat">${seatCounter}</label>`;
  }

  addSeatRowActive(seatCounter) {
    return `<input type="checkbox" class="seat" id="seat-${seatCounter - 1
      } value="${seatCounter}">
        <label class="seat">${seatCounter}</label>`;
  }
}