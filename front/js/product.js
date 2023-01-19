//Extraction de l'id dans l'url
const queryStringUrlId = window.location.search;
const urlSearchParams = new URLSearchParams(queryStringUrlId);
const id = urlSearchParams.get('id');

// Récupération des produits avec l'API
let response = fetch(`http://localhost:3000/api/products/${id}`)
  .then(res => res.json())
  .then((products) => {

    //Récupération des éléments HTML
    const imageProduct = document.getElementsByClassName("item__img");
    const titleProduct = document.getElementById("title");
    const descriptionProduct = document.getElementById("description");
    let priceProduct = document.getElementById("price");
    

    //Modification et intégration des éléments
    titleProduct.innerHTML = products.name;
    descriptionProduct.innerHTML = products.description;
    priceProduct.innerHTML = products.price;

    //Initialisation variable avec informations des images
    let text = "";
    text = text +`<img src="${products.imageUrl}"alt ="${products.altTxt}"></img>`;
    //On précise bien l'index [0] car c'est un selecteur class et non Id donc stocké dans un Array
    imageProduct[0].innerHTML = text;

      //Stockage des couleurs des produits
      const colors = products.colors;
      let valueColors = " ";
  
      //Récupération des couleurs avec l'API
      colors.forEach((colors) =>
      valueColors = valueColors + `<option value="${colors}">${colors}</option>`);
  
      //Intégration des couleurs dans le HTML
      const idColor = document.getElementById("colors");
      idColor.innerHTML = valueColors


  //Selectionner le bouton du panier
  const btnSendCart = document.querySelector("#addToCart");
  console.log(btnSendCart);

  //Ecouter le bouton et envoyer la panier
  btnSendCart.addEventListener("click",(e)=>{
    e.preventDefault();

    //Récupération de la quantité
    const idQuantity = document.getElementById("quantity");

    //Mettre le choix de l'utilisateur dans une variable
  const choiceColorForm = idColor.value;
  const choiceQuantityForm = idQuantity.value;

    //Récupération des valeurs du formulaire
  let optionsProducts = {
    id: products._id,
    name: products.name,
    image: products.imageUrl,
    optionProduct: choiceColorForm,
    quantite:choiceQuantityForm,
    price:products.price
  }
  console.log(optionsProducts);
  });

  })
  .catch(() => {
    let productsArticle = document.getElementsByClassName('item');
    productsArticle.innerHTML =
      "Nous n'avons pas réussi à afficher notre produit. Avez vous bien lancé le serveur local (Port 3000) ? <br>Si le problème persiste, contactez-nous.";
  })