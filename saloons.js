
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

  console.log('Antal rader ' + tokyo.seatsPerRow.length)
  let tempRow = tokyo.seatsPerRow

  for (let i = 1; i <= tempRow.length; i++){
     //Skapa div för varje rad
    row = `<div class="row" id="row-${i}">Row</div>`
    console.log(row)
    for (let j = 1; j <= tempRow[i] ; j++) {
      seat = `<div class="seat" id="seat-${j}"><h2>Row${i} ${j}</h2></div>`
      $('.main-box').append(seat)
    }
    $('.main-box').append(row)
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

