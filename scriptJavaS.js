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
        }
        else {
            isEmpty = false;
            
            inputField.style.backgroundColor = '#FDFEFE';
            console.log(inputField.value);
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

console.log(arrayOfInputElementsForDataBase);


//function to submit the elements write by user
submitBTN.addEventListener('click', ()=> {

    // let signUp = document.querySelector('#signUpWindow');
    let msg;
    let pwdCorrect = false;
    let index = 0;


    nom = document.querySelector('#name');
    isInputEmpty(nom);
    arrayOfInputElementsForDataBase['FirstName']=nom.value;
    // transfer(FirstName,nom);
    surname = document.querySelector('#surname');
    isInputEmpty(surname);
    arrayOfInputElementsForDataBase['LastName']=surname.value;
    // transfer(LastName,surname);
    city = document.querySelector('#city');
    isInputEmpty(city);
    arrayOfInputElementsForDataBase['City']=city.value;
    // transfer(City,city);
    eMail = document.querySelector('#mailAddress');
    isInputEmpty(eMail);
    arrayOfInputElementsForDataBase['Email']=eMail.value;
    // transfer(Email,eMail); 
    pwd = document.querySelector('#pwd');
    isInputEmpty(pwd);
    arrayOfInputElementsForDataBase['Password']=pwd.value;
    // transfer(Password,pwd);
    if(pwd.value.length<8){
        msg = alert("veuillez entrer un mot de passe de 8 caractères minimum, svp.");
        // pwd.style.backgroundColor = '#62FD40';
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
    // console.log(arrayOfInputElementsForDataBase);
    console.log("stop !!");

    
    for(const [key, value] of Object.entries(arrayOfInputElementsForDataBase)){
        console.log(key, value);
    }

    // if(isEmpty){
    //         for(const [key, value] of arrayOfInputElementsForDataBase.entries()){
    //         console.log(key, value);
    //     }
    // };

});


// function transfer(key,inputField) {
//     $.ajax({
//     type: "POST",
//     url: "url",
//     // data=arrayOfInputElementsForDataBase[key]=inputField.value,
//     // data: "LastName=surname",
//     dataType: "dataType",
//     success: function (response) {
//         console.log("all is working fine !");
//     },
//     error: () => {
//         alert("une erreur lors de l'envoi des données est survenue veuillez réessayer plus tard");
//     }
// });
// }
// let monTableauAssociatif = {
//     'prenom' : 'Mark',
//     'nom'    : 'Zuckerberg',
//     'poste'  : 'PDG de Facebook'
// };


// let arrayOfInputElementsForDataBase = {
//     'LastName':surname.value,
//     'FirstName':nom.value,
//     'City':city.value,
//     'Email':eMail.value,
//     'Password':pwd.value
// };



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
