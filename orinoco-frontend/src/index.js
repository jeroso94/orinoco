import euroConverter from './common';

//let lienVersDetailProduit = "";
//let referenceProduit = "";

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
    .then((response) => response.json())
    .then((listOfProducts) => {
        let listResult = document.getElementById('result');

        console.log (listOfProducts);

        for (const value in listOfProducts) {
            listResult.innerHTML += `<div class='product'>
                <img src='${listOfProducts[value].imageUrl}' width=25% />
                <p>Prénom: ${listOfProducts[value].name} (<a id='${listOfProducts[value].name}' href='/views/customize.html'>Détails...</a>)</p>
                <p>Valeur: ${euroConverter(listOfProducts[value].price)} </p>
                <p>Référence: <span id='productRef'> ${listOfProducts[value]._id} </span></p>
            </div>`;

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
    .catch((err) => {
        console.log("Quelque chose s'est mal passé durant le GET pour constituer la liste des produits !", err);
    });
    /* REQUETE API GET pour afficher la liste des produits
    -- FIN -- */
}


/*** MODULE A TRANSFERER dans fichier customize.js
-- DEBUT -- ***/
// Page Produit - Personnaliser le produit sélectionné
if (document.getElementsByTagName('title')[0].innerHTML == 'Orinoco - Produit') {	

    /* REQUETE API GET pour afficher le détail du produit sélectionné
    -- DEBUT -- */
    const url = 'http://localhost:3000/api/teddies/' + localStorage.getItem('selectedProductId');
    console.log(url);
    fetch(url)
    .then((response) => response.json())
    .then((selectedProduct) => {
        let customizeResult = document.getElementById('customizeResult');
        customizeResult.innerHTML += `<div class='product'>
            <img src=${selectedProduct.imageUrl} width=25% />
            <p> (Référence: ${selectedProduct._id})</p>
            <div> Bonjour ! Je m'appelle ${selectedProduct.name} </div>
            <div> Voici mon histoire: ${selectedProduct.description} </div>
            <p> Tu peux m'adopter pour ${euroConverter(selectedProduct.price)} !</p>
            </div>`;

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
    .catch((err) => {
        console.log("Quelque chose s'est mal passé durant le GET pour fournir le détail du produit selectionné !", err);
    });
    /* REQUETE API GET pour afficher le détail de l'article sélectionné
    -- FIN -- */

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

    /* Gestion EVENEMENT - Bouton AJOUTER AU PANIER
    -- DEBUT -- */
    const btnToAddInBasket = document.getElementById('toAddInBasket');
    btnToAddInBasket.addEventListener('click', updateBasket);
    function updateBasket() {
        let productsTMP = JSON.parse(localStorage.getItem("basketStored")) || [];
        productsTMP.push(localStorage.selectedProductId);
        localStorage.setItem("basketStored", JSON.stringify(productsTMP));
    }
    /* Gestion EVENEMENT - Bouton AJOUTER AU PANIER
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
}
/*** MODULE A TRANSFERER dans fichier customize.js
-- FIN -- ***/


/*** MODULE A TRANSFERER dans fichier order.js
-- DEBUT -- ***/

// Page Panier - Résumer les articles à commander + Enregistrer les coordonnées du client
if (document.getElementsByTagName('title')[0].innerHTML == 'Orinoco - Panier') {
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
        .then((response) => response.json())
        .then((productsInBasket) => {
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
                totalAmountArea.innerHTML += "<div> <p>Montant total : " + euroConverter(localStorage.getItem("totalAmountStored")) + "</p></div>";
            }
        })
        .catch((err) => {
            console.log("Quelque chose s'est mal passé durant le GET !", err);
        });
        /* REQUETE API GET pour afficher le détail de l'article sélectionné
        -- FIN -- */

        fetch(url)
        .then((response) => response.json())
        .then((pIB) => {
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
    }

//    for (const value in listOfProducts) {
//        document.getElementById(listOfProducts[value].name).onclick = function() {
//            localStorage.setItem ('selectedProductId', listOfProducts[value]._id);
            //alert ("LocalStorage : " + localStorage.getItem ('selectedProductId'));
//            location.href = "/views/customize.html";  
//        }
//    }

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
/*** MODULE A TRANSFERER dans fichier order.js 
-- FIN -- ***/



/*** STOCK DE CODE -- BEBUT -- ***

    // Déclaration des classes - Début
        class Contact {
            constructor (id, firstname, lastname, address, city, email) {
            this.id = id;	
            this.firstname = firstname;	
            this.lastname = lastname;	
            this.address = address;
            this.city = city;
            this.email = email;	
            }
        }
                
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

    const newContact = new Contact (	
        contactID,
        firstname,
        lastname,
        address,
        city,
        email);
        
    const newOrder = new Order (	
        orderID,
        newContact.id,
        products,
        totalAmount);
        

    //Initialisation variable qui stocke le montant total de la commande
    let totalAmount = 0;

    //Attribuer un ID aléatoire
    const contactID = Math.round(Math.random()*1000000);
    // const orderID = Math.round(Math.random()*1000000000);

    //Ajouter un produit	
    newOrder.addProduct (	
        myTeddy.id,
    myTeddy.price);

        
        // Envoi du bon de commande au serveur
        fetch('http://localhost:3000/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "contact": {
                    "firstName":newContact.firstname,
                    "lastName":newContact.lastname,
                    "address":newContact.address,
                    "city":newContact.city,
                    "email":newContact.email
                },
                "products": ["5be9c8541c9d440000665243"]
            })
        })
        .then((response) => {
            return console.log(response.json());
        }).catch((err) => {
            console.log("Quelque chose s'est mal passé durant le POST du bon de commande !", err);
        });  

/*** STOCK DE CODE -- FIN -- ***/