//Sélection du bouton commander
const btnSendForm = document.getElementById('order');

btnSendForm.addEventListener('click', (e) => submitForm(e));

//Récupération des produits avec l'API
fetch('http://localhost:3000/api/products')
  .then((res) => res.json())
  .then((products) => {
    dataProductsCart(products);
  })
  .catch((error) => {
    console.log('Je suis une erreur de la requête GET', error);
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

  //Appel des différentes fonctions
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
    product.addEventListener('input', (e) => {
      e.preventDefault();
      //Récupérer les informations du panier qui sont stocké dans le local storage
      const cart = JSON.parse(localStorage.getItem('product'));
      // Recherche l'élément HTML sur lequel l'événement a eu lieu en comparant l'id et color
      const item = cart.find(
        (i) => i.id === product.dataset.id && i.color === product.dataset.color
      );
      // Mise à jour de quantité
      item.quantity = Math.min(e.target.value, 100);
      // Sauvegarde le panier dans le localStorage de nouveau
      localStorage.setItem('product', JSON.stringify(cart));
      // Mise à jour de quantité dans le html
      product.dataset.quantity = e.target.value;
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

//Fonction qui soumet le formulaire
function submitForm(e) {
  e.preventDefault();

  // Récupération du formulaire valide
  const form = requestBody(e);
  // Si Formulaire invalide : Envoi annulé
  if (form == null) return;

  //On fait la requête POST avec /order
  const body = requestBody();
  fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      alert('Votre commande a bien été effectuée');
      //On récupère l'id de la commande
      const orderId = data.orderId;

      //Redirection vers confirmation en récupérant l'id
      window.location.href = 'confirmation.html' + '?orderId=' + orderId;
      return console.log(data);
    })
    .catch((error) => {
      console.log('Je suis une erreur de la requête POST', error);
    });
}

//Fonction qui vérifie si les champs sont vides
function IsInvalidForm() {
  const displayFormCart = document.querySelector('.cart');

  //Sélection de tous les inputs
  const inputs = displayFormCart.querySelectorAll('input');

  //Boucle sur chaque input vérifie si le champs est vide ou non
  inputs.forEach((input) => {
    if (input.value === '') {
      alert('Merci de remplir tous les champs du formulaire');
      return true;
    } else {
      return false;
    }
  });
}

//Fonction qui récupère les données du formulaire et du local storage
function requestBody(e) {
  //Récupération des valeurs du formulaire
  const cart = JSON.parse(localStorage.getItem('product'));
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const address = document.querySelector('#address').value;
  const city = document.querySelector('#city').value;
  const email = document.querySelector('#email').value;

  // Constante : Appel des fonctions de validation
  const formValid =
    IsFirstNameInvalid() &&
    IsLastNameInvalid() &&
    IsAddressInvalid() &&
    IsCityInvalid() &&
    IsEmailInvalid();

  //Si produits dans le panier et champs valides
  if (
    cart !== null &&
    [firstName, lastName, address, city, email] !== '' &&
    formValid
  ) {
    //Création d'un tableau pour stocker l'id produits
    const productsIds = [];

    //Ajout de l'id de chaque produits dans le tableau
    cart.forEach((optionProduct) => {
      productsIds.push(optionProduct.id);
    });

    //Création objet pour stocker le formulaire
    const form = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email,
      },
      products: productsIds,
    };
    return form;
  } else {
    alert(
      "Veuillez bien remplir le formulaire et d'avoir un produit dans votre panier"
    );
    e.preventDefault(e);
  }
}

