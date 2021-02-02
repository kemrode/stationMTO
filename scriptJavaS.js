let menuBtn = document.querySelector('button');
let primaryMenu = document.querySelector('#menuRollOut');
let menuHidden=true;


primaryMenu.style.display="none";

menuBtn.addEventListener('click', ()=> {
    if(menuHidden){
        primaryMenu.style.display="block";
        menuHidden = false;
    }
    else {
        
        primaryMenu.style.display="none";
        menuHidden = true;
    }
});
