$( document ).ready(() => {

    //Initialize bill and tip percent variables
    let bill = 0;
    let tipPercent = 0;

    //On bill input change, update bill variable value  
    $('#bill').on('change', () => {
        //Store bill input value as integer
       const billValue = parseFloat($('#bill').val());

       if (isNaN(billValue)) {
           //Add validation error class
           $('#bill').addClass('validation-error');

           //Show validation error
           $('#bill-validation-error').css('display', 'inline-block');

            return;
       } else {
            //Remove validation error class
            $('#bill').removeClass('validation-error');

            //Hide validation error
            $('#bill-validation-error').css('display', 'none');

           //Sets bill variable to input value
           bill = billValue;

           //Adds decimal to input value if it doesn't have one
           if (billValue % 1 === 0) {
            $('#bill').val(billValue.toFixed(2));
           }
       }
       
    })
    //On tip button click, update tip variable value
    $('.tip-button').on('click', (e) => {
      //Gets tip percent amount from variable that was clicked and updates tipPercent variable
      tipPercent = parseFloat(e.target.attributes[1].value);
    });

    //On tip input change, update tip variable with value 
    $('#custom').on('change', () => { 
        //Gets tip value from input field and converts to integer
        const tipValue = parseInt($('#custom').val());

        //Checks if tipValue is a number
        if (!isNaN(tipValue)) {
            //Value divided by 100 is stored in tipPercent variable
            tipPercent = tipValue / 100;
        }
    })

    //Handle change to person count input field
    $('#person-count').on('change', () => {
        //Store person count input value in variable
        const personCount = parseInt($('#person-count').val());
        
        //Check to see if person count is greater than 0
        if (personCount > 0) {
            //Remove validation error class
            $('#person-count').removeClass('validation-error');

            //Hide validation error
            $('#person-count-validation-error').css('display', 'none');

            //Get tip amount based on bill and tipPercent
            const tipAmount = bill * tipPercent;

            //Get bill amount per a person based on person count value;
            const personBillAmount = bill / personCount;


            //Check if tipAmount is greater than 0.
            if (tipAmount > 0) {
                //personTipAmount is the tipAmount divided by the personCount
                const personTipAmount = parseFloat(tipAmount / personCount);
                //personTotalAmount is the individual bill plus the individual tip
                const personTotalAmount = parseFloat(personTipAmount + personBillAmount);

                //Update tip amount per a person text.
                $('.tip-amount-section__value').text(`$${personTipAmount.toFixed(2)}`);
                
                //Updates total amount per a person text.
                $('.person-total-section__value').text(`$${personTotalAmount.toFixed(2)}`);
    
            }
        } else {
            //If person count is less than 0️

            //Adds validation-error class
            $('#person-count').addClass('validation-error');

            //Shows error-message span
            $('#person-count-validation-error').css('display', 'inline-block')
        }
    })

    $('.btn-reset').on('click', () => {
        //Set bill and tipPercent variables to 0
        bill = 0;
        tipPercent = 0;

        //Set bill input value to blank
        $('#bill').val('');

        //Set custom tip value to blank
        $('#custom').val('');

        //Set person count value to blank
        $('#person-count').val('');

        //Remove validation error class
        $('#bill').removeClass('validation-error');
        $('#person-count').removeClass('validation-error');

        //Hide validation error
        $('#bill-validation-error').css('display', 'none');
        $('#person-count-validation-error').css('display', 'none');

         //Set tip amount per a person value to 0
         $('.tip-amount-section__value').text('$0.00');

         //Set total amount per a person value to zero
         $('.person-total-section__value').text('$0.00');

    })

})