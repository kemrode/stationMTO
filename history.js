let userName = document.querySelector('.surname');

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


//Def. of a dictTemp
var dictTemp = {};

//Def. of a dictHygro
var dictHygro = {};

//Ajax request for chart
function getElementsFromAPI() {
    $.ajax({
        type: "GET",
        url: `http://192.168.137.24:5000/API/RASPBERRY/SIGNIN/${['DATEADD']}/${['AVG(DEGRES)']}/${['AVG(HUMIDITE)']}`,
        dataType: 'JSON',
        success: function (response) {
            $.each(data, function() {
                $('#chartContainer')
                    .append($("<option></option>"))
                    .attr('value', this['fields']['name'])
                    .text(this['fields']['name']);
            });


            console.log("all is working fine !");
        },
        error: ()=> {
            alert("une erreur est survenue lors de l'envoi des données\nveuillez réessayer plus tard, svp.");
        }
    });
    console.log("fin de la fonction getElementsFromAPI");
}
