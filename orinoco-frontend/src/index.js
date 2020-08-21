import euroConverter from './common';
import userInputsChecking from './secure';

class Contact {
    constructor (firstname, lastname, address, city, email) {	
    this.firstname = firstname;	
    this.lastname = lastname;	
    this.address = address;
    this.city = city;
    this.email = email;	
    }
}

//Page Selection - Construire l'affichage de la liste des produits
if (document.getElementsByTagName('title')[0].innerHTML == 'Orinoco - Sélection') {

    /* Gestion EVENEMENT - Bouton VOIR MON PANIER
    -- DEBUT -- */
    const btnToOrder = document.getElementById('toOrder');
    btnToOrder.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir la réaction du navigateur par défaut
        e.stopPropagation(); // Stopper la propagation du clic aux éléments parents
        location.href = "/views/order.html";  
    });
    /* Gestion EVENEMENT - Bouton VOIR MON PANIER
    -- FIN -- */

    /* REQUETE API GET pour afficher la liste des produits
    -- DEBUT -- */

    fetch('http://localhost:3000/api/teddies')
    .then(response => response.json())
    .then(listOfProducts => {
        let listResult = document.getElementById('result');

        console.log (listOfProducts);

        for (const value in listOfProducts) {
/*
            listResult.innerHTML += `<div class='product'>
                <img src='${listOfProducts[value].imageUrl}' width=25% />
                <p>Prénom: ${listOfProducts[value].name} (<a id='${listOfProducts[value].name}' href='/views/customize.html'>Détails...</a>)</p>
                <p>Valeur: ${euroConverter(listOfProducts[value].price)} </p>
                <p>Référence: <span id='productRef'> ${listOfProducts[value]._id} </span></p>
            </div>`;
*/
            listResult.innerHTML += `<article>
                <img src='${listOfProducts[value].imageUrl}' alt='${listOfProducts[value]._id}' width=25% />
                <p>Référence: ${listOfProducts[value]._id}</p>
                <h2><a id='${listOfProducts[value].name}' href='/views/customize.html'>${listOfProducts[value].name}</a></h2>
                <h3>${euroConverter(listOfProducts[value].price)}</h3>
            </article>`;

            //console.log (listOfProducts[value].name);
            //console.log (listOfProducts[value]._id);

            console.log(document.getElementById(listOfProducts[value].name));

        }

        for (const value in listOfProducts) {
            document.getElementById(listOfProducts[value].name).onclick = () => {
                localStorage.setItem ('selectedProductId', listOfProducts[value]._id);
                //alert ("LocalStorage : " + localStorage.getItem ('selectedProductId'));
                location.href = "/views/customize.html";  
            }
        }
        
    })
    .catch(err => {
        console.log("Quelque chose s'est mal passé durant le GET pour constituer la liste des produits !", err);
    });
    /* REQUETE API GET pour afficher la liste des produits
    -- FIN -- */
}


/*** MODULE A TRANSFERER dans fichier customize.js
-- DEBUT -- ***/
// Page Produit - Personnaliser le produit sélectionné
if (document.getElementsByTagName('title')[0].innerHTML == 'Orinoco - Produit') {	

    /* Gestion EVENEMENT - Bouton LISTE DES PRODUITS
    -- DEBUT -- */
    const btnToListOfProducts = document.getElementById('toListOfProducts');
    btnToListOfProducts.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir la réaction du navigateur par défaut
        e.stopPropagation(); // Stopper la propagation du clic aux éléments parents
        location.href = "../index.html";  
    });
    /* Gestion EVENEMENT - Bouton LISTE DES PRODUITS
    -- FIN -- */

    /* Gestion EVENEMENT - Bouton PASSER LA COMMANDE
    -- DEBUT -- */
    const btnToOrder = document.getElementById('toOrder');
    btnToOrder.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir la réaction du navigateur par défaut
        e.stopPropagation(); // Stopper la propagation du clic aux éléments parents
        localStorage.removeItem ('selectedProductId');
        location.href = "/views/order.html";
    });
    /* Gestion EVENEMENT - Bouton PASSER LA COMMANDE
    -- FIN -- */

    /* REQUETE API GET pour afficher le détail du produit sélectionné
    -- DEBUT -- */
    const url = 'http://localhost:3000/api/teddies/' + localStorage.getItem('selectedProductId');
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(selectedProduct => {
        let customizeResult = document.getElementById('customizeResult');
        customizeResult.innerHTML += `<h2> Et voici... ${selectedProduct.name} </h2>           
            <img src=${selectedProduct.imageUrl} alt='${selectedProduct._id}' width=25% />
            <p>Référence: ${selectedProduct._id}</p>
            <h3> Tu peux m'adopter pour ${euroConverter(selectedProduct.price)} !</h3>
            <p> Voici mon histoire: ${selectedProduct.description} </p>`;

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
            logTeddyColor.textContent = `Tu préfères le coloris ${event.target.value}`;
            localStorage.selectedProductColor = `${event.target.value}`;
        });
        /* Gestion EVENEMENT - Liste déroulante CHOIX DU COLORIS PELUCHE
        -- FIN -- */
    })
    .catch(err => {
        console.log("Quelque chose s'est mal passé durant le GET pour fournir le détail du produit selectionné !", err);
    });
    /* REQUETE API GET pour afficher le détail de l'article sélectionné
    -- FIN -- */

    /* Gestion EVENEMENT - Bouton AJOUTER AU PANIER
    -- DEBUT -- */
    const btnToAddInBasket = document.getElementById('toAddInBasket');
    btnToAddInBasket.addEventListener('click', updateBasket);
    function updateBasket() {
        let basketReserved = JSON.parse(localStorage.getItem("basketStored")) || [];
        basketReserved.push(localStorage.selectedProductId);
        localStorage.setItem("basketStored", JSON.stringify(basketReserved));
    }
    /* Gestion EVENEMENT - Bouton AJOUTER AU PANIER
    -- FIN -- */
}
/*** MODULE A TRANSFERER dans fichier customize.js
-- FIN -- ***/


