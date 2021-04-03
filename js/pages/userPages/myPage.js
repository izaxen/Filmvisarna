let allUsers;
function appendBookings(booking){
  $('.user-bookings').append(/*html*/`
  <div class="bookings">
    <div class="user-booking-receipt">
      <h1>${booking.bookedShowInfo[0].title}</h1>
      <h1>${booking.bookedShowInfo[0].saloon}</h1>
      <h1>${booking.bookedShowInfo[0].date} ${booking.bookedShowInfo[0].time}:00</h1>
      <h1>seats: ${booking.bookedShowInfo[0].bookedSeatsNumber}</h1>
      <h1>Cost: ${booking.bookedShowInfo[0].totalCost} sek</h1>
    </div>
    <div class="user-email-name">
      <h1>Member</h1>
      <h1>user: ${booking.bookedShowInfo[0].username}</h1>
      <h1>email: ${booking.bookedShowInfo[0].email}</h1>
    </div>
    <div class="delete-booking">
      <button class="btn-delete-booking" id="${booking.bookingNumber}">cancel booking</button>
    </div>
  </div>
`);
}
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
      this.renderBookings();
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
    if (this.getCurrentUserOnline() === 'admin') {
      return this.allBookings;
    }

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
    $('.user-bookings').append(`<div class="booking-btn-container"><button class="selected active" disabled type="button">Active bookings</button><button class="past" type="button">Past bookings</button></div>`)
    let sorted = bookings.sort((a,b)=>{
      let dateA = new Date(a.bookedShowInfo[0].date);
      dateA.setHours(a.bookedShowInfo[0].time.toString());
      let dateB = new Date(b.bookedShowInfo[0].date);
      dateB.setHours(b.bookedShowInfo[0].time.toString());
      return dateA - dateB;
    })
    for (let booking of sorted) {
      const date = new Date(booking.bookedShowInfo[0].date);
      date.setHours(booking.bookedShowInfo[0].time.toString());
      const today = new Date();
      if(date >= today){
      appendBookings(booking);
      if (this.getCurrentUserOnline() === 'admin') {
        $('.delete-booking').html('')
      }
    }
  }
    $('.user-bookings').on('click', '.active', ()=>{
      $('.past').removeClass('selected')
      $('.active').addClass('selected')
      $('.past').removeAttr('disabled')
      $('.active').attr('disabled', true)
      $('.user-bookings').children('.bookings').remove();
      for (let booking of sorted) {
        const date = new Date(booking.bookedShowInfo[0].date);
        date.setHours(booking.bookedShowInfo[0].time.toString());
        const today = new Date();
        if(date >= today){
        appendBookings(booking);
        if (this.getCurrentUserOnline() === 'admin') {
          $('.delete-booking').html('')
        }
      }
    }
    })
    $('.user-bookings').on('click', '.past', ()=>{
      $('.active').removeClass('selected')
      $('.past').addClass('selected')
      $('.past').attr('disabled', true)
      $('.active').removeAttr('disabled')
      $('.user-bookings').children('.bookings').remove();
      for (let booking of sorted) {
        const date = new Date(booking.bookedShowInfo[0].date);
        date.setHours(booking.bookedShowInfo[0].time.toString());
        const today = new Date();
        if(date < today){
          appendBookings(booking);
          if (this.getCurrentUserOnline() === 'admin') {
            $('.delete-booking').html('')
          }
      }
    }
    })
  }
}