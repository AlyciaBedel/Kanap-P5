//Récupération des produits avec l'API
fetch('http://localhost:3000/api/products')
  .then((res) => res.json())
  .then((products) => {
    dataProductsCart(products);
  })
  .catch((error) => {
    console.log(error);
  });

//Fonction de récupération des informations dans l'API qui ne sont pas dans le local storage
function dataProductsCart(products) {
  // On récupérer le panier du Local Storage et on le passe en JSON
  const cart = JSON.parse(localStorage.getItem('product'));

  //On vérifie si le panier n'est pas vide
  if (cart) {
    //On va faire une boucle sur chaque produit du panier
    for (let purchaseProduct of cart) {
      for (let i = 0; i < products.length; i++) {
        // On vérifie si l'id dans le local Storage est égale à l'id de l'API
        if (purchaseProduct.id === products[i]._id) {
          //On met à jour les données récupérer
          purchaseProduct.name = products[i].name;
          purchaseProduct.price = products[i].price;
          purchaseProduct.imageUrl = products[i].imageUrl;
          purchaseProduct.altTxt = products[i].altTxt;
          purchaseProduct.description = products[i].description;
        }
      }
    }
    displayCart(cart);
  } else {
    document.querySelector('#totalQuantity').innerHTML = '0';
    document.querySelector('#totalPrice').innerHTML = '0';
    document.querySelector('h1').innerHTML = 'Votre panier est vide';
  }
}

//Fonction pour afficher le panier
function displayCart(cart) {
  const cartContainer = document.querySelector('#cart__items');
  // Création des éléments et injections dans le HTML
  cartContainer.innerHTML += cart
    .map(
      (purchaseProduct) =>
        `<article class="cart__item" data-id="${purchaseProduct.id}" data-color="${purchaseProduct.color}" data-quantity="${purchaseProduct.quantity}" data-price="${purchaseProduct.price}"> 
            <div class="cart__item__img">
                <img src="${purchaseProduct.imageUrl}" alt="${purchaseProduct.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${purchaseProduct.name}</h2>
                    <span>Couleur : ${purchaseProduct.color}</span>
                    <p data-price="${purchaseProduct.price}">Prix : ${purchaseProduct.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Quantité : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${purchaseProduct.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" data-id="${purchaseProduct.id}" data-color="${purchaseProduct.color}">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`
    )
    .join('');

  //Appelle des différentes fonctions
  getTotal();
  updateQuantityPrice();
  removeFromCart();
}

//Fonction pour calculer le total du panier + de la quantité
function getTotal() {
  const containerCart = document.querySelectorAll('.cart__item');

  // On va utiliser Array.from pour convertir la NodeList en tableau
  // et Array.reduce pour calculer la quantité totale des produits et le prix du panier
  const { totalQuantity, totalPrice } = Array.from(containerCart).reduce(
    (acc, purchaseProduct) => {
      // On ajoute la quantité de chaque produit du panier
      acc.totalQuantity += JSON.parse(purchaseProduct.dataset.quantity);
      // On ajoute le prix total de chaque produit du panier
      acc.totalPrice +=
        purchaseProduct.dataset.quantity * purchaseProduct.dataset.price;
      return acc;
    },
    { totalQuantity: 0, totalPrice: 0 }
  );
  //On l'injecte dans le html
  document.getElementById('totalQuantity').textContent = totalQuantity;
  document.getElementById('totalPrice').textContent = totalPrice;
}

//Fonction pour modifier la quantité et le prix
function updateQuantityPrice() {
  const products = document.querySelectorAll('.cart__item');
  //Pour chaque élément, on ajoute un écouteur d'événement sur l'input
  products.forEach((product) => {
    product.addEventListener('input', (event) => {
      //Récupérer les informations du panier qui sont stocké dans le local storage
      const cart = JSON.parse(localStorage.getItem('product'));
      // Recherche l'élément HTML sur lequel l'événement a eu lieu en comparant l'id et color
      const item = cart.find(
        (i) => i.id === product.dataset.id && i.color === product.dataset.color
      );
      // Mise à jour de quantité
      item.quantity = Math.min(event.target.value, 100);
      // Sauvegarde le panier dans le localStorage de nouveau
      localStorage.setItem('product', JSON.stringify(cart));
      // Mise à jour de quantité dans le html
      product.dataset.quantity = event.target.value;
      getTotal();
    });
  });
}

//Fonction pour supprimer un élément du panier
function removeFromCart() {
  const deleteButtons = document.querySelectorAll('.cart__item .deleteItem');
  // On fait une boucle sur tous les boutons de suppression en écoutant l'événement au clique
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Récupérer les produits du panier dans le Local Storage et en les mettant en JSON
      const cart = JSON.parse(localStorage.getItem('product'));
      // Filtre le panier pour supprimer le produit sur le bouton cliquer
      const updatedCart = cart.filter(
        (item) =>
          item.id !== button.dataset.id && item.color !== button.dataset.color
      );
      // Enregistrer le panier mis à jour dans le Local Storage
      localStorage.setItem('product', JSON.stringify(updatedCart));

      // Trouve le produit du panier qui correspond au bouton sur lequel clique
      const productToDelete = document.querySelector(
        `.cart__item[data-id="${button.dataset.id}"][data-color="${button.dataset.color}"]`
      );

      // Supprime le produit du panier
      productToDelete.remove();

      if (updatedCart.length === 0) {
        //Nettoyer le local storage
        localStorage.clear();

        document.querySelector('#totalQuantity').innerHTML = '0';
        document.querySelector('#totalPrice').innerHTML = '0';
        document.querySelector('h1').innerHTML = 'Votre panier est vide';
      }
      getTotal();
    });
  });
}
