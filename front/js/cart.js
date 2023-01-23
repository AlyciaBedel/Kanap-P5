//Déclaration de la variable "productSaveLocalStorage" 
let productSaveLocalStorage = JSON.parse(localStorage.getItem("product"));

//JSON Parse pour convertir les données au format JSON 
console.log(productSaveLocalStorage);

//Affichage des produits du panier
//Selection de la classe ou je vais injecter le code html 
const displayCart = document.querySelector(".cart");
console.log(displayCart);

//Si le panier est vide : afficher le panier est vide 
if(productSaveLocalStorage === null) {
    const cartEmpty = `
    <div>
    <p>Le panier est vide</p>
    </div>
    `;
    displayCart.innerHTML = cartEmpty;
} else {
    //Si le panier n'est pas vide : afficher les produits dans le localStorage
    let structureProductCart = [];

    //Afficher les produits dans le panier selon le code HTML
    for(i = 0; i <productSaveLocalStorage.length; i++) {
        structureProductCart = structureProductCart + `
        <section id="cart__items">
              <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${productSaveLocalStorage[i].image}" alt="${productSaveLocalStorage[i].imageAlt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productSaveLocalStorage[i].name}</h2>
                    <p>${productSaveLocalStorage[i].optionProduct}</p>
                    <p>${productSaveLocalStorage[i].price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
            </section>
        `;
    }

    if(i == productSaveLocalStorage.length){
        //Injection html dans le panier 
        displayCart.innerHTML=structureProductCart;
    }
}