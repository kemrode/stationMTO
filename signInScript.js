// definition of variables about the menu roll out type
let menuBtn = document.querySelector('button');
let primaryMenu = document.querySelector('#menuRollOut');
let menuHidden=true;

// //creation of the cookie
// document.cookie = 'surname = utilisateur';
var userStorage="";

//bring back the script to use jQuery
var script = document.createElement('jQuery');
script.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

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

//variables to sign In
let submitBtn = document.querySelector('.btn');
var eMail = document.querySelector('#email');
var pwd = document.querySelector('#pwd');
let nameTitle = document.querySelector('.name');
let surnameTitle = document.querySelector('.surname');

let dictSignIn = {
    'xEmail': "",
    'xPassword': "",
    'xLastName':"",
    'xFirstName':""
};

function clearingFields (inputFields) {
    inputFields.value="";
};

eMail.addEventListener('click', ()=> {
    clearingFields(eMail);
    clearingFields(pwd);
    eMail.style.color='black';
    pwd.style.color='black';
});

function postPasswordAndEmail(dictSignIn) {
    $.ajax({
        type: "GET",
        url: `http://192.168.137.176:5000/API/RASPBERRY/SIGNIN/${dictSignIn['xEmail']}/${dictSignIn['xPassword']}`,
        success: function (response) {
            console.log("all is working fine !");
            userName(response);
        },
        error: ()=> {
            alert("une erreur est survenue lors de l'envoi des données\nveuillez réessayer plus tard, svp.");
        }
    });
    console.log("fin de la fonction postPasswordAndEmail");
}


submitBtn.addEventListener('click', ()=> {

    
    var connect = false;

    eMail = document.querySelector('#email');
    pwd = document.querySelector('#pwd');

    dictSignIn['xEmail']=eMail.value;
    dictSignIn['xPassword']=pwd.value;

    postPasswordAndEmail(dictSignIn);
});

function userName(userNameByGET) {

    let user = document.querySelector('.surname');
    userStorage = localStorage.setItem('userName', userNameByGET);
    user.textContent = localStorage.getItem('userName');
}

