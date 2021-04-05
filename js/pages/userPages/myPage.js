let allUsers;
import userInfo from './myPageGetReceipts.js';
const userReceipts = new userInfo();
export default class MyPages{

  eventHandler() {
    $('main').on('click', 'ul li', function () {
      $(this).addClass("active").siblings().removeClass("active");
    })
  
    $('main').on('click', '#userBookings', () => this.renderBookings());
    $('main').on('click', '#userProfile', () => this.render());
    $('main').on('click', '.btn-delete-booking', (e) => {
      let idTag = e.target.id;
      this.removeBooking(idTag);
      this.renderBookings();
    });
  }

  async render() {
    let user = await userReceipts.getUserOnlineProfile();
    this.eventHandler();

    $('main').html(/*html */`
        <div class="myPage">
          <header class="myPage-header"></header>
          <div class="myPage-container"></div>
        </div>
        `
      );
      this.myPageSelector();
      this.printOutUserInfo(user);
  }

  async renderBookings() {
    let bookings = await userReceipts.getUserOnlineBookings();
    $('.myPage-container').html(/*html*/`
      <div class="user-bookings"></div>
    `)
   userReceipts.printOutBookings(bookings);
  }

  myPageSelector() {
    $('.myPage-header').append(/*html*/`
      <ul class="myPage-list">
        <li class="active" id="userProfile"><a>My Profile</a></li>
        <li><a id="userBookings">My Bookings</a></li>
      </ul>
    `)
  }

  async removeBooking(bookingNbr) {
    for (let booking of this.allBookings) {

      let index = this.allBookings.indexOf(booking)
      if (booking.bookingNumber === bookingNbr) {
        let namn = booking.bookedShowInfo[0].title
        let datum = booking.bookedShowInfo[0].date
        let seats = booking.bookedShowInfo[0].bookedSeatsNumber

        this.allBookings.splice(index, 1);
        await JSON._save("../json/receipt.json", this.allBookings);
        this.removeSeats(namn, datum, seats);
        return;
      }
    }
  }

  async removeSeats(title, date, seats) {
    this.saloons = await JSON._load("../json/shows.json");
    console.log('inside remove seats')
    for (let saloon of this.saloons) {
      if (saloon.film === title && saloon.date === date) {
        for (let seat of seats) {         
          saloon.takenSeats[seat-1] = false;
        }
        await JSON._save("../json/shows.json", this.saloons);
      }
    }
  }

  printOutUserInfo(user) {
    $('.myPage-container').html(/*html*/`
      <div>
        <h1>Username</h1>
        <h3>${user.username}</h3>
      </div>
      <div>
        <h1>Password</h1>
        <h3>${user.pass}</h3>
      </div>
      <div>
        <h1>Email</h1>
        <h3>${user.email}</h3>
      </div>
    `)
  }
}