/*** MODULE A TRANSFERER dans fichier order.js
-- DEBUT -- ***/

// Page Panier - Résumer les articles à commander + Enregistrer les coordonnées du client
if (document.getElementsByTagName('title')[0].innerHTML == 'Orinoco - Panier') {

    /* Gestion EVENEMENT - Bouton LISTE DES PRODUITS
    -- DEBUT -- */
    const btnToListOfProducts = document.getElementById('toListOfProducts');
    btnToListOfProducts.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir la réaction du navigateur par défaut
        e.stopPropagation(); // Stopper la propagation du clic aux éléments parents
        location.href = "../index.html";  
    });
    /* Gestion EVENEMENT - Bouton LISTE DES PRODUITS
    -- FIN -- */

    let basket = JSON.parse(localStorage.getItem("basketStored"));
    let totalAmount = 0;
    //let totalAmount = parseInt(localStorage.getItem("totalAmountStored")) || 0;
    let basketRow = 0;

    for (const item of basket) {
        console.log (item);
        /* REQUETE API GET pour afficher le détail du produit sélectionné
        -- DEBUT -- */

        const url = 'http://localhost:3000/api/teddies/' + item;
        console.log(url);
        fetch(url)
        .then(response => response.json())
        .then(productsInBasket => {
            let orderResult = document.getElementById('orderResult');
            orderResult.innerHTML += `<tr class='product'>
                <td>(<a id='${productsInBasket.name}' href='/views/customize.html'>Détails...</a>)</td>
                <td>${productsInBasket._id}</td>
                <td><img src='${productsInBasket.imageUrl}' width='50%'/></td>
                <td>${productsInBasket.name}</td>
                <td>${euroConverter(productsInBasket.price)}</td>
            </tr>`;
            
            //console.log (productsInBasket.name + ":" + euroConverter(productsInBasket.price));

            totalAmount += parseInt(productsInBasket.price);
            //console.log ("Montant total: " + euroConverter(totalAmount));
            localStorage.setItem("totalAmountStored", totalAmount);
            basketRow ++;
            //console.log ("basketRow: " + basketRow);

            if ( basketRow === basket.length ){
                let totalAmountArea = document.getElementById('totalAmountArea');
                totalAmountArea.innerHTML += "<h2>Montant total : " + euroConverter(localStorage.getItem("totalAmountStored")) + "</h2>";
            }
        })
        .catch(err => {
            console.log("Quelque chose s'est mal passé durant le GET !", err);
        });
        /* REQUETE API GET pour afficher le détail de l'article sélectionné
        -- FIN -- */

        /* REQUETE API GET pour afficher le détail de l'article sélectionné depuis le panier
        -- FIN -- */
        fetch(url)
        .then(response => response.json())
        .then(pIB => {
            console.log(document.getElementById(pIB.name));
            document.getElementById(pIB.name).onclick = () => {
                localStorage.setItem ('selectedProductId', pIB._id);
                //alert ("LocalStorage : " + localStorage.getItem ('selectedProductId'));
                location.href = "/views/customize.html";
            }
        })
        .catch((err) => {
            console.log("Quelque chose s'est mal passé durant le GET !", err);
        });
                /* REQUETE API GET pour afficher le détail de l'article sélectionné depuis le panier
        -- FIN -- */
    }

    /* Gestion EVENEMENT - INPUTS Gestion de la saisie utilisateur
    -- DEBUT -- */
    userInputsChecking();
    /* Gestion EVENEMENT - INPUTS Gestion de la saisie utilisateur
    -- DEBUT -- */

    /* Gestion EVENEMENT - Bouton CONFIRMER LA COMMANDE
    -- DEBUT -- */
    const btnToValidateOrder = document.getElementById('toValidateOrder');
    btnToValidateOrder.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir la réaction du navigateur par défaut
        e.stopPropagation(); // Stopper la propagation du clic aux éléments parents

        localStorage.setItem('firstName', document.getElementById('firstName').value);
        localStorage.setItem('lastName', document.getElementById('lastName').value);
        localStorage.setItem('address', document.getElementById('address').value);
        localStorage.setItem('city', document.getElementById('city').value);
        localStorage.setItem('email', document.getElementById('email').value);

        location.href = "/views/thanks.html";

    });
    /* Gestion EVENEMENT - Bouton CONFIRMER LA COMMANDE
    -- FIN -- */
}
/*** MODULE A TRANSFERER dans fichier order.js 
-- FIN -- ***/

