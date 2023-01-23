// Récupération des produits avec l'API
let output = '';

let response = fetch('http://localhost:3000/api/products')
  .then((res) => res.json())
  .then((data) => renderProducts(data))
  .catch((error) => {
    let productsList = document.getElementById('items');
    productsList.innerHTML =
      "Nous n'avons pas réussi à afficher nos produits. Avez vous bien lancé le serveur local (Port 3000) ? <br>Si le problème persiste, contactez-nous.";
  });

// Affichage des produits
const productsList = document.getElementById('items');

const renderProducts = (products) => {
  products.forEach((product) => {
    output += `
         <a href="./product.html?id=${product._id}">
         <article>
           <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
           <p class="productDescription">${product.description}</p>
         </article>
       </a>
        `;
  });
  productsList.innerHTML = output;
};
