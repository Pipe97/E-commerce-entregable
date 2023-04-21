const baseUrl = "https://ecommercebackend.fundamentos-29.repl.co/";
const carToggle = document.querySelector(".car_toggle");
const carBlock = document.querySelector(".car_block");
const productsList = document.querySelector('#products-container');
const car = document.querySelector("#car");
const carList = document.querySelector("#car_list");
let carProducts = [];
const emptyCarButton= document.querySelector("#empty__cart");
carToggle.addEventListener("click", ()=>{
  carBlock.classList.toggle("nav_car_visible")
})
evenListenersLoaders();
function evenListenersLoaders(){
    productsList.addEventListener("click", addProduct);
car.addEventListener("click", deleteProducts);
  emptyCarButton.addEventListener("click", emptyCar);
document.addEventListener("DOMContentLoaded", () => {
        carProducts = JSON.parse (localStorage.getItem("cart")) || [];
        carElementsHTML();
    })
}
function getProducts() {
  axios.get(baseUrl)
      .then(function(responce){
          const products = responce.data;
          printProducts (products);
      })
      .catch(function(error){
          console.log (error);
      })
}
getProducts();
function printProducts(products){
  let html = '';
  for(let i = 0; i < products.length; i++){
      html += `
      <div class = 'product__container'>
          <div class = 'product__container__img'>
              <img src = '${products[i].image}' alt = 'image'>
          </div>
          <div class = 'product__container__name'>
              <p>${products[i].name}</p>
          </div>
          <div class = 'product__container__price'>
              <p>$ ${products[i].price.toFixed(2)}</p>
          </div>
          <div class="product__container__button">
              <button class="car__button add__to__car" id="add__to__car" data-id="${products[i].id}">comprar</button>
              <button class= "product__details">Ver Detalles</button>
          </div>
      </div>`;
  }
        productsList.innerHTML = html;
}
function addProduct (event){
    if (event.target.classList.contains("add__to__car")) {
        const product = event.target.parentElement.parentElement;
         carProductsElements(product);
    }   
}
function carProductsElements(product){
const infoProduct = {        
id: product.querySelector("button").getAttribute("data-id"),
image: product.querySelector("img").src,
name: product.querySelector(".product__container__name p").textContent, 
price: product.querySelector(".product__container__price p").textContent,
quantity: 1
}
 if (carProducts.some(product => product.id === infoProduct.id)){
    const product = carProducts.map(product => {
        if(product.id === infoProduct.id){
            product.quantity++;
            return product;
        }
        else {
            return product;
        }
    })
    carProducts = [...product]
} else {
    carProducts = [...carProducts, infoProduct]

}
console.log(carProducts);
carElementsHTML();
}
function carElementsHTML(){
carList.innerHTML = "";
 carProducts.forEach(product => {
        const div = document.createElement ("div");
        div.innerHTML = `
    <div class="car__product">
        <div class ="car__product__image">
            <img src="${product.image}">
        </div>
        <div class = "car__product__description">
            <p>${product.name}</p>
            <p>Precio:${product.price}</p>
            <p>Cantidad:${product.quantity}</p>
        </div>
        <div class = "car__product__button">
            <button class= "delete__product" data-id="${product.id}">Eliminar</button>
        </div>
    </div>
    <hr>
    `;
carList.appendChild(div); 
})
productsStorage ();
}
function productsStorage (){
    localStorage.setItem("cart", JSON.stringify(carProducts));
}
function deleteProducts (event){
    if(event.target.classList.contains("delete__product")) {
        const productId = event.target.getAttribute("data-id");
        carProducts = carProducts.filter(product => product.id !== productId);
        carElementsHTML();    
    }
}
function  emptyCar(){
    carList.innerHTML = "";
    carProducts = [];
    carElementsHTML();
}
