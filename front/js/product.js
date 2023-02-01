//Extraction de l'id dans l'url
const queryStringUrlId = window.location.search;
const urlSearchParams = new URLSearchParams(queryStringUrlId);
const id = urlSearchParams.get('id');

// Récupération des produits avec l'API à partir de l'id
fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => createDOM(res))
  .catch((error) => {
    console.log('Je suis une erreur de la requête GET', error);
  });

//Fonction qui va crée le DOM du produit
function createDOM(products) {
  //Récupération des éléments HTML
  const imageProduct = document.getElementsByClassName('item__img');
  const titleProduct = document.getElementById('title');
  const descriptionProduct = document.getElementById('description');
  const priceProduct = document.getElementById('price');

  //Modification et intégration des éléments
  titleProduct.innerHTML = products.name;
  descriptionProduct.innerHTML = products.description;
  priceProduct.innerHTML = products.price;

  //Initialisation variable avec informations des images
  let text = '';
  text =
    text + `<img src="${products.imageUrl}"alt ="${products.altTxt}"></img>`;

  //On précise bien l'index [0] car c'est un selecteur class et non Id donc stocké dans un Array
  imageProduct[0].innerHTML = text;

  //Appel de la fonction pour l'intégration des couleurs
  colorsOption(products);
  saveOrder(products);
}

//Fonction qui va intégrer les couleurs
function colorsOption(products) {
  //Stockage des couleurs des produits
  const colors = products.colors;

  //Récupération des couleurs avec l'API
  const selectColors = document.querySelector('#colors');

  if (selectColors != null) {
    colors.forEach((color) => {
      const createOption = document.createElement('option');
      createOption.value = color;
      createOption.textContent = color;
      selectColors.appendChild(createOption);
    });
  }
}

//Function qui va crée le panier par l'écoute du bouton
function saveOrder(products) {
  const btnSendCart = document.querySelector('#addToCart');

  //Ecoute le bouton ajouter au panier, selectionne les éléments inputs et renvoie au panier
  btnSendCart.addEventListener('click', (e) => {
    e.preventDefault();

    //Récupération des éléments
    const color = document.querySelector('#colors').value;
    const quantity = document.querySelector('#quantity').value;

    //Récupération des valeurs pour le panier
    const optionsProducts = {
      id: products._id,
      color: color,
      quantity: Number(quantity),
    };

    if (orderInvalid(color, quantity)) return;
    addProductLocalStorage(optionsProducts, color);
  });
}

//Fonction qui vérifie si les couleurs et les quantités ne sont pas renseignées ou son égale à 0
function orderInvalid(color, quantity) {
  //Alerte si la couleur n'est pas renseignée
  if (!color) {
    alert('Merci de sélectionner une couleur');
    return true;
  }

  //Alerte si la quantité n'est pas renseignée
  if (quantity < 1 || quantity > 100) {
    alert('Merci de sélectionner une quantité comprise entre 1 et 100');
    return true;
  }
}

//Fonction ajouter un produit dans le local storage
function addProductLocalStorage(optionsProducts, color) {
  // Récupération du panier dans le local storage, ou création d'un tableau vide
  let cart = JSON.parse(localStorage.getItem('product')) || [];

  // On fait une boucle sur les produits dans le panier pour voir si le produit ajouté est déjà présent
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == optionsProducts.id && cart[i].color == color) {
      // Si le produit est déjà présent, on met à jour la quantité
      cart[i].quantity = Math.min(
        cart[i].quantity + optionsProducts.quantity,
        100
      );
      localStorage.setItem('product', JSON.stringify(cart));
      return popUpConfirmation();
    }
  }

  // Si le produit n'est pas présent, on l'ajoute au panier
  cart.push(optionsProducts);
  localStorage.setItem('product', JSON.stringify(cart));
  return popUpConfirmation();
}

//Fonction pop up pour aller au panier ou revenir à l'accueil
function popUpConfirmation() {
  if (
    window.confirm(`Votre produit a bien été ajouté au panier.
      Consultez le panier : OK ou revenir à l'accueil : ANNULER`)
  ) {
    window.location.href = 'cart.html';
  } else {
    window.location.href = 'index.html';
  }
}
