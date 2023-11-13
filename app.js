console.log("app is running");

fetch("https://dummyjson.com/products")
.then((response) => response.json())
.then((json) => {

    const allProd = json.products; 
    console.log(allProd);


    let categoriesList = [];

    for(let i = 0; i < allProd.length; i++){

        const obj = allProd[i];
        const category = obj.category;

        if(categoriesList.some((object) => object.category == category)){
            continue;
        } else {
            categoriesList.push(obj)
        }

    }

    
    console.log(categoriesList);

    let categoriesDiv = document.querySelector('#categoriesWrapper');

    categoriesList.forEach((obj) =>{

        let div = document.createElement('div');
        div.classList.add('col-12','col-md-4','mb-5');
        div.innerHTML = `
            <div class="card text-bg-dark border-0">
                <img src="${obj.images[2]}" class="card-img card-img-home" alt="...">
                <div class="card-img-overlay d-flex align-items-center justify-content-center">
                    <button class="btn btn-category text-white rounded-0 mt-5 px-5 py-2 fs-5 fw-bold text-uppercase">${obj.category}</button>
                </div>
            </div>
        `; 
        categoriesDiv.append(div);
    }) 

});

const btnScrollTop = document.querySelector('#btnScrollTop');

btnScrollTop.addEventListener('click', (event) => {

    console.log("Hai raggiunto il top del documento")
    scrollTop()

})

function scrollTop(){

    document.documentElement.scrollTop = 0;

    //oppure-> window.scrollTo(0,0)
}

