const form = document.getElementById('form');
const amountInputContainer = document.querySelector('.input');
const amountSymbol = document.querySelector('.amountSymbol');
const mortgageAmount = document.getElementById('mortgageAmount');
const amountErrorMsg = document.querySelector('.amountErrorMsg');
const termInputContainer = document.querySelector('.mTerm');
const termSymbol = document.querySelector('.termSymbol');
const mortgageTerm = document.getElementById('mortgageTerm');
const termErrorMsg = document.querySelector('.termErrorMsg');
const rateInputContainer = document.querySelector('.mRate');
const rateSymbol = document.querySelector('.rateSymbol');
const mortgageRate = document.getElementById('mortgageRate');
const rateErrorMsg = document.querySelector('.rateErrorMsg');
const repaymentContainer = document.getElementById('repayments');
const repaymentRadio = document.getElementById('repayment');
const interestContainer = document.getElementById('interests');
const interestRadio = document.getElementById('interest');
const typeErrorMsg = document.querySelector('.typeErrorMsg');
const emptyView = document.getElementById('empty-message')
const completeView = document.getElementById('complete-message');
const resultMonthly = document.querySelector('.monthlyResult');
const totalResult = document.querySelector('.totalResult');
const clearBtn = document.getElementById('clear');


// FOCUS STATE
    // MORTGAGE AMOUNT 
mortgageAmount.addEventListener('focus', () => {
    amountInputContainer.style.borderColor = 'hsl(61, 70%, 52%)'; 
    amountSymbol.classList.add('focus');
});

    //MORTGAGE TERM
mortgageTerm.addEventListener('focus', () => {
    termInputContainer.style.borderColor = 'hsl(61, 70%, 52%)'; 
    termSymbol.classList.add('focus');
});

    //MORTGAGE TERM
mortgageRate.addEventListener('focus', () => {
    rateInputContainer.style.borderColor = 'hsl(61, 70%, 52%)'; 
    rateSymbol.classList.add('focus');
});

    //MORTGAGE TYPE
repaymentRadio.addEventListener('click', () => {
    if (repaymentRadio.checked) {
        repaymentContainer.classList.add('active')
        interestContainer.classList.remove('active')
    } else {
        repaymentContainer.classList.remove('active')
        interestContainer.classList.add('active')
    }
});

interestRadio.addEventListener('click', () => {
    if (interestRadio.checked) {
        interestContainer.classList.add('active')
        repaymentContainer.classList.remove('active')
    } else {
        interestContainer.classList.remove('active')
        repaymentContainer.classList.add('active')
    }
});

//REMOVE FOCUS
mortgageAmount.addEventListener('blur', () => {
    amountInputContainer.style.borderColor = ''; 
    amountSymbol.classList.remove('focus');
});
mortgageTerm.addEventListener('blur', () => {
    termInputContainer.style.borderColor = ''; 
    termSymbol.classList.remove('focus');
});
mortgageRate.addEventListener('blur', () => {
    rateInputContainer.style.borderColor = ''; 
    rateSymbol.classList.remove('focus');
});


// CLEAR ALL
clearBtn.addEventListener('click', () => {
    form.reset();
    interestContainer.classList.remove('active')
    repaymentContainer.classList.remove('active')
    emptyView.style.display = 'grid';
    completeView.style.display = 'none';
});



form.addEventListener('submit', (event) => {
    event.preventDefault();


let valididty = true;

    // CHECK MORTGAGE AMOUNT
    if (mortgageAmount.value === '' || mortgageAmount.value <= 0) {
        amountInputContainer.classList.add('errors');
        amountErrorMsg.style.display = 'block';
        amountSymbol.classList.add('error')
        valididty = false
    } else {
        amountInputContainer.classList.remove('errors');
        amountErrorMsg.style.display = 'none';
        amountSymbol.classList.remove('error')
    };


    // CHECK MORTGAGE TERM
    if (mortgageTerm.value === '' || mortgageTerm.value <= 0) {
        termInputContainer.classList.add('errors');
        termErrorMsg.style.display = 'block';
        termSymbol.classList.add('error')
        valididty = false
    } else {
        termInputContainer.classList.remove('errors');
        termErrorMsg.style.display = 'none';
        termSymbol.classList.remove('error')
    };


    // CHECK MORTGAGE RATE
    if (mortgageRate.value === '' || mortgageRate.value <= 0) {
        rateInputContainer.classList.add('errors');
        rateErrorMsg.style.display = 'block';
        rateSymbol.classList.add('error')
        valididty = false
    } else {
        rateInputContainer.classList.remove('errors');
        rateErrorMsg.style.display = 'none';
        rateSymbol.classList.remove('error')
    };

    // CHECK MORTGAGE TYPE
    if (!repaymentRadio.checked && !interestRadio.checked) {
        typeErrorMsg.style.display = 'block';
        valididty = false
    } else {
        typeErrorMsg.style.display = 'none';
    };

//  SHOW RESULTS
    if (valididty) {
            let monthlyRepayment;
            let totalRepayment;

            const mortgageAmount = parseFloat(document.getElementById('mortgageAmount').value);
            const mortgageTerm = parseInt(document.getElementById('mortgageTerm').value);
            const mortgageRate = parseFloat(document.getElementById('mortgageRate').value)/100 ;
            const mortgageType = document.querySelector('input[name = "mortgageType"]:checked');

        emptyView.style.display = 'none';
        completeView.style.display = 'grid';

        if (mortgageType.value === 'repayments') {
            const monthlyInterestRate = mortgageRate / 12;
            const noOfPayments = mortgageTerm * 12;

            monthlyRepayment = (mortgageAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -noOfPayments));
            totalRepayment = monthlyRepayment * noOfPayments;
        } else if (mortgageType.value === 'interests'){
            monthlyRepayment = mortgageAmount * mortgageRate / 12;
            totalRepayment = monthlyRepayment * mortgageTerm *12
        };

        resultMonthly.textContent = `£${monthlyRepayment.toFixed(2)}`;
        totalResult.textContent = `£${totalRepayment.toFixed(2)}`;
    }
    else {
            emptyView.style.display = 'grid';
            completeView.style.display = 'none';
    };
});