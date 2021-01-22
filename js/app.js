const form = document.querySelector('form');
const userName = document.querySelector('#name');
const email = document.querySelector('#email');
const otherJobRole = document.getElementById('other-job-role');
const color = document.querySelector('#color');
const colorOption = document.querySelectorAll('#color > option');
const design = document.querySelector('#design');
const activity = document.querySelector('#activities');
const registerActivities = document.querySelector('#activities > legend');
const activityBox = document.querySelector('.activities-box');
const activities = document.querySelectorAll('label > input[type="checkbox"]');
const payment = document.querySelector('#payment');
const paymentOption = document.querySelectorAll('#payment > option');
const creditCard = document.querySelector('#credit-card');
const ccNum = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
otherJobRole.style.display = 'none'; // remove other job role textbox on load
let prevTarget = '';
let total = 0;
let correct = [];

// setting focus property on name when loaded
document.getElementById('name').focus();

// setting up listener on the job role
document.getElementById('title').addEventListener('click', e => {
    if(e.target.value === 'other') {
        otherJobRole.style.display = '';
    } else {
        otherJobRole.style.display = 'none';
    }
})

// t-shirt info
color.disabled = true;
design.addEventListener('click', e => {
    if(e.target.value === 'js puns' || e.target.value === 'heart js') {
        color.disabled = false;
        if(e.target.value !== prevTarget) {
            colorOption[0].selected = 'selected';
        }
        for(let i = 1; i < colorOption.length; i++){
            if(colorOption[i].getAttribute('data-theme') === e.target.value){
                colorOption[i].style.display = '';
            } else {
                colorOption[i].style.display = 'none';
            }
        }
    }
    prevTarget = e.target.value;
});

// register for activities
activityBox.addEventListener('change', e => {
    total = 0;
    for(let i = 0; i < activities.length; i++) {
        if(activities[i].checked === true){
            total += parseInt(activities[i].getAttribute('data-cost'))
        }
    }
    document.getElementById('activities-cost').innerHTML = 'Total: $' + total.toString();
});

// payment

paymentOption[1].selected = true; // set credit card to be selected on load
// hide paypal & bitcoin text on load
paypal.style.display = 'none'; 
bitcoin.style.display = 'none';

payment.addEventListener('click', e => {
    if(e.target.value === 'credit-card') {
        creditCard.style.display = 'block';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if(e.target.value === 'paypal') {
        creditCard.style.display = 'none';
        paypal.style.display = '';
        bitcoin.style.display = 'none';
    } else if(e.target.value === 'bitcoin') {
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = '';
    }
});

// validation
// email validator
function emailValidator(text) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(text)
}
function numberValidator(text) {
    const regex = /^[0-9]*$/
    return regex.test(text)
}
function validator(element, bool) {
    correct.push(bool);
    if(bool){
        element.style.border = '';
        element.parentElement.classList.remove('not-valid');
        element.parentElement.className = 'valid';
        element.parentElement.lastElementChild.style.display = 'none';
    } else {
        element.style.border = '2px solid red';
        element.parentElement.classList.remove('valid');
        element.parentElement.className = 'not-valid';
        element.parentElement.lastElementChild.style.display = 'block';
    }
}
function createSecondHint(element, message) {
    const span = document.createElement('span');
    span.innerHTML = message
    span.classList.add('second-hint');
    span.classList.add('hint');
    element.parentElement.appendChild(span);
    element.parentElement.lastElementChild.style.display = 'block';
}
// input validation
form.addEventListener('submit', (e) => {
    e.preventDefault();
    correct = [];
    // check if name is valid
    if(userName.value === "") {
        validator(userName, false);
    } else {
        validator(userName, true);
    }
    // check if email is valid
    if(!emailValidator(email.value)){
        validator(email, false);
    } else {
        validator(email, true);
    }
    // check if user checked one of the activities
    let activitiesChecker = true;
    for(let i = 0; i < activities.length; i++) {
        if(activities[i].checked === true) {
            registerActivities.style.color = 'black';
            activity.classList.remove('not-valid')
            activity.classList.add('valid')
            activitiesChecker = true;
            activity.lastElementChild.style.display = 'none';
            break;
        } else {
            registerActivities.style.color = 'red';
            activity.classList.remove('valid')
            activity.classList.add('not-valid')
            activity.lastElementChild.style.display = 'block';
            activitiesChecker = false
        }
    }
    correct.push(activitiesChecker)
    // check if the credit-card payment is selected, then do the validation
    if(payment.value === 'credit-card') { 
        if(ccNum.value.length >= 13 && ccNum.value.length <= 16 && numberValidator(ccNum.value)) {
            validator(ccNum, true);
        } else {
            validator(ccNum, false);
        }
        if(zip.value.length == 5 && numberValidator(zip.value)) {
            validator(zip, true);
        } else {
            validator(zip, false);
        } 
        if(cvv.value.length == 3 && numberValidator(cvv.value)) {
            validator(cvv, true);
        } else {
            validator(cvv, false);
        }
    }
    if(!correct.includes(false)){
        alert('Your form has been submitted!');
        form.submit();
        form.reset();
    }
});

