// const { chart } = require("highcharts");

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

    
var date;
var temperature;
var hygro;
var dictTemp = {};
var dictHygro = {};

var tempPoints = [];
var hygroPoints = [];

var arrayTemp = [];
var arrayHygro = [];

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
                // arrayTemp[i] = {label: date, y:temperature};
                // arrayHygro[i] = {label: date, y:hygro};
                
                tempPoints[i] = {label: date, y: Number(temperature)};
                hygroPoints[i] = {label: date, y:Number(hygro)};

                // dictTemp[date] = temperature;
                // dictTemp[date] = temperature;
                // tempPoints[i]=dictTemp;
                // dictHygro[date] = hygro;
                // hygroPoints[i]=dictHygro;
                
            }
            // console.log(dictTemp);
            // console.log(dictHygro);


            // for(date in dictTemp){

            // }
            // for(date in dictHygro){
            //     hygroPoints = [{label: date, y:hygro}];
            // }

            // for(let i = 0;i<arrayTemp.length;i++){
            //     tempPoints = arrayTemp[i];
            // };

            // for(let i = 0;i<arrayHygro.length;i++){
            //     hygroPoints = arrayHygro[i];
            // };

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

            // var yUpDate= 10, updateCount = 0;
            // var upDateChart = () => {
            //     // yUpDate = yUpDate + Math.round(5 + Math.random()*(-5-5));
            //     updateCount++;
            //     tempPoints.push({
            //         y: yUpDate
            //     });
            //     hygroPoints.push({
            //         y: yUpDate
            //     });
            //     chart.render();
            // };
        
                //function to set interval of time before to update
            // setInterval(function(){upDateChart()}, 60000);
            //3600000
        
            console.log("all is working fine !");
        },
        error: ()=> {
            alert("une erreur est survenue lors de l'envoi des données\nveuillez réessayer plus tard, svp.");
        }
    });
    console.log("fin de la fonction getElementsFromAPI");
}


// window.onload = function () {



//     getElementsFromAPI();

//     console.log(dictTemp);
//     console.log(dictHygro);

//     for(date in dictTemp){
//         console.log(date);
//         console.log(temperature);
//         tempPoints = [{label:date, y:temperature}];
//     }
//     console.log(tempPoints);

//     for(date in dictHygro){
//         hygroPoints = [{label: date, y:hygro}];
//     }
//     console.log(hygroPoints);
//     //var tempPoints = [{label: 01,y: 15},{label: 02,y: 13},{label: 03,y: 10},{label: 04,y: 7},{label: 05,y: 8},
//     //{label: 06,y: 10},{label: 07,y: 11},{label: 08,y: 13},{label: 09,y: 15},{label: 10,y: 5}];
//     //var hygroPoints =  [{label: 01,y: 20},{label: 02,y: 22},{label: 03,y: 30},{label: 04,y: 41},{label: 05,y: 42},
//     //{label: 06,y: 38},{label: 07,y: 26},{label: 08,y: 27},{label: 09,y: 31},{label: 10,y: 46}];
//     var chart = new CanvasJS.Chart("chartContainer", {

//         //theme: "light",
//         //chart.option.axisX = { suffix: "/02/2021"},
//         //chart.option.title = { text:"Relevés des températures et de l'hygrométrie" }
//         title:{
//             text: "Relevés de températures et d'hygrométrie" ,
//             fontColor : "red",
//             fontSize : 30,
//             borderThickness: 1,
//             backgroundColor: "#AED6F1",
//             cornerRadius: 5,
//             fontWeight: "bold",
//         },
//         data: [{
//             // Temperatures "relevées"
//             type: "line",
//             name: "Températures",
//             showInLegend: true,
//             dataPoints: tempPoints
//         } ,            
//         {
//             // Relevés d'hygrométrie
//             type: "line",
//             name: "Hygrométrie",
//             showInLegend: true,
//             dataPoints: hygroPoints
//         }
//         ],
//         axisX: {
//             suffix: "/02/2021"
//         }
//     });
//     chart.render();

//     var yUpDate= 10, updateCount = 0;
//     var upDateChart = () => {
//         yUpDate = yUpDate + Math.round(5 + Math.random()*(-5-5));
//         updateCount++;

//         tempPoints.push({
//             y: yVal
//         });

//         chart.options.title.text = "Update" + updateCount;
//         chart.render();
//     };

//     //function to set interval of time before to update
//     setInterval(function(){upDateChart()}, 86400);
// }





