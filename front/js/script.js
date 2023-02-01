// Récupération des produits avec l'API
let output = '';

let response = fetch('http://localhost:3000/api/products')
  .then((res) => res.json())
  .then((data) => renderProducts(data))
  .catch((error) => {
    console.log('Je suis une erreur de la requête GET', error);
  });

const productsList = document.getElementById('items');

// Affichage des produits
const renderProducts = (data) => {
  data.forEach((product) => {
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
