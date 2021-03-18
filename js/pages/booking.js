export default class Booking {

  constructor(changeListener) {
    this.changeListener = changeListener
    this.booking = {}
    console.log('Created Booking...')
  }

  async book() {
    //test
    let show = {
      "auditorium": "Lilla salongen - Monaco",
      "film": "Bröderna Lejonhjärta",
      "date": "2021-06-05",
      "time": 21.00
    }
    //test
    let person = {
      "firstName": "Anders",
      "lastName": "Andersson",
      "email": "email@emailaddress123321.com"
    }

    let seats = [1, 2, 3]

    this.booking.person = person
    this.booking.show = show
    this.booking.seats = seats

    console.table(this.booking.person)
    console.table(this.booking.show)
    console.table(this.booking.seats)

    let bookings = await JSON._load('../json/booking.json')
    console.log('bookings:', bookings)
    bookings.push(this.booking)
    console.log('bookings after adding booking:', bookings)

    await JSON._save('../json/booking.json', bookings)
  }
}