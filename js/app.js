$( document ).ready(() => {

    //Object to store tip splitter values and methods
    const tipSplitter = {
        previousBillAmount: 0,
        previousTipPercent: 0,
        previousPersonCount: 0,
        billAmount: 0,
        tipPercent: 0,
        tipAmount: 0,
        personCount: 0,
        personBillAmount: 0,
        personTipAmount: 0,
        personTotalAmount: 0,
        getTipAmount() {
            this.tipAmount = this.tipPercent * this.billAmount;
        },
        getPersonBillAmount() {
            this.personBillAmount = this.billAmount / this.personCount;
        },
        getPersonTipAmount() {
            this.personTipAmount = parseFloat(this.tipAmount / this.personCount);
        },
        getPersonTotalAmount() {
            this.personTotalAmount = parseFloat(this.personTipAmount + this.personBillAmount);
        },
        recalcPersonValues() {
            //Get tip amount based on bill and tipPercent
            this.getTipAmount();

            //Get bill amount per a person based on person count value;
            this.getPersonBillAmount();

            //personTipAmount is the tipAmount divided by the personCount
            this.getPersonTipAmount();

            //personTotalAmount is the individual bill plus the individual tip
            this.getPersonTotalAmount();

            //Update tip amount per a person text.
            $('.tip-amount-section__value').text(`$${this.personTipAmount.toFixed(2)}`);
                
            //Updates total amount per a person text.
            $('.person-total-section__value').text(`$${this.personTotalAmount.toFixed(2)}`);
        }
    }
 
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

            //Set previousBillAmount equal to current bill amount value
            tipSplitter.previousBillAmount = tipSplitter.billAmount;

           //Sets bill variable to input value
           tipSplitter.billAmount = billValue;

            //If bill amount changes after other fields are populated, recalculate other values
            if (tipSplitter.billAmount !== tipSplitter.previousBillAmount && tipSplitter.tipPercent !== 0 && tipSplitter.personCount !== 0) {
                tipSplitter.recalcPersonValues();
            }
        

           //Adds decimal to input value if it doesn't have one
           if (billValue % 1 === 0) {
            $('#bill').val(billValue.toFixed(2));
           }
       }
       
    })
    //On tip button click, update tip variable value
    $('.tip-button').on('click', (e) => {
      //Sets previous tip percent equal to current tip percent
      tipSplitter.previousTipPercent = tipSplitter.tipPercent;

      //Gets tip percent percent from variable that was clicked and updates tipPercent variable
      tipSplitter.tipPercent = parseFloat(e.target.attributes[1].value);

      //If tip percent changes and other fields are populated, recalculate the other fields.
      if (tipSplitter.tipPercent !== tipSplitter.previousTipPercent && tipSplitter.billAmount !== 0 && tipSplitter.personCount !== 0) {
        tipSplitter.recalcPersonValues();
      }
    });

    //On tip input change, update tip variable with value 
    $('#custom').on('change', () => { 
        //Gets tip value from input field and converts to integer
        const tipValue = parseInt($('#custom').val());

        //Checks if tipValue is a number
        if (!isNaN(tipValue)) {
            //Sets previous tip percent equal to current tip percent
            tipSplitter.previousTipPercent = tipSplitter.tipPercent;

            //Value divided by 100 is stored in tipPercent variable
            tipSplitter.tipPercent = tipValue / 100;

            //If tip percent changes and other fields are populated, recalculate the other fields.
            if (tipSplitter.tipPercent !== tipSplitter.previousTipPercent && tipSplitter.billAmount !== 0 && tipSplitter.personCount !== 0) {
                tipSplitter.recalcPersonValues();
            }
        }
    })

    //Handle change to person count input field
    $('#person-count').on('change', () => {
        //Sets previous person count equal to current person count
        tipSplitter.previousPersonCount = tipSplitter.personCount;

        //Store person count input value in variable
        tipSplitter.personCount = parseInt($('#person-count').val());
      
        //Check to see if person count is greater than 0
        if (tipSplitter.personCount > 0) {
            //Remove validation error class
            $('#person-count').removeClass('validation-error');

            //Hide validation error
            $('#person-count-validation-error').css('display', 'none');

            //If person count changed and other values are present, recalculate person values
            if (tipSplitter.personCount !== tipSplitter.previousPersonCount  && tipSplitter.billAmount !== 0 && tipSplitter.tipPercent !== 0) {
                tipSplitter.recalcPersonValues();
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
        //Set object variables to 0
        tipSplitter.previousBillAmount = 0;
        tipSplitter.previousTipPercent = 0;
        tipSplitter.previousPersonCount = 0;
        tipSplitter.billAmount = 0;
        tipSplitter.tipPercent = 0;
        tipSplitter.tipAmount = 0;
        tipSplitter.personCount = 0;
        tipSplitter.personBillAmount = 0;
        tipSplitter.personTipAmount = 0;
        tipSplitter.personTotalAmount = 0;

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