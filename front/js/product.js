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

        
    // Click 을 통해서 함수 안 값을 불러옴
    document.getElementById("addToCart").onclick = function() {
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
            let panierLocalStorage = JSON.parse(localStorage.getItem("getAddedToCart"));

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
                if(window.confirm( `${selectedQuantity} ${titre} ${selectedColor} ajouté dans le panierLocalStorage.
                click "oui" pour continuer vos achat, "non" pour consulter votre panierLocalStorage`)){
                    window.location.href = "index.html";
                }else{
                    window.location.href = "cart.html";
                }
            }
        
        //si le LS est vide, []
            if (panierLocalStorage == null){
                panierLocalStorage = [];
                panierLocalStorage.push(selectedCanapeOption);
                localStorage.setItem("getAddedToCart", JSON.stringify(panierLocalStorage));
                messageConfirmation();
            }
        
        //On vérifie si le panierLocalStorage existe//
            else if(panierLocalStorage != null){
            //Recherche des infos d'id et de couleur pour vérifier s'il y a déjà un produit identique dans le LS//
            let findProduct = panierLocalStorage.find( p => p.id == selectedCanapeOption.id && p.selectedColor == selectedCanapeOption.selectedColor);
            //S'il y en a, on incrémente la quantite
            if(findProduct){
                let newAddedProduct = findProduct.selectedQuantity + selectedCanapeOption.selectedQuantity;
                findProduct.selectedQuantity =newAddedProduct;
                /*Envoyer les données au LS puis sérialiser les donnés */
                localStorage.setItem("getAddedToCart", JSON.stringify(panierLocalStorage));
                /*Messagde Ajout ok */
                alert("ok ajouté");
                /*Si on ajoute un nouveau produit */
                }else{
                    panierLocalStorage = [];
                    panierLocalStorage.push(selectedCanapeOption);
                    localStorage.setItem("getAddedToCart", JSON.parse(panierLocalStorage)); 
                }
            }
        }
    });
