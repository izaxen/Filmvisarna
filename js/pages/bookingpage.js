export default class BookingPage {

  constructor(list, bookedSeatsNumbers, showIndex, totalCost) {

    this.list = list
    this.bookedSeatsNumbers = bookedSeatsNumbers
    this.showIndex = showIndex
    this.totalCost = totalCost
    this.receiptJson = {}

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
    console.log(this.receiptJson)
    this.render()
  }

  async writeJSON() {

    let bookingNumber = this.bookingNumber
    let bookedShowInfo = this.bookedShowInfo

    this.receiptJson.push({ bookingNumber, bookedShowInfo })
    await JSON._save('../json/shows.json', this.list)
    await JSON._save('../json/receipt.json', this.receiptJson)
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
      </div>`)
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