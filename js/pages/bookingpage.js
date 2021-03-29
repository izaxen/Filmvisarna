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

    this.bookedShowInfo = {
      title,
      saloon,
      date,
      time,
      bookedSeatsNumbers,
      typeOfSeats,
      totalCost
    }
    this.readJSON()
    this.writeJSON()
    this.render()
  }

  async readJSON() {
    this.receiptJson = await JSON._load('../json/receipt.json')
  }

  render() {
    // Utskrift av bekräftelse
    $('main').html(/*html*/`
      <div class="booking-confirmation">
        <p>Booking number: <strong>${bookingNumber}</strong></p>
        <p>Movie: ${bookedShowInfo[0].title}</p>
        <p>Saloon: ${bookedShowInfo[0].saloon}</p>
        <p>Date: ${bookedShowInfo[0].date}</p>
        <p>Time: ${bookedShowInfo[0].time}:00</p>
        <p>Seats: ${bookedShowInfo[0].bookedSeatsNumbers}</p>
      </div>`)
  }

  async writeJSON() {
    this.receiptJson.push({ this.bookingNumber, this.bookedShowInfo })
    await JSON._save('../json/shows.json', this.list)
    await JSON._save('../json/receipt.json', this.receiptJson)
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