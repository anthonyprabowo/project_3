const form = document.querySelector('form');
const userName = document.querySelector('#name');
const email = document.querySelector('#email');
const otherJobRole = document.getElementById('other-job-role');
const color = document.querySelector('#color');
const colorOption = document.querySelectorAll('#color > option');
const design = document.querySelector('#design');
const registerActivities = document.querySelector('#activities > legend');
const activityBox = document.querySelector('.activities-box');
const activities = document.querySelectorAll('label > input[type="checkbox"]');
const payment = document.querySelector('#payment');
const paymentOption = document.querySelectorAll('#payment > option');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
otherJobRole.style.display = 'none';
let prevTarget = '';
let total = 0;
let correct = true;

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
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(text);
}
// input validation
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // check if name is valid
    if(userName.value === "") {
        userName.style.border = '2px solid red';
        correct = false
    } else {
        userName.style.border = '';
        correct = true;
    }
    // check if email is valid
    if(!emailValidator(email.value)){
        email.style.border = '2px solid red';
        correct = false;
    } else {
        email.style.border = '';
        correct = true;
    }
    // check if user checked one of the activities
    for(let i = 0; i < activities.length; i++) {
        if(activities[i].checked === true) {
            registerActivities.style.color = 'black';
            correct = true;
            break;
        } else {
            registerActivities.style.color = 'red';
            correct = false
        }
    }
    if(correct){
        form.submit();
        form.reset();
    }
});