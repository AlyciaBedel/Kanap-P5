# Projet 5 : Kanap
Cinquième projet du parcours "Développeur web" chez OpenClassroom. L'objectif est de construire un site e-commerce avec Javascript grâce à une API. L'API est la partie front-end a été fourni au préalable. 

<img src="https://user-images.githubusercontent.com/98737248/217803620-fb07e1d0-22b2-4d04-901d-1601576d5b71.svg" style="height:35px;"> [![forthebadge](https://forthebadge.com/images/badges/powered-by-coffee.svg)](https://forthebadge.com)

![banniere](https://user-images.githubusercontent.com/98737248/217804745-d344d603-713d-45b2-b9e6-42790502552e.png)

## Qui est Kanap ?
Kanap est une marque de canapés qui vend ses produits depuis sa boutique exclusivement. Aujourd’hui, celle-ci souhaiterait avoir une plateforme de e-commerce en plus de sa boutique physique pour vendre ses produits sur Internet.

## Objectifs
- Unifier les travaux déjà réalisés (Back-End et Front-End) en intégrant dynamiquement les éléments de l'API dans les différentes pages web avec JavaScript.
- Mettre en place un plan de test d'acceptation.

## Architecture générale
### Page d'accueil
Une page d’accueil montrant de manière dynamique tous les articles disponibles à la vente.

### Page produit
La page produit affiche de manière dynamique les détails du produit sur lequel l'utilisateur a cliqué depuis la page d’accueil. Depuis cette page, l’utilisateur peut sélectionner une quantité, une couleur, et ajouter le produit à son panier.

### Page panier
Celle-ci contient plusieurs parties :
○ Un résumé des produits dans le panier, le prix total et la possibilité de modifier la quantité d’un produit sélectionné ou bien de supprimer celui-ci.
○ Un formulaire permettant de passer une commande. Les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end. 

### Page de confirmation
Un message de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant l'identifiant de commande envoyé par l’API.
