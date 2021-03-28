let userData;
let userInfo;

export default class MyPages{

  eventHandler() {
    $('main').on('click', 'ul li', function (){
      $(this).addClass("active").siblings().removeClass("active");
    })
  
    //$('main').on('click', '#user-bookings', function ());

  }
   

  async render() {
    await this.getUserOnlineProfileInfo();
    this.eventHandler();

    $('main').html(/*html */`
        <div class="myPage">
          <header class="myPage-header"></header>
          <div class="myPage-container"></div>
        </div>
        `
      );
      this.myPageSelector();
      this.printOutUserInfo(this.userInfo);
  }

  renderBookings() {
    //$('.')
  }

  myPageSelector() {
    $('.myPage-header').append(/*html*/`
      <ul class="myPage-list">
        <li class="active"><a href="#myPage">My Profile</a></li>
        <li><a href="#myPage-bookings" id="user-bookings">My Bookings</a></li>
      </ul>
    `)
  }

  getCurrentUserOnline() {
    let userOnline = sessionStorage.getItem('username');
    console.log('inside of get user online', userOnline)
    return userOnline;
  }

  async getUserOnlineProfileInfo() {
    userData = await JSON._load("../json/users.json");
    
    for (let user of userData) {
      if (user.username === this.getCurrentUserOnline()) {
        this.userInfo = user;
        console.log('inside of get profile info', this.userInfo)
      }
    }
  }

  printOutUserInfo(user) {
    console.log(`${user.username}`);
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