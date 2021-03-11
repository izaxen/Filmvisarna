let saloons
let tokyo
let monaco

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
  let row
  let seat

  for (let i = 0; i < tempRow.length; i++) {
    for (let j = 0; j < tempRow[i]; j++) {
      // add each of the seats to seat
      if (j === 0) {
        seat = `<div class="seat" id="seat-${j + 1}"><h2>Row${i + 1} seat ${j + 1}</h2></div>`
      }
      else { seat += `<div class="seat" id="seat-${j + 1}"><h2>Row${i + 1} seat ${j + 1}</h2></div>` }
    }
    // Create a div for every row
    row = `<div class="row" id="row-${i + 1}">${seat}</div>`
    console.log(row)
    $('.main-box').append(row)
    seat -= seat
  }

}


/*function showSaloonTokyo() {

}

function showSaloonMonaco() {

}*/

