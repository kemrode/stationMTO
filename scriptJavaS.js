let menuBtn = document.querySelector('menuButton');
let primaryMenu = document.getElementById('#menuRollOut');

let menuHidden=true;

primaryMenu = document.style.display="none";
document.getElementById('menuRollOut').style.display='none';

menuBtn.addListener('submit', ()=> {
    if(menuHidden==false){
        primaryMenu = document.style.display='none'
        menuHidden=true;
    }
    else {
        primaryMenu = document.style.display='block;'
        menuHidden=false;
    }
});

menuBtn.addEventListener('mouseover', () => {
    document.body.style.backgroundColor = 'orange';
});