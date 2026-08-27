let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNav = document.querySelector('#logoNav');

console.dir(logoNav);

// una cosa nuova
window.addEventListener('scroll', ()=>{
    let scrolled = window.scrollY;
    
    if(scrolled > 0){
        navbar.classList.remove('bg-black');
        navbar.classList.add('bg-yellow');
        links.forEach( (link)=> {
            link.style.color = 'var(--black)';
        });
        logoNav.src = 'http://127.0.0.1:5500/media/black.png'
    }else{
        navbar.classList.add('bg-black');
        navbar.classList.remove('bg-yellow'); 
        links.forEach( (link)=> {
            link.style.color = 'var(--yellow)';
        });
        logoNav.src = 'http://127.0.0.1:5500/media/yellow.png'
    }
});
// fine cosa nuova, controllare bazza di WINDOW