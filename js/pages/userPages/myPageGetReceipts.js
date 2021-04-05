export default class Receipts {

  getCurrentUserOnline() {
    let userOnline = sessionStorage.getItem('username');
    return userOnline;
  }

  async getUserOnlineProfile() {
    this.allUsers = await JSON._load("../json/users.json");
    
    for (let user of this.allUsers) {
      if (user.username === this.getCurrentUserOnline()) {
        this.userOnlineNow = user;
        return this.userOnlineNow;
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

  async renderBookings() {
    let bookings = await this.getUserOnlineBookings();
    $('.myPage-container').html(/*html*/`
      <div class="user-bookings"></div>
    `)
   this.printOutBookings(bookings);
  }

  sortReceiptsByDate(booking) {
     let sortedBookings = booking.sort((a, b) => {
      let dateA = new Date(a.bookedShowInfo[0].date);
      dateA.setHours(a.bookedShowInfo[0].time.toString());
      let dateB = new Date(b.bookedShowInfo[0].date);
      dateB.setHours(b.bookedShowInfo[0].time.toString());
      return dateA - dateB;
    })
    return sortedBookings;
  }

  printOutReceipts(receiptsByDate, todaysDate, active) {
    $('.user-bookings').html(/*html*/`
    <div class="booking-btn-container">
      <button class="current">Active bookings</button>
      <button class="past" type="button">Past bookings</button>
     </div>`)
    $('.current').addClass("active").siblings().removeClass("active");

    for (let booking of receiptsByDate) {
      let bookingDate = new Date(booking.bookedShowInfo[0].date);
      bookingDate.setHours(booking.bookedShowInfo[0].time.toString());
      if (active === true) {
        if (bookingDate >= todaysDate) {
          this.appendBookings(booking);
          if (this.getCurrentUserOnline() === 'admin')
              $('.delete-booking').html('')      
        }
      } else {
        if (bookingDate < todaysDate) {
            this.appendBookings(booking);
            if (this.getCurrentUserOnline() === 'admin')
              $('.delete-booking').html('')
        }
      }
    }
  }

  printOutBookings(bookings) {
    let today = new Date();
    
    let receiptsByDate = this.sortReceiptsByDate(bookings);
     this.printOutReceipts(receiptsByDate, today, true);
  
    $('.user-bookings').on('click', 'button', () => {
      this.printOutReceipts(receiptsByDate, today, true);
      $('.current').addClass("active").siblings().removeClass("active");
    })
      
    $('.user-bookings').on('click', '.past', (e) => {
      this.printOutReceipts(receiptsByDate, today, false);
      $('.past').addClass("active").siblings().removeClass("active");
      
    })
  }

  appendBookings(booking){
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
}