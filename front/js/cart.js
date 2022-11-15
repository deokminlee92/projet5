
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

    
    //---------------------------------Fin du btn Supprimer-----------------------------------//

    //---------------------------------Manipuler la quantité-----------------------------------//

    /*Target HTML code 
/* <div class="cart__item__content__settings__quantity">
    <p>Qté : </p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
</div>*/

    // possibilite : Saisir 0 dans la quantité
    // méthode, Créer une variable qui retournera les éléments trouvés correspondant à ".itemQuantity"//
    let zeroQuantity = document.querySelectorAll(".itemQuantity");
    //utiliser forEach() pour exécuter une fonction ddonnée sur chaque élément du tableau//
    zeroQuantity.forEach((callbackZeroQuantity) => 
    {
        callbackZeroQuantity.addEventListener("change", () =>
        {
            //Déclarer une variable pour exécuter une recherche la balise parent <article>
            let rechercheIdToDelete = callbackZeroQuantity.closest("article");
            //créer une varible pour calculer un nombre de type de canapées présents dans le tableau produitDansLocalStorage //  
            let savedProductNumber = produitDansLocalStorage.length;
            //Si la valeur saisis est 0 et qu'un seul type de canapé est présent dans LS
            if(zeroQuantity.value == 0 && savedProductNumber == 1){
                //supression de la clé "canapé" du LS//
                return(localStorage.removeItem("canapes")),
                location.reload()
            }
            //si la valeur saisie est 0 mais plusieurs types de canapés sont présents dans LS
            else if(zeroQuantity.value == 0 && savedProductNumber > 1) {
                creatArrayMultiProducts = CreationNewProductId.filter((cana) =>
                {
                    if(rechercheIdToDelete.dataset.id != cana._id || rechercheIdToDelete.color != cana.couleur){
                        return true;
                    }
                });
                localStorage.setItem("canapes", JSON.stringify(creatArrayMultiProducts));
                location.reload();
            }
            // Modifier la quantité dans la case saisie//
            else if(callbackZeroQuantity.value > 0 ){
                for(i = 0; i < produitDansLocalStorage.length; i++ ){
                    if(rechercheIdToDelete.dataset.id == produitDansLocalStorage[i]._id && rechercheIdToDelete.dataset.color == produitDansLocalStorage[i].couleur){
                        produitDansLocalStorage.quantite = parseInt(callbackZeroQuantity.value);
                            if(produitDansLocalStorage[i].quantite <= 0  || produitDansLocalStorage[i].quantite < 100) {
                                alert("Veuillez entrer une valeur entre 1 et 100");
                                return false;
                            }
                                localStorage.setItem("canapes", JSON.stringify(produitDansLocalStorage));
                                location.reload();
                    }
                }
            }
        });
    });
//Utilisrer eventListener 'change'
/* elment.eventListener('change', function(){
handle change 
});

// input type, 
*/

    //calcul de la quantité totale d'articles présents dans le panier
    let totalArticlePresent = [];
    for(i=0; i < produitDansLocalStorage.length; i++){
        let totalNumberCanape = produitDansLocalStorage[i].quantite;
        totalArticlePresent.push(totalNumberCanape);

    }
    
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalCanapes = totalArticlePresent.reduce(reducer);
    document.querySelector('#totalQuantity').innerHTML = totalCanapes;
    console.log(totalCanapes);

    }

    // il faut modifier la fonction modification car elle ne fonctionne pas correctement//
    //---------------------------------Fin quantité-----------------------------------//

    //***************************Formulaire de commande***************************//

//Déclarer les variables de regex//
/* Nom & Prénom */
const regexFirstLastName = new RegExp (/^[a-z A-Zàâäéèêëïîôöùûüç-]{2,25}$/);
/*Adresse mail*/
const regexEmail = new RegExp ('^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$', 'g');
/*Adresse postale*/
const regexAddress = new RegExp (/^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/);
/*Nom, prénom et ville*/
const regexInfos = new RegExp ('^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{2,}$');


