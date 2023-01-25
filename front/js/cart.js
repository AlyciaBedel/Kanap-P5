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
function deleteProduct() {
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
}
deleteProduct();

//--------------- Montant total du panier
function getTotal() {
  //Déclaration de la variable pour pouvoir y mettre les prix qui sont présent dans le panier
  let priceTotalCalculation = [];
  let quantityTotalCalculation = [];

  //Aller chercher les prix dans le panier
  for (let k = 0; k < productSaveLocalStorage.length; k++) {
    let priceProductCart = productSaveLocalStorage[k].price;
    let quantityProductCart = productSaveLocalStorage[k].quantite;

    //Mettre les prix du panier dans la variable priceTotal
    priceTotalCalculation.push(priceProductCart);
    quantityTotalCalculation.push(quantityProductCart);
  }

  //Additionner les prix qu'il y a dans le tableau de la variable priceTotal avec la méthode .reduce
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const priceTotal = priceTotalCalculation.reduce(reducer, 0);

  const reducerQuantity = (accumulator, currentValue) =>
    accumulator + currentValue;
  const quantityTotal = quantityTotalCalculation.reduce(reducerQuantity, 0);

  //Afficher le prix total en HTML
  const displayPriceTotal = `
        <div class="cart__price">
            <p>Total (<span id="totalQuantity">${quantityTotal}</span> articles) : <span id="totalPrice">${priceTotal}</span> €</p>
        </div>
        `;

  displayCart.insertAdjacentHTML('beforeend', displayPriceTotal);
}
getTotal();

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
                  <p id="firstNameErrorMsg"></p>
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
  //RegEx pour nom + prénom
  const regExFirstLastName = (value) => {
    return /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{3,20}$/.test(
      value
    );
  };

  //RegEx pour l'e-mail
  const regExEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };

  //RegEx pour l'adresse
  const regExAddressCity = (value) => {
    return /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{5,60}$/.test(
      value
    );
  };

  //Fonction messages d'erreurs
  function dataInputMissingEmpty(querySelectorId) {
    document.querySelector(`#${querySelectorId}`).textContent = '';
  }

  //Contrôle de la validité du prénom
  function firstNameControl() {
    const firstName = formValues.firstName;
    if (regExFirstLastName(firstName)) {
      dataInputMissingEmpty('firstNameErrorMsg');
      return true;
    } else {
      document.querySelector('#firstNameErrorMsg').textContent =
        'Chiffre et symbole ne sont pas autorisé. Ne pas dépasser 20 caractères, minimum 3 caractères';
      return false;
    }
  }

  //Contrôle de la validité du nom
  function lastNameControl() {
    const lastName = formValues.lastName;
    if (regExFirstLastName(lastName)) {
      dataInputMissingEmpty('lastNameErrorMsg');
      return true;
    } else {
      document.querySelector('#lastNameErrorMsg').textContent =
        'Chiffre et symbole ne sont pas autorisé. Ne pas dépasser 20 caractères, minimum 3 caractères';
      return false;
    }
  }

  //Contrôle de la validité de l'adresse
  function addressControl() {
    const address = formValues.address;
    if (regExAddressCity(address)) {
      dataInputMissingEmpty('addressErrorMsg');
      return true;
    } else {
      document.querySelector('#addressErrorMsg').textContent =
        "L'adresse doit contenir que des lettres et des chiffres";
      return false;
    }
  }

  //Contrôle de la validité de la ville
  function cityControl() {
    const city = formValues.city;
    if (regExAddressCity(city)) {
      dataInputMissingEmpty('cityErrorMsg');
      return true;
    } else {
      document.querySelector('#cityErrorMsg').textContent =
        'Les symboles ne sont pas autorisé.';
      return false;
    }
  }

  //Contrôle de la validité de l'email
  function emailControl() {
    const email = formValues.email;
    if (regExEmail(email)) {
      dataInputMissingEmpty('emailErrorMsg');
      return true;
    } else {
      document.querySelector('#emailErrorMsg').textContent =
        "L'e-mail n'est pas valide";
      return false;
    }
  }

  if (
    firstNameControl() &&
    lastNameControl() &&
    addressControl() &&
    cityControl() &&
    emailControl()
  ) {
    //Mettre l'objet formValue dans le local storage
    localStorage.setItem('formValues', JSON.stringify(formValues));

    //Mettre les values du formulaire et mettre les produits sélectionnés dans un objet à envoyer vers le serveur
    const sendForm = {
      productSaveLocalStorage,
      formValues,
    };

    //Envoi de l'objet form vers le serveur
    const promiseAPI = fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      body: JSON.stringify(sendForm),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //Pour voir le résultat du serveur dans la console
    promiseAPI.then(async (response) => {
      try {
        const content = await response.json();
      } catch (e) {
        console.log(e);
      }
    });

    //Pour voir ce qu'il y a réellement sur le serveur
    const viewServer = fetch('http://localhost:3000/api/products/order');
    viewServer.then(async (response) => {
      try {
        console.log(viewServer);

        const dataOnServer = await response.json();
        console.log(dataOnServer);
      } catch (e) {
        console.log(e);
      }
    });
  } else {
    alert('Veuillez bien remplir le formulaire');
  }
});

//--------------- Mettre le contenu du localstorage dans les champs du formulaire
//Prendre la key dans le localStorage et la mettre dans une variable
const dataLocalStorage = localStorage.getItem('formValues');

const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

//Fonction pour que le champs du formulaire soit rempli par les données du local storage
function fullFormLocalStorage(input) {
  if (dataLocalStorageObjet == null) {
    console.log('Le local storage a pour valeur null');
  } else {
    document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
  }
}

fullFormLocalStorage('firstName');
fullFormLocalStorage('lastName');
fullFormLocalStorage('address');
fullFormLocalStorage('city');
fullFormLocalStorage('email');
