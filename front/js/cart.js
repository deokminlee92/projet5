// Requète de l'API

fetch('http://localhost:3000/api/products')
  .then(function(reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
  .then(function(donnees) {
    // Exécution du code si le localStorage n'est pas vide
    if (localStorage.getItem("canapes") != null) {
      // Récupération du tableau créé dans product.html
      let ajoutCanape = JSON.parse(localStorage.getItem("canapes"));
      // Création du code html sous l'ID items pour afficher les canapés
      // Déclaration des variables
      let listeCanape = '';
      let canape = '';
      let prixTotal = [];

      for (canape of ajoutCanape) {
        listeCanape += `<article class="cart__item" data-id="${canape._id}" data-color="${canape.couleur}">`;
        listeCanape += '<div class="cart__item__img">';
        listeCanape += `<img src="${canape.image}" alt="${canape.altImage}">`;
        listeCanape += '<div class="cart__item__content"></div>';
        listeCanape += '<div class="cart__item__content__description">';
        listeCanape += `<h2>${canape.titre}</h2>`;
        listeCanape += `<p>${canape.couleur}</p>`;



        // Affichage du prix du canapé

        function prixCanapes () {
          let produitPrixQuantite = '';
          for (i = 0; i < donnees.length; i++) {
            // Recherche du prix du canapé dans l'API
            if (donnees[i]._id == canape._id) {
              prixCana = donnees[i].price;
              listeCanape += `<p>${prixCana.toFixed(2)} €</p>`;
              // Calcul du prix total en faisnat le produit de la quantité par le prix
              produitPrixQuantite = parseInt(donnees[i].price) * parseInt(canape.quantite);
              prixTotal.push(produitPrixQuantite);
            }
          }
        }
        prixCanapes()

        // Calcul de la somme des valeurs présentes dans le tableau "prixTotal" et injection du résultat dans le DOM
        function totalPrixCanapes () {
          const reducers = (accumulator, currentValue) => accumulator + currentValue;
          const totalPrix = prixTotal.reduce(reducers);
          document.querySelector('#totalPrice').innerHTML = totalPrix.toFixed(2);
        }

        totalPrixCanapes()
/*
        listeCanape += '</div>';
        listeCanape += '<div class="cart__item__content__settings"></div>'
        listeCanape += '<div class="cart__item__content__settings__quantity">'
        listeCanape += '<p>Qté : </p>';
        listeCanape += `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canape.quantite}">`;
        listeCanape += '</div>';
        listeCanape += '<div class="cart__item__content__settings__delete">';
        listeCanape += '<p class="deleteItem">Supprimer</p>';
        listeCanape += '</div>';
        listeCanape += '</div>';
        listeCanape += '</div>';
        listeCanape += '</article>';
 */

      // Injection du nouveau code html dans le DOM
      document.querySelector('#cart__items').innerHTML = listeCanape;
      // Création d'un tableau products contenant les id des produits dans le panier pour effectuer la requête POST sur l’API
      let products = [];
      for (i = 0; i < ajoutCanape.length; i++) {
        _id = ajoutCanape[i]._id;
        products.push(_id);
      }

      localStorage.setItem("products", JSON.stringify(products));
      // Supprimer un article du panier avec le bouton "Supprimer"
      function suppr() {
        let plusieursCanapes = [];
        // Sélection de tous les boutons "Supprimer"
        let supprimer = document.querySelectorAll(".deleteItem");
        // Sélection du bouton "Supprimé" cliqué
        supprimer.forEach((supprim) =>
        {
          supprim.addEventListener("click", () =>
          {
            // Recherche de la balise <article> ancètre la plus proche dans le DOM
            var idSupprim = supprim.closest("article");
            // Création d'une variable pour le calcul du nombre de types de canapés présents dans le tableau "ajoutCanape"
            let nombreTypeCanapes = ajoutCanape.length;
            // Si un seul type de canapé est présent dans le localStorage
            if (nombreTypeCanapes == 1) {
              // Suppression du localStorage "canapes"
              return (localStorage.removeItem("canapes")),
              // Actualisation de la page web
              location.reload()
            }
            // Création d'un filtre "cana" pour récupérer les canapés dont l'id ou la couleur sont différents du type de canapé à supprimer
            else {plusieursCanapes = ajoutCanape.filter((cana) =>
              {
                if (idSupprim.dataset.id != cana._id || idSupprim.dataset.color != cana.couleur) {
                  return true
                }
              });
            // Injection du résultat dans le localStorage et actualisation de la page web
            localStorage.setItem("canapes", JSON.stringify(plusieursCanapes));
            location.reload();
            }
          });
        });
      }
 
      suppr()

      // Supprimer un article du panier en mettant la quantité à zéro
      let supprimerZero = document.querySelectorAll(".itemQuantity");
      // Sélection de la zone de texte "Quantité" mise à "0"
      supprimerZero.forEach((supprimZero) =>
      {
        supprimZero.addEventListener("change", () =>
        {
          // Recherche de la balise <article> ancètre la plus proche dans le DOM
          var idSupprim = supprimZero.closest("article");
          // Création d'une variable pour le calcul du nombre de types de canapés présents dans le tableau "ajoutCanape"
          let nombreTypeCanapes = ajoutCanape.length;
          // Si la valeur saisie est "0" et qu'un seul type de canapé est présent dans le localStorage
          if (supprimZero.value == 0 && nombreTypeCanapes == 1) {
            // Suppession de la clé "canapes" du localStorage
            return (localStorage.removeItem("canapes")),
            // Actualisation de la page web
            location.reload()
          }
          // Création d'un filtre "cana" pour récupérer les canapés dont l'id ou la couleur sont différents du type de canapé mis à "0"
          else if (supprimZero.value == 0 && nombreTypeCanapes > 1) {
            plusieursCanapes = ajoutCanape.filter((cana) =>
            {
              if (idSupprim.dataset.id != cana._id || idSupprim.dataset.color != cana.couleur) {
                return true
              }
            });
          localStorage.setItem("canapes", JSON.stringify(plusieursCanapes));
          location.reload();
          }
          // Modifier la quantité en tapant une quantité différente
          else if (supprimZero.value > 0) {
            for (i = 0; i < ajoutCanape.length; i++) {
              if (idSupprim.dataset.id == ajoutCanape[i]._id && idSupprim.dataset.color == ajoutCanape[i].couleur) {
              ajoutCanape[i].quantite = parseInt(supprimZero.value);
                if(ajoutCanape[i].quantite <= 0 || ajoutCanape[i].quantite >= 101) {
                  alert("Veuillez entrer une valeur minimum 1 et maximum 100");
                  return false;
                }
              localStorage.setItem("canapes", JSON.stringify(ajoutCanape));
              location.reload();
              }
            }
          }
        });
      });

      // Calcul de la quantité totale d'articles présents dans le panier
      let totalArticles = [];
      for (i = 0; i < ajoutCanape.length; i++) {
        let totalCanapes = ajoutCanape[i].quantite;
        totalArticles.push(totalCanapes);
      }
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const totalCanap = totalArticles.reduce(reducer);
    }
  }
});

        // Injection du nouveau code html "quantité totale d'articles" dans le DOM