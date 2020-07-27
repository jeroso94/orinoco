import euroConverter from './common';

let lienVersDetailProduit = "";
let referenceProduit = "";

//Page Selection - Construire l'affichage de la liste des produits
if (document.getElementsByTagName('title')[0].innerHTML == 'Orinoco - Sélection') {

    /* REQUETE API GET pour afficher la liste des produits
    -- DEBUT -- */

    fetch('http://localhost:3000/api/teddies')
        .then(function (response) {
            return response.json();
        })
        .then(function(listOfProducts){
            let listResult = document.getElementById('result');

            for (const value in listOfProducts) {
                listResult.innerHTML += "<div class='product'>"
                + "<img src=" + listOfProducts[value].imageUrl + " width=25% />"
                + "<p>Prénom: " + listOfProducts[value].name + " ("
                + "<a id='lienVersDetailProduit' href='/views/customize.html'>Détails...</a>)</p>"
                + "<p>Valeur: "+ euroConverter(listOfProducts[value].price) + "</p>"
                + "<p>Référence: "
                + "<span id='referenceProduit'>" + listOfProducts[value]._id + "</span></p>"
                + "</div>";
            }
        
            lienVersDetailProduit = document.getElementById('lienVersDetailProduit');
            referenceProduit = document.getElementById('referenceProduit');
            
            console.log (lienVersDetailProduit);
            console.log (referenceProduit);
            
            lienVersDetailProduit.addEventListener('click',function(event) {	
                localStorage.selectedProductId = referenceProduit.textContent;
                //event.preventDefault(); // Prevenir la réaction du navigateur par défaut
                event.stopPropagation(); // Stopper la propagation du clic aux éléments parents
            });	
        })
        .catch(function (err) {
            console.log("Quelque chose s'est mal passé durant le GET pour constituer la liste des produits !", err);
        });
    /* REQUETE API GET pour afficher la liste des produits
    -- FIN -- */
}


/*** MODULE A TRANSFERER dans fichier customize.js
-- DEBUT -- ***/

if (document.getElementsByTagName('title')[0].innerHTML == 'Orinoco - Produit') {

    let customizeResult = document.getElementById('customizeResult');
    
    const url = 'http://localhost:3000/api/teddies/' + localStorage.selectedProductId;
    console.log(url);

    /* REQUETE API GET pour afficher le détail du produit sélectionné
    -- DEBUT -- */

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function(selectedProduct){
            customizeResult.innerHTML += "<div class='product'>"
            + "<img src=" + selectedProduct.imageUrl + " width=25% />"
            
            + "<p> (Référence: " + selectedProduct._id + ")</p>"
            
            + "<div> Bonjour ! Je m'appelle " + selectedProduct.name + "</div>"
            + "<div> Voici mon histoire: " + selectedProduct.description + "</div>"
            + "<p> Tu peux m'adopter pour " + euroConverter(selectedProduct.price) + " !</p>"
            + "</div>";

            /* Gestion EVENEMENT - Liste déroulante CHOIX DU COLORIS PELUCHE
            -- DEBUT -- */
            const selectElement = document.querySelector('.selector');	
            for (const availableChoice in selectedProduct.colors) {
                console.log (selectedProduct.colors[availableChoice]);
                const newOption = document.createElement("option");
                selectElement.appendChild(newOption);
                newOption.setAttribute("value",selectedProduct.colors[availableChoice]);
                newOption.innerHTML += selectedProduct.colors[availableChoice];
            }
            
            selectElement.addEventListener('change', (event) => {
                const logTeddyColor = document.querySelector('.logTeddyColor');
                logTeddyColor.textContent = `Tu préfères le coloris "${event.target.value}"`;
                localStorage.selectedProductColor = `${event.target.value}`;
            });
            /* Gestion EVENEMENT - Liste déroulante CHOIX DU COLORIS PELUCHE
            -- FIN -- */
        })
        .catch(function (err) {
            console.log("Quelque chose s'est mal passé durant le GET !", err);
        });
    /* REQUETE API GET pour afficher le détail de l'article sélectionné
    -- FIN -- */


    /* Gestion EVENEMENT - Bouton AJOUTER AU PANIER
    -- DEBUT -- */
    const btnToAddInBasket = document.getElementById('toAddInBasket');
    btnToAddInBasket.addEventListener('click', updateBasket);
    
    function updateBasket(e) {
        console.log('Do you remember ! Article ajouter :p');
        
        let products = ['5be9c8541c9d440000665243','5beaa8bf1c9d440000a57d94'];    
        //products.push(selectedProductId);
            
        e.preventDefault();
        console.log(products);
        
    }
    /* Gestion EVENEMENT - Bouton AJOUTER AU PANIER
    -- FIN -- */
}
/*** MODULE A TRANSFERER dans fichier customize.js
-- FIN -- ***/