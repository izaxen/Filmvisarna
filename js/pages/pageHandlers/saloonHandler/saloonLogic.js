const NORMAL_PRICE = 85
const SENIOR_PRICE = 75
const CHILD_PRICE = 65

export default class SaloonLogic {
  constructor(bookingHandler) {
    this.bookingHandler = bookingHandler
    this.tempSeatValues = []
    this.typeOfSeats = {}
  }

  async getUserOnline() {
    let users = await JSON._load("../json/users.json");
    let userOnline = sessionStorage.getItem('username');

    for (let user of users) {
      if (user.username === userOnline) {
        currentUserData = user
      }
    }
  }

  reserveSeats() {  //When they are checked in the seats
    let allSeats = document.getElementsByName('seat-booking')
    let reservedSeats = [];
    for (let i = 0; i < allSeats.length; i++) {
      if (allSeats[i].checked === true) { // if true send to bookingpage
        // save the following data: seat number and true 
        reservedSeats[i] = true
      }
      else {
        reservedSeats[i] = false
      }
    }
    this.tempSeatValues = { ...reservedSeats }
  }

  getSelectedTypes() {
    this.typeOfSeats.normal = $('#normal-tickets').find("option:selected").text()
    this.typeOfSeats.child = $('#child-tickets').find("option:selected").text()
    this.typeOfSeats.senior = $('#senior-tickets').find("option:selected").text()
    this.typeOfSeats.normal = parseInt(this.typeOfSeats.normal)
    this.typeOfSeats.child = parseInt(this.typeOfSeats.child)
    this.typeOfSeats.senior = parseInt(this.typeOfSeats.senior)
    return (this.typeOfSeats.normal + this.typeOfSeats.child + this.typeOfSeats.senior)
  }

  getTotalCost() {
    let totalPrice = 0
    for (let key in this.typeOfSeats) {
      if (key === 'normal') {
        totalPrice += this.typeOfSeats[key] * NORMAL_PRICE
      }
      else if (key === 'child') {
        totalPrice += this.typeOfSeats[key] * CHILD_PRICE
      }
      else if (key === 'senior') {
        totalPrice += this.typeOfSeats[key] * SENIOR_PRICE
      }
    }
    return totalPrice
  }

  iterateCheckedSeats() {
    let checkedBoxCount = 0;
    let checkboxes = document.getElementsByName('seat-booking');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checkedBoxCount++
      }
    }
    return checkedBoxCount
  }

  checkSelectedIsCorrect() {
    let checkedBoxCount = this.iterateCheckedSeats()
    let totalPrice = this.getTotalCost()
    if (this.getSelectedTypes() !== 0 && this.getSelectedTypes() === checkedBoxCount && checkedBoxCount !== 0) {
      $('.submit-box').show()
      $('.total-cost').html(/*html*/`<p>Total: ${totalPrice} SEK</p>`)
    }
    else if (this.getSelectedTypes() < this.iterateCheckedSeats()) {
      $(event.target).prop('checked', false)
    }
    else {
      $('.submit-box').hide()
    }
    return (this.getSelectedTypes() === checkedBoxCount && checkedBoxCount !== 0)
  }

  async createSeatArray(showIndex) {
    this.reserveSeats()
    let list = await JSON._load('../json/shows.json')

    let bookedSeatsNumber = []

    for (let i = 0; i < list[showIndex].takenSeats.length; i++) {
      if (this.tempSeatValues[i]) {
        list[showIndex].takenSeats[i] = this.tempSeatValues[i];// Needs to have the right show object sent in from the start.
        bookedSeatsNumber.push(i + 1) //bokade platser i Arry. får +1 här vid avbokning måste vi lägga in minus 1 att den drar från.
      }
    }
    this.bookingHandler.createBookingsAndReceipt(list, bookedSeatsNumber, showIndex, this.getTotalCost(), this.typeOfSeats)
  }

  getNormalPrice() {
    return NORMAL_PRICE
  }

  getChildPrice() {
    return CHILD_PRICE
  }

  getSeniorPrice() {
    return SENIOR_PRICE
  }
}