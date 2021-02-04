// definition of variables about the menu roll out type
let menuBtn = document.querySelector('button');
let primaryMenu = document.querySelector('#menuRollOut');
// let mapped = document.querySelector('#map');
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

let localTime = dateOfDay.toLocaleString(navigator.language, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
});


date.textContent = `${localDate}`;
let time = hour.textContent = `${localTime}`;

// mapped.style.display = "block";
primaryMenu.style.display="none";

menuBtn.addEventListener('click', ()=> {
    if(menuHidden){
        primaryMenu.style.display="block";
        primaryMenu.style.display='flex';
        primaryMenu.style.width='8em';
        primaryMenu.style.zIndex=1;
        menuHidden = false;
    }
    else {
        primaryMenu.style.display="none";
        menuHidden = true;
    }
});
