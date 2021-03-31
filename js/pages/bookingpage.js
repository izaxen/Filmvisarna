
export default class BookingPage {

  constructor(changeListener, saloonPage) {
    this.changeListener = changeListener
    this.saloonPage = saloonPage
    this.setupDelegatedEventHandlers()
  }

  setBooking(list, bookedSeatsNumbers, showIndex, totalCost) {

    this.list = list
    this.bookedSeatsNumbers = bookedSeatsNumbers
    this.showIndex = showIndex
    this.totalCost = totalCost
    this.receiptJson = []
    this.usersJson = []

    this.bookingNumber = this.createRndBookingNr();    //Bryta ut till egen funktion. Och kontrollera emot receipt Jsn
    this.title = list[this.showIndex].film
    this.saloon = list[this.showIndex].auditorium
    this.date = list[this.showIndex].date
    this.time = list[this.showIndex].time

    this.bookedShowInfo = {}
    this.bookedShowInfo.title = this.title
    this.bookedShowInfo.saloon = this.saloon
    this.bookedShowInfo.date = this.date
    this.bookedShowInfo.time = this.time
    this.bookedShowInfo.bookedSeatsNumbers = this.bookedSeatsNumbers
    this.bookedShowInfo.typeOfSeats = this.typeOfSeats
    this.bookedShowInfo.totalCost = this.totalCost
  }

  async getBooking() {
    console.log('getBooking:')
    this.receiptJson = await JSON._load('../json/receipt.json')
    this.usersJson = await JSON._load('../json/users.json')
    console.log(this.receiptJson)
    this.render()
  }

  async writeJSON() {
    console.log('Bookingpage: writing to JSON: receipt.json, shows.json, and sessionStoage:tempReceipt ')
    let bookingNumber = this.bookingNumber
    let bookedShowInfo = this.bookedShowInfo

    this.receiptJson.push({ bookingNumber, bookedShowInfo })
    // Log taken seats to shows
    await JSON._save('../json/shows.json', this.list) // TODO Changelistener reloads saloon

    // Log receipt
    await JSON._save('../json/receipt.json', this.receiptJson)

    // If logged in, log booking to user
    if (sessionStorage.getItem('username') !== null) {
      console.log('bookingpage: saving booking to user')
      this.saveBookingToUser()
    } else {
      alert('Not logged in. Not booked to user, logging to sessionstorage instead')
      sessionStorage.setItem('tempReceipt', this.receiptJson)
    }
  }

  async saveBookingToUser() {
    console.log('BOOKINGPAGE', 'Logging booking to User')

    for (let i = 0; i < this.usersJson.length; i++) {
      if (this.usersJson[i].user === sessionStorage.getItem('username')) {
        console.log('entered if 1')
        if (this.usersJson[i].bookings === undefined) {
          this.usersJson[i].bookings = []
          console.log('entered if 2')
        }
        this.usersJson[i].bookings.push(this.receiptJson)
        break
      }
    }
    await JSON._save('../json/users.json', this.usersJson)
  }

  render() {
    console.log('render booking in bookingpage')
    // Utskrift av bekräftelse
    $('main').html(/*html*/`
      <div class="booking-confirmation">
        <p>Booking number: <strong>${this.bookingNumber}</strong></p>
        <p>Movie: ${this.bookedShowInfo.title}</p>
        <p>Saloon: ${this.bookedShowInfo.saloon}</p>
        <p>Date: ${this.bookedShowInfo.date}</p>
        <p>Time: ${this.bookedShowInfo.time}:00</p>
        <p>Seats: ${this.bookedShowInfo.bookedSeatsNumbers}</p>
        <button class="btn-confirm">Confirm</button>
      </div>`)
  }


  setupDelegatedEventHandlers() {
    console.log('setting up event handlers')
    $('body').on('click', '.btn-confirm', () => {
      console.log('USER CLICKED CONFIRM')
      //If user is not logged in proceed to login
      if (sessionStorage.getItem('username') === null) {
        //location.href = '#login'
        new LoginPage('#bookingsPage') // Forward the user to bookings page after login
      } else {
        location.href = '#bookingsPage'
      }
    })
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