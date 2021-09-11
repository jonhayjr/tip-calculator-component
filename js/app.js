$( document ).ready(() => {
    let bill = 0;
    let tipPercent = 0;

    //On bill input change, update bill variable value  
    $('#bill').on('change', () => {
       const billValue = parseInt($('#bill').val());
       if (!isNaN(billValue)) {
           bill = billValue;
       }
    })
    //On tip button click, update tip variable value
    $('.tip-button').on('click', (e) => {
        tip = parseInt(e.target.attributes[1].value) / 100;
    });

    //On tip input change, update tip variable with value 
    $('#custom').on('change', () => { 
        const tipValue = parseInt($('#custom').val());
        if (!isNaN(tipValue)) {
            tip = tipValue;
        }
    })

})