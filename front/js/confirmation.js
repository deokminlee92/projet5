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
    // un parametre va parcourir le tableau productInfo
        for(let canape of productInfo) {
            /*Si canape.id == id 일 경우  , on récupère les id/class dans product.html*/
            if (canape._id == id){
                titre = canape.name;
                prix = canape.price;
                image = canape.imageUrl;
                description = canape.description;
                altImage = canape.altTxt;
            // Création du lien pour récupérer l'image associée
                canapePicture = `<img src="${image}" alt="${altImage}">`;
            }
            // Fonction injection du nouveau code html dans le DOM
            function InjectionHtmlDom (){
                // id .item__img --> imageCanape , querySelector : Recherche le propriété id 
                //<div class="item__img">
                document.querySelector(".item__img").innerHTML = canapePicture;
                //<h1 id="title"><!-- Nom du produit --></h1>//
                document.querySelector("#title").innerHTML = titre;
                /*p id="description"><!-- Dis enim malesuada risus sapien gravida nulla nisl arcu. --></p>*/
                document.querySelector("#description").innerHTML = description;
                /*<p>Prix : <span id="price"><!-- 42 --></span>€</p>*/   
                //toFixed : 3번째 값을 반올림해서 두번째 자리 수 까지만 표기   
                document.querySelector("#price").innerHTML = prix.toFixed(2);
            }

            // Fonction ajout des couleurs dans le menu déroulant des couleurs du canapé
            function canapeColor (){
            //Récupération des couleurs 
                let colorListDropMenu = document.getElementById("colors");
            //Parcourir les couleurs dans le tableau canape.colors
                for ( let canapeColor of colors){
            //Méthode, Création nouvel élément "option" dans product.html
                    let canapeColorList = document.createElement("options");
                    //Ajout un nouvel attribut nommé "value" et la valeur "color"// 
                    /*<!--<option value="vert">vert</option>*/
                        canapeColorList.setAttribute("value", canapeColor);
                        canapeColorList.innerHTML = canapeColor;
                    //Méthode , ajout liste de couleurs
                        colorListDropMenu.appendChild('colorListDropMenu');
                }
            }
        }
    }
    // Exécution du code au clic sur le bouton "Ajouter au panier"
    // onClick 을 통해서 함수 안 값을 불러옴
        button.addEventListener('click', function(){
        // Création des variables pour la quantité de canapés et la couleur choisie
            let productSelected = {
                id : id,
                couleur : document.getElementById('colors').value,
                quantite :  document.getElementById('quantity').value,
            };
        // Création d'un objet pour injection dans le localStorage clé "canapes"
            let panier = JSON.parse(localStorage.getItem("toAdd"));

      // Local storage
      // stockage de l'id, de la couleur, de la quantité de canapés, du titre, de la description, de l'url de l'image et de l'altImage
      // JSON.parse pour convertir les données au format JSON en objet javascript

            function savePanier (){
            // Enregistrer le panier , le produit enregistré en objet dans localstorage sera seréalisé associé à une clé toAdd//
                localStorage.setItem("toAdd", JSON.stringify(savePanier));
                /*문법:     JSON.stringify(value[, replacer[, space]])
                value: JSON 문자열로 변환할 값
                replacer : 문자열화 동작 방식을 변경하는 함수 또는 JSON 문자열에 포함될 값 객체의 속성들을 선택하기 위한 화이트 리스트로 쓰이는 String 과 number객체들의 배열
                Space : String/Number 객체가 Number 라면 공백으로 사용되는 space의 수를 나타낸다.*/
            }

            function getPanier (){
                let savePanier = localStorage.getItem('toAdd');
                    if(savePanier == null){
                        return = [];
                    }else{
                        return JSON.parse(toAdd);
                //si le tableau existe,//
                //parse : localStorage n'est pas capable d'enregistrer des types complexes, il enregistre tout string 
                //c pourquoi il fait les sérialiser (transofrmer en chaîne de caractère = JSON)
                    }
            }
        })

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

.catch(err => console.log("Erreur : " + err));