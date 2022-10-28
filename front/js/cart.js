/*Récupération du panier dans le localStorage*/
let cart = JSON.parse(localStorage.getItem("toAdd"));
/*Fonction asynchrone qui va créer un tableau des objets présent dans la panier donc dans le LS*/
async function addToBasket(){
    if(cart){
      let totalAmount = 0;
          /*Boucle pour aller récupérer tous les produits dans le LS*/
          for (let toAdd of cart){
            /*Création de la variable qui va regrouper les éléments récupérés dans le LS*/
            let productsOnCart = 
                  {
                  id : toAdd.id,
                  couleur: toAdd.couleur,
                  quantite: toAdd.quantite
                  }
              /*Récupération des données de l'API*/
              fetch('http://localhost:3000/api/products/' + productsOnCart.id)
                  .then(function(reponse) {
                        if (reponse.ok) {
                        return reponse.json();
                        }
                  })
                  .then(function(toAdd) {
                      /*Création des éléments du DOM en createElements*/
                      /*Lien avec la section #cart__items*/
                      const cartItems = document.getElementById('cart__items');

                      /*Création de la balise article*/
                      let cartArticle = document.createElement('article');
                      cartArticle.className = 'cart__item';
                      cartArticle.dataset.id = productsOnCart.id;
                      cartArticle.dataset.color = productsOnCart.couleur;
                      cartItems.appendChild(cartArticle);

                      /*Création de la balise div cart__item__img*/
                      let cartDivImg = document.createElement('div');
                      cartDivImg.className = 'cart__item__img';
                      cartArticle.appendChild(cartDivImg);

                      /*Création de la balise img*/
                      let cartImg = document.createElement('img');
                      cartImg.src = toAdd.imageUrl;
                      cartImg.alt = toAdd.altTxt;
                      cartDivImg.appendChild(cartImg);

                      /*Création de la balise div cart__item__content*/
                      let cartDivContent = document.createElement('div');
                      cartDivContent.className = 'cart__item__content';
                      cartArticle.appendChild(cartDivContent);

                      /*Création de la balise div cart__item__content_description*/
                      let cartDivContentDescription = document.createElement('div');
                      cartDivContentDescription.className = 'cart__item__content__description';
                      cartDivContent.appendChild(cartDivContentDescription);

                      /*Création de la balise h2*/
                      let cartDescriptionName = document.createElement('h2');
                      cartDescriptionName.innerText = toAdd.name;
                      cartDivContentDescription.appendChild(cartDescriptionName);

                      /*Création de la balise p couleur*/
                      let cartDescriptionPColor = document.createElement('p');
                      cartDescriptionPColor.innerText = productsOnCart.couleur;
                      cartDivContentDescription.appendChild(cartDescriptionPColor);

                      /*Création de la balise p prix*/
                      let cartDescriptionPPrice = document.createElement('p');
                      cartDescriptionPPrice.innerText = toAdd.price + " €";
                      cartDivContentDescription.appendChild(cartDescriptionPPrice);

                      /*Création de la balise div cart__item__content__settings*/
                      let cartDivContentSettings = document.createElement('div');
                      cartDivContentSettings.className = 'cart__item__content__settings';
                      cartDivContent.appendChild(cartDivContentSettings);

                      /*Création de la balise div cart__item__content__settings__quantity*/
                      let cartSettingsQuantity = document.createElement('div');
                      cartSettingsQuantity.className = 'cart__item__content__settings__quantity';
                      cartDivContentSettings.appendChild(cartSettingsQuantity);

                      /*Création de la balise p quantité*/
                      let cartSettingsQuantityP = document.createElement('p');
                      cartSettingsQuantityP.value = productsOnCart.quantite;        
                      cartSettingsQuantityP.innerText = "Qté : "
                      cartSettingsQuantity.appendChild(cartSettingsQuantityP);

                      /*Création de la balise input et de ses attributs*/
                      let cartInputQuantity = document.createElement('input');
                      cartInputQuantity.className ='itemQuantity';
                      cartInputQuantity.type = "number";
                      cartInputQuantity.name = "itemQuantity";
                      cartInputQuantity.min = 1 ;
                      cartInputQuantity.max = 100;
                      cartInputQuantity.value = productsOnCart.quantite;
                      cartSettingsQuantity.appendChild(cartInputQuantity);
                      /*Modifier la quantité d'un produit*/
                      /*Evenement de modification*/
                      cartInputQuantity.addEventListener("change", (m) => {
                          m.preventDefault();
                          /*Création de variables utilisées lors de la modification*/
                          /*Nous avons besoin de récupérer l'id et la couleur stockés dans le LS*/
                          let modifyId = productsOnCart.id;
                          let modifyCouleur = productsOnCart.couleur;
                          /*Nous allons rechercher avec la méthode find et comparer les id et les couleurs des objets modifiés*/
                          let modifyProduct = cart.find((p) => p.id == modifyId) && cart.find((p) => p.couleur == modifyCouleur);
                              if(modifyProduct){
                                  modifyProduct.quantite = Number(cartInputQuantity.value);
                                  localStorage.setItem("toAdd", JSON.stringify(cart));

                              } else {
                                  cart.push(toAdd);
                                  localStorage.setItem("toAdd", JSON.stringify(cart));
                              }
                          /*On joue la fonction de rechargement de la page*/
                          reload();
                      });
                      /*Création du bouton "supprimer"*/
                      /*Création de la div*/
                      let cartSettingsDelete = document.createElement('div');
                      cartSettingsDelete.className = 'cart__item__content__settings__delete';
                      cartDivContentSettings.appendChild(cartSettingsDelete);
                      /*Création du paragraphe*/
                      let cartSettingsDeleteP = document.createElement('p');
                      cartSettingsDeleteP.className = 'deleteItem';
                      cartSettingsDeleteP.innerText = "Supprimer";
                      cartSettingsDelete.appendChild(cartSettingsDeleteP);
                      /*Supprimer un produit contenu dans le local storage*/
                      /*On crée l'evenement de suppression au click sur le bouton supprimer*/
                      cartSettingsDeleteP.addEventListener("click", (e) => {
                          e.preventDefault();
                          /*On crée les variables utilisées lors de la suppression*/
                          let deleteId = productsOnCart.id;
                          let deleteCouleur = productsOnCart.couleur;
                          /*La méthode .filter permet d'aller rechercher les éléments précis que l'on veut supprimer en fonction de l'id et la couleur*/
                          /*le .remove est une fonction du localStorage pour supprimer un élément*/
                          let deleteItem = cart.filter (p => p.id != deleteId || p.couleur != deleteCouleur);
                          e.target.closest('.cart__item').remove();
                          /*On actualise le LS*/
                          localStorage.setItem("toAdd", JSON.stringify(deleteItem));
                          /*On joue la fonction d'actualisation de la page*/
                          reload();
                      });
                      /*On va calculer le prix total*/
                      let totalPrice = document.querySelector('#totalPrice');
                      totalAmount += cartInputQuantity.value * toAdd.price;
                      totalPrice.innerText = totalAmount;
                  });
          };     
    }
    else{
      alert("Le panier est vide")
    } 
};
/*On joue la fonction principale que l'on vient de créer*/
addToBasket();
/*Fonction pour actualiser la page actuelle*/
function reload (){
  document.location.reload()
};
/*Fonction pour calculer le prix total et les quantités totales*/
function calculTotals(){
  if(cart){
    let totalQuantity = cart;
    let totalProducts = document.querySelector('#totalQuantity');
    let totalItems = 0;
    for (let toAdd of totalQuantity){
        totalItems += Number(toAdd.quantite);
        }
  totalProducts.textContent = totalItems;
  } 
};
calculTotals();



