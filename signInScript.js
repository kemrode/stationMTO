
//bring back the script to use jQuery
var script = document.createElement('jQuery');
script.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

//definition of a constant for URL requests
const url = 'http://192.168.137.176:5000/API/RASPBERRY/SIGNUP/<string:xLastName>/<string:xFirstName>/<string:xCity>/<string:xEmail>/<string:xPassword>';


let submitBtn = document.querySelector('.btn');
var eMail = document.querySelector('#email');
var pwd = document.querySelector('#pwd');

let dictSignIn = {
    'xEmail': "",
    'xPassword': ""
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

function postPasswordAndEmail(dict) {
    $.ajax({
        type: "POST",
        url: `http://192.168.137.176:5000/API/RASPBERRY/SIGNUP/${dict['xEmail']}/${dict['xPassword']}`,
        success: function (response) {
            console.log("all is working fine !");
        },
        error: ()=> {
            console.log(JSON.stringify(dict));
            alert("une erreur est survenue lors de l'envoi des données\nveuillez réessayer plus tard, svp.");
        }
    });
    console.log("fin de la fonction transfer");
}


submitBtn.addEventListener('click', ()=> {

    eMail = document.querySelector('#email');
    pwd = document.querySelector('#pwd');

    dictSignIn['xEmail']=eMail.value;
    dictSignIn['xPassword']=pwd.value;

    console.log(dictSignIn);
    postPasswordAndEmail(dictSignIn);
});