//1. on déclare les données du formulaire dans un objet//
    // dans ce formulaire, virgule ,, résultat = l'objet est bien dans la variable // 
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");

    // Déclarer des varaibles de message d'erreur + ajouter de la couleur du texte // 
let firstNameErrorMessage = document.getElementById("firstNameErrorMsg");
    firstNameErrorMessage.style.color = "red";
let lastNameErrorMessage = document.getElementById("lastNameErrorMsg");
    lastNameErrorMessage.style.color = "red";
let addressErrorMessage = document.getElementById("addressErrorMsg");
    addressErrorMessage.style.color = "red";
let cityErrorMessage = document.getElementById("cityErrorMsg");
    cityErrorMessage.style.color = "red";
let emailErrorMessage = document.getElementById("emailErrorMsg");
    emailErrorMessage.style.color = "red"

    // On déclare les values du formulaires dans un objet // 
let firsNameValue, lastNameValue, addressValue, cityValue, emailValue;

// 2. Contrôle de la validité  //

    // Prénom // 

// addEventListner type:input , function(défault "e") //  
firstName.addEventListener("input", function(e) {
    firsNameValue;
        // s'il n'y a pas de valeur dans input firsName, on rend le résultat null//
        // target , c'est une référence à l'objet qui a envoyé l'événement. e.target se réfère à l'élément input cliqué, il se déclenchera pour chaque input firstname clické//
        if(e.target.value.length === 0) {
            firsNameValue = null;
            console.log(firsNameValue)
        } else if (e.target.value.length < 2 || e.target.value.length > 25){
            firstNameErrorMessage.innerHTML = `entre 2-25`
            firsNameValue = null;
        }
        //Match : méthode, permet d'obtenir le tableau des correspondances entre la chaine courante et une expression rationnelle(regex)//
        if(e.target.value.match(regexFirstLastName)){
            firsNameValue = e.target.value;
            console.log("ok");
            console.log("firstNameValue");
        }
    });

})



/* -----------------------개념정리=--------------------------
//element.closet() : permettre de cibler le produit que vs souhaitez supprimer où dont vs souhaitez modifier la quantité 
//grâce à son identifiant et sa couleur//

//forEach() : méthode, permet d'exécuter une fonction donnée sur chaque élément du tableau//
//syntaxe : arr.forEach(callback); 
//syntaxe : arr.forEach(callback, thisArg);

*/
//element.addEventListener(event, handler); /





// page produit , panier , mettre en oeuvre quantité +100 // 
// modification quantité , +100 à bloquer
// regex,,, même si le fourmulaire est rempli,  si je n'ai pas de produit, bloquer la commande //
// message d'alerte à faire apparaître , 
// prénom , nom : lettre, espace , - , prénom composé et nom composé 
// adresse : on accepte tt
// ville : lettre
// email : type @xx.xxx
// s'il y a une case non remplie, alerte sera envoyé 
// 

//expliquer ce que c'est le plan de test , prendre un exemple pour montrer ,
// pourquoi j'ai codé comme ça ? , pourquoi pas d'autre moyens ?
// Comment présenter le P5, 
// rappel du contexte, montrer le site en direct , on montre catalogue, choisir un canap, choisir une couleur sans quantité en fait tt les possibilités ,
// envoi localstorage également tt les possibilités, (ex, au dessus de 100, )
// panier ( 2 lignes même canap avec 2 lignes diffé ) 
// modif, suppression
// champs de saisies alerte , alerte , si bien fonctionne , tt les possibilités de bloquer 
// une fois commandé, LS doit être vide
// plan de test à expliquer : à suivre l'ordre du fichier 
// Expliquer le code : script : remonter de catalogue , produit : surtout LS, , Panier : tt les functionalités , envoi du formulaire 
// si je fais PowerPoint : pour le code , à mettre l'accent sur les points 
// PW :si je le fais;  à mettre des mots clés ++ grands axes à expliquer
