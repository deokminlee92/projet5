// Requète de l'API

fetch('http://localhost:3000/api/products')

    .then(function(reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
/*Paramètre : données */
  .then(function(donnees) {
    // Récupération de l'ID dans l'url
    let urlcourante = document.location.href;
    let url = new URL(urlcourante);
    let id = url.searchParams.get("id");
    /*Déclaration imageCanape sans valeur */
    let imageCanape = ''

    // Création des variables prix, titre, description, image, altImage
    // Parametre "creationVariables" , parcourir le tableau donnees
    function creationVariables () {
      for (let canape of donnees) {
        if (canape._id == id) {
            prix = canape.price;
            titre = canape.name;
            description = canape.description;
            image = canape.imageUrl;
            altImage = canape.altTxt;
          // Création du lien vers l'image du canapé
            imageCanape += `<img src="${image}" alt="${altImage}">`;

          // Fonction ajout des couleurs dans le menu déroulant des couleurs du canapé
    function couleursCanape() {
        //Récupération des couleurs 
        let colorMenuBar=document.getElementById("colors");
        //Parcourir les couleurs dans le tableau canape.colors
        for (let couleur of canape.colors) {
        //Méthode, Création nouvel élément "option" dans product.html
            let colorList=document.createElement('option');
        //Ajout un nouvel attribut nommé "value" et la valeur "couleur"// 
            colorList.setAttribute("value", couleur);
            colorList.innerHTML=couleur;
        //Méthode , ajout un noeud
            colorMenuBar.appendChild(colorList);
                    }
                }
            couleursCanape();
            }
        }
    }
            creationVariables()

    // Fonction injection du nouveau code html dans le DOM
    function htmlInfosCanape() {
    // id .item__img --> imageCanape , querySelector : Recherche le propriété id 
      document.querySelector(".item__img").innerHTML = imageCanape;
      document.querySelector('#title').innerHTML = titre;
    //toFixed : 3번째 값을 반올림해서 두번째 자리 수 까지만 표기
      document.querySelector('#price').innerHTML = prix.toFixed(2);
      document.querySelector('#description').innerHTML = description;
    }
    htmlInfosCanape();

    // Exécution du code au clic sur le bouton "Ajouter au panier"
    // onClick 을 통해서 함수 안 값을 불러옴
    document.getElementById("addToCart").onclick = function () {
      // Création des variables pour la quantité de canapés et la couleur choisie
        let selectCouleur = document.getElementById("colors");
        let couleurSelectionnee = selectCouleur.options[selectCouleur.selectedIndex].text;
        const quantiteSelectionnee = document.getElementById("quantity").value;
        
      // Création d'un objet pour injection dans le localStorage clé "canapes"
        let optionsCanape = {
            _id: id,
            couleur: couleurSelectionnee,
            quantite: parseInt(quantiteSelectionnee),
            titre,
            description,
            image,
            altImage
        };



      // Local storage
      // stockage de l'id, de la couleur, de la quantité de canapés, du titre, de la description, de l'url de l'image et de l'altImage
      // JSON.parse pour convertir les données au format JSON en objet javascript
        let canapeDansLocalstorage = JSON.parse(localStorage.getItem("canapes"));

      // Message d'erreur si la quantité est inférieure à 1 ou supéreure à 100
        if(quantiteSelectionnee <= 0 || quantiteSelectionnee >= 101) {
            alert("Veuillez entrer une valeur minimum 1 et maximum 100");
     // return false : permet de ne pas fonctionner l'action ajouter un article
            return false;
        }

        // Message d'erreur si la couleur n'est pas sélectionnée
        if(couleurSelectionnee == "--SVP, choisissez une couleur --") {
            alert("Veuillez sélectionner une couleur dans ce menu déroulant");
            return false;
        }

      //Fenêtre qui confirme l'ajout des canapés dans le panier et qui permet de se rendre sur la page d'accueil en cliquant sur "Annuler" ou d'aller au panier en cliquant sur "OK"
        //arrow function , {} 안에 있는 expression 을 반환한다.
        const validation = () => {
            if(window.confirm( `${quantiteSelectionnee} ${titre} ${couleurSelectionnee} a bien été ajouté au panier.
            Pour consulter le panier, appuyez sur OK sinon appuyez sur ANNULER pour revenir à l'accueil et continuer vos achats.`)){
            window.location.href = "cart.html";
            }else{
            window.location.href = "index.html";
            }
        }
      // Si aucun produit n'est présent dans localstorage
      // Si le LS est vide, {} 가 작동 ,
        if (canapeDansLocalstorage == null) {
            // [] 값은 배열에 아무 것도 없음을 의미
            canapeDansLocalstorage = [];
            //Méthode , .push permet d'ajouter l'élément "optionsCanape" 
            canapeDansLocalstorage.push(optionsCanape);
            // JSON.stringify permet de convertir des données de chaîne de caractère en chiffre js
            localStorage.setItem("canapes", JSON.stringify(canapeDansLocalstorage));
            validation()
        }
      // Si des produits sont déjà présents dans localstorage
        else if (canapeDansLocalstorage != null) {
        // Dans LS, variable i qui sert de compteur pour le nb d'exécution de la boucle.
        // si une quantité variable i est déjà présente , i va faire un rôle de compteur
            for (i = 0; i < canapeDansLocalstorage.length; i++) {
            // Si des canapés ayant le même id et la même couleur sont déjà présent dans le localStorage
                if (canapeDansLocalstorage[i]._id == id && canapeDansLocalstorage[i].couleur == couleurSelectionnee) {
                    return(
                        canapeDansLocalstorage[i].quantite = parseInt(quantiteSelectionnee) + parseInt(canapeDansLocalstorage[i].quantite),
                        localStorage.setItem("canapes", JSON.stringify(canapeDansLocalstorage)),
                        validation()
                    )
                }
            }

            /*const totalCanapeAdd = 100;
            for (let i = 0; i < canapeDansLocalstorage.length; i++) {
                if(totalCanapeAdd < canapeDansLocalstorage[i]._id == id && canapeDansLocalstorage[i].couleur == couleurSelectionnee){
                    alert("non");
                    return false;
                }
            }*/

            // Si des canapés ayant le même id ou la même couleur ne sont pas présents dans le localStorage
            for (i = 0; i < canapeDansLocalstorage.length; i++) {
                if (canapeDansLocalstorage[i]._id != id || canapeDansLocalstorage[i].couleur != couleurSelectionnee) {
                    return(
                        canapeDansLocalstorage.push(optionsCanape),
                        localStorage.setItem("canapes", JSON.stringify(canapeDansLocalstorage)),
                        validation()
                    )
                }
            }  

            
        }
    }
})
.catch(err => console.log("Erreur : " + err));