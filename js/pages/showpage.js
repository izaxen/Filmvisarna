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

    let ageFilter = /*html*/ `<option>-</option>`
    let dayFilter = /*html*/ `<option>-</option>`
    let monthFilter = /*html*/ `<option>-</option>`
    
    const ages = [11,13,15,18];
    for (let i in ages){
      if(ages[i] === 18){
        ageFilter += /*html*/`<option>${'18+'}</option>`
      }
      else {
        ageFilter += `<option>${ages[i]}</option>`
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
    let chosenAge = $('#age-filter').find('option:selected').text().slice(0,2)
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
    this.shows.renderSelectionOfShows(0, 3)
  }

}