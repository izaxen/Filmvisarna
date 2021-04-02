let seatToRight = []
let seatToLeft = []
export default class SeatSelection {

  getBestSeat(currentShow, selectedTypes) {
    this.currentShow = currentShow
    this.selectedTypes = selectedTypes
    let bestSeatsBigSaloon = this.bestSeatsBigSaloon()
    let centerSeats = 0
    
    if (this.currentShow.takenSeats.length > 50) {
      for (let i = 0; i < bestSeatsBigSaloon.length; i++) {
        let seats = bestSeatsBigSaloon[i][0]
        let endSeatsLeft = bestSeatsBigSaloon[i][1]
        let endSeatsRight = bestSeatsBigSaloon[i][2]

        switch (this.selectedTypes) {
        
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
        if (!this.currentShow.takenSeats[seats]) {
          
          if (this.controlSeatsToRight((seats - centerSeats), endSeatsRight)) {
            console.log('Letar åt höger', seats - centerSeats)
            return seatToRight
          }
          else if (this.controlSeatsToleft((seats + centerSeats), endSeatsLeft)) {
            console.log('letar åt vänster')
            return seatToLeft
          }
        }
      }
    }
      alert(`No seats available together, please choose manualy`)
  }



  controlSeatsToRight(seats, end) {
    seatToRight = []
    for (let i = 0; i <= this.selectedTypes; i++){
      if (this.currentShow.takenSeats[seats + i] ||(seats + i) > end ) {
        seatToRight = []
        break
      }
      seatToRight.push(seats + i)
      if (seats + this.selectedTypes-1 === seats + i) {
        return true
      }
    }
  }
  
  controlSeatsToleft(seats, end) {
    seatToLeft = []
    for (let j = 0; j < this.selectedTypes; j++){
      
      if (this.currentShow.takenSeats[seats -j]||(seats -j) < end ) {
        
        seatToLeft = []
        break
      }
      seatToLeft.unshift(seats - j)
      if (seats - this.selectedTypes+1 === seats - j) {
        return true
      }
    }
  }



  bestSeatsBigSaloon() {
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
    
  }
  
}