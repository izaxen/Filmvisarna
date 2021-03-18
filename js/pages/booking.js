export default class Booking {

  constructor() {
    this.booking = {}
    console.log('Created Booking...')
  }

  book() {
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

    console.table(booking.person)
    console.table(booking.show)
    console.table(booking.seats)

    let bookingJSON = JSON.stringify(booking)
    console.log(bookingJSON)
  }
}