//● Depuis la page Panier, récupérer le panier (l’array) via localStorage.
//● Parcourir l’array.
//● Créer et insérer des éléments dans la page Panier.
// !!!!Attention de ne pas dupliquer inutilement les éléments dans le
// tableau récapitulatif (le panier). S’il y a plusieurs produits identiques
// (même id + même couleur), cela ne doit donner lieu qu’à une seule
// ligne dans le tableau.

//Requête API//
fetch('http://localhost:3000/api/products/')
    .then(function(reponse) {
        if (reponse.ok) {
        return reponse.json();
        }
    })

    .then(function(productInfo){
        // Exécution du code si le localStorage n'est pas vide
        if (localStorage.getItem("canapes") != null) {
        // Récupération du tableau créé dans product.html
            let recupererDonnees = JSON.parse(localStorage.getItem("canapes"));

    // Création du code html sous l'ID items pour afficher les canapés
    // Déclaration des variables
    let canapeList = '';
    let canape = '';
    let totalProductPrice = [];

    for(canape of recupererDonnees){
        canapeList += `<article class="cart__item" data-id="${canape._id}" data-color="${canape.couleur}">  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
          <img src="${canape.image}" alt="${canape.altImage}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${canape.titre}</h2>
            <p>${canape.couleur}</p>
            </div>`

    // Affichage du prix du canapé //
    function priceCanape (){
        let priceCanapeEach = '';
            for(i=0; 1<productInfo.lenght; i++){
            // Recherche du prix du canapé dans l'API
            if(productInfo[i].id === canape.id){
                costCanape = productInfo[i].price;
                canapeList += `<p>${costCanape.toFixed(2)}</p>`
            // Calcul du prix total en faisnat le produit de la quantité par le prix
            priceAndQuantity = parseInt(productInfo[i].price) * parseInt(canape.quantite);
            totalProductPrice.push(priceAndQuantity);
                }
            }
        }
            priceCanape ()

        // Calcul de la somme des valeurs présentes dans le tableau "prixTotal" et injection du résultat dans le DOM


        
        // Injection du nouveau code html dans le DOM
        // Création d'un tableau products contenant les id des produits dans le panier pour effectuer la requête POST sur l’API




            /*`<div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article> `*/
        }
    }        
})




