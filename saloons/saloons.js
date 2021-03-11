getSaloons('tokyo')

async function getSaloons(saloonChoice) {
  let saloons = await $.getJSON('/saloons/saloons.json')
  
  if (saloonChoice === 'tokyo') {
    return showSeats(saloons[0])
  }
  else return showSeats(saloons[1])
}
  
function showSeats(saloon) {
  let tempRow = saloon.seatsPerRow
  let seat
  let seatCounter = 0

  $('.main-box').append(`<div class="saloonBox"></div>`)
  showScreen(saloon)

  for (let i = 0; i < tempRow.length; i++) {

    for (let j = 0; j < tempRow[i]; j++) {// add each of the seats to seat
      seatCounter++
      if (j === 0) {
        seat = `<div class="seat" id="seat-${seatCounter - 1}">${seatCounter}</div>`
      }

      else {
        seat += `<div class="seat" id="seat-${seatCounter - 1}">${seatCounter}</div>`
      }
    }
    // Create a div for every row
    $('.saloonBox').append(`<div class="row" id="row-${i + 1}">${seat}</div>`)
  }
}

function showScreen(saloon) {
  $('.saloonBox').prepend(`<div class="screen">Saloon ${saloon.name}</div`)
}
