// definition of variables about the menu roll out type
let menuBtn = document.querySelector('button');
let primaryMenu = document.querySelector('#menuRollOut');
let menuHidden=true;

// definition of variables about the elements of MTO case
let temp = document.querySelector('temperatureNumber');
let humidity = document.querySelector('hygromethrieNumber');
let date = document.querySelector('.groupDate');
let hour = document.querySelector('.groupHour');
let dateOfDay = new Date();

let localDate = dateOfDay.toLocaleString(navigator.language, {
    year : 'numeric',
    month : 'numeric',
    day: 'numeric'
});

console.log(date);
console.log(hour);
console.log(localDate);

let localTime = dateOfDay.toLocaleString(navigator.language, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
});

console.log(localTime);

// functions to set the local time and date
date.textContent = `${localDate}`;
hour.textContent = `${localTime}`;


primaryMenu.style.display="none";

menuBtn.addEventListener('click', ()=> {
    if(menuHidden){
        primaryMenu.style.display="block";
        primaryMenu.style.display='flex';
        menuHidden = false;
    }
    else {
        primaryMenu.style.display="none";
        menuHidden = true;
    }
});
