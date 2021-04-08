let allUsers;
import userInfo from './myPageGetReceipts.js';
const userReceipts = new userInfo();
export default class MyPages{

  eventHandler() {
    $("main").on("click", "#userBookings", () => userReceipts.renderBookings());
    $('main').on('click', '#userProfile', () => this.render());
    $('main').on('click', 'ul li', function () {
      $(this).addClass("active").siblings().removeClass("active");
    })
    $('main').on('click', '.btn-delete-booking', (e) => {
      let idTag = e.target.id;
      this.removeBooking(idTag);
    })
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

  myPageSelector() {
    $('.myPage-header').append(/*html*/`
      <ul class="myPage-list">
        <li class="active" id="userProfile"><a>My Profile</a></li>
        <li id="userBookings"><a>My Bookings</a></li>
      </ul>
    `)
  }

  async removeBooking(bookingNbr) {
    this.allBookings = await JSON._load("../json/receipt.json");
    for (let booking of this.allBookings) {

      let index = this.allBookings.indexOf(booking)
      if (booking.bookingNumber === bookingNbr) {
        let title = booking.bookedShowInfo[0].title
        let date = booking.bookedShowInfo[0].date
        let seats = booking.bookedShowInfo[0].bookedSeatsNumber

        this.allBookings.splice(index, 1);
        await JSON._save("../json/receipt.json", this.allBookings);
        this.removeSeats(title, date, seats);
        return;
      }
    }
  }

  async removeSeats(title, date, seats) {
    let allShows = await JSON._load("../json/shows.json");
    for (let saloon of allShows) {
      if (saloon.film === title && saloon.date === date) {
        for (let seat of seats) {         
          saloon.takenSeats[seat-1] = false;
        }
        await JSON._save("../json/shows.json", allShows);
      }
    }
    userReceipts.renderBookings();
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