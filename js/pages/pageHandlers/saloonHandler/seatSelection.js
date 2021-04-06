export default class SeatSelection {

  constructor() {
    this.seatToRight = []
    this.seatToLeft = []
  }

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

          if (this.controlSeatsToRight((bestSeat - this.centerSeatsSelection(this.tickets)), endSeatsRight)) {
            return this.seatToRight
          }
          else if (this.controlSeatsToleft((bestSeat + this.centerSeatsSelection(this.tickets)), endSeatsLeft)) {
            return this.seatToLeft
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
          if (this.controlSeatsToRight((bestSeat - this.centerSeatsSelection(this.tickets)), endSeatsRight, endSeatsLeft)) {
            
            return this.seatToRight
          }
          //
          else if (this.controlSeatsToleft((bestSeat + this.centerSeatsSelection(this.tickets)), endSeatsLeft, endSeatsRight)) {
           
            return this.seatToLeft
          }

        }
      }
      alert(`No seats available together, please choose manually`)
    }
  }

  

    centerSeatsSelection(tickets) { //Using case to recenter depending on chosen tickets
      let centerSeats = 0

      switch (tickets) {
        case 3:
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
          console.log('case 9, 10')
          centerSeats = 4
          break

        case 11:
        case 12:
          centerSeats = 5
          break
      }
      return centerSeats
    }

    controlSeatsToRight(seats, endRight, endLeft) {
      this.seatToRight = []
      for (let i = 0; i <= this.tickets; i++) {
      
        if (this.currentShow.takenSeats[seats + i] || (seats + i) > endRight || seats < endLeft) {
          return false
        }
        this.seatToRight.push(seats + i)
      
        if (seats + this.tickets - 1 === seats + i) {
          console.log('seats hö', seats)
          return true
        }
      }
    }

  controlSeatsToleft(seats, endLeft, endRight) {
    this.seatToLeft = []
    for (let i = 0; i < this.tickets; i++) {
      
      if (this.currentShow.takenSeats[seats - i] || (seats - i) < endLeft || seats > endRight) {
        return false
      }
      this.seatToLeft.unshift(seats - i)
      
      if (seats - this.tickets + 1 === seats - i) {
        console.log('seats vä', seats)
        return true
      }
    }
  }

  bestSeatsBigSaloon() {  //Best places in the saloon. [Bestplace, Left end value, Right end value]
    return [
      [31, 27, 36],
      [32, 27, 36],
      [41, 37, 46],
      [42,37,46],
      [51,47,56],
      [52,47,56],
      [62,57,68],
      [63, 57, 68],
      [61,57,68],
      [64,57,68],
      [74,69,80],
      [75, 69, 80],
      [73,69,80],
      [76,69,80],
      [21,17,26],
      [22,17,26],
      [12,8,16],
      [13,8,16],
      [86,81,92],
      [87,81,92],
      [88, 81, 92],
      [85,81,92],
      [3, 0, 7],
      [4, 0, 7],
      [30, 27, 36],
      [33, 27, 36],
      [40, 37, 46],
      [43, 37, 46],
      [50, 47, 56],
      [53, 47, 56],
      [60, 57, 68],
      [65,57,68]
    ]
  }


  bestSeatsSmallSaloon() {
    return [
       
      [20, 16, 25],
      [21, 16, 25],
      [19, 16, 25],
      [22, 16, 25],
      [30, 26, 35],
      [31, 26, 35],
      [29, 26, 35],
      [32, 26, 35],
      [41, 36, 47],
      [42, 36, 47],
      [40, 36, 47],
      [43, 36, 47],
      [11, 8, 15],
      [12, 8, 15],
      [10, 8, 15],
      [13, 8, 15],
      [3, 0, 7],
      [4, 0, 7],
      [2, 0, 7],
      [5,0,7]
    ]
  }
}