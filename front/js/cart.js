
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
        canapeList += `<article class="cart__item" data-id="${canape._id}" data-color="${canape.couleur}">`;
        canapeList += '<div class="cart__item__img">';
        canapeList += `<img src="${canape.image}" alt="${canape.altImage}">`;
        canapeList += '</div>';
        canapeList += '<div class="cart__item__content">';
        canapeList += '<div class="cart__item__content__description">';
        canapeList += `<h2>${canape.titre}</h2>`;
        canapeList += `<p>${canape.couleur}</p>`;        

    // Affichage du prix du canapé //
    // Créer une variable pour créer un tableau vide // 


    function affichagePriceCanape (){
        // Déclarer une variable 
        let priceCanapeEach = '';
            // Recherche du prix du canapé dans l'API//
            for( i = 0; i < productInfo.length; i++){
            // Recherche le même produit id dans //
            if(productInfo[i]._id === canape._id){
                //Créer une variable pour injecter le prix du canape correspondant//
                costCanape = productInfo[i].price;
                //Créer une variable pour injecter le prix//
                canapeList += `<p>${costCanape.toFixed(2)}€</p>`
                // Calcul du prix total en faisant le produit de la quantité par le prix//
                //parseInt= transformer unechaîne de caractère en chiffre//
                priceCanapeEach = parseInt(productInfo[i].price) * parseInt(canape.quantite);
                totalProductPrice.push(priceCanapeEach);
                    }
                }
            }
        affichagePriceCanape ()

        // Calcul de la somme des valeurs présentes dans le tableau "prixTotal" et injection du résultat dans le DOM
    function totalPriceCanape (){
        //Aller chercher les prix dans le panier//
        //méthode Reduce : calculer le prix cumulée
        //accumulator : prix cumulé , currentValue : nouveau prix ajouté
        const reducer = (accumulator , currentValue) =>  accumulator + currentValue ;
        //reduce = méthode, prix total cumulé de tous les produits ajouté, parameter : accumulatedTotalPRice //
        let getAccumulatedTotalPrice = totalProductPrice.reduce(reducer);
        // injection du prix //
        document.querySelector('#totalPrice').innerHTML = getAccumulatedTotalPrice;
    }
        totalPriceCanape ()


        canapeList += '</div>';
        canapeList += '<div class="cart__item__content__settings"></div>';
        canapeList += '<div class="cart__item__content__settings__quantity">';
        canapeList += '<p>Qté : </p>';
        canapeList += `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canape.quantite}">`;
        canapeList += '</div>';
        canapeList += '<div class="cart__item__content__settings__delete">';
        canapeList += '<p class="deleteItem">Supprimer</p>';
        canapeList += '</div>';
        canapeList += '</div>';
        canapeList += '</div>';
        canapeList += '</article>';
        }



    //---------------------------------Fun de l'affichage des produits du paneir-----------------------------------//

    // Injection du nouveau code html dans le DOM
    document.querySelector('#cart__items').innerHTML = canapeList;

/*
    // Création d'un tableau products contenant les id des produits dans le panier pour effectuer la requête POST sur l’API 
    let getProductId = [];
    for ( i = 0; i < productInfo.length; i++){
        _id = productInfo[i]._id;
        // on ajoute _id = productInfo[i]._id dans le tableau
        getProductId.push(_id);
    }
    // transformer en chaîne de caractère pour le rendre exploitable//
    localStorage.setItem("getProductId", JSON.stringify(getProductId));

        //---------------------------------Création du btn Supprimer-----------------------------------//

    //sélection des références de tous les btn //
    let getAllDeleteBtn = document.querySelectorAll(".deleteItem");
    //insertion du btn dans le HTML du panier // 
    for (let i = 0; i < getAllDeleteBtn.length; i++){
        getAllDeleteBtn[i].addEventListener("click", (event) =>{
            event.preventDefault();  
        //selection de l'id du produit qui va être supprimer en cliquant "deletItem", Etant donnée qu'il y a des infos diff, boucle for//
        let deleteSelectedId = productInfo[i]._id;

        //avec la méthode filter je sélectionne les éléments à garder et je supprime l'élément où le btn suppr a été cliqué//
        productInfo = productInfo.filter( el => el._id !== deleteSelectedId);

        //on envoie la variable dans LS

        })
    }

/* -----------------------개념정리=--------------------------
//element.closet() : permettre de cibler le produit que vs souhaitez supprimer où dont vs souhaitez modifier la quantité 
//grâce à son identifiant et sa couleur//

//forEach() : méthode, permet d'exécuter une fonction donnée sur chaque élément du tableau//
//syntaxe : arr.forEach(callback); 
//syntaxe : arr.forEach(callback, thisArg);

*/
//element.addEventListener(event, handler); /


    }        
})






