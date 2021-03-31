let allUsers;
let userOnlineNow;
let number;

export default class MyPages{

  eventHandler() {
    $('main').on('click', 'ul li', function (){
      $(this).addClass("active").siblings().removeClass("active");
    })
  
    $('main').on('click', '#userBookings', () => this.renderBookings());
    $('main').on('click', '#userProfile', () => this.renderProfileInfo());
    $('main').on('click', '.btn-delete-booking', (e) => {
      let idTag = e.target.id;
      this.removeBooking(idTag);
    });

  }

  renderProfileInfo() {
    $('main').html(/*html */`
        <div class="myPage">
          <header class="myPage-header"></header>
          <div class="myPage-container"></div>
        </div>
        `
      );
      this.myPageSelector();
      this.printOutUserInfo(this.userOnlineNow);
  }
   

  async render() {
    await this.getUserOnlineProfile();
    this.eventHandler();

    $('main').html(/*html */`
        <div class="myPage">
          <header class="myPage-header"></header>
          <div class="myPage-container"></div>
        </div>
        `
      );
      this.myPageSelector();
      this.printOutUserInfo(this.userOnlineNow);
  }

  async renderBookings() {
    let bookings = await this.getUserOnlineBookings();
    $('.myPage-container').html(/*html*/`
      <div class="user-bookings"></div>
    `)
   this.printOutBookings(bookings);
  }

  myPageSelector() {
    $('.myPage-header').append(/*html*/`
      <ul class="myPage-list">
        <li class="active" id="userProfile"><a>My Profile</a></li>
        <li><a id="userBookings">My Bookings</a></li>
      </ul>
    `)
  }

  getCurrentUserOnline() {
    let userOnline = sessionStorage.getItem('username');
    return userOnline;
  }

  async getUserOnlineProfile() {
    allUsers = await JSON._load("../json/users.json");
    
    for (let user of allUsers) {
      if (user.username === this.getCurrentUserOnline()) {
        this.userOnlineNow = user;
        return;
      }
    }
    
  }

  async getUserOnlineBookings() {
    this.allBookings = await JSON._load("../json/receipt.json");
    let userOnlinesBookings = [];

    for (let booking of this.allBookings) {
      if (booking.bookedShowInfo[0].username === this.getCurrentUserOnline()) {
        let userBooking = booking
        userOnlinesBookings.push(userBooking);
      }
    }
    return userOnlinesBookings;
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
          console.log('inside seat loop')
          
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

  printOutBookings(bookings) {
    for (let booking of bookings) {
      $('.user-bookings').append(/*html*/`
        <div class="bookings">
          <div class="user-booking-receipt">
            <h1>${booking.bookedShowInfo[0].title}</h1>
            <h1>${booking.bookedShowInfo[0].saloon}</h1>
            <h1>${booking.bookedShowInfo[0].date} ${booking.bookedShowInfo[0].time}:00</h1>
            <h1>seats: ${booking.bookedShowInfo[0].bookedSeatsNumber}</h1>
            <h1>Cost: ${booking.bookedShowInfo[0].totalCost} sek</h1>
          </div>
          <div class="delete-booking">
            <button class="btn-delete-booking" id="${booking.bookingNumber}">cancel booking</button>
          </div>
        </div>
      `);
    }
  }
}