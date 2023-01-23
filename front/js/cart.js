//Déclaration de la variable "productSaveLocalStorage" + JSON Parse pour convertir les données au format JSON
let productSaveLocalStorage = JSON.parse(localStorage.getItem('product'));

//--------------- Affichage des produits du panier
//Selection de la classe ou je vais injecter le code html
const displayCart = document.querySelector('.cart');

//Si le panier est vide : afficher le panier est vide
if (productSaveLocalStorage === null || productSaveLocalStorage == 0) {
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
  for (i = 0; i < productSaveLocalStorage.length; i++) {
    structureProductCart =
      structureProductCart +
      `
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
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productSaveLocalStorage[i].quantite}">
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

  if (i == productSaveLocalStorage.length) {
    //Injection html dans le panier
    displayCart.innerHTML = structureProductCart;
  }
}

//--------------- Gestion du bouton supprimer l'article
//Sélection des références de tous les boutons supprimer dans le panier
let btnDelete = document.querySelectorAll('.deleteItem');

for (let j = 0; j < btnDelete.length; j++) {
  btnDelete[j].addEventListener('click', (e) => {
    e.preventDefault();

    //Selectionner de l'id du produit qui va être supprimer en cliquant sur le bouton
    let idSelectDelete = productSaveLocalStorage[j].id;

    //Avec la méthode filter je sélectionne les éléments à garder et je supprime le bouton supprimé activé
    productSaveLocalStorage = productSaveLocalStorage.filter(
      (el) => el.id !== idSelectDelete
    );

    //On envoie la variable dans le localstorage
    //La transformation en format JSON et l'envoyer dans la key "product" du local storage
    localStorage.setItem('product', JSON.stringify(productSaveLocalStorage));

    //Rechargement de la page
    window.location.href = 'cart.html';
  });
}

//--------------- Montant total du panier
//Déclaration de la variable pour pouvoir y mettre les prix qui sont présent dans le panier
let priceTotalCalculation = [];

//Aller chercher les prix dans le panier
for (let k = 0; k < productSaveLocalStorage.length; k++) {
  let priceProductCart = productSaveLocalStorage[k].price;

  //Mettre les prix du panier dans la variable priceTotal
  priceTotalCalculation.push(priceProductCart);
}

//Additionner les prix qu'il y a dans le tableau de la variable priceTotal avec la méthode .reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const priceTotal = priceTotalCalculation.reduce(reducer, 0);

//Afficher le prix total en HTML
const displayPriceTotal = `
        <div class="cart__price">
            <p>Total (<span id="totalQuantity">2</span> articles) : <span id="totalPrice">${priceTotal}</span> €</p>
        </div>
        `;

displayCart.insertAdjacentHTML('beforeend', displayPriceTotal);

//--------------- Formulaire de commande
const displayStructureForm = () => {
  //Sélection de l'élément dans le DOM pour le positionnement du formulaire
  const displayFormCart = document.querySelector('.cart');

  const structureForm = `
  <div class="cart__order">
              <form method="get" class="cart__order__form">
                <div class="cart__order__form__question">
                  <label for="firstName">Prénom: </label>
                  <input type="text" name="firstName" id="firstName" required>
                  <p id="firstNameErrorMsg">ci est un message d'erreur</p>
                </div>
                <div class="cart__order__form__question">
                  <label for="lastName">Nom: </label>
                  <input type="text" name="lastName" id="lastName" required>
                  <p id="lastNameErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="address">Adresse: </label>
                  <input type="text" name="address" id="address" required>
                  <p id="addressErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="city">Ville: </label>
                  <input type="text" name="city" id="city" required>
                  <p id="cityErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="email">Email: </label>
                  <input type="email" name="email" id="email" required>
                  <p id="emailErrorMsg"></p>
                </div>
                <div class="cart__order__form__submit">
                  <input type="submit" value="Commander !" id="order">
                </div>
              </form>
            </div>
  `;

  displayFormCart.insertAdjacentHTML('afterend', structureForm);
};

//Affichage du formulaire
displayStructureForm();

//Sélection du bouton commander
const btnSendForm = document.getElementById('order');

//addEventListener
btnSendForm.addEventListener('click', (e) => {
  e.preventDefault();

  //Récupération des valeurs du formulaire
  const formValues = {
    firstName: document.querySelector('#firstName').value,
    lastName: document.querySelector('#lastName').value,
    address: document.querySelector('#address').value,
    city: document.querySelector('#city').value,
    email: document.querySelector('#email').value,
  };

  //--------------- Gestion de la validation du formulaire
  const textAlert = (value) => {
    return `${value}: Chiffre et symbole ne sont pas autorisé \n Ne pas dépasser 20 caractères, minimum 3 caractères`;
  };

  const regExFirstLastName = (value) => {
    return /^[A-Za-z]{3,20}$/.test(value);
  };

  //Contrôle de la validité du prénom
  function firstNameControle() {
    const firstName = formValues.firstName;
    if (regExFirstLastName(firstName)) {
      return true;
    } else {
      alert(textAlert('Prénom'));
      return false;
    }
  }

  //Contrôle de la validité du nom
  function lastNameControle() {
    const lastName = formValues.lastName;
    if (regExFirstLastName(lastName)) {
      return true;
    } else {
      alert(textAlert('Nom'));
      return false;
    }
  }

  if (firstNameControle() && lastNameControle()) {
    //Mettre l'objet formValue dans le local storage
    localStorage.setItem('formValues', JSON.stringify(formValues));
  } else {
    alert('Veuillez bien remplir le formulaire');
  }

  //Mettre les values du formulaire et mettre les produits sélectionnés dans un objet à envoyer vers le serveur
  const sendForm = {
    productSaveLocalStorage,
    formValues,
  };

  //Envoi de l'objet form vers le serveur
});

//--------------- Mettre le contenu du localstorage dans les champs du formulaire
//Prendre la key dans le localStorage et la mettre dans une variable
const dataLocalStorage = localStorage.getItem('formValues');

const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

//Fonction pour que le champs du formulaire soit rempli par les données du local storage
function fullFormLocalStorage(input) {
  document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
}

fullFormLocalStorage('firstName');
fullFormLocalStorage('lastName');
fullFormLocalStorage('address');
fullFormLocalStorage('city');
fullFormLocalStorage('email');
