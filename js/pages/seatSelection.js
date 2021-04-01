
export default class SeatSelection {

  getBestSeat(currentShow, selectedTypes) {
    this.currentShow = currentShow
    this.selectedTypes = selectedTypes
    let bestSeatsBigSaloon = this.bestSeatsBigSaloon()
    let okSeats=[]
    
    if (this.currentShow.takenSeats.length > 50) {
      for (let seats of bestSeatsBigSaloon){
        if (!this.currentShow.takenSeats[seats]) {
          for (let i = 0; i <= this.selectedTypes; i++){
            if (this.currentShow.takenSeats[seats + i]) {
              okSeats = []
              break
            }
            okSeats.push(seats + i)
            if (seats + this.selectedTypes-1 === seats + i) {
              console.log('ok seats', okSeats)
            return okSeats
          }
            
          }
          console.log('efter if')
          
        }
      }
    }
  }

  bestSeatsBigSaloon() {
    return [
      31,
      32,
      41,
      42,
      51,
      52,
      61,
      62,
      63,
      64
    ]
  }
    secondbestSeatBigSaloon(){
      return[
      73,
      74,
      75,
      76,
      21,
      22,
      12,
      13,
      85,
      86,
      87,
      88
    ]
  }

  bestSeatsSmallSaloon() {
    
  }
}