(function() {
  
  const button = document.querySelector('.submit-btn');
  const phoneInput = document.querySelector('#phone');
  const dateInInput = document.querySelector('#checkin-date');
  const dateOutInput = document.querySelector('#checkout-date');
  const adultInput = document.querySelector('#adults');
  const childrenInput = document.querySelector('#children');
  const singleRoom = document.querySelector('#radio-1');
  const duoRoom = document.querySelector('#radio-2');
  const familyRoom = document.querySelector('#radio-3');

  
  button.addEventListener('click', (e) => {
    e.preventDefault();

    const pattern = /^((\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    
    if (!pattern.test(phoneInput.value)) {
      phoneInput.classList.remove('field-correct');
      phoneInput.classList.add('field-error');
    } else {
      phoneInput.classList.remove('field-error');
      phoneInput.classList.add('field-correct');
    }

    const datePattern = /(\d{2,4}[-\.]\d{2}[-\.]\d{2,4})/;
    
    const date = (new Date(dateOutInput.value.split('.').join('-').replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")).getTime() - new Date(dateInInput.value.split('.').join('-').replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")).getTime()) / 86400000;

    if (datePattern.test(dateInInput.value) && datePattern.test(dateOutInput.value) && date >= 4) {
      dateInInput.classList.remove('field-error');
      dateOutInput.classList.remove('field-error');
      dateInInput.classList.add('field-correct');
      dateOutInput.classList.add('field-correct');
    } else {
      dateInInput.classList.remove('field-correct');
      dateOutInput.classList.remove('field-correct');
      dateInInput.classList.add('field-error');
      dateOutInput.classList.add('field-error');
    }

    if (singleRoom.checked) {
      if (adultInput.value != 1 || childrenInput.value > adultInput.value) {
        adultInput.classList.remove('field-correct');
        childrenInput.classList.remove('field-correct');
        adultInput.classList.add('field-error');
        childrenInput.classList.add('field-error');
      } else {
        adultInput.classList.remove('field-error');
        childrenInput.classList.remove('field-error');
        adultInput.classList.add('field-correct');
        childrenInput.classList.add('field-correct');
      }
    } else if (familyRoom.checked) {
      if (adultInput.value < 2 || childrenInput.value < 1 || childrenInput.value > adultInput.value) {
        adultInput.classList.remove('field-correct');
        childrenInput.classList.remove('field-correct');
        adultInput.classList.add('field-error');
        childrenInput.classList.add('field-error');
      } else {
        adultInput.classList.remove('field-error');
        childrenInput.classList.remove('field-error');
        adultInput.classList.add('field-correct');
        childrenInput.classList.add('field-correct');
      }
    } 
  })

})();
