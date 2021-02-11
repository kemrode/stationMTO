//variables
let disco = document.querySelector('.disconnect');
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



disco.addEventListener('click', ()=>{
    console.log("entrée dans la fonction");
    signOut();
    alert("Vous êtes déconnecté...")
});


//function to sign out
function signOut() {
    if(confirm("Souhaitez-vous vous déconnecter ? Réellement ?")){
        localStorage.clear();
        userName.textContent="nouvel utilisateur";
    }
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

    
var date;
var temperature;
var hygro;
var dictTemp = {};
var dictHygro = {};

var tempPoints = [];
var hygroPoints = [];

window.onload = () => {
    getElementsFromAPI();
};

//Ajax request for chart
function getElementsFromAPI() {
    $.ajax({
        type: "GET",
        url: `http://192.168.137.24:5000/API/RASPBERRY/GRAPH`,
        dataType: 'JSON',
        success: function (response) {
            console.log(response);
            for (let i = 0; i < response.length; i++) {
                date = response[i]["DATEADD"];
                temperature = response[i]["MOYTEMP"];
                hygro = response[i]["MOYHUMI"];
                tempPoints[i] = {label: date, y: Number(temperature)};
                hygroPoints[i] = {label: date, y:Number(hygro)};                
            }

            console.log(tempPoints);
            console.log(hygroPoints);
            var chart = new CanvasJS.Chart("chartContainer", {


                title:{
                    text: "Relevés de températures et d'hygrométrie" ,
                    fontColor : "red",
                    fontSize : 30,
                    borderThickness: 1,
                    backgroundColor: "#AED6F1",
                    cornerRadius: 5,
                    fontWeight: "bold",
                },
                data: [{
                        // Temperatures "relevées"
                    type: "line",
                    name: "Températures",
                    showInLegend: true,
                    dataPoints: tempPoints
                },            
                {
                        // Relevés d'hygrométrie
                    type: "line",
                    name: "Hygrométrie",
                    showInLegend: true,
                    dataPoints: hygroPoints
                }
                ],
            });
            chart.render();
        
            console.log("all is working fine !");
        },
        error: ()=> {
            alert("une erreur est survenue lors de l'envoi des données\nveuillez réessayer plus tard, svp.");
        }
    });
    console.log("fin de la fonction getElementsFromAPI");
}