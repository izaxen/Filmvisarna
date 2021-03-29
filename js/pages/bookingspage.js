export default class BookingsPage {

  constructor() {
    this.receipt = {}
  }

  async readJSON() {
    // TODO For a specific person
    this.bookings = await JSON._load('../json/receipt.json')
  }

  render() {
    $('main').html('') //empty html

    for (let booking of this.bookings) {
      $('main').append(/*html*/`
        <div class="bookings">
          <p>Booking number: <strong>${booking[i].bookingNumber}</strong></p>
          <p>Movie: ${booking[i].bookedshowInfo.title}</p>
          <p>Saloon: ${booking[i].bookedshowInfo.saloon}</p>
          <p>Date: ${booking[i].bookedshowInfo.date}</p>
          <p>Time: ${booking[i].bookedshowInfo.time}:00</p>
          <p>Seats: ${booking[i].bookedshowInfo.bookedSeatsNumber}</p>
        </div >`)
    }
  }
}