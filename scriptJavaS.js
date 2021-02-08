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

//definition of a constant for URL requests
const url = 'http://192.168.137.195:5000/API/RASPBERRY/SIGNUP'

//definition on variables used for sign up
var nom = document.querySelector('#name');
var surname = document.querySelector('#surname');
var city = document.querySelector('#city');
var eMail = document.querySelector('#mailAddress');
var cgu=false;
var pwd = document.querySelector('#pwd');
var pwdVerif = document.querySelector('#pwdVerif');
var isEmpty=true;
var submitBTN = document.querySelector('#submitBTN');


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


//function to check if the field is empty or not :
function isInputEmpty(inputField) {
        if(inputField.value.length == 0){
            msg = alert("Veuillez remplir le champ obligatoire, svp.");
            inputField.style.backgroundColor = '#FA0505';
            return isEmpty;
        }
        else {
            isEmpty = false;
            
            inputField.style.backgroundColor = '#FDFEFE';
        }

        return isEmpty;
}


let arrayOfInputElementsForDataBase = {
    'LastName':surname.value,
    'FirstName':nom.value,
    'City':city.value,
    'Email':eMail.value,
    'Password':pwd.value
};


//function to submit the elements write by user
submitBTN.addEventListener('click', ()=> {

    let msg;
    let pwdCorrect = false;
    let index = 0;


    nom = document.querySelector('#name');
    isInputEmpty(nom);
    arrayOfInputElementsForDataBase['FirstName']=nom.value;
    surname = document.querySelector('#surname');
    isInputEmpty(surname);
    arrayOfInputElementsForDataBase['LastName']=surname.value;
    city = document.querySelector('#city');
    isInputEmpty(city);
    arrayOfInputElementsForDataBase['City']=city.value;
    eMail = document.querySelector('#mailAddress');
    isInputEmpty(eMail);
    arrayOfInputElementsForDataBase['Email']=eMail.value;
    pwd = document.querySelector('#pwd');
    isInputEmpty(pwd);
    arrayOfInputElementsForDataBase['Password']=pwd.value;
    if(pwd.value.length<8){
        msg = alert("veuillez entrer un mot de passe de 8 caractères minimum, svp.");
    }
    pwdVerif = document.querySelector('#pwdVerif');
    isInputEmpty(pwdVerif);

    if(pwd.value == pwdVerif.value){
        pwdCorrect = true;
    }
    else {
        msg = alert(" Attention !Vous n'avez pas entré le même mot de passe !");
        pwdVerif.style.backgroundColor = '#FA0505';
    }
    console.log(pwdCorrect);
    console.log(isEmpty);

    if(pwdCorrect==true && isEmpty ==false){
        console.log("conditions vérifiées");
        for(const [key, value] of Object.entries(arrayOfInputElementsForDataBase)){
            transfer(key, value)
        }
    }
    else {
        console.log("conditions non vérifiées");
    }
});


function transfer(key,value) {
    $.ajax({
    type: "POST",
    url: "url",
    data: key=value,
    dataType: "dataType",
    success: function (response) {
        console.log("all is working fine !");
    },
    error: () => {
        alert("une erreur lors de l'envoi des données est survenue veuillez réessayer plus tard");
    }
});
}


// $.ajax({
//     type: "POST",
//     url: "url",
//     data: "LastName=surname",
//     dataType: "dataType",
//     success: function (response) {
//         console.log("all is working fine !");
//     },
//     error: () => {
//         alert("une erreur lors de l'envoi des données est survenue veuillez réessayer plus tard");
//     }
// });
