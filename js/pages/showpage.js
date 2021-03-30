const DATE_FILTER = 'Date'
let counter = 0;

export default class ShowPage {
  constructor(changeListener, shows) {
    this.changeListener = changeListener
    this.shows = shows
    this.addEventHandler()

  }

  getAllShows() {

    $('main').html(/*html*/`<div class="show-page"><div class="booking-shows"></div></div>`)
    this.shows.loadJsonAndRenderShows()

    $('.booking-shows').append(/*html*/`</div>`)
    $('.show-page').prepend(/*html*/`<aside class = "filter-menu"><div><label for="age-filter">Age: </label><select name="age-filter" id="age-filter" class="filter-selector"></select></div><div><label for="day-filter">Day: </label><select name="day-filter" id="day-filter" class="filter-selector"></select></div><div><label for="month-filter">Month: </label><select name="month-filter" id="month-filter" class="filter-selector"></select></div><button id="filter-button" class="submit-selector">Choose filter</button></aside>`)

    // $('.show-page').prepend(/*html*/`<button id="ageFilter">Age</button>`)
    // $('main').on('click', '#ageFilter', async () => {
    //   const json = await JSON._load("../json/shows.json");
    //   const far = json.map((obj) => {
    //     switch (obj.film) {
    //       case "Braveheart":
    //         return { ...obj, age: 15 };
    //         break;
    //       case "Bröderna Lejonhjärta":
    //         return { ...obj, age: 11 };
    //         break;
    //       case "The Secret Life of Walter Mitty":
    //         return { ...obj, age: 11 };
    //         break;
    //       case "You Don't Mess with the Zohan":
    //         return { ...obj, age: 11 };
    //         break;
    //       case "Godzilla vs. Kong":
    //         return { ...obj, age: 13 };
    //         break;
    //       case "The Shawshank Redemption":
    //         return { ...obj, age: 15 };
    //         break;
    //       default:
    //         return obj;
    //         break;
    //     }
    //   })
    //   console.log(far)
    //   JSON._save("../json/shows.json", far);
    // })
    
    let ageFilter = /*html*/ `<option>-</option>`
    let dayFilter = /*html*/ `<option>-</option>`
    let monthFilter = /*html*/ `<option>-</option>`
    
    for (let i = 1; i < 19; i++){
      if(i === 18){
        ageFilter += /*html*/`<option>${'18+'}</option>`
      }
      else {
        ageFilter += `<option>${i}</option>`
      }
    }

    for (let i = 1; i < 32; i++) {
      if (i < 10) {
        dayFilter += /*html*/`<option>${'0' + i}</option>`
      }
      else {
        dayFilter += `<option>${i}</option>`
      }
    }
    for (let i = 1; i < 13; i++) {
      if (i < 10) {
        monthFilter += `<option>${'0' + i}</option>`
      }
      else {
        monthFilter += `<option>${i}</option>`
      }

    }
    $('#age-filter').append(ageFilter)
    $('#day-filter').append(dayFilter)
    $('#month-filter').append(monthFilter)
  }

  addEventHandler() {
    $('main').on('click', '.submit-selector', () => this.getFilteredShows())
  }

  getFilteredShows() {
    let chosenAge = $('#age-filter').find('option:selected').text()
    let chosenDay = $('#day-filter').find('option:selected').text()
    let chosenMonth = $('#month-filter').find('option:selected').text()
    console.log('chosenMonth', chosenMonth, 'chosenDay', chosenDay, 'chosenAge', chosenAge)
    if(chosenMonth !== '-' && chosenDay !== '-' && chosenAge !== '-'){
      let chosenDateAge;
      let chosenDate = '2021-' + chosenMonth + '-' + chosenDay;
      chosenDateAge = {chosenDate, chosenAge};
      this.shows.filterShows('age&date', chosenDateAge)
    } else if (chosenMonth !== '-' && chosenDay !== '-') {
      let chosenDate = '2021-' + chosenMonth + '-' + chosenDay
      this.shows.filterShows(DATE_FILTER, chosenDate)
    } else if(chosenAge !== '-'){
      this.shows.filterShows('age', chosenAge)
    } else {
      console.log('else')
      this.shows.filterShows(null, null)
    }
    this.shows.renderSelectionOfShows(0, 4)
  }

}