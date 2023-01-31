//Appel des différentes fonctions
const orderId = getOrderId();
displayOrderId(orderId);
removeAllCache();

//Fonction qui extrait orderId dans l'url
function getOrderId() {
  const queryStringUrlOrderId = window.location.search;
  const urlSearchParams = new URLSearchParams(queryStringUrlOrderId);
  return urlSearchParams.get('orderId');
}

//Function qui affiche le numéro de commande
function displayOrderId(orderId) {
  const orderIdElement = document.getElementById('orderId');
  orderIdElement.textContent = orderId;
}

//Function qui vide le panier après confirmation
function removeAllCache() {
  const cache = window.localStorage;
  cache.clear();
}
