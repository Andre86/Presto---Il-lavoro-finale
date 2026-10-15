let opener = document.querySelector('.opener');
let circle = document.querySelector('.circle');
let teachers = [
    {name: 'Andrea', description: 'Docente', url: './media/anakin.png'},
    {name: 'Matteo', description: 'Docente', url: './media/palpatine.jpeg'},
    {name: 'Gianna', description: 'Docente', url: './media/anakin.png'},
    {name: 'Lella', description: 'Docente', url: './media/anakin.png'},
];

teachers.forEach( (docente)=>{
    let div = document.createElement('div');
div.classList.add('moved');
div.style.backgroundImage = `url(${docente.url})`;
circle.appendChild(div);
});


let MovedDivs = document.querySelectorAll('.moved');
let check = false;


opener.addEventListener('click' , ()=>{
    if(check == false){
        opener.style.transform = `rotate(45deg)`;
        MovedDivs.forEach( (moved, i)=>{
        let angle = (360 * i) / MovedDivs.length;
        moved.style.transform = `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`;
        });
        check = true;    
    }else{
        check = false;
        opener.style.transform = `rotate(0deg)`;
        MovedDivs.forEach( (moved, i)=>{
            moved.style.transform = ``;
            
        });
        flipCard.classList.add('d-none');
    }
    
});

let innerFace = document.querySelector('.inner-face');
let cardname = document.querySelector('#cardName');
let cardDescription = document.querySelector('#cardDescription');
let flipCard = document.querySelector('.flip-card');


MovedDivs.forEach( (moved, i)=>{
    moved.addEventListener( 'click' , ()=>{

    flipCard.classList.remove('d-none')
    let docente = teachers[i];
innerFace.style.backgroundImage = `url(${docente.url})`;
cardName.innerHTML = docente.name;
cardDescription.innerHTML = docente.description;

    })
})