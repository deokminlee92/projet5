/* instruction = statement , séparée par ; */
/* let,var,const : déclaration de variable , nom symbolique*/

// Requète de l'API

fetch('http://localhost:3000/api/products')

    .then(function(reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
/*Paramètre : données */
  .then(function(productInfo) {
    let urlcourante = document.location.href;
    let url = new URL(urlcourante)
    // Récupération de l'ID dans l'url
    let id = url.searchParams.get("id");
    /*Déclaration des images de produits sans valeur */
    let canapePicture = '';

    // Création des variables prix, titre, description, image, altImage
    /* function 함수이름 (매개변수1 2 3 ){
        함수가 호출 되었을 때 실행하고자 하는 실행문  ,  매개변수가 없어도 자동 할당하므로 ㄱㅊ
    } */
    function donnesVariable () {
    // parametre va parcourir le tableau productInfo
        for(let canape of productInfo) {
            /*Si canape.id == id  , on récupère les id/class dans product.html*/
            if (canape._id == id){
                titre = canape.name;
                prix = canape.price;
                image = canape.imageUrl;
                description = canape.description;
                altImage = canape.altTxt;

            // Création du lien pour récupérer l'image associée
                canapePicture = `<img src="${image}" alt="${altImage}">`;
                

            // Fonction ajout des couleurs dans le menu déroulant des couleurs du canapé
            function addingCanapeColorList (){
            //Récupération des couleurs 
                let colorListDropMenu = document.getElementById("colors");
            //Parcourir les couleurs dans le tableau canape.colors
                for (let couleur of canape.colors){
            //Méthode, Création nouvel élément "option" dans product.html
                    let canapeColorList=document.createElement('option');
                    //Ajout un nouvel attribut nommé "value" et la valeur "couleur"// 
                    /*<!--<option value="vert">vert</option>*/
                        canapeColorList.setAttribute("value", couleur);
                        canapeColorList.innerHTML = couleur;
                    //Méthode , ajout liste de couleurs
                        colorListDropMenu.appendChild(canapeColorList);
                        }
                    }
                    addingCanapeColorList ();
                }
            }
        }
    
    donnesVariable()

            // Fonction injection du nouveau code html dans le DOM
            function InjectionHtmlDom (){
                //<h1 id="title"><!-- Nom du produit --></h1>//
                document.querySelector('#title').innerHTML = titre;
                /*<p>Prix : <span id="price"><!-- 42 --></span>€</p>*/   
                //toFixed : 3번째 값을 반올림해서 두번째 자리 수 까지만 표기   
                document.querySelector('#price').innerHTML = prix.toFixed(2);
                // id .item__img --> imageCanape , querySelector : Recherche le propriété id 
                //<div class="item__img">
                document.querySelector(".item__img").innerHTML = canapePicture;
                /*p id="description"><!-- Dis enim malesuada risus sapien gravida nulla nisl arcu. --></p>*/
                document.querySelector('#description').innerHTML = description;

            }
            InjectionHtmlDom ();


    // Déclaration variable buttonClick qui permet de récupérer l'article ajouté au click 

        let buttonClick = document.getElementById("addToCart");
    // Click 을 통해서 함수 안 값을 불러옴
    buttonClick.addEventListener('click', () => {
        // Création des variables pour la quantité de canapés et la couleur choisie
        // 여기서 id,couleur,quantite 를 API 간단하게 불러올 수 있도록 미리 선작업을 쳐준 후 밑에서 
            let checkColor = document.getElementById('colors');
            let selectedColor = checkColor.options[checkColor.selectedIndex].text;
            const selectedQuantity = document.getElementById('quantity').value;

            let selectedCanapeOption ={
                _id : id,
                couleur : selectedColor,
                quantite : parseInt(selectedQuantity),
                titre,
                description,
                image,
                altImage,
            };
        // Créer une variable qui récupère le LS
            let panier = JSON.parse(localStorage.getItem("getAddedToCart"));

        //만약 색상 값을 선택하지 않았을 때 
            if (selectedCanapeOption.selectedColor === "") {
                alert("Veuillez selectionner une couleur");
                return false;
            }
        //만약 수량 값을 선택하지 않았을 때 
            if (selectedCanapeOption.selectedQuantity > 100 || selectedCanapeOption.selectedQuantity < 1 ) {
                alert("1-100 svp");
                return false;
            }

        // Message de confirmation , clic "oui" -> Paner, clic "non" -> page d'accueil
            let messageConfirmation = function(){
                if(window.confirm( `${selectedQuantity} ${titre} ${selectedColor} ajouté dans le panier.
                click "oui" pour continuer vos achat, "non" pour consulter votre panier`)){
                    window.location.href = "index.html";
                }else{
                    window.location.href = "cart.html";
                }
            }
            messageConfirmation();
        
        //On vérifie si le panier existe//
            if(panier){
                //Recherche des infos d'id et de couleur pour vérifier s'il y a déjà un produit identique dans le LS//
                let findProduct = panier.find( p => p.id == selectedCanapeOption.id && p.selectedColor == selectedCanapeOption.selectedColor);
                //S'il y en a, on incrémente la quantite
                if(findProduct){
                    let newAddedProduct = findProduct.selectedQuantity + selectedCanapeOption.selectedQuantity;
                    findProduct.selectedQuantity =newAddedProduct;
                    /*Envoyer les données au LS puis sérialiser les donnés */
                    localStorage.setItem("getAddedToCart", JSON.stringify(panier));
                    /*Messagde Ajout ok */
                    alert("ok ajouté");
                    /*Si on ajoute un nouveau produit */
                }else{ 
                    panier.push(selectedCanapeOption);
                    localStorage.setItem("getAddedToCart", JSON.parse(panier));
                }
            }


            // Enregistrer le panier , le produit enregistré en objet dans localstorage sera seréalisé associé à une clé toAdd//

                /*문법:     JSON.stringify(value[, replacer[, space]])
                value: JSON 문자열로 변환할 값
                replacer : 문자열화 동작 방식을 변경하는 함수 또는 JSON 문자열에 포함될 값 객체의 속성들을 선택하기 위한 화이트 리스트로 쓰이는 String 과 number객체들의 배열
                Space : String/Number 객체가 Number 라면 공백으로 사용되는 space의 수를 나타낸다.*/
            


                //si le tableau existe,//
                //parse : localStorage n'est pas capable d'enregistrer des types complexes, il enregistre tout string 
                //c pourquoi il fait les sérialiser (transofrmer en chaîne de caractère = JSON)

        });
})

        








        






      // Message d'erreur si la quantité est inférieure à 1 ou supéreure à 100

     // return false : permet de ne pas fonctionner l'action ajouter un article


        // Message d'erreur si la couleur n'est pas sélectionnée


      //Fenêtre qui confirme l'ajout des canapés dans le panier et qui permet de se rendre sur la page d'accueil en cliquant sur "Annuler" ou d'aller au panier en cliquant sur "OK"
        //arrow function , {} 안에 있는 expression 을 반환한다.

      // Si aucun produit n'est présent dans localstorage
      // Si le LS est vide, {} 가 작동 ,

            // [] 값은 배열에 아무 것도 없음을 의미

            //Méthode , .push permet d'ajouter l'élément "optionsCanape" 

            // JSON.stringify permet de convertir des données de chaîne de caractère en chiffre js

      // Si des produits sont déjà présents dans localstorage

        


        // Dans LS, variable i qui sert de compteur pour le nb d'exécution de la boucle.
        // si une quantité variable i est déjà présente , i va faire un rôle de compteur

            // Si des canapés ayant le même id et la même couleur sont déjà présent dans le localStorage

            /*//////////////const totalCanapeAdd = 100;
            for (let i = 0; i < canapeDansLocalstorage.length; i++) {
                if(totalCanapeAdd < canapeDansLocalstorage[i]._id == id && canapeDansLocalstorage[i].couleur == couleurSelectionnee){
                    alert("non");
                    return false;
                }
            }*/////////////////////////

            // Si des canapés ayant le même id ou la même couleur ne sont pas présents dans le localStorage
