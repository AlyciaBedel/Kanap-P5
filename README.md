# Projet 5 : Kanap
Cinquième projet du parcours "Développeur web" chez OpenClassroom. L'objectif est de construire un site e-commerce avec Javascript grâce à une API. L'API est la partie front-end a été fourni au préalable. 

<img src="https://user-images.githubusercontent.com/98737248/217803620-fb07e1d0-22b2-4d04-901d-1601576d5b71.svg" style="height:35px;"> [![forthebadge](https://forthebadge.com/images/badges/powered-by-coffee.svg)](https://forthebadge.com)

![banniere](https://user-images.githubusercontent.com/98737248/217804745-d344d603-713d-45b2-b9e6-42790502552e.png)

## Qui est Kanap ?
Kanap est une marque de canapés qui vend ses produits depuis sa boutique exclusivement. Aujourd’hui, celle-ci souhaiterait avoir une plateforme de e-commerce en plus de sa boutique physique pour vendre ses produits sur Internet.

## Objectifs
1. Unifier les travaux déjà réalisés (Back-End et Front-End) en intégrant dynamiquement les éléments de l'API dans les différentes pages web avec JavaScript.
2. Mettre en place un plan de test d'acceptation.

## Architecture et informations générales
### Page d'accueil
La page d’accueil affiche de manière dynamique tous les produits disponibles à la vente retournés par l’API. Pour chaque produit, on affiche l’image de celui-ci, ainsi que son nom et le début de sa description. En cliquant sur le produit, l’utilisateur sera redirigé sur la page du produit pour consulter
celui-ci plus en détail.

### Page produit
Cette page s'affiche de manière dynamique avec les détails du produit sur lequel l'utilisateur a cliqué depuis la page d'accueil. La page présente un seul produit ; elle possède un menu déroulant permettant à l'utilisateur de choisir une option de personnalisation pour la couleur, ainsi qu’un input pour saisir la quantité. L'utilisateur peut ajouter le produit à son panier et les éléments sont pris en compte dans le panier.

### Page panier
Sur cette page, on va retrouver un résumé des produits dans le panier, le prix total et la possibilité de modifier la quantité d’un produit sélectionné ou bien de supprimer celui-ci. Un formulaire permettant de passer une commande. Les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end. Lorsque l’utilisateur va modifier la quantité d’un produit dans son panier, le total du panier devra se mettre à jour.
L’utilisateur aura la possibilité de supprimer un produit de son panier, le produit devra disparaître de la page. Les inputs des utilisateurs doivent être analysés et validés pour vérifier le format et le type de données avant l’envoi à l’API. En cas de problème de saisie, un message d’erreur va s'afficher en dessous du champ correspondant. On ne stockera pas le prix des articles en local. 

### Page de confirmation
Un message de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant l'identifiant de commande envoyé par l’API. L'utilisateur voit alors s’afficher son numéro de commande. Il faut veiller à ce que ce numéro ne soit stocké nulle part.

## Planification de tests
Un tests d'acceptation a été réalisé sur les différentes pages en couvrant l’ensemble des fonctionnalités listées dans le document <a href="https://github.com/AlyciaBedel/Kanap-P5/files/10697217/DW%2BP5%2B-%2BSpecifications%2Bfonctionnelles.pdf">(spécifications fonctionnelles et techniques Kanap)</a>.

<a href="https://github.com/AlyciaBedel/Kanap-P5/files/10697213/Bedel_Alycia_2_plan_test_012023.pdf">Voir le tests d'acceptation</a> 

## Installation du projet
`Node` et `npm` doivent être installés localement sur votre machine.\
Installez toutes les dépendances avec npm.

Ouvrez le répertoire `back` depuis le terminal :
```terminal
npm install
```

Pour lancer le server :
```terminal
node server
```