/*************************************************          Mise en place des formulaires de contact      *********************************************************************/

/*Création des variables qui vont nous être utiles*/

/*Variables de regex*/
/*Adresse mail*/
const regexEmail = new RegExp ('^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$', 'g');
/*Adresse postale*/
const regexAddress = new RegExp (/^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/);
/*Nom, prénom et ville*/
const regexInfos = new RegExp ('^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{2,}$');

/*Variables pour les différents Input*/
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');

/*Variables pour les messages d'erreur*/
const firstNameErrorMessage = document.getElementById('firstNameErrorMsg');
const lastNameErrorMessage = document.getElementById('lastNameErrorMsg');
const addressErrorMessage = document.getElementById('addressErrorMsg');
const cityErrorMessage = document.getElementById('cityErrorMsg');
const emailErrorMessage = document.getElementById('emailErrorMsg');

/*Ecoute des modifications des champs du formulaire*/
/**********************************Email********************************************/

email.addEventListener("change", function(){
  validEmail(this);
})
/*Création de la fonction validEmail*/
let validEmail = function(inputEmail){
  /*On teste la regExp*/
  let testEmail = regexEmail.test(inputEmail.value);
  /*Si la regExp renvoie true*/
  if (testEmail){
      emailErrorMessage.innerText = "Adresse Email Valide";
  }
  /*Sinon si elle renvoie false*/
  else {
      emailErrorMessage.innerText = "Adresse Email invalide ";
  }
};
/**********************************Adresse********************************************/
address.addEventListener("change", function(){
  validAddress(this);
})
/*Création de la fonction validAdress*/
let validAddress = function(inputAddress){
  /*On teste la regExp*/
  let testAddress = regexAddress.test(inputAddress.value);
  /*Si la regExp renvoie true*/
  if (testAddress){
      addressErrorMessage.innerText = "Adresse valide";
  }
  /*Sinon si elle renvoie false*/
  else{
      addressErrorMessage.innerText = "Les symboles sont interdits"
  }
};
/*********************************Prénom**************************/
firstName.addEventListener("change", function(){
  validFirstName(this);
});
/*Création de la fonction validFirstName*/
let validFirstName = function(inputFirstName){
  /*On teste la regExp*/
  let testFirstName = regexInfos.test(inputFirstName.value);
  /*Si la regExp renvoie true*/
  if(testFirstName){
    firstNameErrorMessage.innerText = "Saisie valide";
  }
  /*Sinon si elle renvoie false*/
  else {
    firstNameErrorMessage.innerText = "Veuillez saisir au minimim 2 lettres. Les chiffres et les symboles sont interdits. ";
  }
};
/*********************************Nom******************************/
lastName.addEventListener("change", function(){
  validLastName(this);
})
/*Création de la fonction validLastName*/
let validLastName = function(inputLastName){
  /*On teste la regExp*/
  let testLastName = regexInfos.test(inputLastName.value);
  /*Si la regExp renvoie true*/
  if(testLastName){
    lastNameErrorMessage.innerText = "Saisie valide";
  }
  /*Sinon si elle renvoie false*/
  else {
    lastNameErrorMessage.innerText = "Veuillez saisir au minimim 2 lettres. Les chiffres et les symboles sont interdits. ";
  }
};
/********************************Ville*************************************/
city.addEventListener("change", function(){
  validCity(this);
})
/*Création de la fonction validLastName*/
let validCity = function(inputCity){
  /*On teste la regExp*/
  let testCity = regexInfos.test(inputCity.value);
  /*Si la regExp renvoie true*/
  if(testCity){
    cityErrorMessage.innerText = "Saisie valide";
  }
  /*Sinon si elle renvoie false*/
  else {
    cityErrorMessage.innerText = "Veuillez saisir au minimim 2 lettres. Les chiffres et les symboles sont interdits. ";
  }
};