/*** MODULE A TRANSFERER dans fichier thanks.js
-- DEBUT -- ***/

// Page Remerciement - Remerciement du client et affichage du numéro de commande enregistré
if (document.getElementsByTagName('title')[0].innerHTML == 'Orinoco - Commande enregistrée. Merci !') {

    const newContact = new Contact (
        localStorage.getItem('firstName'),
        localStorage.getItem('lastName'),
        localStorage.getItem('address'),
        localStorage.getItem('city'),
        localStorage.getItem('email')
    );

    const basketConfirmed = JSON.parse(localStorage.getItem("basketStored"))

    // Envoi du bon de commande au serveur
    fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "contact": {
                "firstName":    newContact.firstname,
                "lastName":     newContact.lastname,
                "address":      newContact.address,
                "city":         newContact.city,
                "email":        newContact.email
            },
            "products":         basketConfirmed
        })
    })
    .then(response => {
        console.log(response.status + ":" + response.statusText);
        return response.json();
    })
    .then(data =>{
        console.log(data);
        console.log(data.orderId);

        let thanksResult = document.getElementById('thanksResult');
 
        thanksResult.innerHTML += `<p>Votre commande d'un montant de <h3>${euroConverter(localStorage.getItem("totalAmountStored"))}</h3> est enregistrée sous la référence <h3>${data.orderId}</h3>.</p>`;
            localStorage.removeItem("basketStored");
            localStorage.removeItem("totalAmountStored");
            localStorage.removeItem('firstName');
            localStorage.removeItem('lastName');
            localStorage.removeItem('address');
            localStorage.removeItem('city');
            localStorage.removeItem('email');
    })
    .catch(err => {
        console.log("Quelque chose s'est mal passé durant le POST de la commande !", err);
    });

    /* Gestion EVENEMENT - Bouton LISTE DES PRODUITS
    -- DEBUT -- */
    const btnToListOfProducts = document.getElementById('toListOfProducts');
    btnToListOfProducts.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir la réaction du navigateur par défaut
        e.stopPropagation(); // Stopper la propagation du clic aux éléments parents
        location.href = "../index.html";  
    });
    /* Gestion EVENEMENT - Bouton LISTE DES PRODUITS
    -- FIN -- */
}
/*** MODULE A TRANSFERER dans fichier thanks.js 
-- FIN -- ***/


/*** STOCK DE CODE -- BEBUT -- ***
                
        class Order {
            constructor (id, contactId, productId, totalAmount) {
            this.id = id;	
            this.contactId = contactId;	
            this.products = products;	
            this.totalAmount = totalAmount;	
            }
            addProduct(productID, productPrice) {
            this.products.push(productID);	
            this.totalAmount += productPrice;	
            }
            showValidateOrder() {
            console.log	(BePolite.SayThankYouTo (newContact.surname) + "la commande #" + this.id + " est confirmé pour un montant total de " + this.totalAmount + ".");
            }
        }		
                
        class BePolite {
            static sayTankYouTo (surname) {
            console.log	("Thanks, " + surname + " !");
            }
        }
    // Déclaration des classes - Fin
        
    const newOrder = new Order (	
        orderID,
        newContact.id,
        products,
        totalAmount);

    //Ajouter un produit	
    newOrder.addProduct (	
        myTeddy.id,
    myTeddy.price);

/*** STOCK DE CODE -- FIN -- ***/