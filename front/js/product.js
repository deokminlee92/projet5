/*Mise en place de URL Search Params pour récupérer l'id du produit correspondant*/
let params = new URL(window.location.href);
let id = params.searchParams.get('id');
let url = 'http://localhost:3000/api/products/' + id;


/*Fetch pour se connecter à l'API*/
fetch(url)
    .then(function(reponse) {
        if(reponse.ok){
            return reponse.json();
        }
    })

/*Fonction qui récupère les différentes caractéristiques des produits*/
    .then(function(product){

        let imgId = document.querySelector(".item__img")
        imgId.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`

        let items = document.getElementById('title');
        items.innerHTML = `${product.name}`

        let price = document.getElementById('price');
        price.innerHTML = `${product.price}`

        let description = document.getElementById('description');
        description.innerHTML = `{product.description}`

        let quantiteSelectionnee = document.getElementById('quantity').value;
        let colorOption = document.getElementById('color')

/*Boucle pour récupérer les listes de couleurs associées aux différents produits*/
        for(let color of product.colors){
            let colorOption = document.createElement('option');
            colorOption.value = color;
            colorOption.innerText = color;
            let colors = document.getElementById('colors');
            colors.appendChild(colorOption); 
        }

/*Création de la variable qui gère le bouton "ajouter au panier"*/
        let button = document.querySelector("#addToCart");

    //Création click//
        button.addEventListener('click', function(){
        /*Variable qui crée les objets à stocker dans le local Storage*/
                let optionsCanape = {
                    _id: id,
                    couleur: colorOption,
                    quantite: parseInt(quantiteSelectionnee),
                    items,
                    description,
                    imgId,
                  };
                
      // Local storage
      // stockage de l'id, de la couleur, de la quantité de canapés, du titre, de la description, de l'url de l'image et de l'altImage
      // JSON.parse pour convertir les données au format JSON en objet javascript
            let canapeDansLocalStorage = JSON.parse(localStorage.getItem("toAdd"));
        // Message d'erreur si la quantité est inférieure à 1 ou supéreure à 100
            if(quantiteSelectionnee <= 0 || quantiteSelectionnee >= 101){
                alert("Veuillez selectionner une quantité entre 1 et 100")
                return false;
            }
        // Message d'erreur si la couleur n'est pas sélectionnée
            if(colorOption == "--SVP, choisissez une couleur --" ){
                alert("Veuillez selectionner une couleur")
                return false;
            }
        //Fenêtre qui confirme l'ajout des canapés dans le panier et qui permet de se rendre sur la page d'accueil en cliquant sur "Annuler" ou d'aller au panier en cliquant sur "OK"
            validationChoix = () => {
                // (param1, param2, …, paramN) => { statements }
                //(param1, param2, …, paramN) => expression
                // 다음과 동일함:  => { return expression; }
                if(window.confirm(`toAdd:${items}, couleur:${colorOption}, quantité:${quantiteSelectionnee} ajouté au panier. Cliquer 'oui' pour diriger vers la page panier ou 'non' pour continuer vos achats`)){
                        window.location.href = "cart.html";
                }else{
                        window.location.href = "product.html";
                    }
                }
        // Si aucun produit n'est présent dans localstorage
                function getcanapeDansLocalStorage(){
                    if(canapeDansLocalStorage == null){
                    canapeDansLocalStorage = [];
                    //tester , ça veut dire que le panier est vide//
                    return []; 
                        }else{
                            return JSON.parse(canapeDansLocalStorage);
                                //si le tableau existe,//
                                //parse : localStorage n'est pas capable d'enregistrer des types complexes, il enregistre tout string 
                                //c pourquoi il fait les sérialiser (transofrmer en chaîne de caractère = JSON)
                        }
                    }
            }
    })
}
        