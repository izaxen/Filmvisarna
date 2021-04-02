let seatToRight = []
let seatToLeft = []
export default class SeatSelection {

  getBestSeat(currentShow, selectedTypes) {
    this.currentShow = currentShow
    this.selectedTypes = selectedTypes
    let bestSeatsBigSaloon = this.bestSeatsBigSaloon()
    
    
    
    
    //Glöm inte att skapa IF för att kontrollera att säten inte går utanför 
    

    if (this.currentShow.takenSeats.length > 50) {
      for (let i = 0; i < bestSeatsBigSaloon.length; i++){
        let seats = bestSeatsBigSaloon[i][0]
        let endSeatsLeft = bestSeatsBigSaloon[i][1]
        let endSeatsRight = bestSeatsBigSaloon[i][2]

        if (!this.currentShow.takenSeats[seats]) {
          
          if (this.controlSeatsToRight(seats, endSeatsRight)) {
            return seatToRight
          }
          else if (this.controlSeatsToleft(seats,endSeatsLeft)) {
            return seatToLeft
          }
        }
      }
    }
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
      console.log('this.currentShow.takenSeats[seats -j] < end', this.currentShow.takenSeats[seats -j] < end, 'end', end, 'seats -j', seats-j)
      if (this.currentShow.takenSeats[seats -j]||(seats -j) < end ) {
        console.log('Innan den bryter', this.currentShow.takenSeats[seats -j] < end)
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
      [61,57,68],
      [62,57,68],
      [63,57,68],
      [64,57,68],
      [73,69,80],
      [74,69,80],
      [75,69,80],
      [76,69,80],
      [21,17,26],
      [22,17,26],
      [12,8,16],
      [13,8,16],
      [85,81,92],
      [86,81,92],
      [87,81,92],
      [88, 81, 92],
      [3, 0, 7],
      [4,0,7]
    ]
  }
    

  bestSeatsSmallSaloon() {
    
  }
  
}