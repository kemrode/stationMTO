//variables
let userName = document.querySelector('.surname');
let disco = document.querySelector('.disconnect');

// definition of variables about the menu roll out type
let menuBtn = document.querySelector('button');
let primaryMenu = document.querySelector('#menuRollOut');
let menuHidden=true;

// definition of variables about the elements of MTO case
let temp = document.querySelector('temperatureNumber');
let humidity = document.querySelector('hygromethrieNumber');

//bring back the script to use jQuery
var script = document.createElement('jQuery');
script.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

if(localStorage.getItem('userName')){
    userName.textContent = localStorage.getItem('userName');
}

//function to know if the user is logged or not
() => {
    console.log(connect);
    if(connect){
        $('surname').text('xLastName');
        $('name').text('xFirstName');
    }
}


//function to sign out
function signOut() {
    if(confirm("Souhaitez-vous vous déconnecter ? Réellement ?")){
        localStorage.clear();
        userName.textContent="nouvel utilisateur";
    }
}

//
var lat = 49.38251;
var long = 1.07523 ;
let city = "rouen";
const url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat +"&long="+long+"&appid=373803ed9fca2043e13ba7691a33122e&units=metric";
//

//function to change display of the menuRollOut
primaryMenu.style.display="none";

menuBtn.addEventListener('click', ()=> {
    if(menuHidden){
        primaryMenu.style.display="block";
        primaryMenu.style.display='flex';
        primaryMenu.style.width='8em';
        primaryMenu.style.zIndex=1;
        menuHidden = false;
        bringDataOpenWeatherMap(city);
    }
    else {
        primaryMenu.style.display="none";
        menuHidden = true;
    }
});


disco.addEventListener('click', ()=>{
    console.log("entrée dans la fonction");
    signOut();
});

//Bring back informations from Open weather map for MTO data



function bringDataOpenWeatherMap(city) {
    $.ajax({
        type: 'GET',
        url: "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=373803ed9fca2043e13ba7691a33122e&units=metric",
        dataType : 'json',
        success: (response) => {
            console.log("It's working well !");
            let pressure = response.main.pressure;
            console.log(pressure);
        },
        error: () => {
            alert("Un problème est survenu !");
        }
    })
}

function pressureResult(pressure) {
    
}