// accesibility
// adding focus class on focus and remove them on blur
// focus
for(let i = 0; i < activities.length; i++) {
    activities[i].addEventListener('focus', () => {
        activities[i].parentElement.className = 'focus';
    })
    activities[i].addEventListener('blur', () => {
        activities[i].parentElement.className = '';
    })
}

// disable conflicting schedule
for(let i = 0; i < activities.length; i++) {
    activities[i].addEventListener('click', () => {
        for(let x = 1; x < activities.length; x++) {
            // check if a check box is checked and if the date attribute is the same
            if(activities[i].checked === true && x != i && activities[i].getAttribute('data-day-and-time') === activities[x].getAttribute('data-day-and-time')) {
                activities[x].parentElement.classList.add('disabled');
                activities[x].disabled = true;
            } else {
                // check if the checkbox isn't disabled, and remove only if the attributes are the same
                if(activities[x].disabled !== true || activities[i].checked === false && activities[i].getAttribute('data-day-and-time') === activities[x].getAttribute('data-day-and-time')) {
                    activities[x].parentElement.classList.remove('disabled');
                    activities[x].disabled = false;
                }
            }
        }
        // validating if one of the activities is pressed
        for(let i = 0; i < activities.length; i++) {
            if(activities[i].checked === true) {
                registerActivities.style.color = 'black';
                activity.classList.remove('not-valid')
                activity.classList.add('valid')
                activitiesChecker = true;
                activity.lastElementChild.style.display = 'none';
                break;
            } else {
                registerActivities.style.color = 'red';
                activity.classList.remove('valid')
                activity.classList.add('not-valid')
                activity.lastElementChild.style.display = 'block';
                activitiesChecker = false
            }
        }
    });
}

// real-time error message
userName.addEventListener('keyup', () => {
    if(userName.value === "") {
        validator(userName, false)
    } else {
        validator(userName, true);
    }
});

email.addEventListener('keyup', () => {
    if(email.value !== "") {
        if(!emailValidator(email.value)) {
            validator(email, false);
        } else {
            validator(email, true);
        }
    }
    
});

ccNum.addEventListener('keyup', () => {
    if(ccNum.value !== "") {
        if(ccNum.value.length >= 13 && ccNum.value.length <= 16 && numberValidator(ccNum.value)) {
            validator(ccNum, true);
        } else if(ccNum.value.length > 16) {
            validator(ccNum, false);
            if(!ccNum.parentElement.lastElementChild.className.includes('second-hint')) {
                ccNum.parentElement.lastElementChild.style.display = 'none';
                createSecondHint(ccNum, "You typed too many numbers");
            }
        } 
        else {
            if(ccNum.parentElement.lastElementChild.className.includes('second-hint')) {
                ccNum.parentElement.removeChild(ccNum.parentElement.lastElementChild);
            }
            validator(ccNum, false);
        }
    }
    
});

zip.addEventListener('keyup', () => {
    if(zip.value !== "") {
        if(zip.value.length == 5 && numberValidator(zip.value)) {
            validator(zip, true);
        } else {
            validator(zip, false);
        }
    }
})

cvv.addEventListener('keyup', () => {
    if(cvv.value !== "" && numberValidator(cvv.value)) {
        if(cvv.value.length == 3) {
            validator(cvv, true);
        } else {
            validator(cvv, false);
        }
    }
    
})

