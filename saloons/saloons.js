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

  $('.main-box').append(`<div class="saloon-box"></div>`)
  showScreen(saloon)

  for (let i = 0; i < tempRow.length; i++) {

    for (let j = 0; j < tempRow[i]; j++) {// add each of the seats to seat
      seatCounter++
      if (j === 0) {
        seat = `<input type="checkbox" class ="seat" id="seat-${seatCounter - 1} value="${seatCounter}">
        <label>${seatCounter}</label>`
      }
      else {
        seat += `<input type="checkbox" class ="seat" id="seat-${seatCounter - 1} value="${seatCounter}">
        <label>${seatCounter}</label>`
      }
    }
    // Create a div for every row
    $('.saloon-box').append(`<div class="row" id="row-${i + 1}">${seat}</div>`)
  }
}

function showScreen(saloon) {
  $('.saloon-box').prepend(`<div class="screen">Saloon ${saloon.name}</div`)
}
