export default class MultiSeatClick {

  tryMultiHover(oneClickBoolean, totalTickets) {
    if (oneClickBoolean) {
      let hoveredSeat = event.target.id.replaceAll('seat-', '')
      let chosenRowNumber = $(event.target).closest('.row').attr('id').replaceAll('row-', '')
      let currentRowNumber
      for (let i = 1; i < totalTickets; i++) {
        hoveredSeat++
        if ($('#seat-' + hoveredSeat).length) {
          currentRowNumber = $('#seat-' + hoveredSeat).closest('.row').attr('id').replaceAll('row-', '')
        }
        else {
          currentRowNumber = '0'
        }
        if (!($('#seat-' + hoveredSeat).length) || $('#seat-' + hoveredSeat).is(':disabled') || currentRowNumber !== chosenRowNumber) {
          this.removeMultiHover()
          break
        }
        else {
          $('#seat-label-' + hoveredSeat).addClass('multi-seat-hover')
        }
      }
    }
  }

  removeMultiHover(oneClickBoolean, totalTickets) {
    if (oneClickBoolean) {
      let hoveredSeat = event.target.id.replaceAll('seat-', '')
      for (let i = 1; i < totalTickets; i++) {
        hoveredSeat++
        $('#seat-label-' + hoveredSeat).removeClass('multi-seat-hover')
      }
    }
  }

  changeCheckboxBehavior(oneClickBoolean, totalTickets) {
    if (oneClickBoolean) {
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