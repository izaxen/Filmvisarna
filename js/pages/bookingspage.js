export default class BookingsPage {

  constructor() {
  }

  async getBookings() {
    this.usersJson = await JSON._load('../json/users.json')
    console.log('getBookings: this.usersJson', this.usersJson)
    this.user = -1
    this.render()
  }

  async render() {

    // For a logged in person only
    if (sessionStorage.getItem('username') === null) {
      alert('Please log in to see all your bookings')
      return
    }

    // Get temp receipt and push to bookings
    this.receipt = sessionStorage.getItem('tempReceipt')

    console.log('bookingspage render')
    console.table(this.receipt)

    if (this.receipt !== null) {
      console.log('BookingsPage: temp receipt found!')
      sessionStorage.removeItem('tempReceipt')
      console.log('BOOKINGsPAGE', 'Logging booking to User')
      console.log('length: ', this.usersJson.length)

      for (let i = 0; i < this.usersJson.length; i++) {
        if (this.usersJson[i].username === sessionStorage.getItem('username')) {
          console.log('bookingspage: User logged in')
          if (this.usersJson[i].bookings === null) {
            this.usersJson[i].bookings = []
          }
          this.usersJson[i].bookings.push(this.receiptJson)
          this.user = i
          break
        }
      }
      await JSON._save('../json/users.json', this.usersJson)
    }

    // If no temp receipt was retrieved, retrieve user
    if (this.user === -1) {
      for (let i = 0; i < this.usersJson.length; i++) {
        if (this.usersJson[i].user === sessionStorage.getItem('username')) {
          console.log('BookingsPage: user retrieved')
          this.user = i
          break
        }
      }
    }

    console.log('this.usersJson', this.usersJson)
    let someonesBooking = this.usersJson[this.user].bookings

    console.log('bookingspage render: someonesBooking', someonesBooking)

    $('main').html(`
      <h2>Bookings</h2>
    `)
    for (let booking of someonesBooking) {
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