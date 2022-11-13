
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
            let produitDansLocalStorage = JSON.parse(localStorage.getItem("canapes"));

    // Création du code html sous l'ID items pour afficher les canapés
    // Déclaration des variables
    let canapeList = '';
    let canape = '';
    let totalProductPrice = [];

    for(canape of produitDansLocalStorage){       
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

    // Injection du nouveau code html dans le DOM
    document.querySelector('#cart__items').innerHTML = canapeList;

    //---------------------------------Fun de l'affichage des produits du paneir-----------------------------------//


    // Création d'un tableau products contenant les id des produits dans le panier pour effectuer la requête POST sur l’API 
    let CreationNewProductId = [];
    for ( i = 0; i < produitDansLocalStorage.length; i++){
        _id = produitDansLocalStorage[i]._id;
        // on ajoute _id = productInfo[i]._id dans le tableau
        CreationNewProductId.push(_id);
    }
    // transformer en chaîne de caractère pour le rendre exploitable//
    localStorage.setItem("CreationNewProductId", JSON.stringify(CreationNewProductId));

//---------------------------------Création du btn Supprimer-----------------------------------//

function deleteProductDansPanier (){
    let creatArrayMultiProducts = [];
    
    let getAllDeleteBtn = document.querySelectorAll(".deleteItem");

    //callback "supprim"//
    getAllDeleteBtn.forEach((callbackDelete) =>
            {
                callbackDelete.addEventListener("click", ()=>
                {
                    //.closest : méthode , recherche les parents plus proches // 
                    let findProductToDeleteUnderArticle = callbackDelete.closest("article");
                    //Renommer les produits dans LS "savedProductinLocalStorage"//
                    let savedProductinLocalStorage = produitDansLocalStorage.length;
                    //Si la quantité du produit dans le Panier est 1, on supprime le produit du Panier // 
                    if(savedProductinLocalStorage == 1) {
                        //removeItem() : méthode, méthode de l'interface Storage, on lui passe une clé en argument, la méthode va supprimer la ressource avec le nom de clé correspondant du storage.//
                        return(localStorage.removeItem("canapes")),
                        //méthode, recharge la ressource depuis l'URL actuelle//
                        location.reload()
                    }
                        // filter() : méthode, crée et retourne un nouveau tableau contenant ts les éléments du tableau d'origine qui remplissent une condition déterminée par la fonction callback
                        // callback : callbackCanape
                        // si plusieurs produits sont présents dans le panier, on utilise la méthode filter(),
                        else{creatArrayMultiProducts = produitDansLocalStorage.filter((callbackCanape) =>
                            {
                                //data- : attribut data- forme une classe d'attribut de données, ça permet d'échanger des données propriétaire entre le HTML et la représentation du DOM//
                                //dataset : propriété en lecture seule rattachée à l'interface HTML fournit un accès en lecture/écrirture aux attributs data- de l'élement. //
                                // utilisation : dataset.propriete , ex) dataset.id  
                                //Si l'élément à supprimer ne correspondant pas à _id ou 
                                if(findProductToDeleteUnderArticle.dataset.id != callbackCanape._id  || findProductToDeleteUnderArticle.dataset.color != callbackCanape.couleur){
                                    return true
                                }
                            });
                            localStorage.setItem("canapes", JSON.stringify(creatArrayMultiProducts));
                            location.reload()
                        }
                })
            })
        }
        deleteProductDansPanier()
    }
})

/* -----------------------개념정리=--------------------------
//element.closet() : permettre de cibler le produit que vs souhaitez supprimer où dont vs souhaitez modifier la quantité 
//grâce à son identifiant et sa couleur//

//forEach() : méthode, permet d'exécuter une fonction donnée sur chaque élément du tableau//
//syntaxe : arr.forEach(callback); 
//syntaxe : arr.forEach(callback, thisArg);

*/
//element.addEventListener(event, handler); /







