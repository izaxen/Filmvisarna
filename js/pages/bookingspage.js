export default class BookingsPage {

  constructor() {
  }

  async getBookings() {
    this.bookings = await JSON._load('../json/receipt.json')
    this.render()
  }

  render() {

    // For a specific person
    // TODO Local storage
    if (sessionStorage.getItem('username') === null) {
      alert('Please log in to see all your bookings')
      return
    }

    let someonesBooking = this.bookings[sessionStorage.getItem('username')]

    console.log('bookingspage render: someonesBooking', someonesBooking)

    for (let booking of someonesBooking) {
      $('main').html(/*html*/`
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