/*************************************************************Envoi des informations ******************************/

/*On crée l'envoi des informations au click sur le bouton "Commander"*/
let orderButton = document.getElementById('order');

orderButton.addEventListener('click', (e) =>{
  e.preventDefault();
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;

    if(!cart){
      alert('Votre panier est vide')
    }
    else if (firstName ==="" || lastName ==="" || address ==="" ||city ==="" ||email ===""){
      alert("Veuillez renseigner tous les champs du formulaire");
    }
    else if (regexEmail(firstName.value) == false || regexAddress(Address.value) == false || regexInfos(FirstName.value) == false || regexInfos(LastName.value) == false ||regexInfos(City.value) == false)
      alert("Des erreurs dans vos saisies ont été détectées");
    else { 
      let cartArray = [];
        for ( let product of cart){
            cartArray.push(product.id)
        };    
            let myOrder ={
                contact : {
                  firstName : firstName,
                  lastName : lastName,
                  address : address,
                  city : city,
                  email : email
                  },
                products : cartArray    
            };
            console.log(myOrder);
            fetch('http://localhost:3000/api/products/order', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'  
                  },
                  body: JSON.stringify(myOrder)
            })
              .then((response) => response.json())
              .then((Data)=>{
                  document.location.href = "confirmation.html?orderId=" + Data.orderId;
              })
            
              .catch ((e) => alert("Nous avons rencontré un problème, veuillez réesayer ultérieurement"));    

    };
      
});
         
      
        

    

    
  








  


  




