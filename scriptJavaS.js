// definition of variables about the menu roll out type
let menuBtn = document.querySelector('button');
let primaryMenu = document.querySelector('#menuRollOut');
let menuHidden=true;

// definition of variables about the elements of MTO case
let temp = document.querySelector('temperatureNumber');
let humidity = document.querySelector('hygromethrieNumber');
let dateOfDay = new Date();
// toLocaleDateString = jour, mois, année
// toLocaleTimeString = l'heure
// toLocaleString = jour, mois, l'année, l'heure

// let dateLocal = dateOfDay.toLocaleString('fr-FR', {
//     year: 'numeric',
//     month : 'numeric',
//     day : 'numeric',
// });

// let localTime = dateOfDay.toLocaleString('fr-FR', {
//     hour : 'numeric';
//     minute: 'numeric';
// });

// console.log();


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
