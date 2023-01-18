//Extraire l'id de l'url
const queryStringUrlId = window.location.search;
const urlSearchParams = new URLSearchParams(queryStringUrlId);
const id = urlSearchParams.get('id');


// Récupération des produits avec l'API
let response = fetch(`http://localhost:3000/api/products/${id}`)
  .then(res => res.json())
  .then((products) => {

    //Récupération des éléments à modifier
    const imageProduct = document.getElementsByClassName("item__img");
    const titleProduct = document.getElementById("title");
    const descriptionProduct = document.getElementById("description");
    let priceProduct = document.getElementById("price");
    

    //Modification dans le HTML
    titleProduct.innerHTML = products.name;
    descriptionProduct.innerHTML = products.description;
    priceProduct.innerHTML = products.price;

    //Initialisation variable avec informations des images
    let text = "";
    text = text +`<img src="${products.imageUrl}"alt ="${products.altTxt}"></img>`;
    //On précise bien l'index [0] car c'est un selecteur class et non Id donc stocké dans un Array
    imageProduct[0].innerHTML = text;
    
  })
  .catch((error) => {
    let productsArticle = document.getElementsByClassName('item');
    productsArticle.innerHTML =
      "Nous n'avons pas réussi à afficher notre produit. Avez vous bien lancé le serveur local (Port 3000) ? <br>Si le problème persiste, contactez-nous.";
  })