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
    }
    else {
        primaryMenu.style.display="none";
        menuHidden = true;
    }
});

window.onload = function () {
    bringDataOpenWeatherMap(city);
}


disco.addEventListener('click', ()=>{
    console.log("entrée dans la fonction");
    signOut();
    alert("Vous êtes déconnecté...")
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
            pressureResult(pressure);
        },
        error: () => {
            alert("Un problème est survenu !");
        }
    })
}

function pressureResult(pressure) {

    let img = document.getElementsByClassName('.weatherPict');
    let legend = document.querySelector('.legendary');
    
        console.log(typeof(pressure));
        console.log(typeof(1020));

    switch(true){

        case pressure>1020 :
            $(".weatherPict").attr('src', 'style/images/img/soleil.png');
            legend.textContent = "Beau temps";
            break;
        
        case 1013<pressure && pressure<1019:
            $(".weatherPict").attr('src', 'style/images/img/soleil.png');
            legend.textContent = "Assez beau\navec quelques nuages";
            break;

        case 1006<pressure && pressure<1012:
            $(".weatherPict").attr('src', 'style/images/img/pluie.png');
            legend.textContent = "Risque de neige ou de giboulée";
            break;

        case 0<pressure && pressure<1005:
            $(".weatherPict").attr('src', 'style/images/img/neige.png');
            legend.textContent = "Neige et vent pouvant\nêtre violent";
            break;

        default:
 //           alert("données non prise en charge\nVeuillez contacter un administrateur\nEn vous remerciant.");
    };
}