// .json = Javascript Object Notification - è un formato che serve per contenere dati complessi, ma sono dati primitivi

// API: chiavi che ci permettono di raggiungere un .json online

// fetch(): chiamata asincrona che ci permette di collegarci ad un JSON e da esso estrarne il dato sottoforma di PROMISE

// .then(): questo metodo permette di convertire la Promise nel dato strutturale
// e poterlo utilizzare come tale su JS 


// 1. fetch(): = mi collego al JSON e ottengo una PROMISE
// 2. .then()= converto la promise in un dato strutturale JS
// 3. .then()=utilizzo il dato ottenuto
// .json(): metodo delle promise che mi permette di convertire in oggetto JS


fetch('./annunci.json').then( (response)=> response.json()  ).then( (data)=> {
    console.log(data);
    data.sort((a, b) => a.price - b.price);
    let radioWrapper = document.querySelector('#radioWrapper');
    let cardWrapper = document.querySelector('#cardWrapper');
    
    
    
    
    // ora bisogna evitare che le categorie vengano duplicate a cazzo di cane, VEDI SOTTO DUE OPZIONI, LA PRIMA:
    
    // let uniqueCategories = [];
    
    // // !true
    // // !false
    
    // // categories.forEach( (category)=> {
        // //     if(!uniqueCategories.includes(category) ){
    // //         uniqueCategories.push(category)
    //     // }
    // });
    
    // SET(): classe che restituisce, da un array, un oggetto SET che contiene solo valori univoci
    // array.from(): da array like ad array
    //     function radioCreate(){
    
    //     let categories = data.map( (annuncio)=> annuncio.category );
    
    //     console.log(categories);
    //     let uniqueCategories = Array.from(new Set(categories));
    //     uniqueCategories.forEach( (category)=> {
        //         let div = document.createElement('div');
    //         div.classList.add('form-check');
    
    //         div.innerHTML= `
    //     <input class="form-check-input" type="radio" name="categories" id=${category}>
    //               <label class="form-check-label" for=${category}>
    //                 ${category}
    
    //                </label>
    
    //     `;
    
    //         radioWrapper.appendChild(div);
    
    //     });
    
    
    // }
    function radioCreate() {
        let categories = data.map((annuncio) => annuncio.category);
        
        let uniqueCategories = Array.from(new Set(categories));
        
        // uniqueCategories.unshift('All');
        
        uniqueCategories.forEach((category, index) => {
            let div = document.createElement('div');
            div.classList.add('form-check');
            
            div.innerHTML = `
            <input
                class="form-check-input"
                type="radio"
                name="categories"
                id="${category}"
                value="${category}"
                ${index === 0 ? 'checked' : ''}
            >
            
            <label class="form-check-label" for="${category}">
                ${category === 'All' ? 'Tutte le categorie' : category}
            </label>
        `;
            
            radioWrapper.appendChild(div);
        });
    }
    
    radioCreate();
    
    function truncateWord(string){
        if(string.length > 15){
            return string.split(' ')[0] + '...';
            
        }else{
            return string;
        }
        
    }
    
    function showCards(annunciDaMostrare = data) {
        cardWrapper.innerHTML = '';
        
        annunciDaMostrare.forEach((annuncio, i) => {
            let div = document.createElement('div');
            div.classList.add('card-custom');
            
            div.innerHTML = `
            <img 
                src="https://picsum.photos/${200 + i}" 
                alt="Immagine" 
                class="img-fluid img-card"
            >
            <p class="h2" title="${annuncio.name}">
                ${truncateWord(annuncio.name)}
            </p>
            <p class="h4">${annuncio.category}</p>
            <p class="lead">${annuncio.price} €</p>
        `;
            
            cardWrapper.appendChild(div);
        });
    }
    showCards(data);
    
    let radioButtons = document.querySelectorAll('.form-check-input');
    
    // function filterBy(array){
    
    
    //     let categoria = Array.from(radioButtons).find( (bottone)=> bottone.checked ).id;
    //     console.log(categoria);
    //     if(categoria != 'All'){
    
    //         let filtered = data.filter( (annuncio)=> annuncio.category == categoria ) ;
    //         console.log(filtered);   
    //         return filtered;
    //     }else{
        //         return
    //     }
    // }
    function filterBy(array) {
        let selectedRadio = Array.from(radioButtons)
        .find((bottone) => bottone.checked);
        
        let categoria = selectedRadio.id;
        
        if (categoria === 'All') {
            return array;
        }
        
        let filtered = array.filter((annuncio) => {
            return annuncio.category === categoria;
        });
        
        return filtered;
    }
    
    radioButtons.forEach((button) => {
        button.addEventListener('click', ()=> {
            setPriceInput(filterBy(data));
            globalFilter();
        });
    });
    
    let priceInput = document.querySelector('#priceInput');
    let priceValue = document.querySelector('#priceValue');
    
    
    //  catturiamo l input e settiamo proprietà max il valore più alto del prezzo di ogni prodotto. per farlo ho bisogno di un array che contenga solo i prezzi, lo ordino in maniera crescente e prendere l elemento col valore più alto
    function setPriceInput(array) {
        let prices = array.map((annuncio) => Number(annuncio.price));
        let maxPrice = Math.ceil(Math.max(...prices));
        
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceValue.innerHTML = maxPrice;
    }
    
    setPriceInput( filterBy(data));
    
    function filterByPrice(array){
        let filtered = array.filter( (annuncio)=> +annuncio.price <= priceInput.value);
        return filtered;
    }
    
    priceInput.addEventListener( 'input' , ()=>{
        priceValue.innerHTML = priceInput.value;
        globalFilter();
    })
    
    
    let wordInput = document.querySelector('#wordInput');
    
    function filterByWord(array){
        
        let filtered = array.filter( (annuncio)=> annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()) );
        return filtered;
    }
    wordInput.addEventListener('input' , ()=>{
        globalFilter();
    })
    
    //  ci serve: ad ogni evento scattino tutte e tre le funzioni di filtro ma non siano applicate tutte e tre sull'array data, bensì siano concatenate sul risultato da filtrare precedentemente
    
    
    function globalFilter(){
        let filteredBy = filterBy(data);
        let filteredByPrice = filterByPrice(filteredBy);
        let filteredByWord = filterByWord(filteredByPrice);
        showCards(filteredByWord);
    }
});

