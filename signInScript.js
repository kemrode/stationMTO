let submitBtn = document.querySelector('.btn');
var eMail = document.querySelector('#email');
var pwd = document.querySelector('#pwd');


submitBtn.addEventListener('click', ()=> {
    eMail = document.querySelector('#email');
    pwd = document.querySelector('#pwd');
    console.log(eMail.value);
    console.log(pwd.value);

})