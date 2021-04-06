let seatToRight = []
let seatToLeft = []
export default class SeatSelection {

  getBestSeat(currentShow, selectedTypes) {
    this.currentShow = currentShow
    this.tickets = selectedTypes
    let bestSeatsBigSaloon = this.bestSeatsBigSaloon()
    let bestSeatsSmallSaloon = this.bestSeatsSmallSaloon()

    if (this.currentShow.takenSeats.length > 50) {  //Controls which saloon 
      for (let i = 0; i < bestSeatsBigSaloon.length; i++) {
        let bestSeat = bestSeatsBigSaloon[i][0];            //Setting up the multi Array
        let endSeatsLeft = bestSeatsBigSaloon[i][1]
        let endSeatsRight = bestSeatsBigSaloon[i][2]

        if (!this.currentShow.takenSeats[bestSeat]) {

          if (this.controlSeatsToRight((bestSeat - this.centerSeatsSelection(this.tickets)), endSeatsRight)|| (bestSeat + this.centerSeatsSelection(this.tickets)) > endSeatsRight ) {
            return seatToRight
          }
          else if (this.controlSeatsToleft((bestSeat + this.centerSeatsSelection(this.tickets)), endSeatsLeft) ||(bestSeat - this.centerSeatsSelection(this.tickets)) < endSeatsLeft ) {
            return seatToLeft
          }
        }
      }
    }
    else if (this.currentShow.takenSeats.length < 50) {
      for (let i = 0; i < bestSeatsSmallSaloon.length; i++) {
        let bestSeat = bestSeatsSmallSaloon[i][0]
        let endSeatsLeft = bestSeatsSmallSaloon[i][1]
        let endSeatsRight = bestSeatsSmallSaloon[i][2]

        if (!this.currentShow.takenSeats[bestSeat]) {
          if (this.controlSeatsToRight((bestSeat - this.centerSeatsSelection(this.tickets)), endSeatsRight|| (bestSeat + this.centerSeatsSelection(this.tickets)) > endSeatsRight )) {
            return seatToRight
          }
          else if (this.controlSeatsToleft((bestSeat + this.centerSeatsSelection(this.tickets)), endSeatsLeft||(bestSeat - this.centerSeatsSelection(this.tickets)) < endSeatsLeft )) {
            return seatToLeft
          }
        }
      }

    }
    alert(`No seats available together, please choose manually`)
  }

  centerSeatsSelection(tickets) { //Using case to recenter depending on chosen tickets
    let centerSeats = 0

    switch (tickets) {

      case 4:
        centerSeats = 1
        break

      case 5:
      case 6:
        centerSeats = 2
        break

      case 7:
      case 8:
        centerSeats = 3
        break

      case 9:
      case 10:
        centerSeats = 4
        break

      case 11:
      case 12:
        centerSeats = 5
        break
    }
    return centerSeats
  }

  controlSeatsToRight(seats, end) {
    console.log('end right', end)
    seatToRight = []
    for (let i = 0; i <= this.tickets; i++) {
      if (this.currentShow.takenSeats[seats + i] || (seats + i) >= end) {
        seatToRight = []
        break
      }
      seatToRight.push(seats + i)
      if (seats + this.tickets - 1 === seats + i) {
        return true
      }
    }
  }

  controlSeatsToleft(seats, end) {
    console.log('End left', end)
    seatToLeft = []
    for (let j = 0; j < this.tickets; j++) {

      if (this.currentShow.takenSeats[seats - j] || (seats - j) <= end) {

        seatToLeft = []
        break
      }
      seatToLeft.unshift(seats - j)
      if (seats - this.tickets + 1 === seats - j) {
        return true
      }
    }
  }

  bestSeatsBigSaloon() {  //Best places in the saloon. [Bestplace, Left end value, Right end value]
    return [
      [32, 28, 37],
      [33, 28, 37],
      [42, 38, 47],
      [43, 38, 47],
      [52, 48, 57],
      [53, 48, 57],
      [63, 58, 69],
      [64, 58, 69],
      [62, 58, 69],
      [65, 58, 69],
      [75, 70, 81],
      [76, 70, 81],
      [74, 70, 81],
      [75, 70, 81],
      [22, 18, 27],
      [23, 18, 27],
      [13, 9, 17],
      [14, 9, 17],
      [87, 82, 93],
      [88, 82, 93],
      [89, 82, 93],
      [86, 82, 93],
      [4, 1, 8],
      [5, 1, 8],
      [31, 28, 37],
      [32, 28, 37],
      [41, 38, 47],
      [44, 38, 47],
      [51, 48, 57],
      [54, 48, 57],
      [61, 58, 69],
      [66, 58, 69]
    ]
  }


  bestSeatsSmallSaloon() {
    return [
      
      [21, 17, 26],
      [22, 17, 26],
      [20, 17, 26],
      [23, 17, 26],
      [31, 27, 36],
      [32, 27, 36],
      [30, 27, 36],
      [33, 27, 36],
      [42, 37, 48],
      [43, 37, 48],
      [41, 37, 48],
      [44, 37, 48],
      [12, 9, 16],
      [13, 9, 16],
      [11, 9, 16],
      [14, 9, 16],
      [3, 1, 8]
    ]
  }
}