console.log("products is running");

// Setto lo stato iniziale dell'applicazione

let state = {

    data: [],
    pagination: 0,
    loading: false,
    results: 0,
    searchTerm: '',
    cart: [],
    category: ''
}

console.log("Stato dell'applicazione iniziale ", state);


// Selezioni dal DOM

const productsList = document.querySelector('#productsList');
const loading = document.querySelector('#loading');
const itemsNumber = document.querySelector('#itemsNumber');
const input = document.querySelector('input');
const form = document.querySelector('form');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const cartButton = document.querySelector("#cartButton"); 
const cartTab = document.querySelector(".cartTab");
const closeTab = document.querySelector("#closeTab"); 
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");  
const filtro = document.querySelector('#filters');


// Funzione che aggiorna lo stato dell'applicazione

function updateState(obj){
    state = {
        ...state,
        ...obj
    }
    
    renderProducts()

    console.log("Stato dell'applicazione aggiornato ", state);


    //rendering del numero di prodotti visualizzati in pagina
    itemsNumber.textContent = state.results

    //rendering icona loading
    state.loading || loading.classList.add("d-none")


    // rendering Previous button
    if(state.pagination < 1){
        prev.classList.add("d-none")
    }else{
        prev.classList.remove("d-none")
    }

    // rendering Next button
    if(state.pagination > 80){
        next.classList.add("d-none")
    }else{
        next.classList.remove("d-none")
    }
}


// Funzione che permette di ottenere i prodotti dall'API tramite chiamata Http
async function getProducts(page){

    updateState({
        data: [],
        loading: true
    })

    const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${page}`);
    const json = await response.json();
    console.log(json);

    updateState({
        data: json.products,
        loading: false,
        results: json.products.length
    })
}

getProducts(state.pagination);


//Elenco categorie
fetch('https://dummyjson.com/products/categories')
.then(res => res.json())
.then((categories) => {

    console.log("Categorie",categories);

    let categoryFilters = document.querySelector('#filters');

    categories.forEach( (name) =>{

        let liFilter = document.createElement('li');
        liFilter.classList.add('nav-item', 'mb-1');
        liFilter.innerHTML = `
            <i class="bi bi-tag"></i>
            ${name}
        `;
       
        categoryFilters.append(liFilter);
    })

});


// Scheda carrello prodotti
cartButton.addEventListener('click', () => {
    cartTab.style.right = "0vw"
})
  
closeTab.addEventListener('click', () => {
    cartTab.style.right = "-40vw"
})


//Ricerca prodotto*
input.addEventListener('input', (event) =>{

    // console.log(event.currentTarget.value);
    updateState({
        searchTerm: event.currentTarget.value
    })
})

form.addEventListener('submit', (event) =>{
    event.preventDefault();

    let resultSearch = searchByTitle(state.searchTerm)
    updateState({
        data: resultSearch,
        results: state.results = resultSearch.length
    })
})


//Paginazione prodotti
prev.addEventListener('click', () =>{

    updateState({

        pagination: state.pagination - 10
    })

    getProducts(state.pagination)
})

next.addEventListener('click', () =>{

    updateState({

        pagination: state.pagination + 10
    })
    getProducts(state.pagination)
})


//* Funzione che permette di flitrare il pordotto cercato dall'utente
function searchByTitle(title){
    
    return state.data.filter((product) => product.title.match(new RegExp(title, "gi")));
}


//Funzione che aggiunge i prodotti al carrello
function addToCart(index) {
    const product = state.data.find(item => state.data.indexOf(item) === index)
    updateState({
      cart: [...state.cart, product]
    })

    renderCartItems()

}


//Funzione che renderizza i prodotti
function renderProducts(){

    productsList.innerHTML = "";

    state.data.forEach((item, index )=>{

        let div = document.createElement('div');
        div.classList.add('col-md-4', 'col-sm-6', 'mb-4')
        div.innerHTML = `
        <div class="card">
        <img src="${item.thumbnail}" class="card-img-top" alt="${item.title}">
        <div class="card-body">
        <h5 class="card-title product-title">${item.title}</h5>
        <p class="card-text">${item.price}$</p>
        
        <button class="btn btn-product" onclick="addToCart(${index})">Buy now</button>
        </div>
        </div>
        `;
       
        productsList.append(div)

    })
}


//funzione che permette di visualizzare i prodotti nel carrello
function renderCartItems(){

    cartItems.innerHTML = "";
    state.cart.forEach((product) => {
      let li = document.createElement('li')
      li.classList.add('mt-3')
      li.innerHTML = `
          <div class="card border-0 p-3">
                  <div class="d-flex justify-content-between">
                    <p>${product.title}</p>
                    <p>${product.price} $</p>
                  </div>
                  <p>${product.description}</p>
          </div>
      `
      cartItems.append(li)
    })
  
    cartTotal.textContent = state.cart.reduce((acc, product) => {
      acc += product.price
      return acc
    }, 0)
}



//pulsante per scrollare verso il top della la pagina 
const btnScrollTop = document.querySelector('#btnScrollTop');

btnScrollTop.addEventListener('click', (event) => {

    console.log("Hai raggiunto il top del documento")
    scrollTop()

})

function scrollTop(){

    document.documentElement.scrollTop = 0;

    //oppure-> window.scrollTo(0,0)
}