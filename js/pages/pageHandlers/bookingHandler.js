export default class bookingHandler {

  createModal() {
    $('.saloon-box').prepend(/*html*/`
    <div id="saloon-Modal" class="saloon-Modal">
        <div class="modal-content">
          <div class="saloon-modal-header">
            <p></p>
            <span class="close-saloon-modal" id="close-saloon-btn">&times;</span>
          </div>
          <div class="saloon-modal-body">
            <p></p>
          </div>
          <div class="saloon-modal-footer">
          </div>
        </div>
      </div>
  `)
  }

  modalFunctions() {
    $('main').on('click', '.close-saloon-modal', () => {
      this.closeSaloonModal();
    })
    $('main').on('click', '.open-saloon-modal', () => {
      this.openSaloonModal();
    })
    $('main').on('click', '.saloon-Modal', (e) => {
      let overlay = e.target.id;
      if (overlay === 'saloon-Modal') {
        this.closeSaloonModal();
      }
    })
    $('main').on('click', '#booking-confirm', () => {
      this.closeSaloonModal();
    })
  }

  closeSaloonModal() {
    $('.saloon-Modal').fadeOut(300);
    $('main').css("pointerEvents", "all");
  }

  openSaloonModal() {
    $('.saloon-Modal').fadeIn(300);
    $('main').css("pointerEvents", "none");
  }

  async createBookingsAndReceipt(list, bookedSeatsNumber, showIndex) {
    console.log('create receipt')
    let username = "no member";
    let email = "no member";
    let bookedShowInfo = []
    let totalCost = this.getTotalCost();
    let receiptJson = await JSON._load('../json/receipt.json');
    let bookingNumber = this.createRndBookingNr();
    let title = list[showIndex].film
    let saloon = list[showIndex].auditorium
    let date = list[showIndex].date
    let time = list[showIndex].time

    if (sessionStorage.getItem('username') !== null) {
      username = currentUserData.username;
      email = currentUserData.email;
    }

    bookedShowInfo.push({
      email,
      username,
      title,
      saloon,
      date,
      time,
      bookedSeatsNumber,
      typeOfSeats,
      totalCost
    })

    receiptJson.push({ bookingNumber, bookedShowInfo })
    //Utskrift av kvittot!
    bookHandler.createModal();
    this.printOutReceipt(bookingNumber, bookedShowInfo);
    $('main').on('click', '#booking-confirm', () => {
      this.saveReceipt(list, receiptJson);
    })
  }

  async saveReceipt(shows, receipts) {
    await JSON._save('../json/shows.json', shows);
    await JSON._save('../json/receipt.json', receipts);
  }

  printOutReceipt(bookingNumber, bookedShowInfo) {
    $('.saloon-modal-header p').html(/*html*/`Booking receipt!`)
    $('.saloon-modal-body p').html(/*html*/`
      Bookingnr:  ${bookingNumber}<br><br>

      Movie: ${bookedShowInfo[0].title}<br>
      Saloon: ${bookedShowInfo[0].saloon}<br>
      Date: ${bookedShowInfo[0].date}<br>
      Time: ${bookedShowInfo[0].time}:00<br>
      Seat: ${bookedShowInfo[0].bookedSeatsNumber}`)

    $('.saloon-modal-footer').html(/*html*/`
      <button class="saloon-booking-buttons close-saloon-modal" id="booking-cancel">cancel</button>
      <button class="saloon-booking-buttons close-saloon-modal" id="booking-confirm">confirm</button>
    `)
    this.openSaloonModal();
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
    for (let i = 0; i < 6; i++) {
      newBookingNr += rndLetterNumber[Math.floor(Math.random() * 34)]
    }
    return newBookingNr
  }
}