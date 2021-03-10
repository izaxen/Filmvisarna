
// let numberOfSeats = 94 //todo: change to actual number of seats
let row
let saloons
let tokyo
let monaco
let seat

getSaloons()


async function getSaloons() {
  saloons = await $.getJSON('/json/saloons.json')
  console.log('saloons' + saloons)
  tokyo = saloons[0]
  console.log('Tokyo:' + tokyo.seatsPerRow)

  showSeats()
}




function showSeats() {

  let countRows = 0;

  for (let tempRow of tokyo.seatsPerRow) {
    console.log(tempRow);
    countRows++;
    //Skapa div för varje rad

    row += `<div class="row" id="row-${countRows}></div>`

    for (let i = 1; i <= tempRow; i++) {
      $('<div class="row"></div>').append(`<div class="seat" id="seat-${i}"><h2>Hi ${i}</h2></div>`)
      //seat += `<div class="seat" id="seat-${i}"><h2>Hi ${i}</h2></div>`

    }
    $('main').append(seat)
  }

}



// hämta rader för varje salong
// antingen via namn - skriv funktion för att hämta namn
// eller via plats i array - bara hämta från plats 0 resp 1

//create a for loop for each row

/*function showSaloonTokyo() {

}

function showSaloonMonaco() {

}*/

