export default class bookingHandler{ 


  createModal() {

  $('.saloon-box').prepend(/*html*/`
    <div id="saloon-Modal" class="saloon-Modal">

        <div class="modal-content">
          <div class="saloon-modal-header">
            <p></p>
            <span class="close-saloon-modal" id="close-saloon-btn">&times;</span>
          </div>
          
          <div class="saloon-modal-body">
            <p></p>
          </div>
          
          <div class="saloon-modal-footer">
          </div>
        </div>

      </div>
  `)

  }

   modalFunctions() {
    $('main').on('click', '.close-saloon-modal', () => {
      this.closeSaloonModal();
    })

    $('main').on('click', '.open-saloon-modal', () => {
      this.openSaloonModal();
    })

     $('main').on('click', '.saloon-Modal', (e) => {
       let overlay = e.target.id;
       if (overlay === 'saloon-Modal') {
         this.closeSaloonModal();
       }
     })
     
     $('main').on('click', '#booking-confirm', () => {
       this.closeSaloonModal();
    })
  }
  
  closeSaloonModal() {
    $('.saloon-Modal').fadeOut(300);
    $('main').css("pointerEvents", "all");
  } 

  openSaloonModal() {
    $('.saloon-Modal').fadeIn(300);
    $('main').css("pointerEvents", "none");
  }
}