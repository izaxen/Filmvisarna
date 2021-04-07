export default class MultiSeatClick {

  addHover(totalTickets, adjacentSeatsOn) {
    let hoveredSeat = event.target.id.replaceAll('seat-', '')
    if (totalTickets > 0) {
      let chosenRowNumber = $(event.target).closest('.row').attr('id').replaceAll('row-', '')
      let currentRowNumber
      for (let i = 0; i < totalTickets; i++) {
        if ($('#seat-' + hoveredSeat).length) {
          currentRowNumber = $('#seat-' + hoveredSeat).closest('.row').attr('id').replaceAll('row-', '')
        }
        else {
          currentRowNumber = '0'
        }
        if (!($('#seat-' + hoveredSeat).length) || $('#seat-' + hoveredSeat).is(':disabled') || currentRowNumber !== chosenRowNumber) {
          this.removeHover()
          break
        }
        else {
          $('#seat-label-' + hoveredSeat).addClass('seat-hover')
          if (!adjacentSeatsOn) {
            return
          }
        }
        hoveredSeat++
      }
    }
  }

  removeHover(totalTickets) {
    let hoveredSeat = event.target.id.replaceAll('seat-', '')
    for (let i = 0; i < totalTickets; i++) {
      $('#seat-label-' + hoveredSeat).removeClass('seat-hover')
      hoveredSeat++
    }
  }

  changeCheckboxBehavior(adjacentSeatsOn, totalTickets) {
    if (adjacentSeatsOn) {
      this.uncheckAllCheckboxes()
      $(event.target).prop('checked', true)
      let seatIndex = event.target.id.replaceAll("seat-", '')
      let chosenRowNumber = $(event.target).closest('.row').attr('id').replaceAll('row-', '')
      let currentRowNumber
      for (let i = 1; i < totalTickets; i++) {
        seatIndex++
        if ($('#seat-' + seatIndex).length) {
          currentRowNumber = $('#seat-' + seatIndex).closest('.row').attr('id').replaceAll('row-', '')
        }
        else {
          currentRowNumber = '0'
        }
        if (!($('#seat-' + seatIndex).length) || $('#seat-' + seatIndex).is(':disabled') || currentRowNumber !== chosenRowNumber) {
          $(".seat").prop('checked', false)
          break
        }
        else {
          $('#seat-' + seatIndex).prop('checked', true)
        }
      }
    }
  }

  uncheckAllCheckboxes() {
    $(".seat").prop('checked', false)
  }

}