//Fonction Prénom pour vérifier la validité du champs avec message d'erreur
function IsFirstNameInvalid() {
  //Récupération des éléments dans le DOM
  const firstNameInput = document.getElementById('firstName');
  const firstNameValue = document.getElementById('firstName').value;
  const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');

  //Regex pour l'éléments
  const regex =
    /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{3,20}$/;

  //Si le champ ne correspond pas au regex affichage message d'erreur
  if (regex.test(firstNameValue) == false) {
    firstNameInput.style.backgroundColor = 'red';
    firstNameInput.style.color = 'white';
    firstNameErrorMsg.innerHTML = `Ce champ est obligatoire :<br>
                                  - "Prénom" ne doit comporter que des lettres<br>
                                  - Tirets et accents sont autorisés`;
    firstNameErrorMsg.style.display = 'inherit';
    return false;
  } else {
    return true;
  }
}

//Fonction Nom pour vérifier la validité du champs avec message d'erreur
function IsLastNameInvalid() {
  //Récupération des éléments dans le DOM
  const lastNameInput = document.getElementById('lastName');
  const lastNameValue = document.getElementById('lastName').value;
  const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');

  //Regex pour l'éléments
  const regex =
    /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{3,20}$/;

  //Si le champ ne correspond pas au regex affichage message d'erreur
  if (regex.test(lastNameValue) == false) {
    lastNameInput.style.backgroundColor = 'red';
    lastNameInput.style.color = 'white';
    lastNameErrorMsg.innerHTML = `Ce champ est obligatoire :<br>
                                  - "Nom" ne doit comporter que des lettres<br>
                                  - Tirets et accents sont autorisés`;
    lastNameErrorMsg.style.display = 'inherit';
    return false;
  } else {
    return true;
  }
}

//Fonction Adresse pour vérifier la validité du champs avec message d'erreur
function IsAddressInvalid() {
  //Récupération des éléments dans le DOM
  const addressInput = document.getElementById('address');
  const addressValue = document.getElementById('address').value;
  const addressErrorMsg = document.getElementById('addressErrorMsg');

  //Regex pour l'éléments
  const regex =
    /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{5,60}$/;

  //Si le champ ne correspond pas au regex affichage message d'erreur
  if (regex.test(addressValue) == false) {
    addressInput.style.backgroundColor = 'red';
    addressInput.style.color = 'white';
    addressErrorMsg.innerHTML = `Ce champ est obligatoire :<br>
                                  7 rue du tilleul`;
    addressErrorMsg.style.display = 'inherit';
    return false;
  } else {
    return true;
  }
}

//Fonction Ville pour vérifier la validité du champs avec message d'erreur
function IsCityInvalid() {
  //Récupération des éléments dans le DOM
  const cityInput = document.getElementById('city');
  const cityValue = document.getElementById('city').value;
  const cityErrorMsg = document.getElementById('cityErrorMsg');

  //Regex pour l'éléments
  const regex =
    /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{5,60}$/;

  //Si le champ ne correspond pas au regex affichage message d'erreur
  if (regex.test(cityValue) == false) {
    cityInput.style.backgroundColor = 'red';
    cityInput.style.color = 'white';
    cityErrorMsg.innerHTML = `Ce champ est obligatoire :<br>
                                  - "Ville" ne doit comporter que des lettres, tirets et accents sont autorisés<br>
                                  - "Code Postal" ne doit comporter que des chiffres`;
    cityErrorMsg.style.display = 'inherit';
    return false;
  } else {
    return true;
  }
}

//Fonction Email pour vérifier la validité du champs avec message d'erreur
function IsEmailInvalid() {
  //Récupération des éléments dans le DOM
  const emailInput = document.getElementById('email');
  const emailValue = document.getElementById('email').value;
  const emailErrorMsg = document.getElementById('emailErrorMsg');

  //Regex pour l'éléments
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  //Si le champ ne correspond pas au regex affichage message d'erreur
  if (regex.test(emailValue) == false) {
    emailInput.style.backgroundColor = 'red';
    emailInput.style.color = 'white';
    emailErrorMsg.innerHTML = `L'email n'est pas valide :<br>
                                    example@kanap.com`;
    emailErrorMsg.style.display = 'inherit';
    return false;
  } else {
    return true;
  }
}
