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
const url = 'http://192.168.137.176:5000/API/RASPBERRY/SIGNUP/<string:xLastName>/<string:xFirstName>/<string:xCity>/<string:xEmail>/<string:xPassword>';

//definition on variables used for sign up
var nom = document.querySelector('#name');
var surname = document.querySelector('#surname');
var city = document.querySelector('#city');
var eMail = document.querySelector('#mailAddress');
var cgu= document.querySelector('#cgu');
var checkbox = document.querySelector('#cguCheckbox');
var pwd = document.querySelector('#pwd');
var pwdVerif = document.querySelector('#pwdVerif');
var isEmpty=true;
var submitBTN = document.querySelector('#submitBTN');
let cguCheck = false;


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
            if(inputField != pwd && inputField!=pwdVerif){
            }
        }
        return isEmpty;
}

function clearField(inputField) {
        inputField.value="";
}


let arrayOfInputElementsForDataBase = {
    'xLastName':surname.value,
    'xFirstName':nom.value,
    'xCity':city.value,
    'xEmail':eMail.value,
    'xPassword':pwd.value
};


//function to check the cgu checkbox:
cgu.addEventListener('click', ()=> {
    checkbox.checked = true;
    return cguCheck = true;
})

//function to submit the elements write by user
submitBTN.addEventListener('click', ()=> {

    let msg;
    let pwdCorrect = false;
    let index = 0;


    nom = document.querySelector('#name');
    isInputEmpty(nom);
    arrayOfInputElementsForDataBase['xFirstName']=nom.value;
    surname = document.querySelector('#surname');
    isInputEmpty(surname);
    arrayOfInputElementsForDataBase['xLastName']=surname.value;
    city = document.querySelector('#city');
    isInputEmpty(city);
    arrayOfInputElementsForDataBase['xCity']=city.value;
    eMail = document.querySelector('#mailAddress');
    isInputEmpty(eMail);
    arrayOfInputElementsForDataBase['xEmail']=eMail.value;
    pwd = document.querySelector('#pwd');
    isInputEmpty(pwd);
    arrayOfInputElementsForDataBase['xPassword']=pwd.value;
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

    if(cguCheck == false){
        msg = alert("Vous devez accepter les conditions générales d'utilisation pour vous inscrire.\nMerci de les accepter.")
    }

    if(pwdCorrect==true && isEmpty ==false && cguCheck == true){
        console.log("conditions vérifiées");
        
        checkbox.checked = false;
        transfer(arrayOfInputElementsForDataBase);
        clearField(nom);
        clearField(surname);
        clearField(city);
        clearField(eMail);
        clearField(pwd);
        clearField(pwdVerif);
    }
    else {
        console.log("conditions non vérifiées");
    }
});

//Ajax request to POST elements when new sign up
function transfer(arrayOfInputElementsForDataBase) {
    $.ajax({
    type: "POST",
    url: `http://192.168.137.176:5000/API/RASPBERRY/SIGNUP/${arrayOfInputElementsForDataBase['xLastName']}/${arrayOfInputElementsForDataBase['xFirstName']}/${arrayOfInputElementsForDataBase['xCity']}/${arrayOfInputElementsForDataBase['xEmail']}/${arrayOfInputElementsForDataBase['xPassword']}`,
    success: function (response) {
    console.log("all is working fine !");
    },
    error: () => {
        console.log(JSON.stringify(arrayOfInputElementsForDataBase));
        alert("une erreur lors de l'envoi des données est survenue veuillez réessayer plus tard");
    }
});
    console.log("fin de la fonction transfer");
}
