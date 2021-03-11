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
  let seatCounter = 0

  for (let i = 0; i < tempRow.length; i++) {
    for (let j = 0; j < tempRow[i]; j++) {
      // add each of the seats to seat
      seatCounter++
      if (j === 0) {
        seat = `<div class="seat" id="seat-${seatCounter}">${seatCounter}</div>`
      }
      else { seat += `<div class="seat" id="seat-${seatCounter}">${seatCounter}</div>` }
    }
    // Create a div for every row
    row = `<div class="row" id="row-${i + 1}">${seat}</div>`
    console.log(row)
    $('.main-box').append(row)
  }

}


/*function showSaloonTokyo() {

}

function showSaloonMonaco() {

}*/

