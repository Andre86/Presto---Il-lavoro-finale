let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNav = document.querySelector('#logoNav');
let lightsaber = document.querySelector('#lightsaber');
let collapse = document.querySelector('#collapse');
let check = false;

// una cosa nuova
window.addEventListener('scroll', ()=>{
    let scrolled = window.scrollY;
    
    if(scrolled > 0){
        navbar.classList.remove('bg-black');
        navbar.classList.add('bg-yellow');
        collapse.classList.remove('bg-black');
        collapse.classList.add('bg-yellow');
        links.forEach( (link)=> {
            link.style.color = 'var(--black)';
        });
        logoNav.src = 'http://127.0.0.1:5500/media/black.png'
        lightsaber.src = 'http://127.0.0.1:5500/media/laser.png'
    }else{
        navbar.classList.add('bg-black');
        navbar.classList.remove('bg-yellow'); 
        collapse.classList.add('bg-black');
        collapse.classList.remove('bg-yellow'); 
        links.forEach( (link)=> {
            link.style.color = 'var(--yellow)';
        });
        logoNav.src = 'http://127.0.0.1:5500/media/yellow.png'
        lightsaber.src = 'http://127.0.0.1:5500/media/laser yellow.png'
        
    }
});
// fine cosa nuova, controllare bazza di WINDOW

lightsaber.addEventListener('click', ()=>{
    if(check == false){
        lightsaber.style.transform = `rotate(-180deg)`
        check = true;
    }else{
        lightsaber.style.transform = `rotate(0deg)`
        check = false;
    }
})


// chiamate ASINCRONE: istruzioni che non caricano con la pagina, ma aspettano che la pagina venga caricata

// setInterval(): crea un loop infinito in cui possiamo gestire la durata delle singole interazioni
// è una funzione chev uole due parametri, il primo: la callback, il secondo è l intervallo di tempo espresso in millisecondi

// clearInterval(): ha lo scopo di pulire un intervallo
// setTimeout: fa partire un blocco di istruzioni dopo tot secondi

let first = document.querySelector('#first');
let second = document.querySelector('#second');
let third = document.querySelector('#third');

let confirm = true;

function createInterval(n, element, time){
    let counter = 0;
    let interval = setInterval( ()=>{
        if(counter < n){
            counter++
            element.innerHTML = counter;
        }else{
            
        }
    }, time);
    setTimeout(()=> {
        confirm = true;
    }, 8000);
}

createInterval(100, first, 10);
createInterval(200, second, 5);
createInterval(250, third, 10);


// let counter = 0; - QUESTA E UNA PROVA - 

// let interval = setInterval( ()=>{
    // if(counter < 100){
//     counter++
//     first.innerHTML = counter;
// }else{
    
// }
// } , 10 );

// let counter2 = 0;

// let interval2 = setInterval( ()=>{
    // if(counter < 200){
//     counter++
//     second.innerHTML = counter;
// }else{
    
// }
// } , 10 );

// let counter3 = 0;

// let interval3 = setInterval( ()=>{
    // if(counter < 100){
//     counter++
//     third.innerHTML = counter;
// }else{
    
// }
// } , 10 );

// IntersectionObserver: è una Classe del Browser che si occupa di far scattare una funzione nel momento in cui nel suo browser sono visibili con gli elementi HTML che noi gli indichiamo
// new = keyword che mi permette di GENERARE UN OGGETTO PARTENDO DALLA CLASSE

// in questo oggetto scatta una CallBack

let observer = new IntersectionObserver( (entries)=>{
    entries.forEach( (entry)=> {
        
        if(entry.isIntersecting && confirm){
            createInterval(100, first, 10);
            createInterval(200, second, 5);
            createInterval(250, third, 10);
            confirm = false;
        }
        
    });
});

observer.observe(first);




let reviews = [
    {user: 'Andrea' , description: 'Un sito stupendo!', rank: 5},
    {user: 'Mirko' , description: 'Un sito top!', rank: 4},
    {user: 'Gianna' , description: 'Bello', rank: 3},
    {user: 'Anna' , description: 'Ottimo riferimento', rank: 5},
    {user: 'Vilma' , description: 'Che novità!!!', rank: 5},
]

let swiperWrapper = document.querySelector('.swiper-wrapper');

reviews.forEach( (recensione)=>{
    let div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
<div class="card-review">
<p class="lead text-center">
  ${recensione.description}
  <p class="h4 text-center">${recensione.user}</p>
  <div class="d-flex justify-content-center star">
    
  </div>
</p>
      </div>`;
    swiperWrapper.appendChild(div);
});

let stars = document.querySelectorAll('.star');


stars.forEach( (star, index)=>{
    
    for(let i = 1; i <= reviews[index].rank; i++ ){
        let icon = document.createElement('i');
        icon.classList.add('fa-brands' , 'fa-sith');
        star.appendChild(icon);
    }
    
    let difference = 5 - reviews[index].rank;
    
    for(let i = 1; i <= difference; i++ ){
        let icon = document.createElement('i');
        icon.classList.add('fa-solid' , 'fa-bahai');
        star.appendChild(icon);
    }
    
});

// SWIPER

const swiper = new Swiper('.swiper', {
    // Optional parameters
    // direction: 'hotizontal',
    loop: true,
    
    
    
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    
});